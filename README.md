# Collage maker

A photo comparison and collage app that runs in the browser. Installable, and it
works with no connection once installed.

## Deploying to GitHub Pages

Push through git from a local clone. GitHub's web uploader flattens nested
folders, which drops `icons/` into the repo root and breaks the install.

    cd "<your local clone>"
    git add -A
    git commit -m "Update collage maker"
    git push

## Every deploy: bump the cache version

`sw.js` opens with:

    const CACHE_VERSION = 'v1';

Raise it to `v2`, `v3` and so on with every push. A browser that has already
installed the app keeps serving the old build until that string changes.

## Files

    index.html                 the whole app
    manifest.webmanifest       app name, icons, colours
    sw.js                      offline cache
    icons/                     192, 512, maskable 512, apple touch
    vendor/pdf-lib.min.js      used by the PDF export

## Checking a deploy

Open the live URL, then confirm `manifest.webmanifest`, `sw.js` and each file
under `icons/` all load rather than 404. A missing icon makes Chrome refuse the
install without saying why, and the app turns into a plain bookmark.
