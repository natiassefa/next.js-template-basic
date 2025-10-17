#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { execSync } = require("child_process");

// Configuration for future extensibility
const config = {
  projectName: "",
  componentLibrary: null,
  // Future options will go here
  // cssFramework: null,
};

// Component library options
const COMPONENT_LIBRARIES = {
  none: {
    name: "None",
    description: "Skip component library installation",
  },
  heroui: {
    name: "Hero UI",
    description: "React components built on top of Tailwind CSS",
    packages: ["@heroui/react", "framer-motion"],
    devPackages: [],
    setupInstructions: `
Hero UI has been installed! To use it:

1. Import components in your app:
   import { Button, Card } from '@heroui/react';

2. Check the documentation: https://www.heroui.com/docs
`,
  },
  shadcn: {
    name: "shadcn/ui",
    description: "Beautifully designed components built with Radix UI and Tailwind CSS",
    packages: [],
    devPackages: [],
    setupInstructions: `
shadcn/ui has been initialized! To add components:

1. Run: npx shadcn@latest add button
2. Run: npx shadcn@latest add card
3. Import and use: import { Button } from "@/components/ui/button"

Check the documentation: https://ui.shadcn.com/docs
`,
    customSetup: async () => {
      console.log("\n📦 Initializing shadcn/ui...\n");
      try {
        execSync("npx shadcn@latest init -y -d", {
          stdio: "inherit",
          cwd: process.cwd(),
        });
      } catch (error) {
        console.error("⚠️  shadcn/ui initialization had issues. You may need to run 'npx shadcn@latest init' manually.");
      }
    },
  },
  chakra: {
    name: "Chakra UI",
    description: "Simple, modular and accessible component library",
    packages: ["@chakra-ui/react", "@emotion/react", "@emotion/styled", "framer-motion"],
    devPackages: [],
    setupInstructions: `
Chakra UI has been installed! To use it:

1. Wrap your app with ChakraProvider in layout.tsx
2. Import components: import { Button, Box } from '@chakra-ui/react';

Check the documentation: https://chakra-ui.com/docs
`,
  },
};

// Files that need to be updated with project name
const filesToUpdate = [
  "README.md",
  "package.json",
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/app/about/page.tsx",
  "src/app/dashboard/settings/page.tsx",
];

// Text replacements based on project name
function getReplacements(projectName) {
  const titleCase = projectName
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  const kebabCase = projectName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  return [
    // README.md replacements
    {
      from: "# Next.js Template",
      to: `# ${titleCase}`,
    },
    {
      from: "A comprehensive Next.js template with routing, API routes, loading states, and error boundaries.",
      to: `${titleCase} - Built with Next.js`,
    },
    // Package.json replacements
    {
      from: '"name": "next.js-template-basic"',
      to: `"name": "${kebabCase}"`,
    },
    // Layout.tsx replacements
    {
      from: 'default: "Next.js Template"',
      to: `default: "${titleCase}"`,
    },
    {
      from: 'template: "%s | Next.js Template"',
      to: `template: "%s | ${titleCase}"`,
    },
    {
      from: "keywords: [",
      to: "keywords: [", // Marker for next replacement
    },
    {
      from: '["Next.js", "React", "TypeScript", "Template"]',
      to: '["Next.js", "React", "TypeScript"]',
    },
    // Page.tsx replacements
    {
      from: "Next.js Template",
      to: titleCase,
    },
    {
      from: "A comprehensive starter template with routing, API routes, loading\n            states, and error boundaries.",
      to: `Welcome to ${titleCase}`,
    },
    // About page replacements
    {
      from: "About page for the Next.js template",
      to: `About ${titleCase}`,
    },
    {
      from: "About This Template",
      to: `About ${titleCase}`,
    },
    {
      from: "This is a comprehensive Next.js template demonstrating best practices for routing, API routes, loading states, and error handling.",
      to: `${titleCase} is a Next.js application.`,
    },
    // Settings page replacement
    {
      from: "Note: This is a template page. Form inputs are disabled for demonstration.",
      to: "Configure your application settings here.",
    },
  ];
}

