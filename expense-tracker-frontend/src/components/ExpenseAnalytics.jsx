import { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import {
  getMonthlyTotal,
  getCategoryAnalytics,
} from "../services/analyticsService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function ExpenseAnalytics() {
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    getMonthlyTotal().then((res) => setMonthlyTotal(res.data));

    getCategoryAnalytics().then((res) => setCategoryData(res.data));
  }, []);

  const pieData = {
    labels: categoryData.map((c) => c.category),
    datasets: [
      {
        data: categoryData.map((c) => c.total),
      },
    ],
  };

  return (
    <Card sx={{ margin: 3, padding: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          📊 Expense Analytics
        </Typography>

        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Monthly Total: ₹{monthlyTotal || 0}
        </Typography>

        <Pie data={pieData} />
      </CardContent>
    </Card>
  );
}

export default ExpenseAnalytics;
