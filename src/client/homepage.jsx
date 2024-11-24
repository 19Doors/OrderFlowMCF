import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Nav, ProductsTable } from "./components";
import { TableOrders } from "./orders";
import { Separator } from "../components/ui/separator";
import { BackgroundBeams } from "../components/ui/background-beams";
import { FlipWords } from "../components/ui/flip_words";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Earth, FolderKanban, Package, Scaling } from "lucide-react";

function Homepage() {
  return (
    <div className="m-2 mx-4">
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
      <SignedOut>
        <div className="flex flex-col m-10">
          <div className="mb-10">
            <p className="w-2/3 font-sg font-bold text-6xl mb-10">
              Transform your E-commerce Operations in Seconds
            </p>
            <p className="w-1/2 font-sg text-3xl">
              Seamlessly
              <FlipWords
                words={["manage", "create", "scale"]}
                className="font-bold"
                duration="2000"
              />
              your store with Amazon's Fulfillment Network.
            </p>
          </div>
          <p className="font-sg font-bold text-3xl mb-4">Features</p>
          <div className="flex gap-x-3.5">
            <Card className="border-2 w-[15rem]">
              <CardHeader>
                <CardTitle className="text-sm">
                  <div className="flex justify-between">
                    <p>Real-Time Inventory Sync</p>
                    <Package />
                  </div>
                </CardTitle>
                <CardDescription>
                  <p>
                    Avoid stock discrepancies and missed sales. Automatically
                    update inventory levels across your store and Amazon MCF in
                    real time.
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 w-[15rem]">
              <CardHeader>
                <CardTitle className="text-sm">
                  <div className="flex justify-between">
                    <p className="">Centralized Order Management</p>
                    <FolderKanban />
                  </div>
                </CardTitle>
                <CardDescription>
                  <p>
                    Streamline your order process by syncing and managing all
                    orders in one place. Keep track of every detail, from
                    creation to delivery, with ease.
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 w-[15rem]">
              <CardHeader>
                <CardTitle className="text-sm">
                  <div className="flex justify-between">
                    <p>Scalable and Easy-to-Use</p>
                    <Scaling />
                  </div>
                </CardTitle>
                <CardDescription>
                  <p>
                    Built for businesses of all sizes. Whether you’re scaling or
                    starting fresh, our tool simplifies fulfillment without
                    extra coding effort.
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 w-[15rem]">
              <CardHeader>
                <CardTitle className="text-sm">
                  <div className="flex justify-between">
                    <p className="">Global Fulfillment</p>
                    <Earth />
                  </div>
                </CardTitle>
                <CardDescription>
                  <p>
                    Tap into Amazon's logistics to deliver products quickly
                    across the globe. Ensure faster shipping, happy customers,
                    and fewer operational headaches.
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </SignedOut>
    </div>
  );
}

export default Homepage;
