import type { CollectionConfig } from "payload";
import { HeroBlock } from "../blocks/Hero";
import { StatsBlock } from "../blocks/Stats";
import { ContentBlock } from "../blocks/Content";
export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Сторінка", plural: "Сторінки" },
  admin: { useAsTitle: "title", group: "Контент" },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "layout", type: "blocks", blocks: [HeroBlock, StatsBlock, ContentBlock], label: "Блоки сторінки" },
    { name: "publishedAt", type: "date", label: "Дата публікації" }
  ],
  versions: { drafts: true }
};
