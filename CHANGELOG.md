# Changelog

## TODO

- Add `trivia`
- add colophon.
- add help to the crossword page.
- make a way for the admin to add a crossword into the builder via its JSON.

---

## Timeline

### 2024-03-02

- Changed the archive route to archive/crossword removing the need for redirects
- Readded flamethrower router

### 2024-02-25

- Patched the series card to show series name

### 2024-02-23

- Changed default mode to classic

### 2024-02-21

- Patched keyboard design for builder page by making it fixed to the bottom of the page
- Patched bug that allowed user with custom-keyboard to type in disabled paths

### 2024-02-20

- Added `Help` component to the crossword page
- Made sure the clue of a classic crossword is always visible. 

### 2024-02-19

- Added `Bookmarks` component to the Tabs
- Added Tabs For You Page
- Added `Google Analytics` and `partytown` to help performance by executing the analytics off the main thread
- Installed Firebase
- Made the app a PWA
- Readded the fonts to the public directory

### 2024-02-18

- Changed public directory to `./www`
- Added page for each category
- Added keyboard to builder page
- Made home page's featured section work with real data
- Added featured content collection 
- Added `netlify.toml` file to root to specify redirects
- Added ArchiveLayout, aand refactored the archive for multople kinds of data

### 2024-02-16

- Added Series Widget to Crosswords In A Series
- Finished Working on keyboard..Yay!!🎉🎉🎉🎉
- Extracted the Bookmark and Completed Buttons to their own `Status` component.
- Added easter-egg to console

### 2024-02-15

- Implemented bookmarking for crosswords
- Refactor categories to point to a reference
- Added Series Collection and created the page for each individual series

### 2024-02-14

- Added fallback for browsers that don't support the `background-clip` css property as text.
- Changed the design of the card on the archive page.
- Started working on the keyboard.
- Added the archive page.

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
