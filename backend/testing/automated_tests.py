import unittest
import requests

class TestFrontAPI(unittest.TestCase):
    """
        Test cases for the frontend API service
    """

    # helpers

    base_url = "http://127.0.0.1:5000/backend"

    def make_dashboard_request(self, count, offset) -> requests.Response:
        return requests.post(
            f"{self.base_url}/dashboard",
            json={"count":count,"offset":offset}, 
            cookies={"Remote-User":"TestUser"}
        )

    def make_driverinfor_request(self, deriverId) -> requests.Response:
        return requests.post(
            f"{self.base_url}/dashboard",
            json={"id": deriverId}, 
            cookies={"Remote-User":"TestUser"}
        )

    # Misc tests

    def test_server_online(self):
        """
            Test if server is rechable   
        """
        r = requests.get(f"{self.base_url}/hello",cookies={"Remote-User":"TestUser"})
        self.assertEqual(r.status_code, 200)

    # Dashboard tests

    def test_dashboard_online(self):
        """
            Test if dashboard is reachable
        """
        r = self.make_dashboard_request(2,0)
        self.assertEqual(r.status_code, 200)

    def test_dashboard_auth(self):
        """
            Test if dashboard requests require authentication
        """
        # make request without utorisation
        r = requests.post(
            f"{self.base_url}/dashboard",
            json={"count":0,"offset":0}
        )
        self.assertEqual(r.status_code, 500) # ensure request denied

    def test_dashboard_data_format(self):
        """
            Test if dashboard data is in json format
        """
        r = self.make_dashboard_request(2,0)
        r.json() # no assertion eeded as this throws if invalid data format found

    def test_dashboard_data(self):
        """
            Test if dashboard data is valid
        """
        r = self.make_dashboard_request(1,0)
        data = r.json()
        self.assertIsInstance(data,list) # emsure top level is a list
        self.assertIsInstance(data[0],dict) # ensure items are dictonaries
        # ensure all fields are present
        for field in ("id", "score", "last_trip", "trip_len"):
            self.assertIn(field, data[0])

    def test_dashboard_data_legth(self):
        """
            Test if dashboard data doesn't exced specified length
        """
        for data_len in (2,5,10): # for a few different lenghts
            # request data
            r = self.make_dashboard_request(data_len,0)
            data = r.json()
            # check if length in bounds
            self.assertTrue(len(data) <= data_len)

    def test_dashboard_data_legth_validity(self):
        """
            Test if cound validity is properly handled
        """
        for value in (-1,"ala",0.5): # for some invalid values
            r = self.make_dashboard_request(value,0)
            self.assertEqual(r.status_code,400) # esure invalid error is returned

    def test_dashboard_offset(self):
        """
            Test if offseting data works
        """
        # grab first two entries
        r = self.make_dashboard_request(2,0)
        data_1 = r.json()
        # grab just second entry
        r = self.make_dashboard_request(1,1)
        data_2 = r.json()
        # make sure second entry is consistant
        self.assertEqual(data_1[1], data_2[0])

    def test_dashboard_offset_validity(self):
        """
            Test if offset validity is properly handled
        """
        for value in (-1,"ala",0.5): # for some invalid values
            r = self.make_dashboard_request(1,value)
            self.assertEqual(r.status_code,400) # esure invalid error is returned

    # Driverinfo tests
    def test_driverinfo_online(self):
        """
            Test if driverinfo is reachable
        """
        r = self.make_driverinfor_request(0)
        self.assertEqual(r.status_code, 200)

    def test_driverinfo_auth(self):
        """
            Test if driverinfo requests require authentication
        """
        # make request without utorisation
        r = requests.post(
            f"{self.base_url}/dashboard",
            json={"id":1}
        )
        self.assertEqual(r.status_code, 500) # ensure request denied

    def test_driverinfo_data_format(self):
        """
            Test if driverinfo data is in json format
        """
        r = self.make_driverinfor_request(0)
        r.json() # no assertion eeded as this throws if invalid data format found

    def test_driverinfo_data(self):
        """
            Test if driverinfo data is valid
        """
        r = self.make_driverinfor_request(1)
        data = r.json()
        self.assertIsInstance(data,list) # top level list
        self.assertEqual(len(data), 2) # of 2 items

        self.assertIsInstance(data[0], list) #  list of trips
        self.assertIsInstance(data[0][0], dict) # trip item
        # ensure trip fields
        for field in ('average_speed', 'score_change', 'trip_start', 'trip_stop'):
            self.assertIn(field, data[0][0])

        self.assertIsInstance(data[1], list) # list of incidents
        self.assertIsInstance(data[1][0], dict) # incident item
        # ensure incident fields
        for field in ('distance', 'incident_time', 'score_change', 'type'):
            self.assertIn(field, data[1][0])

    def test_driverinfo_index_validity(self):
        """
            Test if index validity is properly handled
        """
        for value in (-1,"ala",0.5): # for some invalid values
            r = self.make_driverinfor_request(value)
            self.assertEqual(r.status_code,400) # esure invalid error is returned

if __name__ == '__main__':
    unittest.main()