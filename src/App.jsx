import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import TransactionsPage from "./pages/TransactionsPage";
import AddTransactionModal from "./components/AddTransactionModal";
import { useEffect, useState } from "react";
import transactionsData from "./data/transactions";

function App() {
  const [showModal, setShowModal] = useState(false);

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

  const [isDark, setIsDark] = useState(() => {
    const savedMode = localStorage.getItem("isDark");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
    localStorage.setItem("activePage", activePage);
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("isDark", JSON.stringify(isDark));
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [transactions, activePage, userRole, isDark]);

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
            </div>
            <p>Explore Finance</p>
          </div>
          <button
            className="userRole"
            style={{
              alignSelf: "center",
              cursor: "pointer",
            }}
            onClick={() => setUserRole(userRole === "Admin" ? "User" : "Admin")}
          >
            {userRole === "User" ? "Admin" : "User"}
          </button>
          <button className="dark-mode" onClick={toggleDarkMode}>
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>

        {showModal && (
          <AddTransactionModal
            onClose={() => setShowModal(false)}
            onAdd={(newTxn) => setTransactions([...transactions, newTxn])}
          />
        )}

        {activePage === "dashboard" && (
          <Dashboard
            userRole={userRole}
            transactions={transactions}
            setTransactions={setTransactions}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
        {activePage === "transactions" && (
          <TransactionsPage
            userRole={userRole}
            transactions={transactions}
            setTransactions={setTransactions}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </div>
    </div>
  );
}

export default App;
