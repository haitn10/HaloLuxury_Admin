import {
  Button,
  Dialog,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import React from "react";
import { deleteCustomers, deleteStores } from "../../api";

const Popup = ({ open, setOpen, storeId, text }) => {
  const onDelete = async (id) => {
    let data = [];
    if (text === "staffs") {
      data = await deleteStores({ id });
    } else if (text === "users") {
      data = await deleteCustomers({ id });
    }
    if (data.statusCode === 200) {
      setOpen(!open);
      window.location.reload();
    } else {
    }
  };
  return (
    <Dialog
      open={open}
      size="md"
      handler={() => {
        setOpen(!open);
      }}
      className="bg-light p-5"
    >
      <DialogHeader className="text-center justify-center text-input text-3xl">
        Are you sure about delete this account ?
      </DialogHeader>
      <DialogFooter>
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
          onClick={() => onDelete(storeId)}
        >
          <span style={{ color: "#fff" }}>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default Popup;
