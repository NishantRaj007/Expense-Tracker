import { useEffect, useState } from "react";
import { getAllExpenses, deleteExpense } from "../services/expenseService";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ExpenseList({ onEdit, onData }) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = () => {
    getAllExpenses().then((res) => {
      setExpenses(res.data);

      // Prevent crash when onData is not passed
      if (onData) onData(res.data);
    });
  };

  const handleDelete = (id) => {
    deleteExpense(id).then(() => loadExpenses());
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: 900,
        margin: "20px auto",
        padding: 2,
        borderRadius: "16px",
        boxShadow: "0px 6px 20px rgba(0,0,0,0.08)",
        background: "white"
      }}
    >
      <Typography
        variant="h5"
        sx={{
          paddingBottom: 2,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Expense List
      </Typography>

      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
            <TableCell><strong>Title</strong></TableCell>
            <TableCell><strong>Amount</strong></TableCell>
            <TableCell><strong>Category</strong></TableCell>
            <TableCell><strong>Date</strong></TableCell>
            <TableCell align="right"><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {expenses.map((exp, index) => (
            <TableRow
              key={exp.id}
              sx={{
                backgroundColor: index % 2 === 0 ? "#FAFAFA" : "white",
                transition: "0.25s ease",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                  cursor: "pointer",
                  transform: "scale(1.01)",
                },
              }}
            >
              <TableCell>{exp.title}</TableCell>

              <TableCell>
                <b style={{ color: "#388E3C" }}>₹{exp.amount}</b>
              </TableCell>

              <TableCell>{exp.category}</TableCell>

              <TableCell>{exp.date}</TableCell>

              <TableCell align="right">
                <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                  <IconButton
                    color="primary"
                    onClick={() => onEdit(exp)}
                    sx={{
                      backgroundColor: "#E3F2FD",
                      "&:hover": { backgroundColor: "#BBDEFB" },
                    }}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => handleDelete(exp.id)}
                    sx={{
                      backgroundColor: "#FFEBEE",
                      "&:hover": { backgroundColor: "#FFCDD2" },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}

export default ExpenseList;
