export default function Pagination({ page, limit, total, onPageChange, title }) {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-gray-700">
        Showing{" "}
        <span className="font-medium">
          {(page - 1) * limit + 1}
        </span>{" "}
        to{" "}
        <span className="font-medium">
          {Math.min(page * limit, total)}
        </span>{" "}
        of <span className="font-medium">{total}</span> {title || "items"}
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className={`px-3 py-1 rounded ${
            page === 1
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page * limit >= total}
          className={`px-3 py-1 rounded ${
            page * limit >= total
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}