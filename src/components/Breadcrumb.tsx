"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb = () => {
  const pathname = usePathname();

  if (!pathname) return null;

  // Split the path into segments and filter empty ones
  const segments = pathname.split("/").filter(Boolean);

  // Create the breadcrumb items with URLs
  const breadcrumbs = segments.map((segment, index) => {
    // Create the URL for each segment
    const href = "/" + segments.slice(0, index + 1).join("/");

    // Format segment text (replace hyphens, capitalize)
    const text = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return { href, text };
  });

  return (
    <nav aria-label="breadcrumb" className="text-sm text-neutral-600 my-2">
      <ol className="flex flex-wrap gap-1">
        <li>
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-1">/</span>
        </li>

        {breadcrumbs.map((crumb, idx) => (
          <li key={crumb.href} className="flex items-center">
            {/* Show the last crumb without link */}
            {idx === breadcrumbs.length - 1 ? (
              <span aria-current="page" className="font-semibold text-neutral-900">
                {crumb.text}
              </span>
            ) : (
              <>
                <Link href={crumb.href} className="hover:underline">
                  {crumb.text}
                </Link>
                <span className="mx-1">/</span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
