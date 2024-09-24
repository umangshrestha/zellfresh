import * as React from "react";
import clsx from "clsx";

export default function Viel({
  enable,
  children,
}: Readonly<{
  enable: boolean;
  children: React.ReactNode;
}>) {
  return (
    <div
      className={clsx("mx-auto rounded overflow-hidden shadow-lg relative", {
        "opacity-50 pointer-events-none": enable,
      })}
    >
      {children}
    </div>
  );
}
