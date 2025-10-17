# SEO Template File Guide

This guide explains how to use the SEO template file for automated SEO configuration.

## Overview

The SEO template file (`seo-template.json`) allows you to pre-configure all SEO settings without having to answer interactive prompts. This is especially useful for:

- **CI/CD pipelines** - Automate SEO setup in deployment workflows
- **Multiple projects** - Reuse configurations across projects
- **Team collaboration** - Share SEO configurations with your team
- **Quick setup** - Skip interactive prompts when you already know your settings

## Template File Format

The template is a JSON file with the following structure:

```json
{
  "siteName": "My Awesome Site",
  "siteTagline": "Building amazing things with Next.js",
  "siteUrl": "https://example.com",
  "author": "Your Name or Company",
  "locale": "en",
  "businessType": "saas",
  "keywords": ["nextjs", "react", "typescript", "web development"],
  "social": {
    "twitter": "yourusername",
    "facebook": "https://facebook.com/yourpage",
    "linkedin": "https://linkedin.com/in/yourprofile"
  }
}
```

## Field Descriptions

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `siteName` | string | Your site/company name | "My Awesome Site" |
| `siteTagline` | string | Short description of your site | "Building amazing things" |
| `siteUrl` | string | Production URL (no trailing slash) | "https://example.com" |
| `author` | string | Author or company name | "John Doe" or "Acme Corp" |
| `businessType` | string | Type of business/site | See options below |
| `keywords` | array | 3-5 primary keywords | ["nextjs", "react"] |

### Optional Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `locale` | string | Primary language code | "en", "es", "fr" |
| `social.twitter` | string | Twitter/X handle (no @) | "yourusername" |
| `social.facebook` | string | Facebook page URL | "https://facebook.com/page" |
| `social.linkedin` | string | LinkedIn profile/company URL | "https://linkedin.com/in/user" |

### Business Type Options

- `blog` - Blog or content site
- `ecommerce` - E-commerce store
- `portfolio` - Personal or professional portfolio
- `saas` - SaaS or web application
- `corporate` - Corporate or business website
- `other` - Other type of website

## Usage Methods

### Method 1: Command Line Argument

Pass the template file directly when running the script:

```bash
npm run seo-setup -- --template=my-seo-config.json
```

This will load the configuration from your file and proceed directly to setup (after showing a confirmation).

### Method 2: Interactive Prompt

Run the script normally and choose to use a template when prompted:

```bash
npm run seo-setup
```

The script will ask:
```
Do you have a template file? (y/N):
```

Type `y` and then enter the path to your template file.

### Method 3: Integrated Setup

When running the main setup script, you'll be prompted for SEO setup:

```bash
npm run setup
```

If you choose to set up SEO, you can use a template file during that flow.

## Creating Your Template

### Option 1: Copy the Provided Template

```bash
cp seo-template.json my-seo-config.json
```

Then edit `my-seo-config.json` with your information.

### Option 2: Create From Scratch

Create a new JSON file with the required fields:

```bash
cat > my-seo-config.json << 'EOF'
{
  "siteName": "My Site",
  "siteTagline": "My site description",
  "siteUrl": "https://mysite.com",
  "author": "My Name",
  "locale": "en",
  "businessType": "blog",
  "keywords": ["keyword1", "keyword2"],
  "social": {}
}
EOF
```

## Validation

The script validates your template file before using it. It checks:

- ✅ All required fields are present
- ✅ Fields have correct types (string, array, etc.)
- ✅ `businessType` is one of the valid options
- ✅ JSON syntax is valid

If validation fails, the script will show specific error messages and fall back to interactive mode.

## Example Templates

### Blog Template

```json
{
  "siteName": "My Tech Blog",
  "siteTagline": "Thoughts on software development and technology",
  "siteUrl": "https://myblog.com",
  "author": "John Developer",
  "locale": "en",
  "businessType": "blog",
  "keywords": ["software", "development", "technology", "tutorials"],
  "social": {
    "twitter": "johndeveloper"
  }
}
```

### SaaS Template

```json
{
  "siteName": "CloudApp Pro",
  "siteTagline": "The best cloud solution for your business",
  "siteUrl": "https://cloudapp.io",
  "author": "CloudApp Inc",
  "locale": "en",
  "businessType": "saas",
  "keywords": ["cloud", "saas", "business", "productivity"],
  "social": {
    "twitter": "cloudapppro",
    "linkedin": "https://linkedin.com/company/cloudapp"
  }
}
```

### E-commerce Template

```json
{
  "siteName": "Fashion Store",
  "siteTagline": "Premium fashion for everyone",
  "siteUrl": "https://fashionstore.com",
  "author": "Fashion Store Ltd",
  "locale": "en",
  "businessType": "ecommerce",
  "keywords": ["fashion", "clothing", "online store", "apparel"],
  "social": {
    "twitter": "fashionstore",
    "facebook": "https://facebook.com/fashionstore",
    "linkedin": "https://linkedin.com/company/fashionstore"
  }
}
```

## Tips

1. **Keep your template in version control** - But use `.gitignore` for sensitive URLs
2. **Use different templates for different environments** - e.g., `seo-staging.json`, `seo-production.json`
3. **Validate your template** - Run the script to ensure your template is valid before using it in CI/CD
4. **Don't commit sensitive data** - The template is already gitignored if it matches `*-seo-config.json`
5. **Document your choices** - Add comments in your project README about why you chose certain keywords or settings

## Troubleshooting

### Template Not Found

```
❌ Template file not found: my-seo-config.json
```

**Solution**: Make sure the file exists and the path is correct. Use relative paths from your project root.

### Validation Errors

```
❌ Template validation errors:
  - siteName is required and must be a string
```

**Solution**: Check that all required fields are present and have the correct format. Refer to the field descriptions above.

### JSON Syntax Error

```
❌ Error loading template file: Unexpected token
```

**Solution**: Validate your JSON syntax. Use a JSON validator or check for:
- Missing commas
- Extra commas
- Missing quotes
- Unclosed brackets

## Related Documentation

- [Main SEO Guide](./SEO_GUIDE.md) - Complete SEO setup and usage guide
- [README](../README.md) - Project overview and setup instructions

---

Need help? Check the main documentation or open an issue on GitHub.
