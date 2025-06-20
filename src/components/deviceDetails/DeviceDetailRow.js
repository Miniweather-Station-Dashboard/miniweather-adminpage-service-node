import React from 'react';

/**
 * Renders a row with a label and a value for displaying device details.
 * @param {object} props - The component props.
 * @param {string} props.label - The label for the detail.
 * @param {React.ReactNode} props.value - The value to display.
 */
export default function DetailRow({ label, value }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-base text-gray-800">{value}</p>
    </div>
  );
}