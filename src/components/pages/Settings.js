import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
  Input,
  Button,
  Alert,
} from "@material-tailwind/react";
import { changePasswordAPI, updateProfile } from "../../api";

const Settings = () => {
  const data = JSON.parse(sessionStorage.getItem("profile"));
  const [alert, setAlert] = useState({ status: false, message: "", color: "" });
  const [profile, setProfile] = useState({
    fullName: data.fullName,
    phone: data.phone,
    email: data.email,
    address: data.address,
  });
  const [changePassword, setChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const onChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const onChangePass = (e) => {
    setChangePassword({
      ...changePassword,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeProfile = async (e) => {
    try {
      const response = await updateProfile({ id: data.id, profile: profile });
      if (response.statusCode === 200) {
        setAlert({
          status: true,
          message: "Update Successfully!",
          color: "green",
        });
      }
    } catch (e) {
      setAlert({
        status: true,
        message: "Update Failed!",
        color: "red",
      });
    }
  };

  const onChangePassAPI = async (e) => {
    try {
      const response = await changePasswordAPI({
        id: data.id,
        changePassword: changePassword,
      });
      if (response.statusCode === 200) {
        setAlert({
          status: true,
          message: "Change Password Successfully!",
          color: "green",
        });
      } else {
        setAlert({
          status: true,
          message: response.data.message
            ? response.data.message
            : "Change Password Failed",
          color: "red",
        });
      }
    } catch (e) {
      console.log(e);
      setAlert({
        status: true,
        message: e.message ? e.message : "Change Password Failed!",
        color: "red",
      });
    }
  };

  return (
    <div className="m-10 w-full">
      <Alert
        open={alert.status}
        onClose={() => setAlert({ status: false, message: "", color: "" })}
        animate={{
          mount: { x: 0 },
          unmount: { x: 100 },
        }}
        className={`absolute z-50 right-1 w-400 text-light bg-${alert.color}`}
      >
        {alert.message}
      </Alert>
      <Card className="h-full w-full">
        <CardHeader
          shadow={false}
          className="h-1/6 bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center"
        >
          <Typography variant="h1" className="text-light">
            Settings
          </Typography>
        </CardHeader>

        <CardBody className="rounded-none m-10">
          <Tabs value="profile">
            <TabsHeader>
              <Tab key="profile" value="profile">
                My Profile
              </Tab>
              <Tab key="shop" value="shop">
                My Shop
              </Tab>
              <Tab key="changePass" value="changePass">
                Change Password
              </Tab>
            </TabsHeader>
            <TabsBody>
              <TabPanel
                key="profile"
                value="profile"
                className="flex justify-center items-center"
              >
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                  <div className="mb-4 flex flex-col gap-6">
                    <Input
                      className="w-200"
                      type="text"
                      size="lg"
                      label="Full Name"
                      name="fullName"
                      required
                      value={profile.fullName ? profile.fullName : ""}
                      onChange={(e) => onChange(e)}
                    />
                    <Input
                      className="w-200"
                      type="tel"
                      size="lg"
                      label="Phone Number"
                      name="phone"
                      required
                      value={profile.phone ? profile.phone : ""}
                      onChange={(e) => onChange(e)}
                    />
                    <Input
                      className="w-200"
                      type="email"
                      size="lg"
                      label="Email"
                      name="email"
                      required
                      value={profile.email ? profile.email : ""}
                      onChange={(e) => onChange(e)}
                    />
                    <Input
                      className="w-200"
                      type="text"
                      size="lg"
                      label="Address"
                      name="address"
                      required
                      value={profile.address ? profile.address : ""}
                      onChange={(e) => onChange(e)}
                    />
                  </div>

                  <Button
                    className="mt-6 bg-first text-light"
                    fullWidth
                    onClick={(e) => onChangeProfile(e)}
                  >
                    Change
                  </Button>
                </form>
              </TabPanel>
              <TabPanel key="shop" value="shop">
                We're constantly trying to express ourselves and actualize our
                dreams.
              </TabPanel>
              <TabPanel
                key="changePass"
                value="changePass"
                className="flex justify-center items-center"
              >
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                  <div className="mb-4 flex flex-col gap-6">
                    <Input
                      type="password"
                      size="lg"
                      label="Old Password"
                      required
                      name="oldPassword"
                      value={changePassword.oldPassword}
                      onChange={onChangePass}
                    />
                    <Input
                      type="password"
                      size="lg"
                      label="New Password"
                      required
                      name="newPassword"
                      value={changePassword.newPassword}
                      onChange={onChangePass}
                    />
                    <Input
                      type="password"
                      size="lg"
                      label="Confirm Password"
                      required
                      name="confirmPassword"
                      value={changePassword.confirmPassword}
                      onChange={onChangePass}
                    />
                  </div>

                  <Button
                    className="mt-6 bg-first text-light"
                    fullWidth
                    onClick={(e) => onChangePassAPI(e)}
                  >
                    Change
                  </Button>
                </form>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default Settings;
