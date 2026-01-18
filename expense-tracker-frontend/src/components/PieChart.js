import { Pie } from "react-chartjs-2";
import { Card, CardContent, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ expenses }) {
  if (!expenses || expenses.length === 0) {
    return (
      <Card sx={{ padding: 2, marginTop: 2 }}>
        <Typography textAlign="center">No data to display</Typography>
      </Card>
    );
  }

  // Extract categories
  const categories = [...new Set(expenses.map((e) => e.category))];

  const totals = categories.map((cat) =>
    expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + Number(e.amount), 0)
  );

  const colors = [
    "#42A5F5",
    "#66BB6A",
    "#FFA726",
    "#EF5350",
    "#AB47BC",
    "#26C6DA",
    "#7E57C2",
    "#FF7043",
    "#9CCC65",
  ];

  const data = {
    labels: categories,
    datasets: [
      {
        data: totals,
        backgroundColor: colors.slice(0, categories.length),
        borderWidth: 2,
        borderColor: "#fff",
        hoverOffset: 12,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        callbacks: {
          label: (ctx) => `₹${ctx.raw}`,
        },
      },
    },
  };

  return (
    <Card sx={{ height: 350, padding: 2, borderRadius: "16px", boxShadow: "0 6px 20px rgba(0,0,0,0.1)" }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Category-wise Spending
        </Typography>

        <div style={{ height: "250px" }}>
          <Pie data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}

export default PieChart;
