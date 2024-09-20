// Copyright (c) 2020 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// ⚡️ DANGER ZONE ⚡️
// ================
// 

// The shell cache keeps "landmark" resources, like CSS and JS, web fonts, etc.
// which won't change between content updates.
// 
// 
const SHELL_CACHE = "shell-9.2.1--v13--sw/";

// A separate assets cache that won't be invalidated when there's a newer version of Hydejack.
// NOTE: Whenever you make changes to any of the files in yor `assets` folder,
//       increase the cache number, otherwise the changes will *never* be visible to returning visitors.
const ASSETS_CACHE = "assets--v13--sw/";

// The cache for regular content, which will be invalidated every time you make a new build.
const CONTENT_CACHE = "content--2024-09-20T11:30:12+02:00--sw/";

// A URL search parameter you can add to external assets to cache them in the service worker.
const SW_CACHE_SEARCH_PARAM = "sw-cache";
const NO_CACHE_SEARCH_PARAM = "no-cache";

// The regular expression used to find URLs in webfont style sheets.
const RE_CSS_URL = /url\s*\(['"]?(([^'"\\]|\\.)*)['"]?\)/u;

const ICON_FONT = "/assets/icomoon/style.css";
const KATEX_FONT = "/assets/bower_components/katex/dist/katex.min.css";

// 
// 
const GOOGLE_FONTS = "https://fonts.googleapis.com/css?family=Roboto+Slab:700%7CNoto+Sans:400,400i,700,700i&display=swap";
// 

const SHELL_FILES = [
  "/assets/css/hydejack-9.2.1.css",
  "/assets/js/service-worker.js",
];

