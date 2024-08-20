import React from "react";
import Hero from "./Hero";
import Stories from "./Stories";
import AddRecipe from "./AddRecipe";
import GlobalList from "./GlobalList";
import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";

function Home({ user }) {
  return (
    <div className="flex flex-col justify-center items-center space-y-20 sm:space-y-64 ">

      <Hero />
      
      <Stories/>

      <GlobalList user={user} />

      <SignedIn>
        <AddRecipe />
      </SignedIn>

      <SignedOut>
        <div className="space-y-12 p-8 sm:pb-40">
          <p>Feeling inspired? Sign in and share your own family recipe.</p>
          <SignIn/>
        </div>
      </SignedOut>

    </div>
  );
}

export default Home;
