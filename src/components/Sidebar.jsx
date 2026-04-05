function Sidebar({ activePage, setActivePage }) {
  return (
    <div className="sidebar">
      <div className="logo material-symbols-outlined">finance_mode</div>
      <div className="menu">
        <div
          className={`menu-item material-symbols-outlined ${activePage === "dashboard" ? "active" : ""} `}
          onClick={() => setActivePage("dashboard")}
        >
          dashboard
        </div>
        <div
          className={`menu-item material-symbols-outlined ${activePage === "transactions" ? "active" : ""} `}
          onClick={() => setActivePage("transactions")}
        >
          attach_money
        </div>
        {/* <div className="menu-item"></div>
        <div className="menu-item"></div> */}
      </div>
      <div className="logout-btn material-symbols-outlined">logout</div>
    </div>
  );
}

export default Sidebar;
