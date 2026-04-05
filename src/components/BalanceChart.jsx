import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BalanceChart = ({ transactions }) => {
  const monthlyData = {};

  transactions.forEach((t) => {
    const month = t.date.slice(5, 7); // "04"

    if (!monthlyData[month]) {
      monthlyData[month] = 0;
    }

    monthlyData[month] += t.type === "income" ? t.amount : -t.amount;
  });

  const chartData = Object.keys(monthlyData).map((m) => ({
    month: m,
    balance: monthlyData[m],
  }));

  return (
    <div className="balance-chart chart" style={{ marginBottom: "20px" }}>
      <h4 style={{ marginBottom: "12px" }}>Balance Trend</h4>

      <ResponsiveContainer height={220}>
        <LineChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="balance" stroke="#0923fd" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceChart;
