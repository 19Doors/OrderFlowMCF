import { SignedIn } from "@clerk/clerk-react";
import { Nav, ProductsTable } from "./components";
import { TableOrders } from "./orders";
import { Separator } from "../components/ui/separator";

function Homepage() {
  return (
    <div className="m-2">
      <Nav />
      <SignedIn>
        <div className="flex w-full">
          <div className="flex flex-col gap-y-2 w-1/2">
            <div className=" border-2 p-2">
              <p className="font-sg font-bold text-xl m-2">Orders</p>
              <Separator className="mb-3" />
              <TableOrders />
            </div>
            <div className="border-2 p-2">
              <p className="font-sg font-bold text-xl m-2">Products</p>
              <Separator className="mb-3" />
              <ProductsTable className="" />
            </div>
          </div>
          <div className="w-1/2 p-2 ml-2 border-2">
              <p className="font-sg font-bold text-xl m-2">Logs</p>
              <Separator className="mb-3" />
          </div>
        </div>
      </SignedIn>
    </div>
  );
}

export default Homepage;
