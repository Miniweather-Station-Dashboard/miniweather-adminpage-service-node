import React, { useState, useEffect, useCallback } from 'react';
import { IoIosClose, IoIosSave, IoIosColorWand } from 'react-icons/io';

/**
 * Renders the data interval editing section.
 * @param {object} props - The component props.
 * @param {object} props.device - The device object containing data_interval_seconds.
 * @param {function(string): Promise<boolean>} props.onSaveInterval - Callback to save the interval. Returns true on success, false on failure.
 */
export default function DeviceIntervalEditor({ device, onSaveInterval }) {
  const [isEditingInterval, setIsEditingInterval] = useState(false);
  const [newIntervalValue, setNewIntervalValue] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [localUpdateStatus, setLocalUpdateStatus] = useState({ message: null, type: null });

  useEffect(() => {
    setNewIntervalValue(device.data_interval_seconds !== null ? String(device.data_interval_seconds) : '');
  }, [device.data_interval_seconds]);

  const handleSave = useCallback(async () => {
    setIsUpdating(true);
    setLocalUpdateStatus({ message: null, type: null });

    const success = await onSaveInterval(newIntervalValue);
    if (success) {
      setIsEditingInterval(false);
      setLocalUpdateStatus({ message: "Data interval updated successfully!", type: "success" });
    } else {
      setLocalUpdateStatus({ message: "Failed to update interval.", type: "error" });
    }
    setIsUpdating(false);
  }, [newIntervalValue, onSaveInterval]);

  const handleCancelEdit = useCallback(() => {
    setIsEditingInterval(false);
    setNewIntervalValue(device.data_interval_seconds !== null ? String(device.data_interval_seconds) : '');
    setLocalUpdateStatus({ message: null, type: null });
  }, [device.data_interval_seconds]);

  return (
    <div className="col-span-1 md:col-span-2 p-4 bg-gray-50 rounded shadow-sm flex items-center justify-between mb-8">
      <div>
        <p className="text-sm font-medium text-gray-500">Data Interval</p>
        {isEditingInterval ? (
          <input
            type="number"
            value={newIntervalValue}
            onChange={(e) => setNewIntervalValue(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Seconds (e.g., 300) or leave empty for null"
            min="0"
          />
        ) : (
          <p className="text-base text-gray-800">
            {device.data_interval_seconds !== null
              ? `${device.data_interval_seconds} seconds`
              : "Not set (default throttling applies)"}
          </p>
        )}
         {localUpdateStatus.message && (
            <div className={`p-2 mt-2 text-sm rounded-md ${localUpdateStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {localUpdateStatus.message}
            </div>
        )}
      </div>
      <div>
        {isEditingInterval ? (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="px-3 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition duration-150 ease-in-out flex items-center"
              disabled={isUpdating}
            >
              {isUpdating ? 'Saving...' :
                <>
                  <IoIosSave className="text-xl mr-2" />
                  Save
                </>
              }
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-3 py-2 bg-gray-600 text-white rounded-md shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition duration-150 ease-in-out flex items-center"
              disabled={isUpdating}
            >
              <IoIosClose className="text-xl mr-2" />
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditingInterval(true)}
            className="px-3 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-150 ease-in-out flex items-center"
          >
            <IoIosColorWand className="text-xl mr-2" />
            Edit Interval
          </button>
        )}
      </div>
    </div>
  );
}