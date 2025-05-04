"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import StatCard from "@/components/dashboard/StatCard";
import DeviceTable from "@/components/dashboard/DeviceTable";
import SensorTable from "@/components/dashboard/SensorTable";
import RecentActivity from "@/components/dashboard/RecentActivity";
import AddDeviceModal from "@/components/dashboard/AddDeviceModal";
import AddSensorModal from "@/components/dashboard/AddSensorModal";

export default function DashboardPage() {
  const { user } = useSelector((state) => state.auth);
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [showSensorModal, setShowSensorModal] = useState(false);

  const devices = [
    {
      id: "1",
      name: "Weather Station 1",
      obdType: "TypeA",
      location: "Warehouse A",
      status: "active",
    },
    {
      id: "2",
      name: "Weather Station 2",
      obdType: "TypeB",
      location: "Warehouse B",
      status: "inactive",
    },
  ];

  const sensorTypes = [
    {
      id: "1",
      name: "Temperature",
      unit: "°C",
      description: "Measures ambient temperature",
    },
    {
      id: "2",
      name: "Humidity",
      unit: "%",
      description: "Measures relative humidity",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Welcome back, {user?.name || "Admin"}!
      </h1>

      <StatCard title="Total Devices" value={devices.length} />

      <DeviceTable
        devices={devices}
        onAddClick={() => setShowDeviceModal(true)}
      />
      <SensorTable
        sensors={sensorTypes}
        onAddClick={() => setShowSensorModal(true)}
      />
      <RecentActivity />

      {showDeviceModal && (
        <AddDeviceModal onClose={() => setShowDeviceModal(false)} />
      )}
      {showSensorModal && (
        <AddSensorModal onClose={() => setShowSensorModal(false)} />
      )}
    </div>
  );
}
