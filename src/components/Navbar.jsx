import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt='logo' className='w-9 h-9 object-contain' />
          <p className='flex whitespace-nowrap text-[18px] font-bold text-white'>
           Arbin Zaman </p>
        </Link>

        <ul className='list-none hidden sm:flex flex-row items-center gap-4 lg:gap-10'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } cursor-pointer text-base font-medium hover:text-white lg:text-[18px]`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
          <li className='cursor-pointer whitespace-nowrap rounded-full border border-[#d9f3e2]/70 bg-[#b9dfc8] px-3 py-1.5 text-sm font-bold text-[#13231b] shadow-[0_0_24px_rgba(185,223,200,0.2)] transition hover:-translate-y-0.5 hover:bg-[#d9f3e2] hover:shadow-[0_0_30px_rgba(185,223,200,0.35)]'>
            <Link to='/hobby' aria-label='Explore the travel journal' className='flex items-center gap-1.5 whitespace-nowrap'>
              <span>Travel journal</span>
              <span aria-hidden='true'>↗</span>
            </Link>
          </li>
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center gap-3'>
          <Link
            to='/hobby'
            aria-label='Explore the travel journal'
            className='inline-flex items-center gap-1.5 rounded-full border border-[#d9f3e2]/70 bg-[#b9dfc8] px-3 py-2 text-xs font-bold text-[#13231b] shadow-[0_0_20px_rgba(185,223,200,0.18)]'
          >
            Travel <span aria-hidden='true'>↗</span>
          </Link>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
              <li
                className='font-poppins font-bold cursor-pointer rounded-lg border border-[#d9f3e2]/70 bg-[#b9dfc8] px-3 py-2 text-[16px] text-[#13231b] shadow-[0_0_20px_rgba(185,223,200,0.18)] hover:bg-[#d9f3e2]'
                onClick={() => setToggle(false)}
              >
                <Link to='/hobby' aria-label='Explore the travel journal' className='flex items-center justify-between gap-6'>
                  <span>Travel journal</span>
                  <span aria-hidden='true'>↗</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
