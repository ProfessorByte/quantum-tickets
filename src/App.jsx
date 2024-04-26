import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
import { Main } from "./pages/Main";
import { Login } from "./pages/Login";
// import { ControlTickets } from "./pages/ControlTickets";
import { NavBar } from "./components/NavBar";

export const App = () => {
  const { login, logout, loading, user } = useAuth();

  return (
    <BrowserRouter>
      <NavBar user={user} logout={logout} />
      <Routes>
        <Route index element={<Main user={user} />} />
        <Route
          element={
            <ProtectedRoute loading={loading} isForUser={false} user={user} />
          }
        >
          <Route path="/login" element={<Login login={login} />} />
        </Route>
        {/* <Route path="/control-tickets" element={<ControlTickets />} /> */}
        <Route path="*" element={<h1>Error 404</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
