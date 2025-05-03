import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react";
import DeleteConfirmModal from "../modals/common/DeleteConfirmModal";

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

function DataTable<T>({ data, columns,onEdit,onDelete }: TableProps<T>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [openRowId, setOpenRowId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<T | null>(null);


  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(newPagination.pageIndex);
      setPageSize(newPagination.pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="w-72 px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-800">
          <thead className="bg-gray-100 uppercase text-xs font-semibold text-gray-600">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-5 py-3 text-left">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
                <th className="px-5 py-3 text-left">Actions</th>
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, i) => (
              <tr
                key={row.id}
                className={`hover:bg-gray-50 ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-5 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}

                <td className="px-5 py-4 relative">
                  <button
                    onClick={() => {
                      setOpenRowId((prev) => (prev === row.id ? null : row.id));
                    }}
                    className="hover:bg-gray-200 rounded-full p-1"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {openRowId === row.id && (
                    <div className="absolute right-5 top-10 z-50 w-36 bg-white shadow-lg border rounded-md">
                      <button
                        className="w-full flex items-center px-4 py-2 hover:bg-gray-100 text-sm"
                        onClick={() => {
                          setOpenRowId(null);
                          const rowData = row.original as T;
                          if (rowData && onEdit) onEdit(rowData);
                        }}
                      >
                        <Edit size={16} className="mr-2" />
                        Edit
                      </button>
                      <button
                        className="w-full flex items-center px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                        onClick={() => {
                          setOpenRowId(null);
                          const rowData = row.original as T;
                          if (rowData) {
                            setRowToDelete(rowData);
                            setIsDeleteModalOpen(true);
                          }
                        }}
                      >
                        <Trash2 size={16} className="mr-2" />
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="space-x-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="inline-flex items-center px-3 py-2 rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="inline-flex items-center px-3 py-2 rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        <span>
          Page{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
      </div>
      {rowToDelete && (
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onOpenChange={(open) => {
            setIsDeleteModalOpen(open);
            if (!open) setRowToDelete(null);
          }}
          onConfirm={() => {
            if (onDelete && rowToDelete) {
              onDelete(rowToDelete);
              setIsDeleteModalOpen(false);
              setRowToDelete(null);
            }
          }}
          title="Confirm Deletion"
          description="Are you sure you want to delete this item? This action cannot be undone."
        />
      )}
    </div>
  );
}

export default DataTable;
