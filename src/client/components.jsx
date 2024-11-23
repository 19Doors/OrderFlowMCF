import {
  SignedIn,
  SignedOut,
  SignInButton,
  useClerk,
  UserButton,
  UserProfile,
  useSignUp,
  useUser,
} from "@clerk/clerk-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "../components/ui/dropdown-menu";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";

function Nav() {
  let links = [
    {
      name: "Dashboard",
      ref: "/",
    },
    {
      name: "Products",
      ref: "/products",
    },
    {
      name: "Orders",
      ref: "/orders",
    },
  ];
  const { signOut, openUserProfile } = useClerk();
  const { isSignedIn, user, isLoaded } = useUser();
  async function handleSignOut() {
    await signOut();
    console.log("SignedOut");
  }
  // Form
  const { register, handleSubmit } = useForm();

  async function getShopifyAccessToken(data) {
    try {
      const payload = {
        email: user.primaryEmailAddress.emailAddress,
        shopifyToken: data.accessToken,
      };
      console.log(await axios.post("/api/setShopifyToken", payload));
      // console.log("Added/Updated Shopify Access Token",payload);
    } catch (e) {
      console.error("Error adding/updating shopify access token: " + e);
    }
  }

  return (
    <div className="flex justify-between py-2">
      <NavigationMenu>
        <SignedIn>
          <NavigationMenuList>
            {links.map((e) => {
              return (
                <a href={e.ref} className="font-bold">
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      <p className="font-bold">{e.name}</p>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </a>
              );
            })}
          </NavigationMenuList>
        </SignedIn>
        <SignedOut>
          <p className="font-sg font-bold text-xl">OrderFlowMCF</p>
        </SignedOut>
      </NavigationMenu>
      <NavigationMenu>
        <NavigationMenuList>
          <SignedIn>
            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage
                      src={isSignedIn && user.imageUrl}
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="cursor-pointer">
                    <DialogTrigger>Shopify</DialogTrigger>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="border-2" />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      openUserProfile();
                    }}
                  >
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      handleSignOut();
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Enter API Details</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(getShopifyAccessToken)}>
                  <Input
                    {...register("accessToken")}
                    placeholder="Access Token"
                    className="h-8"
                  />
                  <Button type="submit" className="mt-4">
                    Confirm
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </SignedIn>
          <SignedOut>
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <SignInButton
                  onSignIn={() => {
                    console.log("SignedIn");
                  }}
                  className="font-bold"
                />
              </NavigationMenuLink>
            </NavigationMenuItem>
          </SignedOut>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

function ProductsTable() {
  // SubComponents
  function THeader({ theads }) {
    return (
      <>
        {theads.map((e) => {
          return <TableHead>{e}</TableHead>;
        })}
      </>
    );
  }

  function AddProducts({ products, st, setSt, variant }) {
    const { register, handleSubmit } = useForm();
    const [status, setStatus] = useState("");
    const { user } = useClerk();
    async function onProductSubmit(data) {
      data.status = status;
      console.log(data);
      products.push(data);
      const pay = {
        email: user.primaryEmailAddress.emailAddress,
        product: products,
      };
      try {
        const d = await axios.post("/api/addProducts", pay);
        console.log("Product Added!");
        setSt(!st);
      } catch (e) {
        console.error(e);
      }
    }

    let ww = "";
    let w2 = "";
    if(variant==1) {
      ww = "w-1/3";
      w2 = "min-h-screen flex justify-center items-center";
    }else {
      ww = "";
      w2 = "";
    }
    return (
      <div className={w2}>
        <Card className={ww}>
          <CardHeader>
            <CardTitle> Add Product </CardTitle>
            <CardDescription>
              {" "}
              You can add product to all of your listings across all online
              stores.{" "}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onProductSubmit)}
              className="space-y-1.5"
            >
              <div className="flex flex-col space-y-1.5">
                <Input
                  {...register("name")}
                  placeholder="Name of Product"
                  className=""
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input {...register("sku")} placeholder="SKU/ID" className="" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  {...register("category")}
                  placeholder="Category"
                  className=""
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  {...register("price")}
                  placeholder="Price (Include Currency)"
                  className=""
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  {...register("stock")}
                  placeholder="Stocks"
                  className=""
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Select
                  onValueChange={(d) => {
                    setStatus(d);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="ofs">Out of stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="font-bold mt-4">Add</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
  function DisplayProducts({ products }) {
    return (
      <>
        {products.map((e) => {
          return (
            <TableRow>
              <TableCell>{e.name}</TableCell>
              <TableCell>{e.sku}</TableCell>
              <TableCell>{e.category}</TableCell>
              <TableCell>{e.price}</TableCell>
              <TableCell>{e.stock}</TableCell>
              <TableCell>{e.status}</TableCell>
            </TableRow>
          );
        })}
      </>
    );
  }
  // TanStack Table 
  const [products, setProducts] = useState([]);
  const [st, setSt] = useState(false);
  const { user } = useClerk();
  useEffect(() => {
    const df = async () => {
      try {
        const d = await axios.post("/api/getProducts", {
          email: user.primaryEmailAddress.emailAddress,
        });
        setProducts(d.data.products);
      } catch (e) {
        console.error(e);
      }
    };
    df();
  }, [st]);
  const theads = [
    // "Image",
    "Name",
    "SKU/ID",
    "Category",
    "Price",
    "Stock",
    "Status",
  ];
  if (products.length == 0) {
    return (
      <>
        <AddProducts products={products} st={st} setSt={setSt} variant={1} />
      </>
    );
  } else {
    return (
      <>
        <MenuProducts products={products} st={st} setSt={setSt} />
        <Table className="my-4">
          <TableHeader>
            <TableRow>
              <THeader theads={theads} />
            </TableRow>
          </TableHeader>
          <TableBody>
            <DisplayProducts products={products} />
          </TableBody>
        </Table>
      </>
    );
  }

  function MenuProducts({ products, st, setSt }) {
    return (
      <Dialog>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger className="font-bold">Edit</MenubarTrigger>
            <MenubarContent className="">
              <MenubarItem
                onClick={() => {
                  console.log("ADD");
                }}
              >
                <DialogTrigger>Add Products</DialogTrigger>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <DialogContent className="sm:max-w-[425px]">
          <AddProducts products={products} st={st} setSt={setSt} variant={0}/>
        </DialogContent>
      </Dialog>
    );
  }
}
export { Nav, ProductsTable };
