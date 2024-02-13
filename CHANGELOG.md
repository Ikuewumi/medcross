# Changelog

## TODO

- add series to the crossword
- make the classic crossword work on mobile (most-likely by building a keyboard)
- add colophon
- add help to the crossword page
- make a way for the admin to add a crossword into the builder via its JSON

---

## Unreleased

### 2024-02-13

- Added footer
- Added the about the author section
- Removed defer from the database script

### 2024-02-11

- Added lazy loading to all images except the hero of the home page
- Added featured crossword section to home page
- Fixed the aspect ratio inconsistencies between my hero-image's html and css
- Added an image to the meta description of the home page

### 2024-02-10

- Added a hero to the home page
- Added the functioning database to allow for crossword **resumability**
- Added a progress-like element to the Crossword Page to monitor the progress
- Removed flamethrower-router because it messes up the styles of the `*.svelte` components (maybe go custom??)

## [0.0.0] - 2024-02-10

### Added

- started keeping a changelog [(04aa83a)](https://github.com/Ikuewumi/medcross/commit/04aa83a)
- Added astro content collections [(0396bbe)](https://github.com/Ikuewumi/medcross/commit/0396bbe)
- Added progressive web app functionality; AstroPWA [(0bbd56f)](https://github.com/Ikuewumi/medcross/commit/0bbd56f)
- Added a crossword page with both modes [(756ea8b)](https://github.com/Ikuewumi/medcross/commit/756ea8b)
- Added a basic classic crossword [(ccba220)](https://github.com/Ikuewumi/medcross/commit/ccba220)
- Added the trivia mode for the crossword app [(b7da817)](https://github.com/Ikuewumi/medcross/commit/b7da817)

### Removed

### Changed

- added font files to precache [(6cc9203)](https://github.com/Ikuewumi/medcross/commit/6cc9203)
- added in flamethrower-router and service-worker script to html [(8f17639)](https://github.com/Ikuewumi/medcross/commit/8f17639)
- Patched the PWA functionality [(261e1e1)](https://github.com/Ikuewumi/medcross/commit/261e1e1)
