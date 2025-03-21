import { useState, useEffect } from "react";

const PREFIX = "codepen-clone-";

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key;
  
  console.log("Loading key:", prefixedKey); // 🔴 Debugging Log

  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    try {
      return jsonValue ? JSON.parse(jsonValue) : (typeof initialValue === "function" ? initialValue() : initialValue);
    } catch (error) {
      console.error("❌ Error parsing JSON from localStorage:", error);
      return typeof initialValue === "function" ? initialValue() : initialValue;
    }
  });

  useEffect(() => {
    console.log("Saving to localStorage:", prefixedKey, JSON.stringify(value)); // 🔴 Debugging Log
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}
