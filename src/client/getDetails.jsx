import { Form } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "@/components/ui/button"

function APIDetails() {
  const labelCN = "font-bold text-md text-left my-2";
  const inputCN = "w-48 h-6 p-4";
  return (
    <div className="w-screen h-screen bg-red flex flex-col justify-center items-center">
      <div className="flex items-start">
        <div className="flex flex-col items-start mx-7 border-2 rounded p-8">
          <Label className="font-bold text-3xl mb-5">Amazon</Label>
          <Label className={labelCN}>Client Id</Label>
          <Input className={inputCN} placeholder="Id" />
          <Label className={labelCN}>Client Token</Label>
          <Input className={inputCN} placeholder="Client Token" />
          <Label className={labelCN}>Refresh Token</Label>
          <Input className={inputCN} placeholder="Refresh Token" />
        </div>
        <div className="flex flex-col items-start mx-7 border-2 rounded p-8">
          <Label className="font-bold text-3xl mb-5">Shopify</Label>
          <Label className={labelCN}>Client Id</Label>
          <Input className={inputCN} placeholder="Id" />
          <Label className={labelCN}>Client Token</Label>
          <Input className={inputCN} placeholder="Client Token" />
          <Label className={labelCN}>Access Token</Label>
          <Input className={inputCN} placeholder="Access Token" />
        </div>
      </div>
      <Button className="mt-6">Submit</Button>
    </div>
  );
}
export default APIDetails;
