import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import { selectCurrentToken } from '../app/auth/authSlice'

export default function useAuth() {
    const token = useSelector(selectCurrentToken);

    let isManager = false;
    let isAdmin = false;

    let status = "Employee";

    if (token) {
        const decoded = jwtDecode(token);
        const { username, roles } = decoded.UserInfo;

        isManager = roles.includes('Manager');
        isAdmin = roles.includes('Admin');

        if (isManager) status = "Manager";
        if (isAdmin) status = "Admin";

        return { username: username, roles: roles, isManager, isAdmin, status }
    }

    return { username: '', roles: [], isManager, isAdmin, status }
}