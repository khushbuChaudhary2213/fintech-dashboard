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

  return (
    <div className="box insights" style={{ marginBottom: "12px" }}>
      <h4>Insights</h4>

      <p>
        💰 Highest spending: <strong>{highest[0]}</strong>
      </p>
    </div>
  );
};

export default InsightsBox;
