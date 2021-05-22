import React, { FC } from "react";

interface LinearBackgroundProps {
  colours: [string, string];
}

const LinearBackground: FC<LinearBackgroundProps> = ({ children, colours }) => (
  <div className={`bg-fixed bg-gradient-to-b h-full ${colours[0]} ${colours[1]}`}>{children}</div>
);

export default LinearBackground;
