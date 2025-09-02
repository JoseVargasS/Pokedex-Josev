import { useState, type ReactNode } from "react";
import { TranslateContext } from "./TranslateContext";
import type { Lang } from "../../translate";

export function TranslateProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  return (
    <TranslateContext.Provider value={{ lang, setLang }}>
      {children}
    </TranslateContext.Provider>
  );
}
