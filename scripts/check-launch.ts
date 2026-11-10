import { resume } from "../content-seed/resume";
import { supportsYearsClaim } from "../src/lib/launch";

const force = process.argv.includes("--force");

// Only production builds are Launch, so previews and local builds skip this check.
if (process.env.VERCEL_ENV !== "production" && !force) {
  console.log("Launch check skipped: this isn't a production build.");
} else if (!supportsYearsClaim(resume.experience)) {
  console.error(
    '\nLaunch check failed: the site claims "8+ years", but no Experience in ' +
      "content-seed/resume.ts started 8 or more years ago.\n",
  );
  process.exit(1);
} else {
  console.log("Launch check passed.");
}
