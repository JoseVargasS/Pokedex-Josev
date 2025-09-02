import { useContext } from "react";
import { t } from "../../translate";
import s from "./Logout.module.css";

import { useFetcher } from "react-router-dom";
import { TranslateContext } from "../../contexts/Translate";

function Logout() {
  const Fetcher = useFetcher();
  const { lang } = useContext(TranslateContext);

  return (
    <Fetcher.Form method="post" action="/logout">
      <button className={s.logout}>{t[lang].logout}</button>
    </Fetcher.Form>
  );
}

export default Logout;
