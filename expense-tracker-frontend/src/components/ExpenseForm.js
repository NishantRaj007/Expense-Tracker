import { useState, useEffect } from "react";
import { addExpense, updateExpense } from "../services/expenseService";
import {
  Card, CardContent, Typography, TextField, Button,
  FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function ExpenseForm({ onAddSuccess = () => {}, editingExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(dayjs());

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setDate(dayjs(editingExpense.date));
    } else {
      setTitle("");
      setAmount("");
      setCategory("");
      setDate(dayjs());
    }
  }, [editingExpense]);

  const categories = [
    "Food","Travel","Shopping","Bills","Entertainment",
    "Health","Groceries","Education","Other"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title,
      amount: Number(amount),
      category,
      date: date.format("YYYY-MM-DD"),
    };

    if (editingExpense?.id) {
      updateExpense(editingExpense.id, payload).then(() => onAddSuccess());
    } else {
      addExpense(payload).then(() => onAddSuccess());
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 500,
        margin: "20px auto",
        padding: 3,
        background: "white",
        boxShadow: "0px 6px 20px rgba(0,0,0,0.08)",
        borderRadius: "16px",
      }}
    >

      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
          {editingExpense ? "Edit Expense" : "Add Expense"}
        </Typography>

        <TextField fullWidth label="Title" margin="normal"
          value={title} onChange={(e)=>setTitle(e.target.value)} />

        <TextField fullWidth label="Amount" type="number" margin="normal"
          value={amount} onChange={(e)=>setAmount(e.target.value)} />

        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select value={category} label="Category"
            onChange={(e)=>setCategory(e.target.value)}>
            {categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </Select>
        </FormControl>

        <DatePicker
          label="Date"
          value={date}
          onChange={(newValue) => setDate(newValue)}
          slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
        />

   <Button
     variant="contained"
     color="primary"
     fullWidth
     sx={{
       marginTop: 2,
       padding: "12px",
       fontWeight: "bold",
       textTransform: "none",
       borderRadius: "10px",
       fontSize: "16px"
     }}
     onClick={handleSubmit}
   >
     {editingExpense ? "Update Expense" : "Add Expense"}
   </Button>


      </CardContent>
    </Card>
  );
}

export default ExpenseForm;
