import { Container } from "@mui/material";
import ExpenseForm from "../components/ExpenseForm";

function AddExpensePage() {
  return (
    <Container sx={{ marginTop: 4 }}>
      <ExpenseForm />
    </Container>
  );
}

export default AddExpensePage;
