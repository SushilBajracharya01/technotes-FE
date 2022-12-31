import { useEffect } from "react"
import { usersApiSlice } from "../Users/userApiSlice";

import { store } from '../../app/store'
import { Outlet } from "react-router-dom";
import { notesApiSlice } from "../Notes/notesApiSlice";

export default function Prefetch() {
    useEffect(() => {
        store.dispatch(notesApiSlice.util.prefetch('getNotes', 'notesList', { force: true }));
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }));
    }, []);

    return <Outlet />
}