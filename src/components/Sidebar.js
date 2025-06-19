'use client'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { logout } from '@/redux/slices/authSlice'
import { useRouter } from 'next/navigation'

export default function Sidebar() {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLogout = () => {
    dispatch(logout())
    router.push('/login')
  }

  return (
    <div className="w-64 bg-gray-800 text-white">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">MiniWeather Admin</h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className="block px-4 py-2 rounded hover:bg-gray-700"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <span
              className="block px-4 py-2 rounded opacity-50 cursor-not-allowed"
              title="Disabled for now"
            >
              Weather Data
            </span>
          </li>
          <li>
            <Link
              href="/dashboard/users"
              className="block px-4 py-2 rounded hover:bg-gray-700"
            >
              User Management
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/errors"
              className="block px-4 py-2 rounded hover:bg-gray-700"
            >
              Error History
            </Link>
          </li>
          <li>
            <span
              className="block px-4 py-2 rounded opacity-50 cursor-not-allowed"
              title="Disabled for now"
            >
              Settings
            </span>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 rounded hover:bg-gray-700"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
