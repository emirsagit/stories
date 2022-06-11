import React from "react";
import Image from "next/image";
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/">
      <a><Image src="/images/logo.png" alt="Logo" width={150} height={150} /></a>
    </Link>
  );
}
