'use client';
import { Provider } from "react-redux";
import { AppStore, store } from "./store";
import { useRef } from "react";

export function Providers({ children } : { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>(undefined)
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}