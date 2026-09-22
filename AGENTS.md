# Personal Website V2 — Repository Instructions

## Project

This is Bahram Kuranyi's professional portfolio website.

Primary goals:

- Present Bahram as a modern Software Engineer focused on AI and modern web technologies.
- Support software engineering job applications.
- Showcase projects through strong visual experiences rather than long text.
- Remain maintainable and expandable over time.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Git / GitHub

## Engineering Rules

- Use TypeScript.
- Keep components reasonably small and reusable.
- Prefer data-driven UI over duplicated markup.
- Preserve the existing App Router architecture.
- Do not install new dependencies unless they are clearly justified.
- Do not redesign unrelated sections while implementing a focused task.
- Prefer simple platform/CSS solutions before adding libraries.
- Preserve responsive behavior.
- Maintain accessibility.

## Visual Direction

The site should feel:

- modern
- premium
- minimal
- creative
- technology-focused

The initial experience should feel restrained and Apple-like.
More visual and technical complexity may appear deeper in the site.

Avoid:

- generic template aesthetics
- excessive animation
- hacker / Matrix clichés
- unnecessary visual noise

## Motion

Motion should be purposeful and restrained.

- Prefer transforms and opacity for animation.
- Respect `prefers-reduced-motion`.
- Do not add animation libraries unless the task genuinely requires one.
- Performance must take priority over decorative effects.

## Git Workflow

Each meaningful implementation stage must be its own commit.

Use conventional commit messages, for example:

- `feat: add software background layer`
- `feat: add scroll-reactive background motion`
- `fix: correct project navigation`
- `refactor: optimize background animation`

Before committing:

1. Save all modified files.
2. Run lint.
3. Run the production build.
4. Fix errors caused by the current change.
5. Review `git status`.

After a successful stage:

1. Commit only the stage-related changes.
2. Push the commit to the current remote branch.
3. Confirm the working tree is clean.

Do not:

- amend previous commits
- squash commits
- rewrite history
- modify unrelated code

If pushing is unavailable because GitHub authentication is missing, create the commit and report that the user must push it manually.

## Windows Environment

The development machine uses Windows.

PowerShell blocks `npm.ps1`, so when necessary use:

`npm.cmd`

Examples:

`npm.cmd run dev`
`npm.cmd run lint`
`npm.cmd run build`

## Working Style

Before a substantial implementation:

1. Inspect the relevant existing code.
2. Briefly explain the intended changes.
3. Change only what is required for the current stage.
4. Validate the result.
5. Summarize the files changed.

Do not automatically continue into the next feature or stage.
Stop after the requested stage is complete.
