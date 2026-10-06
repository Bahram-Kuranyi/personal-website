import type { Locale } from "@/lib/site";
import { en } from "./en";
import { de } from "./de";
export const dictionaries = { en, de };
export const getDictionary = (locale: Locale) => dictionaries[locale];
