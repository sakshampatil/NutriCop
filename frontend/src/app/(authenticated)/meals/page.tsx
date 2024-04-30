"use client";
import React, { Fragment, Key, useEffect, useState } from "react";
import {
  useCreateMealMutation,
  useDeleteMealMutation,
  useGetMealsListQuery,
} from "@/store/services/meals";
import { useGetRecipesListQuery } from "@/store/services/recipes";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

import { IoMdAdd } from "react-icons/io";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "@nextui-org/input";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { RiDeleteBin5Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

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

const recipesHeaders = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "qty",
    label: "Qty",
  },
];

type RecipesArray = {
  id: number;
  name: string;
  qty: number;
};

const MealsPage = () => {
  const [createMeal, { isError, isSuccess }] = useCreateMealMutation();
  const { data, error, isLoading } = useGetRecipesListQuery(
    { name: "" },
    { refetchOnMountOrArgChange: true }
  );

  const {
    data: mealsListData,
    error: mealsListError,
    isLoading: mealsListIsLoading,
    refetch,
  } = useGetMealsListQuery({});
  const [deleteMeal, { isSuccess: isDeleteSuccess }] = useDeleteMealMutation();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    isOpen: isCardOpen,
    onOpen: onCardOpen,
    onOpenChange: onCardOpenChange,
  } = useDisclosure();

  const [selectedKey, setSelectedKey] = useState<Key | null>(null);
  const [selectedVal, setSelectedVal] = useState<string>("");
  const [qtyVal, setQtyVal] = useState<number>(0);
  const [recipesArray, setRecipesArray] = useState<RecipesArray[]>([]);
  const [totalProteins, setTotalProteins] = useState<number>(0);
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [addMealData, setAddMealData] = useState<{ time: string; count: number }>({
    time: "morning",
    count: 0,
  });
  const [card, setCard] = useState<any | null>(null);

  useEffect(() => {
    if (isDeleteSuccess) {
      refetch();
      toast.error("Meal deleted succesfully", {
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
  }, [isDeleteSuccess]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Meal added succesfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      refetch();
    }
  }, [isSuccess]);

  const onSelectionChange = (key: any) => {
    setSelectedKey(key);
    // setSelectedVal(key);
  };
  const onInputChange = (value: string) => {
    setSelectedVal(value);
  };

  const addRecipe = () => {
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
    setRecipesArray((prev) =>
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
      setRecipesArray((prev) => [...prev, body]);
    }
    data?.data?.recipes.forEach((ele: any) => {
      if (ele.id === body.id) {
        setTotalCalories((prev) => prev + ele.calories * body.qty);
        setTotalProteins((prev) => prev + ele.proteins * body.qty);
      }
    });
    setSelectedVal("");
    setSelectedKey(null);
    setQtyVal(0);
  };

  const deleteRecipe = (id: number, qty: number) => {
    setRecipesArray((prev) => prev.filter((ele) => ele.id !== id));
    data?.data?.recipes.forEach((ele: any) => {
      if (ele.id === id) {
        setTotalCalories((prev) => prev - ele.calories * qty);
        setTotalProteins((prev) => prev - ele.proteins * qty);
      }
    });
  };

  const onCreateMeal = () => {
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

    let body = {
      mealNo: addMealData.count,
      recipes: recipesArray,
      proteins: totalProteins,
      calories: totalCalories,
      time: addMealData.time,
    };
    createMeal(body);
    setSelectedKey(null);
    setSelectedVal("");
    setQtyVal(0);
    setRecipesArray([]);
    setTotalCalories(0);
    setTotalProteins(0);
    onClose();
  };

  const onModalOpen = (time: string) => {
    const count = mealsListData?.data?.meals[time.toLowerCase()].length
      ? mealsListData?.data?.meals[time.toLowerCase()].length + 1
      : 1;
    setAddMealData({ time: time, count: count });
    onOpen();
  };

  const onCardClick = (card: any) => {
    setCard(card);
    onCardOpen();
  };

  return (
    <Fragment>
      <h1 className="text-5xl font-semibold">Meals</h1>
      <div className="mt-2">
        {/* morning */}
        <label className="text-xl font-medium">Morning:</label>
        <section className="flex gap-2 mt-1">
          {/* meal card  */}
          {mealsListData?.data?.meals?.morning?.map((ele: any) => {
            return (
              <Card
                shadow="sm"
                key={ele.mealNo}
                isPressable
                onPress={() => console.log("item pressed")}
              >
                <CardBody className="overflow-visible flex flex-col justify-between px-6 py-2">
                  <div className="flex flex-col items-center">
                    <span
                      onClick={() => deleteMeal(ele.id)}
                      className="absolute top-1 right-1 text-red-500 text-lg hover:bg-light-black p-1 rounded-full"
                    >
                      <RxCross2 />
                    </span>
                    <label className="font-medium">Meal No</label>
                    <span className="text-lg">{ele.mealNo}</span>
                  </div>
                  {/* proteins  */}
                  <div>
                    <div>
                      <label className="font-medium">Proteins:</label>
                      <span>{ele.proteins}</span>
                    </div>
                    {/* calories  */}
                    <div>
                      <label className="font-medium">Calories:</label>
                      <span>{ele.calories}</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}

          <div
            onClick={() => onModalOpen("Morning")}
            className="cursor-pointer border-dashed border-2 w-fit px-12  py-16  text-2xl"
          >
            <IoMdAdd />
          </div>
        </section>
        <hr className="mt-2 mb-2" />
        {/* afternoon */}
        <label className="text-xl font-medium">Afternoon:</label>
        <section className="flex gap-2 mt-1">
          {mealsListData?.data?.meals?.afternoon?.map((ele: any) => {
            return (
              <Card shadow="sm" key={ele.mealNo} isPressable onPress={() => onCardClick(ele)}>
                <CardBody className="overflow-visible flex flex-col justify-between px-6 py-2">
                  <div className="flex flex-col items-center">
                    <span
                      onClick={() => deleteMeal(ele.id)}
                      className="absolute top-1 right-1 text-red-500 text-lg hover:bg-light-black p-1 rounded-full"
                    >
                      <RxCross2 />
                    </span>
                    <label className="font-medium">Meal No</label>
                    <span className="text-lg">{ele.mealNo}</span>
                  </div>
                  {/* proteins  */}
                  <div>
                    <div>
                      <label className="font-medium">Proteins:</label>
                      <span>{ele.proteins}</span>
                    </div>
                    {/* calories  */}
                    <div>
                      <label className="font-medium">Calories:</label>
                      <span>{ele.calories}</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}
          <div
            onClick={() => onModalOpen("Afternoon")}
            className="cursor-pointer border-dashed border-2 w-fit px-12  py-16  text-2xl"
          >
            <IoMdAdd />
          </div>
        </section>
        <hr className="mt-2 mb-2" />
        {/* evening */}
        <label className="text-xl font-medium">Evening:</label>
        <section className="flex gap-2 mt-1">
          {mealsListData?.data?.meals?.evening?.map((ele: any) => {
            return (
              <Card
                shadow="sm"
                key={ele.mealNo}
                isPressable
                onPress={() => console.log("item pressed")}
              >
                <CardBody className="overflow-visible flex flex-col justify-between px-6 py-2">
                  <div className="flex flex-col items-center">
                    <span
                      onClick={() => deleteMeal(ele.id)}
                      className="absolute top-1 right-1 text-red-500 text-lg hover:bg-light-black p-1 rounded-full"
                    >
                      <RxCross2 />
                    </span>
                    <label className="font-medium">Meal No</label>
                    <span className="text-lg">{ele.mealNo}</span>
                  </div>
                  {/* proteins  */}
                  <div>
                    <div>
                      <label className="font-medium">Proteins:</label>
                      <span>{ele.proteins}</span>
                    </div>
                    {/* calories  */}
                    <div>
                      <label className="font-medium">Calories:</label>
                      <span>{ele.calories}</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}
          <div
            onClick={() => onModalOpen("Evening")}
            className="cursor-pointer border-dashed border-2 w-fit px-12  py-16  text-2xl"
          >
            <IoMdAdd />
          </div>
        </section>
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
      <Modal size="2xl" className="dark" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create Meal</ModalHeader>
              <ModalBody>
                <div className="flex justify-between">
                  <div className="flex gap-1">
                    <label className="font-semibold">Meal No:</label>
                    <span>{addMealData.count}</span>
                  </div>
                  <div className="flex gap-1">
                    <label className="font-semibold">Time:</label>
                    <span>{addMealData.time}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {data?.data?.recipes && (
                    <Autocomplete
                      aria-label="recipes list"
                      defaultItems={data?.data?.recipes}
                      placeholder="Search an Recipe"
                      className="max-w-xs"
                      variant="bordered"
                      menuTrigger="input"
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
                  <Button onClick={addRecipe} color="primary">
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
                      {recipesArray.map((row: any) => (
                        <TableRow key={row.id}>
                          <TableCell className="text-center">{row.name}</TableCell>
                          <TableCell className="text-center">{row.qty}</TableCell>
                          <TableCell className="flex justify-center text-red-500">
                            <span
                              onClick={() => deleteRecipe(row.id, row.qty)}
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
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onCreateMeal}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {card !== null && (
        <Modal className="dark" isOpen={isCardOpen} onOpenChange={onCardOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className=" flex flex-col gap-1">Meal No:{card?.mealNo}</ModalHeader>
                <ModalBody>
                  <Table
                    aria-label="Add Recipes Ingredients Table"
                    classNames={{ table: "bg-black", wrapper: "bg-black" }}
                  >
                    <TableHeader columns={recipesHeaders}>
                      {(column) => (
                        <TableColumn className="text-center" key={column.key}>
                          {column.label}
                        </TableColumn>
                      )}
                    </TableHeader>
                    <TableBody emptyContent={"No rows to display."}>
                      {card?.recipes?.map((row: any) => (
                        <TableRow key={row.id}>
                          <TableCell className="text-center">{row.name}</TableCell>
                          <TableCell className="text-center">{row.qty}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className=" flex justify-center gap-5">
                    <div>
                      <span className="mr-1 font-semibold">Proteins:</span>
                      <span>{card.proteins}</span>
                    </div>
                    <div>
                      <span className="mr-1 font-semibold">Calories:</span>
                      <span>{card.calories}</span>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </Fragment>
  );
};

export default MealsPage;
