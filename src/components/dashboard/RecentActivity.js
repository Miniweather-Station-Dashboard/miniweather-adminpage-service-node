import { useSelector } from "react-redux";
import useRecentActivities from "@/redux/hooks/fetchRecentActivity";


function getTimeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diff = Math.floor((now - past) / 1000);
  if (diff < 60) return `${diff} seconds ago`;
  const mins = Math.floor(diff / 60);
  if (mins < 60) return `${mins} minute${mins > 1 ? "s" : ""} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

export default function RecentActivity() {
  useRecentActivities(3, 0);

  const { activities, status } = useSelector((state) => state.recentActivities);

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
      </div>

      {status === "loading" ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : (
        <div className="divide-y divide-gray-200">
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <div key={index} className="py-3">
                <p className="text-sm text-gray-800">{activity.message}</p>
                <p className="text-xs text-gray-500">
                  {getTimeAgo(activity.created_at)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No activity found.</p>
          )}
        </div>
      )}
    </div>
  );
}
