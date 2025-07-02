import { useSelector } from "react-redux";
export default function StatsCards({ deviceCount, sensorCount }) {
  const { backend, hyperbase, lastUpdated } = useSelector((state) => state.systemStatus);

  const getStatusLabel = () => {
    if (backend === "offline") return "Backend Offline";
    if (hyperbase === "offline") return "Hyperbase Offline";
    if (backend === "online" && hyperbase === "online")
      return "All Systems Online";
    return "Status Unknown";
  };

  const statusColor = {
    "Backend Offline": "text-red-600",
    "Hyperbase Offline": "text-yellow-500",
    "All Systems Online": "text-green-600",
    "Status Unknown": "text-gray-500",
  }[getStatusLabel()];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full max-w-full">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900">Total Devices</h3>
        <p className="mt-2 text-3xl font-bold">{deviceCount}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900">Sensor Types</h3>
        <p className="mt-2 text-3xl font-bold">{sensorCount}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900">System Status</h3>
        <p className={`mt-2 text-3xl font-bold ${statusColor}`}>
          {getStatusLabel()}
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Last Checked:{" "}
          {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : "-"}
        </p>
      </div>
    </div>
  );
}
