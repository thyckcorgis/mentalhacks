import React from "react";
import "tailwindcss/tailwind.css";
import initAuth from "../util/initAuth";

initAuth();

function MyApp({ Component, pageProps }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}

export default MyApp;
