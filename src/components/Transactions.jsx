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

  let displayedTransactions = showless
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

            <div className="control-group sort-control-group">
              <button
                className="sort-btn sort-btn-title"
                onClick={() => {
                  setSortBy("alphabet");
                  setIsAsc(!isAsc);
                }}
              >
                Title ⬇⬆
              </button>
              <button
                className="sort-btn-date sort-btn"
                onClick={() => {
                  setSortBy("date");
                  setIsAsc(!isAsc);
                }}
              >
                Date ⬇⬆
              </button>
              <button
                className="sort-btn-amount sort-btn"
                onClick={() => {
                  setSortBy("amount");
                  setIsAsc(!isAsc);
                }}
              >
                Amount ⬇⬆
              </button>
            </div>
          </div>

          {displayedTransactions.length > 0 ? (
            displayedTransactions.map((el) => (
              <div
                className={`txn-row ${userRole === "User" ? "user-cols" : "admin-cols"}`}
                key={el.id}
              >
                <div className="txn-left">
                  {userRole === "Admin" && (
                    <input
                      style={{
                        cursor: "pointer",
                        width: "16px",
                        height: "16px",
                      }}
                      type="checkbox"
                      checked={selectedIds.includes(el.id)}
                      onChange={() => toggleSelection(el.id)}
                    />
                  )}
                  <div className="txn-icon material-symbols-outlined ">
                    {icons[el.category.toLowerCase()]
                      ? icons[el.category.toLowerCase()]
                      : el.title.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="txn-title">{el.title}</p>
                    <span className="txn-sub">{el.category}</span>
                  </div>
                </div>

                <div className="txn-date">
                  <p>{el.date}</p>
                  <span>{el.time}</span>
                </div>

                <div className="txn-amount">${el.amount}</div>

                <div
                  className={`txn-status ${
                    el.type === "income" ? "income" : "expense"
                  }`}
                >
                  {el.type === "income" ? "Income" : "Expense"}
                </div>

                {userRole === "Admin" && (
                  <div className="txn-action">
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(el.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <EmptyState />
          )}
        </>
      )}
    </div>
  );
}

export default Transactions;
