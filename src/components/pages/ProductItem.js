import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { storage } from "../../firebase";
import { useDispatch } from "react-redux";
import { add_product, update_product } from "../../redux/action";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { getBrands, getCategorys } from "../../api";

const product = {
  brandId: 1,
  categoryId: 1,
  name: "",
  descs: "",
  price: 0,
  salePrice: 0,
  quality: 0,
  images: [],
};

export default function ProductItem({
  data,
  setData,
  open,
  setOpen,
  setAlert,
}) {
  const [brands, setBrands] = useState();
  const [categorys, setCategorys] = useState();
  const [imgs, setImgs] = useState([]);
  const [values, setValues] = useState(product);
  const dispatch = useDispatch();

  const getImage = (data) => {
    var output = [];
    data.map((element) => output.push(element.linkImage));
    return output;
  };

  useEffect(() => {
    data === null
      ? setValues(product)
      : setValues({
          name: data.name,
          price: data.price ? data.price : 0,
          salePrice: data.salePrice ? data.salePrice : 0,
          quality: data.quality,
          brandId: data.brand.id,
          categoryId: data.category.id,
          descs: data.descs,
          images: getImage(data.images),
        });
  }, [data]);

  console.log(values);

  useEffect(() => {
    async function getData() {
      setBrands(await getBrands());
      setCategorys(await getCategorys());
    }
    getData();
  }, []);

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
      if (data === null) {
        await dispatch(add_product(values));
        setOpen(!open);
        setData(null);
        setAlert({
          status: true,
          message: "Add product successfully!",
          color: "green",
        });
        setValues(product);
      } else {
        await dispatch(update_product({ id: data.id, data: values }));
        setOpen(!open);
        setData(null);
        setAlert({
          status: true,
          message: "Update product successfully!",
          color: "green",
        });
        setValues(product);
      }
    } catch (e) {
      setOpen(!open);
      setData(null);
      setAlert({
        status: true,
        message: "Something went wrong!",
        color: "red",
      });
    }
  };
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
            defaultValue={data ? data.name : null}
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
            defaultValue={data ? data.price : null}
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
            defaultValue={data ? data.salePrice : null}
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
            defaultValue={data ? data.quality : null}
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
            required
            defaultValue={data ? data.brand.id : 1}
          >
            {brands &&
              brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
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
            required
            defaultValue={data ? data.category.id : 1}
          >
            {categorys &&
              categorys.map((category) => (
                <option key={category.id} value={category.id}>
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
            defaultValue={data ? data.descs : null}
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
        <Button onClick={() => setOpen(!open)} className="bg-first text-light">
          <span>Cancel</span>
        </Button>
        <Button onClick={onSubmit} className="bg-second text-light">
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
