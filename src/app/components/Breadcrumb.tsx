import Link from "next/link";
import { Fragment } from "react";

export interface BreadcrumbProps {
    label: string;
    href: string;
}
type BreadcrumbPropsData = {
  data: BreadcrumbProps[];
  isDarkBackground?: boolean;
};

function Breadcrumb({ data }: BreadcrumbPropsData) {

  const { length } = data;
  const lastIndex: number = length - 1;

  if (length === 0) return null;

  return (
    <nav aria-label="breadcrumb" className="py-0 pb-5 lg:py-5">
      <ul
        className="flex items-center gap-1 text-gray-500 text-sm">
        {data.map((value: BreadcrumbProps, index: number) => {
          if (index === lastIndex) {
            return (
              <Fragment key={value.label}>
                <li className="flex-none">
                  <span>
                    {value.label}
                  </span>
                </li>
              </Fragment>
            );
          }

          return (
            <Fragment key={value.label}>
              <li className="flex-none">
                <Link href={value.href}>
                  {value.label}
                </Link>
              </li>
              <li className="flex-none" key={`separator-${value.label}`}>
                /
              </li>
            </Fragment>
          );
        })}
      </ul>
    </nav>
  );
}

export default Breadcrumb;
