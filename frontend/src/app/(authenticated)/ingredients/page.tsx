"use client";
import React, { Fragment, Key, useCallback, useEffect, useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { useGetIngredientsListQuery } from "@/store/services/ingredients";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { FaPlus } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";

const headers = [
  { name: "Name", uid: "name", sortable: true },
  { name: "Proteins", uid: "proteins", sortable: true },
  { name: "Calories", uid: "calories", sortable: true },
  { name: "Unit", uid: "unit" },
  { name: "Per-Unit", uid: "perUnit" },
];

const IngredientsPage = () => {
  const session = useSession();
  const { data: item, error, isLoading, refetch } = useGetIngredientsListQuery("");

  const [searchVal, setSearchVal] = useState<string>();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    if (session.data?.user.accessToken) {
      localStorage.setItem("token", session.data.user.accessToken);
      refetch();
    }
  }, [session.data?.user.accessToken]);
  {
    console.log("dat = ", item);
  }

  const onSearchChange = useCallback((val: string) => {
    if (val) {
      setSearchVal(val);
      setPage(1);
    } else {
      setSearchVal("");
    }
  }, []);

  const onClear = useCallback(() => {
    setSearchVal("");
    setPage(1);
  }, []);

  const renderCell = useCallback((item: any, columnKey: Key) => {
    switch (columnKey) {
      case "name":
        return <span>{item.name}</span>;
      case "proteins":
        return <span>{item.proteins}</span>;
      case "calories":
        return <span>{item.calories}</span>;
      case "unit":
        return <span>{item.unit === null ? "-" : item.unit}</span>;
      case "perUnit":
        return <span>{item.perUnit === null ? "-" : item.perUnit}</span>;
      default:
        return <span>Something went wrong!</span>;
    }
  }, []);

  return (
    <Fragment>
      {/* heading */}
      <h1 className="text-5xl font-semibold">Ingredients</h1>
      <div className="flex justify-center items-center gap-16 mt-5">
        <Input
          isClearable
          variant="bordered"
          className="w-full sm:max-w-[44%] text-white"
          placeholder="Search by name..."
          startContent={<IoSearchOutline className="font-extrabold" />}
          value={searchVal}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <Button color="primary">
          <Link
            className="flex items-center justify-center gap-1"
            href={"/ingredients/addIngredients"}
          >
            <span>Add Ingredient</span>
            <span>
              <FaPlus />
            </span>
          </Link>
        </Button>
      </div>
      {/* table  */}
      <div>
        {/* <Table
          aria-label="Example table with custom cells, pagination and sorting"
          isHeaderSticky
          // bottomContent={bottomContent}
          // bottomContentPlacement="outside"
          classNames={{
            wrapper: "max-h-[382px]",
          }}
          // selectedKeys={selectedKeys}
          // selectionMode="multiple"
          // sortDescriptor={sortDescriptor}
          // onSelectionChange={setSelectedKeys}
          // onSortChange={setSortDescriptor}
        >
          <TableHeader columns={headers}>
            {(column) => (
              <TableColumn key={column.uid} allowsSorting={column.sortable}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No Ingredients found"}>
            {(item: any) => (
              <TableRow key={item.id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table> */}
      </div>
    </Fragment>
  );
};

export default IngredientsPage;
