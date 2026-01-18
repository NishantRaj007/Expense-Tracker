import api from "./api";

export const getMonthlyTotal = () =>
  api.get("/api/expenses/analytics/monthly-total");

export const getCategoryAnalytics = () =>
  api.get("/api/expenses/analytics/category");
