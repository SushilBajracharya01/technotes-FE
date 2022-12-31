import Loading from "../../components/Loading";
import { useGetUsersQuery } from "../Users/userApiSlice";
import NewNoteForm from "./NewNoteForm";

export default function NewNote() {
  const users = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!users?.length) return <Loading />;

  const content = <NewNoteForm users={users} />;

  return content;
}
