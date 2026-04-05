import "./transaction.css";
import Transactions from "../components/Transactions";

function TransactionsPage({ userRole, transactions, setTransactions }) {
  return (
    <div className="content">
      <Transactions
        userRole={userRole}
        transactions={transactions}
        setTransactions={setTransactions}
      />
    </div>
  );
}

export default TransactionsPage;
