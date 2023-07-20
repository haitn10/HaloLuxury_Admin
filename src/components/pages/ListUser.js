import { MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { getAllStores, getAllUsers } from "../../api";
import { useMemo } from "react";
import Pagination from "../common/Pagination";

const HEADER_USERS_LIST = [
  "Full Name",
  "Email Address",
  "Phone Number",
  "Action",
];

const HEADER_STORE_LIST = [
  "Avatar",
  "Store Name",
  "Email Address",
  "Staff Name",
  "Action",
];

let PageSize = 10;

const ListUser = ({ data, title }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [allStores, setAllStores] = useState([]);
  const [headerList, setHeaderList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (data === "staffs") {
      setHeaderList(HEADER_STORE_LIST);
      async function getUserList() {
        setAllStores(await getAllStores());
      }
      getUserList();
    } else if (data === "users") {
      setHeaderList(HEADER_USERS_LIST);
      async function getUserList() {
        setAllUsers(await getAllUsers());
      }
      getUserList();
    }
  }, [data]);

  const currentTableUserData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return allUsers.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, allUsers]);

  const currentTableStoreData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return allStores.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, allStores]);

  return (
    <div className="m-10 w-full">
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              {/* <Typography variant="h5" color="blue-gray"""></Typography> */}
            </div>
            <div className="flex w-full shrink-0 gap-5 md:w-max items-center">
              <div className="w-full md:w-72 mt-1">
                <Input
                  label="Search..."
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>

              {data === "staffs" ? (
                <Button
                  className="text-light bg-second rounded-xl h-10"
                  // onClick={() => setOpen(!open)}
                >
                  Create New
                </Button>
              ) : null}
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-y-auto px-0">
          <table className="w-full table-auto text-center">
            <thead>
              <tr>
                {headerList.map((head) => (
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
              {data === "staffs"
                ? allStores &&
                  currentTableStoreData.map((product) => (
                    <tr key={product.id}>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex items-center gap-3 justify-center">
                          <Avatar
                            src={product.image}
                            alt={product.name}
                            size="lg"
                            className="border border-blue-gray-50 object-contain p-1"
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
                          {product.email}
                        </Typography>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {product.id}
                        </Typography>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50 pl-7">
                        <IconButton
                          variant="text"
                          color="blue-gray"
                          className="bg-red text-light mr-3 mb-1"
                          // onClick={() => onDelete(product.id)}
                        >
                          <TrashIcon className="h-5 w-5" />
                        </IconButton>
                      </td>
                    </tr>
                  ))
                : allUsers &&
                  currentTableUserData.map((product) => (
                    <tr key={product.id}>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-left ml-4 capitalize"
                        >
                          {product.firstName + " " + product.lastName}
                        </Typography>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-left"
                        >
                          {product.email}
                        </Typography>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        {product.phone}
                      </td>
                      <td className="p-4 border-b border-blue-gray-50 pl-7">
                        <IconButton
                          variant="text"
                          color="blue-gray"
                          className="bg-red text-light mr-3 mb-1"
                          // onClick={() => onDelete(product.id)}
                        >
                          <TrashIcon className="h-5 w-5" />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>

          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={data === "staffs" ? allStores.length : allUsers.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default ListUser;
