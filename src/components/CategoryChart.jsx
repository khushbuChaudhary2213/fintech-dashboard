import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = [
  "#0923fd", // blue
  "#00c49f", // teal
  "#ffbb28", // yellow
  "#ff4d4d", // red
  "#845ef7", // purple
  "#20c997", // mint
  "#f06595", // pink
  "#ffa94d", // orange
  "#339af0", // sky blue
  "#51cf66", // green
  "#fcc419", // gold
  "#748ffc", // soft indigo
];

const CategoryChart = ({ transactions }) => {
  const categoryMap = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const pieData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  return (
    <div className="chart">
      <h4>Spending Breakdown</h4>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={pieData} dataKey="value" outerRadius={70} label>
            {pieData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;
