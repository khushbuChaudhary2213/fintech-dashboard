import { useState } from "react";
import "../index.css";

const AddTransactionModal = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      ...form,
      id: Date.now(),
      amount: Number(form.amount),
    };

    onAdd(newTransaction);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add Transaction</h3>

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

          <input
            type="text"
            name="category"
            placeholder="Category"
            onChange={handleChange}
            required
          />

          <input type="date" name="date" onChange={handleChange} required />

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
