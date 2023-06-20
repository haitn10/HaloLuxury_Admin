import { Button, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment/moment";
import { getProduct, getTotals } from "../../api";

const Dashboard = () => {
  const [total, setTotal] = useState();
  const [listProduct, setListProduct] = useState();
  const state = useSelector((state) => state.auth);

  useEffect(() => {
    async function getData() {
      setTotal(await getTotals(state.profile.id));
      setListProduct(await getProduct(state.profile.id));
    }
    getData();
  }, [state.profile.id]);

  const onLogout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <div className="m-10 w-full">
      {listProduct && total ? (
        <>
          <div className="flex justify-between items-center">
            <Typography className="text-2xl font-bold">Dashboard</Typography>
            <div className="flex gap-5">
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
              <Typography className="font-bold text-2xl">
                Transactions
              </Typography>
              <div className="flex flex-col w-72 gap-6">
                <input
                  id="default-search"
                  className="h-10 p-5 outline-none border border-first rounded-xl"
                  placeholder="Tên khách hàng...."
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
                        <div className="font-semibold text-center">
                          Ngày bán
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-medium divide-y divide-second">
                    {listProduct.reverse().map((product) => (
                      <tr key={product.id}>
                        <td className="p-2">
                          <div className="flex items-center capitalize">
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
                            {moment(product.orderTime).format("DD/MM/YYYY")}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Dashboard;
