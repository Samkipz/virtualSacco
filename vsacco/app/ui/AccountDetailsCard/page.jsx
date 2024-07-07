import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AccountDetailsCard = () => {
  return (
    <Card className="w-full">
      <CardHeader className="bg-blue-600 text-white">
        <CardTitle>Account Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <p className="text-red-500 text-3xl">- $23.83</p>
          <p className="text-gray-500">Available balance</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-around">
        <Button variant="default" className="flex-grow mx-1">
          Pay
        </Button>
        <Button variant="default" className="flex-grow mx-1">
          Transfer
        </Button>
        <Button variant="default" className="flex-grow mx-1">
          ...
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AccountDetailsCard;
