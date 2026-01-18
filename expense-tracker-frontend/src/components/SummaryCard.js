import { Card, CardContent, Typography, Grid } from "@mui/material";
import dayjs from "dayjs";

function SummaryCard({ expenses = [] }) {
  const today = dayjs();
  const startOfMonth = today.startOf("month");

  // Total Expense
  const totalExpense = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  // Today's Expense
  const todaysExpense = expenses
    .filter((e) => dayjs(e.date).isSame(today, "day"))
    .reduce((sum, e) => sum + Number(e.amount), 0);

  // This Month Expense
  const monthlyExpense = expenses
    .filter((e) => dayjs(e.date).isAfter(startOfMonth, "day"))
    .reduce((sum, e) => sum + Number(e.amount), 0);

  // Total Count
  const count = expenses.length;

  return (
    <Card
      sx={{
        padding: 2,
        borderRadius: "16px",
        textAlign: "center",
        boxShadow: "0px 6px 20px rgba(0,0,0,0.08)",
      }}
    >
      <CardContent>

        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Summary
        </Typography>

        <Grid container spacing={2}>

          {/* Total Expense */}
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                padding: 2,
                backgroundColor: "#E3F2FD",
                borderRadius: "12px",
                boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
              }}
            >
              <Typography variant="h6">Total Expense</Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                ₹{totalExpense}
              </Typography>
            </Card>
          </Grid>

          {/* This Month */}
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                padding: 2,
                backgroundColor: "#FFF3E0",
                borderRadius: "12px",
                boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
              }}
            >
              <Typography variant="h6">This Month</Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                ₹{monthlyExpense}
              </Typography>
            </Card>
          </Grid>

          {/* Today */}
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                padding: 2,
                backgroundColor: "#E8F5E9",
                borderRadius: "12px",
                boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
              }}
            >
              <Typography variant="h6">Today</Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                ₹{todaysExpense}
              </Typography>
            </Card>
          </Grid>

          {/* Transaction Count */}
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                padding: 2,
                backgroundColor: "#F3E5F5",
                borderRadius: "12px",
                boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
              }}
            >
              <Typography variant="h6">Transactions</Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {count}
              </Typography>
            </Card>
          </Grid>

        </Grid>
      </CardContent>
    </Card>
  );
}

export default SummaryCard;
