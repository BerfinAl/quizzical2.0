import BoxWrapper from "./BoxWrapper";

function Landing() {
  return (
    <BoxWrapper
      imgSrc="/assets/landingv2.gif"
      buttonText="START"
      boxText={
        <>
          Welcome to
          <span className="highlight"> the ultimate trivia challenge </span>{" "}
          that will tickle your brain and leave you grinning from ear to ear!
          Get ready to embark on a wild ride of knowledge where every question
          is a thrill. Sharpen your wits, summon your friends, and let the games
          begin!
        </>
      }
      toLink={"game"}
    />
  );
}

export default Landing;
