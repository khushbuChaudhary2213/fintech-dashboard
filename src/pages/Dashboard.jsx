import BalanceChart from "../components/BalanceChart";
import CategoryChart from "../components/CategoryChart";
import InsightsBox from "../components/InsightBox";
import Transactions from "../components/Transactions";
import EmptyState from "../components/EmptyState";

function Dashboard({
  userRole,
  transactions,
  setTransactions,
  showModal,
  setShowModal,
}) {
  const income = transactions
    .filter((el) => el.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const expenses = transactions
    .filter((el) => el.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  if (transactions.length === 0) {
    return (
      <div
        className="content"
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <EmptyState
          message="No data to display"
          subMessage="Add transactions from transactions page to see dashboard insights 📊 "
          showButton={userRole === "Admin"}
          onAdd={() => setShowModal(true)}
        />
      </div>
    );
  }

  return (
    <div className="content">
      <div className="left-panel">
        <BalanceChart transactions={transactions} />

        <Transactions
          userRole={userRole}
          transactions={transactions}
          setTransactions={setTransactions}
          showless={5}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </div>

      <div className="right-panel">
        <div style={{ display: "flex", gap: "10px" }}>
          <div className="box income" style={{ flex: "1" }}>
            <h4>Income</h4>
            <p className="price">${income}</p>
          </div>
          <div className="box expense" style={{ flex: "1" }}>
            <h4>Expense</h4>
            <p className="price">${expenses}</p>
          </div>
        </div>

        <CategoryChart transactions={transactions} />

        <InsightsBox transactions={transactions} />
      </div>
    </div>
  );
}

export default Dashboard;