const STATIC_FILES = [
  /**/"/assets/Reijs_Ralph.vcf",
  /**/"/assets/bower.json",
  /**/"/assets/bower_components/MathJax/LICENSE",
  /**/"/assets/bower_components/MathJax/bower.json",
  /**/"/assets/bower_components/MathJax/composer.json",
  /**/"/assets/bower_components/MathJax/es5/a11y/assistive-mml.js",
  /**/"/assets/bower_components/MathJax/es5/a11y/complexity.js",
  /**/"/assets/bower_components/MathJax/es5/a11y/explorer.js",
  /**/"/assets/bower_components/MathJax/es5/a11y/semantic-enrich.js",
  /**/"/assets/bower_components/MathJax/es5/adaptors/liteDOM.js",
  /**/"/assets/bower_components/MathJax/es5/core.js",
  /**/"/assets/bower_components/MathJax/es5/input/asciimath.js",
  /**/"/assets/bower_components/MathJax/es5/input/mml.js",
  /**/"/assets/bower_components/MathJax/es5/input/mml/entities.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex-base.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex-full.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/action.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/all-packages.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/ams.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/amscd.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/autoload.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/bbox.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/boldsymbol.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/braket.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/bussproofs.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/cancel.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/color.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/colorV2.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/configMacros.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/enclose.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/extpfeil.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/html.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/mhchem.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/newcommand.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/noerrors.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/noundefined.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/physics.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/require.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/tagFormat.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/textmacros.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/unicode.js",
  /**/"/assets/bower_components/MathJax/es5/input/tex/extensions/verb.js",
  /**/"/assets/bower_components/MathJax/es5/latest.js",
  /**/"/assets/bower_components/MathJax/es5/loader.js",
  /**/"/assets/bower_components/MathJax/es5/mml-chtml.js",
  /**/"/assets/bower_components/MathJax/es5/mml-svg.js",
  /**/"/assets/bower_components/MathJax/es5/node-main.js",
  /**/"/assets/bower_components/MathJax/es5/output/chtml.js",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/tex.js",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_AMS-Regular.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Calligraphic-Bold.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Calligraphic-Regular.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Fraktur-Bold.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Fraktur-Regular.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Main-Bold.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Main-Italic.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Main-Regular.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Math-BoldItalic.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Math-Italic.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Math-Regular.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_SansSerif-Bold.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_SansSerif-Italic.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_SansSerif-Regular.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Script-Regular.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Size1-Regular.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Size2-Regular.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Size3-Regular.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Size4-Regular.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Typewriter-Regular.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Vector-Bold.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Vector-Regular.woff",
  /**/"/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Zero.woff",
  /**/"/assets/bower_components/MathJax/es5/output/svg.js",
  /**/"/assets/bower_components/MathJax/es5/output/svg/fonts/tex.js",
  /**/"/assets/bower_components/MathJax/es5/sre/mathmaps/de.js",
  /**/"/assets/bower_components/MathJax/es5/sre/mathmaps/en.js",
  /**/"/assets/bower_components/MathJax/es5/sre/mathmaps/es.js",
  /**/"/assets/bower_components/MathJax/es5/sre/mathmaps/fr.js",
  /**/"/assets/bower_components/MathJax/es5/sre/mathmaps/mathmaps_ie.js",
  /**/"/assets/bower_components/MathJax/es5/sre/mathmaps/nemeth.js",
  /**/"/assets/bower_components/MathJax/es5/sre/sre-node.js",
  /**/"/assets/bower_components/MathJax/es5/sre/sre_browser.js",
  /**/"/assets/bower_components/MathJax/es5/startup.js",
  /**/"/assets/bower_components/MathJax/es5/tex-chtml-full.js",
  /**/"/assets/bower_components/MathJax/es5/tex-chtml.js",
  /**/"/assets/bower_components/MathJax/es5/tex-mml-chtml.js",
  /**/"/assets/bower_components/MathJax/es5/tex-mml-svg.js",
  /**/"/assets/bower_components/MathJax/es5/tex-svg-full.js",
  /**/"/assets/bower_components/MathJax/es5/tex-svg.js",
  /**/"/assets/bower_components/MathJax/es5/ui/menu.js",
  /**/"/assets/bower_components/MathJax/es5/ui/safe.js",
  /**/"/assets/bower_components/MathJax/package.json",
  /**/"/assets/bower_components/html5shiv/Gruntfile.js",
  /**/"/assets/bower_components/html5shiv/bower.json",
  /**/"/assets/bower_components/html5shiv/dist/html5shiv-printshiv.js",
  /**/"/assets/bower_components/html5shiv/dist/html5shiv-printshiv.min.js",
  /**/"/assets/bower_components/html5shiv/dist/html5shiv.js",
  /**/"/assets/bower_components/html5shiv/dist/html5shiv.min.js",
  /**/"/assets/bower_components/html5shiv/package.json",
  /**/"/assets/bower_components/katex/LICENSE",
  /**/"/assets/bower_components/katex/bower.json",
  /**/"/assets/bower_components/katex/dist/contrib/auto-render.js",
  /**/"/assets/bower_components/katex/dist/contrib/auto-render.min.js",
  /**/"/assets/bower_components/katex/dist/contrib/auto-render.mjs",
  /**/"/assets/bower_components/katex/dist/contrib/copy-tex.css",
  /**/"/assets/bower_components/katex/dist/contrib/copy-tex.js",
  /**/"/assets/bower_components/katex/dist/contrib/copy-tex.min.css",
  /**/"/assets/bower_components/katex/dist/contrib/copy-tex.min.js",
  /**/"/assets/bower_components/katex/dist/contrib/copy-tex.mjs",
  /**/"/assets/bower_components/katex/dist/contrib/mathtex-script-type.js",
  /**/"/assets/bower_components/katex/dist/contrib/mathtex-script-type.min.js",
  /**/"/assets/bower_components/katex/dist/contrib/mathtex-script-type.mjs",
  /**/"/assets/bower_components/katex/dist/contrib/mhchem.js",
  /**/"/assets/bower_components/katex/dist/contrib/mhchem.min.js",
  /**/"/assets/bower_components/katex/dist/contrib/mhchem.mjs",
  /**/"/assets/bower_components/katex/dist/contrib/render-a11y-string.js",
  /**/"/assets/bower_components/katex/dist/contrib/render-a11y-string.min.js",
  /**/"/assets/bower_components/katex/dist/contrib/render-a11y-string.mjs",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_AMS-Regular.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_AMS-Regular.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_AMS-Regular.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Bold.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Bold.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Bold.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Regular.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Regular.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Regular.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Bold.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Bold.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Bold.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Regular.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Regular.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Regular.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Main-Bold.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Main-Bold.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Main-Bold.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Main-BoldItalic.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Main-BoldItalic.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Main-BoldItalic.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Main-Italic.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Main-Italic.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Main-Italic.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Main-Regular.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Main-Regular.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Main-Regular.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Math-BoldItalic.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Math-BoldItalic.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Math-BoldItalic.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Math-Italic.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Math-Italic.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Math-Italic.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Bold.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Bold.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Bold.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Italic.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Italic.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Italic.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Regular.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Regular.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Regular.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Script-Regular.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Script-Regular.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Script-Regular.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Size1-Regular.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Size1-Regular.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Size1-Regular.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Size2-Regular.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Size2-Regular.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Size2-Regular.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Size3-Regular.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Size3-Regular.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Size3-Regular.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Size4-Regular.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Size4-Regular.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Size4-Regular.woff2",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Typewriter-Regular.ttf",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Typewriter-Regular.woff",
  /**/"/assets/bower_components/katex/dist/fonts/KaTeX_Typewriter-Regular.woff2",
  /**/"/assets/bower_components/katex/dist/katex.css",
  /**/"/assets/bower_components/katex/dist/katex.js",
  /**/"/assets/bower_components/katex/dist/katex.min.css",
  /**/"/assets/bower_components/katex/dist/katex.min.js",
  /**/"/assets/bower_components/katex/dist/katex.mjs",
  /**/"/assets/bower_components/katex/flow-typed/npm/jest_v24.x.x.js",
  /**/"/assets/bower_components/katex/yarn.lock",
  /**/"/assets/icomoon/fonts/icomoon.eot",
  /**/"/assets/icomoon/fonts/icomoon.svg",
  /**/"/assets/icomoon/fonts/icomoon.ttf",
  /**/"/assets/icomoon/fonts/icomoon.woff",
  /**/"/assets/icomoon/selection.json",
  /**/"/assets/icomoon/style.css",
  /**/"/assets/icons/favicon.ico",
  /**/"/assets/icons/icon-128x128.png",
  /**/"/assets/icons/icon-144x144.png",
  /**/"/assets/icons/icon-152x152.png",
  /**/"/assets/icons/icon-192x192.png",
  /**/"/assets/icons/icon-384x384.png",
  /**/"/assets/icons/icon-512x512.png",
  /**/"/assets/icons/icon-72x72.png",
  /**/"/assets/icons/icon-96x96.png",
  /**/"/assets/img/blog/9.1.0-1.png",
  /**/"/assets/img/blog/9.1.0-2.png",
  /**/"/assets/img/blog/9.1.0-3.png",
  /**/"/assets/img/blog/example-content-ii.jpg",
  /**/"/assets/img/blog/example-content-iii.jpg",
  /**/"/assets/img/blog/example-content-iii@0,25x.jpg",
  /**/"/assets/img/blog/example-content-iii@0,5x.jpg",
  /**/"/assets/img/blog/hydejack-9-dark.jpg",
  /**/"/assets/img/blog/hydejack-9-dark@0,25x.jpg",
  /**/"/assets/img/blog/hydejack-9-dark@0,5x.jpg",
  /**/"/assets/img/blog/hydejack-9.jpg",
  /**/"/assets/img/blog/hydejack-9@0,25x.jpg",
  /**/"/assets/img/blog/hydejack-9@0,5x.jpg",
  /**/"/assets/img/blog/jeremy-bishop.jpg",
  /**/"/assets/img/blog/jeremy-bishop@0,5x.jpg",
  /**/"/assets/img/blog/pawel-czerwinski-848z7lbCjoo-unsplash.jpg",
  /**/"/assets/img/blog/pawel-czerwinski-848z7lbCjoo-unsplash@0,25x.jpg",
  /**/"/assets/img/blog/pawel-czerwinski-848z7lbCjoo-unsplash@0,5x.jpg",
  /**/"/assets/img/blog/resume.png",
  /**/"/assets/img/blog/w3m.png",
  /**/"/assets/img/clients/logo_bayer.png",
  /**/"/assets/img/clients/logo_datev.png",
  /**/"/assets/img/clients/logo_delhaize.png",
  /**/"/assets/img/clients/logo_deuba.png",
  /**/"/assets/img/clients/logo_deutscheboerse.png",
  /**/"/assets/img/clients/logo_deutscherring.png",
  /**/"/assets/img/clients/logo_ect.png",
  /**/"/assets/img/clients/logo_fruition.png",
  /**/"/assets/img/clients/logo_hp.png",
  /**/"/assets/img/clients/logo_ibm.png",
  /**/"/assets/img/clients/logo_logicalissmc.png",
  /**/"/assets/img/clients/logo_peregrine.png",
  /**/"/assets/img/clients/logo_pillar.png",
  /**/"/assets/img/clients/logo_qp.png",
  /**/"/assets/img/clients/logo_rabobank.png",
  /**/"/assets/img/clients/logo_roche.png",
  /**/"/assets/img/clients/logo_servicenow.png",
  /**/"/assets/img/clients/logo_shell.png",
  /**/"/assets/img/clients/logo_sparda.png",
  /**/"/assets/img/clients/logo_suitsupply.png",
  /**/"/assets/img/clients/logo_thales.png",
  /**/"/assets/img/clients/logo_uunet.png",
  /**/"/assets/img/docs/chrome-print.png",
  /**/"/assets/img/docs/google-fonts.png",
  /**/"/assets/img/docs/pipeline-gh-actions.png",
  /**/"/assets/img/docs/pipeline-gh-pages.png",
  /**/"/assets/img/logo.png",
  /**/"/assets/img/opengraph_image.jpg",
  /**/"/assets/img/profile_ralph.png",
  /**/"/assets/img/projects/amsterdam.jpg",
  /**/"/assets/img/projects/art_3dprinting.gif",
  /**/"/assets/img/projects/art_agrodroneai.png",
  /**/"/assets/img/projects/art_anima.png",
  /**/"/assets/img/projects/art_apostilleusa.png",
  /**/"/assets/img/projects/art_astronomy.png",
  /**/"/assets/img/projects/art_astroweather.png",
  /**/"/assets/img/projects/art_aum.png",
  /**/"/assets/img/projects/art_backlinkassassin.png",
  /**/"/assets/img/projects/art_bcnl.png",
  /**/"/assets/img/projects/art_bitcoin.png",
  /**/"/assets/img/projects/art_cfp.png",
  /**/"/assets/img/projects/art_climateadvisers.png",
  /**/"/assets/img/projects/art_cryptochip.png",
  /**/"/assets/img/projects/art_drones.png",
  /**/"/assets/img/projects/art_farmacy.png",
  /**/"/assets/img/projects/art_glyphhacker.png",
  /**/"/assets/img/projects/art_haarlem.png",
  /**/"/assets/img/projects/art_hostingondemand.png",
  /**/"/assets/img/projects/art_ingress.png",
  /**/"/assets/img/projects/art_instatunnel.png",
  /**/"/assets/img/projects/art_ipst.png",
  /**/"/assets/img/projects/art_jetsupport.png",
  /**/"/assets/img/projects/art_jinbi.png",
  /**/"/assets/img/projects/art_juicer.png",
  /**/"/assets/img/projects/art_karakoram.png",
  /**/"/assets/img/projects/art_leesplankje.png",
  /**/"/assets/img/projects/art_leesplankje2.png",
  /**/"/assets/img/projects/art_legalcounselor.png",
  /**/"/assets/img/projects/art_mpowa.png",
  /**/"/assets/img/projects/art_phibo.png",
  /**/"/assets/img/projects/art_pillar.png",
  /**/"/assets/img/projects/art_pivx.png",
  /**/"/assets/img/projects/art_resnl.png",
  /**/"/assets/img/projects/art_rotorswag.png",
  /**/"/assets/img/projects/art_tiltdrone.png",
  /**/"/assets/img/projects/art_torustech.png",
  /**/"/assets/img/projects/art_toxicmaxi.png",
  /**/"/assets/img/projects/art_wardial.png",
  /**/"/assets/img/projects/art_yesdelft.png",
  /**/"/assets/img/projects/art_ziedesterren.png",
  /**/"/assets/img/projects/astro_timelapse.mp4",
  /**/"/assets/img/projects/boxed-bg.jpg",
  /**/"/assets/img/projects/boxed-bg.png",
  /**/"/assets/img/projects/compass.png",
  /**/"/assets/img/projects/cryptocartel.png",
  /**/"/assets/img/projects/fpv_goggles.png",
  /**/"/assets/img/projects/ibitcoin_500px.png",
  /**/"/assets/img/projects/ibitcoin_markets.png",
  /**/"/assets/img/projects/icons.png",
  /**/"/assets/img/projects/logo_appcodex.png",
  /**/"/assets/img/projects/logo_appstore.png",
  /**/"/assets/img/projects/logo_aum.png",
  /**/"/assets/img/projects/logo_bayer.png",
  /**/"/assets/img/projects/logo_bitcoin.png",
  /**/"/assets/img/projects/logo_cloudlynx.png",
  /**/"/assets/img/projects/logo_datev.png",
  /**/"/assets/img/projects/logo_delhaize.png",
  /**/"/assets/img/projects/logo_deuba.png",
  /**/"/assets/img/projects/logo_deutscheboerse.png",
  /**/"/assets/img/projects/logo_deutscherring.png",
  /**/"/assets/img/projects/logo_ect.png",
  /**/"/assets/img/projects/logo_fruition.png",
  /**/"/assets/img/projects/logo_hp.png",
  /**/"/assets/img/projects/logo_ibitcoin.png",
  /**/"/assets/img/projects/logo_ibm.png",
  /**/"/assets/img/projects/logo_jinbi.png",
  /**/"/assets/img/projects/logo_juicer.png",
  /**/"/assets/img/projects/logo_logicalissmc.png",
  /**/"/assets/img/projects/logo_mpowa.png",
  /**/"/assets/img/projects/logo_peregrine.png",
  /**/"/assets/img/projects/logo_pillar.png",
  /**/"/assets/img/projects/logo_qp.png",
  /**/"/assets/img/projects/logo_rabobank.png",
  /**/"/assets/img/projects/logo_roche.png",
  /**/"/assets/img/projects/logo_servicenow.png",
  /**/"/assets/img/projects/logo_shell.png",
  /**/"/assets/img/projects/logo_sparda.png",
  /**/"/assets/img/projects/logo_suitsupply.png",
  /**/"/assets/img/projects/logo_thales.png",
  /**/"/assets/img/projects/logo_uunet.png",
  /**/"/assets/img/projects/logo_zwave.png",
  /**/"/assets/img/projects/mk5_logo.gif",
  /**/"/assets/img/projects/mk5_logo_transparent.gif",
  /**/"/assets/img/projects/more_clients.jpg",
  /**/"/assets/img/projects/more_development.jpg",
  /**/"/assets/img/projects/more_hardware.jpg",
  /**/"/assets/img/projects/more_otherdesign.jpg",
  /**/"/assets/img/projects/more_projects.jpg",
  /**/"/assets/img/projects/more_uiuxdesign.jpg",
  /**/"/assets/img/projects/more_websites.jpg",
  /**/"/assets/img/projects/mpowa_01.jpg",
  /**/"/assets/img/projects/mpowa_02.jpg",
  /**/"/assets/img/projects/mpowa_03.jpg",
  /**/"/assets/img/projects/mpowa_04.jpg",
  /**/"/assets/img/projects/mpowa_05.jpg",
  /**/"/assets/img/projects/mpowa_500px.jpg",
  /**/"/assets/img/projects/mpowa_psu.png",
  /**/"/assets/img/projects/profile_ralph.png",
  /**/"/assets/img/projects/projects_3dprinting.jpg",
  /**/"/assets/img/projects/projects_3dprinting_full_01.jpg",
  /**/"/assets/img/projects/projects_3dprinting_full_02.jpg",
  /**/"/assets/img/projects/projects_3dprinting_full_03.jpg",
  /**/"/assets/img/projects/projects_3dprinting_full_04.jpg",
  /**/"/assets/img/projects/projects_3dprinting_full_05.jpg",
  /**/"/assets/img/projects/projects_3dprinting_full_06.jpg",
  /**/"/assets/img/projects/projects_3dprinting_full_07.jpg",
  /**/"/assets/img/projects/projects_3dprinting_full_08.jpg",
  /**/"/assets/img/projects/projects_3dprinting_full_09.jpg",
  /**/"/assets/img/projects/projects_3dprinting_full_10.jpg",
  /**/"/assets/img/projects/projects_3dprinting_full_11.jpg",
  /**/"/assets/img/projects/projects_3dprinting_full_12.jpg",
  /**/"/assets/img/projects/projects_3dprinting_full_13.jpg",
  /**/"/assets/img/projects/projects_3dprinting_full_14.jpg",
  /**/"/assets/img/projects/projects_3dprinting_full_15.jpg",
  /**/"/assets/img/projects/projects_3dprinting_full_16.jpg",
  /**/"/assets/img/projects/projects_3dprinting_full_17.jpg",
  /**/"/assets/img/projects/projects_3dprinting_full_18.jpg",
  /**/"/assets/img/projects/projects_3dprinting_full_19.jpg",
  /**/"/assets/img/projects/projects_3dprinting_full_20.jpg",
  /**/"/assets/img/projects/projects_3dprinting_full_21.jpg",
  /**/"/assets/img/projects/projects_3dprinting_full_22.jpg",
  /**/"/assets/img/projects/projects_3dprinting_full_23.jpg",
  /**/"/assets/img/projects/projects_3dprinting_full_24.jpg",
  /**/"/assets/img/projects/projects_3dprinting_full_25.jpg",
  /**/"/assets/img/projects/projects_3dprinting_full_26.jpg",
  /**/"/assets/img/projects/projects_3dprinting_full_27.jpg",
  /**/"/assets/img/projects/projects_3dprinting_full_28.jpg",
  /**/"/assets/img/projects/projects_3dprinting_full_29.jpg",
  /**/"/assets/img/projects/projects_agrodroneai_full_01.jpg",
  /**/"/assets/img/projects/projects_agrodroneai_full_02.jpg",
  /**/"/assets/img/projects/projects_agrodroneai_full_03.jpg",
  /**/"/assets/img/projects/projects_agrodroneai_full_04.jpg",
  /**/"/assets/img/projects/projects_agrodroneai_full_05.jpg",
  /**/"/assets/img/projects/projects_anima.jpg",
  /**/"/assets/img/projects/projects_anima_full_01.jpg",
  /**/"/assets/img/projects/projects_anima_full_02.jpg",
  /**/"/assets/img/projects/projects_anima_full_03.jpg",
  /**/"/assets/img/projects/projects_anima_full_04.jpg",
  /**/"/assets/img/projects/projects_anima_full_05.jpg",
  /**/"/assets/img/projects/projects_anima_full_06.jpg",
  /**/"/assets/img/projects/projects_anima_full_07.jpg",
  /**/"/assets/img/projects/projects_anima_full_08.jpg",
  /**/"/assets/img/projects/projects_anima_full_09.jpg",
  /**/"/assets/img/projects/projects_anima_full_10.jpg",
  /**/"/assets/img/projects/projects_apostilleusa.jpg",
  /**/"/assets/img/projects/projects_apostilleusa_full_00.jpg",
  /**/"/assets/img/projects/projects_apostilleusa_full_01.jpg",
  /**/"/assets/img/projects/projects_apostilleusa_full_02.jpg",
  /**/"/assets/img/projects/projects_apostilleusa_full_03.jpg",
  /**/"/assets/img/projects/projects_apostilleusa_full_04.jpg",
  /**/"/assets/img/projects/projects_apostilleusa_full_05.jpg",
  /**/"/assets/img/projects/projects_apostilleusa_full_06.jpg",
  /**/"/assets/img/projects/projects_apostilleusa_full_07.jpg",
  /**/"/assets/img/projects/projects_apostilleusa_full_08.jpg",
  /**/"/assets/img/projects/projects_apostilleusa_full_09.jpg",
  /**/"/assets/img/projects/projects_apostilleusa_full_10.jpg",
  /**/"/assets/img/projects/projects_apostilleusa_full_11.jpg",
  /**/"/assets/img/projects/projects_app_appcodex_full_01.jpg",
  /**/"/assets/img/projects/projects_app_appcodex_full_02.jpg",
  /**/"/assets/img/projects/projects_app_astroweather_full_01.jpg",
  /**/"/assets/img/projects/projects_app_astroweather_full_02.jpg",
  /**/"/assets/img/projects/projects_app_astroweather_full_03.jpg",
  /**/"/assets/img/projects/projects_app_astroweather_full_04.jpg",
  /**/"/assets/img/projects/projects_app_haarlem_full_01.jpg",
  /**/"/assets/img/projects/projects_app_hostingondemand_full_01.jpg",
  /**/"/assets/img/projects/projects_app_hostingondemand_full_02.jpg",
  /**/"/assets/img/projects/projects_app_hostingondemand_full_03.jpg",
  /**/"/assets/img/projects/projects_app_hostingondemand_full_04.jpg",
  /**/"/assets/img/projects/projects_app_ibitcoin_full_01.jpg",
  /**/"/assets/img/projects/projects_app_ibitcoin_full_02.jpg",
  /**/"/assets/img/projects/projects_app_ibitcoin_full_03.jpg",
  /**/"/assets/img/projects/projects_app_ibitcoin_full_04.jpg",
  /**/"/assets/img/projects/projects_app_ibitcoin_full_05.jpg",
  /**/"/assets/img/projects/projects_app_ibitcoin_full_06.jpg",
  /**/"/assets/img/projects/projects_app_ibitcoin_full_07.jpg",
  /**/"/assets/img/projects/projects_app_ibitcoin_full_08.jpg",
  /**/"/assets/img/projects/projects_app_ibitcoin_full_09.jpg",
  /**/"/assets/img/projects/projects_app_ibitcoin_full_10.jpg",
  /**/"/assets/img/projects/projects_app_ibitcoin_full_11.jpg",
  /**/"/assets/img/projects/projects_app_ibitcoin_full_12.jpg",
  /**/"/assets/img/projects/projects_app_idomotics_full_01.jpg",
  /**/"/assets/img/projects/projects_app_idomotics_full_02.jpg",
  /**/"/assets/img/projects/projects_app_idomotics_full_03.jpg",
  /**/"/assets/img/projects/projects_app_idomotics_full_04.jpg",
  /**/"/assets/img/projects/projects_app_idomotics_full_05.jpg",
  /**/"/assets/img/projects/projects_app_idomotics_full_06.jpg",
  /**/"/assets/img/projects/projects_app_jetsupport_full_01.jpg",
  /**/"/assets/img/projects/projects_app_leesplankje_full_01.jpg",
  /**/"/assets/img/projects/projects_app_leesplankje_full_02.jpg",
  /**/"/assets/img/projects/projects_app_leesplankje_full_03.jpg",
  /**/"/assets/img/projects/projects_app_leesplankje_full_04.jpg",
  /**/"/assets/img/projects/projects_app_leesplankje_full_05.jpg",
  /**/"/assets/img/projects/projects_app_leesplankje_full_06.jpg",
  /**/"/assets/img/projects/projects_app_leesplankje_full_07.jpg",
  /**/"/assets/img/projects/projects_app_leesplankje_full_08.jpg",
  /**/"/assets/img/projects/projects_app_leesplankje_full_09.jpg",
  /**/"/assets/img/projects/projects_app_leesplankje_full_10.jpg",
  /**/"/assets/img/projects/projects_app_leesplankje_full_11.jpg",
  /**/"/assets/img/projects/projects_app_leesplankje_full_12.jpg",
  /**/"/assets/img/projects/projects_app_leesplankje_full_13.jpg",
  /**/"/assets/img/projects/projects_app_leesplankje_full_14.jpg",
  /**/"/assets/img/projects/projects_app_leesplankje_full_15.jpg",
  /**/"/assets/img/projects/projects_app_suitsupply_full_01.jpg",
  /**/"/assets/img/projects/projects_app_suitsupply_full_02.jpg",
  /**/"/assets/img/projects/projects_app_suitsupply_full_03.jpg",
  /**/"/assets/img/projects/projects_app_suitsupply_full_04.jpg",
  /**/"/assets/img/projects/projects_app_suitsupply_full_05.jpg",
  /**/"/assets/img/projects/projects_app_suitsupply_full_06.jpg",
  /**/"/assets/img/projects/projects_app_suitsupply_full_07.jpg",
  /**/"/assets/img/projects/projects_astronomy.jpg",
  /**/"/assets/img/projects/projects_astronomy_full_01.jpg",
  /**/"/assets/img/projects/projects_astronomy_full_02.jpg",
  /**/"/assets/img/projects/projects_astronomy_full_03.jpg",
  /**/"/assets/img/projects/projects_astronomy_full_04.jpg",
  /**/"/assets/img/projects/projects_astronomy_full_05.jpg",
  /**/"/assets/img/projects/projects_astronomy_full_06.jpg",
  /**/"/assets/img/projects/projects_astronomy_full_07.jpg",
  /**/"/assets/img/projects/projects_astronomy_full_08.jpg",
  /**/"/assets/img/projects/projects_astronomy_full_09.jpg",
  /**/"/assets/img/projects/projects_astronomy_full_10.jpg",
  /**/"/assets/img/projects/projects_astronomy_full_11.jpg",
  /**/"/assets/img/projects/projects_astronomy_full_12.jpg",
  /**/"/assets/img/projects/projects_astronomy_full_13.jpg",
  /**/"/assets/img/projects/projects_astronomy_full_14.jpg",
  /**/"/assets/img/projects/projects_astronomy_full_15.jpg",
  /**/"/assets/img/projects/projects_astronomy_full_16.jpg",
  /**/"/assets/img/projects/projects_astronomy_full_17.jpg",
  /**/"/assets/img/projects/projects_astronomy_full_18.jpg",
  /**/"/assets/img/projects/projects_astronomy_full_19.jpg",
  /**/"/assets/img/projects/projects_astronomy_full_20.jpg",
  /**/"/assets/img/projects/projects_astronomy_full_21.jpg",
  /**/"/assets/img/projects/projects_astronomy_full_22.jpg",
  /**/"/assets/img/projects/projects_astronomy_full_23.jpg",
  /**/"/assets/img/projects/projects_astronomy_full_24.jpg",
  /**/"/assets/img/projects/projects_astronomy_full_25.jpg",
  /**/"/assets/img/projects/projects_astronomy_full_26.jpg",
  /**/"/assets/img/projects/projects_astronomy_full_27.jpg",
  /**/"/assets/img/projects/projects_astroweather.jpg",
  /**/"/assets/img/projects/projects_aum.jpg",
  /**/"/assets/img/projects/projects_aum_full_01.jpg",
  /**/"/assets/img/projects/projects_aum_full_02.jpg",
  /**/"/assets/img/projects/projects_aum_full_03.jpg",
  /**/"/assets/img/projects/projects_aum_full_04.jpg",
  /**/"/assets/img/projects/projects_aum_full_05.jpg",
  /**/"/assets/img/projects/projects_aum_full_06.jpg",
  /**/"/assets/img/projects/projects_aum_full_07.jpg",
  /**/"/assets/img/projects/projects_aum_full_08.jpg",
  /**/"/assets/img/projects/projects_aum_full_09.jpg",
  /**/"/assets/img/projects/projects_aum_full_10.jpg",
  /**/"/assets/img/projects/projects_backlinkassassin_full_01.jpg",
  /**/"/assets/img/projects/projects_backlinkassassin_full_02.jpg",
  /**/"/assets/img/projects/projects_backlinkassassin_full_03.jpg",
  /**/"/assets/img/projects/projects_backlinkassassin_full_04.jpg",
  /**/"/assets/img/projects/projects_backlinkassassin_full_05.jpg",
  /**/"/assets/img/projects/projects_backlinkassassin_full_06.jpg",
  /**/"/assets/img/projects/projects_backlinkassassin_full_07.jpg",
  /**/"/assets/img/projects/projects_backlinkassassin_full_08.jpg",
  /**/"/assets/img/projects/projects_backlinkassassin_full_09.jpg",
  /**/"/assets/img/projects/projects_backlinkassassin_full_10.jpg",
  /**/"/assets/img/projects/projects_backlinkassassin_full_11.jpg",
  /**/"/assets/img/projects/projects_backlinkassassin_full_12.jpg",
  /**/"/assets/img/projects/projects_backlinkassassin_full_13.jpg",
  /**/"/assets/img/projects/projects_backlinkassassin_full_14.jpg",
  /**/"/assets/img/projects/projects_backlinkassassin_full_15.jpg",
  /**/"/assets/img/projects/projects_backlinkassassin_full_16.jpg",
  /**/"/assets/img/projects/projects_backlinkassassin_full_17.jpg",
  /**/"/assets/img/projects/projects_backlinkassassin_full_18.jpg",
  /**/"/assets/img/projects/projects_backlinkassassin_full_19.jpg",
  /**/"/assets/img/projects/projects_backlinkassassin_full_20.jpg",
  /**/"/assets/img/projects/projects_backlinkassassin_full_21.jpg",
  /**/"/assets/img/projects/projects_backlinkassassin_full_22.jpg",
  /**/"/assets/img/projects/projects_backlinkassassin_full_23.jpg",
  /**/"/assets/img/projects/projects_backlinkassassin_full_24.jpg",
  /**/"/assets/img/projects/projects_bcnl_full_01.jpg",
  /**/"/assets/img/projects/projects_bcnl_full_02.jpg",
  /**/"/assets/img/projects/projects_bcnl_full_03.jpg",
  /**/"/assets/img/projects/projects_bcnl_full_04.jpg",
  /**/"/assets/img/projects/projects_bcnl_full_05.jpg",
  /**/"/assets/img/projects/projects_bcnl_full_06.jpg",
  /**/"/assets/img/projects/projects_bcnl_full_07.jpg",
  /**/"/assets/img/projects/projects_bcnl_full_08.jpg",
  /**/"/assets/img/projects/projects_bcnl_full_09.jpg",
  /**/"/assets/img/projects/projects_bcnl_full_10.jpg",
  /**/"/assets/img/projects/projects_cfp_full_01.jpg",
  /**/"/assets/img/projects/projects_cfp_full_02.jpg",
  /**/"/assets/img/projects/projects_cfp_full_03.jpg",
  /**/"/assets/img/projects/projects_cfp_full_04.jpg",
  /**/"/assets/img/projects/projects_cfp_full_05.jpg",
  /**/"/assets/img/projects/projects_cfp_full_06.jpg",
  /**/"/assets/img/projects/projects_cfp_full_07.jpg",
  /**/"/assets/img/projects/projects_climateadvisers_full_01.jpg",
  /**/"/assets/img/projects/projects_climateadvisers_full_02.jpg",
  /**/"/assets/img/projects/projects_climateadvisers_full_03.jpg",
  /**/"/assets/img/projects/projects_climateadvisers_full_04.jpg",
  /**/"/assets/img/projects/projects_cloudlynx.jpg",
  /**/"/assets/img/projects/projects_cloudlynx_full_06.jpg",
  /**/"/assets/img/projects/projects_cloudlynx_full_09.jpg",
  /**/"/assets/img/projects/projects_cloudlynx_full_14.jpg",
  /**/"/assets/img/projects/projects_cloudlynx_full_17.jpg",
  /**/"/assets/img/projects/projects_cryptochip.jpg",
  /**/"/assets/img/projects/projects_cryptochip_full_01.jpg",
  /**/"/assets/img/projects/projects_cryptochip_full_02.jpg",
  /**/"/assets/img/projects/projects_cryptochip_full_03.jpg",
  /**/"/assets/img/projects/projects_cryptochip_full_04.jpg",
  /**/"/assets/img/projects/projects_cryptochip_full_05.jpg",
  /**/"/assets/img/projects/projects_cryptochip_full_06.jpg",
  /**/"/assets/img/projects/projects_cryptochip_full_07.jpg",
  /**/"/assets/img/projects/projects_cryptochip_full_08.jpg",
  /**/"/assets/img/projects/projects_drones.jpg",
  /**/"/assets/img/projects/projects_drones_full_01.jpg",
  /**/"/assets/img/projects/projects_drones_full_02.jpg",
  /**/"/assets/img/projects/projects_drones_full_03.jpg",
  /**/"/assets/img/projects/projects_drones_full_04.jpg",
  /**/"/assets/img/projects/projects_drones_full_05.jpg",
  /**/"/assets/img/projects/projects_drones_full_06.jpg",
  /**/"/assets/img/projects/projects_drones_full_07.jpg",
  /**/"/assets/img/projects/projects_drones_full_08.jpg",
  /**/"/assets/img/projects/projects_drones_full_09.jpg",
  /**/"/assets/img/projects/projects_drones_full_10.jpg",
  /**/"/assets/img/projects/projects_drones_full_11.jpg",
  /**/"/assets/img/projects/projects_drones_full_12.jpg",
  /**/"/assets/img/projects/projects_drones_full_13.jpg",
  /**/"/assets/img/projects/projects_drones_full_14.jpg",
  /**/"/assets/img/projects/projects_drones_full_15.jpg",
  /**/"/assets/img/projects/projects_drones_full_16.jpg",
  /**/"/assets/img/projects/projects_drones_full_17.jpg",
  /**/"/assets/img/projects/projects_drones_full_18.jpg",
  /**/"/assets/img/projects/projects_drones_full_19.jpg",
  /**/"/assets/img/projects/projects_drones_full_20.jpg",
  /**/"/assets/img/projects/projects_drones_full_21.jpg",
  /**/"/assets/img/projects/projects_drones_full_22.jpg",
  /**/"/assets/img/projects/projects_drones_full_23.jpg",
  /**/"/assets/img/projects/projects_drones_full_24.jpg",
  /**/"/assets/img/projects/projects_drones_full_25.jpg",
  /**/"/assets/img/projects/projects_drones_full_26.jpg",
  /**/"/assets/img/projects/projects_drones_full_27.jpg",
  /**/"/assets/img/projects/projects_drones_full_28.jpg",
  /**/"/assets/img/projects/projects_drones_full_29.jpg",
  /**/"/assets/img/projects/projects_drones_full_30.jpg",
  /**/"/assets/img/projects/projects_drones_full_31.jpg",
  /**/"/assets/img/projects/projects_drones_full_32.jpg",
  /**/"/assets/img/projects/projects_drones_full_33.jpg",
  /**/"/assets/img/projects/projects_drones_full_34.jpg",
  /**/"/assets/img/projects/projects_drones_full_35.jpg",
  /**/"/assets/img/projects/projects_drones_full_36.jpg",
  /**/"/assets/img/projects/projects_drones_full_37.jpg",
  /**/"/assets/img/projects/projects_drones_full_38.jpg",
  /**/"/assets/img/projects/projects_drones_full_39.jpg",
  /**/"/assets/img/projects/projects_drones_full_40.jpg",
  /**/"/assets/img/projects/projects_drones_full_41.jpg",
  /**/"/assets/img/projects/projects_drones_full_42.jpg",
  /**/"/assets/img/projects/projects_drones_full_43.jpg",
  /**/"/assets/img/projects/projects_drones_full_44.jpg",
  /**/"/assets/img/projects/projects_drones_full_45.jpg",
  /**/"/assets/img/projects/projects_drones_full_46.jpg",
  /**/"/assets/img/projects/projects_drones_full_47.jpg",
  /**/"/assets/img/projects/projects_drones_full_48.jpg",
  /**/"/assets/img/projects/projects_drones_full_49.jpg",
  /**/"/assets/img/projects/projects_drones_full_50.jpg",
  /**/"/assets/img/projects/projects_drones_full_51.jpg",
  /**/"/assets/img/projects/projects_drones_full_52.jpg",
  /**/"/assets/img/projects/projects_drones_full_53.jpg",
  /**/"/assets/img/projects/projects_ebook_ingressbootcamp.jpg",
  /**/"/assets/img/projects/projects_farmacy.jpg",
  /**/"/assets/img/projects/projects_farmacy_full_01.jpg",
  /**/"/assets/img/projects/projects_farmacy_full_02.jpg",
  /**/"/assets/img/projects/projects_farmacy_full_03.jpg",
  /**/"/assets/img/projects/projects_farmacy_full_04.jpg",
  /**/"/assets/img/projects/projects_farmacy_full_05.jpg",
  /**/"/assets/img/projects/projects_farmacy_full_06.jpg",
  /**/"/assets/img/projects/projects_farmacy_full_07.jpg",
  /**/"/assets/img/projects/projects_farmacy_full_08.jpg",
  /**/"/assets/img/projects/projects_glyphhacker_full_01.jpg",
  /**/"/assets/img/projects/projects_glyphhacker_full_02.jpg",
  /**/"/assets/img/projects/projects_glyphhacker_full_03.jpg",
  /**/"/assets/img/projects/projects_glyphhacker_full_04.jpg",
  /**/"/assets/img/projects/projects_glyphhacker_full_05.jpg",
  /**/"/assets/img/projects/projects_glyphhacker_full_06.jpg",
  /**/"/assets/img/projects/projects_glyphhacker_full_07.jpg",
  /**/"/assets/img/projects/projects_glyphhacker_full_08.jpg",
  /**/"/assets/img/projects/projects_glyphhacker_full_09.jpg",
  /**/"/assets/img/projects/projects_glyphhacker_full_10.jpg",
  /**/"/assets/img/projects/projects_glyphhacker_full_11.jpg",
  /**/"/assets/img/projects/projects_glyphhacker_full_12.jpg",
  /**/"/assets/img/projects/projects_glyphhacker_full_13.jpg",
  /**/"/assets/img/projects/projects_glyphhacker_full_14.jpg",
  /**/"/assets/img/projects/projects_glyphhacker_full_15.jpg",
  /**/"/assets/img/projects/projects_glyphhacker_full_16.jpg",
  /**/"/assets/img/projects/projects_glyphhacker_full_17.jpg",
  /**/"/assets/img/projects/projects_glyphhacker_full_18.jpg",
  /**/"/assets/img/projects/projects_hacking.jpg",
  /**/"/assets/img/projects/projects_hacking_full_01.jpg",
  /**/"/assets/img/projects/projects_hacking_full_02.jpg",
  /**/"/assets/img/projects/projects_hacking_full_03.jpg",
  /**/"/assets/img/projects/projects_hacking_full_04.jpg",
  /**/"/assets/img/projects/projects_hacking_full_05.jpg",
  /**/"/assets/img/projects/projects_hacking_full_06.jpg",
  /**/"/assets/img/projects/projects_hacking_full_07.jpg",
  /**/"/assets/img/projects/projects_hacking_full_08.jpg",
  /**/"/assets/img/projects/projects_hacking_full_09.jpg",
  /**/"/assets/img/projects/projects_hacking_full_10.jpg",
  /**/"/assets/img/projects/projects_hacking_full_11.jpg",
  /**/"/assets/img/projects/projects_hacking_full_12.jpg",
  /**/"/assets/img/projects/projects_hacking_full_13.jpg",
  /**/"/assets/img/projects/projects_hacking_full_14.jpg",
  /**/"/assets/img/projects/projects_hacking_full_15.jpg",
  /**/"/assets/img/projects/projects_hacking_full_16.jpg",
  /**/"/assets/img/projects/projects_hacking_full_17.jpg",
  /**/"/assets/img/projects/projects_hacking_full_18.jpg",
  /**/"/assets/img/projects/projects_hacking_full_19.jpg",
  /**/"/assets/img/projects/projects_hacking_full_20.jpg",
  /**/"/assets/img/projects/projects_hacking_full_21.jpg",
  /**/"/assets/img/projects/projects_hacking_full_22.jpg",
  /**/"/assets/img/projects/projects_hacking_full_23.jpg",
  /**/"/assets/img/projects/projects_hacking_full_24.jpg",
  /**/"/assets/img/projects/projects_hacking_full_25.jpg",
  /**/"/assets/img/projects/projects_hacking_full_26.jpg",
  /**/"/assets/img/projects/projects_hacking_full_27.jpg",
  /**/"/assets/img/projects/projects_hacking_full_28.jpg",
  /**/"/assets/img/projects/projects_hacking_full_29.jpg",
  /**/"/assets/img/projects/projects_hacking_full_30.jpg",
  /**/"/assets/img/projects/projects_hacking_full_31.jpg",
  /**/"/assets/img/projects/projects_hacking_full_32.jpg",
  /**/"/assets/img/projects/projects_hacking_full_33.jpg",
  /**/"/assets/img/projects/projects_hacking_full_34.jpg",
  /**/"/assets/img/projects/projects_hacking_full_35.jpg",
  /**/"/assets/img/projects/projects_hacking_full_36.jpg",
  /**/"/assets/img/projects/projects_hacking_full_37.jpg",
  /**/"/assets/img/projects/projects_hacking_full_38.jpg",
  /**/"/assets/img/projects/projects_hacking_full_39.jpg",
  /**/"/assets/img/projects/projects_hacking_full_40.jpg",
  /**/"/assets/img/projects/projects_hacking_full_41.jpg",
  /**/"/assets/img/projects/projects_hacking_full_42.jpg",
  /**/"/assets/img/projects/projects_hacking_full_43.jpg",
  /**/"/assets/img/projects/projects_hacking_full_44.jpg",
  /**/"/assets/img/projects/projects_hacking_full_45.jpg",
  /**/"/assets/img/projects/projects_hacking_full_46.jpg",
  /**/"/assets/img/projects/projects_hacking_full_47.jpg",
  /**/"/assets/img/projects/projects_hacking_full_48.jpg",
  /**/"/assets/img/projects/projects_hacking_full_49.jpg",
  /**/"/assets/img/projects/projects_hacking_full_50.jpg",
  /**/"/assets/img/projects/projects_hacking_full_52.jpg",
  /**/"/assets/img/projects/projects_hacking_full_53.jpg",
  /**/"/assets/img/projects/projects_hacking_full_54.jpg",
  /**/"/assets/img/projects/projects_hacking_full_55.jpg",
  /**/"/assets/img/projects/projects_hacking_full_56.jpg",
  /**/"/assets/img/projects/projects_hacking_full_57.jpg",
  /**/"/assets/img/projects/projects_hacking_full_58.jpg",
  /**/"/assets/img/projects/projects_hacking_full_59.jpg",
  /**/"/assets/img/projects/projects_hacking_full_60.jpg",
  /**/"/assets/img/projects/projects_ibitcoin.jpg",
  /**/"/assets/img/projects/projects_ingressbootcamp_full_01.jpg",
  /**/"/assets/img/projects/projects_ingressbootcamp_full_02.jpg",
  /**/"/assets/img/projects/projects_ingressbootcamp_full_03.jpg",
  /**/"/assets/img/projects/projects_ingressbootcamp_full_04.jpg",
  /**/"/assets/img/projects/projects_ingressbootcamp_full_05.jpg",
  /**/"/assets/img/projects/projects_ingressbootcamp_full_06.jpg",
  /**/"/assets/img/projects/projects_ingressbootcamp_full_07.jpg",
  /**/"/assets/img/projects/projects_ingressbootcamp_full_08.jpg",
  /**/"/assets/img/projects/projects_ingressbootcamp_full_09.jpg",
  /**/"/assets/img/projects/projects_ingressbootcamp_full_10.jpg",
  /**/"/assets/img/projects/projects_ingressbootcamp_full_11.jpg",
  /**/"/assets/img/projects/projects_ingressbootcamp_full_12.jpg",
  /**/"/assets/img/projects/projects_ingressbootcamp_full_13.jpg",
  /**/"/assets/img/projects/projects_ingressbootcamp_full_14.jpg",
  /**/"/assets/img/projects/projects_ingressbootcamp_full_15.jpg",
  /**/"/assets/img/projects/projects_ingressbootcamp_full_16.jpg",
  /**/"/assets/img/projects/projects_ingressbootcamp_full_17.jpg",
  /**/"/assets/img/projects/projects_ingressbootcamp_full_18.jpg",
  /**/"/assets/img/projects/projects_ingressbootcamp_full_19.jpg",
  /**/"/assets/img/projects/projects_ingressbootcamp_full_20.jpg",
  /**/"/assets/img/projects/projects_ingressbootcamp_full_21.jpg",
  /**/"/assets/img/projects/projects_ingressbootcamp_full_22.jpg",
  /**/"/assets/img/projects/projects_ingressbootcamp_full_23.jpg",
  /**/"/assets/img/projects/projects_ingressbootcamp_full_24.jpg",
  /**/"/assets/img/projects/projects_ingressbootcamp_full_25.jpg",
  /**/"/assets/img/projects/projects_ingressbootcamp_full_26.jpg",
  /**/"/assets/img/projects/projects_instatunnel.jpg",
  /**/"/assets/img/projects/projects_instatunnel_full_01.jpg",
  /**/"/assets/img/projects/projects_instatunnel_full_02.jpg",
  /**/"/assets/img/projects/projects_instatunnel_full_03.jpg",
  /**/"/assets/img/projects/projects_ipst_full_01.jpg",
  /**/"/assets/img/projects/projects_ipst_full_02.jpg",
  /**/"/assets/img/projects/projects_ipst_full_03.jpg",
  /**/"/assets/img/projects/projects_itsm.jpg",
  /**/"/assets/img/projects/projects_itsm_hp_servicemanager.png",
  /**/"/assets/img/projects/projects_itsm_peregrine_servicecenter.png",
  /**/"/assets/img/projects/projects_itsm_servicenow.png",
  /**/"/assets/img/projects/projects_jinbi.jpg",
  /**/"/assets/img/projects/projects_jinbi_full_01.jpg",
  /**/"/assets/img/projects/projects_jinbi_full_02.jpg",
  /**/"/assets/img/projects/projects_jinbi_full_03.jpg",
  /**/"/assets/img/projects/projects_jinbi_full_04.jpg",
  /**/"/assets/img/projects/projects_jinbi_full_05.jpg",
  /**/"/assets/img/projects/projects_jinbi_full_06.jpg",
  /**/"/assets/img/projects/projects_juicer.jpg",
  /**/"/assets/img/projects/projects_juicer_full_01.jpg",
  /**/"/assets/img/projects/projects_juicer_full_02.jpg",
  /**/"/assets/img/projects/projects_juicer_full_03.jpg",
  /**/"/assets/img/projects/projects_juicer_full_04.jpg",
  /**/"/assets/img/projects/projects_juicer_full_05.jpg",
  /**/"/assets/img/projects/projects_juicer_full_06.jpg",
  /**/"/assets/img/projects/projects_juicer_full_07.jpg",
  /**/"/assets/img/projects/projects_juicer_full_08.jpg",
  /**/"/assets/img/projects/projects_juicer_full_09.jpg",
  /**/"/assets/img/projects/projects_juicer_full_10.jpg",
  /**/"/assets/img/projects/projects_juicer_full_11.jpg",
  /**/"/assets/img/projects/projects_juicer_full_12.jpg",
  /**/"/assets/img/projects/projects_juicer_full_13.jpg",
  /**/"/assets/img/projects/projects_juicer_full_14.jpg",
  /**/"/assets/img/projects/projects_juicer_full_15.jpg",
  /**/"/assets/img/projects/projects_juicer_full_16.jpg",
  /**/"/assets/img/projects/projects_juicer_full_17.jpg",
  /**/"/assets/img/projects/projects_juicer_full_18.jpg",
  /**/"/assets/img/projects/projects_juicer_full_19.jpg",
  /**/"/assets/img/projects/projects_juicer_full_20.jpg",
  /**/"/assets/img/projects/projects_juicer_full_21.jpg",
  /**/"/assets/img/projects/projects_juicer_full_22.jpg",
  /**/"/assets/img/projects/projects_juicer_full_23.jpg",
  /**/"/assets/img/projects/projects_juicer_full_24.jpg",
  /**/"/assets/img/projects/projects_juicer_full_25.jpg",
  /**/"/assets/img/projects/projects_karakoram.jpg",
  /**/"/assets/img/projects/projects_karakoram_full_01.jpg",
  /**/"/assets/img/projects/projects_karakoram_full_02.jpg",
  /**/"/assets/img/projects/projects_karakoram_full_03.jpg",
  /**/"/assets/img/projects/projects_karakoram_full_04.jpg",
  /**/"/assets/img/projects/projects_karakoram_full_05.jpg",
  /**/"/assets/img/projects/projects_leesplankje.jpg",
  /**/"/assets/img/projects/projects_legalcounselor.jpg",
  /**/"/assets/img/projects/projects_legalcounselor_full_01.jpg",
  /**/"/assets/img/projects/projects_legalcounselor_full_02.jpg",
  /**/"/assets/img/projects/projects_legalcounselor_full_03.jpg",
  /**/"/assets/img/projects/projects_legalcounselor_full_04.jpg",
  /**/"/assets/img/projects/projects_logo_appcodex.jpg",
  /**/"/assets/img/projects/projects_logo_appcodex_full.jpg",
  /**/"/assets/img/projects/projects_logo_ingressbootcamp.jpg",
  /**/"/assets/img/projects/projects_logo_instatunnel.jpg",
  /**/"/assets/img/projects/projects_logo_resnl.jpg",
  /**/"/assets/img/projects/projects_mobile_astroweather.jpg",
  /**/"/assets/img/projects/projects_mobile_haarlem.jpg",
  /**/"/assets/img/projects/projects_mobile_hostingondemand.jpg",
  /**/"/assets/img/projects/projects_mobile_ibitcoin.jpg",
  /**/"/assets/img/projects/projects_mobile_idomotics.jpg",
  /**/"/assets/img/projects/projects_mobile_ipst.jpg",
  /**/"/assets/img/projects/projects_mobile_jetsupport.jpg",
  /**/"/assets/img/projects/projects_mobile_leesplankje.jpg",
  /**/"/assets/img/projects/projects_mobile_suitsupply.jpg",
  /**/"/assets/img/projects/projects_mockup_cloudlynx.jpg",
  /**/"/assets/img/projects/projects_mockups_cloudlynx_full_01.jpg",
  /**/"/assets/img/projects/projects_mockups_cloudlynx_full_02.jpg",
  /**/"/assets/img/projects/projects_mockups_cloudlynx_full_03.jpg",
  /**/"/assets/img/projects/projects_mockups_cloudlynx_full_04.jpg",
  /**/"/assets/img/projects/projects_mockups_cloudlynx_full_05.jpg",
  /**/"/assets/img/projects/projects_mockups_cloudlynx_full_06.jpg",
  /**/"/assets/img/projects/projects_mockups_cloudlynx_full_07.jpg",
  /**/"/assets/img/projects/projects_mockups_cloudlynx_full_08.jpg",
  /**/"/assets/img/projects/projects_mockups_cloudlynx_full_09.jpg",
  /**/"/assets/img/projects/projects_mockups_cloudlynx_full_10.jpg",
  /**/"/assets/img/projects/projects_mockups_cloudlynx_full_11.jpg",
  /**/"/assets/img/projects/projects_mockups_cloudlynx_full_12.jpg",
  /**/"/assets/img/projects/projects_mockups_cloudlynx_full_13.jpg",
  /**/"/assets/img/projects/projects_mockups_cloudlynx_full_14.jpg",
  /**/"/assets/img/projects/projects_mockups_cloudlynx_full_15.jpg",
  /**/"/assets/img/projects/projects_mockups_cloudlynx_full_16.jpg",
  /**/"/assets/img/projects/projects_mockups_cloudlynx_full_17.jpg",
  /**/"/assets/img/projects/projects_mockups_cloudlynx_full_18.jpg",
  /**/"/assets/img/projects/projects_mpowa.jpg",
  /**/"/assets/img/projects/projects_mpowa_full_01.jpg",
  /**/"/assets/img/projects/projects_mpowa_full_02.jpg",
  /**/"/assets/img/projects/projects_mpowa_full_03.jpg",
  /**/"/assets/img/projects/projects_mpowa_full_04.jpg",
  /**/"/assets/img/projects/projects_mpowa_full_05.jpg",
  /**/"/assets/img/projects/projects_mpowa_full_06.jpg",
  /**/"/assets/img/projects/projects_mpowa_full_07.jpg",
  /**/"/assets/img/projects/projects_mpowa_full_08.jpg",
  /**/"/assets/img/projects/projects_mpowa_full_09.jpg",
  /**/"/assets/img/projects/projects_mpowa_full_10.jpg",
  /**/"/assets/img/projects/projects_mpowa_full_11.jpg",
  /**/"/assets/img/projects/projects_mpowa_full_12.jpg",
  /**/"/assets/img/projects/projects_mpowa_full_13.jpg",
  /**/"/assets/img/projects/projects_mpowa_full_14.jpg",
  /**/"/assets/img/projects/projects_mpowa_full_15.jpg",
  /**/"/assets/img/projects/projects_mpowa_full_16.jpg",
  /**/"/assets/img/projects/projects_mpowa_full_17.jpg",
  /**/"/assets/img/projects/projects_mpowa_full_18.jpg",
  /**/"/assets/img/projects/projects_mpowa_full_19.jpg",
  /**/"/assets/img/projects/projects_mpowa_full_20.jpg",
  /**/"/assets/img/projects/projects_mpowa_full_21.jpg",
  /**/"/assets/img/projects/projects_mpowa_full_22.jpg",
  /**/"/assets/img/projects/projects_mpowa_full_23.jpg",
  /**/"/assets/img/projects/projects_phibo.jpg",
  /**/"/assets/img/projects/projects_phibo_full_01.jpg",
  /**/"/assets/img/projects/projects_phibo_full_02.jpg",
  /**/"/assets/img/projects/projects_phibo_full_03.jpg",
  /**/"/assets/img/projects/projects_phibo_full_04.jpg",
  /**/"/assets/img/projects/projects_physical_cloudlynx.jpg",
  /**/"/assets/img/projects/projects_physical_glyphhacker.jpg",
  /**/"/assets/img/projects/projects_physical_instatunnel.jpg",
  /**/"/assets/img/projects/projects_physical_resnl.jpg",
  /**/"/assets/img/projects/projects_physical_resnl_badge.jpg",
  /**/"/assets/img/projects/projects_physical_rotorswag.jpg",
  /**/"/assets/img/projects/projects_physical_tiltdrone.jpg",
  /**/"/assets/img/projects/projects_physical_ziedesterren.jpg",
  /**/"/assets/img/projects/projects_pillar.jpg",
  /**/"/assets/img/projects/projects_pillar_full_01.jpg",
  /**/"/assets/img/projects/projects_pillar_full_02.jpg",
  /**/"/assets/img/projects/projects_pillar_full_03.jpg",
  /**/"/assets/img/projects/projects_pillar_full_04.jpg",
  /**/"/assets/img/projects/projects_pillar_full_05.jpg",
  /**/"/assets/img/projects/projects_pillar_full_06.jpg",
  /**/"/assets/img/projects/projects_pillar_full_07.jpg",
  /**/"/assets/img/projects/projects_pillar_full_08.jpg",
  /**/"/assets/img/projects/projects_pillar_full_09.jpg",
  /**/"/assets/img/projects/projects_pillar_full_10.jpg",
  /**/"/assets/img/projects/projects_pillar_full_11.jpg",
  /**/"/assets/img/projects/projects_pillar_full_12.jpg",
  /**/"/assets/img/projects/projects_pillar_full_13.jpg",
  /**/"/assets/img/projects/projects_pillar_full_14.jpg",
  /**/"/assets/img/projects/projects_pillar_full_15.jpg",
  /**/"/assets/img/projects/projects_pillar_full_16.jpg",
  /**/"/assets/img/projects/projects_pillar_full_17.jpg",
  /**/"/assets/img/projects/projects_pillar_full_18.jpg",
  /**/"/assets/img/projects/projects_pillar_full_19.jpg",
  /**/"/assets/img/projects/projects_pillar_full_20.jpg",
  /**/"/assets/img/projects/projects_pillar_full_21.jpg",
  /**/"/assets/img/projects/projects_pillar_full_22.jpg",
  /**/"/assets/img/projects/projects_pillar_full_23.jpg",
  /**/"/assets/img/projects/projects_pillar_full_24.jpg",
  /**/"/assets/img/projects/projects_pillar_full_25.jpg",
  /**/"/assets/img/projects/projects_pillar_full_26.jpg",
  /**/"/assets/img/projects/projects_pillar_full_27.jpg",
  /**/"/assets/img/projects/projects_pillar_full_28.jpg",
  /**/"/assets/img/projects/projects_pillar_full_29.jpg",
  /**/"/assets/img/projects/projects_pillar_full_30.jpg",
  /**/"/assets/img/projects/projects_pillar_full_31.jpg",
  /**/"/assets/img/projects/projects_pillar_full_32.jpg",
  /**/"/assets/img/projects/projects_pillar_full_33.jpg",
  /**/"/assets/img/projects/projects_pillar_full_34.jpg",
  /**/"/assets/img/projects/projects_pillar_full_35.jpg",
  /**/"/assets/img/projects/projects_pillar_full_36.jpg",
  /**/"/assets/img/projects/projects_pillar_full_37.jpg",
  /**/"/assets/img/projects/projects_pillar_full_38.jpg",
  /**/"/assets/img/projects/projects_pillar_full_39.jpg",
  /**/"/assets/img/projects/projects_pillar_full_40.jpg",
  /**/"/assets/img/projects/projects_pillar_full_41.jpg",
  /**/"/assets/img/projects/projects_pillar_full_42.jpg",
  /**/"/assets/img/projects/projects_pillar_full_43.jpg",
  /**/"/assets/img/projects/projects_pillar_full_44.jpg",
  /**/"/assets/img/projects/projects_pillar_full_45.jpg",
  /**/"/assets/img/projects/projects_pillar_full_46.jpg",
  /**/"/assets/img/projects/projects_pillar_full_47.jpg",
  /**/"/assets/img/projects/projects_pillar_full_48.jpg",
  /**/"/assets/img/projects/projects_pillar_full_49.jpg",
  /**/"/assets/img/projects/projects_pillar_full_50.jpg",
  /**/"/assets/img/projects/projects_pillar_full_51.jpg",
  /**/"/assets/img/projects/projects_pillar_full_52.jpg",
  /**/"/assets/img/projects/projects_pillar_full_53.jpg",
  /**/"/assets/img/projects/projects_pillar_full_54.jpg",
  /**/"/assets/img/projects/projects_pillar_full_55.jpg",
  /**/"/assets/img/projects/projects_pillar_full_56.jpg",
  /**/"/assets/img/projects/projects_pillar_full_57.jpg",
  /**/"/assets/img/projects/projects_pillar_full_58.jpg",
  /**/"/assets/img/projects/projects_pillar_full_59.jpg",
  /**/"/assets/img/projects/projects_pillar_full_60.jpg",
  /**/"/assets/img/projects/projects_pillar_full_61.jpg",
  /**/"/assets/img/projects/projects_pillar_full_62.jpg",
  /**/"/assets/img/projects/projects_pillar_full_63.jpg",
  /**/"/assets/img/projects/projects_pillar_full_64.jpg",
  /**/"/assets/img/projects/projects_pillar_full_65.jpg",
  /**/"/assets/img/projects/projects_pillar_full_66.jpg",
  /**/"/assets/img/projects/projects_pillar_full_67.jpg",
  /**/"/assets/img/projects/projects_pillar_full_68.jpg",
  /**/"/assets/img/projects/projects_pivx.jpg",
  /**/"/assets/img/projects/projects_pivx_full_01.jpg",
  /**/"/assets/img/projects/projects_productdev.jpg",
  /**/"/assets/img/projects/projects_resnl_full_01.jpg",
  /**/"/assets/img/projects/projects_resnl_full_02.jpg",
  /**/"/assets/img/projects/projects_resnl_full_03.jpg",
  /**/"/assets/img/projects/projects_resnl_full_04.jpg",
  /**/"/assets/img/projects/projects_resnl_full_05.jpg",
  /**/"/assets/img/projects/projects_resnl_full_06.jpg",
  /**/"/assets/img/projects/projects_rotorswag_full_01.jpg",
  /**/"/assets/img/projects/projects_rotorswag_full_02.jpg",
  /**/"/assets/img/projects/projects_rotorswag_full_03.jpg",
  /**/"/assets/img/projects/projects_rotorswag_full_04.jpg",
  /**/"/assets/img/projects/projects_rotorswag_full_05.jpg",
  /**/"/assets/img/projects/projects_rotorswag_full_06.jpg",
  /**/"/assets/img/projects/projects_rotorswag_full_07.jpg",
  /**/"/assets/img/projects/projects_rotorswag_full_08.jpg",
  /**/"/assets/img/projects/projects_rotorswag_full_09.jpg",
  /**/"/assets/img/projects/projects_rotorswag_full_10.jpg",
  /**/"/assets/img/projects/projects_rotorswag_full_11.jpg",
  /**/"/assets/img/projects/projects_rotorswag_full_12.jpg",
  /**/"/assets/img/projects/projects_rotorswag_full_13.jpg",
  /**/"/assets/img/projects/projects_rotorswag_full_14.jpg",
  /**/"/assets/img/projects/projects_rotorswag_full_15.jpg",
  /**/"/assets/img/projects/projects_rotorswag_full_16.jpg",
  /**/"/assets/img/projects/projects_rotorswag_full_17.jpg",
  /**/"/assets/img/projects/projects_security.jpg",
  /**/"/assets/img/projects/projects_software.jpg",
  /**/"/assets/img/projects/projects_tiltdrone_full_01.jpg",
  /**/"/assets/img/projects/projects_tiltdrone_full_02.jpg",
  /**/"/assets/img/projects/projects_tiltdrone_full_03.jpg",
  /**/"/assets/img/projects/projects_tiltdrone_full_04.jpg",
  /**/"/assets/img/projects/projects_tiltdrone_full_05.jpg",
  /**/"/assets/img/projects/projects_tiltdrone_full_06.jpg",
  /**/"/assets/img/projects/projects_tiltdrone_full_07.jpg",
  /**/"/assets/img/projects/projects_torustech_full_01.jpg",
  /**/"/assets/img/projects/projects_torustech_full_02.jpg",
  /**/"/assets/img/projects/projects_torustech_full_03.jpg",
  /**/"/assets/img/projects/projects_torustech_full_04.jpg",
  /**/"/assets/img/projects/projects_torustech_full_05.jpg",
  /**/"/assets/img/projects/projects_torustech_full_06.jpg",
  /**/"/assets/img/projects/projects_torustech_full_07.jpg",
  /**/"/assets/img/projects/projects_torustech_full_08.jpg",
  /**/"/assets/img/projects/projects_torustech_full_09.jpg",
  /**/"/assets/img/projects/projects_torustech_full_10.jpg",
  /**/"/assets/img/projects/projects_toxicmaxi.jpg",
  /**/"/assets/img/projects/projects_toxicmaxi_full_01.jpg",
  /**/"/assets/img/projects/projects_toxicmaxi_full_02.jpg",
  /**/"/assets/img/projects/projects_toxicmaxi_full_03.jpg",
  /**/"/assets/img/projects/projects_toxicmaxi_full_04.jpg",
  /**/"/assets/img/projects/projects_toxicmaxi_full_05.jpg",
  /**/"/assets/img/projects/projects_toxicmaxi_full_06.jpg",
  /**/"/assets/img/projects/projects_toxicmaxi_full_07.jpg",
  /**/"/assets/img/projects/projects_toxicmaxi_full_08.jpg",
  /**/"/assets/img/projects/projects_toxicmaxi_full_09.jpg",
  /**/"/assets/img/projects/projects_toxicmaxi_full_10.jpg",
  /**/"/assets/img/projects/projects_toxicmaxi_full_11.jpg",
  /**/"/assets/img/projects/projects_toxicmaxi_logo.png",
  /**/"/assets/img/projects/projects_wardial.jpg",
  /**/"/assets/img/projects/projects_wardial_full_01.jpg",
  /**/"/assets/img/projects/projects_wardial_full_02.jpg",
  /**/"/assets/img/projects/projects_wardial_full_03.jpg",
  /**/"/assets/img/projects/projects_wardial_full_04.jpg",
  /**/"/assets/img/projects/projects_wardial_full_05.gif",
  /**/"/assets/img/projects/projects_webapp_backlinkassassin.jpg",
  /**/"/assets/img/projects/projects_webapp_juicer.jpg",
  /**/"/assets/img/projects/projects_website_agrodroneai.jpg",
  /**/"/assets/img/projects/projects_website_apostilleusa.jpg",
  /**/"/assets/img/projects/projects_website_appcodex.jpg",
  /**/"/assets/img/projects/projects_website_appcodex_full_01.jpg",
  /**/"/assets/img/projects/projects_website_appcodex_full_02.jpg",
  /**/"/assets/img/projects/projects_website_appcodex_full_03.jpg",
  /**/"/assets/img/projects/projects_website_appcodex_full_04.jpg",
  /**/"/assets/img/projects/projects_website_appcodex_full_05.jpg",
  /**/"/assets/img/projects/projects_website_aum.jpg",
  /**/"/assets/img/projects/projects_website_bcnl.jpg",
  /**/"/assets/img/projects/projects_website_climateadvisers.jpg",
  /**/"/assets/img/projects/projects_website_climatefinancepathfinder.jpg",
  /**/"/assets/img/projects/projects_website_instatunnel.jpg",
  /**/"/assets/img/projects/projects_website_resnl.jpg",
  /**/"/assets/img/projects/projects_website_torustech.jpg",
  /**/"/assets/img/projects/projects_website_toxicmaxi.jpg",
  /**/"/assets/img/projects/projects_wifipineapple.png",
  /**/"/assets/img/projects/projects_yesdelft.jpg",
  /**/"/assets/img/projects/projects_yesdelft_full_01.jpg",
  /**/"/assets/img/projects/projects_yesdelft_full_02.jpg",
  /**/"/assets/img/projects/projects_yesdelft_full_03.jpg",
  /**/"/assets/img/projects/projects_yesdelft_full_04.jpg",
  /**/"/assets/img/projects/projects_yesdelft_full_05.jpg",
  /**/"/assets/img/projects/projects_yesdelft_full_06.jpg",
  /**/"/assets/img/projects/projects_ziedesterren_full_01.jpg",
  /**/"/assets/img/projects/sanddunes.png",
  /**/"/assets/img/projects/screen_01.jpg",
  /**/"/assets/img/projects/screen_02.jpg",
  /**/"/assets/img/projects/screen_03.jpg",
  /**/"/assets/img/projects/screen_04.jpg",
  /**/"/assets/img/projects/screen_05.jpg",
  /**/"/assets/img/projects/screen_06.jpg",
  /**/"/assets/img/projects/screen_07.jpg",
  /**/"/assets/img/projects/screen_08.jpg",
  /**/"/assets/img/projects/screen_09.jpg",
  /**/"/assets/img/projects/screen_10.jpg",
  /**/"/assets/img/projects/tumbler_500px.jpg",
  /**/"/assets/img/projects/vincent.gif",
  /**/"/assets/img/projects/wardial.jpg",
  /**/"/assets/img/projects/wardial_500px.jpg",
  /**/"/assets/img/sidebar-bg.jpg",
  /**/"/assets/img/sidebar_bitcoin.jpg",
  /**/"/assets/img/swipe.svg",
  /**/"/assets/js/0-hydejack-9.2.1.worker.js",
  /**/"/assets/js/LEGACY-0-hydejack-9.2.1.worker.js",
  /**/"/assets/js/LEGACY-clap-button-hydejack-9.2.1.js",
  /**/"/assets/js/LEGACY-drawer-hydejack-9.2.1.js",
  /**/"/assets/js/LEGACY-fetch-hydejack-9.2.1.js",
  /**/"/assets/js/LEGACY-hydejack-9.2.1.js",
  /**/"/assets/js/LEGACY-navbar-hydejack-9.2.1.js",
  /**/"/assets/js/LEGACY-push-state-hydejack-9.2.1.js",
  /**/"/assets/js/LEGACY-resize-observer-hydejack-9.2.1.js",
  /**/"/assets/js/LEGACY-search-hydejack-9.2.1.js",
  /**/"/assets/js/LEGACY-shadydom-hydejack-9.2.1.js",
  /**/"/assets/js/LEGACY-toc-hydejack-9.2.1.js",
  /**/"/assets/js/LEGACY-vendors~clap-button-hydejack-9.2.1.js",
  /**/"/assets/js/LEGACY-vendors~drawer-hydejack-9.2.1.js",
  /**/"/assets/js/LEGACY-vendors~drawer~push-state-hydejack-9.2.1.js",
  /**/"/assets/js/LEGACY-vendors~drawer~push-state~search-hydejack-9.2.1.js",
  /**/"/assets/js/LEGACY-vendors~fetch-hydejack-9.2.1.js",
  /**/"/assets/js/LEGACY-vendors~intersection-observer-hydejack-9.2.1.js",
  /**/"/assets/js/LEGACY-vendors~push-state-hydejack-9.2.1.js",
  /**/"/assets/js/LEGACY-vendors~search-hydejack-9.2.1.js",
  /**/"/assets/js/LEGACY-vendors~shadydom-hydejack-9.2.1.js",
  /**/"/assets/js/LEGACY-vendors~webanimations-hydejack-9.2.1.js",
  /**/"/assets/js/LEGACY-vendors~webcomponents-hydejack-9.2.1.js",
  /**/"/assets/js/LEGACY-webcomponents-hydejack-9.2.1.js",
  /**/"/assets/js/clap-button-hydejack-9.2.1.js",
  /**/"/assets/js/drawer-hydejack-9.2.1.js",
  /**/"/assets/js/fetch-hydejack-9.2.1.js",
  /**/"/assets/js/hydejack-9.2.1.js",
  /**/"/assets/js/navbar-hydejack-9.2.1.js",
  /**/"/assets/js/push-state-hydejack-9.2.1.js",
  /**/"/assets/js/resize-observer-hydejack-9.2.1.js",
  /**/"/assets/js/search-hydejack-9.2.1.js",
  /**/"/assets/js/shadydom-hydejack-9.2.1.js",
  /**/"/assets/js/toc-hydejack-9.2.1.js",
  /**/"/assets/js/vendors~clap-button-hydejack-9.2.1.js",
  /**/"/assets/js/vendors~drawer-hydejack-9.2.1.js",
  /**/"/assets/js/vendors~drawer~push-state-hydejack-9.2.1.js",
  /**/"/assets/js/vendors~drawer~push-state~search-hydejack-9.2.1.js",
  /**/"/assets/js/vendors~fetch-hydejack-9.2.1.js",
  /**/"/assets/js/vendors~intersection-observer-hydejack-9.2.1.js",
  /**/"/assets/js/vendors~push-state-hydejack-9.2.1.js",
  /**/"/assets/js/vendors~search-hydejack-9.2.1.js",
  /**/"/assets/js/vendors~shadydom-hydejack-9.2.1.js",
  /**/"/assets/js/vendors~webanimations-hydejack-9.2.1.js",
  /**/"/assets/js/webcomponents-hydejack-9.2.1.js",
  /**/"/assets/resume.json",
  /**/"/assets/rs_reijs_resume.pdf",
  /**/"/assets/version.json",
  /**/"/assets/bower_components/MathJax/.bower.json",
  /**/"/assets/bower_components/html5shiv/.bower.json",
  /**/"/assets/bower_components/katex/.bower.json",
  /**/
];

