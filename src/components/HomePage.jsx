import React from "react";
import TweetForm from "./TweetForm";
import PreviousTweets from "./PreviousTweets";
import Navbar from "./Navbar";

function HomePage() {
  return (
    <>
      <Navbar />
      <TweetForm />
      <PreviousTweets />
    </>
  );
}

export default HomePage;
