import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { loggedOut } from "stores/actions";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";

const NavItem = ({ item, icons }) => {
  const { language } = useAppSelector((state) => ({
    language: state.auth.language,
  }));
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onClick = (key) => {
    if (key === "signout") {
      dispatch(loggedOut());
      router.push("/auth/login");
    }
  };

  if (item.type === "link") {
    return (
      <>
        {icons && (
          <>
            {!item.disabled ? (
              <Link href={item.path}>
                <span
                  className={`${
                    router.pathname.includes(item.path) ? "active" : ""
                  } menuItem ${language === "fa-IR" ? "rtl" : "ltr"} ${
                    item.className
                  } inline-flex items-center justify-center  cursor-pointer relative group `}
                >
                  <span className="icon block group-hover:hidden">
                    {icons[item.key]}
                  </span>
                  <span className="icon-active hidden group-hover:block">
                    {icons[item.key + "Selected"]}
                  </span>
                </span>
              </Link>
            ) : (
              <span
                className={`menuItem disabled ${
                  language === "fa-IR" ? "rtl" : "ltr"
                } ${
                  item.className
                } inline-flex items-center justify-center  relative group `}
              >
                <span className="icon block group-hover:hidden">
                  {icons[item.key]}
                </span>
                <span className="icon-active hidden group-hover:block">
                  <span />
                  {icons[item.key + "Selected"]}
                </span>
              </span>
            )}
          </>
        )}
      </>
    );
  }

  if (item.type === "button") {
    return (
      <>
        {icons && (
          <button
            disabled={item.disabled}
            onClick={() => onClick(item.key)}
            className="p-0"
          >
            <span
              className={`${
                router.pathname.includes(item.path) ? "active" : ""
              } menuItem ${
                language === "fa-IR" ? "rtl" : "ltr"
              } inline-flex items-center justify-center  cursor-pointer relative group `}
            >
              <span className="icon block group-hover:hidden">
                {icons[item.key]}
              </span>
              <span className="icon-active hidden group-hover:block">
                {icons[item.key + "Selected"]}
              </span>
            </span>
          </button>
        )}
      </>
    );
  }
};

export default NavItem;
