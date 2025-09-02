import { createContext, type Dispatch, type SetStateAction } from "react";
import type { Lang } from "../../translate";

export type LanguageContextType = {
  lang: Lang;
  setLang: Dispatch<SetStateAction<"en" | "es">>;
};

export const TranslateContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
});
