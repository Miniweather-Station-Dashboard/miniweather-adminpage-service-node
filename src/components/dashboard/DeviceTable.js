import Link from "next/link"; // only if using Next.js

export default function DeviceTable({ devices, onAddClick }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">
          Onboarding Devices
        </h2>
        <button
          onClick={onAddClick}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Add New Device
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Name", "Type", "Location", "Status", "Actions"].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {devices.map((device) => (
              <tr key={device.id}>
                <td className="px-6 py-4 whitespace-nowrap">{device.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-blue-600 hover:underline">
                  <Link href={`/dashboard/devices/${device.id}`}>View Details</Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {device.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      device.status === "active"
                        ? "bg-green-100 text-green-800"
                        : device.status === "inactive"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {device.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
