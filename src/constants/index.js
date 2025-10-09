
import project1 from "../assets/projects/project-1.webp";
import project5 from "../assets/projects/project15.png";
import project2 from "../assets/projects/port.png";
import project4 from "../assets/projects/project-4.webp";
import project3 from "../assets/projects/project10.png";
import { video } from "framer-motion/client";
import stawi from "../assets/projects/stawi4.webm";
import motorgram from "../assets/projects/motor4.webm";
import port from "../assets/projects/port.webm";

export const HERO_CONTENT = `Full-stack developer with 2+ years of hands-on experience in building clean, fast, and scalable web apps — from frontend interfaces to backend APIs. I craft efficient and user-friendly solutions with a passion for great code and better user experiences.`;

export const EXPERIENCES = [  
  {
    year: "Jan 2024 – Present",
    role: "Freelance Full-Stack Developer",
    company: "Self-Employed",
    description: `Design and build responsive UIs, secure APIs, and scalable databases for client projects from concept to deployment.`,
    technologies: ["React.js", "Next.js", "Flask", "PostgreSQL", "Tailwind CSS"],
  },
  {
    year: "Sept 2024 – Dec 2024",
    role: "Full-Stack Developer Intern",
    company: "Stawi Global",
    description: `Developed and maintained features for a web platform, improved API efficiency, and optimized database queries.`,
    technologies: ["React.js", "Flask", "PostgreSQL", "Tailwind CSS"],
  },
];

export const PROJECTS = [
  {
    title: "Car Marketplace",
    image: project5,
    description:
      "An online marketplace for cars and spare parts with listings, integrated payments, and import management.",
    technologies: ["React.js", "Flask", "PostgreSQL", "Tailwind CSS"],
    link: "https://motorgram.vercel.app/",
    video: motorgram,
    github_link: "https://github.com/shadrackbett/motorgram",
  },
  {
    title: "Interactive Portfolio",
    image: project2,
    description:
      "A modern portfolio showcasing projects, skills, and experience with smooth animations and clean design.",
    technologies: ["React.js", "Framer Motion", "Tailwind CSS", "Flask", "PostgreSQL"],
    video: port,
    github_link: "https://github.com/shadrackbett/shadrackbett",
  },
  {
    title: "Mental Wellness Platform",
    image: project3,
    description:
      "A platform connecting patients with mental health professionals, featuring scheduling and secure communication.",
    technologies: ["React.js", "Flask", "PostgreSQL", "Tailwind CSS"],
    link: "https://stawi-frontend.vercel.app/",
    video: stawi,
    github_link: "https://github.com/shadrackbett/stawi-frontend",
  },
];

export const CONTACT = {
  address: "Nairobi, Kenya, 00100",
  phoneNo: "+254 769 465 418",
  email: "shadrack.bett.92@gmail.com",
};
