import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIRS = ["content/blog", "content/projects"];

function checkFile(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data: frontmatter, content } = matter(fileContent);
  const fileName = path.basename(filePath);
  const issues = [];
  const warnings = [];

  // 1. Title check
  if (!frontmatter.title) {
    issues.push("Title is missing");
  } else if (frontmatter.title.length < 10) {
    warnings.push(`Title is too short (${frontmatter.title.length} chars, min 10)`);
  } else if (frontmatter.title.length > 70) {
    warnings.push(`Title is too long (${frontmatter.title.length} chars, max 70)`);
  }

  // 2. Description check
  if (!frontmatter.description) {
    issues.push("Meta description is missing");
  } else if (frontmatter.description.length < 25) {
    warnings.push(`Description is too short (${frontmatter.description.length} chars, min 25)`);
  } else if (frontmatter.description.length > 160) {
    warnings.push(`Description is too long (${frontmatter.description.length} chars, max 160)`);
  }

  // 3. Image Alt text check
  const imgWithoutAltRegex = /!\[\s*\]\((.*?)\)/g;
  let match;
  let missingAltCount = 0;
  while ((match = imgWithoutAltRegex.exec(content)) !== null) {
    missingAltCount++;
  }
  if (missingAltCount > 0) {
    warnings.push(`Found ${missingAltCount} image(s) missing alt text`);
  }

  // 4. Content length check
  const textOnly = content.replace(/```[\s\S]*?```/g, "").replace(/#+\s+/g, "").trim();
  if (textOnly.length < 200) {
    warnings.push(`Content length is very short (${textOnly.length} chars)`);
  }

  // 5. Heading hierarchy check (H2/H3 check)
  const hasHeadings = /^#{2,3}\s+.+/m.test(content);
  if (!hasHeadings && textOnly.length > 500) {
    warnings.push("No H2/H3 headings found in body text");
  }

  return { fileName, issues, warnings };
}

function runSeoCheck() {
  console.log("🔍 Running Automated SEO Verification...\n");
  let totalIssues = 0;
  let totalWarnings = 0;
  let checkedFiles = 0;

  for (const dir of CONTENT_DIRS) {
    const fullDirPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullDirPath)) continue;

    const files = fs.readdirSync(fullDirPath).filter(f => f.endsWith(".mdx") || f.endsWith(".md"));
    for (const file of files) {
      checkedFiles++;
      const filePath = path.join(fullDirPath, file);
      const { fileName, issues, warnings } = checkFile(filePath);

      if (issues.length > 0 || warnings.length > 0) {
        console.log(`📄 [${dir}/${fileName}]`);
        issues.forEach(i => console.log(`  ❌ ERROR: ${i}`));
        warnings.forEach(w => console.log(`  ⚠️ WARN:  ${w}`));
        console.log("");
      }

      totalIssues += issues.length;
      totalWarnings += warnings.length;
    }
  }

  console.log("----------------------------------------");
  console.log(`✅ Analyzed ${checkedFiles} posts/projects.`);
  console.log(`📊 Summary: ${totalIssues} Errors | ${totalWarnings} Warnings`);
  
  if (totalIssues > 0) {
    console.error("\n❌ Critical SEO issues found!");
    process.exit(1);
  } else {
    console.log("\n🎉 All posts passed critical SEO checks!");
  }
}

runSeoCheck();
