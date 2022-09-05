import React from "react";

export default function Drawer({ children, isOpen, setIsOpen ,  title}) {
    return (
      <main
        className={
          "fixed overflow-hidden z-10  bg-opacity-25 inset-0 transform ease-in-out" +
          (isOpen
            ? " transition-opacity opacity-100 duration-500 translate-x-0  "
            : " transition-all  delay-500 opacity-0 bg-opacity-0 rtl:-translate-x-full  ltr:translate-x-full")
        }
      >
        <section
          className={
            "w-screen max-w-md rtl:left-0 ltr:right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
            (isOpen
              ? " translate-x-0 "
              : " rtl:-translate-x-full ltr:translate-x-full")
          }
        >
          <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
            <header className="p-4 font-bold text-lg">{title}</header>
            {children}
          </article>
        </section>
        <section
          className={
            " z-9  bg-opacity-25  bg-gray-900 w-screen h-full cursor-pointer " +
            (isOpen ? "   " : "w-0 ")
          }
          onClick={() => {
            setIsOpen(false);
          }}
        />
      </main>
    );
}
