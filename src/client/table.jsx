import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

const data = [
  {
    name: "Sakaar Srivastava",
  },
];

function StackTable() {
  const cH = createColumnHelper();
  const columns = [
    cH.accessor("name", {
      header: "Name",
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => {
            <TableRow key={hg.id}>
              {hg.headers.map((h) => {
                return (
                  <TableHead key={h.id}>
                    {h.isPlaceholder
                      ? null
                      : flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>;
          })}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((r) => {
            <TableRow key={r.id}>
              {r.getVisibleCells().map((c) => {
                <TableCell key={c.id}>
                  {flexRender(c.column.columnDef.cell, c.getContext())}
                </TableCell>;
              })}
            </TableRow>;
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export { StackTable };
