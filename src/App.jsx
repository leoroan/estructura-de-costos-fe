import { UserProvider } from "./context/UserContext.jsx";
import { AppRoute } from "./routes/AppRoute";
// import { Navbar } from "../components/Navbar.jsx";
// import { Footer } from "../components/Footer.jsx";
import "./styles/globals.css";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="app-shell d-flex flex-column min-vh-100">
          {/* <Navbar /> */}
          <main className="grow">
            <AppRoute />
          </main>
          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}