const PRE_CACHED_ASSETS = [
  '/assets/icons/favicon.ico',
  /**/"/assets/img/sidebar_bitcoin.jpg",/**/
  /**/"/assets/img/logo.png",/**/
  /**/"/assets/img/swipe.svg",
  /**/
];

// Files we add on every service worker installation.
const CONTENT_FILES = [
  "/",
  "/offline.html",
  /**/
];

const SITE_URL = new URL("/", self.location);
const OFFLINE_PAGE_URL = new URL("/offline.html", self.location);

self.addEventListener("install", e => e.waitUntil(onInstall(e)));
self.addEventListener("activate", e => e.waitUntil(onActivate(e)));
self.addEventListener("fetch", e => e.respondWith(onFetch(e)));

// Takes a URL with pathname like `/foo/bar/file.txt` and returns just the dirname like `/foo/bar/`.
const dirname = ({ pathname }) => pathname.replace(/[^/]*$/, "");

function matchAll(text, regExp) {
  const globalRegExp = new RegExp(regExp, 'g'); // force global regexp to prevent infinite loop
  const matches = [];
  let lastMatch;
  while (lastMatch = globalRegExp.exec(text)) matches.push(lastMatch);
  return matches;
}

// Returns the second element of an iterable (first match in RegExp match array)
const second = ([, _]) => _;

