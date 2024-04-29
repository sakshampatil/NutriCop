"use client";
import React, { Fragment, Key, useCallback, useEffect, useState, useMemo } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import {
  useGetIngredientsPaginatedListQuery,
  useDeleteIngredientMutation,
} from "@/store/services/ingredients";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { FaPlus } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { GrAscend, GrDescend } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";

import { Pagination, PaginationItem, PaginationCursor } from "@nextui-org/pagination";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";

const headers = [
  { name: "Name", uid: "name" },
  { name: "Proteins", uid: "proteins" },
  { name: "Calories", uid: "calories" },
  { name: "Unit", uid: "unit" },
  { name: "Per-Unit", uid: "perUnit" },
  { name: "Action", uid: "action" },
];

const sortByArr = [
  { value: "name", label: "Name" },
  { value: "proteins", label: "Proteins" },
  { value: "calories", label: "Calories" },
];

const IngredientsPage = () => {
  const session = useSession();

  const [searchVal, setSearchVal] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState(new Set(["name"]));
  const [desc, setDesc] = useState<boolean>(false);
  const [rowsPerPage, setRowsPerPage] = useState<number>(2);

  const { data, error, isLoading, refetch } = useGetIngredientsPaginatedListQuery(
    { name: searchVal, page: page, pageSize: rowsPerPage, sortBy: sortBy, desc: desc },
    { refetchOnMountOrArgChange: true }
  );

  const [deleteItem, { isSuccess: isDeleteSuccess }] = useDeleteIngredientMutation();

  useEffect(() => {
    if (isDeleteSuccess) {
      refetch();
    }
  }, [isDeleteSuccess]);

  const onSearchChange = useCallback((val: string) => {
    if (val) {
      setSearchVal(val);
      setPage(1);
    } else {
      setSearchVal("");
    }
  }, []);

  const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onClear = useCallback(() => {
    setSearchVal("");
    setPage(1);
  }, []);

  return (
    <Fragment>
      {/* heading */}
      <h1 className="text-5xl font-semibold">Ingredients</h1>
      <div className="flex justify-center items-center gap-16 mt-5">
        {/* search */}
        <Input
          isClearable
          variant="bordered"
          className="w-full sm:max-w-[44%] text-white "
          placeholder="Search by name..."
          startContent={<IoSearchOutline className="font-extrabold" />}
          value={searchVal}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        {/* sort */}
        <div className="flex gap-2 justify-center items-center">
          <Select
            labelPlacement="outside-left"
            label="Sort By"
            className=" w-52"
            classNames={{
              listbox: "bg-black ",
              value: "text-white",
              popoverContent: "bg-black",
              mainWrapper: "",
              label: "text-white",
            }}
            selectedKeys={sortBy}
            selectionMode="single"
            variant="bordered"
            disallowEmptySelection={true}
            defaultSelectedKeys={"name"}
            onSelectionChange={(keys) => setSortBy(keys as Set<string>)}
          >
            {sortByArr.map((val) => (
              <SelectItem key={val.value} value={val.value}>
                {val.label}
              </SelectItem>
            ))}
          </Select>
          <button onClick={() => setDesc((prev) => !prev)} className="text-lg">
            {desc ? <GrDescend /> : <GrAscend />}
          </button>
        </div>
        {/* add new  */}
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
      <div className="mt-6">
        <Table
          aria-label="Rows per Page dropdown"
          classNames={{ table: "bg-black", wrapper: "bg-black" }}
          topContent={
            <label className="flex justify-end items-center text-default-400 text-small">
              Rows per page:
              <select
                className="bg-light-black border-0 rounded-lg outline-none text-default-400 text-small dark"
                onChange={onRowsPerPageChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </label>
          }
          bottomContent={
            <div className="flex justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                classNames={{
                  base: "",
                  cursor: " ",
                  item: "bg-black text-white ",
                  next: "bg-black text-white ",
                  prev: "bg-black text-white",
                }}
                color="default"
                page={page}
                total={data?.data?.totalPages}
                onChange={setPage}
              />
            </div>
          }
        >
          <TableHeader>
            {headers.map((column) => (
              <TableColumn className="text-center" key={column.uid}>
                {column.name}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody emptyContent={"No rows to display."}>
            {data?.data?.ingredients.map((row: any) => (
              <TableRow key={row.id}>
                <TableCell className="text-center">{row.name}</TableCell>
                <TableCell className="text-center">{row.proteins}</TableCell>
                <TableCell className="text-center">{row.calories}</TableCell>
                <TableCell className="text-center">{row.unit ? row.unit : "-"}</TableCell>
                <TableCell className="text-center">{row.perUnit ? row.perUnit : "-"}</TableCell>
                <TableCell className="flex justify-center text-red-500">
                  <span onClick={() => deleteItem(row.id)} className="cursor-pointer">
                    <RiDeleteBin5Line />
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Fragment>
  );
};

export default IngredientsPage;
