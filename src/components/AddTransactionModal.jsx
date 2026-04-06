import { useState } from "react";
import icons from "../utils/iconsTransaction";

const AddTransactionModal = ({ onClose, onAdd }) => {
  // 1. Move today calculation outside or keep inside, but ensure state uses it
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    date: today, // Initialized correctly
  });
  const [error, setError] = useState("");
  const [isOther, setIsOther] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount") {
      if (value !== "" && parseFloat(value) < 0) {
        setError("Amount should be positive.");
      } else {
        setError("");
      }
    }

    // Use functional update to ensure we don't lose other fields (like date)
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;

    if (value === "other") {
      setIsOther(true);
      setForm((prev) => ({ ...prev, category: "" }));
    } else {
      setIsOther(false);
      // Manually update the category in state
      setForm((prev) => ({ ...prev, category: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (error || !form.category || !form.date) {
      if (!form.category) alert("Please select a category");
      return;
    }

    // Create the final object
    const newTransaction = {
      ...form,
      id: Date.now(),
      amount: Number(form.amount),
      // Ensure date is definitely there
      date: form.date || today,
    };

    onAdd(newTransaction);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add Transaction</h3>
        {error && (
          <span style={{ color: "red", fontSize: "12px" }}>{error}</span>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            required
          />

          <select name="type" value={form.type} onChange={handleChange}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <select
            name="category"
            onChange={handleCategoryChange}
            required
            value={isOther ? "other" : form.category}
          >
            <option value="" disabled>
              Select Category
            </option>
            {Object.keys(icons).map((key) => (
              <option key={key} value={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </option>
            ))}
            <option value="other">Other</option>
          </select>

          {isOther && (
            <input
              type="text"
              name="category"
              placeholder="Enter Category"
              onChange={handleChange}
              required
              autoFocus
            />
          )}

          <input
            type="date"
            name="date"
            value={form.date}
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
