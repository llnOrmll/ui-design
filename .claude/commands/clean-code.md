---
allowed-tools: Bash(eslint:*), Bash(npm:*), Read, Edit, Grep, Glob
description: Clean and organize code without changing structure
argument-hint: [optional: specific file paths]
---

# Clean Code Command

Review and clean JavaScript/JSX code in the project. This command focuses on cleaning and organizing code without changing its structure or logic.

## Your Task

Clean the codebase by performing the following steps in order:

### 1. Determine Scope
- If arguments are provided ($ARGUMENTS), clean only those specific files
- If no arguments: clean all `.js` and `.jsx` files in `/src` (excluding `/src/trash`)

### 2. Run ESLint Auto-Fix
Execute: `npx eslint $ARGUMENTS --fix` (or `npx eslint src --fix` if no arguments)
This will automatically organize code according to project ESLint rules.

### 3. Review Each File for Unused Code
For each file in scope:
- **Unused imports**: Remove import statements that aren't used in the file
- **Unused variables**: Remove variable declarations that are never referenced (respect `^[A-Z_]` pattern for constants)
- **Dead code**: Remove commented-out code blocks that serve no documentation purpose
- **Debug statements**: Remove or comment out `console.log()`, `console.warn()`, `console.error()` used for debugging
- **Trailing whitespace**: Remove extra whitespace at end of lines
- **Empty lines**: Reduce multiple consecutive empty lines to maximum 2

### 4. Analyze Package Dependencies
- Scan all import statements across the codebase
- Compare with `package.json` dependencies
- List any packages in `package.json` that aren't imported anywhere
- **Do NOT remove packages** - only report unused ones for user decision

### 5. Summary Report
After cleaning, provide:
- Number of files cleaned
- Types of issues fixed (imports, variables, formatting, etc.)
- ESLint fixes applied
- List of potentially unused packages (if any)
- Any issues that require manual review

## Critical Rules

**NEVER do the following:**
- Change component structure or architecture
- Modify function logic or algorithms
- Refactor code patterns
- Rename functions, variables, or files
- Move code between files
- Change control flow (if/else, loops, etc.)
- Modify state management patterns
- Alter API calls or data transformations

**ONLY do:**
- Remove unused code (imports, variables, dead code)
- Apply ESLint auto-fixes for formatting/style
- Clean up whitespace and formatting
- Remove debug statements
- Report (don't remove) unused packages

## File Exclusions

**Do NOT clean:**
- `/src/trash/*` - deprecated components, intentionally unused
- `node_modules/`
- `dist/`
- Configuration files (unless specified)

## Example Usage

```bash
# Clean all source files
/clean-code

# Clean specific file
/clean-code src/components/DataSearch.jsx

# Clean multiple files
/clean-code src/App.jsx src/components/Map.jsx
```

## Notes

- Run ESLint first to handle formatting automatically
- Use Read tool to check files before editing
- Make small, focused edits to preserve structure
- When in doubt, keep the code - only remove clearly unused code
- Always preserve comments that document behavior or intent
