import { Container, Grid } from "@mui/material";
import ExpenseAnalytics from "../components/ExpenseAnalytics";

function Dashboard() {
  return (
    <Container sx={{ marginTop: 4 }}>
      <Grid container spacing={3}>

        {/* 📊 Analytics (Summary + Charts) */}
        <Grid item xs={12}>
          <ExpenseAnalytics />
        </Grid>

      </Grid>
    </Container>
  );
}

export default Dashboard;
