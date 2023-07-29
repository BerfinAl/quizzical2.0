import BoxWrapper from "./BoxWrapper";

import { useLocation } from "react-router-dom";

export default function GameOver() {
  let location = useLocation();
  console.log(location);

  return (
    <BoxWrapper
      boxText={
        <>
          Oops! Trivia can be a tough nut to crack, but don't let that dampen
          your spirits! Every stumble is a step closer to victory. Hit play
          again, sharpen your knowledge, and get ready to claim that triumphant
          win! You've got this!
        </>
      }
      buttonText={"Play Again"}
      toLink={"/"}
    />
  );
}

