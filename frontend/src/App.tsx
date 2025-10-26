import { Route } from "react-router";
import { Routes } from "react-router";
import HomePage from "./pages/home";
import CreateNotePage from "./pages/create-note";
import NoteDetailsPage from "./pages/note-details";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateNotePage />} />
        <Route path="/note/:id" element={<NoteDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