const toAbsoluteURL = url => new URL(url, self.location);

// Creates a URL that bypasses the browser's HTTP cache by appending a random search parameter.
function noCache(url) {
  return new Request(url, { cache: 'no-store' });
}

// Removes the sw search paramter, if present.
function noSWParam(url) {
  const url2 = new URL(url);
  if (url2.searchParams.has(SW_CACHE_SEARCH_PARAM)) {
    url2.searchParams.delete(SW_CACHE_SEARCH_PARAM);
    return url2.href;
  }
  return url;
}

const warn = (e) => {
  console.warn(e);
  return new Response(e.message, { status: 500 });
}

async function getIconFontFiles() {
  const fontURLs = STATIC_FILES.filter(x => (
    x.startsWith('/assets/icomoon/fonts/') &&
    x.endsWith('.woff') 
  ));
  return [ICON_FONT, ...fontURLs];
}
 
async function getKaTeXFontFiles() {
  const fontURLs = STATIC_FILES.filter(x => (
    x.startsWith('/assets/bower_components/katex/dist/fonts/') &&
    x.endsWith('.woff2')
  ));
  return [KATEX_FONT, ...fontURLs];
}

async function getMathJaxFiles() {
  // NOTE: Removed due to MathJax' enormous size. 
  // Uncomment if you're using MathJax and don't mind forcing a 50 MB download on every visitor...
  /*
  const mathJaxFiles = STATIC_FILES.filter(x => (
    x.startsWith('/assets/bower_components/MathJax/es5/') &&
    x.endsWith('.js')
  ));
  const fontURLs = STATIC_FILES.filter(x => (
    x.startsWith('/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2') &&
    x.endsWith('.woff')
  ));
  return [...mathJaxFiles, ...fontURLs];
  */
}

