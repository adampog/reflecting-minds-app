# Exact final review — HOLD for comparison label gap

Final commit 00d13627c94630c04ecd6a9f975fd37de0752631. Frozen r3 inputs still verify (192 entries). Delivery manifest verifies from its out/ directory.

MP4: out/entry-walkthrough.mp4, SHA256 8e3f1630c9f309f4cac44ac4fba969a3f2b567fcecf651b88bf2e9830b0d31c8; 2,035,345 bytes; H264 390×844, 25 fps, silent, 157.48 seconds. Full decode to null exits 0 with no errors. Twenty-one sampled encoded frames reviewed, including 74.8/75.2/76 seconds around the reported caption transition, plus an additional scene frame at 71 seconds.

ZIP: out/reflecting-minds-entry-viewer.zip, SHA256 abfce9dc9f5425b10cc2dab80447914671fd122a483ad8ddb7847bd10159a1f0; 47,393 bytes. All 28 payload files exactly match source, paths have no traversal, internal-reference scan clean. Extracted viewer opens headlessly: nine plate images load, fictional privacy/scene/Notice route works, icon references valid, zero page errors/external requests. README's rebuild commands need the separate source checkout; scripts and MP4 are intentionally not bundled in this runtime ZIP.

## Blocking exact-artifact finding

At encoded sample 141 seconds, the comparison page is scrolled. Its mock/fictional banner has scrolled away (the page's banner is not inside a sticky wrapper). Caption says 'Review only ... untested' and bottom says 'Placeholder, unreviewed', but neither visibly labels the drawings fictional or the frame a mock. This misses the brief's explicit mock label on every frame and fictional scenario label on every frame. The main app's sticky banner works; this gap is confined to the review-only comparison page/segment. Evidence: final/18.png (141 seconds), encoded-contact.png and app/plate-comparison.html.

The reported previous-caption lag is confirmed at 74.8 seconds: Scene caption over Notice; by 75.2 seconds it is corrected. This short transition is a minor disclosed limitation, not a blocker by itself: content and mock labels remain accurate there. No caption timing polish or new browser render requested.

Two bounded repair rounds are exhausted. Escalate the narrow label gap under the agreed stop rule, rather than accept it or authorize a third render loop. Recommended minimal correction if authorized: keep the comparison mock/fictional label visible in the viewer and add a persistent mock/fictional overlay to the existing encoded comparison segment (or existing video). Preserve original MP4/ZIP and hashes, make new derivative outputs with distinct hashes, no browser re-recording, no art/content/timing polish. Reviewer must independently check corrected exact derivatives before acceptance.

## Four direct answers on the encoded demonstrator

1. **Safe to step into, or sold?** More inviting than sales-like. Both routes have equal-sized choices, optional wording, no sign-up or benefit promise, and a deliberate neutral route. A's layered-paper threshold feels considered. This is a reviewer's impression, not participant evidence of safety.
2. **Any frame implying an outcome?** No resolved conflict, before/after improvement, celebration or efficacy promise in sampled frames. The river stakes remain apart and the old flood trace is readable. The widening diagram illustrates a practice, not a measured result. The comparison label gap above is a provenance failure, not an implied beneficial outcome.
3. **Tone-deaf brightness in difficulty?** It could feel too warm or stylised for some people; that remains untested. In this revised video brightness stays at optional entry and the quiet privacy/scene/practice/rest of the flow avoids reward colour. The removed scene plate resolves my threshold objection without diluting A into B. Historical displacement remains an open comparison, not an endorsed fit.
4. **List parity or fallback?** The list is first, fully illustrated and direct, so it does not feel like a fallback. Nine doors open in one tap; the reel now swipes correctly and has the same neutral/Surprise/list choices. The video shows both. No new hierarchy or hero plate warrants further Art work in my judgment; the well's marginal metric miss remains disclosed.

No real-device, screen-reader, participant/emotional-safety, installation/offline or production privacy/security validation. Local Chromium checks and sampled encoded frames do not establish full accessibility or efficacy. Exact MP4 and ZIP are not accepted pending the label decision/correction.
