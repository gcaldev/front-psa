import React from "react";
import Link from "next/link";

export default function SuccessLayout({
  successMessage,
  primaryText,
  secondaryText,
  primaryLink,
  secondaryLink,
}: {
  successMessage: string;
  primaryText: string;
  secondaryText: string;
  primaryLink: string;
  secondaryLink: string;
}) {
  return (
    <div className="flex h-full flex-col justify-center items-center bg-white">
      <img src="/ok.jpg" alt="Ok" />

      <h1 className="text-4xl my-4 font-bold">{successMessage}</h1>
      <Link
        className="text-xl bg-sky-500 my-4	hover:bg-cyan-600 text-white font-bold py-1 px-4 rounded w-[300px] text-center"
        href={primaryLink}
      >
        {primaryText}
      </Link>
      <Link
        className="text-xl bg-transparent hover:text-sky-700 text-sky-500 font-bold py-1 px-4 rounded"
        href={secondaryLink}
      >
        {secondaryText}
      </Link>
    </div>
  );
}
