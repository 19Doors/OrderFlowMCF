import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
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
import { useClerk } from "@clerk/clerk-react";
import { Input } from "../components/ui/input";
import { useState } from "react";

const data = [
  {
    name: "Sakaar Srivastava",
    age: "19",
  },
  {
    name: "John Linkdom",
    age: "17",
  }
];

function StackTable() {
  const cH = createColumnHelper();
  const columns = [
    cH.accessor("name", {
      header: ()=><p className="font-bold">Name</p>,
      id: "name",
      cell: ({cell}) => <p>{cell.getValue("name")}</p>,
      filterFn: "includesString",
    }),
    cH.accessor("age", {
      header: ()=><p className="font-bold">Age</p>,
      id: "age",
      cell: ({cell}) => <p>{cell.getValue("age")}</p>,
      filterFn: "includesString",
    }),
  ];
  const [columnFilters, setColumnFilters] = useState([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters
    },
    onColumnFiltersChange: setColumnFilters,
  });

  return (
    <div>
      <div>
      <Input onChange={(e)=>{table.getColumn("name").setFilterValue(e.target.value)}} className="w-1/4 h-8" placeholder="Filter Name"/>
    </div>
      <Table className="border-2 mt-2">
        <TableHeader>
          {table.getHeaderGroups().map((hg) => {
            return(<TableRow key={hg.id}>
              {hg.headers.map((h) => {
                return (
                  <TableHead key={h.id}>
		    {flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>);
          })}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((r) => {
	    return(
            <TableRow key={r.id}>
              {r.getVisibleCells().map((c) => {
		return(
                <TableCell key={c.id}>
		  {c.column.columnDef.cell}
                  {flexRender(c.column.columnDef.cell, c.getContext())}
                </TableCell>);
	      })}
            </TableRow>);
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export { StackTable };
