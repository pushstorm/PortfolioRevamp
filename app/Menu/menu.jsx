import React from "react";
import { cn } from "../lib/utils";
import { usePathname } from "next/navigation";
const Menu = () => {
  const menu = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/About-us" },
    {
      name: "Our Services",
      dropDown: [
        { name: "Interior Design & Development", href: "/" },
        { name: "Joinery", href: "/" },
        { name: "Carpentry", href: "/" },
        { name: "Furniture Crafting", href: "/" },
        { name: "Fit-out & refurbishment", href: "/" },
        { name: "Visual merchandising & Shop today", href: "/" },
        { name: "Architecture Design", href: "/" },
        { name: "Retail Turnkey Solutions", href: "/" },
        { name: "Home Maintenance", href: "/" },
        { name: "Space Renovation", href: "/" },
      ],
    },
    { name: "Careers", href: "/careers" },
    { name: "Contact us", href: "/contact-us" },
  ];
  const path = usePathname()
  return (
    <div>
      <ul className="flex justify-center items-center gap-6">
        {menu.map((item, idx) => (
          <li
            key={idx}
            className={cn(
              `text-lg font-sans px-4 py-5 flex justify-normal items-center`,
              path.toLowerCase() === item.href && `border-b-2 border-slate-900 `
            )}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;