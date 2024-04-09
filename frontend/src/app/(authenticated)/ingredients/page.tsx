"use client";
import React, { Fragment, useEffect } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { useGetIngredientsListQuery } from "@/store/services/ingredients";
import { useSession } from "next-auth/react";

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

      {/* <Autocomplete>

      </Autocomplete> */}
    </Fragment>
  );
};

export default Ingredients;
