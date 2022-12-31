import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "./userApiSlice";
import Swal from "sweetalert2";
import { memo } from "react";

function User({ userId }) {
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });
  const navigate = useNavigate();

  const [deleteUser] = useDeleteUserMutation();

  const handleEdit = () => navigate(`/dash/users/${userId}`);
  console.log(user, "user", userId);
  if (user) {
    const userRolesString = user.roles.toString().replaceAll(",", ", ");

    const cellStatus = user.active ? "" : "table__cell--inactive";

    const handleDelete = async (userId) => {
      try {
        await deleteUser({ id: userId });
        Swal.fire("Deleted!", "User has been deleted.", "success");
      } catch (err) {}
    };

    return (
      <tr className="bg-white border-b hover:bg-gray-50 text-center text-gray-800">
        <td className={`table__cell ${cellStatus} py-3`}>{user.username}</td>
        <td className={`table__cell ${cellStatus} py-3`}>{userRolesString}</td>
        <td className={`table__cell ${cellStatus} py-3`}>
          <button
            className="text-blue-500 mx-1 text-xl hover:text-blue-600"
            onClick={handleEdit}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>

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
                  handleDelete(user.id);
                }
              });
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </td>
      </tr>
    );
  } else return null;
}

const memoziedUser = memo(User);
export default memoziedUser;
