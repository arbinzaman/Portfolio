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
  carrent,
  jobit,
  tripguide,
  threejs,
} from "../assets";
import anwarTechnologies from "../assets/company/anwarTechnologies.png";
import prionty from "../assets/company/pritonty.jpeg";
import uniech from "../assets/company/uniech.jpg";

export const navLinks = [
  { id: "about", title: "About" },
  { id: "work", title: "Work" },
  { id: "contact", title: "Contact" },
];

const services = [
  { title: "Full Stack Developer", icon: web },
  { title: "React Native Developer", icon: mobile },
  { title: "Backend Developer", icon: backend },
  { title: "Automation & Script Developer", icon: creator },
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
  { name: "Three JS", icon: threejs },
  { name: "git", icon: git },
  { name: "figma", icon: figma },
  { name: "docker", icon: docker },
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
    title: "React Frontend Developer (Contract)",
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
    name: "Fahim Rahman",
    designation: "Backend Developer",
    company: "UNIECH",
    image: "https://randomuser.me/api/portraits/men/77.jpg",
  },
  {
    testimonial:
      "His frontend logic and rapid problem solving helped us launch the CRM module ahead of schedule.",
    name: "Mohammad Saad",
    designation: "Project Manager",
    company: "Anwar Technologies",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
  },
  {
    testimonial:
      "We relied on Arbin’s skills to implement performance-focused UI for the battery website — and he delivered.",
    name: "Shafiq Ahmed",
    designation: "Team Lead",
    company: "Prionty Digitals",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
];

const projects = [
  {
    name: "Rahimafrooz Battery Website",
    description:
      "Developed a responsive site with interactive location map, battery finder tool, and warranty registration dashboard. Ensured accessibility across devices.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "tailwind", color: "green-text-gradient" },
      { name: "vercel", color: "pink-text-gradient" },
    ],
    image: carrent,
    source_code_link: "https://github.com/arbinzaman/rahimafrooz-battery-frontend",
  },
  {
    name: "Hospital Management System (HMS)",
    description:
      "Full-stack HMS app with patient QR-code access, appointment and billing modules. Integrated real-time updates using MongoDB.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "mongodb", color: "green-text-gradient" },
      { name: "express", color: "pink-text-gradient" },
    ],
    image: jobit,
    source_code_link: "https://github.com/arbinzaman/hospital-management-system-client",
  },
  {
    name: "CRM with Python Automation",
    description:
      "Built a CRM dashboard using React and Electron. Used Python scripts to automate report generation and manage backend operations.",
    tags: [
      { name: "electron", color: "blue-text-gradient" },
      { name: "react", color: "green-text-gradient" },
      { name: "python", color: "pink-text-gradient" },
    ],
    image: tripguide,
    source_code_link: "https://github.com/arbinzaman",
  },
];

export { services, technologies, experiences, testimonials, projects };
