import Transactions from "../components/Transactions";

function TransactionsPage({
  userRole,
  transactions,
  setTransactions,
  showModal,
  setShowModal,
}) {
  return (
    <div className="content">
      <Transactions
        userRole={userRole}
        transactions={transactions}
        setTransactions={setTransactions}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
}

export default TransactionsPage;
