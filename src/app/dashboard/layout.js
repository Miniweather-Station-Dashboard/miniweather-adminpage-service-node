'use client'
import ProtectedRoute from '@/components/ProtectedRoute'
import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute requireVerification={true}>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="p-6 relative">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  )
}