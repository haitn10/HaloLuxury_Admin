import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { storage } from "../../firebase";
import { addNewStore } from "../../api";

const dataUser = {
  username: "",
  password: "",
  fullname: "",
  email: "",
  address: "",
  phone: "",
};
const storeCreate = {
  name: "",
  email: "",
  address: "",
  phone: "",
  image: "",
};

const CreateStore = ({ open, setOpen }) => {
  const [dataUsers, setDataUsers] = useState(dataUser);
  const [dataStores, setDataStores] = useState(storeCreate);
  const [values, setValues] = useState([]);
  const [img, setImg] = useState("");

  useEffect(() => {
    if (img.length !== 0) {
      for (let i = 0; i < img.length; i++) {
        const imageRef = ref(storage, `materials/${img[i].name}`);
        uploadBytes(imageRef, img[i]).then(() => {
          getDownloadURL(imageRef).then((url) => {
            setDataStores({ ...dataStores, image: url });
          });
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [img]);

  useEffect(() => {
    setValues({ ...dataUsers, storeCreate: dataStores });
  }, [dataStores, dataUsers]);

  const handleChangeUser = (event) => {
    setDataUsers({
      ...dataUsers,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeStore = (event) => {
    setDataStores({
      ...dataStores,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    setImg(event.target.files);
  };

  const onCreate = async (e) => {
    const data = await addNewStore({ values });
    console.log(data);
  };

  return (
    <Dialog
      open={open}
      size="lg"
      handler={() => {
        setOpen(!open);
      }}
      className="bg-light p-5"
    >
      <DialogHeader className="text-center justify-center text-input text-3xl">
        Create New Store
      </DialogHeader>
      <DialogBody divider>
        <div className=" flex justify-center">
          <span className="font-normal text-third">
            ( Please enter full information )
          </span>
        </div>
        <form>
          <div className="flex justify-center gap-5">
            <div className="flex flex-col gap-5 w-96">
              <Typography variant="h5">Store Info</Typography>
              <Input
                color="blue"
                label="Store Name"
                required
                name="name"
                onChange={handleChangeStore}
              />
              <Input
                color="blue"
                label="Store Email"
                required
                name="email"
                type="email"
                onChange={handleChangeStore}
              />
              <Input
                color="blue"
                label="Store Address"
                required
                name="address"
                onChange={handleChangeStore}
              />
              <Input
                color="blue"
                label="Store Phone Number"
                required
                type="tel"
                name="phone"
                onChange={handleChangeStore}
              />
              <Input
                type="file"
                className=" file:h-full file:bg-transparent file:font-normal file:text-sm file:border-r file:border-0 file:border-gray-100 file:mr-4"
                name="image"
                onChange={handleChangeImage}
              />
            </div>

            <div className="flex flex-col gap-5 w-96">
              <Typography variant="h5">Staff Info</Typography>
              <Input
                color="blue"
                label="Full Name"
                type="text"
                required
                name="fullname"
                onChange={handleChangeUser}
              />
              <Input
                color="blue"
                label="User Name"
                type="text"
                required
                name="username"
                onChange={handleChangeUser}
              />
              <Input
                color="blue"
                label="Password"
                type="password"
                required
                name="password"
                onChange={handleChangeUser}
              />
              <Input
                color="blue"
                label="Email"
                type="email"
                required
                name="email"
                onChange={handleChangeUser}
              />
              <Input
                color="blue"
                label="Address"
                type="text"
                required
                name="address"
                onChange={handleChangeUser}
              />
              <Input
                color="blue"
                label="Phone Number"
                type="tel"
                required
                name="phone"
                onChange={handleChangeUser}
              />
            </div>
          </div>
          <div className="flex justify-center pt-20">
            <Button
              variant="filled"
              onClick={() => setOpen(!open)}
              className="mr-3 bg-red"
            >
              <span style={{ color: "#fff" }}>Cancel</span>
            </Button>
            <Button
              variant="filled"
              color="light-green"
              type="button"
              onClick={onCreate}
            >
              <span style={{ color: "#fff" }}>Confirm</span>
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default CreateStore;
