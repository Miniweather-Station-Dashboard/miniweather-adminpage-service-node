"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import StatCard from "@/components/dashboard/StatCard";
import DeviceTable from "@/components/dashboard/DeviceTable";
import SensorTable from "@/components/dashboard/SensorTable";
import RecentActivity from "@/components/dashboard/RecentActivity";
import AddDeviceModal from "@/components/dashboard/AddDeviceModal";
import AddSensorModal from "@/components/dashboard/AddSensorModal";
import useDeviceData from "@/redux/hooks/fetchDeviceData";
import useSensorTypes from "@/redux/hooks/fetchSensorType";
import useSystemStatusSocket from "@/redux/hooks/useHyperbaseStatus";

export default function DashboardPage() {
  useDeviceData();
  useSensorTypes();
  useSystemStatusSocket();
  const { user } = useSelector((state) => state.auth);
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [showSensorModal, setShowSensorModal] = useState(false);

  const {
    deviceList: devices,
    totalCount,
    status,
    error,
  } = useSelector((state) => state.device);
  const { sensorTypes } = useSelector((state) => state.sensorType);

  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Welcome back, {user?.name || "Admin"}!
      </h1>

      <StatCard deviceCount={totalCount} sensorCount={sensorTypes.length} />
      
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
