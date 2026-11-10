import { resume } from "@seed/resume";
import type { SiteContent } from "./types";

/** All site content lives in content-seed/resume.ts. */
export async function getContent(): Promise<SiteContent> {
  return resume;
}
