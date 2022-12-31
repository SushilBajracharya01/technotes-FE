import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../../components/ErrorAlert";
import Button from "../../elements/Button";
import Input from "../../elements/Input";
import { useAddNewNoteMutation } from "./notesApiSlice";

export default function NewNoteForm({ users }) {
  const [addNewNote, { isLoading, isSuccess, error }] = useAddNewNoteMutation();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setTitle("");
      setUser("");
      navigate("/dash/notes");
    }
  }, [isSuccess, navigate]);

  const onSaveNoteClicked = async (e) => {
    e.preventDefault();

    if (canSave) {
      await addNewNote({ title, text, user });
    }
  };

  const onTitleChanged = (e) => {
    setTitle(e.target.value);
  };
  const onTextChanged = (e) => {
    setText(e.target.value);
  };
  const onUserChanged = (e) => {
    setUser(e.target.value);
  };

  const canSave = [user, title, text].every(Boolean) && !isLoading;

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    );
  });

  return (
    <div>
      <form onSubmit={onSaveNoteClicked}>
        <h2 className="text-2xl font-semibold mb-6">New Note</h2>

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

          <Button
            type="submit"
            disabled={!canSave}
            label="Save"
            icon={<FontAwesomeIcon icon={faSave} className="mr-2" />}
          >
            Save
          </Button>

          <p className="h-[20px] mt-4">
            <ErrorAlert message={error?.data?.message} />
          </p>
        </div>
      </form>
    </div>
  );
}
