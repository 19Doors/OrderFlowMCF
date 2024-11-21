import {
  SignedIn,
  SignedOut,
  SignInButton,
  useClerk,
  UserButton,
  UserProfile,
  useUser,
} from "@clerk/clerk-react";
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";

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
  return (
    <div className="flex justify-between">
      <NavigationMenu>
        <NavigationMenuList>
          {links.map((e) => {
            return (
              <a href={e.ref} className="font-bold">
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <p className="font-bold">{e.name}</p>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </a>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu>
        <NavigationMenuList>
          <SignedIn>
                <p onClick={()=>{openUserProfile()}} className="cursor-pointer font-bold mr-4">{isSignedIn && user.fullName}</p>
	    <Button onClick={()=>{handleSignOut()}} variant="outline" className="font-bold">SignOut</Button>
          </SignedIn>
          <SignedOut>
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <SignInButton onSignIn={()=>{console.log("SignedIn")}} className="font-bold" />
              </NavigationMenuLink>
            </NavigationMenuItem>
          </SignedOut>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

function Car() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}

function ProductsTable() {
  const theads = ["#", "SKU", "Name", "Category", "Status"];
  return (
    <Table className="my-4">
      <TableHeader>
        <TableRow>
          {theads.map((e) => {
            return <TableHead>{e}</TableHead>;
          })}
        </TableRow>
      </TableHeader>
    </Table>
  );
}

export { Nav, Car, ProductsTable };
