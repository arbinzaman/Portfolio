import React, { useRef, useState } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";

import { styles } from "../styles";
import EarthCanvas from "./canvas/Earth";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill out all fields.", {
        style: {
          border: "1px solid #ff4d4f",
          padding: "12px 16px",
          color: "#fff",
          background: "#1f1f1f",
        },
        iconTheme: {
          primary: "#ff4d4f",
          secondary: "#1f1f1f",
        },
      });
      return;
    }

    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          to_name: "Arbin Zaman",
          email: form.email,
          message: form.message,
          time: new Date().toISOString(),
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setLoading(false);
          toast.success("Thanks for reaching out! I'll reply soon.", {
            style: {
              border: "1px solid #4ade80",
              padding: "12px 16px",
              color: "#fff",
              background: "#1f1f1f",
            },
            iconTheme: {
              primary: "#4ade80",
              secondary: "#1f1f1f",
            },
          });
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          const message =
            error?.status === 412
              ? "Email service needs reconnecting. Please try again later."
              : "Something went wrong. Please try again later.";
          toast.error(message, {
            style: {
              border: "1px solid #facc15",
              padding: "12px 16px",
              color: "#fff",
              background: "#1f1f1f",
            },
            iconTheme: {
              primary: "#facc15",
              secondary: "#1f1f1f",
            },
          });
        },
      );
  };

  return (
    <div className="mt-8 flex flex-col-reverse gap-10 xl:mt-12 xl:flex-row xl:items-stretch xl:gap-12">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.78]"
      >
        <Tilt
          tiltMaxAngleX={3.5}
          tiltMaxAngleY={3.5}
          perspective={1400}
          scale={1}
          transitionSpeed={500}
          className="plate-3d h-full w-full"
        >
          <div className="plate-3d-face h-full p-6 sm:p-8 lg:p-10">
            <div className="z-lift-md border-b border-white/[0.08] pb-5">
              <p className={styles.sectionSubText}>Get in touch</p>
              <h3 className={`${styles.sectionHeadText} extrude-3d`}>
                <span data-text="Contact." className="exploded-type-3d">
                  Contact.
                </span>
              </h3>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="z-lift-sm mt-8 flex flex-col gap-6 sm:mt-9 sm:gap-7"
            >
              <label className="flex flex-col">
                <span className="mb-2 text-sm font-medium text-white/85">
                  Your Name
                </span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="What's your good name?"
                  autoComplete="name"
                  className="input-3d px-4 py-3.5 font-medium text-white outline-none placeholder:text-secondary/60 sm:px-5"
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-2 text-sm font-medium text-white/85">
                  Your Email
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="What's your mail address?"
                  autoComplete="email"
                  className="input-3d px-4 py-3.5 font-medium text-white outline-none placeholder:text-secondary/60 sm:px-5"
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-2 text-sm font-medium text-white/85">
                  Your Message
                </span>
                <textarea
                  rows={6}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What do you want to build together?"
                  className="input-3d resize-y px-4 py-3.5 font-medium text-white outline-none placeholder:text-secondary/60 sm:px-5"
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="key-3d key-3d--primary z-lift-lg group mt-1 w-fit px-6 py-3.5 text-sm disabled:cursor-wait disabled:opacity-70"
              >
                {loading ? "Sending..." : "Send message"}
                {!loading && (
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    ↗
                  </span>
                )}
              </button>
            </form>
          </div>
        </Tilt>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="plate-3d h-[340px] w-full md:h-[460px] xl:h-[620px] xl:flex-1"
      >
        <div className="plate-3d-face relative h-full w-full overflow-hidden">
          <EarthCanvas />
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
