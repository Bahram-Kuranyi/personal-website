import { notFound } from "next/navigation";
import { isLocale } from "./site";

export function requireLocale(value: string) {
  if (!isLocale(value)) notFound();
  return value;
}
