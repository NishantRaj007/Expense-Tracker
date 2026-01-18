import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";

import Dashboard from "./pages/Dashboard";
import AddExpensePage from "./pages/AddExpensePage";
import ExpenseListPage from "./pages/ExpenseListPage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import {
  logout,
  isLoggedIn,
  getUsername,
} from "./services/authService";

/* ================= NAVBAR ================= */

function AppNavbar() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const username = getUsername();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Expense Tracker 💰
        </Typography>

        {loggedIn ? (
          <>
            <Typography sx={{ mr: 2 }}>
              Hi, <b>{username}</b> 👋
            </Typography>

            <Button color="inherit" component={Link} to="/">
              Dashboard
            </Button>

            <Button color="inherit" component={Link} to="/add">
              Add Expense
            </Button>

            <Button color="inherit" component={Link} to="/list">
              Expense List
            </Button>

            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>

            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

/* ================= APP ================= */

function App() {
  return (
    <Router>
      <AppNavbar />

      <Routes>
        {/* 🔓 PUBLIC ROUTES */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        {/* 🔐 PROTECTED ROUTES */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddExpensePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/list"
          element={
            <ProtectedRoute>
              <ExpenseListPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
