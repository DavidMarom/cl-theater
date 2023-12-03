"use client";

import React from "react";
import { HeaderWrapper,HeaderItem } from "./Header.style";
import Link from "next/link";

export default function Header() {

  return (
    <div className="header">
      <HeaderWrapper>
        <Link href="/Home"><HeaderItem>Home</HeaderItem></Link>
        <Link href="/Admin"><HeaderItem>Admin</HeaderItem></Link>
      </HeaderWrapper>
    </div>
  );
}
