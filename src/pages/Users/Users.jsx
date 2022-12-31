import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../../components/ErrorAlert";
import Loading from "../../components/Loading/Loading";
import Button from "../../elements/Button";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import User from "./User";
import { useGetUsersQuery } from "./userApiSlice";

/**
 *
 */
export default function Users() {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const navigate = useNavigate();
  const { isAdmin, isManager } = useAuth();

  useTitle("Technotes - Users");

  let content;

  if (isLoading) {
    content = <Loading />;
  }

  if (isError) {
    content = <ErrorAlert message={error?.data?.message} />;
  }

  if (isSuccess) {
    const { ids } = users;

    const tableContent =
      ids?.length && ids.map((userId) => <User key={userId} userId={userId} />);

    const onAddUserClick = () => {
      navigate("new");
    };

    content = (
      <>
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-semibold">Users</h2>

          {(isAdmin || isManager) && (
            <Button
              icon={<FontAwesomeIcon className="mr-2" icon={faPlus} />}
              variant="primary"
              label="Add User"
              onClick={onAddUserClick}
            />
          )}
        </div>

        <table className="table-fixed w-full text-gray-500">
          <thead className="text-sm text-gray-700 bg-gray-50 uppercase">
            <tr>
              <th scope="col" className="py-3">
                Username
              </th>
              <th scope="col" className="py-3">
                Roles
              </th>
              <th scope="col" className="py-3">
                Edit
              </th>
            </tr>
          </thead>

          <tbody>{tableContent}</tbody>
        </table>
      </>
    );
  }

  return content;
}
