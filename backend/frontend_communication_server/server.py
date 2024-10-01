#!/usr/bin/env python
from flask import Flask, request, render_template, redirect, make_response
from flask_cors import CORS
from flask_sslify import SSLify
from random import randint
from datetime import datetime, timedelta
import sys
import os
from waitress import serve
import psycopg2


app = Flask(__name__)
sslify = SSLify(app)
CORS(app, supports_credentials=True)


def get_db_connection():
    return psycopg2.connect(
        host=os.environ["POSTGRES_HOST"],
        user=os.environ["POSTGRES_USER"],
        password=os.environ["POSTGRES_PASSWORD"],
    )


def get_dashboard_data(offset, count, username):
    # connect to database
    dashboard_data = []

    with get_db_connection() as conn, conn.cursor() as curr:
        # get employee company
        curr.execute(f"SELECT companyID FROM Empolyees WHERE userName='{username}';")
        employee_data = curr.fetchone()
        company_id = employee_data[0]

        # get driver data from database
        curr.execute(
            f"SELECT userID, drivingScore, boxID from Users WHERE companyID='{company_id}' OFFSET {offset} ROWS FETCH NEXT {count} ROWS ONLY;"
        )
        drivers_data = curr.fetchall()

        # fetch last trip and calculate trip length
        for dID, score, bID in drivers_data:
            curr.execute(
                f"SELECT tripStart, tripStop, drivingScoreImpact FROM Trips WHERE userID='{dID}' ORDER BY tripStart DESC;"
            )
            trip_data = curr.fetchall()
            if len(trip_data) <= 1:
                last_trip = 0
                trip_len = 0
                score = 0
            else:
                # calculate driver score
                oldest_trip = trip_data[0][2]
                # trip_data
                score = 0

                score_impact_sum = sum([t[2] for t in trip_data[:-1]])
                score_impact_avg = score_impact_sum / (len(trip_data) - 1)
                score = round(oldest_trip + score_impact_avg)
                # calculate last trip and trip length
                last_trip = trip_data[0][0].strftime("%Y-%m-%d %H:%M:%S")
                trip_len = int((trip_data[0][1] - trip_data[0][0]).total_seconds() / 60)

            # package data for sending
            driver = {
                "id": dID,
                "score": score,
                "last_trip": last_trip,
                "trip_len": trip_len,
            }
            dashboard_data.append(driver)

    return dashboard_data


def get_driver_data(id):
    incidents, trips = list(), list()

    with get_db_connection() as conn, conn.cursor() as curr:
        # get trip data
        curr.execute(
            f"SELECT tripStart, tripStop, drivingScoreImpact, averageSpeed FROM Trips WHERE userID={id};"
        )
        trip_data = curr.fetchall()
        # get incident data
        curr.execute(
            f"SELECT type, drivingScoreImpact, distance, incidentTIme FROM Incidents WHERE userID='{id}';"
        )
        incident_data = curr.fetchall()
        for tripStart, tripStop, drivingScoreImpact, averageSpeed in trip_data:
            trip = {
                "trip_start": tripStart,
                "trip_stop": tripStop,
                "score_change": drivingScoreImpact,
                "average_speed": averageSpeed,
            }
            trips.append(trip)
        for type, drivingScoreImpact, distance, incidentTIme in incident_data:
            incident = {
                "type": type,
                "score_change": drivingScoreImpact,
                "distance": distance,
                "incident_time": incidentTIme,
            }
            incidents.append(incident)

    return [trips, incidents]


@app.route("/backend/login", methods=["POST", "GET"])
def login():
    # disable in production
    if sys.argv[1] == "production":
        return {}, 400

    # "login" form
    if request.method == "GET":
        return render_template("login_debug.html")

    content_type = request.headers.get("Content-Type")
    # RAW API call
    if content_type == "application/json":
        # simulate Authellia
        resp = make_response(redirect("/backend/hello"))
        resp.set_cookie("Remote-User", request.json["username"])
        return resp
    # browser test
    elif content_type == "application/x-www-form-urlencoded":
        # simulate authelia
        resp = make_response(redirect("/backend/hello"))
        resp.set_cookie("Remote-User", request.form["username"])
        return resp
    # invalid
    else:
        return {}, 400


@app.route("/backend/dashboard", methods=["POST"])
def dashboard():
    # esure login
    username = request.cookies.get("Remote-User")
    if not username:
        return {}, 500

    # ensure correct datatype
    content_type = request.headers.get("Content-Type")
    if content_type != "application/json":
        return {}, 400
    # check request type
    if "count" in request.json and "offset" in request.json:
        # easier data access
        count = request.json["count"]
        offset = request.json["offset"]
        # ensure valid count and offset
        if (type(count) != int or count < 0) or (type(offset) != int or offset < 0):
            return {}, 400
        # get data
        return get_dashboard_data(offset, count, username)
    if "id" in request.json:
        # easier data access
        driver_id = request.json["id"]
        # data validiry
        if(type(driver_id) != int or driver_id < 0):
            return {}, 400
        # get data
        return get_driver_data(driver_id)
    else:
        return {}, 400


@app.route("/backend/hello")
def hello():
    username = request.cookies.get("Remote-User")

    if not username:
        return make_response(redirect("/backend/login"))

    with get_db_connection() as conn, conn.cursor() as curr:
        curr.execute(f"SELECT * FROM Empolyees WHERE userName='{username}';")
        user_data = curr.fetchone()
        curr.execute(f"SELECT * FROM Companies WHERE companyID='{user_data[1]}';")
        company_data = curr.fetchone()

    return render_template("hello.html", username=username, company=company_data)


if __name__ == "__main__":
    if len(sys.argv) != 2 or sys.argv[1] not in ["debug", "production", "help"]:
        print("Invalid usage")
        print("To see usage run '.server.py help'")
    elif sys.argv[1] == "help":
        print("To run server in either debug or production modes")
        print("./server.py [debug|production]")
        print("To see this message again run ./server.py help")
    elif sys.argv[1] == "debug":
        app.run(debug=True, host="0.0.0.0")
    elif sys.argv[1] == "production":
        serve(app, host="0.0.0.0", port="5000")
    else:
        print("Invalid usage")
        print("To see usage run '.server.py help'")
