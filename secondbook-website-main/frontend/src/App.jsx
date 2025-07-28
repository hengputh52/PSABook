import { Routes, Route } from "react-router-dom";
import InputInformation from "./components/InputInformation"; // Import InputInformation component
import SellNow from "./pages/SellNow"; // Import SellNow component
import BookDetail from "./pages/BookDetail";
import Nav from "./components/Nav"; // Import Nav component
import HomePage from "./pages/HomePage"; // Import HomePage component
import SignUp from "./pages/SignUp"; // Import SignUp component
import Profile from "./pages/Profile"; // Import Profile component
import YourCart from "./pages/YourCart"; // Import YourCart component
import BooksYouSell from "./pages/BooksYouSell"; // Import BooksYouSell component
import Footer from "./components/Footer"; // Import Footer component
import FantasyPage from "./components/Book_fantasyPage"; // Import Fantasy Page
import NonFictionPage from "./components/Non_fictionPage"; // Import Non-fiction Page
import FictionPage from "./components/FictionPage"; // Import Fiction Page
import HistoryPage from "./components/HistoryPage"; // Import History Page
import PaymentPage from "./pages/PaymentPage"; // Import PaymentPage component
import "./index.css"; // Import global CSS
import SciFiPage from "./components/Sci-Fi-Page";
import CreditCardPage from "./pages/CreditCartPage";
import QRCodePage from "./pages/QRCodePage";

function App() {
  return (
    
    
    <div>
      
      {/* Navigation Bar */}
      <Nav />

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/your-cart" element={<YourCart />} />
        <Route path="/books-you-sell" element={<BooksYouSell />} />
        <Route path="/genres/science-fiction" element={<SciFiPage />} /> {/* Use BookSciFi for Sci-Fi genre */}
        <Route path="/genres/fantasy" element={<FantasyPage />} />
        <Route path="/genres/non-fiction" element={<NonFictionPage />} />
        <Route path="/genres/fiction" element={<FictionPage />} />
        <Route path="/genres/history" element={<HistoryPage />} />
        <Route path="/book/:id" element={<BookDetail />} /> {/* Generic route for any book */}
        <Route path="/book/:genre/:id" element={<BookDetail />} /> {/* Route with genre for BookDetail */}
        <Route path="/input-info" element={<InputInformation />} />
        <Route path="/sell" element={<SellNow />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/credit-card" element={<CreditCardPage />} />
        <Route path="/qr-code" element={<QRCodePage />} />
        <Route path="*" element={<h1>Page Not Found</h1>} /> {/* Fallback route */}
      </Routes>

      {/* Footer */}
      <Footer />
    </div> 
  );
}

export default App;
