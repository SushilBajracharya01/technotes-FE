import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useDeleteNoteMutation } from "./notesApiSlice";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

import { useGetNotesQuery } from "./notesApiSlice";
import { memo } from "react";

function Note({ noteId }) {
  const { note } = useGetNotesQuery("noteslist", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[noteId],
    }),
  });
  const navigate = useNavigate();
  const { isAdmin, isManager } = useAuth();

  const [deleteNote] = useDeleteNoteMutation();

  const handleEdit = () => navigate(`/dash/notes/${noteId}`);

  const handleDelete = async (noteId) => {
    try {
      await deleteNote({ id: noteId });
      Swal.fire("Deleted!", "Note has been deleted.", "success");
    } catch (err) {}
  };

  if (note) {
    return (
      <tr className="bg-white border-b hover:bg-gray-50 text-center text-gray-800">
        <td
          className={`py-3 ${
            note.completed ? "text-green-600" : "text-red-600"
          }`}
        >
          {note.completed ? "Completed" : "Open"}
        </td>
        <td className={`py-3`}>{note.title}</td>
        <td className={`py-3`}>{note.text}</td>
        <td className={`py-3`}>{note.username}</td>
        <td className={`py-3`}>
          <button
            className="text-blue-500 mx-1 text-xl hover:text-blue-600"
            onClick={handleEdit}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          {(isAdmin || isManager) && (
            <button
              className="text-red-500 mx-1 text-xl hover:text-red-600"
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleDelete(note.id);
                  }
                });
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          )}
        </td>
      </tr>
    );
  } else return null;
}

const memoizedNote = memo(Note);
export default memoizedNote;
