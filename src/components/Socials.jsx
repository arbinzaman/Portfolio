import React from "react";
import {
  Github,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import { motion } from "framer-motion";
import { slideIn } from "../utils/motion"; // Make sure this function is defined
import EarthCanvas from "./canvas/Earth";

const socials = [
  {
    icon: <Github className="w-7 h-7" />,
    url: "https://github.com/arbinzaman",
  },
  {
    icon: <Facebook className="w-7 h-7" />,
    url: "https://www.facebook.com/arbin.zaman.90/",
  },
  {
    icon: <Instagram className="w-7 h-7" />,
    url: "https://www.instagram.com/zamanarbin/",
  },
  {
    icon: <Linkedin className="w-7 h-7" />,
    url: "https://www.linkedin.com/in/zamanarbin/",
  },
  {
    icon: <Twitter className="w-7 h-7" />,
    url: "https://twitter.com/ArbinZaman",
  },
];

const Socials = () => {
  return (
    <section className="relative overflow-hidden  py-20 text-white text-center z-10">
   

 
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 tracking-wide">
          Find Me On
        </h2>

        <div className="flex justify-center flex-wrap gap-6 text-3xl">
          {socials.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 hover:text-white transition duration-300 shadow-[0_0_20px_#00ffff70] p-4  border border-cyan-400 bg-[#091324] hover:scale-110"
            >
              {item.icon}
            </a>
          ))}
        </div>

    </section>
  );
};

export default Socials;
