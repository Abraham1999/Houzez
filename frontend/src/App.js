import "./App.css";
import "tailwindcss/tailwind.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context";
import AppRoutes from "./components/routes/AppRoute";
import { routes } from "./utils/data";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster />
      <AuthProvider>
        <Navbar />
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <AppRoutes
                  isPrivate={route.isPrivate}
                  component={route.element}
                />
              }
            />
          ))}
        </Routes>
      </AuthProvider>
      <Footer />
    </div>
  );
}

export default App;
