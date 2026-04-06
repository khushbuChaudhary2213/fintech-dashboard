import { useState } from "react";
import AddTransactionModal from "./AddTransactionModal";
import EmptyState from "./EmptyState";
import icons from "../utils/iconsTransaction";

function Transactions({
  userRole,
  transactions,
  setTransactions,
  showless,
  setShowModal,
}) {
  const [sortBy, setSortBy] = useState("date");
  const [filter, setFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const [search, setSearch] = useState("");
  const [isAsc, setIsAsc] = useState(true);

  function handleDelete(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  const toggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === transactions.length) {
      setSelectedIds([]);
    } else {
      const allIds = transactions.map((t) => t.id);
      setSelectedIds(allIds);
    }
  };

  function handleDeleteSelected() {
    setTransactions((prev) =>
      prev.filter((el) => !selectedIds.includes(el.id)),
    );
    setSelectedIds([]);
  }

  function handleDeleteAll() {
    setTransactions([]);
    setSelectedIds([]);
  }

  function handleSearchChange(e) {
    setSearch(e.target.value);
  }

  const filteredTransactions = [...transactions].filter((el) => {
    const matchSearch =
      search === "" ||
      el.title.toLowerCase().includes(search.toLowerCase()) ||
      el.category.toLowerCase().includes(search.toLowerCase());

    const matchFilter = filter === "all" || el.type === filter;

    return matchSearch && matchFilter;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    let comparison = 0;

    if (sortBy === "alphabet") {
      comparison = a.title.localeCompare(b.title);
    } else if (sortBy === "date") {
      comparison = new Date(a.date) - new Date(b.date);
    } else if (sortBy === "amount") {
      comparison = a.amount - b.amount;
    }

    // If isAsc is true, return comparison. If false, reverse it.
    return isAsc ? comparison : -comparison;
  });

  const displayedTransactions = showless
    ? sortedTransactions.slice(0, 5)
    : sortedTransactions;

  return (
    <div className="transactions-page">
      {transactions.length === 0 ? (
        <EmptyState
          message="No transactions to display"
          subMessage="Add a transaction to get started 🚀"
          showButton={userRole === "Admin"}
          onAdd={() => setShowModal(true)}
        />
      ) : (
        <>
          <div className="transactions-header">
            <h3>Transactions</h3>
            {userRole === "Admin" && (
              <>
                <button className="btn" onClick={() => setShowModal(true)}>
                  Add Transaction
                </button>
                {selectedIds.length > 0 && (
                  <>
                    <div>
                      <button
                        style={{ cursor: "pointer" }}
                        id="selectAllTransactions"
                        onClick={(e) => handleSelectAll(e)}
                      >
                        {selectedIds.length === transactions.length
                          ? "Deselect All"
                          : "Select All"}
                      </button>

                      <button
                        style={{ cursor: "pointer" }}
                        onClick={
                          selectedIds.length === transactions.length
                            ? handleDeleteAll
                            : handleDeleteSelected
                        }
                        id="deleteAllTransactions"
                      >
                        {selectedIds.length === transactions.length
                          ? "Delete All"
                          : "Delete"}
                      </button>
                    </div>
                  </>
                )}
              </>
            )}

            <input
              name="search-bar"
              type="text"
              value={search}
              placeholder="Search By Title/Category"
              onChange={handleSearchChange}
            />
            <div className="control-group">
              <label>Filter:</label>
              <select
                id="filterTransactions"
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
          </div>
          <table className="transactions-table">
            <thead>
              <tr className="sort-control-group">
                <th className="txn-left">
                  <button
                    className="sort-btn sort-btn-title"
                    onClick={() => {
                      setSortBy("alphabet");
                      setIsAsc(sortBy === "alphabet" ? !isAsc : true);
                    }}
                  >
                    Title{" "}
                    <span class="material-symbols-outlined">
                      {sortBy === "alphabet"
                        ? isAsc
                          ? "south"
                          : "north"
                        : "arrows_up_down_circle"}
                    </span>
                    {/* {isAsc ? "⬇" : "⬆"} */}
                  </button>
                </th>
                <th className="txn-date">
                  <button
                    className="sort-btn-date sort-btn"
                    onClick={() => {
                      setSortBy("date");
                      setIsAsc(sortBy === "date" ? !isAsc : true);
                    }}
                  >
                    Date{" "}
                    <span class="material-symbols-outlined">
                      {sortBy === "date"
                        ? isAsc
                          ? "south"
                          : "north"
                        : "arrows_up_down_circle"}
                    </span>
                  </button>
                </th>
                <th className="txn-amount">
                  <button
                    className="sort-btn-amount sort-btn"
                    onClick={() => {
                      setSortBy("amount");
                      setIsAsc(sortBy === "amount" ? !isAsc : true);
                    }}
                  >
                    Amount{" "}
                    <span class="material-symbols-outlined">
                      {sortBy === "amount"
                        ? isAsc
                          ? "south"
                          : "north"
                        : "arrows_up_down_circle"}
                    </span>
                  </button>
                </th>
                <th className="txn-status">Status</th>
                {userRole === "Admin" && <th className="txn-action">Action</th>}
              </tr>
            </thead>
            <tbody>
              {displayedTransactions.length > 0 ? (
                displayedTransactions.map((el) => (
                  <tr
                    className={`txn-row ${userRole === "User" ? "user-cols" : "admin-cols"}`}
                    key={el.id}
                  >
                    <td className="txn-left">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        {userRole === "Admin" && (
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(el.id)}
                            onChange={() => toggleSelection(el.id)}
                          />
                        )}
                        <div className="txn-icon material-symbols-outlined ">
                          {icons[el.category.toLowerCase()] ||
                            el.title.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="txn-title">{el.title}</p>
                          <span className="txn-sub">{el.category}</span>
                        </div>
                      </div>
                    </td>
                    <td className="txn-date">
                      <p>{el.date}</p>
                      <span>{el.time}</span>
                    </td>
                    <td className="txn-amount">${el.amount}</td>
                    <td className="txn-status">
                      <div className={`status-pill ${el.type}`}>
                        {el.type.charAt(0).toUpperCase() + el.type.slice(1)}
                      </div>
                    </td>
                    {userRole === "Admin" && (
                      <td className="txn-action">
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(el.id)}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={userRole === "Admin" ? 5 : 4}>
                    <EmptyState message="No matching transactions found" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Transactions;
