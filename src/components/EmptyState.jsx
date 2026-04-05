const EmptyState = ({ message, subMessage, showButton, onAdd }) => {
  return (
    <div className="no-data">
      <h3>{message || "No data available"}</h3>
      <p>{subMessage || "Please add some data"}</p>

      {showButton && (
        <button onClick={onAdd} className="add-btn">
          + Add Transaction
        </button>
      )}
    </div>
  );
};

export default EmptyState;
