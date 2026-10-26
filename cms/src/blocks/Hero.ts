import type { Block } from "payload";
export const HeroBlock: Block = {
  slug: "hero",
  labels: { singular: "Головний банер", plural: "Головні банери" },
  fields: [
    { name: "eyebrow", type: "text", label: "Надзаголовок" },
    { name: "title", type: "text", required: true, label: "Заголовок" },
    { name: "description", type: "textarea", label: "Опис" },
    { name: "buttonLabel", type: "text", label: "Текст кнопки" },
    { name: "buttonUrl", type: "text", label: "Посилання кнопки" }
  ]
};
