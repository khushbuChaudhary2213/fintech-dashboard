import { useState } from "react";
import AddTransactionModal from "./AddTransactionModal";
import EmptyState from "./EmptyState";

const icons = {
  food: "food_bank",
  salary: "paid",
  shopping: "shopping_bag",
  transport: "transportation",
  health: "health_and_safety",
  bills: "list_alt",
  education: "book_2",
  bonus: "attach_money",
  investment: "universal_currency_alt",
};

function Transactions({ userRole, transactions, setTransactions, showless }) {
  const [showModal, setShowModal] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const [filter, setFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);

  function handleAdd(newtxn) {
    setTransactions([...transactions, newtxn]);
  }

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

  const filteredTransactions = [...transactions].filter((el) => {
    if (filter === "all") return transactions;
    if (filter === "income") return el.type === "income";
    if (filter === "expense") return el.type === "expense";
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === "date") {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    }
    if (sortBy === "alphabet") {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === "amount") {
      return a.amount - b.amount;
    }
  });

  const displayedTransactions = showless
    ? sortedTransactions.slice(0, 5)
    : sortedTransactions;

  return (
    <div className="transactions-page">
      {showModal && (
        <AddTransactionModal
          onClose={() => setShowModal(false)}
          onAdd={handleAdd}
        />
      )}
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

            <div className="controls">
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
              <div className="control-group"></div>
              <label>Sort By:</label>
              <select
                id="sortTransactions"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="alphabet">Alphabet</option>
                <option value="date">Date</option>
                <option value="amount">Amount</option>
              </select>
            </div>
            {userRole === "Admin" && (
              <>
                {selectedIds.length > 0 && (
                  <>
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
                  </>
                )}

                <button className="btn" onClick={() => setShowModal(true)}>
                  Add Transaction
                </button>
              </>
            )}
          </div>

          {displayedTransactions.map((el) => (
            <div
              className={`txn-row ${userRole === "User" ? "user-cols" : "admin-cols"}`}
              key={el.id}
            >
              <div className="txn-left">
                {userRole === "Admin" && (
                  <input
                    style={{ cursor: "pointer", width: "16px", height: "16px" }}
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
          ))}
        </>
      )}
    </div>
  );
}

export default Transactions;
