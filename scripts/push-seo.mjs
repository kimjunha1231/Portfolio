import fs from "fs";
import path from "path";
import matter from "gray-matter";
import crypto from "crypto";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kimjunha.vercel.app";
const INDEXNOW_KEY = "f938a7c631244ab8b548231804918eef";
const CONTENT_DIRS = ["content/blog", "content/projects"];

function getAllUrls() {
  const urls = [
    SITE_URL,
    `${SITE_URL}/blog`,
    `${SITE_URL}/projects`,
  ];

  for (const dir of CONTENT_DIRS) {
    const fullDirPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullDirPath)) continue;

    const files = fs.readdirSync(fullDirPath).filter(f => f.endsWith(".mdx") || f.endsWith(".md"));
    for (const file of files) {
      const filePath = path.join(fullDirPath, file);
      const { data } = matter(fs.readFileSync(filePath, "utf8"));
      if (data.published === false) continue;

      const slug = file.replace(/\.mdx?$/, "");
      const type = dir.includes("blog") ? "blog" : "projects";
      urls.push(`${SITE_URL}/${type}/${slug}`);
    }
  }

  return urls;
}

async function pushIndexNow(urls) {
  console.log("\n🚀 Sending URLs to IndexNow (Naver, Bing, Seznam, Yandex)...");
  const host = new URL(SITE_URL).hostname;
  const payload = {
    host: host,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  const endpoints = [
    "https://api.indexnow.org/indexnow",
    "https://searchadvisor.naver.com/indexnow"
  ];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      });

      if (res.ok || res.status === 202) {
        console.log(`✅ Success IndexNow push -> ${endpoint} (Status: ${res.status})`);
      } else {
        console.warn(`⚠️ IndexNow push returned status ${res.status} for ${endpoint}`);
      }
    } catch (err) {
      console.warn(`⚠️ Failed IndexNow push -> ${endpoint}:`, err.message);
    }
  }
}

function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function getGoogleAccessToken(serviceAccountKeyJson) {
  const sa = JSON.parse(serviceAccountKeyJson);
  const now = Math.floor(Date.now() / 1000);

  const header = { alg: "RS256", typ: "JWT" };
  const claimSet = {
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/indexing",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedClaim = base64UrlEncode(JSON.stringify(claimSet));
  const signatureInput = `${encodedHeader}.${encodedClaim}`;

  const signer = crypto.createSign("RSA-SHA256");
  signer.update(signatureInput);
  const signature = base64UrlEncode(signer.sign(sa.private_key));

  const jwt = `${signatureInput}.${signature}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const tokenData = await tokenRes.json();
  return tokenData.access_token;
}

async function pushGoogleIndexing(urls) {
  const saKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY || process.env.GOOGLE_INDEXING_CREDENTIALS;
  if (!saKey) {
    console.log("\n💡 Google Indexing API credentials not found in env (GOOGLE_SERVICE_ACCOUNT_KEY). Skipping Google push.");
    console.log("   (Add GOOGLE_SERVICE_ACCOUNT_KEY in Vercel / GitHub Secrets to activate Google Indexing API auto-push)");
    return;
  }

  console.log("\n🚀 Sending URLs to Google Indexing API...");
  try {
    const accessToken = await getGoogleAccessToken(saKey);
    for (const url of urls) {
      const res = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          url: url,
          type: "URL_UPDATED",
        }),
      });

      if (res.ok) {
        console.log(`✅ Google Indexing success: ${url}`);
      } else {
        console.warn(`⚠️ Google Indexing warning for ${url}: status ${res.status}`);
      }
    }
  } catch (err) {
    console.error("❌ Google Indexing API failed:", err.message);
  }
}

async function main() {
  console.log("🔔 Starting Automated SEO Indexing Notification...");
  const urls = getAllUrls();
  console.log(`📌 Found ${urls.length} URLs to notify.`);

  await pushIndexNow(urls);
  await pushGoogleIndexing(urls);

  console.log("\n✨ Automated Indexing Push completed!\n");
}

main();
