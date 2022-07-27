import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

type Props = {};

const ConnectionSidebar: React.FC<Props> = () => {
  let { t } = useTranslation("common");
  const router = useRouter();

  const goto = (path) => {
    router.push(`/dashboard/connections/${path}`);
  };
  return (
    <>
      <div className="inlineMenu p-5 flex flex-col h-full">
        <button className="secondary" onClick={() => goto("accounts/add")}>
          {t("add-account")}
        </button>
        <button className="mt-5" onClick={() => goto("accounts")}>
          {t("accounts")}
        </button>
        <button className="secondary mt-20" onClick={() => goto("add")}>
          {t("new-connection")}
        </button>
        <button className="mt-5" onClick={() => goto("")}>
          {t("connections")}
        </button>
      </div>
    </>
  );
};

export default ConnectionSidebar;
