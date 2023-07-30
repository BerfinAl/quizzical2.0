import BoxWrapper from "./BoxWrapper";

import { useLocation } from "react-router-dom";

export default function GameOver() {
  let location = useLocation();

  return (
    <BoxWrapper
      imgSrc={
        location.state
          ? " assets/win-gif.gif"
          : " assets/lose-gif.gif"
      }
      boxText={
        location.state ? (
          <>
            Congratulations, trivia whiz! You've conquered the game with flying
            colors! But don't hang up your thinking cap just yet—more thrilling
            challenges await! Hit play again and let's see if you can outsmart
            yourself this time!
          </>
        ) : (
          <>
            Oops! Trivia can be a tough nut to crack, but don't let that dampen
            your spirits! Every stumble is a step closer to victory. Hit play
            again, sharpen your knowledge, and get ready to claim that
            triumphant win! You've got this!
          </>
        )
      }
      buttonText={"Play Again"}
      toLink={"/"}
    />
  );
}
