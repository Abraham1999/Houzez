import "./App.css";
import "tailwindcss/tailwind.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing";
import PropertyPage from "./pages/property";
import SellersPage from "./pages/seller";
import BuyersPage from "./pages/buyer";
import BookingsPage from "./pages/bookings";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import NotFoundPage from "./pages/notfound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="property" element={<PropertyPage />} />
        <Route path="seller" element={<SellersPage />} />
        <Route path="buyer" element={<BuyersPage />} />
        <Route path="property/:propertyId/booking" element={<BookingsPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
