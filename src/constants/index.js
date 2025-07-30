import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  tesla,
  shopify,
  jobit,
  carrent,
  tripguide,
  threejs,
} from "../assets";
import anwarTechnologies from "../assets/company/anwarTechnologies.png";
import prionty from "../assets/company/pritonty.jpeg";
import uniech from "../assets/company/uniech.jpg";

import python from "../assets/tech/python.png";
import postgresql from "../assets/tech/postgreSql.png";
import prisma from "../assets/tech/prisma.png";
import uihp from "../assets/recognization/uihp.jpg";
import btrc from "../assets/recognization/btrc.jpg";
import GPAccelerator from "../assets/recognization/gpAccerleration.jpeg";
import University from "../assets/recognization/universityRecognization.jpg";
import UITS from "../assets/recognization/uits.png";
import gp from "../assets/recognization/gp.png";
import btrcLogo from "../assets/recognization/btrcLogo.png";
import uihpLogo from "../assets/recognization/uihpLogo.jpg";
import dokaan from "../assets/dokaan.png";
import hms from "../assets/hms.png";

export const navLinks = [
  { id: "about", title: "About" },
  { id: "work", title: "Work" },
  { id: "recognition", title: "Recognition" },
  { id: "contact", title: "Contact" },
];

const services = [
  { title: "Full Stack Developer", icon: web },
  { title: "Automation Expert", icon: mobile },
  { title: "Entrepreneur", icon: backend },
  { title: "Innovator", icon: creator },
];

