import { Container } from "@mui/material";
import ExpenseList from "../components/ExpenseList";

function ExpenseListPage() {
  return (
    <Container sx={{ marginTop: 4 }}>
      <ExpenseList onData={(list) => console.log("Data loaded", list)} />
    </Container>
  );
}

export default ExpenseListPage;
