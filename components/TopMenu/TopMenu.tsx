import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

type Props = {};

const TopMenu: React.FC<Props> = ({ items }) => {
  let { t } = useTranslation("common");
  const router = useRouter();

  const goto = (path, isActive) => {
    if (!isActive) {
      router.push(`${path}`);
    }
  };

  return (
    <>
      <div className="inlineMenu  flex flex-row ">
        {items.map((item) => {
          return (
            <button
              key={item.key}
              className={`inline-menu-items ${
                router.pathname === item.path ? "active" : ""
              }`}
              onClick={() => goto(item.path, router.pathname === item.path)}
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

export default TopMenu;
