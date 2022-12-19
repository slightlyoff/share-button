# `<share-button>`

A performance-first web component for content sharing. Initially developed for (and you can see it used on) [infrequently.org](https://infrequently.org/)

Provides:

  - Sharing via [Web Share API](https://web.dev/web-share/) as well as direct link copy and toot/tweet buttons
  - Themeing through CSS variables and Web Component `::part()`s
  - Tiny footprint; a single file, ~4KiB gzipped, and traced to death by someone who knows their way around a browser

## Using/Configuring

See `share.html` for examples.

Basic use is to import the (single) script file (no dependencies), prefereably with modern syntax so as to avoid browsers that can't support it:

```html
<script type="module">
  import "./share-button.js";
</script>
<share-button
  title="Infrequently Noted"
  url="https://infrequently.org/">
</share-button>
```

Styling is handled via CSS `::part()` directives and variables, e.g.:

```css
share-button.blue {
  --color: darkblue;
  --hover-bg-color: rgba(53, 49, 181, 0.219);
  --transition-duration: 0.2s;
  --hover-scale: 1.5;
}

share-button.never-tweet::part(tweet-button) {
  display: none;
}
```

The important `::part()`s are:

  - `share-button`
  - `tweet-button`
  - `toot-button`
  - `copy-link-button`

## Building/Hacking

This thing is a super bare-bones, no-frills, no-frameworks.

Building requires a functional linux environment (WSL and Crostini work great) with [`fonttools`](https://github.com/fonttools/fonttools) in your `PATH`. On Debian-derived distros, a quick `sudo apt install fonttools` should be enough.

The design works by:

  - Subsetting from the checked-in [fontawesome](https://fontawesome.com/) glyphs; see `subset.sh` to add a glyph.
  - The resulting combined font is then subsetted, which considerably reduces resulting binary size
  - That subset is then base64 encoded and dropt on disk at `combined.woff2`
  - We then manually copy this into the URL injected by `share-button.js` (yes, yes, I know)
  - This is then loaded in a singleton way as the script loads. This might cause a global style recalc! Caveat emptor.
  - When instantiated, the web components reply on this font for their glyphs.

The care taken to minimize dependencies for the component (no framework) and binary size means the whole shebang should come down the wire in less than 4KiB, making it suitable for inlining in aggressive setups.