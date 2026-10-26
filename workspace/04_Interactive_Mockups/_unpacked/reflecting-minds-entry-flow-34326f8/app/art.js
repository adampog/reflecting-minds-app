'use strict';
// Art comes only from the Art Department library (yt-art-library/rma/), copied into assets/ with a manifest.
// Anything not yet delivered stays a labelled placeholder; the text always carries the meaning.
// Icons: Art's sprite, inlined by assets/sprite.js (file:// blocks external <use>).
const ICON_IDS = typeof RMA_SPRITE === 'string' ? new Set([...RMA_SPRITE.matchAll(/<symbol id="([^"]+)"/g)].map(m => m[1])) : new Set();
if (ICON_IDS.size) document.body.insertAdjacentHTML('afterbegin', RMA_SPRITE.replace('<svg ', '<svg aria-hidden="true" style="display:none" ').replaceAll('<symbol id="', '<symbol id="i-')); // prefix avoids clashing with page ids such as #back

// Plates from Art's door deck; Art's alt text carries the core content (brief: a plate that needs its caption fails).
const PLATES = typeof RMA_PLATES === 'object' ? RMA_PLATES : {};
const doorArt = (id, alt) => {
  if (textOnly()) return '';
  const p = PLATES[id];
  return p ? `<img class="plate" draggable="false" src="${p.src}" alt="${esc(p.alt)} Fictional drawing.">`
    : `<div class="plate placeholder" role="img" aria-label="${esc(alt)} (placeholder plate)"><span>Plate pending · Art Department</span><small>${esc(alt)}</small></div>`;
};
const icon = (name, cls = '') => ICON_IDS.has(name) ? `<svg class="ico ${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>` : '';
const STAGE_ICONS = ['door', 'notice', 'motivation', 'compare', 'discern', 'respond', 'review'];
const RESPONSE_ICONS = { 'An action': 'respond', 'Further inquiry': 'info', 'A deliberate pause': 'pause', 'Leave without choosing': 'leave' };

const ART = typeof RMA_ART === 'object' ? RMA_ART : {};
// "Text only" presentation drops every picture; the surrounding text and captions are complete on their own.
const textOnly = () => typeof prefs === 'object' && prefs.presentation === 'Text only';
// Diagrams and illustrations: Art's item when delivered (keyed by library item name), else a labelled placeholder.
// labels: ['a', 'b'] as a row under the drawing, or [[text, left%, top%, width%]] placed over it (Art's labels.html layout).
const diagram = (item, label, caption, labels = []) => {
  if (textOnly()) return caption ? `<figure class="diagram text"><figcaption>${caption}</figcaption></figure>` : '';
  const lab = labels.map(l => Array.isArray(l) ? `<span class="dl" style="left:${l[1]}%;top:${l[2]}%;width:${l[3]}%">${l[0]}</span>` : `<span>${l}</span>`).join('');
  const over = labels.length && Array.isArray(labels[0]);
  return ART[item]
    ? `<figure class="diagram"><div class="dg"><img src="${ART[item].src}" alt="${esc(ART[item].alt || label)}">${over ? lab : ''}</div>${!over && lab ? `<div class="drow">${lab}</div>` : ''}${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`
    : `<figure class="diagram placeholder" role="img" aria-label="${esc(label)}"><span>Diagram pending · Art Department</span>${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
};
const DIAGRAMS = {
  // Structure and wording from Art's privacy-demo.html (v0.1.1); labels stay in HTML so they can be translated.
  privacy: () => textOnly() ? `<figure class="diagram text"><figcaption><span class="mock-label">Illustrative mock — not a verified security statement.</span> Proposed beta: answers stay on this device. No server, analytics, or AI service is included in this proposal.</figcaption></figure>`
    : ART['privacy-boundary'] ? `<figure class="diagram privacy"><div class="pb">
    <img src="${ART['privacy-boundary'].src}" alt="${esc(ART['privacy-boundary'].alt)}">
    ${[['server', 'Server'], ['analytics', 'Analytics'], ['ai', 'AI service']].map(([c, t]) => `<span class="pb-label ${c}" aria-label="${t}: not part of this proposal">${t}</span>`).join('')}</div>
    <figcaption><span class="mock-label">Illustrative mock — not a verified security statement.</span> Proposed beta: answers stay on this device. No server, analytics, or AI service is included in this proposal.</figcaption></figure>`
    : diagram('privacy-boundary', 'Proposed on-device boundary', ''),
  notice: () => diagram('notice-widening', 'Attention widening, then resting', 'Let attention widen, then rest.', ['Notice', 'Widen', 'Rest']),
  compare: () => diagram('compare-views', 'Two views side by side, neither ranked', 'Nothing is ranked or scored.', ['View one', 'View two']),
  discern: () => diagram('discern-sort', 'Six kinds of note: observed, claim, source, inferred, values, unknown', 'Sort what you know from what you think.',
    [['Observed', 4.1, 36.5, 27.6], ['Claim', 36.2, 36.5, 27.6], ['Source', 68.2, 36.5, 27.6], ['Inferred', 4.1, 85, 27.6], ['Values', 36.2, 85, 27.6], ['Unknown', 68.2, 85, 27.6]]),
  timeline: () => diagram('return-timeline', 'The original plan stays fixed; later notes are added after it', 'The original plan is kept as written.',
    [['Original plan', 7.6, 37, 24], ['Later notes', 50, 23, 43]]),
};
