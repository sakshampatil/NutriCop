"use client";
import { Key, useEffect, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateRecipeMutation } from "@/store/services/recipes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RiDeleteBin5Line } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";

import { Autocomplete, AutocompleteSection, AutocompleteItem } from "@nextui-org/autocomplete";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { IRecipe } from "@/types/recipeTypes";
import { useGetIngredientsListQuery } from "@/store/services/ingredients";

const headers = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "qty",
    label: "Qty",
  },
  {
    key: "action",
    label: "Action",
  },
];

type IngredientsArray = {
  id: number;
  name: string;
  qty: number;
};

const AddRecipesPage = () => {
  const { data, error, isLoading } = useGetIngredientsListQuery(
    { name: "" },
    { refetchOnMountOrArgChange: true }
  );

  const [createRecipe, { isError, isSuccess }] = useCreateRecipeMutation();
  const [selectedKey, setSelectedKey] = useState<Key | null>(null);
  const [selectedVal, setSelectedVal] = useState<string>("");
  const [qtyVal, setQtyVal] = useState<number>(0);
  const [ingredientsArray, setIngredientsArray] = useState<IngredientsArray[]>([]);
  const [totalProteins, setTotalProteins] = useState<number>(0);
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (isSuccess) {
      toast.success("Recipe added succesfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [isSuccess]);

  const addIngredient = () => {
    if (selectedKey === null || qtyVal === 0) {
      toast.error("Invalid Input!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    let body = {
      id: Number(selectedKey),
      name: selectedVal!,
      qty: qtyVal,
    };
    let flag = false;
    setIngredientsArray((prev) =>
      prev.map((ele) => {
        if (ele.id === body.id) {
          flag = true;
          return { ...ele, qty: ele.qty + body.qty };
        } else {
          return ele;
        }
      })
    );

    if (flag === false) {
      setIngredientsArray((prev) => [...prev, body]);
    }
    data?.data?.ingredients.forEach((ele: any) => {
      if (ele.id === body.id) {
        setTotalCalories((prev) => prev + ele.calories * body.qty);
        setTotalProteins((prev) => prev + ele.proteins * body.qty);
      }
    });
    setSelectedVal("");
    setSelectedKey(null);
    setQtyVal(0);
  };

  const deleteIngredient = (id: number, qty: number) => {
    setIngredientsArray((prev) => prev.filter((ele) => ele.id !== id));
    data?.data?.ingredients.forEach((ele: any) => {
      if (ele.id === id) {
        setTotalCalories((prev) => prev - ele.calories * qty);
        setTotalProteins((prev) => prev - ele.proteins * qty);
      }
    });
  };
  const onSelectionChange = (key: any) => {
    console.log("KEY = ", key);
    setSelectedKey(key);
    // setSelectedVal(key);
  };
  const onInputChange = (value: string) => {
    console.log("VALUE = ", value);
    setSelectedVal(value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (name === "") {
      toast.error("Name is required", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    if (totalProteins <= 0 || totalCalories <= 0) {
      toast.error("Invalid Input!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    let modifiedArray = ingredientsArray.map((ele) => {
      return {
        id: ele.id,
        qty: ele.qty,
      };
    });

    let body = {
      name: name,
      ingredients: modifiedArray,
      proteins: totalProteins,
      calories: totalCalories,
    };
    createRecipe(body);
    setName("");
    setSelectedKey(null);
    setSelectedVal("");
    setQtyVal(0);
    setIngredientsArray([]);
    setTotalCalories(0);
    setTotalProteins(0);
  };

  return (
    <div className="mt-16 flex justify-center items-center">
      <div className="w-fit flex justify-center items-center">
        <form className="flex flex-col gap-3  " onSubmit={handleSubmit}>
          <h2 className="font-bold text-3xl">Add Recipe</h2>

          <div>
            <Input
              classNames={{ label: "text-white" }}
              className="text-white"
              label="Name"
              variant="bordered"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            {data?.data?.ingredients && (
              <Autocomplete
                aria-label="ingredients list"
                defaultItems={data?.data?.ingredients}
                placeholder="Search an ingredient"
                className="max-w-xs"
                variant="bordered"
                inputValue={selectedVal}
                onSelectionChange={(key) => onSelectionChange(key)}
                onInputChange={onInputChange}
                classNames={{ popoverContent: "bg-black", selectorButton: "text-white" }}
              >
                {(ele: any) => <AutocompleteItem key={ele.id}>{ele.name}</AutocompleteItem>}
              </Autocomplete>
            )}
            <Input
              type="number"
              classNames={{ label: "text-white" }}
              className="text-white"
              label="Qty:"
              labelPlacement="outside-left"
              variant="bordered"
              value={qtyVal.toString()}
              onValueChange={(val) => setQtyVal(parseInt(val))}
            />
            <Button onClick={addIngredient} color="primary">
              <span className="text-xl">
                <IoMdAdd />
              </span>
            </Button>
          </div>

          <div>
            <Table
              aria-label="Add Recipes Ingredients Table"
              classNames={{ table: "bg-black", wrapper: "bg-black" }}
            >
              <TableHeader columns={headers}>
                {(column) => (
                  <TableColumn className="text-center" key={column.key}>
                    {column.label}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody emptyContent={"No rows to display."}>
                {ingredientsArray.map((row: any) => (
                  <TableRow key={row.id}>
                    <TableCell className="text-center">{row.name}</TableCell>
                    <TableCell className="text-center">{row.qty}</TableCell>
                    <TableCell className="flex justify-center text-red-500">
                      <span
                        onClick={() => deleteIngredient(row.id, row.qty)}
                        className="cursor-pointer"
                      >
                        <RiDeleteBin5Line />
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex gap-2">
            <Input
              type="number"
              classNames={{ label: "text-white  text-md" }}
              className=""
              label="Proteins:"
              labelPlacement="outside-left"
              variant="bordered"
              value={totalProteins.toString()}
              onChange={(e) => setTotalProteins(Number(e.target.value))}
            />
            <Input
              type="number"
              classNames={{ label: "text-white" }}
              className="text-white"
              label="Calories:"
              labelPlacement="outside-left"
              variant="bordered"
              value={totalCalories.toString()}
              onChange={(e) => setTotalCalories(Number(e.target.value))}
            />
          </div>

          <div className="flex justify-center">
            <Button type="submit" className="bg-blue-600 text-white text-lg px-6 py-4 w-fit">
              Submit
            </Button>
          </div>
          {/* <Input type="submit" /> */}
        </form>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </div>
  );
};

export default AddRecipesPage;
