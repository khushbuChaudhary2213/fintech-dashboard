import { useState } from "react";
import icons from "../utils/iconsTransaction";

const AddTransactionModal = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    date: "",
  });
  const [error, setError] = useState("");
  const [isOther, setIsOther] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "amount") {
      if (value != "" && parseFloat(value) < 0) {
        setError("Amount should be positive.");
        return;
      } else {
        setError("");
      }
    }
    setForm({ ...form, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;

    if (value === "other") {
      setIsOther(true);
      setForm({ ...form, category: "" });
    } else {
      setIsOther(false);
      handleChange(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (error) {
      return;
    }

    const newTransaction = {
      ...form,
      id: Date.now(),
      amount: Number(form.amount),
    };

    setError("");
    onAdd(newTransaction);
    onClose();
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add Transaction</h3>
        {error && (
          <span style={{ color: "red", display: "block", fontSize: "12px" }}>
            {error}
          </span>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            onChange={handleChange}
            required
          />

          <select name="type" onChange={handleChange}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <select
            name="category"
            onChange={handleCategoryChange}
            required
            defaultValue=""
          >
            <option value="" disabled>
              Select Category
            </option>

            {Object.keys(icons).map((key) => (
              <option key={key} value={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </option>
            ))}

            <option value="other">Other (Type your own)</option>
          </select>

          {isOther && (
            <input
              type="text"
              name="category"
              placeholder="Enter Custom Category"
              onChange={handleChange}
              required
              autoFocus
            />
          )}

          <input
            type="date"
            name="date"
            defaultValue={today}
            onChange={handleChange}
            required
          />

          <div className="modal-actions">
            <button type="submit">Add</button>
            <button type="button" onClick={onClose} className="cancel">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
