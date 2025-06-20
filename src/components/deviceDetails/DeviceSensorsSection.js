import React from 'react';

/**
 * Renders the sensors details section of a device.
 * @param {object} props - The component props.
 * @param {Array<object>} props.sensors - An array of sensor objects.
 */
export default function DeviceSensorsSection({ sensors }) {
  if (!sensors || sensors.length === 0) {
    return null; 
  }

  return (
    <div className="mt-8 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Sensors</h2>
      <ul className="space-y-2">
        {sensors.map((sensor) => (
          <li
            key={sensor.name} 
            className="p-4 bg-gray-50 rounded shadow-sm"
          >
            <p className="text-sm text-gray-600">
              Sensor Name: {sensor.name}
            </p>
            <p className="text-sm text-gray-600">
              Sensor Unit: {sensor.unit}
            </p>
            <p className="text-sm text-gray-600">
              Description: {sensor.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}