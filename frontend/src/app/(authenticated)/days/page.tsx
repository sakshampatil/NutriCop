"use client";
import { useGetDaysListQuery } from "@/store/services/days";
import React, { Fragment, useState } from "react";
import cn from "classnames";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { useGetUserQuery } from "@/store/services/auth";
import { FaRegFaceMeh, FaRegFaceSmileBeam, FaRegFaceTired } from "react-icons/fa6";
import { RxQuestionMarkCircled } from "react-icons/rx";

const DaysPage = () => {
  const { data: user } = useGetUserQuery({});

  const {
    data: days,
    error: dayError,
    isLoading: dayIsLoading,
    refetch: dayRefetch,
  } = useGetDaysListQuery();

  const [today, setToday] = useState(new Date().getDay());

  const emojiCalculator = (calorie: number, protein: number) => {
    const proteinTarget: any = user?.data?.targetProteins;
    const calorieTarget: any = user?.data?.targetCalories;

    if (calorie === 0 || protein === 0) {
      return (
        <span className="text-gray-500 ">
          <RxQuestionMarkCircled />
        </span>
      );
    }

    let proteinVal = (protein / proteinTarget) * 100;
    let caloriesVal = (calorie / calorieTarget) * 100;

    if (proteinVal < 50 || caloriesVal < 50) {
      return (
        <span className="text-red-500 ">
          <FaRegFaceTired />
        </span>
      );
    } else if ((calorie >= 50 && calorie < 80) || (protein >= 50 && calorie < 80)) {
      return (
        <span className="text-yellow-500 ">
          <FaRegFaceMeh />
        </span>
      );
    } else {
      return (
        <span className="text-green-500 ">
          <FaRegFaceSmileBeam />
        </span>
      );
    }
  };

  return (
    <Fragment>
      <h1 className="text-5xl font-semibold">Week</h1>
      {/* days  */}
      <div className="    ">
        <div className="flex mt-36 justify-evenly">
          {days?.data?.map((day: IDay, index: number) => (
            <Card
              className={cn({
                "w-32 h-full": true,
                "border-2": (today - 1 === -1 ? 6 : today - 1) === index ? true : false,
              })}
            >
              <CardHeader className="flex gap-3  justify-center">
                <span
                  className={cn({
                    "text-lg font-semibold": true,
                    "text-gray-500": day.totalCalories === 0 || day.totalProteins === 0,
                  })}
                >
                  {day.day}
                </span>
              </CardHeader>

              <CardBody>
                <div className="flex flex-col items-center">
                  <label className="text-medium text-gray-500 font-medium">Total</label>
                  <div className="bg-black px-2 py-2 rounded-xl">
                    <div className="flex flex-col  items-center">
                      <span
                        className={cn({
                          "text-sm font-medium": true,
                          "text-gray-500": day.totalProteins === 0,
                        })}
                      >
                        Proteins:
                      </span>
                      <span
                        className={cn({
                          "text-lg font-semibold": true,
                          "text-gray-500": day.totalProteins === 0,
                        })}
                      >
                        {day.totalProteins}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span
                        className={cn({
                          "text-sm font-medium": true,
                          "text-gray-500": day.totalCalories === 0,
                        })}
                      >
                        Calories:
                      </span>
                      <span
                        className={cn({
                          "text-lg font-semibold": true,
                          "text-gray-500": day.totalCalories === 0,
                        })}
                      >
                        {day.totalCalories}
                      </span>
                    </div>
                  </div>
                </div>
              </CardBody>

              <CardFooter className="flex justify-center text-2xl">
                {emojiCalculator(day.totalCalories, day.totalProteins)}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default DaysPage;
