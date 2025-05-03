'use client'
import { useSelector } from 'react-redux'

export default function DashboardPage() {
  const { user } = useSelector((state) => state.auth)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Welcome back, {user?.name || 'Admin'}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total Weather Stations</h3>
          <p className="mt-2 text-3xl font-bold">24</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Data Points Today</h3>
          <p className="mt-2 text-3xl font-bold">1,245</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">System Status</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">Online</p>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="border-b pb-2">
            <p className="text-sm">New data received from Station #12</p>
            <p className="text-xs text-gray-500">10 minutes ago</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm">User john.doe logged in</p>
            <p className="text-xs text-gray-500">25 minutes ago</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm">System maintenance completed</p>
            <p className="text-xs text-gray-500">2 hours ago</p>
          </div>
        </div>
      </div>
    </div>
  )
}