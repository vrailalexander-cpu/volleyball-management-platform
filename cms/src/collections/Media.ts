import type { CollectionConfig } from "payload";
export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Медіафайл", plural: "Медіафайли" },
  upload: { staticDir: "media", mimeTypes: ["image/*"] },
  admin: { useAsTitle: "alt", group: "Контент" },
  fields: [{ name: "alt", type: "text", required: true, label: "Опис зображення" }]
};
