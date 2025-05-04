export default function SensorTable({sensors, onAddClick }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Sensor Types</h2>
          <button 
            onClick={onAddClick}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Add New Sensor Type
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sensors.map((sensor) => (
                <tr key={sensor.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{sensor.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{sensor.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{sensor.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }