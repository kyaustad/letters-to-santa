"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { ThemeSwitcher } from "@/features/theme-switcher-button.tsx/theme-switcher";
import { cn } from "@/lib/utils";

export const NavBar = () => {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Shop",
      link: "/shop",
    },
  ];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="w-full">
      <Navbar className="fixed top-0 z-50">
        {/* Desktop Navigation */}
        <NavBody className="font-light">
          <NavbarLogo />
          <NavItems items={navItems} className="font-light" />
          <div className="flex items-center gap-4">
            <NavbarButton
              variant="secondary"
              className="font-light text-lg"
              href="/check-order"
            >
              Check an Order
            </NavbarButton>
            <ThemeSwitcher className="z-50" />
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span
                  className={cn(
                    "block",
                    item.name === "Shop" && "font-semibold text-xl",
                  )}
                >
                  {item.name}
                </span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full font-light text-base"
              >
                Check an Order
              </NavbarButton>
              <ThemeSwitcher className="z-50 w-full" />
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Navbar */}
    </div>
  );
};
