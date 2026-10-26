import type { CollectionConfig } from "payload";
export const Competitions: CollectionConfig = {
  slug: "competitions",
  labels: { singular: "Змагання", plural: "Змагання" },
  admin: { useAsTitle: "title", defaultColumns: ["title", "opponent", "date", "status"], group: "Змагання" },
  fields: [
    { name: "title", type: "text", required: true, label: "Назва події" },
    { name: "opponent", type: "text", required: true, label: "Суперник" },
    { name: "date", type: "date", required: true, label: "Дата матчу" },
    { name: "venue", type: "text", required: true, label: "Місце проведення" },
    { name: "status", type: "select", defaultValue: "upcoming", options: [
      { label: "Заплановано", value: "upcoming" }, { label: "Завершено", value: "completed" }, { label: "Скасовано", value: "cancelled" }
    ] },
    { name: "teamScore", type: "number", min: 0, label: "Очки команди" },
    { name: "opponentScore", type: "number", min: 0, label: "Очки суперника" },
    { name: "report", type: "textarea", label: "Звіт матчу" }
  ]
};
