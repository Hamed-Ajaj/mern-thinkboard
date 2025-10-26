import { useParams } from "react-router";

const NoteDetailsPage = () => {
  const { id } = useParams();
  return <div>note {id}</div>;
};

export default NoteDetailsPage;
