"use client";
import React, { Fragment, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Slider } from "@nextui-org/slider";

import { FaRegFaceSmileBeam, FaRegFaceTired, FaRegFaceMeh } from "react-icons/fa6";
import { Input } from "@nextui-org/input";
import { ITarget } from "@/types/authTypes";
import { useGetUserQuery, useUpdatetargetMutation } from "@/store/services/auth";
import { useGetDayQuery } from "@/store/services/days";

enum sliderColor {
  Foreground = "foreground",
  Primary = "primary",
  Secondary = "secondary",
  Success = "success",
  Warning = "warning",
  Danger = "danger",
}

const DashoardPage = () => {
  const { data: user, error, isLoading, refetch } = useGetUserQuery({});
  const {
    data: day,
    error: dayError,
    isLoading: dayIsLoading,
    refetch: dayRefetch,
  } = useGetDayQuery();
  const [updateTarget, { isError, isSuccess }] = useUpdatetargetMutation();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [proteinColor, setProteinColor] = useState<sliderColor>(sliderColor.Foreground);
  const [calorieColor, setCalorieColor] = useState<sliderColor>(sliderColor.Foreground);

  useEffect(() => {
    if (user?.data?.targetCalories === null || user?.data?.targetProteins === null) {
      onOpen();
    }
    console.log("USER ===", user?.data);
  }, [user]);

  useEffect(() => {
    if (day?.data && user?.data) {
      let proteins: number = day?.data.totalProteins;
      let proteinVal: number = (proteins / user?.data?.targetProteins) * 100;
      if (proteinVal < 50) {
        setProteinColor(sliderColor.Danger);
      } else if (proteinVal >= 50 && proteinVal < 80) {
        setProteinColor(sliderColor.Warning);
      } else {
        setProteinColor(sliderColor.Success);
      }

      let calories = day?.data.totalCalories;
      let caloriesVal = (calories / user?.data?.targetCalories) * 100;
      if (caloriesVal < 50) {
        setCalorieColor(sliderColor.Danger);
      } else if (caloriesVal >= 50 && caloriesVal < 80) {
        setCalorieColor(sliderColor.Warning);
      } else {
        setCalorieColor(sliderColor.Success);
      }
    }
  }, [day, user]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Target updated succesfully", {
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
      onClose();
    }
  }, [isSuccess]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ITarget>();

  const onSubmit: SubmitHandler<ITarget> = (data) => {
    updateTarget(data);
    reset();
  };

  return (
    <Fragment>
      <div className="mt-16 flex justify-center items-center">
        <Card className="max-w-[400px]">
          <CardHeader className="flex justify-center gap-3 text-5xl">
            {proteinColor === sliderColor.Success && calorieColor === sliderColor.Success ? (
              <span className="text-green-500 ">
                <FaRegFaceSmileBeam />
              </span>
            ) : proteinColor === sliderColor.Danger || calorieColor === sliderColor.Danger ? (
              <span className="text-red-500 ">
                <FaRegFaceTired />
              </span>
            ) : (
              <span className="text-yellow-500 ">
                <FaRegFaceMeh />
              </span>
            )}
          </CardHeader>

          <CardBody className="flex flex-col gap-4">
            {/* proteins slider  */}
            <div>
              <div className="flex gap-40">
                <span>Target Proteins:</span>
                <span>{`${day?.data?.totalProteins}/${user?.data?.targetProteins}`}</span>
              </div>
              <Slider
                isDisabled
                color={proteinColor}
                maxValue={user?.data?.targetProteins}
                value={day?.data?.totalProteins}
                className="max-w-md"
                classNames={{ label: "text-white" }}
              />
            </div>
            {/* calories sider  */}
            <div>
              <div className="flex gap-40">
                <span>Target Calories:</span>
                <span>{`${day?.data?.totalCalories}/${user?.data?.targetCalories}`}</span>
              </div>
              <Slider
                isDisabled
                color={calorieColor}
                maxValue={user?.data?.targetCalories}
                value={day?.data?.totalCalories}
                className="max-w-md"
                classNames={{ label: "text-white" }}
              />
            </div>
          </CardBody>
          <CardFooter className="flex justify-center">
            <Button onPress={onOpen}>Update Target</Button>
          </CardFooter>
        </Card>
      </div>
      <Modal className="dark" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center">Update Target</ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-3  " onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-4">
                    <Input
                      isRequired
                      type="number"
                      classNames={{ label: "text-white" }}
                      className="text-white"
                      label="Target Proteins"
                      variant="bordered"
                      isInvalid={errors.targetProteins ? true : false}
                      {...register("targetProteins", { required: true, min: 1 })}
                    />
                    <Input
                      isRequired
                      type="number"
                      classNames={{ label: "text-white" }}
                      className="text-white"
                      label="Target Calories"
                      variant="bordered"
                      isInvalid={errors.targetCalories ? true : false}
                      {...register("targetCalories", { required: true, min: 1 })}
                    />
                  </div>

                  <div className="flex justify-center mb-2">
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button type="submit" color="primary" className=" text-white  px-6 py-4 w-fit">
                      Submit
                    </Button>
                  </div>
                  {/* <Input type="submit" /> */}
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
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
    </Fragment>
  );
};

export default DashoardPage;
