import React from "react";
import { useParams } from "react-router-dom";
import ErrorAlert from "../../components/ErrorAlert";
import Loading from "../../components/Loading";
import useAuth from "../../hooks/useAuth";
import { useGetUsersQuery } from "../Users/userApiSlice";
import EditNoteForm from "./EditNoteForm";
import { useGetNotesQuery } from "./notesApiSlice";

export default function EditNote() {
  const { id } = useParams();

  const { username, isAdmin, isManager } = useAuth();

  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id],
    }),
  });

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!note || !users?.length) return <Loading />;

  if (isAdmin || isManager) {
    if (note.username === username) {
      return <ErrorAlert message={"NO access"} />;
    }
  }

  const content = <EditNoteForm note={note} users={users} />;

  return content;
}
