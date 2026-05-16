import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider } from "./theme";
import Landing from "./pages/landing";
import Login from "./pages/login";
import AppPage from "./pages/app";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app" element={<AppPage />} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
