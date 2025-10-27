import { Link } from "react-router";
import type { Note } from "../pages/home";
import { PenSquareIcon, TrashIcon } from "lucide-react";
import { formateDate } from "../lib/utils";
import type { Dispatch, FormEvent, SetStateAction } from "react";
import toast from "react-hot-toast";
import api from "../lib/axios";

const NoteCard = ({
  note,
  setNotes,
}: {
  note: Note;
  setNotes: Dispatch<SetStateAction<Note[]>>;
}) => {
  const handleDelete = async (e: FormEvent, id: string) => {
    e.preventDefault();
    try {
      const res = await api.delete(`/notes/${id}`);
      setNotes((prev: Note[]) => prev.filter((note) => note._id !== id));
      toast.success("note deleted successfully", res.data);
    } catch (error) {
      console.log(error);
      toast.error("failed to delete note");
    }
  };
  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00ff9d]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formateDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <TrashIcon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
