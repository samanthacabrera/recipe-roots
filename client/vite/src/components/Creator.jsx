import React from "react";

function Creator({ recipe }) {
  return (
    <>
      <p>Creator Name: {recipe.creator_name}</p>
      <p>Creator Nickname: {recipe.creator_nickname}</p>
      <p>Creator Bio: {recipe.creator_bio}</p>
      <p>Memory: {recipe.memory}</p>
    </>
  );
}

export default Creator;
