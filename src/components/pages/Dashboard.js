import {
  Alert,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getBrands, getCategorys, getProduct, getTotals } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { add_product } from "../../redux/action";
import moment from "moment/moment";

const product = {
  brandId: 0,
  categoryId: 0,
  name: "",
  descs: "",
  price: 0,
  salePrice: 0,
  quality: 0,
  images: [],
};

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [brands, setBrands] = useState();
  const [imgs, setImgs] = useState([]);
  const [categorys, setCategorys] = useState();
  const [total, setTotal] = useState();
  const [listProduct, setListProduct] = useState();
  const [values, setValues] = useState(product);
  const [errorMessage, setErrorMessage] = useState("");
  const state = useSelector((state) => state.auth);
  const [alert, setAlert] = useState({ status: false, message: "", color: "" });
  const dispatch = useDispatch();

  const onLogout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    window.location.reload();
  };
  useEffect(() => {
    async function getData() {
      setBrands(await getBrands());
      setCategorys(await getCategorys());
      setTotal(await getTotals(state.profile.id));
      setListProduct(await getProduct(state.profile.id));
    }
    getData();
  }, [state.profile.id]);

  useEffect(() => {
    let images = [];
    if (imgs.length !== 0) {
      for (let i = 0; i < imgs.length; i++) {
        const imageRef = ref(storage, `materials/${imgs[i].name}`);
        uploadBytes(imageRef, imgs[i]).then(() => {
          getDownloadURL(imageRef).then((url) => {
            images.push(url);
          });
        });
      }
    }
    setValues({ ...values, images });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgs]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    setImgs(event.target.files);
  };

  const onSubmit = async () => {
    try {
      await dispatch(add_product(values));
      setOpen(!open);
      setAlert({
        status: true,
        message: "Add product successfully!",
        color: "success",
      });
    } catch (e) {
      setErrorMessage(e);
      setOpen(!open);
      setAlert({ status: true, message: errorMessage, color: "red" });
    }
  };
  console.log(listProduct);

  return brands && categorys && listProduct && total ? (
    <div className="container m-10">
      <Alert
        open={alert.status}
        onClose={() => setAlert({ status: false, message: "", color: "" })}
        animate={{
          mount: { x: 0 },
          unmount: { x: 100 },
        }}
        color={alert.color}
        className="absolute mt-5 z-50 right-1 w-400 text-light"
      >
        {alert.message}
      </Alert>
      <Dialog
        open={open}
        size="lg"
        handler={() => setOpen(!open)}
        className="bg-light p-10"
      >
        <DialogHeader className="text-center justify-center text-input text-3xl">
          Điền Thông Tin Sản Phẩm
        </DialogHeader>
        <DialogBody className=" flex flex-col gap-3">
          <div className="grid grid-cols-3 items-center">
            <label htmlFor="name" className="text-lg font-medium mr-4">
              Tên sản phẩm
            </label>
            <input
              id="name"
              type="text"
              className="col-span-2 border border-second px-5 p-1 focus:outline-none w-full rounded-md"
              name="name"
              required
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-3 items-center">
            <label htmlFor="price" className="text-lg font-medium mr-4 w">
              Giá niêm yết
            </label>
            <input
              id="price"
              type="number"
              min={1000}
              required
              className="col-span-2 border border-second px-5 p-1 focus:outline-none w-full rounded-md"
              name="price"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-3 items-center">
            <label htmlFor="salePrice" className="text-lg font-medium mr-4 w">
              Giá bán
            </label>
            <input
              id="salePrice"
              type="number"
              min={1000}
              required
              className="col-span-2 border border-second px-5 p-1 focus:outline-none w-full rounded-md"
              name="salePrice"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-3 items-center">
            <label htmlFor="quality" className="text-lg font-medium mr-4 w">
              Chất lượng sản phẩm (%)
            </label>
            <input
              id="quality"
              type="number"
              min={85}
              max={100}
              required
              className="col-span-2 border border-second px-5 p-1 focus:outline-none w-full rounded-md"
              name="quality"
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-3 items-center">
            <label htmlFor="brand" className="text-lg font-medium mr-4 w">
              Brand
            </label>
            <select
              id="brand"
              className="col-span-2 border border-second px-5 p-1 focus:outline-none w-full rounded-md"
              name="brandId"
              onChange={handleChange}
            >
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id} defaultValue={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-3 items-center">
            <label htmlFor="category" className="text-lg font-medium mr-4">
              Phân loại
            </label>
            <select
              id="category"
              className="col-span-2 border border-second px-5 p-1 focus:outline-none w-full rounded-md"
              name="categoryId"
              onChange={handleChange}
            >
              {categorys.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                  defaultValue={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-3 items-center">
            <label htmlFor="descs" className="text-lg font-medium mr-4 w">
              Mô tả khác
            </label>
            <textarea
              name="descs"
              id="descs"
              cols="20"
              rows="5"
              className="col-span-2 border border-second px-5 p-1 focus:outline-none w-full rounded-md"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-3 items-center">
            <label htmlFor="quality" className="text-lg font-medium mr-4 w">
              Tải ảnh sản phẩm
            </label>
            <input
              id="file"
              type="file"
              className="col-span-2 border border-second px-5 p-1 focus:outline-none w-full rounded-md"
              name="imgs"
              multiple
              onChange={(e) => handleChangeImage(e)}
            />
          </div>
        </DialogBody>
        <DialogFooter className="flex gap-5 mr-10">
          <Button
            onClick={() => setOpen(!open)}
            className="bg-first text-light"
          >
            <span>Cancel</span>
          </Button>
          <Button onClick={onSubmit} className="bg-second text-light">
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <div className="flex justify-between items-center">
        <Typography className="text-2xl font-bold">Dashboard</Typography>
        <div className="flex gap-5">
          <Button
            className="text-light bg-second px-5 py-3 rounded-xl"
            onClick={() => setOpen(!open)}
          >
            Post
          </Button>
          <Button
            className="text-light bg-red px-4 py-3 rounded-xl"
            onClick={(e) => onLogout(e)}
          >
            Logout
          </Button>
        </div>
      </div>
      <div className="flex justify-around mt-10">
        <div className="grid grid-cols-4 w-full gap-5">
          <div className="flex flex-col justify-center border border-first p-3 text-center rounded-xl h-28 bg-light">
            <Typography className="text-button font-medium text-lg">
              Total Products
            </Typography>
            <Typography className="text-input text-3xl font-bold">
              {total.productNumber}
            </Typography>
          </div>
          <div className="flex flex-col justify-center border border-first p-3 text-center rounded-xl h-28 bg-light">
            <Typography className="text-button font-medium text-lg">
              Total Revenue
            </Typography>
            <Typography className="text-input text-3xl font-bold">
              {Intl.NumberFormat("vi-VN").format(total.totalRevenue)}
            </Typography>
          </div>
          <div className="flex flex-col justify-center border border-first p-3 text-center rounded-xl h-28 bg-light">
            <Typography className="text-button font-medium text-lg">
              Total Followers
            </Typography>
            <Typography className="text-input text-3xl font-bold">
              {total.followerNumber}
            </Typography>
          </div>
          <div className="flex flex-col justify-center border border-first p-3 text-center rounded-xl h-28 bg-light">
            <Typography className="text-button font-medium text-lg">
              Total Bills
            </Typography>
            <Typography className="text-input text-3xl font-bold">
              {total.orderNumber}
            </Typography>
          </div>
        </div>
      </div>

      <div className="border border-first bg-light mt-10 p-10 rounded-lg max-h-min">
        <div className="flex justify-between">
          <Typography className="font-bold text-2xl">Transactions</Typography>
          <div className="flex flex-col w-72 gap-6">
            <input
              id="default-search"
              className="h-10 p-5 outline-none border border-first rounded-xl"
              placeholder="Tên sẩn phẩm...."
              // onChange={handleSearch}
            />
          </div>
        </div>
        <div className="p-3">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="text-xs uppercase text-button rounded-sm">
                <tr>
                  <th className="p-2">
                    <div className="font-semibold text-left">
                      Tên khách hàng
                    </div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">
                      Số lượng sản phẩm
                    </div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">Giá bán</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">Ngày bán</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">Conversion</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium divide-y divide-second">
                {listProduct.map((product) => (
                  <tr key={product.id}>
                    <td className="p-2">
                      <div className="flex items-center">
                        <img
                          src={product.imageLink}
                          alt=""
                          className="w-9 h-9 rounded-full object-contain border border-first mr-2"
                        />
                        {product.customer.firstName +
                          " " +
                          product.customer.lastName}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        {product.orderItems.length}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-emerald-500">
                        {Intl.NumberFormat("vi-VN").format(product.total)}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        {moment(product.orderTime).format('YYYY-MM-DD')}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-sky-500">4.7%</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Dashboard;
