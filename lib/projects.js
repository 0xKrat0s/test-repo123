import { BsYoutube } from "react-icons/bs";
import { CgOrganisation } from "react-icons/cg";
import {
  IoIosRocket,
  IoIosTrophy,
  IoLogoGameControllerB,
} from "react-icons/io";
import { SiGitbook } from "react-icons/si";

//
import DocSearch from "../public/images/project-bg/docsearch.jpg";
import CodePlex from "../public/images/project-bg/codeplex.jpg";
import GPT2ML from "../public/images/project-bg/gpt2ml.jpg";
import Steganography from "../public/images/project-bg/steganography.jpeg";
import {
  platforms,
  db,
  iot,
  frameworks,
  langs,
  otherTools,
  api,
  Models,
} from "./skills";

const projects = [
  // VAPT Pentest Management & Reporting Tool
  {
    title: "VAPT Management & Reporting Platform",
    image: DocSearch, // Placeholder, update with relevant image
    timeline: "2024 - Present",
    description:
      "[Work in Progress] A next-generation cybersecurity platform for managing VAPT (Vulnerability Assessment and Penetration Testing) projects. Effortlessly organize multiple pentest projects, assign and track tasks, add team members, and monitor progress. Team members submit findings and reports, which are automatically combined into a comprehensive, client-ready VAPT report. Built for modern security teams and continuous improvement.",
    repository: "https://github.com/muhsinbinirshad/TrackVault.git",
    otherLinks: [],
    tags: [
      langs.Python,
      langs.Javascript,
      langs.Typescript,
      frameworks.React,
      frameworks.NextJS,
      frameworks.Tailwind,
      otherTools.Vscode,
    ],
  },
  // Secure Text In Image Steganography
  /*
  {
    title: "Secure Text In Image Steganography",
    image: Steganography,
    link: "https://github.com/ritikasarkar18/Secure-Text-in-Image-Steganography",
    timeline: "Apr `22",
    description:
      "This project performs text in image steganography using pixel-based algorithms which hide the text in the image array by using statistical techniques to manipulate the arrays and store the text character by character. Then the additional security level is implemented where we use the Chinese Remainder Theorem algorithm in combination with a cryptographic technique to encrypt the text.",
    repository:
      "https://github.com/ritikasarkar18/Secure-Text-in-Image-Steganography",
    otherLinks: [
      {
        label: "Paper",
        icon: <SiGitbook />,
        url: "http://ijeast.com/papers/338-342,%20Tesma0701,IJEAST.pdf",
      },
    ],
    tags: [langs.Python, langs.Javascript, langs.HTML],
  },
  */
];

export default projects;
