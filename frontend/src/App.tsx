import { Route } from "react-router";
import { Routes } from "react-router";
import HomePage from "./pages/home";
import CreateNotePage from "./pages/create-note";
import NoteDetailsPage from "./pages/note-details";
import SignUpPage from "./pages/auth/sign-up";
import Login from "./pages/auth/login";
import GuestGard from "./components/guards/guest-gard";
import AuthGuard from "./components/guards/auth-guard";

function App() {
  return (
    <div className="w-full mx-auto min-h-screen overflow-y-hidden relative">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      <Routes>
        {/*auth route group*/}
        <Route element={<AuthGuard />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateNotePage />} />
          <Route path="/note/:id" element={<NoteDetailsPage />} />
        </Route>

        {/*guest route group*/}
        <Route element={<GuestGard />}>
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
