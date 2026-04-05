import { useEffect, useState } from "react";

function Sidebar({ activePage, setActivePage }) {
  const [showMenu, setShowMenu] = useState(() => {
    const saved = localStorage.getItem("showMenu");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("showMenu", JSON.stringify(showMenu));
  }, [showMenu]);

  return (
    <div className="sidebar">
      <div className={`menu ${showMenu ? "" : "hidden"}`}>
        <div className="menu-item">
          <button
            className="menu-item-logo menu-bar-btn  material-symbols-outlined"
            onClick={() => setShowMenu(!showMenu)}
          >
            menu
          </button>
          {showMenu && <span>Menu Bar</span>}
        </div>

        <div
          className={`menu-item ${activePage === "dashboard" ? "active" : ""}`}
          onClick={() => setActivePage("dashboard")}
        >
          <div
            className={`menu-item-logo material-symbols-outlined ${activePage === "dashboard" ? "active" : ""} `}
          >
            dashboard
          </div>
          {showMenu && <span>Dashboard</span>}
        </div>

        <div
          className={`menu-item ${activePage === "transactions" ? "active" : ""}`}
          onClick={() => setActivePage("transactions")}
        >
          <div className={`menu-item-logo material-symbols-outlined  `}>
            attach_money
          </div>
          {showMenu && <span>Transactions</span>}
        </div>

        <div className="menu-item logout-menu-item">
          <div className="menu-item-logo logout-btn material-symbols-outlined">
            logout
          </div>
          {showMenu && <span>Logout</span>}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
