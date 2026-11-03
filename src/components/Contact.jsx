import React, { useRef, useState } from "react";
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

  // console.log(form);
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
          // email: "arbinzmn@gmail.com",
          message: form.message,
          time: new Date().toISOString(),
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
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
        }
      );
  };

  return (
    <div className='mt-8 flex flex-col-reverse gap-8 overflow-hidden xl:mt-12 xl:flex-row xl:gap-10'>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='portfolio-panel relative flex-[0.75] overflow-hidden rounded-3xl p-6 sm:p-8 lg:p-10'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-8 flex flex-col gap-6 sm:mt-10 sm:gap-7'
        >
          <label className='flex flex-col'>
            <span className='mb-2 text-sm font-medium text-white/80'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              autoComplete='name'
              className='rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 font-medium text-white outline-none transition placeholder:text-secondary/70 focus:border-[#a78bfa]/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-[#915EFF]/20 sm:px-5'
            />
          </label>
          <label className='flex flex-col'>
            <span className='mb-2 text-sm font-medium text-white/80'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your mail address?"
              autoComplete='email'
              className='rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 font-medium text-white outline-none transition placeholder:text-secondary/70 focus:border-[#a78bfa]/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-[#915EFF]/20 sm:px-5'
            />
          </label>
          <label className='flex flex-col'>
            <span className='mb-2 text-sm font-medium text-white/80'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What you want to say?'
              className='resize-y rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 font-medium text-white outline-none transition placeholder:text-secondary/70 focus:border-[#a78bfa]/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-[#915EFF]/20 sm:px-5'
            />
          </label>

          <button
            type='submit'
            disabled={loading}
            className='group inline-flex w-fit items-center gap-3 rounded-full border border-[#a78bfa]/35 bg-[#915EFF] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_35px_rgba(145,94,255,0.24)] transition hover:-translate-y-0.5 hover:bg-[#a78bfa] disabled:cursor-wait disabled:opacity-70'
          >
            {loading ? "Sending..." : "Send message"}
            {!loading && <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">↗</span>}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='portfolio-panel relative h-[300px] overflow-hidden rounded-3xl md:h-[420px] xl:h-auto xl:flex-1'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
