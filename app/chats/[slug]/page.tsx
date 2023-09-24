"use client";

import { Chat } from "../../Chat";

export default function Page({ params }: { params: { slug: string } }) {
  return <Chat id={params.slug} />;
}
