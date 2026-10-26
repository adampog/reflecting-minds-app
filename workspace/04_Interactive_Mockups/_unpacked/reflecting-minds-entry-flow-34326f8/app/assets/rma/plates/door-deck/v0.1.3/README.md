# RMA entry door deck v0.1.3

Nine editable SVG scene plates with 1200×800 masters, 300×200 previews, separate alt text, measured parity evidence, and two contact sheets. This is a review candidate; it does not approve production use, publication, or upload.

This bounded repair adds thumbnail-scale structure to five plates: wood panel seams and a second shelf line behind the bowls (`just-curious`); awning stripes, crates and packed-earth detail (`seen-or-heard`); additional orchard tree masses and fence rails (`personal-tension`); balanced furrow strips on both sides of the fork (`values-tension`); and stone joints at the well and path edges (`self-understanding`). No image-generation calls or external assets were used. Alt text describes the added visible details.

The accepted P2 river plate (`seeing-differently`) and `divided-group` are byte-identical to v0.1.2. Neither river plate was reduced or edited.

The original five deck metrics use ±12% of the nine-plate median: mean linear-light luminance, luminance standard deviation, mean HSV saturation, 300×200 Sobel edge density (threshold 5), and isolated focal bounding-box area. Hasler–Süsstrunk colourfulness at 300×200 uses ±15%. The corrected thumbnail detail gate uses ±20%: convert each 1200×800 export to greyscale, Lanczos-downscale to 120×80, then count interior pixels where `|dx| + |dy| > 12` (119×79 denominator). `PARITY.json` records the formulas and per-plate results; all metrics pass.

`parity-sheet.png` shows all nine plates at 300×200 in colour and grayscale. `parity-sheet-120x80.png` shows the corresponding thumbnail-scale views. The contact sheets were inspected at those cell sizes; the nine 1200×800 exports were not individually reviewed. No app integration or device rendering was checked. SVG masters contain no baked text; all art is local vector code.
