import React from "react";
import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import initAuth from "../util/initAuth";
import "../styles/firebaseui.globals.css";

initAuth();

function MyApp({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}

export default MyApp;
