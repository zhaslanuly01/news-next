import { Category, DateFilter } from "./news-filters.types";

export const NEWS_CATEGORIES = [
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
] as const;

export const DATE_FILTERS = ["all", "today", "7days"] as const;

export const CATEGORY_LABELS: Record<Category, string> = {
  business: "Бизнес",
  entertainment: "Развлечения",
  health: "Здоровье",
  science: "Наука",
  sports: "Спорт",
  technology: "Технологии",
};

export const DATE_FILTER_LABELS: Record<DateFilter, string> = {
  all: "Все даты",
  today: "Сегодня",
  "7days": "7 дней",
};

export const ALL_CATEGORIES_LABEL = "Все";
