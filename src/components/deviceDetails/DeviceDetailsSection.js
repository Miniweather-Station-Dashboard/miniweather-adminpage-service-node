import React, { useMemo } from 'react';
import DetailRow from '@/components/deviceDetails/DeviceDetailRow'; 
/**
 * Renders the basic details section of a device.
 * @param {object} props - The component props.
 * @param {object} props.device - The device object.
 */
export default function DeviceDetailsSection({ device }) {
  // Derived state for coordinates
  const coordinates = useMemo(() => {
    try {
      return device?.location ? JSON.parse(device.location) : null;
    } catch (e) {
      console.error("Failed to parse location:", e);
      return null;
    }
  }, [device]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <DetailRow label="Device Name" value={device.name} />
      <DetailRow
        label="Location"
        value={
          coordinates
            ? `Lat: ${coordinates[0]}, Lng: ${coordinates[1]}`
            : "N/A"
        }
      />
      <DetailRow
        label="Status"
        value={
          <span
            className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
              device.status === "active"
                ? "bg-green-100 text-green-800"
                : device.status === "inactive"
                ? "bg-gray-100 text-gray-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {device.status}
          </span>
        }
      />
      <DetailRow label="Device ID" value={device.id} />
      <DetailRow
        label="Created At"
        value={new Date(device.created_at).toLocaleString()}
      />
      <DetailRow
        label="Updated At"
        value={new Date(device.updated_at).toLocaleString()}
      />
    </div>
  );
}