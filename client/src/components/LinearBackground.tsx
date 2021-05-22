import React, { FC } from "react";

interface LinearBackgroundProps {
  colours: [string, string];
}

const LinearBackground: FC<LinearBackgroundProps> = ({ children, colours }) => (
  <div className={`p-4 bg-gradient-to-b h-screen ${colours[0]} ${colours[1]}`}>{children}</div>
);

export default LinearBackground;
