import ConnectionMenu from "assets/contents/connectionMenu";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

type Props = {};

const Connectionbar: React.FC<Props> = () => {
  let { t } = useTranslation("common");
  const router = useRouter();

  const goto = (path) => {
    router.push(`${path}`);
  };

  return (
    <>
      <div className="inlineMenu  flex flex-row ">
        {ConnectionMenu.map((item) => {
          return (
            <button
              key={item.key}
              className={`inline-menu-items ${
                router.pathname === item.path ? "active" : ""
              }`}
              onClick={() => goto(item.path)}
              disabled={item.disabled}
            >
              <span>{t(item.key)}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Connectionbar;
