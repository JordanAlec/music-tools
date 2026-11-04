export default function Table({headers, rows}: {headers: string[]; rows: React.ReactNode[][];}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-neutral-200 text-neutral-500 dark:border-neutral-800">
            {headers.map((header) => (
              <th key={header} scope="col" className="py-2 pr-3 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-neutral-100 last:border-0 dark:border-neutral-900">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="py-2 pr-3">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
