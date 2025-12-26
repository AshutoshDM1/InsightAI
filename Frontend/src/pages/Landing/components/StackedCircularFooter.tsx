import { Button } from "@/components/ui/button";
import { GithubIcon, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

function StackedCircularFooter() {
  const Links = [
    {
      icon: <GithubIcon className="size-6 text-black" />,
      href: "https://github.com/ashutoshdm1",
      label: "Github",
    },

    {
      icon: <Twitter className="size-6 text-black" />,
      href: "https://x.com/AshutoshDM_1",
      label: "Twitter",
    },
    {
      icon: <Linkedin className="size-6 text-black" />,
      href: "https://www.linkedin.com/in/ashutosh-tiwari-8931b82b8/",
      label: "LinkedIn",
    },
  ];
  return (
    <footer className="bg-[#030303] py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          <div className="flex space-x-4">
            {Links.map((link) => (
              <Link key={link.href} to={link.href} target="_blank">
                <Button variant="outline" size="icon" className="rounded-full">
                  {link.icon}
                  <span className="sr-only">{link.label}</span>
                </Button>
              </Link>
            ))}
          </div>
          <div className="mb-8 w-full max-w-md"></div>
          <div className="text-center">
            <p className="text-sm text-neutral-400">
              ©2025 Insight AI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { StackedCircularFooter };
