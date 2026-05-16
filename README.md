# Personal Portfolio

This repository powers my personal portfolio site. It is a React + TypeScript + Vite application built to present my experience, selected projects, technical skills, and academic background in a polished, terminal-inspired layout.

The site is organized as a small multi-page portfolio with a strong visual identity: an animated hero, featured project cards, a timeline-style experience view, and a skills matrix with academic highlights. Most of the content is driven from a single data file so it is easy to update and reuse.

## Highlights

- Home page with an animated hero, core stack, and featured projects
- Experience timeline with impact metrics and role summaries
- Projects archive with bento-style cards and technology tags
- Skills page with technical categories, education details, and milestones
- Responsive layout with scroll-triggered reveal animations and subtle motion
- Resume download CTA and route-based navigation across the portfolio

## Tech Stack

- React 19
- TypeScript
- React Router
- Vite
- ESLint

## Getting Started

```bash
git clone https://github.com/nex8928/personal-portfolio.git
cd personal-portfolio
npm install
npm run dev
```

## Live Site

The portfolio is set up for GitHub Pages at:

https://nex8928.github.io/personal-portfolio/

## Available Scripts

- `npm run dev` - start the development server
- `npm run build` - type-check and build the production bundle
- `npm run lint` - run ESLint across the project
- `npm run preview` - preview the production build locally

## Project Structure

- `src/App.tsx` - application shell and route setup
- `src/pages/` - page-level portfolio sections
- `src/components/` - shared UI components
- `src/data/mockData.ts` - portfolio content, links, and section data
- `src/hooks/useScrollAnimation.ts` - scroll reveal behavior used across pages

## Customizing the Portfolio

If you want to reuse this as a starter for your own portfolio, begin with `src/data/mockData.ts`. That file contains the hero copy, featured projects, experience entries, skill categories, education details, milestones, and navigation labels.

The social links and resume CTA can also be updated in the same content layer or within the relevant components if you want to point them to your own profiles and files.
