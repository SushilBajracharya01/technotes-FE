import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";
import Button from "../../elements/Button";
import Input from "../../elements/Input";
import { useAddNewUserMutation } from "./userApiSlice";

import ErrorAlert from "../../components/ErrorAlert";

export default function NewUserForm() {
  const [addNewUser, { isLoading, isSuccess, error }] = useAddNewUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setRoles(values);
  };

  const canSave =
    [roles.length, username.length, password.length].every(Boolean) &&
    !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();

    if (canSave) {
      await addNewUser({ username, password, roles });
    }
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  return (
    <div>
      <form onSubmit={onSaveUserClicked}>
        <h2 className="text-2xl font-semibold mb-6">New User</h2>

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
