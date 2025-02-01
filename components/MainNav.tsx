"use client";

import { cn } from "@/lib/utils";
import { SidebarOpen, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactElement, ReactNode, useState } from "react";
import { Drawer } from "./Drawer";
import { IconExercise } from "./icons/IconExercise";
import { IconHome } from "./icons/IconHome";
import { IconMeals } from "./icons/IconMeals";
import { IconNotes } from "./icons/IconNotes";
import { IconSets } from "./icons/IconSets";
import { IconWorkout } from "./icons/IconWorkout";
import { Button } from "./ui/button";

const NavLink = ({
  href,
  icon,
  label,
  navigate,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  navigate: (href: string) => void;
}) => {
  const path = usePathname();

  return (
    <li key={href}>
      <button
        onClick={() => navigate(href)}
        className={cn(
          "flex w-full gap-x-2 px-2 py-4 border-b items-center text-sm active:bg-gray-200",
          {
            "font-bold border-r-4 border-r-blue-500 ": href === path,
          }
        )}
      >
        {icon}
        {label}
      </button>
    </li>
  );
};

const links = [
  { href: "/", label: "Home", icon: <IconHome /> },
  { href: "/app/meals", label: "Meals", icon: <IconMeals /> },
  { href: "/app/workouts", label: "Workouts", icon: <IconWorkout /> },
  { href: "/app/notes", label: "Notes", icon: <IconNotes /> },
  { href: "/app/sets", label: "All sets", icon: <IconSets /> },
  { href: "/app/exercises", label: "Exercises", icon: <IconExercise /> },
];

export const MainNav = (): ReactElement<any> => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const close = () => {
    setDrawerIsOpen(false);
  };

  const open = () => {
    setDrawerIsOpen(true);
  };

  const router = useRouter();
  const navigate = (href: string) => {
    router.push(href);
    close();
  };

  return (
    <>
      <div className="text-sm px-2 py-2">
        <nav className="flex justify-between items-center">
          <Button variant="outline" size="icon" onClick={open}>
            <SidebarOpen className="h-4 w-4" />
          </Button>
          <Link href="/" className="font-bold">
            Fit app
          </Link>
          <Button
            asChild
            size="icon"
            variant="ghost"
            className="rounded-full bg-gray-100"
          >
            <Link href="/app/profile">
              <User className="h-5 w-5" />
            </Link>
          </Button>
        </nav>
      </div>
      <Drawer close={close} isOpen={drawerIsOpen}>
        <nav>
          <ul>
            {links.map((link) => {
              return (
                <NavLink
                  key={link.href}
                  href={link.href}
                  icon={link.icon}
                  label={link.label}
                  navigate={navigate}
                />
              );
            })}
          </ul>
        </nav>
      </Drawer>
    </>
  );
};
