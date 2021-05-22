import React, { FC } from "react";

interface ButtonProps {
  href: string;
}
const Button: FC<ButtonProps> = ({ children, href }) => (
  <a
    className="flex-grow text-center bg-yellow transition duration-300 ease-in-out transform hover:scale-105 hover:bg-hoverYellow text-medGreen font-sans py-2 px-16 rounded-full"
    href={href}
  >
    {children}
  </a>
);

export default Button;
