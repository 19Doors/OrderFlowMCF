import { SignedIn } from "@clerk/clerk-react";
import { Nav, ProductsTable } from "./components";
import { useForm } from "react-hook-form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Separator } from "@/components/ui/separator";
import { StackTable } from "./table";
function Products() {
  return (
    <div className="m-2">
      <Nav />
      <SignedIn>
        <Separator />
        <ProductsTable />
      </SignedIn>
    </div>
  );
}

export default Products;
