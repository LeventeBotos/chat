"use client";

import { Chat } from "../../Chat";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="w-full flex flex-row overflow-x-hidden p-0 m-0">
      <Chat id={params.slug} />{" "}
    </div>
  );
}
