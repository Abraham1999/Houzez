import "./App.css";
import "tailwindcss/tailwind.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing";
import PropertyPage from "./pages/property";
import SellersPage from "./pages/seller";
import BuyersPage from "./pages/buyer";
import BookingsPage from "./pages/bookings";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import NotFoundPage from "./pages/notfound";
import Navbar from "./layout/Navbar";

function App() {
  return (
    <div>
      <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="property" element={<PropertyPage />} />
          <Route path="sellers" element={<SellersPage />} />
          <Route path="buyers" element={<BuyersPage />} />
          <Route
            path="property/:propertyId/booking"
            element={<BookingsPage />}
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </div>
  );
}

export default App;
