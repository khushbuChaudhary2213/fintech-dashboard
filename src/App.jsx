import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import TransactionsPage from "./pages/TransactionsPage";
import { useEffect, useState } from "react";
import transactionsData from "./data/transactions";

function App() {
  const [activePage, setActivePage] = useState(() => {
    const savedPage = localStorage.getItem("activePage");
    return savedPage ? savedPage : "dashboard";
  });
  const [userRole, setUserRole] = useState(() => {
    const savedUser = localStorage.getItem("userRole");
    return savedUser ? savedUser : "User";
  });
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    const parsed = saved ? JSON.parse(saved) : null;

    return parsed && parsed.length > 0 ? JSON.parse(saved) : transactionsData;
  });

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
    localStorage.setItem("activePage", activePage);
    localStorage.setItem("userRole", userRole);
  }, [transactions, activePage, userRole]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.body.classList.toggle("dark");
  };

  return (
    <div className="container">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="main">
        <div className="header">
          <div className="logo material-symbols-outlined">finance_mode</div>
          <div className="username">
            <div style={{ display: "flex", gap: "6px" }}>
              <h2>Welcome</h2>
              <h2>{userRole}</h2>
              <select
                onChange={(e) => setUserRole(e.target.value)}
                style={{ marginLeft: "4px" }}
              >
                Role:
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <p>Explore Finance</p>
          </div>
          <div className="search">🔍</div>
          <button className="dark-mode" onClick={toggleDarkMode}>
            {isDark ? "☀️" : "🌙"}
          </button>
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
