import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
} from "@material-tailwind/react";

const Settings = () => {
  const onEnter = () => {};
  return (
    <div className="m-10 w-full">
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <Typography variant="h3" className="ml-4">
            Settings
          </Typography>
        </CardHeader>
        <CardBody className="rounded-none grid md:grid-cols-2 gap-2 m-10">
          <div className="border-r-2 pl-10">
            <ul className="max-w-sm">
              <li className="mb-3">
                <Typography>Name Store</Typography>
                <Input onChange={onEnter} />
              </li>
              <li className="mb-3">
                <Typography>Phone Number</Typography>
                <Input onChange={onEnter} />
              </li>
              <li className="mb-3">
                <Typography>Address</Typography>
                <Input onChange={onEnter} />
              </li>
            </ul>
          </div>
          <div className="ml-4">
            <Typography variant="h6">Store Information</Typography>
            <div></div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Settings;
