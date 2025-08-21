import React, { useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [selectedIds, setSelectedIds] = useState<Set<T["id"]>>(new Set());
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;
    const col = columns.find(c => c.dataIndex === sortKey);
    if (!col?.sortable) return data;
    return [...data].sort((a, b) => {
      const va = String(a[sortKey as keyof T]);
      const vb = String(b[sortKey as keyof T]);
      if (va < vb) return sortOrder === "asc" ? -1 : 1;
      if (va > vb) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortOrder, columns]);

  const handleSelect = (row: T) => {
    const next = new Set(selectedIds);
    if (next.has(row.id)) {
      next.delete(row.id);
    } else {
      next.add(row.id);
    }
    setSelectedIds(next);
    onRowSelect && onRowSelect(data.filter(d => next.has(d.id)));
  };

  const handleSelectAll = () => {
    if (selectedIds.size === sortedData.length) {
      setSelectedIds(new Set());
      onRowSelect && onRowSelect([]);
    } else {
      const allIds = new Set(sortedData.map(row => row.id));
      setSelectedIds(allIds);
      onRowSelect && onRowSelect(sortedData);
    }
  };

  return (
    <div className="overflow-x-auto w-full max-w-4xl">
      {loading ? (
        <div className="text-center ">Loading...</div>
      ) : sortedData.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No data</div>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-400">
              {selectable && (
                <th className="px-3 py-2 text-left">
                  <input
                    type="checkbox"
                    checked={selectedIds.size === sortedData.length}
                    onChange={handleSelectAll}
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-3 py-2 text-left ${
                    col.sortable ? "cursor-pointer select-none" : ""
                  }`}
                  onClick={() => {
                    if (col.sortable) {
                      if (sortKey === col.dataIndex) {
                        setSortOrder((ord) => (ord === "asc" ? "desc" : "asc"));
                      } else {
                        setSortKey(col.dataIndex as string);
                        setSortOrder("asc");
                      }
                    }
                  }}
                  aria-sort={
                    sortKey === col.dataIndex
                      ? sortOrder === "asc"
                        ? "ascending"
                        : "descending"
                      : undefined
                  }
                  scope="col"
                >
                  {col.title}
                  {col.sortable && (
                    <span className="ml-1 text-xs">
                      {sortKey === col.dataIndex
                        ? sortOrder === "asc"
                          ? "▲"
                          : "▼"
                        : "↕"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row) => (
              <tr
                key={row.id}
                className="border-t hover:bg-gray-100 "
              >
                {selectable && (
                  <td className="px-3 py-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(row.id)}
                      onChange={() => handleSelect(row)}
                      aria-label="Select row"
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="px-3 py-2">
                    {String(row[col.dataIndex])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}