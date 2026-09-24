import { chmodSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const skip = new Set(["node_modules", ".next", ".git"]);

function walk(dir) {
  try {
    chmodSync(dir, 0o755);
  } catch {
    /* Windows / locked files */
  }
  let entries = [];
  try {
    entries = readdirSync(dir);
  } catch (error) {
    console.warn("skip", dir, error.code || error.message);
    return;
  }
  for (const name of entries) {
    if (skip.has(name)) continue;
    const path = join(dir, name);
    let info;
    try {
      info = statSync(path);
    } catch {
      continue;
    }
    if (info.isDirectory()) walk(path);
    else {
      try {
        chmodSync(path, 0o644);
      } catch {
        /* ignore */
      }
    }
  }
}

walk(process.cwd());
console.log("permissions normalized");
