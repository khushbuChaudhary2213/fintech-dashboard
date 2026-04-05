const InsightsBox = ({ transactions }) => {
  const categoryMap = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const highest = Object.entries(categoryMap).reduce(
    (max, curr) => (curr[1] > max[1] ? curr : max),
    ["None", 0],
  );

  const getMonthlyTotal = (monthOffset) => {
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() - monthOffset);
    const targetMonth = targetDate.getMonth();
    const targetYear = targetDate.getFullYear();

    return transactions
      .filter((t) => {
        const d = new Date(t.date);
        return (
          d.getMonth() === targetMonth &&
          d.getFullYear() === targetYear &&
          t.type === "expense"
        );
      })
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const currentMonthTotal = getMonthlyTotal(0);
  const lastMonthTotal = getMonthlyTotal(1);

  // Calculate percentage difference
  let comparisonText = "";
  let isHigher = false;

  if (lastMonthTotal > 0) {
    const diff = ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;
    isHigher = diff > 0;
    comparisonText = `${Math.abs(diff).toFixed(1)}% ${isHigher ? "more" : "less"} than last month`;
  } else {
    comparisonText = "No data for previous month";
  }

  return (
    <div className="box insights" style={{ marginBottom: "12px" }}>
      <h4>Insights</h4>

      <p>
        💰 Highest spending: <strong>{highest[0]}</strong>
      </p>

      <hr
        style={{ margin: "10px 0", border: "0.5px solid #eee", opacity: 0.5 }}
      />

      <p>
        📊 Monthly Comparison:
        <span
          style={{
            color: isHigher ? "#ff4d4d" : "#1aa36f",
            fontWeight: "bold",
          }}
        >
          {""} {comparisonText}
        </span>
      </p>
      <p style={{ fontSize: "12px", color: "gray" }}>
        Current: ${currentMonthTotal} | Last: ${lastMonthTotal}
      </p>
    </div>
  );
};

export default InsightsBox;
