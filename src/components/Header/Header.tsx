"use client";

import React from "react";
import { HeaderWrapper } from "./Header.style";
import Link from "next/link";

export default function Header() {

  return (
    <div className="header">
      <HeaderWrapper>
        <Link href="/Home"><div>Home</div></Link>
      </HeaderWrapper>
    </div>
  );
}
