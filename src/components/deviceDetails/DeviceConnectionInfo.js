import React, { useMemo } from "react";

/**
 * @param {object} props - The component props.
 * @param {object} props.device - The device object containing id and sensors.
 */
export default function DeviceConnectionInfo({ device }) {
  const mqttTopic = `/devices/${device.id}`;
  const mqttBroker = "ws://127.0.0.0:8083/mqtt"; // Placeholder, ensure this is correct

  const toSnakeCase = (str) => {
    return str
      .trim()
      .replace(/([a-z])([A-Z])/g, "$1_$2")
      .replace(/\s+/g, "_")
      .replace(/-+/g, "_")
      .replace(/[^\w_]/g, "")
      .toLowerCase();
  };
  const sensorDataExample = useMemo(() => {
    const example = {};
    if (device?.sensors && device.sensors.length > 0) {
      device.sensors.forEach((sensor) => {
        const key = toSnakeCase(sensor.name);
        const unit = sensor.unit?.toLowerCase();
        if (unit && (unit.includes("on/off") || unit.includes("status"))) {
          example[key] = "active";
        } else {
          example[key] = 0.0;
        }
      });
    }
    return example;
  }, [device]);

  return (
    <div className="mt-8 text-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        IoT Device Connection Instructions
      </h2>
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg shadow-sm border border-blue-200">
          <h3 className="text-base font-medium text-blue-800 mb-2">
            Step 1: Connect to the MQTT Broker
          </h3>
          <p className="text-gray-700 mb-2">
            Your IoT device needs to establish a connection to an MQTT broker.
            Use the following details:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
            <li>
              <span className="font-semibold">Protocol:</span> WebSocket (
              <code>ws://</code>)
            </li>
            <li>
              <span className="font-semibold">Broker Address:</span>{" "}
              <code className="bg-blue-100 p-1 rounded text-blue-900 font-mono">
                {mqttBroker}
              </code>
            </li>
            <li>
              <span className="font-semibold">Client ID:</span> Use a unique
              identifier for your device (e.g., its MAC address or a generated
              UUID).
            </li>
          </ul>
          <p className="text-gray-700 mt-2">
            Ensure your MQTT client library supports WebSocket connections.
          </p>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg shadow-sm border border-blue-200">
          <h3 className="text-base font-medium text-blue-800 mb-2">
            Step 2: Publish Data to the Correct Topic
          </h3>
          <p className="text-gray-700 mb-2">
            Once connected to the broker, your device should publish sensor data
            to the following MQTT topic:
          </p>
          <div className="bg-blue-100 p-3 rounded-md text-sm text-blue-900 font-mono">
            MQTT Topic: <span className="font-bold">{mqttTopic}</span>
          </div>
          <p className="text-gray-700 mt-2">
            <span className="font-semibold">Quality of Service (QoS):</span> We
            recommend using QoS 1 (at least once delivery) for reliable data
            transmission.
          </p>
          <p className="text-gray-700 mt-2">
            <span className="font-semibold">Retain Flag:</span> Set to `false`.
          </p>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg shadow-sm border border-blue-200">
          <h3 className="text-base font-medium text-blue-800 mb-2">
            Step 3: Construct the JSON Payload
          </h3>
          <p className="text-gray-700 mb-2">
            The data published to the MQTT topic must be a JSON object with a
            specific structure. The root object *must* contain a top-level key
            named <code>data</code>. The value associated with <code>data</code>{" "}
            should be another JSON object where keys are the *exact names* of
            your sensors registered with this device.
          </p>
          <p className="text-gray-700 mb-2">
            Here&#39;s an example of the expected JSON payload for this device,
            based on its registered sensors:
          </p>
          <div className="bg-blue-100 p-3 rounded-md text-sm text-blue-900 font-mono overflow-auto">
            <pre>{JSON.stringify({ data: sensorDataExample }, null, 2)}</pre>
          </div>
          <div className="text-gray-700 mt-2">
            <span className="font-bold text-red-600">Important:</span>
            <ul className="list-disc list-inside ml-4 mt-1">
              <li>
                The keys within the <code>data</code> object (e.g.,
                &#34;curah_hujan&#34;, &#34;intensitas_cahaya&#34;) must
                **exactly match** the &#34;Sensor Name&#34; listed above for
                each sensor.
              </li>
              <li>
                The values should be the actual readings from your physical
                sensors. We&#39;ve provided generic example values; adjust their
                types (e.g., number, string, boolean) and format to match your
                sensor outputs.
              </li>
              <li>Ensure the entire payload is valid JSON.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
