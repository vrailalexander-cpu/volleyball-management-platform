import type { GlobalConfig } from "payload";
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Налаштування сайту",
  admin: { group: "Керування" },
  fields: [
    { name: "teamName", type: "text", required: true, defaultValue: "VOLLEY PRO", label: "Назва команди" },
    { name: "tagline", type: "text", defaultValue: "Працюємо як команда. Перемагаємо разом.", label: "Слоган" },
    { name: "contactEmail", type: "email", label: "Контактний email" }
  ]
};
