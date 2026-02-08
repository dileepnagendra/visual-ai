"use client";

interface TableRow {
  label?: string;
  values?: string[];
}

interface ComparisonTableProps {
  title?: string;
  headers?: string[];
  rows?: TableRow[];
  highlightLastColumn?: boolean;
}

function ComparisonTable({
  title,
  headers,
  rows,
  highlightLastColumn = true,
}: ComparisonTableProps) {
  if (!headers || !rows || rows.length === 0) return null;

  return (
    <div data-viz="comparison-table" className="viz-card overflow-hidden">
      {title && (
        <div
          className="border-b px-7 py-5"
          style={{ borderColor: "var(--viz-border)" }}
        >
          <h3
            className="text-xl font-extrabold"
            style={{ color: "var(--viz-text)" }}
          >
            {title}
          </h3>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr
              style={{
                borderBottom: "2px solid var(--viz-border)",
                backgroundColor: "var(--viz-surface-alt)",
              }}
            >
              {headers.map((header, i) => (
                <th
                  key={i}
                  className="px-7 py-4 text-xs font-extrabold uppercase tracking-wider"
                  style={{
                    color: "var(--viz-text)",
                    backgroundColor:
                      highlightLastColumn && i === headers.length - 1
                        ? "rgba(var(--viz-primary-rgb), 0.08)"
                        : "transparent",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                style={{
                  borderBottom:
                    rowIdx < rows.length - 1
                      ? "1px solid var(--viz-border)"
                      : "none",
                  backgroundColor:
                    rowIdx % 2 === 1
                      ? "var(--viz-surface-alt)"
                      : "transparent",
                }}
              >
                {/* Label column */}
                <td
                  className="px-7 py-4 text-sm font-bold"
                  style={{ color: "var(--viz-text)" }}
                >
                  {row.label || ""}
                </td>
                {/* Value columns */}
                {row.values?.map((val, colIdx) => {
                  const isHighlighted =
                    highlightLastColumn &&
                    colIdx === (row.values?.length ?? 0) - 1;
                  return (
                    <td
                      key={colIdx}
                      className="px-7 py-4 text-sm"
                      style={{
                        color: isHighlighted
                          ? "var(--viz-primary)"
                          : "var(--viz-text-muted)",
                        fontWeight: isHighlighted ? 700 : 400,
                        backgroundColor: isHighlighted
                          ? "rgba(var(--viz-primary-rgb), 0.06)"
                          : "transparent",
                      }}
                    >
                      {val}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

ComparisonTable.displayName = "ComparisonTable";
export default ComparisonTable;
