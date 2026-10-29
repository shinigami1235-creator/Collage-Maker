# Proofline

Proofline, powered by Cygnus Solutions, is a before and after photo app that runs in the browser. Installable, and it
works with no connection once installed.

## Deploying to GitHub Pages

Push through git from a local clone. GitHub's web uploader flattens nested
folders, which drops `icons/` into the repo root and breaks the install.

    cd "<your local clone>"
    git add -A
    git commit -m "Update collage maker"
    git push

## Every deploy: bump the cache version and the app version

`sw.js` opens with:

    const CACHE_VERSION = 'v1';

Raise it to `v2`, `v3` and so on with every push, and raise `APP_VERSION` in
`index.html` to the same number, since About shows it. A browser that has already
installed the app keeps serving the old build until that string changes.

## Files

    index.html                 the whole app
    manifest.webmanifest       app name, icons, colours
    sw.js                      offline cache
    icons/                     192, 512, maskable 512, apple touch
    vendor/pdf-lib.min.js      used by the PDF export
    vendor/jsfeat.min.js       finds and pairs the spots for Auto line up
    vendor/mediapipe/          MediaPipe face detection 0.4, Apache 2.0, finds the eyes for Cover the eyes
    vendor/mediapipe-selfie/   MediaPipe selfie segmentation 0.1, Apache 2.0, finds the person for Remove the background
    vendor/mediapipe-mesh/     MediaPipe Face Mesh 0.4, Apache 2.0, face points for the camera guide, line up and eye covers
    vendor/mediapipe-pose/     MediaPipe Pose 0.5 lite model, Apache 2.0, body points for the camera guide and line up
    vendor/onnxruntime/        ONNX Runtime Web 1.22, MIT, runs the closer match
    vendor/aliked/             ALIKED (BSD 3-Clause) with LightGlue and RaCo (Apache 2.0), the closer match, notice in LICENSE-NOTICE.md

The face mesh, pose, ONNX Runtime and ALIKED files download only when first
used and are kept in their own cache, `proofline-models-1`.

Settings are kept in the browser under `collage-maker-settings`. The open set
of photos is kept in IndexedDB under `proofline-session` until End session,
and client folders under `proofline`.

## Checking a deploy

Open the live URL, then confirm `manifest.webmanifest`, `sw.js` and each file
under `icons/` all load rather than 404. A missing icon makes Chrome refuse the
install without saying why, and the app turns into a plain bookmark.
