import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/events")
      .then(res => setEvents(res.data));
  }, []);

  // A/B distribution
  const control = events.filter(e => e.group === "control").length;
  const test = events.filter(e => e.group === "test").length;

  const data = {
    labels: ["Control", "Test"],
    datasets: [
      {
        label: "User Distribution",
        data: [control, test],
      },
    ],
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 CalorAI Dashboard</h1>

      <h2>A/B Test Distribution</h2>
      <Bar data={data} />

      <h2>Events</h2>
      <ul>
        {events.map((e, i) => (
          <li key={i}>
            {e.userId} - {e.event} - {e.group}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;