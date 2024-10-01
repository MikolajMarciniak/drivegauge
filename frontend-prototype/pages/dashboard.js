import { useEffect, useState } from "react";
import Container from "../components/Container";
import { Table } from "../components/Table";
import { fetchData } from "../components/ApiHelpers";

const cols = [
  { accessor: "id", label: "ID" },
  { accessor: "last_trip", label: "last trip" },
  { accessor: "score", label: "score" },
  { accessor: "trip_len", label: "Length of trip" },
];

export default function DashboardPage() {
  const [rows, setRows] = useState(null);
  useEffect(() => {
    const requestBody = JSON.stringify({ count: 5, offset: 0 });
    async function fetchDataAsync(body) {
      const rows = await fetchData(body);
      setRows(rows);
    }
    fetchDataAsync(requestBody);
  }, []);
  return (
    <Container>
      <div className="h-[100vh] w-[50vw] mx-auto flex flex-col justify-center">
        {!rows && <p>Loading...</p>}
        {rows && <Table rows={rows} columns={cols} dash />}
      </div>
    </Container>
  );
}
