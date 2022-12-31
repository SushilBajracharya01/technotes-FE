import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../../components/ErrorAlert";
import Loading from "../../components/Loading";
import Button from "../../elements/Button";
import Note from "./Note";
import { useGetNotesQuery } from "./notesApiSlice";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";

/**
 *
 */
export default function Notes() {
  const {
    data: notes,
    error,
    isLoading,
    isError,
    isSuccess,
  } = useGetNotesQuery("notesList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const navigate = useNavigate();
  useTitle("Technotes - Notes");

  const { username, isAdmin, isManager } = useAuth();

  let content;
  if (isLoading) {
    content = <Loading />;
  }

  if (isError) {
    content = <ErrorAlert message={error?.data?.message} />;
  }

  if (isSuccess) {
    const { ids, entities } = notes;

    let filteredIds;
    if (isManager || isAdmin) {
      filteredIds = [...ids];
    } else {
      filteredIds = ids.filter(
        (noteId) => entities[noteId].username === username
      );
    }

    const tableContent =
      filteredIds?.length &&
      filteredIds.map((noteId) => <Note key={noteId} noteId={noteId} />);

    const onAddNoteClick = () => {
      navigate("new");
    };
    content = (
      <>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Notes</h2>

          <Button
            icon={<FontAwesomeIcon className="mr-2" icon={faPlus} />}
            variant="primary"
            label="Add Note"
            onClick={onAddNoteClick}
          />
        </div>
        <table className="table-fixed w-full text-gray-500">
          <thead className="text-sm text-gray-700 bg-gray-50 uppercase">
            <tr>
              <th scope="col" className="py-3">
                Status
              </th>
              <th scope="col" className="py-3">
                Title
              </th>
              <th scope="col" className="py-3">
                Text
              </th>
              <th scope="col" className="py-3">
                User
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
