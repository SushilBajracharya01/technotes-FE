import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../../components/ErrorAlert";
import { ROLES } from "../../config/roles";
import Button from "../../elements/Button";
import Input from "../../elements/Input";
import { useDeleteUserMutation, useUpdateUserMutation } from "./userApiSlice";

export default function EditUserForm({ user }) {
  const [updateUser, { isLoading, isSuccess, error }] = useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, error: delError },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onActiveChanged = (e) => setActive((prev) => !prev);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setRoles(values);
  };

  let canSave;

  if (password) {
    canSave =
      [roles.length, username.length, password.length].every(Boolean) &&
      !isLoading;
  } else {
    canSave = [roles.length, username.length].every(Boolean) && !isLoading;
  }

  const onSaveUserClicked = async (e) => {
    e.preventDefault();

    if (password) {
      await updateUser({ id: user.id, username, password, roles, active });
    } else {
      await updateUser({ id: user.id, username, roles, active });
    }
  };

  const onDeleteUserClicked = async (e) => {
    e.preventDefault();
    await deleteUser({ id: user.id });
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  const errContent = (error?.data?.message || delError?.data?.message) ?? "";

  return (
    <div>
      <form onSubmit={onSaveUserClicked}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold ">Edit User</h2>
        </div>

        <div className="w-full lg:w-1/2 lg:mx-auto">
          <div className="mb-5">
            <Input
              label="Username"
              id="username"
              type="text"
              value={username}
              onChange={onUsernameChanged}
              autoComplete="off"
            />
          </div>

          <div className="mb-5">
            <Input
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={onPasswordChanged}
              autoComplete="off"
            />
          </div>

          <div className="mb-5">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="roles"
            >
              Assigned Roles
            </label>
            <select
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              id="roles"
              name="roles"
              multiple={true}
              size="3"
              value={roles}
              onChange={onRolesChanged}
            >
              {options}
            </select>
          </div>

          <div className="mb-5">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="active"
            >
              Active
            </label>

            <input
              id="active"
              type="checkbox"
              checked={active}
              onChange={onActiveChanged}
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

          <Button
            variant="danger-outline"
            label="Delete"
            className="ml-4"
            icon={<FontAwesomeIcon icon={faTrash} className="mr-2" />}
            onClick={onDeleteUserClicked}
          >
            Delete
          </Button>

          <p className="h-[20px] mt-4">
            <ErrorAlert message={errContent} />
          </p>
        </div>
      </form>
    </div>
  );
}
