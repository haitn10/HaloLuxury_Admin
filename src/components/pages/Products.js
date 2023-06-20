import {
  Alert,
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import {
  MagnifyingGlassIcon,
  PencilIcon,
  // ArrowUpCircleIcon,
  // ArrowDownCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { deleteProduct, getAllProducts, getProductDetails } from "../../api";
import { useSelector } from "react-redux";
import moment from "moment";
import ProductItem from "./ProductItem";

const TABLE_HEAD = [
  "Hình ảnh",
  "Tên sản phẩm",
  "Ngày nhập",
  "Giá tiền",
  "Phân loại",
  "Chỉnh sửa",
];

const Products = () => {
  const userId = useSelector((state) => state.auth.profile.id);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [allProducts, setAllProducts] = useState(null);
  const [alert, setAlert] = useState({ status: false, message: "", color: "" });

  useEffect(() => {
    async function getProducts() {
      setAllProducts(await getAllProducts(userId));
    }
    getProducts();
  }, [userId, open]);

  const onEdit = async (id) => {
    setOpen(!open);
    setData(await getProductDetails(id));
  };

  // const onStatus = async (id) => {};

  const onDelete = async (id) => {
    const data = await deleteProduct(id);
    console.log(data);
    if (data.statusCode === 200) {
      window.location.reload();
    } else {
      setAlert({
        status: true,
        message: "Error in processing delete!",
        color: "red",
      });
    }
  };

  return (
    <div className="m-10 w-full">
      {
        <Alert
          open={alert.status}
          onClose={() => setAlert({ status: false, message: "", color: "" })}
          animate={{
            mount: { x: 0 },
            unmount: { x: 100 },
          }}
          className={`absolute mt-5 z-50 right-1 w-400 text-light bg-${alert.color}`}
        >
          {alert.message}
        </Alert>
      }
      <ProductItem
        data={data ? data : null}
        setData={setData}
        open={open}
        setOpen={setOpen}
        setAlert={setAlert}
      />

      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Danh sách sản phẩm
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-5 md:w-max">
              <div className="w-full md:w-72 mt-1">
                <Input
                  label="Search..."
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
              <Button
                className="text-light bg-second rounded-xl"
                onClick={() => setOpen(!open)}
              >
                Post
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-y-auto px-0">
          <table className="w-full table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allProducts &&
                allProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={product.image}
                          alt={product.name}
                          size="md"
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                        />
                      </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {product.name}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {moment(product.createdDate).format("DD/MM/YYYY")}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {Intl.NumberFormat("vi-VN").format(product.price)}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      {product.category}
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 pl-7">
                      <IconButton
                        variant="text"
                        color="blue-gray"
                        className="border mr-3 mb-1"
                        onClick={() => onEdit(product.id)}
                      >
                        <PencilIcon className="h-5 w-5" />
                      </IconButton>
                      {/* <IconButton
                        variant="text"
                        color="blue-gray"
                        className="bg-second text-light mr-3 mb-1"
                        onClick={() => onStatus(product.id)}
                      >
                        {product.status !== 1 ? (
                          <ArrowUpCircleIcon className="h-5 w-5" />
                        ) : (
                          <ArrowDownCircleIcon className="h-5 w-5" />
                        )}
                      </IconButton> */}
                      <IconButton
                        variant="text"
                        color="blue-gray"
                        className="bg-red text-light mr-3 mb-1"
                        onClick={() => onDelete(product.id)}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </IconButton>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
};

export default Products;
