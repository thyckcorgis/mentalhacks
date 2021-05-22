import React from "react";
import "tailwindcss/tailwind.css";
import initAuth from "../util/initAuth";
import "../styles/firebaseui.globals.css";

initAuth();

function MyApp({ Component, pageProps }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}

export default MyApp;