async function getGoogleFontsFiles() {
  const googleFontRes = await fetch(noCache(GOOGLE_FONTS)).catch(warn);
  if (googleFontRes.ok) {
    const text = await googleFontRes.text();
    return [GOOGLE_FONTS, ...matchAll(text, RE_CSS_URL).map(second)];
  }
  return [];
}

function addAll(cache, urls) {
  return Promise.all(
    urls.map(url => (
      fetch(noCache(toAbsoluteURL(url)))
        .then(res => cache.put(url, res))
        .catch(warn)
      )
    )
  );
}

async function cacheShell(cache) {
  const fontFiles = await Promise.all([
    getIconFontFiles(),
    /**/getGoogleFontsFiles(),/**/
    /**/getKaTeXFontFiles(),/**/
    /**/
  ]);

  const jsFiles = STATIC_FILES.filter(url => (
    url.startsWith('/assets/js/') &&
    url.endsWith('.js') && !url.includes('LEGACY')
  ));

  const urls = SHELL_FILES.concat(jsFiles, ...fontFiles).filter(x => !!x);
  return addAll(cache, urls);
}

async function cacheAssets(cache) {
  const urls = PRE_CACHED_ASSETS.filter(x => !!x);
  return addAll(cache, urls);
}

async function cacheContent(cache) {
  const urls = CONTENT_FILES.filter(x => !!x);
  return addAll(cache, urls);
}

