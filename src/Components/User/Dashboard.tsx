import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Page A", lendin: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", lendin: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", lendin: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", lendin: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", lendin: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", lendin: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", lendin: 3490, pv: 4300, amt: 2100 },
];

const Dashboard = () => {
  return (
    <div className="flex flex-col w-full  p-6 bg-gray-800">
      <h1 className="text-4xl font-bold text-white mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 gap-6">
        {/* Chart 1 */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Chart 1</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" name="Borrowings" fill="#8884d8" />
              <Bar dataKey="lendin" name="Lendings" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2 */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Chart 2</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" name="Borrowings" fill="#8884d8" />
              <Bar dataKey="lendin" name="Lendings" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 3 */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Chart 3</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" name="Borrowings" fill="#8884d8" />
              <Bar dataKey="lendin" name="Lendings" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 4 */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Chart 4</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" name="Borrowings" fill="#8884d8" />
              <Bar dataKey="lendin" name="Lendings" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
