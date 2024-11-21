import { UserProfile } from "@clerk/clerk-react";
import { Nav } from "./components";

function AccProfile() {
  return (
    <div className="m-4">
      <Nav />
    <div className="flex justify-center items-center">
      <UserProfile/>
    </div>
    </div>
  );
}

export default AccProfile;
