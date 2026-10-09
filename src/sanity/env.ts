function required(value: string | undefined, name: string): string {
  if (!value?.trim()) throw new Error(`Missing ${name}. Copy .env.example to .env.local and configure your Sanity project.`);
  return value.trim();
}

export const projectId = required(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, "NEXT_PUBLIC_SANITY_PROJECT_ID");
export const dataset = required(process.env.NEXT_PUBLIC_SANITY_DATASET, "NEXT_PUBLIC_SANITY_DATASET");
export const apiVersion = required(process.env.NEXT_PUBLIC_SANITY_API_VERSION, "NEXT_PUBLIC_SANITY_API_VERSION");
