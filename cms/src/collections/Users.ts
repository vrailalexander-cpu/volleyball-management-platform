import type { CollectionConfig } from "payload";
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: { useAsTitle: "email", group: "Керування" },
  fields: [{ name: "displayName", type: "text", label: "Ім’я" }]
};
