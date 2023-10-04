import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { BiMenuAltRight, BiX } from "react-icons/bi";

function LayoutComponents() {
  const navigate = useNavigate();
  const [header, setHeader] = useState(false);
  const [nav, setNav] = useState(false);

  const desktopMode = useMediaQuery({
    query: "(min-width: 1300px)",
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      // header
      if (window.scrollY > 40) {
        setHeader(true);
      } else {
        setHeader(false);
      }
    };

    // add event listener
    window.addEventListener("scroll", handleScroll);

    // remove event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <>
      <header
        className={`${
          header ? "shadow-md py-2" : "bg-transparent shadow-none py-4"
        } fixed w-full bg-[#f9f9f9] max-w-[1920px] mx-auto z-20 transition-all duration-300`}
      >
        <div className="xl:container mx-auto flex flex-col xl:flex-row xl:items-center xl:justify-between">
          <div className="flex justify-between items-center px-4">
            {/* Logo */}
            <Link
              to="/"
              smooth={desktopMode}
              spy={true}
              className="cursor-pointer"
            >
              <img
                src={"https://codio.tech/img/logo-light.svg"}
                width={128}
                height={128}
                alt="logo"
              />
            </Link>
            {/* nav open menu */}
            <div
              onClick={() => setNav(!nav)}
              className="cursor-pointer xl:hidden"
            >
              {nav ? (
                <BiX className="text-4xl" />
              ) : (
                <BiMenuAltRight className="text-4xl" />
              )}
            </div>
          </div>
          {/* nav */}
          <nav
            className={`${
              nav
                ? "max-h-max py-8 px-4 xl:py-0 xl:px-0"
                : "max-h-0 xl:max-h-max"
            } flex bg-[#f9f9f9] flex-col w-full gap-y-6 overflow-hidden font-semibold xl:font-medium xl:flex-row xl:w-max xl:gap-x-8 xl:h-max xl:bg-transparent xl:pb-0 transition-all duration-150 text-center xl:text-left uppercase text-sm xl:text-[15px] xl:normal-case`}
          >
            <Link className="cursor-pointer" to="/" smooth={desktopMode}>
              Ürünler
            </Link>
            <Link className="cursor-pointer" to="products" smooth={desktopMode}>
              Ürünleri Yönet
            </Link>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
}
export default LayoutComponents;
