import { navLinks } from "@/lib/nav";
import Link from "next/link";
import { PropsWithChildren, ReactNode } from "react";

const LinkComponent = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="h-52 flex-1 flex items-center justify-center rounded gap-2 font-bold dark:text-gray-200"
    >
      {children}
    </Link>
  );
};

const Card = (props: PropsWithChildren) => {
  return (
    <div className="bg-white flex-auto basis-1/5 rounded dark:bg-gray-800">
      {props.children}
    </div>
  );
};

const AppPage = async () => {
  return (
    <div className="flex mx-auto flex-col md:flex-row gap-2 flex-wrap max-w-[1000px] ">
      {navLinks
        .filter((link) => link.href !== "/")
        .map((link) => {
          return (
            <Card key={link.href}>
              <LinkComponent href={link.href}>
                {link.icon}
                {link.label}
              </LinkComponent>
            </Card>
          );
        })}
    </div>
  );
};

export default AppPage;
