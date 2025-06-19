"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import apiClient from "@/lib/apiClient";
import { IoIosArrowBack } from 'react-icons/io';

export default function DeviceDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchDevice = async () => {
      try {
        const response = await apiClient.get(`/v1/onboarding-device/${id}`);
        if (response.data.status === "success" && response.data.data) {
          setDevice(response.data.data.device);
        } else {
          setError(response.data.message || "Unknown error");
        }
      } catch (err) {
        console.error("Failed to fetch device:", err);
        setError(err.message || "Failed to fetch device");
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
    console.error("Failed to parse location:", e);
  }

  // MODIFIED PART FOR DYNAMIC SENSOR DATA EXAMPLE (Language-Agnostic)
  const sensorDataExample = {};
  if (device.sensors && device.sensors.length > 0) {
    device.sensors.forEach(sensor => {
      // Assign a generic dummy value based on unit hint if available, otherwise default to a string
      if (sensor.unit && (sensor.unit.includes("°") || sensor.unit.includes("mm") || sensor.unit.includes("%") || sensor.unit.toLowerCase().includes("lux") || sensor.unit.toLowerCase().includes("pa"))) {
        sensorDataExample[sensor.name] = 0.0; // Suggest a float for numeric units
      } else if (sensor.unit && (sensor.unit.toLowerCase().includes("on/off") || sensor.unit.toLowerCase().includes("status"))) {
        sensorDataExample[sensor.name] = "active"; // Suggest a string for status
      }
      else {
        sensorDataExample[sensor.name] = "example_value"; // Default to a string placeholder
      }
    });
  }

  const mqttTopic = `/devices/${device.id}`;
  const mqttBroker = "ws://127.0.0.0:8083/mqtt"; // From your dummy generator

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-8">
        <button
          onClick={() => router.back()}
          className="flex left-5 top-5 absolute items-center px-4 py-2 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition duration-150 ease-in-out"
        >
          <IoIosArrowBack className="text-xl mr-2" />
        </button>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Device Details</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      {device.sensors && device.sensors.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Sensors</h2>
          <ul className="space-y-2">
            {device.sensors.map((sensor) => (
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
                  Created Desc: {sensor.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 text-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">IoT Device Connection Instructions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg shadow-sm border border-blue-200">
            <h3 className="text-base font-medium text-blue-800 mb-2">Step 1: Connect to the MQTT Broker</h3>
            <p className="text-gray-700 mb-2">Your IoT device needs to establish a connection to an MQTT broker. Use the following details:</p>
            <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
              <li>
                <span className="font-semibold">Protocol:</span> WebSocket (<code>ws://</code>)
              </li>
              <li>
                <span className="font-semibold">Broker Address:</span> <code className="bg-blue-100 p-1 rounded text-blue-900 font-mono">{mqttBroker}</code>
              </li>
              <li>
                <span className="font-semibold">Client ID:</span> Use a unique identifier for your device (e.g., its MAC address or a generated UUID).
              </li>
            </ul>
            <p className="text-gray-700 mt-2">Ensure your MQTT client library supports WebSocket connections.</p>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg shadow-sm border border-blue-200">
            <h3 className="text-base font-medium text-blue-800 mb-2">Step 2: Publish Data to the Correct Topic</h3>
            <p className="text-gray-700 mb-2">Once connected to the broker, your device should publish sensor data to the following MQTT topic:</p>
            <div className="bg-blue-100 p-3 rounded-md text-sm text-blue-900 font-mono">
              MQTT Topic: <span className="font-bold">{mqttTopic}</span>
            </div>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Quality of Service (QoS):</span> We recommend using QoS 1 (at least once delivery) for reliable data transmission.
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Retain Flag:</span> Set to `false`.
            </p>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg shadow-sm border border-blue-200">
            <h3 className="text-base font-medium text-blue-800 mb-2">Step 3: Construct the JSON Payload</h3>
            <p className="text-gray-700 mb-2">The data published to the MQTT topic must be a JSON object with a specific structure. The root object *must* contain a top-level key named <code>data</code>. The value associated with <code>data</code> should be another JSON object where keys are the *exact names* of your sensors registered with this device.</p>
            <p className="text-gray-700 mb-2">Here&#39;s an example of the expected JSON payload for this device, based on its registered sensors:</p>
            <div className="bg-blue-100 p-3 rounded-md text-sm text-blue-900 font-mono overflow-auto">
              <pre>{JSON.stringify({ data: sensorDataExample }, null, 2)}</pre>
            </div>
            <div className="text-gray-700 mt-2">
              <span className="font-bold text-red-600">Important:</span>
              <ul className="list-disc list-inside ml-4 mt-1">
                <li>The keys within the <code>data</code> object (e.g., &#34;curah_hujan&#34;, &#34;intensitas_cahaya&#34;) must **exactly match** the &#34;Sensor Name&#34; listed above for each sensor.</li>
                <li>The values should be the actual readings from your physical sensors. We&#39;ve provided generic example values; adjust their types (e.g., number, string, boolean) and format to match your sensor outputs.</li>
                <li>Ensure the entire payload is valid JSON.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
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