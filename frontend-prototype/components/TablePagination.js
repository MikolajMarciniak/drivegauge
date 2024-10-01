import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAnglesLeft,
  faAngleRight,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

export const Pagination = ({
  activePage,
  count,
  rowsPerPage,
  totalPages,
  setActivePage,
}) => {
  const beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1;
  const end = activePage === totalPages ? count : beginning + rowsPerPage - 1;

  return (
    <>
      <div className="flex flex-col w-full lg:flex-row">
        <button
          className="flex-grow rounded-bl-lg rounded-none btn"
          onClick={() => setActivePage(1)}
        >
          {<FontAwesomeIcon className="font-bold" icon={faAnglesLeft} />} First
        </button>
        <button
          className="flex-grow rounded-none btn"
          disabled={activePage === 1}
          onClick={() => setActivePage(activePage - 1)}
        >
          {<FontAwesomeIcon icon={faAngleLeft} />} Previous
        </button>
        <button
          className="flex-grow rounded-none btn"
          disabled={activePage === totalPages}
          onClick={() => setActivePage(activePage + 1)}
        >
          Next {<FontAwesomeIcon icon={faAngleRight} />}
        </button>
        <button
          className="flex-grow rounded-br-lg rounded-none btn"
          disabled={activePage === totalPages}
          onClick={() => setActivePage(totalPages)}
        >
          Last {<FontAwesomeIcon icon={faAnglesRight} />}
        </button>
      </div>
      <p>
        Page {activePage} of {totalPages}
      </p>
      <p>
        Rows: {beginning === end ? end : `${beginning} - ${end}`} of {count}
      </p>
    </>
  );
};
