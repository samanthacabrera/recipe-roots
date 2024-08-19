import React, { useEffect, useState } from "react";
import Stories from "./Stories";
import AddRecipe from "./AddRecipe";
import GlobalList from "./GlobalList";

function Home({ user }) {



  return (
    <div className="space-y-40 flex flex-col justify-center items-center">

      <section id="welcome" className="flex justify-center">
        <div className="w-1/2 space-y-12 py-16">
      
          <h1 className="text-9xl">Recipe Roots</h1>
          <p className="">Here we celebrate the art of cooking, the joy of sharing, and the warmth of family traditions passed down through generations.
             By sharing these recipes, we honor our ancestors and keep their spirits alive in our kitchens.
          </p>

        </div>
      </section>

      <Stories/>

      <GlobalList user={user} />
   
      <AddRecipe/>

    </div>
  );
}

export default Home;

