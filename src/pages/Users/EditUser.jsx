import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import EditUserForm from "./EditUserForm";
import { useGetUsersQuery } from "./userApiSlice";

function EditUser() {
  const { id } = useParams();

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  const content = user ? <EditUserForm user={user} /> : <Loading />;

  return content;
}

export default EditUser;
