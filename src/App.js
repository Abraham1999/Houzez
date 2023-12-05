import "./App.css";
import "tailwindcss/tailwind.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing";
import PropertiesPage from "./pages/property";
import SellersPage from "./pages/seller";
import BuyersPage from "./pages/buyer";
import BookingsPage from "./pages/bookings";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import NotFoundPage from "./pages/notfound";
import Navbar from "./layout/Navbar";
import { useEffect, useState } from "react";
import { UserContext } from "./utils/helpers";
import { getUserByEmail } from "./services/actions/users";
import AddProperty from "./pages/property/add";
import PropertyByIdPage from "./pages/property/id";
import Footer from "./layout/Footer";
import SellerId from "./pages/seller/id";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserByEmail()
      .then((data) => {
        setUser(data);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <UserContext.Provider value={user}>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="property" element={<PropertiesPage />} />
          <Route path="property/:id" element={<PropertyByIdPage />} />
          <Route path="property/add" element={<AddProperty />} />
          <Route path="sellers" element={<SellersPage />} />
          <Route path="sellers/:id" element={<SellerId />} />
          <Route path="buyers" element={<BuyersPage />} />
          <Route
            path="property/:propertyId/booking"
            element={<BookingsPage />}
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </UserContext.Provider>
    </div>
  );
}

export default App;
