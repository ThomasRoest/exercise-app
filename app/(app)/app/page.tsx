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
      className="border h-52 flex-1 flex items-center justify-center hover:bg-slate-100 active:bg-slate-200 rounded gap-2 font-bold"
    >
      {children}
    </Link>
  );
};

const Card = (props: PropsWithChildren) => {
  return (
    <div className="bg-white flex-auto basis-1/5 rounded">{props.children}</div>
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
