// src/store/authAtom.js

import { atom } from "jotai";

// ACCESS TOKEN
export const accessTokenAtom = atom(
  localStorage.getItem("accessToken") || ""
);

// USER DATA
export const userAtom = atom(
  JSON.parse(
    localStorage.getItem("user")
  ) || null
);

// AUTH STATUS
export const isAuthAtom = atom(
  !!localStorage.getItem("accessToken")
);