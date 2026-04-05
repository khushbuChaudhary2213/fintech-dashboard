import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import TransactionsPage from "./pages/TransactionsPage";
import { useEffect, useState } from "react";
import transactionsData from "./data/transactions";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [userRole, setUserRole] = useState("User");
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    const parsed = saved ? JSON.parse(saved) : null;

    return parsed && parsed.length > 0 ? JSON.parse(saved) : transactionsData;
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <div className="container">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content */}
      <div className="main">
        <div className="header">
          <div className="username">
            <select onChange={(e) => setUserRole(e.target.value)}>
              Role:
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
            <h2>Welcome {userRole} 👋</h2>
            <p>Explore Finance</p>
          </div>
          <div className="search"></div>
          <div className="msg"></div>
          <div className="profile"></div>
        </div>

        {activePage === "dashboard" && (
          <Dashboard
            userRole={userRole}
            transactions={transactions}
            setTransactions={setTransactions}
          />
        )}
        {activePage === "transactions" && (
          <TransactionsPage
            userRole={userRole}
            transactions={transactions}
            setTransactions={setTransactions}
          />
        )}
      </div>
    </div>
  );
}

export default App;
