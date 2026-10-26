import type { Block } from "payload";
export const StatsBlock: Block = {
  slug: "stats",
  labels: { singular: "Картки показників", plural: "Картки показників" },
  fields: [{
    name: "items", type: "array", minRows: 1, fields: [
      { name: "value", type: "text", required: true, label: "Значення" },
      { name: "label", type: "text", required: true, label: "Підпис" }
    ]
  }]
};
