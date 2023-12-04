"use client"

import Link from "next/link"

export default function Home() {
  return (
    <>
      <div className="v-space" />

      <div className="row">
        <h1>Welcome</h1>
      </div>

      <div className="row">
        <Link href="/Home">Go to the movie list</Link>
      </div>
    </>
  )
}
