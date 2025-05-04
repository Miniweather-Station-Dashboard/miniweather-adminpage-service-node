export default function StatsCards({ deviceCount, sensorCount }) {
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
        <p className="mt-2 text-3xl font-bold text-green-600">Online</p>
      </div>
    </div>
  );
}
