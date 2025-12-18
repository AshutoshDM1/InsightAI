import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

function StackedCircularFooter() {
  return (
    <footer className="bg-[#030303] py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          {/* <div className="mb-8 rounded-full bg-primary/10 p-8">
            <Icons.logo className="icon-class w-6 text-white" />
          </div> */}
          <nav className="mb-8 flex flex-wrap justify-center gap-6">
            <a href="#" className="hover:text-zinc-400 text-white">
              Home
            </a>
            <a href="#" className="hover:text-zinc-400 text-white">
              About
            </a>
            <a href="#" className="hover:text-zinc-400 text-white">
              Services
            </a>
            <a href="#" className="hover:text-zinc-400 text-white">
              Products
            </a>
            <a href="#" className="hover:text-zinc-400 text-white">
              Contact
            </a>
          </nav>
          <div className="mb-8 flex space-x-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <Facebook className="h-6 w-6 text-black" />
              <span className="sr-only">Facebook</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Twitter className="h-6 w-6 text-black" />
              <span className="sr-only">Twitter</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Instagram className="h-6 w-6 text-black" />
              <span className="sr-only">Instagram</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Linkedin className="h-6 w-6 text-black" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </div>
          <div className="mb-8 w-full max-w-md"></div>
          <div className="text-center">
            <p className="text-sm text-zinc-400">
              ©2025 Insight AI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { StackedCircularFooter };
