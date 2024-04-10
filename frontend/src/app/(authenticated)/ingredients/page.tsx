"use client";
import React, { Fragment, useEffect } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { useGetIngredientsListQuery } from "@/store/services/ingredients";
import { useSession } from "next-auth/react";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export const animals = [
  { label: "Cat", value: "cat", description: "The second most popular pet in the world" },
  { label: "Dog", value: "dog", description: "The most popular pet in the world" },
  { label: "Elephant", value: "elephant", description: "The largest land animal" },
  { label: "Lion", value: "lion", description: "The king of the jungle" },
  { label: "Tiger", value: "tiger", description: "The largest cat species" },
  { label: "Giraffe", value: "giraffe", description: "The tallest land animal" },
];

const Ingredients = () => {
  const session = useSession();
  const { data, error, isLoading, refetch } = useGetIngredientsListQuery("");

  useEffect(() => {
    if (session.data?.user.accessToken) {
      localStorage.setItem("token", session.data.user.accessToken);
      refetch();
    }
  }, [session.data?.user.accessToken]);
  {
    console.log("dat = ", data);
  }

  return (
    <Fragment>
      {/* heading */}
      <h1 className="text-5xl font-semibold">Ingredients</h1>
      <div className="flex justify-center items-center gap-16">
        <Autocomplete
          defaultItems={animals}
          // label="Favorite Animal"
          placeholder="Search an animal"
          className="max-w-xs"
        >
          {(animal) => <AutocompleteItem key={animal.value}>{animal.label}</AutocompleteItem>}
        </Autocomplete>
        <Button>
          <Link href={"/ingredients/addIngredients"}>Add Ingredient</Link>
        </Button>
      </div>
    </Fragment>
  );
};

export default Ingredients;
