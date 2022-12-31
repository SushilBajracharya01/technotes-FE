import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import {
  faCalendar,
  faClock,
  faHandDots,
  faNoteSticky,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";

/**
 *
 */
export default function Welcome() {
  const date = dayjs();
  const today = date.format("dddd, MMMM D, YYYY");
  const time = date.format("h:mm A");
  const { username, isAdmin, isManager } = useAuth();

  return (
    <section className="welcome">
      <div className="flex justify-between">
        <p className="text-xl">
          <FontAwesomeIcon icon={faCalendar} className="mr-3" />
          {today}
        </p>
        <p className="text-xl">
          <FontAwesomeIcon icon={faClock} className="mr-3" />
          {time}
        </p>
      </div>

      <h1 className="mt-14 text-4xl text-center mb-14">
        <FontAwesomeIcon icon={faHandDots} className="mr-3" />
        Welcome! {username}
      </h1>

      <div className="flex justify-evenly">
        {(isAdmin || isManager) && (
          <p>
            <Link
              to="/dash/users"
              className="text-pink-600 hover:text-pink-500"
            >
              <FontAwesomeIcon icon={faUser} className="mr-3" />
              View User Settings
            </Link>
          </p>
        )}

        <p>
          <Link to="/dash/notes" className="text-pink-600 hover:text-pink-500">
            <FontAwesomeIcon icon={faNoteSticky} className="mr-3" />
            View techNotes
          </Link>
        </p>
      </div>
    </section>
  );
}
