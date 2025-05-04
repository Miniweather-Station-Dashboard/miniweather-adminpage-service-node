'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import apiClient from '@/lib/apiClient';

export default function DeviceDetailPage() {
  const { id } = useParams();

  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchDevice = async () => {
      try {
        const response = await apiClient.get(`/v1/onboarding-device/${id}`);
        if (
          response.data.status === 'success' &&
          response.data.data
        ) {
          setDevice(response.data.data.device);
        } else {
          setError(response.data.message || 'Unknown error');
        }
      } catch (err) {
        console.error('Failed to fetch device:', err);
        setError(err.message || 'Failed to fetch device');
      } finally {
        setLoading(false);
      }
    };

    fetchDevice();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Loading device data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!device) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Device not found.</p>
      </div>
    );
  }

  // Parse location coordinates
  let coordinates = null;
  try {
    coordinates = JSON.parse(device.location);
  } catch (e) {
    console.error('Failed to parse location:', e);
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Device Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DetailRow label="Device Name" value={device.name} />
        <DetailRow label="Location" value={coordinates ? `Lat: ${coordinates[0]}, Lng: ${coordinates[1]}` : 'N/A'} />
        <DetailRow
          label="Status"
          value={
            <span
              className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                device.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : device.status === 'inactive'
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {device.status}
            </span>
          }
        />
        <DetailRow label="Device ID" value={device.id} />
        <DetailRow label="Created At" value={new Date(device.created_at).toLocaleString()} />
        <DetailRow label="Updated At" value={new Date(device.updated_at).toLocaleString()} />
      </div>

      {device.sensors && device.sensors.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Sensors</h2>
          <ul className="space-y-2">
            {device.sensors.map((sensor) => (
              <li key={sensor.name} className="p-4 bg-gray-50 rounded shadow-sm">
                <p className="text-sm text-gray-600">Sensor Name: {sensor.name}</p>
                <p className="text-sm text-gray-600">Sensor Unit: {sensor.unit}</p>
                <p className="text-sm text-gray-600">Created Desc: {sensor.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-base text-gray-800">{value}</p>
    </div>
  );
}
