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
import Popup from "../common/Popup";
import CreateStore from "./CreateStore";

const HEADER_USERS_LIST = [
  "Full Name",
  "Email Address",
  "Phone Number",
  "City",
  "Action",
];

const HEADER_STORE_LIST = [
  "Store Name",
  "Email Address",
  "Phone Number",
  "Staff Name",
  "Action",
];

let PageSize = 10;

const ListUser = ({ data, title }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [allStores, setAllStores] = useState([]);
  const [headerList, setHeaderList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [storeId, setStoreId] = useState();
  const [text, setText] = useState();

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
  }, [data, openRegister, open]);

  const currentTableUserData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return allUsers
      .filter(
        (item) =>
          item.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
          item.lastName.toLowerCase().includes(searchText.toLowerCase())
      )
      .sort((a, b) => a.firstName.localeCompare(b.firstName))
      .slice(firstPageIndex, lastPageIndex);
  }, [currentPage, allUsers, searchText]);

  const currentTableStoreData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return allStores
      .filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      )
      .slice(firstPageIndex, lastPageIndex);
  }, [currentPage, allStores, searchText]);

  return (
    <>
      <Popup open={open} setOpen={setOpen} storeId={storeId} text={text} />;
      <CreateStore open={openRegister} setOpen={setOpenRegister} />
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
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>

                {data === "staffs" ? (
                  <Button
                    className="text-light bg-second rounded-xl h-10"
                    onClick={() => setOpenRegister(!openRegister)}
                  >
                    Create New
                  </Button>
                ) : null}
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-y-auto px-0">
            <table className="w-full table-auto">
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
                        className="font-normal leading-none opacity-70 text-left"
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
                    currentTableStoreData.map((store) => (
                      <tr
                        key={store.id}
                        className="hover:bg-blue-gray-50 cursor-pointer"
                      >
                        <td className="p-2 border-b border-blue-gray-50">
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={store.image}
                              alt={store.name}
                              size="lg"
                              className="border border-blue-gray-50 object-contain"
                            />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {store.name}
                            </Typography>
                          </div>
                        </td>
                        <td className="p-2 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal text-left"
                          >
                            {store.email}
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {store.phone}
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {store.users[0].userName}
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <IconButton
                            variant="text"
                            color="blue-gray"
                            className="bg-red hover:bg-second text-light mb-1"
                            onClick={() => {
                              setOpen(!open);
                              setStoreId(store.id);
                              setText(data);
                            }}
                          >
                            <TrashIcon className="h-5 w-5" />
                          </IconButton>
                        </td>
                      </tr>
                    ))
                  : allUsers &&
                    currentTableUserData.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-blue-gray-50 cursor-pointer"
                      >
                        <td className="p-2 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal text-left ml-2 capitalize"
                          >
                            {user.firstName + " " + user.lastName}
                          </Typography>
                        </td>
                        <td className="p-2 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal text-left ml-2"
                          >
                            {user.email}
                          </Typography>
                        </td>
                        <td className="p-2 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal text-left ml-2"
                          >
                            {user.addresses.length > 0
                              ? user.addresses[0].phone
                              : ""}
                          </Typography>
                        </td>
                        <td className="p-2 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal text-left ml-2"
                          >
                            {user.addresses.length > 0
                              ? user.addresses[0].city
                              : ""}
                          </Typography>
                        </td>
                        <td className="p-2 border-b border-blue-gray-50 pl-7 flex justify-start">
                          <IconButton
                            variant="text"
                            color="blue-gray"
                            className="bg-red hover:bg-second text-light mr-3 mb-1 "
                            onClick={() => {
                              setOpen(!open);
                              setStoreId(user.id);
                              setText(data);
                            }}
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
              totalCount={
                data === "staffs" ? allStores.length : allUsers.length
              }
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default ListUser;