// Update a single file with replacements
function updateFile(filePath, replacements) {
  const fullPath = path.join(process.cwd(), filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(fullPath, "utf8");
  let modified = false;

  replacements.forEach(({ from, to }) => {
    if (content.includes(from)) {
      content = content.replace(new RegExp(escapeRegex(from), "g"), to);
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(fullPath, content, "utf8");
    console.log(`✅ Updated: ${filePath}`);
    return true;
  } else {
    console.log(`ℹ️  No changes needed: ${filePath}`);
    return false;
  }
}

// Escape special regex characters
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Prompt user for input
function prompt(question) {
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

// Display component library menu and get selection
async function selectComponentLibrary() {
  console.log("\n📚 Select a Component Library:\n");

  const options = Object.entries(COMPONENT_LIBRARIES);
  options.forEach(([key, lib], index) => {
    console.log(`  ${index + 1}. ${lib.name}`);
    console.log(`     ${lib.description}\n`);
  });

  while (true) {
    const answer = await prompt("Enter your choice (1-4): ");
    const choice = parseInt(answer);

    if (choice >= 1 && choice <= options.length) {
      return options[choice - 1][0];
    }

    console.log("❌ Invalid choice. Please enter a number between 1 and 4.\n");
  }
}

// Install packages using npm
function installPackages(packages, isDev = false) {
  if (!packages || packages.length === 0) return;

  const devFlag = isDev ? " --save-dev" : "";
  const packageList = packages.join(" ");

  console.log(`\n📦 Installing ${isDev ? "dev " : ""}packages: ${packageList}\n`);

  try {
    execSync(`npm install${devFlag} ${packageList}`, {
      stdio: "inherit",
      cwd: process.cwd(),
    });
    console.log(`\n✅ Packages installed successfully!\n`);
  } catch (error) {
    console.error(`\n❌ Error installing packages. Please try manually:\n   npm install${devFlag} ${packageList}\n`);
    process.exit(1);
  }
}

// Setup component library
async function setupComponentLibrary(libraryKey) {
  if (libraryKey === "none") {
    console.log("\n⏭️  Skipping component library installation.\n");
    return;
  }

  const library = COMPONENT_LIBRARIES[libraryKey];
  console.log(`\n🎨 Setting up ${library.name}...\n`);

  // Install regular packages
  if (library.packages && library.packages.length > 0) {
    installPackages(library.packages, false);
  }

  // Install dev packages
  if (library.devPackages && library.devPackages.length > 0) {
    installPackages(library.devPackages, true);
  }

  // Run custom setup if provided
  if (library.customSetup) {
    await library.customSetup();
  }

  // Display setup instructions
  if (library.setupInstructions) {
    console.log("\n" + "=".repeat(60));
    console.log(library.setupInstructions);
    console.log("=".repeat(60) + "\n");
  }
}

// Validate project name
function isValidProjectName(name) {
  if (!name || name.trim().length === 0) {
    return false;
  }
  // Allow letters, numbers, spaces, hyphens, and underscores
  return /^[a-zA-Z0-9\s_-]+$/.test(name);
}

// Main setup function
async function setup() {
  console.log("\n🚀 Next.js Template Setup\n");
  console.log("This script will customize the template for your project.\n");

  // Get project name from command line args or prompt
  let projectName = process.argv[2];

  if (!projectName) {
    projectName = await prompt("Enter your project name: ");
  }

  if (!isValidProjectName(projectName)) {
    console.error(
      "\n❌ Error: Invalid project name. Use only letters, numbers, spaces, hyphens, and underscores.\n"
    );
    process.exit(1);
  }

  config.projectName = projectName;

  console.log(`\n📝 Setting up project: "${projectName}"\n`);

  // Get replacements
  const replacements = getReplacements(projectName);

  // Update all files
  let updatedCount = 0;
  for (const file of filesToUpdate) {
    if (updateFile(file, replacements)) {
      updatedCount++;
    }
  }

  console.log(
    `\n✅ Updated ${updatedCount} file(s) with your project name.\n`
  );

  // Select and setup component library
  const componentLibrary = await selectComponentLibrary();
  config.componentLibrary = componentLibrary;

  await setupComponentLibrary(componentLibrary);

  console.log("\n" + "=".repeat(60));
  console.log("✨ Setup complete!\n");
  console.log("Next steps:");
  if (componentLibrary === "none") {
    console.log("  1. Run: npm install");
    console.log("  2. Run: npm run dev");
    console.log("  3. Start building your application!");
  } else {
    console.log("  1. Review the component library setup instructions above");
    console.log("  2. Run: npm run dev");
    console.log("  3. Start building your application!");
  }
  console.log("=".repeat(60) + "\n");
}

// Run setup
setup().catch((error) => {
  console.error("\n❌ Error during setup:", error.message);
  process.exit(1);
});
