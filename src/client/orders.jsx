import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Nav } from "./components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { SignedIn, useClerk } from "@clerk/clerk-react";
import { Badge } from "@/components/ui/badge";
import { RefreshCw } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "../components/ui/separator";
import { Label } from "../components/ui/label";

function TableOrders() {
  const [orders, setOrders] = useState([]);
  const [sync, setSync] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const emai = useClerk().user.primaryEmailAddress.emailAddress;
  useEffect(() => {
    const d = async () => {
      try {
        const dt = await axios.post("/api/getOrders", { email: emai });
        setOrders(dt.data.data.orders);
      } catch (e) {
        console.error(e);
      }
    };
    d();
  }, [sync]);
  const data = orders;
  const cH = createColumnHelper();
  const col = [
    {
      title: "orderId",
      header: () => <span className="font-bold">OrderID</span>,
      cell: ({ cell }) => <p>{cell.getValue("orderId")}</p>,
    },
    {
      title: "billing_details.name",
      header: () => <span className="font-bold">Customer</span>,
      cell: ({ cell }) => <p>{cell.getValue("billing_details.name")}</p>,
    },
    {
      title: "orderContactEmail",
      header: () => <span className="font-bold">Contact Email</span>,
      cell: ({ cell }) => <p>{cell.getValue("orderContactEmail")}</p>,
    },
    {
      title: "total_price",
      header: () => <span className="font-bold">Price</span>,
      cell: ({ cell }) => <p>{cell.getValue("total_price")}</p>,
    },
    {
      title: "status",
      header: () => <span className="font-bold">Status</span>,
      cell: ({ cell }) => <Badge className="rounded-md" variant="secondary">Unfulfilled</Badge>,
    },
    {
      title: "platform",
      header: () => <span className="font-bold">Platform</span>,
      cell: ({ cell }) => (
        <Badge className="rounded-md">{cell.getValue("platform")}</Badge>
      ),
    },
  ];
  const columns = col.map((o) => {
    return cH.accessor(o.title, { header: o.header, cell: o.cell });
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  function OrderDetails({ expanded, setExpanded }) {
    return (
      <Dialog open={expanded != null} onClose={() => setExpanded(null)}>
        <DialogContent>
          <div className="flex gap-x-2.5">
            <div id="billing Details" className="">
              <p className="font-bold text-md">Billing Details</p>
              <Separator className="mb-2" />
              <div className="flex flex-col gap-y-1.5">
                <div className="border-2 p-2 rounded-md">
                  <Label className="font-bold text-sm">Name: </Label>
                  <Label className="text-sm">
                    {expanded.billing_details.name}
                  </Label>
                </div>
                <div className="border-2 p-2 rounded-md">
                  <Label className="font-bold text-sm">Phone: </Label>
                  <Label className="text-sm">
                    {expanded.billing_details.phone != null
                      ? expanded.billing_details.phone
                      : "null"}
                  </Label>
                </div>
                <div className="border-2 p-2 rounded-md">
                  <Label className="font-bold text-sm text-nowrap">Address: </Label>
                  <Label className="text-sm text-nowrap">
                    {expanded.billing_details.address1 +
                      "," +
                      expanded.billing_details.city +
                      "," +
                      expanded.billing_details.province_code +
                      "," +
                      expanded.billing_details.country}
                  </Label>
                </div>
                <div className="border-2 p-2 rounded-md">
                  <Label className="font-bold text-sm">Zip: </Label>
                  <Label className="text-sm">
                    {expanded.billing_details.zip}
                  </Label>
                </div>
              </div>
            </div>
            <div id="billing Details">
              <p className="font-bold text-md">Shipping Details</p>
              <Separator className="mb-2" />
              <div className="flex flex-col gap-y-1.5">
                <div className="border-2 p-2 rounded-md">
                  <Label className="font-bold text-sm">Name: </Label>
                  <Label className="text-sm">
                    {expanded.shipping_details.name}
                  </Label>
                </div>
                <div className="border-2 p-2 rounded-md">
                  <Label className="font-bold text-sm">Phone: </Label>
                  <Label className="text-sm">
                    {expanded.shipping_details.phone != null
                      ? expanded.shipping_details.phone
                      : "null"}
                  </Label>
                </div>
                <div className="border-2 p-2 rounded-md text-nowrap">
                  <Label className="font-bold text-sm">Address: </Label>
                  <Label className="text-sm text-nowrap">
                    {expanded.shipping_details.address1 +
                      "," +
                      expanded.shipping_details.city +
                      "," +
                      expanded.shipping_details.province_code +
                      "," +
                      expanded.shipping_details.country}
                  </Label>
                </div>
                <div className="border-2 p-2 rounded-md">
                  <Label className="font-bold text-sm">Zip: </Label>
                  <Label className="text-sm">
                    {expanded.shipping_details.zip}
                  </Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                onClick={() => setExpanded(null)}
                type="button"
                variant="secondary"
      className="font-bold"
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div>
        <Button
          onClick={() => {
            setSync(!sync);
          }}
          className="font-bold"
          variant="outline"
        >
          <RefreshCw /> Sync orders
        </Button>
      </div>
      <Table className="border-2">
        <TableHeader>
          {table.getHeaderGroups().map((hg) => {
            return (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => {
                  return (
                    <TableHead key={h.id}>
                      {flexRender(h.column.columnDef.header, h.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            );
          })}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((rr) => {
            return (
              <TableRow
                onClick={() => {
                  setExpanded(rr.original);
                }}
                key={rr.id}
                className="cursor-pointer"
              >
                {rr.getVisibleCells().map((r) => {
                  return (
                    <TableCell key={r.id}>
                      {flexRender(r.column.columnDef.cell, r.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {expanded && (
        <OrderDetails expanded={expanded} setExpanded={setExpanded} />
      )}
    </div>
  );
}

function Order() {
  return (
    <div className="m-2">
      <SignedIn>
        <Nav />
        <TableOrders />
      </SignedIn>
    </div>
  );
}
export { TableOrders, Order };
