import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
import { Main } from "./pages/Main";
import { Login } from "./pages/Login";
import { ControlTickets } from "./pages/ControlTickets";

export const App = () => {
  const { user, loading } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />} />
        <Route
          element={
            <ProtectedRoute loading={loading} isForUser={false} user={user} />
          }
        >
          <Route path="/login" element={<Login />} />
        </Route>
        <Route
          element={
            <ProtectedRoute
              loading={loading}
              isForUser={true}
              user={user}
              redirectTo="/login"
            />
          }
        >
          <Route path="/control-tickets" element={<ControlTickets />} />
        </Route>
        <Route path="*" element={<h1>Error 404</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
