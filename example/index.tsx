import React from "react";
import ReactDOM from "react-dom";
import { useBreakpoints } from "../src/main.ts";

interface CardProps {
  children: React.ReactNode;
}

const Card = (props: CardProps) => {
  return (
    <div
      style={{
        backgroundColor: "hotpink",
        color: "white",
        padding: "1rem",
      }}
    >
      {props.children}
    </div>
  );
};

const Wrapper = () => {
  const [ref, br] = useBreakpoints(400, 800, 1200);

  const width = br("100%", "50%", "33.33%", "25%");

  const itemStyle: React.CSSProperties = {
    boxSizing: "border-box",
    paddingLeft: "1rem",
    paddingTop: "1rem",
    width,
  };

  return (
    <div
      style={{
        fontFamily: "Arial",
      }}
    >
      <h1>react-component-breakpoints example</h1>
      <div
        ref={ref}
        style={{
          boxSizing: "border-box",
          display: "flex",
          flexWrap: "wrap",
          marginLeft: "-1rem",
          marginTop: "-1rem",
          textAlign: "center",
        }}
      >
        {new Array(10).fill(null).map((_, i) => (
          <div key={i} style={itemStyle}>
            <Card>{width}</Card>
          </div>
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(<Wrapper />, document.getElementById("root"));
