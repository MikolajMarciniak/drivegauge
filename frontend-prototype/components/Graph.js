import { useEffect, useState } from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";

function Graph({ rows, width = 450, height = 250 }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    function driverParse(rows) {
      if (rows) {
        const formattedData = {
          labels: rows.map((row, index) => `${index + 1}.03`),
          datasets: [
            {
              label: "Score",
              data: rows.map((row) => row.score_change),
              fill: false,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgba(255, 99, 132, 0.2)",
            },
          ],
          options: {
            maintainAspectRatio: false,
          },
        };
        setData(formattedData);
      }
    }
    driverParse(rows);
  }, [rows]);

  return (
    <div style={{ width: width, height: height }}>
      {data ? <Line data={data} /> : <span>Loading... </span>}
    </div>
  );
}

export default Graph;
