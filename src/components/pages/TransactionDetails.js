import {
  Dialog,
  DialogBody,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import moment from "moment";
import React from "react";

const TransactionDetails = ({ open, setOpen, setData, data }) => {
  console.log(data);
  return (
    <Dialog
      open={open}
      size="lg"
      handler={() => {
        setOpen(!open);
        setData(null);
      }}
      className="bg-light p-10"
    >
      <DialogHeader className="text-center justify-center text-input text-3xl">
        Thông Tin Giao Dịch
      </DialogHeader>
      <DialogBody className=" flex flex-col gap-3" divider={true}>
        {data
          ? data.orderItems.map((item) => (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <img
                    className="h-24 w-24 rounded-lg"
                    src={item.imageLink}
                    alt=""
                  />
                  <div>
                    <Typography variant="h6">ID: {item.productId}</Typography>
                    <Typography variant="h6">{item.productName}</Typography>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <Typography variant="h6">Total:</Typography>
                  <p>{Intl.NumberFormat("vi-VN").format(item.total)}</p>
                </div>
              </>
            ))
          : null}
        <div style={{ borderTop: 2, borderColor: "#ccc" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Typography variant="h6">Họ và tên: </Typography>
            <p>
              {data
                ? data.customer.firstName + " " + data.customer.lastName
                : ""}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Typography variant="h6">Email: </Typography>
            <p>{data ? data.customer.email : null}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Typography variant="h6">Địa chỉ: </Typography>
            <p>
              {data
                ? data.address.addressData +
                  (data.address.ward ? ", " + data.address.ward : "") +
                  (data.address.district ? ", " + data.address.district : "") +
                  (data.address.city ? ", " + data.address.city : "")
                : null}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Typography variant="h6">Số điện thoại: </Typography>
            <p>{data ? data.address.phone : null}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Typography variant="h6">Ngày đặt hàng: </Typography>
            <p>{data ? moment(data.orderTime).format("DD/MM/YYYY") : null}</p>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default TransactionDetails;
