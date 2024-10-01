import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchData } from "../../components/ApiHelpers";
import Container from "../../components/Container";
import Collapse from "../../components/Collapse";
import Graph from "../../components/Graph";
import GraphContainer from "../../components/GraphContainer";
import Footer from "../../components/Footer";
import { Table } from "../../components/Table";

const cols = [
  { accessor: "average_speed", label: "Average Speed" },
  { accessor: "score_change", label: "Score Change" },
  { accessor: "trip_start", label: "Trip Start" },
  { accessor: "trip_stop", label: "Trip Stop" },
];

const cols2 = [
  { accessor: "type", label: "Incident type" },
  { accessor: "score_change", label: "Score Change" },
  { accessor: "distance", label: "Distance" },
  { accessor: "incident_time", label: "Time of incident" },
];

function calculateScoreChange(trips) {
  if (trips.length == 0) {
    return "NaN";
  }
  trips = trips.sort((a, b) => new Date(a.trip_start) - new Date(b.trip_start));
  const oldestTrip = trips[0];
  let sumScoreChange = 0;
  let count = 0;

  for (let i = 1; i < trips.length; i++) {
    sumScoreChange += trips[i].score_change;
    count++;
  }

  const averageScoreChange = sumScoreChange / count;
  const adjustedScoreChange = oldestTrip.score_change + averageScoreChange;

  return Math.round(adjustedScoreChange);
}

export default function driver() {
  //pid ? null : (pid = 1);
  const [trips, setTrips] = useState(null);
  const [incidents, setIncidents] = useState(null);
  const [pid, setPid] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const fetchPid = async () => {
      const pid = router.query;
      //Check if pid is empty object (next prerendering)
      if (!Object.keys(pid).length == 0) {
        setPid(pid);
      }
    };

    fetchPid();
  }, [router.query]);

  useEffect(() => {
    if (pid != null) {
      if (!Object.keys(pid).length == 0) {
        const requestBody = JSON.stringify({ id: +pid.pid });
        async function fetchDataAsync(body) {
          const data = await fetchData(body);
          setTrips(data[0]);
          setIncidents(data[1]);
        }
        fetchDataAsync(requestBody);
      }
    }
  }, [pid]);

  return (
    <Container>
      <div className="relative h-full w-full min-w-[80vh] overflow-x-hidden">
        <div className="absolute inset-x-10 inset-y-16 bg-base-100 shadow-xl shadow-black rounded-md overflow-y-auto">
          <div className="flex py-20 px-16">
            <div className="h-fit">
              <div className="avatar">
                <div className="w-24 rounded-full shadow shadow-black">
                  <img src="https://i.pravatar.cc/192" />
                </div>
              </div>
            </div>
            <div className="flex flex-col pl-4">
              {pid != null ? (
                Object.keys(pid).length == 0 ? (
                  <span>Loading...</span>
                ) : (
                  <span style={{ fontSize: "20px" }}>user {pid.pid}</span>
                )
              ) : null}
              <span style={{ fontSize: "30px" }}>
                driver score {trips ? calculateScoreChange(trips) : "Loading"}
              </span>
            </div>
            <div className="flex flex-col items-end justify-end flex-1">
              <div className="shadow-lg shadow-black">
                <GraphContainer>
                  <Graph width={600} height={300} rows={trips} />
                </GraphContainer>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-5 px-5">
            <div className="rounded-md overflow-hidden shadow-sm shadow-black">
              <Collapse title={"Sessions"}>
                {!trips ? (
                  <p>Loading...</p>
                ) : (
                  <Table rows={trips} columns={cols} />
                )}
              </Collapse>
            </div>
            <div className="rounded-md overflow-hidden shadow-sm shadow-black">
              <Collapse title={"Incidents"}>
                {!incidents ? (
                  <p>Loading...</p>
                ) : (
                  <Table rows={incidents} columns={cols2} />
                )}
              </Collapse>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Container>
  );
}
