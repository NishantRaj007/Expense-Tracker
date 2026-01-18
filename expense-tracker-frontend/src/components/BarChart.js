import { Bar } from "react-chartjs-2";
import { Card, CardContent, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function BarChart({ expenses }) {
  if (!expenses || expenses.length === 0) {
    return (
      <Card sx={{ padding: 2, marginTop: 2 }}>
        <Typography textAlign="center">No data to display</Typography>
      </Card>
    );
  }

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const monthlyTotals = Array(12).fill(0);
  expenses.forEach((exp) => {
    const monthIdx = new Date(exp.date).getMonth();
    monthlyTotals[monthIdx] += Number(exp.amount);
  });

  const data = {
    labels: months,
    datasets: [
      {
        label: "Monthly Expense (₹)",
        data: monthlyTotals,
        backgroundColor: "rgba(25, 118, 210, 0.6)",
        borderColor: "rgba(25, 118, 210, 1)",
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true },
    },
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: (ctx) => `₹${ctx.raw}`,
        },
      },
    },
  };

  return (
    <Card sx={{ height: 400, padding: 2, borderRadius: "16px", boxShadow: "0 6px 20px rgba(0,0,0,0.1)" }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Monthly Expense Trend
        </Typography>

        <div style={{ height: "300px" }}>
          <Bar data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}

export default BarChart;
