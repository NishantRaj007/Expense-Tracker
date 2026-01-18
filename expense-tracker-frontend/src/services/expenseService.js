import api from "./api";

const EXPENSES_API = "/api/expenses";

export const getAllExpenses = () => {
  return api.get(EXPENSES_API);
};

export const addExpense = (expense) => {
  return api.post(EXPENSES_API, expense);
};

export const updateExpense = (id, expense) => {
  return api.put(`${EXPENSES_API}/${id}`, expense);
};

export const deleteExpense = (id) => {
  return api.delete(`${EXPENSES_API}/${id}`);
};
