import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../../components/ErrorAlert";
import Button from "../../elements/Button";
import Input from "../../elements/Input";
import useAuth from "../../hooks/useAuth";
import { useDeleteNoteMutation, useUpdateNoteMutation } from "./notesApiSlice";

export default function EditNoteForm({ note, users }) {
  const [updateNote, { isLoading, isSuccess, error }] = useUpdateNoteMutation();
  const { isAdmin, isManager } = useAuth();
  const [deleteNote, { isSuccess: isDelSuccess, error: delError }] =
    useDeleteNoteMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [user, setUser] = useState(note.user);
  const [completed, setCompleted] = useState(note.completed);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("");
      setText("");
      setUser("");
      navigate("/dash/notes");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onCompletedChanged = (e) => setCompleted((prev) => !prev);

  const onUserChanged = (e) => {
    setUser(e.target.value);
  };

  const canSave = [user, title, text].every(Boolean) && !isLoading;

  const onSaveNoteClicked = async (e) => {
    e.preventDefault();

    await updateNote({ id: note.id, title, text, user, completed });
  };

  const onDeleteNoteClicked = async (e) => {
    e.preventDefault();
    await deleteNote({ id: note.id });
  };

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    );
  });

  const errContent = (error?.data?.message || delError?.data?.message) ?? "";

  return (
    <div>
      <form onSubmit={onSaveNoteClicked}>
        <h2 className="text-2xl font-semibold mb-6">Edit Note</h2>

        <div className="w-full lg:w-1/2 lg:mx-auto">
          <div className="mb-5">
            <Input
              label="Title"
              id="title"
              type="text"
              value={title}
              onChange={onTitleChanged}
              autoComplete="off"
            />
          </div>

          <div className="mb-5">
            <Input
              label="Text"
              id="text"
              type="text"
              value={text}
              onChange={onTextChanged}
              autoComplete="off"
            />
          </div>

          <div className="mb-5">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="user"
            >
              Assigned User
            </label>
            <select
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              id="user"
              name="user"
              size="3"
              value={user}
              onChange={onUserChanged}
            >
              {options}
            </select>
          </div>

          <div className="mb-5">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="completed"
            >
              has Note Completed?
            </label>

            <input
              id="completed"
              type="checkbox"
              checked={completed}
              onChange={onCompletedChanged}
              autoComplete="off"
            />
          </div>

          <Button
            type="submit"
            disabled={!canSave}
            label="Save"
            icon={<FontAwesomeIcon icon={faSave} className="mr-2" />}
          >
            Save
          </Button>

          {(isAdmin || isManager) && (
            <Button
              variant="danger-outline"
              label="Delete"
              className="ml-4"
              icon={<FontAwesomeIcon icon={faTrash} className="mr-2" />}
              onClick={onDeleteNoteClicked}
            >
              Delete
            </Button>
          )}

          <p className="h-[20px] mt-4">
            <ErrorAlert message={errContent} />
          </p>
        </div>
      </form>
    </div>
  );
}