async function preCache() {
  const keys = await caches.keys();

  if (keys.includes(SHELL_CACHE) && keys.includes(ASSETS_CACHE)) {
    const contentCache = await caches.open(CONTENT_CACHE);
    return cacheContent(contentCache);
  } else {
    const [shellCache, assetsCache, contentCache] = await Promise.all([
      caches.open(SHELL_CACHE),
      caches.open(ASSETS_CACHE),
      caches.open(CONTENT_CACHE),
    ]);
    return Promise.all([
      cacheShell(shellCache),
      cacheAssets(assetsCache),
      cacheContent(contentCache),
    ]);
  }
}

async function onInstall() {
  await preCache();
  return self.skipWaiting();
}

const isSameSite = ({ origin, pathname }) => origin === SITE_URL.origin && pathname.startsWith(SITE_URL.pathname);
const isAsset = ({ pathname }) => pathname.startsWith("/assets");
const hasSWParam = ({ searchParams }) => searchParams.has(SW_CACHE_SEARCH_PARAM);
const hasNoCacheParam = ({ searchParams }) => searchParams.has(NO_CACHE_SEARCH_PARAM);
const isGoogleFonts = ({ hostname }) => hostname === 'fonts.googleapis.com' || hostname === 'fonts.gstatic.com'

async function cacheResponse(cacheName, req, res) {
  const cache = await caches.open(cacheName);
  return cache.put(req, res);
}

