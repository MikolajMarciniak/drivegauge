import { useState, useMemo } from "react";
import { sortRows, filterRows, paginateRows } from "./TableHelpers";
import { Pagination } from "./TablePagination";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortUp,
  faSortDown,
  faSort,
} from "@fortawesome/free-solid-svg-icons";

export const Table = ({ columns, rows, dash }) => {
  // Table component for driver page
  const [activePage, setActivePage] = useState(1);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({ order: "asc", orderBy: "id" });
  const rowsPerPage = 5;

  const filteredRows = useMemo(
    () => filterRows(rows, filters),
    [rows, filters]
  );
  const sortedRows = useMemo(
    () => sortRows(filteredRows, sort),
    [filteredRows, sort]
  );
  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage);

  const count = filteredRows.length;
  const totalPages = Math.ceil(count / rowsPerPage);

  const handleSearch = (value, accessor) => {
    setActivePage(1);

    if (value) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [accessor]: value,
      }));
    } else {
      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };
        delete updatedFilters[accessor];

        return updatedFilters;
      });
    }
  };

  const handleSort = (accessor) => {
    setActivePage(1);
    setSort((prevSort) => ({
      order:
        prevSort.order === "asc" && prevSort.orderBy === accessor
          ? "desc"
          : "asc",
      orderBy: accessor,
    }));
  };

  const clearAll = () => {
    setSort({ order: "asc", orderBy: "id" });
    setActivePage(1);
    setFilters({});
  };

  const router = useRouter();
  const handleRowClick = (id) => {
    const path = `/driver/${id}`;
    router.push(path);
  };
  return (
    <>
      <table className={`table w-full ${dash ? "dash" : null}`}>
        <thead>
          <tr key={-1}>
            {columns.map((column) => {
              const sortIcon = () => {
                if (column.accessor === sort.orderBy) {
                  if (sort.order === "asc") {
                    return <FontAwesomeIcon icon={faSortUp} />;
                  }
                  return <FontAwesomeIcon icon={faSortDown} />;
                } else {
                  return <FontAwesomeIcon icon={faSort} />;
                }
              };
              return (
                <th
                  style={{ fontSize: "14px", paddingBottom: "0px" }}
                  key={column.accessor}
                >
                  <span>{column.label}</span>
                  <button onClick={() => handleSort(column.accessor)}>
                    {column.Header} <span className="pl-2">{sortIcon()}</span>
                  </button>
                </th>
              );
            })}
          </tr>
          <tr key={-2}>
            {columns.map((column) => {
              return (
                <th key={`${column.accessor}-search`}>
                  <input
                    key={`${column.accessor}-search`}
                    type="search"
                    placeholder={`Search ${column.label}`}
                    value={filters[column.accessor]}
                    onChange={(event) =>
                      handleSearch(event.target.value, column.accessor)
                    }
                    className="input input-bordered input-s w-full h-8 text-sm max-w-xs"
                  />
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {calculatedRows.map((row, index) => {
            return (
              <tr
                className={` ${
                  dash ? "cursor-pointer hover:font-bold dash-link" : null
                }`}
                key={dash ? row.id : index}
                onClick={
                  dash
                    ? () => {
                        handleRowClick(row.id);
                      }
                    : null
                }
              >
                {columns.map((column) => {
                  if (column.format) {
                    return (
                      <td className="rounded-none" key={column.accessor}>
                        {column.format(row[column.accessor])}
                      </td>
                    );
                  }
                  return (
                    <td className="rounded-none" key={column.accessor}>
                      {row[column.accessor]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {count > 0 ? (
        <Pagination
          activePage={activePage}
          count={count}
          rowsPerPage={rowsPerPage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
      ) : (
        <p>No data found</p>
      )}

      <div>
        <p>
          <button onClick={clearAll}>Clear all</button>
        </p>
      </div>
    </>
  );
};

Table.defaultProps = {
  dash: false,
};
