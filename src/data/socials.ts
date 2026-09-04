import {
  DribbbleLogoIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  TwitterLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react";

export const socials = [
  {
    href: "https://github.com/andreortiz82",
    label: "GitHub",
    Icon: GithubLogoIcon,
  },
  {
    href: "https://dribbble.com/andreortiz",
    label: "Dribbble",
    Icon: DribbbleLogoIcon,
  },
  {
    href: "https://www.instagram.com/andreortiz",
    label: "Instagram",
    Icon: InstagramLogoIcon,
  },
  {
    href: "https://www.linkedin.com/in/andreortiz",
    label: "LinkedIn",
    Icon: LinkedinLogoIcon,
  },
  {
    href: "https://twitter.com/andreortiz",
    label: "X (Twitter)",
    Icon: TwitterLogoIcon,
  },
  {
    href: "https://www.youtube.com/@aomusicandmore",
    label: "YouTube",
    Icon: YoutubeLogoIcon,
  },
] as const;
