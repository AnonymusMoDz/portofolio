import { existsSync, readFileSync } from "node:fs";
import { HERO_OUTFITS } from "./site";
import { describe, expect, it } from "vitest";
import { resume } from "@seed/resume";
import { buildContactMailto } from "./contact";
import { estimateReadMinutes, formatFullDate, formatPeriod, formatPhone, repeatToFill, shortSkillNames } from "./format";
import { supportsYearsClaim } from "./launch";
import { buildNav } from "./navigation";
import { techMentioned } from "./tech-mentions";

describe("launch check", () => {
  const now = new Date("2026-11-03T00:00:00Z");

  it("passes on the resume's roles, which start in 2017", () => {
    expect(supportsYearsClaim(resume.experience, now)).toBe(true);
  });

  it("passes once Experience started 8 or more years ago", () => {
    expect(supportsYearsClaim([{ start: "2018-11-03" }], now)).toBe(true);
    expect(supportsYearsClaim([{ start: "2018-11-04" }], now)).toBe(false);
  });

  it("fails with no Experience", () => {
    expect(supportsYearsClaim([], now)).toBe(false);
  });
});

describe("Hidden Sections", () => {
  it("leaves Blogs out of the nav when empty", () => {
    const hrefs = buildNav(resume).map((link) => link.href);
    expect(hrefs).not.toContain("/blogs");
  });

  it("shows Work for Selected Work alone, and drops it when there's no work at all", () => {
    expect(buildNav(resume).map((link) => link.href)).toContain("/projects");
    const noWork = buildNav({ ...resume, selectedWork: [], projects: [] });
    expect(noWork.map((link) => link.href)).not.toContain("/projects");
  });

  it("adds Blogs to the nav once there's a post", () => {
    const hrefs = buildNav({
      ...resume,
      posts: [{ title: "B", slug: "b", excerpt: "E", publishedAt: "2026-01-01" }],
    }).map((link) => link.href);
    expect(hrefs).toContain("/blogs");
  });
});

describe("tech chips", () => {
  it("lists only technologies a role's highlights name", () => {
    expect(techMentioned(["Built with React Native and Pinecone."])).toEqual(["React Native", "Pinecone"]);
    expect(techMentioned(["Used MySQL and SQL."])).toEqual(["MySQL", "SQL"]);
    expect(techMentioned(undefined)).toEqual([]);
  });
});

describe("contact form", () => {
  it("builds an encoded mailto link with the visitor's details", () => {
    const link = buildContactMailto("me@example.com", { name: "A & B", email: "a@b.co", message: "Hi?" });
    expect(link.startsWith("mailto:me@example.com?subject=")).toBe(true);
    expect(link).toContain(encodeURIComponent("Portfolio message from A & B"));
    expect(decodeURIComponent(link.split("body=")[1])).toBe("Hi?\n\nA & B\na@b.co");
  });
});

describe("formatting", () => {
  it("repeats short lists in whole rounds, for the slider", () => {
    expect(repeatToFill(["a"], 3)).toEqual(["a", "a", "a"]);
    expect(repeatToFill(["a", "b"], 3)).toEqual(["a", "b", "a", "b"]);
    expect(repeatToFill(["a", "b", "c"], 2)).toEqual(["a", "b", "c"]);
    expect(repeatToFill([], 3)).toEqual([]);
  });

  it("estimates read time, with a one-minute minimum", () => {
    expect(estimateReadMinutes(undefined)).toBe(1);
    const words = Array.from({ length: 450 }, () => "word").join(" ");
    expect(estimateReadMinutes([words])).toBe(3);
  });

  it("formats a full date", () => {
    expect(formatFullDate("2026-02-27")).toBe("February 27, 2026");
  });

  it("formats periods, phone numbers and short skill names", () => {
    expect(formatPeriod("2024-02-01")).toBe("Feb 2024 – Present");
    expect(formatPeriod("2022-03-01", "2024-01-31")).toBe("Mar 2022 – Jan 2024");
    expect(formatPhone("+491637989671")).toBe("+49 163 798 9671");
    expect(shortSkillNames(["AWS (EC2, S3)", "AWS", "Docker"])).toEqual(["AWS", "Docker"]);
  });
});

describe("resume content", () => {
  it("has the contact details from the resume", () => {
    expect(resume.profile.email).toBe("luigichelini02@gmail.com");
    expect(resume.profile.phone).toBe("+491637989671");
    expect(resume.profile.linkedin).toContain("linkedin.com/in/luigi-chelini-bba4923bb");
  });

  it("has a profile photo, and the file exists", () => {
    expect(resume.profile.photoUrl).toBe("/photos/luigi-chelini.jpg");
    expect(existsSync(`public${resume.profile.photoUrl}`)).toBe(true);
    expect(HERO_OUTFITS).toHaveLength(4);
    for (const photo of HERO_OUTFITS) expect(existsSync(`public${photo}`)).toBe(true);
  });

  it("has no reviews until Luigi has real ones", () => {
    expect(resume.testimonials).toEqual([]);
  });

  it("has all 8 technical skill categories", () => {
    expect(resume.skills).toHaveLength(8);
  });

  it("doesn't include any reference site details", () => {
    const text = readFileSync("content-seed/resume.ts", "utf8").toLowerCase();
    for (const term of ["naseem", "rawalpindi", "bulkup", "visric", "ivan", "torrente", "globant", "infosys", "interpublic"]) {
      expect(text).not.toContain(term);
    }
  });
});
