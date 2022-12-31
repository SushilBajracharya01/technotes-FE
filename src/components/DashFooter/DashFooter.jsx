import useAuth from "../../hooks/useAuth";

/**
 *
 */
export default function DashFooter() {
  const { username, status, isAdmin, isManager } = useAuth();

  console.log(username, "username");

  return (
    <footer className="container bg-white sm:rounded p-4 sm:p-12 mx-auto mt-4 text-center">
      <div className="flex justify-around">
        <p className="flex">
          Current User:{" "}
          <p className="ml-2 font-bold text-blue-600">{username}</p>
        </p>
        <p className="flex">
          Status:{" "}
          <p
            className={`ml-2 font-bold ${
              isAdmin
                ? "text-blue-600"
                : isManager
                ? "text-violet-700"
                : "text-pink-600"
            }`}
          >
            {status}
          </p>
        </p>
      </div>
    </footer>
  );
}
