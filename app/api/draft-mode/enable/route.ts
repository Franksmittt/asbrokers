import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/lib/client";

const token = process.env.SANITY_VIEWER_TOKEN;

export const { GET } = defineEnableDraftMode({
  client: token ? client.withConfig({ token }) : client,
});
