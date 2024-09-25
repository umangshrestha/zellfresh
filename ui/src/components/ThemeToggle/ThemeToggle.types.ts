import React from "react";

export type ThemeModeType = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
];

export type ThemeToggleProviderProps = Readonly<{ children: React.ReactNode }>;