async function onActivate() {
  await self.clients.claim();

  const keys = await caches.keys();

  return Promise.all(
    keys
      // Only consider caches created by this baseurl, i.e. allow multiple Hydejack installations on same domain.
      .filter(key => key.endsWith("sw/"))
      // Delete old caches
      .filter(key => key !== SHELL_CACHE && key !== ASSETS_CACHE && key !== CONTENT_CACHE)
      .map(key => caches.delete(key))
  );
}

const NEVER = new Promise(() => {});

// Returns the first promise that resolves with non-nullish value,
// or `undefined` if all promises resolve with a nullish value.
// Note that this inherits the behavior of `Promise.race`,
// where the returned promise rejects as soon as one input promise rejects.
async function raceTruthy(iterable) {
  const ps = [...iterable].map(_ => Promise.resolve(_));
  let { length } = ps;
  const continueWhenNullish = value => value != null
    ? value
    : --length > 0
      ? NEVER
      : undefined;
  return Promise.race(ps.map(p => p.then(continueWhenNullish)));
}

async function fromNetwork(url, ...args) {
  const cacheName = isAsset(url) || hasSWParam(url) ? ASSETS_CACHE : CONTENT_CACHE;
  return fetchAndCache(cacheName, url, ...args);
}

async function fetchAndCache(cacheName, url, request, e) {
  const response = await fetch(noCache(noSWParam(url)));
  if (response.ok) e.waitUntil(cacheResponse(cacheName, request, response.clone()));
  return response;
}

async function onFetch(e) {
  const { request } = e;
  const url = new URL(request.url);

  // Bypass
  // ------
  // Go to network for non-GET request and Google Analytics right away.
  const shouldCache = isSameSite(url) || hasSWParam(url) || isGoogleFonts(url);
  if (request.method !== "GET" || !shouldCache || hasNoCacheParam(url)) {
    return fetch(request).catch(e => Promise.reject(e));
  }

  try {
    // Caches
    // ------
    const matching = await raceTruthy([
      caches.open(SHELL_CACHE).then(c => c.match(url.href, { ignoreSearch: true })),
      caches.open(ASSETS_CACHE).then(c => c.match(url.href, { ignoreSearch: true })),
      caches.open(CONTENT_CACHE).then(c => c.match(url.href, { ignoreSearch: true })),
    ]);

    if (matching) return matching;

    // Network
    // -------
    // Got to network otherwise. Show 404 when there's a network error.
    // TODO: Use separate offline site instead of 404!?
    return await fromNetwork(url, request, e);
  } catch (err) {
    // console.error(err)
    const cache = await caches.open(CONTENT_CACHE);
    return cache.match(OFFLINE_PAGE_URL);
  }
}

// 

