import { ColumnDef } from "@tanstack/react-table";

export function exportToCSV<T>(
  rows: T[],
  columns: ColumnDef<T>[],
  fileName = "report.csv"
) {
  if (!rows.length) return;

  const headers = columns.map((col) => {
    if (typeof col.header === "string") return col.header;
    if (typeof col.header === "function") return "";
    return "";
  });

  const csvRows = [
    headers.join(","), // header row
    ...rows.map((row) =>
      columns
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((col:any) => {
          // Handle accessorFn
          if (col.accessorFn) {
            const val = col.accessorFn(row);
            return `"${String(val ?? "").replace(/"/g, '""')}"`;
          }

          // Handle accessorKey
          if (typeof col.accessorKey === "string") {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const val = (row as any)[col.accessorKey];
            return `"${String(val ?? "").replace(/"/g, '""')}"`;
          }

          return '""'; // fallback empty cell
        })
        .join(",")
    ),
  ];

  const blob = new Blob([csvRows.join("\n")], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  link.click();
}
