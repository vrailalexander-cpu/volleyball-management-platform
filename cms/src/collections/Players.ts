import type { CollectionConfig } from "payload";
export const Players: CollectionConfig = {
  slug: "players",
  labels: { singular: "Гравець", plural: "Гравці" },
  admin: { useAsTitle: "fullName", defaultColumns: ["fullName", "number", "position", "status"], group: "Команда" },
  fields: [
    { name: "fullName", type: "text", required: true, label: "ПІБ" },
    { name: "number", type: "number", required: true, min: 1, max: 99, label: "Ігровий номер" },
    { name: "position", type: "select", required: true, options: [
      { label: "Зв’язуючий", value: "setter" }, { label: "Догравальник", value: "outside-hitter" },
      { label: "Діагональний", value: "opposite" }, { label: "Центральний блокуючий", value: "middle-blocker" },
      { label: "Ліберо", value: "libero" }
    ] },
    { name: "age", type: "number", min: 14, max: 60, label: "Вік" },
    { name: "status", type: "select", defaultValue: "active", options: [
      { label: "Активний", value: "active" }, { label: "Відновлення", value: "injured" }, { label: "Неактивний", value: "inactive" }
    ] },
    { name: "bio", type: "textarea", label: "Примітки" }
  ]
};
