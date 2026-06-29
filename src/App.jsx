import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";
import { PeriodProvider } from "./context/PeriodContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { AppRoute } from "./routes/AppRoute.jsx";
import "./styles/globals.css";

export default function App() {
  return (
    <UserProvider>
      <PeriodProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-slate-50 text-slate-900">
            <Navbar />
            <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
              <AppRoute />
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </PeriodProvider>
    </UserProvider>
  );
}
