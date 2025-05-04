export default function RecentActivity() {
  const activities = [
    {
      message: "New device added: Weather Station 3",
      timestamp: "10 minutes ago",
    },
    {
      message: 'Sensor type "Pressure" updated',
      timestamp: "25 minutes ago",
    },
    {
      message: "System maintenance completed",
      timestamp: "2 hours ago",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {activities.map((activity, index) => (
          <div key={index} className="py-3">
            <p className="text-sm text-gray-800">{activity.message}</p>
            <p className="text-xs text-gray-500">{activity.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
