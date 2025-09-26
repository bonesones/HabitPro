# Empty 'pages' folder for Next.js App Router compatibility with FSD

This 'pages' folder is intentionally left empty and exists at the project root to prevent Next.js from attempting to use a 'src/pages' folder as the Pages Router when the App Router is in use.

In this project, routing is managed through the Next.js App Router, and FSD pages are imported from the `src` directory where the FSD layers reside.

**Do not use this 'pages' folder for defining application routes.**
