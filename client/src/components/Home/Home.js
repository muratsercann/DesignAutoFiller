import React from "react";
import Design from "./Design";

export default function Home() {
  return (
    <div className="home bg-light">
      <div className="header">
        <h1>Welcome :)</h1>
        <p>Here are Your Savings</p>
      </div>

      <Design />
    </div>
  );
}
