import type { CollectionConfig } from "payload";
export const Trainings: CollectionConfig = {
  slug: "trainings",
  labels: { singular: "Тренування", plural: "Тренування" },
  admin: { useAsTitle: "title", defaultColumns: ["title", "date", "focus", "duration"], group: "Планування" },
  fields: [
    { name: "title", type: "text", required: true, label: "Назва" },
    { name: "date", type: "date", required: true, label: "Дата та час", admin: { date: { pickerAppearance: "dayAndTime" } } },
    { name: "duration", type: "number", required: true, min: 15, max: 300, defaultValue: 90, label: "Тривалість (хв)" },
    { name: "focus", type: "text", required: true, label: "Фокус тренування" },
    { name: "location", type: "text", defaultValue: "Основний зал", label: "Місце" },
    { name: "notes", type: "textarea", label: "Нотатки тренера" },
    { name: "intensity", type: "select", defaultValue: "medium", options: [
      { label: "Низька", value: "low" }, { label: "Середня", value: "medium" }, { label: "Висока", value: "high" }
    ] }
  ]
};
