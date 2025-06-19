"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState, useCallback } from "react";
import Pagination from "../../../components/Pagination";
import useErrors from "@/redux/hooks/fetchErrorData";

export default function ErrorManagementPage() {
  const { errors, status, currentError, pagination } = useSelector(
    (state) => state.errors
  );

  const [currentPage, setCurrentPage] = useState(pagination?.page || 1);
  const [limitPerPage, setLimitPerPage] = useState(pagination?.limit || 10);

  useErrors(currentPage, limitPerPage);

  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
  }, []);

  if (status === "loading") {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow mt-8 text-center font-sans">
        <p className="text-gray-500">Loading errors...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow mt-8 text-center font-sans">
        <p className="text-red-500">
          {currentError || "Failed to load error information."}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow mt-8 font-sans">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Error Management</h1>
      </div>

      {currentError && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-6"
          role="alert"
        >
          <strong className="font-bold">Latest Error:</strong>
          <span className="block sm:inline ml-2">{currentError}</span>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                Message
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/12">
                URL / Method
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-4/12">
                Stack / Body
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {errors.length === 0 && status === "succeeded" ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"
                >
                  No errors to display.
                </td>
              </tr>
            ) : (
              errors.map((error) => (
                <tr key={error.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{error.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{error.message}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {error.request_method && (
                      <div className="font-semibold">
                        {error.request_method}
                      </div>
                    )}
                    {error.request_url && (
                      <div className="text-xs break-all">
                        {error.request_url}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {error.stack && (
                      <details className="mb-2">
                        <summary className="cursor-pointer text-blue-600 hover:text-blue-800 text-xs">
                          View Stack
                        </summary>
                        <pre
                          className="mt-1 p-2 bg-gray-50 rounded-md text-xs overflow-auto max-h-24"
                          style={{
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-all",
                          }}
                        >
                          {error.stack}
                        </pre>
                      </details>
                    )}
                    {error.request_body && (
                      <details>
                        <summary className="cursor-pointer text-blue-600 hover:text-blue-800 text-xs">
                          View Body
                        </summary>
                        <pre
                          className="mt-1 p-2 bg-gray-50 rounded-md text-xs overflow-auto max-h-24"
                          style={{
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-all",
                          }} 
                        >
                          {JSON.stringify(error.request_body, null, 2)}
                        </pre>
                      </details>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(
                      error.createdAt || error.timestamp
                    ).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination?.total > 0 && (
        <Pagination
          page={pagination.page}
          limit={pagination.limit}
          total={pagination.total}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
