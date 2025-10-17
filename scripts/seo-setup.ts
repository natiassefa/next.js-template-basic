#!/usr/bin/env node

import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

// Types
interface SeoConfig {
  siteName: string;
  siteTagline: string;
  siteUrl: string;
  author: string;
  locale: string;
  businessType: string;
  keywords: string[];
  social: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
  };
}

const BUSINESS_TYPES = [
  { key: "blog", name: "Blog/Content Site" },
  { key: "ecommerce", name: "E-commerce" },
  { key: "portfolio", name: "Portfolio" },
  { key: "saas", name: "SaaS/Web App" },
  { key: "corporate", name: "Corporate/Business" },
  { key: "other", name: "Other" },
];

// Prompt user for input
function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

// Get project name from package.json
function getProjectName(): string {
  try {
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8")
    );
    return packageJson.name || "my-app";
  } catch {
    return "my-app";
  }
}

// Convert kebab-case to Title Case
function toTitleCase(str: string): string {
  return str
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// Validate SEO config
function validateSeoConfig(config: any): config is SeoConfig {
  const errors: string[] = [];

  if (!config.siteName || typeof config.siteName !== "string") {
    errors.push("siteName is required and must be a string");
  }
  if (!config.siteTagline || typeof config.siteTagline !== "string") {
    errors.push("siteTagline is required and must be a string");
  }
  if (!config.siteUrl || typeof config.siteUrl !== "string") {
    errors.push("siteUrl is required and must be a string");
  }
  if (!config.author || typeof config.author !== "string") {
    errors.push("author is required and must be a string");
  }
  if (!config.businessType || typeof config.businessType !== "string") {
    errors.push("businessType is required and must be a string");
  }

  const validBusinessTypes = ["blog", "ecommerce", "portfolio", "saas", "corporate", "other"];
  if (config.businessType && !validBusinessTypes.includes(config.businessType)) {
    errors.push(`businessType must be one of: ${validBusinessTypes.join(", ")}`);
  }

  if (!Array.isArray(config.keywords)) {
    errors.push("keywords must be an array");
  }

  if (errors.length > 0) {
    console.error("\n❌ Template validation errors:\n");
    errors.forEach((error) => console.error(`  - ${error}`));
    console.error("");
    return false;
  }

  return true;
}

// Load config from template file
function loadTemplateFile(filePath: string): SeoConfig | null {
  try {
    const fullPath = path.isAbsolute(filePath)
      ? filePath
      : path.join(process.cwd(), filePath);

    if (!fs.existsSync(fullPath)) {
      console.error(`\n❌ Template file not found: ${filePath}\n`);
      return null;
    }

    const fileContent = fs.readFileSync(fullPath, "utf8");
    const config = JSON.parse(fileContent);

    // Remove comments field if present
    delete config._comments;
    delete config.$schema;

    if (!validateSeoConfig(config)) {
      return null;
    }

    // Set defaults
    config.locale = config.locale || "en";
    config.social = config.social || {};

    return config as SeoConfig;
  } catch (error) {
    console.error(`\n❌ Error loading template file: ${error}\n`);
    return null;
  }
}

// Check for template file argument
function getTemplateFromArgs(): string | null {
  const args = process.argv.slice(2);
  const templateArg = args.find(arg => arg.startsWith("--template="));

  if (templateArg) {
    return templateArg.split("=")[1];
  }

  return null;
}

// Collect SEO information from user
async function collectSeoInfo(): Promise<SeoConfig> {
  const projectName = getProjectName();
  const defaultSiteName = toTitleCase(projectName);

  console.log("\n📋 Please provide the following information:\n");

  const siteName = (await prompt(`Site name (${defaultSiteName}): `)) || defaultSiteName;
  const siteTagline = await prompt("Site tagline/description: ");
  const siteUrl = await prompt("Production URL (e.g., https://example.com): ");
  const author = await prompt("Author/Company name: ");
  const locale = (await prompt("Primary language (en): ")) || "en";

  // Business type selection
  console.log("\n📊 Select your business type:\n");
  BUSINESS_TYPES.forEach((type, index) => {
    console.log(`  ${index + 1}. ${type.name}`);
  });

  let businessType = "";
  while (!businessType) {
    const choice = await prompt("\nEnter your choice (1-6): ");
    const index = parseInt(choice) - 1;
    if (index >= 0 && index < BUSINESS_TYPES.length) {
      businessType = BUSINESS_TYPES[index].key;
    } else {
      console.log("❌ Invalid choice. Please try again.");
    }
  }

  const keywordsInput = await prompt(
    "\nPrimary keywords (comma-separated, 3-5 recommended): "
  );
  const keywords = keywordsInput
    .split(",")
    .map((k) => k.trim())
    .filter((k) => k.length > 0);

  console.log("\n🔗 Social media (optional, press Enter to skip):\n");
  const twitter = await prompt("Twitter/X handle (without @): ");
  const facebook = await prompt("Facebook page URL: ");
  const linkedin = await prompt("LinkedIn URL: ");

  return {
    siteName,
    siteTagline,
    siteUrl: siteUrl.replace(/\/$/, ""), // Remove trailing slash
    author,
    locale,
    businessType,
    keywords,
    social: {
      ...(twitter && { twitter }),
      ...(facebook && { facebook }),
      ...(linkedin && { linkedin }),
    },
  };
}

// Generate SEO config file
function generateSeoConfig(config: SeoConfig): string {
  return `export const seoConfig = {
  siteName: "${config.siteName}",
  siteTagline: "${config.siteTagline}",
  siteUrl: "${config.siteUrl}",
  author: "${config.author}",
  locale: "${config.locale}",
  businessType: "${config.businessType}",
  keywords: ${JSON.stringify(config.keywords)},

  // Default metadata
  defaultTitle: "${config.siteName}",
  titleTemplate: "%s | ${config.siteName}",
  description: "${config.siteTagline}",

  // Open Graph defaults
  openGraph: {
    type: "${config.businessType === "blog" ? "website" : "website"}",
    siteName: "${config.siteName}",
    locale: "${config.locale}",
    url: "${config.siteUrl}",
    images: [
      {
        url: "${config.siteUrl}/og/default.png",
        width: 1200,
        height: 630,
        alt: "${config.siteName}",
      },
    ],
  },

  // Twitter Card defaults
  twitter: {
    card: "summary_large_image",
    site: "${config.social.twitter ? `@${config.social.twitter}` : ""}",
    creator: "${config.social.twitter ? `@${config.social.twitter}` : ""}",
  },

  // Social links
  social: {
    twitter: "${config.social.twitter || ""}",
    facebook: "${config.social.facebook || ""}",
    linkedin: "${config.social.linkedin || ""}",
  },

  // Verification codes (add your verification codes here)
  verification: {
    google: "", // Add Google Search Console verification code
    bing: "", // Add Bing Webmaster Tools verification code
    yandex: "", // Add Yandex verification code
  },
} as const;

export type SeoConfig = typeof seoConfig;
`;
}

// Generate metadata helper
function generateMetadataHelper(): string {
  return `import type { Metadata } from "next";
import { seoConfig } from "./seo.config";

interface MetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
}

export function createMetadata(options: MetadataOptions = {}): Metadata {
  const {
    title,
    description = seoConfig.description,
    image = seoConfig.openGraph.images[0].url,
    url = seoConfig.siteUrl,
    type = "website",
    publishedTime,
    modifiedTime,
    authors = [seoConfig.author],
    tags,
  } = options;

  const metadata: Metadata = {
    title,
    description,
    keywords: tags || seoConfig.keywords,
    authors: authors.map((name) => ({ name })),
    creator: seoConfig.author,
    publisher: seoConfig.author,
    metadataBase: new URL(seoConfig.siteUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      siteName: seoConfig.siteName,
      title: title || seoConfig.defaultTitle,
      description,
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || seoConfig.defaultTitle,
        },
      ],
      locale: seoConfig.locale,
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors,
        tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      site: seoConfig.twitter.site,
      creator: seoConfig.twitter.creator,
      title: title || seoConfig.defaultTitle,
      description,
      images: [image],
    },
  };

  return metadata;
}

export function generatePageTitle(title: string): string {
  return \`\${title} | \${seoConfig.siteName}\`;
}
`;
}

// Generate structured data helpers
function generateStructuredData(config: SeoConfig): string {
  return `import { seoConfig } from "./seo.config";

// Organization Schema
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "${config.businessType === "corporate" ? "Organization" : "WebSite"}",
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    description: seoConfig.siteTagline,
    ${config.social.twitter || config.social.facebook || config.social.linkedin ? `sameAs: [
      ${config.social.twitter ? `"https://twitter.com/${config.social.twitter}",` : ""}
      ${config.social.facebook ? `"${config.social.facebook}",` : ""}
      ${config.social.linkedin ? `"${config.social.linkedin}",` : ""}
    ].filter(Boolean),` : ""}
  };
}

// Website Schema
export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    description: seoConfig.siteTagline,
    inLanguage: seoConfig.locale,
  };
}

// Breadcrumb Schema
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: \`\${seoConfig.siteUrl}\${item.url}\`,
    })),
  };
}

${config.businessType === "blog" ? `
// Article Schema (for blog posts)
export function getArticleSchema(article: {
  title: string;
  description: string;
  author: string;
  publishedTime: string;
  modifiedTime?: string;
  image?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: {
      "@type": "Person",
      name: article.author,
    },
    datePublished: article.publishedTime,
    dateModified: article.modifiedTime || article.publishedTime,
    image: article.image || seoConfig.openGraph.images[0].url,
    url: \`\${seoConfig.siteUrl}\${article.url}\`,
    publisher: {
      "@type": "Organization",
      name: seoConfig.siteName,
      url: seoConfig.siteUrl,
    },
  };
}
` : ""}

// Generic JSON-LD component
export function JsonLd({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
`;
}

// Generate sitemap
function generateSitemap(config: SeoConfig): string {
  return `import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "${config.siteUrl}";

  // Add your dynamic routes here
  const routes = [
    "",
    "/about",
    "/dashboard",
    "/dashboard/settings",
  ].map((route) => ({
    url: \`\${baseUrl}\${route}\`,
    lastModified: new Date().toISOString(),
    changeFrequency: "${config.businessType === "blog" ? "daily" : "weekly"}" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return routes;
}
`;
}

// Generate robots.txt
function generateRobots(config: SeoConfig): string {
  return `import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"],
    },
    sitemap: "${config.siteUrl}/sitemap.xml",
  };
}
`;
}

// Generate manifest
function generateManifest(config: SeoConfig): string {
  return `import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "${config.siteName}",
    short_name: "${config.siteName}",
    description: "${config.siteTagline}",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
`;
}

// Create directories if they don't exist
function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Write file
function writeFile(filePath: string, content: string): void {
  const fullPath = path.join(process.cwd(), filePath);
  ensureDirectoryExists(path.dirname(fullPath));
  fs.writeFileSync(fullPath, content, "utf8");
  console.log(`✅ Created: ${filePath}`);
}

// Update layout.tsx with SEO enhancements
function updateLayout(config: SeoConfig): void {
  const layoutPath = path.join(process.cwd(), "src/app/layout.tsx");

  if (!fs.existsSync(layoutPath)) {
    console.log("⚠️  layout.tsx not found, skipping layout update");
    return;
  }

  let content = fs.readFileSync(layoutPath, "utf8");

  // Add imports if not present
  if (!content.includes("from '@/lib/seo.config'")) {
    content = content.replace(
      'import "./globals.css";',
      `import "./globals.css";\nimport { seoConfig } from "@/lib/seo.config";\nimport { getOrganizationSchema, getWebsiteSchema } from "@/lib/structured-data";`
    );
  }

  // Update metadata to use seoConfig
  const metadataRegex = /export const metadata: Metadata = \{[\s\S]*?\};/;
  const newMetadata = `export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  title: {
    default: seoConfig.defaultTitle,
    template: seoConfig.titleTemplate,
  },
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  authors: [{ name: seoConfig.author }],
  creator: seoConfig.author,
  openGraph: {
    type: "website",
    locale: seoConfig.locale,
    url: seoConfig.siteUrl,
    siteName: seoConfig.siteName,
    title: seoConfig.defaultTitle,
    description: seoConfig.description,
    images: seoConfig.openGraph.images,
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.defaultTitle,
    description: seoConfig.description,
    site: seoConfig.twitter.site,
    creator: seoConfig.twitter.creator,
    images: seoConfig.openGraph.images.map(img => img.url),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: seoConfig.verification.google,
    yandex: seoConfig.verification.yandex,
    // bing: seoConfig.verification.bing, // Uncomment when you have the code
  },
};`;

  if (metadataRegex.test(content)) {
    content = content.replace(metadataRegex, newMetadata);
  }

  // Add structured data before closing body tag
  if (!content.includes("getOrganizationSchema()")) {
    content = content.replace(
      /{children}/,
      `{children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              getOrganizationSchema(),
              getWebsiteSchema(),
            ]),
          }}
        />`
    );
  }

  fs.writeFileSync(layoutPath, content, "utf8");
  console.log("✅ Updated: src/app/layout.tsx");
}

// Generate SEO guide documentation
function generateSeoGuide(config: SeoConfig): string {
  return `# SEO Setup Guide

This guide will help you understand and use the SEO configuration in your Next.js application.

## Overview

Your site has been configured with comprehensive SEO features:

- ✅ Centralized SEO configuration
- ✅ Metadata helpers for easy page setup
- ✅ Structured data (JSON-LD) for better search engine understanding
- ✅ Automatic sitemap generation
- ✅ Robots.txt configuration
- ✅ PWA manifest for mobile SEO
- ✅ Open Graph and Twitter Card support

## Configuration

Your SEO settings are stored in \`src/lib/seo.config.ts\`. Update this file to change site-wide SEO defaults.

### Important URLs
- **Production URL**: ${config.siteUrl}
- **Sitemap**: ${config.siteUrl}/sitemap.xml
- **Robots.txt**: ${config.siteUrl}/robots.txt

## Adding Metadata to Pages

Use the \`createMetadata\` helper function to easily add SEO metadata to your pages:

\`\`\`typescript
import { createMetadata } from "@/lib/metadata-helper";

export const metadata = createMetadata({
  title: "About Us",
  description: "Learn more about our company and mission",
  url: "/about",
});

export default function AboutPage() {
  return <div>About Us</div>;
}
\`\`\`

## Adding Structured Data

For specific pages that need structured data:

\`\`\`typescript
import { getBreadcrumbSchema, JsonLd } from "@/lib/structured-data";

export default function ProductPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: "Product Name", url: "/products/product-name" },
  ];

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
      <div>Product content...</div>
    </>
  );
}
\`\`\`

${config.businessType === "blog" ? `
## Blog Post SEO

For blog posts, use the article metadata type:

\`\`\`typescript
import { createMetadata } from "@/lib/metadata-helper";
import { getArticleSchema, JsonLd } from "@/lib/structured-data";

export const metadata = createMetadata({
  title: "My Blog Post Title",
  description: "A compelling description of the blog post",
  type: "article",
  publishedTime: "2024-01-01T00:00:00Z",
  modifiedTime: "2024-01-02T00:00:00Z",
  authors: ["${config.author}"],
  tags: ["nextjs", "seo", "blog"],
});

export default function BlogPost() {
  const articleData = {
    title: "My Blog Post Title",
    description: "A compelling description",
    author: "${config.author}",
    publishedTime: "2024-01-01T00:00:00Z",
    url: "/blog/my-post",
  };

  return (
    <>
      <JsonLd data={getArticleSchema(articleData)} />
      <article>Blog content...</article>
    </>
  );
}
\`\`\`
` : ""}

## Search Console Verification

### Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property: ${config.siteUrl}
3. Choose "HTML tag" verification method
4. Copy the verification code (the content value from the meta tag)
5. Add it to \`src/lib/seo.config.ts\` in the \`verification.google\` field
6. Redeploy your site
7. Click "Verify" in Search Console

### Bing Webmaster Tools

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site
3. Get your verification code
4. Add it to \`src/lib/seo.config.ts\` in the \`verification.bing\` field
5. Uncomment the bing line in \`src/app/layout.tsx\`
6. Redeploy and verify

## Open Graph Images

Create Open Graph images for better social media sharing:

1. Create images sized **1200x630 pixels**
2. Save them in \`public/og/\` directory
3. Create at minimum:
   - \`public/og/default.png\` - Default site image
   - \`public/og/home.png\` - Homepage image
4. Reference them in your metadata:

\`\`\`typescript
export const metadata = createMetadata({
  title: "Page Title",
  image: "/og/custom-page.png",
});
\`\`\`

## PWA Icons

For better mobile SEO and PWA support, create these icons:

- \`public/icon-192.png\` (192x192 pixels)
- \`public/icon-512.png\` (512x512 pixels)
- \`public/favicon.ico\` (for browser tabs)

## Testing Your SEO

Use these tools to test your SEO implementation:

- **Meta Tags**: https://metatags.io
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
- **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/
- **Google Rich Results Test**: https://search.google.com/test/rich-results

## SEO Checklist

- [ ] Add verification codes in \`src/lib/seo.config.ts\`
- [ ] Create Open Graph images in \`public/og/\`
- [ ] Create PWA icons (192x192 and 512x512)
- [ ] Add unique metadata to all pages
- [ ] Test meta tags with metatags.io
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Set up Google Analytics (optional)
- [ ] Configure robots.txt for your needs
- [ ] Add structured data to key pages
- [ ] Test mobile-friendliness
- [ ] Check page load speed

## Best Practices

1. **Unique titles and descriptions** for each page
2. **Keep titles under 60 characters**
3. **Keep descriptions under 160 characters**
4. **Use descriptive, keyword-rich URLs**
5. **Always provide alt text for images**
6. **Keep your sitemap updated** (automatic with this setup)
7. **Use structured data** for rich search results
8. **Optimize images** before uploading
9. **Use HTTPS** (required for PWA)
10. **Monitor your Search Console** regularly

## Need Help?

- [Next.js Metadata Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Schema.org Documentation](https://schema.org/)

---

Generated by SEO Setup Script
`;
}

// Main SEO setup function
export async function runSeoSetup(templatePath?: string): Promise<void> {
  console.log("\n🔍 SEO Setup for Next.js\n");
  console.log("This script will help you set up comprehensive SEO for your site.\n");

  let config: SeoConfig | null = null;

  // Check if template file is provided
  if (templatePath) {
    console.log(`📄 Loading configuration from template: ${templatePath}\n`);
    config = loadTemplateFile(templatePath);

    if (!config) {
      console.log("Falling back to interactive mode...\n");
    }
  }

  // If no template or template failed, use interactive mode
  if (!config) {
    const useTemplate = await prompt(
      "Do you have a template file? (y/N): "
    );

    if (useTemplate.toLowerCase() === "y") {
      const templateFile = await prompt("Enter template file path (seo-template.json): ");
      const filePath = templateFile || "seo-template.json";

      config = loadTemplateFile(filePath);

      if (!config) {
        console.log("Falling back to interactive mode...\n");
      }
    }
  }

  // Collect information interactively if no template
  if (!config) {
    config = await collectSeoInfo();
  }

  // Show summary
  console.log("\n📝 Configuration Summary:\n");
  console.log(`Site Name: ${config.siteName}`);
  console.log(`URL: ${config.siteUrl}`);
  console.log(`Business Type: ${config.businessType}`);
  console.log(`Keywords: ${config.keywords.join(", ")}`);

  const confirm = await prompt("\n✅ Proceed with SEO setup? (Y/n): ");
  if (confirm.toLowerCase() === "n") {
    console.log("\n❌ SEO setup cancelled.\n");
    return;
  }

  console.log("\n🚀 Generating SEO files...\n");

  // Generate all files
  writeFile("src/lib/seo.config.ts", generateSeoConfig(config));
  writeFile("src/lib/metadata-helper.ts", generateMetadataHelper());
  writeFile("src/lib/structured-data.tsx", generateStructuredData(config));
  writeFile("src/app/sitemap.ts", generateSitemap(config));
  writeFile("src/app/robots.ts", generateRobots(config));
  writeFile("src/app/manifest.ts", generateManifest(config));

  // Update existing files
  console.log("\n🔧 Updating existing files...\n");
  updateLayout(config);

  // Create documentation
  console.log("\n📚 Generating documentation...\n");
  writeFile("docs/SEO_GUIDE.md", generateSeoGuide(config));

  // Create placeholder directories
  ensureDirectoryExists(path.join(process.cwd(), "public/og"));
  console.log("✅ Created: public/og/ (add your Open Graph images here)");

  // Success message
  console.log("\n" + "=".repeat(60));
  console.log("✨ SEO Setup Complete!\n");
  console.log("📁 Generated Files:");
  console.log("  ✅ src/lib/seo.config.ts");
  console.log("  ✅ src/lib/metadata-helper.ts");
  console.log("  ✅ src/lib/structured-data.tsx");
  console.log("  ✅ src/app/sitemap.ts");
  console.log("  ✅ src/app/robots.ts");
  console.log("  ✅ src/app/manifest.ts");
  console.log("  ✅ docs/SEO_GUIDE.md\n");
  console.log("🔧 Updated Files:");
  console.log("  ✅ src/app/layout.tsx\n");
  console.log("📝 Next Steps:");
  console.log("  1. Add verification codes in src/lib/seo.config.ts");
  console.log("  2. Create Open Graph images in public/og/");
  console.log("  3. Review docs/SEO_GUIDE.md for detailed instructions");
  console.log("  4. Test your metadata: https://metatags.io");
  console.log("=".repeat(60) + "\n");
}

// Run if called directly
if (require.main === module) {
  const templatePath = getTemplateFromArgs();
  runSeoSetup(templatePath || undefined).catch((error) => {
    console.error("\n❌ Error during SEO setup:", error.message);
    process.exit(1);
  });
}
