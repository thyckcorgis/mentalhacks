import React, { FC } from "react";

interface ButtonProps {
  buttonAction: () => void;
}
const Button: FC<ButtonProps> = ({ children, buttonAction }) => (
  <button
    className="bg-yellow hover:bg-hoverYellow text-medGreen font-sans py-2 px-16 rounded-full"
    onClick={buttonAction}
  >
    {children}
  </button>
);

export default Button;
