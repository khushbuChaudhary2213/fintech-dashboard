import { useState } from "react";
import AddTransactionModal from "./AddTransactionModal";
import EmptyState from "./EmptyState";

function Transactions({ userRole, transactions, setTransactions, showless }) {
  const [showModal, setShowModal] = useState(false);

  function handleAdd(newtxn) {
    setTransactions([...transactions, newtxn]);
  }

  function handleDelete(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  const sortedTransactions = [...transactions].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return dateA - dateB;
  });

  const displayedTransactions = showless
    ? sortedTransactions.slice(0, 5)
    : sortedTransactions;

  return (
    <div className="transactions-page">
      {/* MODAL */}
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

            {userRole === "Admin" && (
              <button className="btn" onClick={() => setShowModal(true)}>
                Add Transaction
              </button>
            )}
          </div>

          {displayedTransactions.map((el) => (
            <div className="txn-row" key={el.id}>
              <div className="txn-left">
                <div className="txn-icon">{el.icon}</div>
                <div>
                  <p className="txn-title">{el.title}</p>
                  <span className="txn-sub">{el.type}</span>
                </div>
              </div>

              <div className="txn-date">
                <p>{el.date}</p>
                <span>{el.time}</span>
              </div>

              <div className="txn-amount">${el.amount}</div>

              {userRole === "Admin" ? (
                <div className="txn-action">
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(el.id)}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <div
                  className={`txn-status ${
                    el.type === "income" ? "income" : "expense"
                  }`}
                >
                  {el.type === "income" ? "Income" : "Expense"}
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