const technologies = [
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
  { name: "JavaScript", icon: javascript },
  { name: "TypeScript", icon: typescript },
  { name: "React JS", icon: reactjs },
  { name: "Redux Toolkit", icon: redux },
  { name: "Tailwind CSS", icon: tailwind },
  { name: "Node JS", icon: nodejs },
  { name: "MongoDB", icon: mongodb },
  // { name: "Three JS", icon: threejs },
  { name: "git", icon: git },
  // { name: "figma", icon: figma },
  { name: "Python", icon: python },
  { name: "PostgreSQL", icon: postgresql },
  // { name: "docker", icon: docker },
  { name: "Prisma", icon: prisma },
];
const experiences = [
  {
    title: "Jr. Software Developer",
    company_name: "Anwar Technologies",
    icon: anwarTechnologies,
    iconBg: "#E6DEDD",
    date: "Feb 2024 - Present",
    points: [
      "Building and maintaining a CRM system tailored to client needs.",
      "Ensuring application responsiveness and performance optimization.",
      "Collaborating with teams to implement efficient frontend interfaces.",
      "Integrating APIs and handling dynamic content rendering.",
    ],
  },
  {
    title: "Jr. Software Engineer (Contract)",
    company_name: "Prionty Digitals",
    icon: prionty,
    iconBg: "#E6DEDD",
    date: "May 2024 - Dec 2024",
    points: [
      "API integration and collaboration with backend team.",
      "Optimized site initial loading speed from 7+s to under 1.5s.",
      "Developed pixel-perfect designs using React and Tailwind.",
    ],
  },
  {
    title: "Frontend Developer (Intern)",
    company_name: "UNIECH",
    icon: uniech,
    iconBg: "#383E56",
    date: "March 2023 - June 2023",
    points: [
      "Contributed to the development of a Hospital Management System.",
      "Created responsive designs for better UX.",
      "Implemented a QR-code-based user report viewer.",
      "Assisted in debugging and optimizing frontend performance.",
    ],
  },
];
const testimonials = [
  {
    testimonial:
      "Arbin played a key role in enhancing our HMS frontend performance and maintainability.",
    name: "Kamrul Saad",
    designation: "Backend Developer",
    company: "UNIECH",
    // image: "https://randomuser.me/api/portraits/men/77.jpg",
  },
  {
    testimonial:
      "His frontend logic and rapid problem solving helped us launch the CRM module ahead of schedule.",
    name: "Asim ibne Alyus",
    designation: "Lead Project Manager",
    company: "Anwar Technologies",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
  },
  {
    testimonial:
      "We relied on Arbin’s skills to implement performance-focused UI for the battery website — and he delivered.",
    name: "Nazmul Hasan",
    designation: "Manager",
    company: "Prionty Digitals",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
];
const projects = [
  {
    name: "Dokaan - Mobile Based ERP System",
    description:
      "A full-stack mobile ERP system for small businesses. Manages inventory, sales, and customers. Built with React Native and Node.js for real-time performance and seamless cross-device usage.",
    tags: [
      { name: "reactjs", color: "blue-text-gradient" },
      { name: "reactnative", color: "green-text-gradient" },
      { name: "nodejs", color: "pink-text-gradient" },
    ],
    image: dokaan,
    source_code_link: "https://github.com/arbinzaman/Dokaan",
  },
  {
    name: "Rahimafrooz Battery Website",
    description:
      "Corporate website with location map, battery finder, and warranty registration tools. Developed using React and Node.js to ensure fast performance, responsiveness, and accessibility across all devices.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "cms", color: "green-text-gradient" },
      { name: "nodejs", color: "pink-text-gradient" },
    ],
    image: jobit,
    source_code_link:
      "https://github.com/arbinzaman/rahimafrooz-battery-frontend",
  },

  {
    name: "Hospital Management System (HMS)",
    description:
      "Hospital system with patient QR access, appointment scheduling, and billing features. Built with React, Express, and MongoDB for fast performance and smooth real-time user interactions.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "mongodb", color: "green-text-gradient" },
      { name: "express", color: "pink-text-gradient" },
    ],
    image: hms,
    source_code_link:
      "https://github.com/arbinzaman/hospital-management-system-client",
  },
  ,
];
const recognitions = [
  {
    title: "Innovation Cohort 2 – BRAC University",
    organization: "BRAC University UIHP",
    date: "May 2025",
    description:
      "Team Leisurely_Loco was selected for Innovation Cohort 2 under the University Innovation Hub Program. Collaborated with mentors and entrepreneurs to refine digital startup ideas and drive innovation.",
    tags: ["UIHP", "InnovationInAction", "StartupJourney"],
    logo: uihpLogo, // updated logo import
    imageUrl: uihp, // image can remain as before
  },
  {
    title: "Head of Media & Communication",
    organization: "UITS Computer Club",
    date: "2021 - 2025",
    description:
      "Led media and communication efforts for UITS Computer Club. Participated in numerous competitions including gaming and photography, organized various events, and coordinated club outreach activities to boost member engagement and public relations.",
    tags: [
      "UITS",
      "MediaLeadership",
      "EventOrganizer",
      "Photography",
      "Gaming",
    ],
    logo: UITS, // new imported logo for UITS Computer Club
    imageUrl: University, // keep the university image for achievement
  },
  {
    title: "GP Accelerator Idea Design Bootcamp",
    organization: "Grameenphone Ltd.",
    date: "June 2025",
    description:
      "Selected for the Grameenphone Accelerator Idea Design Bootcamp. Worked closely with mentors and industry leaders to enhance startup strategies and prototype development.",
    tags: ["GPAccelerator", "IdeaDesignBootcamp", "Entrepreneurship"],
    logo: gp, // new imported GP logo
    imageUrl: GPAccelerator,
  },
  {
    title: "BTRC Telecom & Digital Innovation Fair",
    organization: "BTRC",
    date: "July 2025",
    description:
      "Team Dokaan represented UITS at the national Telecom & Digital Innovation Fair 2025, showcasing a smart retail system. Among 32 projects, it highlighted digital innovation aligned with the Smart Bangladesh initiative.",
    tags: ["btrc", "SmartBangladesh", "InnovationFair"],
    logo: btrcLogo, // new BTRC logo import
    imageUrl: btrc,
  },
];
export {
  services,
  technologies,
  experiences,
  testimonials,
  projects,
  recognitions,
};
