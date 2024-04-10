"use client";
import { useEffect } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateIngredientMutation } from "@/store/services/ingredients";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { IIngredient } from "@/types/ingredientTypes";

const AddIngredientsPage = () => {
  const [createIngredient, { isError, isSuccess }] = useCreateIngredientMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Ingredient added succesfully", {
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IIngredient>();

  const onSubmit: SubmitHandler<IIngredient> = (data) => {
    data.calories = Number(data.calories);
    data.proteins = Number(data.proteins);
    if (data?.perUnit) data.perUnit = Number(data.perUnit);

    createIngredient(data);
    reset();
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-fit flex justify-center items-center">
        <form className="flex flex-col gap-3  " onSubmit={handleSubmit(onSubmit)}>
          <h2 className="font-bold text-3xl">Add Ingredients</h2>

          <div>
            <Input
              isRequired
              classNames={{ label: "text-white" }}
              className="text-white"
              label="Name"
              variant="bordered"
              isInvalid={errors.name ? true : false}
              {...register("name", { required: true })}
            />
          </div>

          <div className="flex gap-2">
            <Input
              classNames={{ label: "text-white" }}
              className="text-white"
              label="Unit"
              variant="bordered"
              isInvalid={errors.unit ? true : false}
              {...register("unit")}
            />
            <Input
              type="number"
              classNames={{ label: "text-white" }}
              className="text-white"
              label="Per-Unit"
              variant="bordered"
              isInvalid={errors.perUnit ? true : false}
              {...(register("perUnit"), { min: 1 })}
            />
          </div>
          <div className="flex gap-2">
            <Input
              isRequired
              type="number"
              classNames={{ label: "text-white" }}
              className="text-white"
              label="Proteins"
              variant="bordered"
              isInvalid={errors.proteins ? true : false}
              {...register("proteins", { required: true, min: 1 })}
            />
            <Input
              isRequired
              type="number"
              classNames={{ label: "text-white" }}
              className="text-white"
              label="Calories"
              variant="bordered"
              isInvalid={errors.calories ? true : false}
              {...register("calories", { required: true, min: 1 })}
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

export default AddIngredientsPage;
