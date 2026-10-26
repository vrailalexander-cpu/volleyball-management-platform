import type { Block } from "payload";
export const ContentBlock: Block = {
  slug: "content",
  labels: { singular: "Текстовий блок", plural: "Текстові блоки" },
  fields: [{ name: "content", type: "richText", required: true, label: "Вміст" }]
};
