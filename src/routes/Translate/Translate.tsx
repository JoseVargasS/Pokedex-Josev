import s from "./Translate.module.css";

import { useContext } from "react";
import { TranslateContext } from "../../contexts/Translate";

function Translate() {
  const { setLang } = useContext(TranslateContext);

  return (
    <div className={s.language}>
      <button onClick={() => setLang("en")}>EN</button>
      <button onClick={() => setLang("es")}>ES</button>
    </div>
  );
}

export default Translate;
