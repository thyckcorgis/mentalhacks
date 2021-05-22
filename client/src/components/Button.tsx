import React, { FC } from "react";

interface ButtonProps {
  href: string;
}
const Button: FC<ButtonProps> = ({ children, href }) => (
  <a
    className="bg-yellow hover:bg-hoverYellow text-medGreen font-sans py-2 px-16 rounded-full"
    href={href}
  >
    {children}
  </a>
);

export default Button;
