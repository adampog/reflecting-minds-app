'use strict';
// Visual v0.2 mockup (same behaviour as the accepted wireframe; new look and entry). Every door, scenario and saved session is a fictional placeholder.
// No AI, no network, no feedback prompts, no groups. Storage is this browser's localStorage only (mock).

const STAGES = ['Entry', 'Notice', 'Motivation', 'Compare', 'Discern', 'Respond', 'Review'];
const STAGE_SCREEN = ['door', 'notice', 'motivation', 'compare', 'discern', 'respond', 'review'];
const DOORS = Object.fromEntries(CONTENT.doors.map(d => [d.id, d]));
// Shuffled once per visit so no door holds a fixed first place; ?order=fixed keeps the walkthrough repeatable.
const ORDER = CONTENT.doors.slice();
if (new URLSearchParams(location.search).get('order') !== 'fixed')
  for (let i = ORDER.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [ORDER[i], ORDER[j]] = [ORDER[j], ORDER[i]]; }
const ENTRY_SCREENS = ['arrival', 'deck', 'list', 'surprise', 'fallback', 'door']; // bright at the door, quiet in the room
const KIND_NOTE = { context: 'A context rather than a personal situation: you reflect on your own about a group.',
  disposition: 'Not a situation: a quieter, shorter path.' };
const ROUTES = { fictional: 'Use the fictional example', personal: 'Reflect on my own situation', neutral: 'Neutral alternative' };
const STORE = 'rm.v02.sessions';
// Screens with free-text fields: the privacy explanation must be acknowledged first (FR03/AT04).
const TEXT_SCREENS = ['situation', 'motivation', 'compare', 'discern', 'worksheet', 'respond', 'return', 'report'];

const uid = () => Math.random().toString(36).slice(2, 10);
const now = () => new Date().toISOString();
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function fresh(doorId = null, parentId = null) {
  return {
    id: uid(), schema_version: 2, revision: 1, state: 'draft', doorId, route: '', branch: null, parentId,
    locale: CONTENT.locale, taxonomy_version: CONTENT.taxonomy_version, content_version: CONTENT.content_version,
    mode: 'session', createdAt: now(), situation: '', entry_link: null,
    m1: { label: '', felt: '', toward: '', want: '' },
    m2: { label: '', felt: '', toward: '' },
    cmp: { changed: '', verdict: '' },
    dis: { observe: '', infer: '', unsure: '', source: '', claim: '', value: '' },
    ws: { accounts: '', claims: '', sources: '', unknowns: '', motives: '', perspectives: '', delay: '', responses: '', kinds: [] },
    plan: { choice: '', text: '', expected: '', waiting: '' },
    skipped: [], outcomes: [],
  };
}

let s = fresh();
let hist = [];
let cur = 'arrival';
let flash = '';
let card = 0;            // deck position
let picked = null;       // Surprise me result
let fallbackReason = '';
let privacyOk = false;   // session-only acknowledgement
let pending = null;      // screen to open after the privacy step
let opened = null;       // saved session open in Flow C
let draftOutcome = {};
let report = { type: '', comment: '' };
let prefs = { presentation: 'Visual cards' };

const get = k => k.split('.').reduce((o, p) => o?.[p], { s, o: draftOutcome, r: report });
function set(k, v) {
  const parts = k.split('.'), last = parts.pop();
  parts.reduce((o, p) => o[p], { s, o: draftOutcome, r: report })[last] = v;
}

// ---------- storage (explicit device save only) ----------
function loadAll() { try { return JSON.parse(localStorage.getItem(STORE) || '{}'); } catch { return {}; } }
function saveAll(all) { try { localStorage.setItem(STORE, JSON.stringify(all)); return true; } catch { return false; } }

// ---------- render helpers ----------
const field = (k, label, hint = '') =>
  `<label>${label}${hint ? ` <span class="muted">${hint}</span>` : ''}<textarea data-k="${k}" maxlength="2000">${esc(get(k))}</textarea></label>`;
const chips = (k, opts, multi = false, icons = {}) => `<div class="chips">${opts.map(o => {
  const v = get(k), on = multi ? v.includes(o) : v === o;
  return `<button data-chip="${k}" data-val="${esc(o)}" data-multi="${multi}" aria-pressed="${on}">${icons[o] ? icon(icons[o]) : ''}${esc(o)}</button>`;
}).join('')}</div>`;
const btn = (text, go, cls = '') => `<button class="btn ${cls}" data-go="${go}">${text}</button>`;
const act = (text, a, cls = '', extra = '') => `<button class="btn ${cls}" data-act="${a}" ${extra}>${text}</button>`;
const skip = (stage, next) => `<button class="btn" data-skip="${stage}" data-next="${next}">Skip this step</button>`;
const tag = t => `<span class="tag">${t}</span>`;
const h1 = (ic, t) => `<h1>${icon(ic, 'h')}${t}</h1>`;
const versions = () => `<p class="muted">Taxonomy ${CONTENT.taxonomy_version} · content ${CONTENT.content_version}. Door names describe experiences, not people.</p>`;
const door = () => DOORS[s.doorId];
const neutral = () => s.route === 'neutral' || !s.doorId;
const entryTitle = () => neutral() ? 'Neutral introduction' : door().title;

// ---------- screens ----------
const SCREENS = {
  arrival: { flow: 'A', title: 'Welcome', html: () => `
    ${diagram('arrival-threshold', 'An open doorway into a calm room', '')}
    <h1>Somewhere to think something through</h1>
    <p>Pick a door that fits what is on your mind, or just look around. It takes a few minutes, and you can stop at any time.</p>
    <p class="muted">${tag('Fictional')} ${tag('Placeholder content')} No account, no installation.</p>
    <h2>Look through the doors</h2>
    <div class="routes">${btn(`${icon('list')}<b>As a list</b><span>All nine at once, read at your pace</span>`, 'list')}${btn(`${icon('reel')}<b>One at a time</b><span>Cards you can swipe or step through</span>`, 'deck')}</div>
    ${act(`${icon('surprise')}Surprise me`, 'surprise')}
    ${act('Neutral introduction, no story', 'neutralEntry')}
    ${versions()}` },

  deck: { flow: 'A', title: 'Doors, one at a time', html: () => {
    const d = ORDER[card];
    return `<h1>One at a time</h1>
    <div class="card" id="card" aria-roledescription="card" aria-label="${esc(d.title)}, door ${card + 1} of ${ORDER.length}">
      ${doorArt(d.id, d.scene)}
      <p class="muted">${tag('Fictional')} ${tag('Placeholder content')} ${tag('Provisional door')}</p>
      <h2>${esc(d.title)}</h2>
      <p><i>${esc(d.scenario)}</i> · ${esc(d.card)}</p>
    </div>
    <div class="row"><button data-act="prev" ${card ? '' : 'disabled'}>‹ Previous</button><button data-act="next" ${card < ORDER.length - 1 ? '' : 'disabled'}>Next ›</button></div>
    <p class="muted">Swipe the card or use the buttons. Nothing moves on its own.</p>
    ${act('Open this door', 'try', 'primary', `data-door="${d.id}"`)}
    ${btn(`${icon('list')}See them as a list`, 'list')}
    ${act(`${icon('surprise')}Surprise me`, 'surprise')}
    ${act('Neutral introduction, no story', 'neutralEntry')}`;
  } },

  list: { flow: 'A', title: 'Doors as a list', html: () => `
    <h1>All nine doors</h1>
    <p class="muted">${tag('Fictional')} ${tag('Placeholder content')} In a new order each visit, so none comes first.</p>
    <ul class="doorlist">${ORDER.map(d => `<li><button class="btn thumb" data-act="try" data-door="${d.id}">${doorArt(d.id, d.scene)}<span><b>${esc(d.title)}</b><i>${esc(d.scenario)}</i><span class="muted">${esc(d.card)}</span></span></button></li>`).join('')}</ul>
    ${btn(`${icon('reel')}See them one at a time`, 'deck')}
    ${act(`${icon('surprise')}Surprise me`, 'surprise')}
    ${act('Neutral introduction, no story', 'neutralEntry')}` },

  surprise: { flow: 'A', title: 'Surprise me', html: () => `
    <h1>Surprise me</h1>
    <div class="card">${doorArt(picked, DOORS[picked].scene)}<p class="muted">Picked at random because you asked. Nothing about you was used.</p><h2>${esc(DOORS[picked].title)}</h2><p>${esc(DOORS[picked].card)}</p></div>
    ${act('Try this', 'try', 'primary', `data-door="${picked}"`)}
    ${act('Pick again', 'surprise')}
    ${btn('Choose myself: list', 'list')}${btn('Choose myself: one at a time', 'deck')}` },

  fallback: { flow: 'A', title: 'Choose a door', html: () => `
    <h1>This link isn’t available</h1>
    <div class="box">${esc(fallbackReason)} Nothing about you was inferred from the link.</div>
    ${btn('Look through the doors', 'arrival', 'primary')}
    ${act('Neutral introduction', 'neutralEntry')}` },

  door: { flow: 'A', stage: 0, title: 'Entry', html: () => `
    ${s.entry_link ? `<p class="linkin">${icon('play')} Opened from a link (door id only). ${tag('Simulated link')}</p>` : ''}
    ${neutral() ? '' : doorArt(s.doorId, door().scene)}
    <h1>${esc(entryTitle())}</h1>
    <div class="box">
      <p><b>Type:</b> ${neutral() ? 'neutral practice, no story' : 'designed, fictional experience'} ${neutral() ? '' : tag('Fictional')}</p>
      ${neutral() ? '' : `<p><b>Scenario:</b> <i>${esc(door().scenario)}</i> ${tag('Placeholder, unreviewed')}</p>`}
      ${!neutral() && KIND_NOTE[door().kind] ? `<p>${KIND_NOTE[door().kind]}</p>` : ''}
      <p><b>Language:</b> English · <b>Presentation:</b> ${esc(prefs.presentation)} · <b>About</b> ${neutral() ? 5 : door().minutes} minutes</p>
      <p class="muted">A short practice in noticing attention, then motivation and a possible next step. It does not measure or score you.</p>
    </div>
    ${act('Change language or presentation', 'prefs')}
    <h2>How involved do you want to be?</h2>
    ${neutral() && !s.doorId ? `<p>Neutral route: no story and no personal situation needed.</p>` :
      `<div class="chips">${Object.entries(ROUTES).map(([k, l]) => `<button data-route="${k}" aria-pressed="${s.route === k}">${l}</button>`).join('')}</div>
      <p class="muted">You can change this later without losing answers.</p>`}
    ${act('Continue', 'begin', 'primary', s.route ? '' : 'disabled')}` },

  privacy: { flow: 'A', stage: 0, title: 'Before you write', html: () => `
    ${h1('privacy', 'Before you write anything')}
    ${DIAGRAMS.privacy()}
    <div class="box">
      <p><b>Session only:</b> what you type stays in this page and is lost on close or reload, unless you choose <i>Save on this device</i>.</p>
      <p><b>Not sent anywhere:</b> in the beta, reflections are not sent to app servers, analytics or any AI.</p>
      <p><b>Saving:</b> only when you tap Save. Browser storage is not a backup or a secure vault, can be cleared by the browser, and others using this unlocked device may see it.</p>
      <p><b>Export and delete:</b> you choose which fields to export. Delete removes this app’s saved copies on this device, not exports, screenshots or copies.</p>
      <p><b>No account, no installation, no research enrolment.</b></p>
    </div>
    ${act('I understand, continue', 'privacyOk', 'primary')}
    ${btn('Leave', 'exit')}` },

  scene: { flow: 'A', stage: 0, title: 'Entry', html: () => {
    const d = door();
    // No plate here: the room starts at privacy, and the scene text is complete (QA r1).
    return `<p><i>${esc(d.scenario)}</i></p>
    <h1>${esc(d.title)}</h1>
    <div class="box">${tag('Fictional example')} <p>${esc(d.scene)}</p></div>
    <h2>What happens next? You choose.</h2>
    ${d.branch.map(([l], i) => `<button class="btn" data-branch="${i}" aria-pressed="${s.branch === i}">${esc(l)}</button>`).join('')}
    ${s.branch !== null ? `<div class="box"><p>${esc(d.branch[s.branch][1])}</p><p class="muted">Pre-written branch, chosen by you. No AI. Not about you or a real event.</p></div>` : ''}
    ${btn('Continue', 'notice', 'primary')}`;
  } },

  situation: { flow: 'A', stage: 0, title: 'Entry', html: () => `
    ${h1('review', 'Your situation')}
    <p>Describe it as briefly as you like. You don’t have to share anything.</p>
    ${field('s.situation', 'In your words')}
    <p class="muted">Please avoid names or details that identify other people.</p>
    ${btn('Continue', 'notice', 'primary')}
    <button class="btn" data-act="setRoute" data-route="fictional">Use the fictional example instead</button>` },

  notice: { flow: 'A', stage: 1, title: 'Notice', html: () => `
    ${h1('notice', 'Notice')}
    ${DIAGRAMS.notice(!!timer)}
    <p class="muted">${tag('Placeholder practice text')} ${CONTENT.practice.version}, awaiting review.</p>
    <div class="box">
      <p>Notice where your attention keeps returning.</p>
      <p>Without pushing it away, let in other parts of experience: sounds, light, touch, whatever is there.</p>
      <p>See what changes, if anything. No particular sensation is needed.</p>
    </div>
    <div class="row"><button disabled>Audio (not in mock)</button><button disabled>Video (not in mock)</button></div>
    <button class="btn" data-act="timer" id="timer">Optional 60 s timer: start</button>
    <p class="muted">The text is the alternative to audio and video. The app does not measure attention.</p>
    ${s.doorId && DOORS[s.doorId].id === 'just-curious' ? `${btn('Stop here', 'exit')}${btn('Keep going', 'motivation')}
    <p class="muted">That was the whole practice. Stopping here is a complete visit.</p>` : `${btn('Continue', 'motivation', 'primary')}
    ${skip('Notice', 'motivation')}`}
    ${btn('This felt uncomfortable: report it', 'report')}` },

  motivation: { flow: 'A', stage: 2, title: 'Motivation', html: () => `
    ${h1('motivation', 'Motivation')}
    <p>What is moving you here? Use your own words, or start from an example.</p>
    ${chips('s.m1.label', CONTENT.motives)}
    <p class="muted">Examples are invitations, not a complete list. Mixed, uncertain or none are valid.</p>
    ${field('s.m1.label', 'Motivation (your words)')}
    ${field('s.m1.felt', 'What does it feel like?', 'optional')}
    ${field('s.m1.toward', 'What does it draw your attention toward?', 'optional')}
    ${field('s.m1.want', 'What does it make you want to do?', 'optional')}
    ${btn('Continue', 'compare', 'primary')}
    ${skip('Motivation', 'compare')}` },

  compare: { flow: 'A', stage: 3, title: 'Compare', html: () => `
    ${h1('compare', 'Compare (optional)')}
    ${DIAGRAMS.compare()}
    <p>Try a second motivation or another person’s view of the same situation.</p>
    <div class="box"><p class="muted">Your first answer, kept unchanged:</p><p><b>${esc(s.m1.label) || '(none given)'}</b></p></div>
    ${chips('s.m2.label', CONTENT.motives)}
    ${field('s.m2.label', 'Second motivation or perspective')}
    ${field('s.m2.felt', 'What does it feel like?', 'optional')}
    ${field('s.cmp.changed', 'What is similar or different?', 'optional')}
    ${chips('s.cmp.verdict', ['Some difference', 'No difference', 'The comparison doesn’t fit'])}
    <p class="muted">Nothing is ranked or scored.</p>
    ${btn('Continue', 'discern', 'primary')}
    ${skip('Compare', 'discern')}` },

  discern: { flow: 'A', stage: 4, title: 'Discern', html: () => `
    ${h1('discern', 'Discern')}
    ${DIAGRAMS.discern()}
    <p class="muted">Fill any, or none. Leaving these empty is fine and says nothing about you.</p>
    ${field('s.dis.observe', 'What did you observe?', 'seen or heard directly')}
    ${field('s.dis.claim', 'What claims are being made?')}
    ${field('s.dis.source', 'What is the source?', 'your note; nothing is fetched')}
    ${field('s.dis.infer', 'What are you inferring?')}
    ${field('s.dis.value', 'What values or judgements are involved?')}
    ${field('s.dis.unsure', 'What is still unknown?')}
    <p class="muted">Prompts are pre-written and can be ignored. This is not a test of Global Attentiveness.</p>
    ${btn('Open disagreement worksheet (optional)', 'worksheet')}
    ${btn('Continue', 'respond', 'primary')}
    ${skip('Discern', 'respond')}` },

  worksheet: { flow: 'B', stage: 4, title: 'Worksheet', html: () => `
    ${h1('compare', 'Disagreement worksheet')}
    <p class="muted">Optional. Fill any part, or none.</p>
    ${field('s.ws.accounts', 'Accounts of the situation', 'how different people describe it')}
    ${field('s.ws.claims', 'Claims')}
    ${field('s.ws.sources', 'Sources', 'your notes; nothing is fetched')}
    <p>What kind of question is this? <span class="muted">(you choose; nothing is classified for you)</span></p>
    ${chips('s.ws.kinds', CONTENT.kinds, true)}
    ${field('s.ws.motives', 'Others’ motives', 'recorded as YOUR interpretation, not a fact')}
    ${field('s.ws.unknowns', 'Unknowns')}
    ${field('s.ws.perspectives', 'Affected or absent perspectives')}
    ${field('s.ws.delay', 'Possible costs of delay')}
    ${field('s.ws.responses', 'Possible responses')}
    <p class="muted">Declining to fill this in is valid and is not treated as bad faith.</p>
    ${btn('Continue to Respond', 'respond', 'primary')}` },

  respond: { flow: 'A', stage: 5, title: 'Respond', html: () => `
    ${h1('respond', 'Respond')}
    <p>Choose what comes next. An action is optional.</p>
    ${chips('s.plan.choice', CONTENT.responses, false, RESPONSE_ICONS)}
    ${field('s.plan.text', 'Your next step, in your words', 'optional')}
    ${field('s.plan.expected', 'Expected effects', 'optional')}
    ${field('s.plan.waiting', 'Reason for waiting', 'if you chose a pause')}
    <p class="muted">The app will not send messages, contact anyone or act for you.</p>
    ${btn('Continue', 'review', 'primary')}` },

  review: { flow: 'A', stage: 6, title: 'Review', html: () => `
    ${h1('review', 'Your own words')}
    <p class="muted">Shown exactly as you wrote them. Nothing is summarised or generated.</p>
    ${summary(s)}
    ${flash ? `<div class="box" role="status">${flash}</div>` : ''}
    ${act('Save on this device', 'save', 'primary')}
    <p class="muted">Not a backup or secure vault. Others using this device may see it.</p>
    ${act('Export selected fields…', 'export')}
    ${act('Discard this session', 'discard')}` },

  saved: { flow: 'C', title: 'Saved sessions', html: () => {
    const all = Object.values(loadAll());
    return `${h1('save', 'Saved on this device')}
    ${flash ? `<div class="box" role="status">${flash}</div>` : ''}
    ${all.length ? all.map(x => `<div class="box saved">
      ${x.doorId ? doorArt(x.doorId, x.title) : ''}<p>${x.seeded ? tag('Fictional saved session') + ' ' : ''}<b>${esc(x.title)}</b></p>
      <p class="muted">Saved ${esc(x.savedAt.slice(0, 10))} · plan revision ${x.revision} · ${x.outcomes.length} later note(s)</p>
      <div class="row"><button data-open="${x.id}">Reopen</button><button data-del="${x.id}">Delete…</button></div>
    </div>`).join('') : '<p>No saved sessions on this device.</p>'}
    ${act('Load fictional saved session', 'seed')}
    ${all.length ? act('Delete all…', 'delall') : ''}
    ${btn('Start a new session', 'arrival')}`;
  } },

  return: { flow: 'C', title: 'Return and learn', html: () => {
    const x = loadAll()[opened];
    if (!x) return '<p>Session not found.</p>';
    return `${h1('info', 'What happened?')}
    ${DIAGRAMS.timeline()}
    <div class="box">${x.seeded ? tag('Fictional saved session') : ''}<p class="muted">Original plan · saved ${esc(x.savedAt.slice(0, 10))} · unchanged</p>
      <p><b>${esc(x.plan.choice || 'No response chosen')}</b>: ${esc(x.plan.text)}</p>
      ${x.plan.expected ? `<p class="muted">Expected: ${esc(x.plan.expected)}</p>` : ''}</div>
    ${x.outcomes.map((o, i) => `<div class="box"><p class="muted">Later note ${i + 1} · ${esc(o.at.slice(0, 10))} · added after the plan</p><p><b>${esc(o.status || 'No status')}</b> ${esc(o.observations)}</p>${[['Effects', o.effects], ['Still unknown', o.unknowns], ['Revised plan', o.revised]].filter(([, v]) => v).map(([l, v]) => `<p class="muted">${l}: ${esc(v)}</p>`).join('')}</div>`).join('')}
    ${flash ? `<div class="box" role="status">${flash}</div>` : ''}
    <h2>Add a later note</h2>
    ${chips('o.status', CONTENT.outcomes)}
    ${field('o.observations', 'What happened?', 'optional')}
    ${field('o.effects', 'Expected or unexpected effects', 'optional')}
    ${field('o.unknowns', 'What remains unknown?', 'optional')}
    ${field('o.revised', 'Revised plan', 'kept apart from the original')}
    ${act('Save later note', 'outcome', 'primary')}
    <p class="muted">No reminder, notification or survey follows.</p>`;
  } },

  privacyInfo: { title: 'Privacy', html: () => `
    ${h1('privacy', 'Privacy and control')}
    ${DIAGRAMS.privacy()}
    <div class="box">
      <p>Answers stay in this page unless you choose <i>Save on this device</i>.</p>
      <p>Reflections are not sent to app servers, analytics or AI. This mock makes no network requests at all.</p>
      <p>Saved sessions stay in this browser until you delete them or the browser clears them. Not a backup or secure vault.</p>
      <p>Exports, screenshots and copies are outside in-app delete.</p>
      <p>No account, groups, sharing or invitations exist in this beta.</p>
      <p>This is an experimental reflection tool, not a crisis service, therapy or mediation.</p>
    </div>` },

  report: { title: 'Report content', html: () => `
    ${h1('report', 'Report a content problem')}
    <p>Tell the team if something was confusing, uncomfortable or inappropriate. Only you start a report.</p>
    ${chips('r.type', ['Confusing', 'Uncomfortable', 'Inappropriate'])}
    ${field('r.comment', 'Comment (optional)')}
    ${act('Preview report', 'reportPreview', 'primary')}
    <p class="muted">Your answers are never attached. Mock: nothing is sent.</p>` },

  exit: { title: 'Exited', html: () => `
    ${h1('leave', 'You have left')}
    <p>Unsaved answers were discarded. Leaving is always a valid choice.</p>
    ${btn('Start again', 'arrival', 'primary')}
    ${btn('Saved sessions', 'saved')}` },
};

// Every user-entered field, labelled once; review, text export and JSON export all read this list.
function fields(x) {
  const d = DOORS[x.doorId];
  return [
    ['entry', 'Entry', x.title || entryTitle()], ['entry', 'Route', ROUTES[x.route] || ''],
    ['entry', 'You chose', x.route === 'fictional' && x.branch !== null ? d.branch[x.branch][0] : ''], ['entry', 'Situation', x.situation],
    ['motivation', 'Motivation', x.m1.label], ['motivation', 'Felt like', x.m1.felt], ['motivation', 'Drew attention toward', x.m1.toward], ['motivation', 'Wanted to', x.m1.want],
    ['motivation', 'Second view', x.m2.label], ['motivation', 'Second view felt like', x.m2.felt], ['motivation', 'Similar or different', x.cmp.changed], ['motivation', 'Comparison', x.cmp.verdict],
    ['discern', 'Observed', x.dis.observe], ['discern', 'Claims', x.dis.claim], ['discern', 'Source', x.dis.source], ['discern', 'Inferred', x.dis.infer], ['discern', 'Values', x.dis.value], ['discern', 'Unknown', x.dis.unsure],
    ['discern', 'Worksheet: accounts', x.ws.accounts], ['discern', 'Worksheet: claims', x.ws.claims], ['discern', 'Worksheet: sources', x.ws.sources],
    ['discern', 'Worksheet: question kinds (your choice)', x.ws.kinds.join(', ')], ['discern', 'Worksheet: others’ motives (your interpretation)', x.ws.motives],
    ['discern', 'Worksheet: unknowns', x.ws.unknowns], ['discern', 'Worksheet: affected or absent perspectives', x.ws.perspectives],
    ['discern', 'Worksheet: costs of delay', x.ws.delay], ['discern', 'Worksheet: possible responses', x.ws.responses],
    ['plan', 'Response', x.plan.choice], ['plan', 'Next step', x.plan.text], ['plan', 'Expected', x.plan.expected], ['plan', 'Reason for waiting', x.plan.waiting],
    ['link', 'Entry link', x.entry_link || ''],
  ];
}

function summary(x) {
  const sk = x.skipped.map(st => `<p class="muted">${st}: skipped</p>`).join('');
  return `<div class="box">${sk}${fields(x).filter(([p, , v]) => p !== 'link' && v).map(([, l, v]) => `<p><b>${l}:</b> ${esc(v)}</p>`).join('')}</div>`;
}

// ---------- sheet (modal) ----------
const sheet = document.getElementById('sheet');
// Plate settles once after a user step; skipped under reduced motion. Nothing loops or autoplays.
const settle = () => { const c = document.getElementById('card'); if (c && !matchMedia('(prefers-reduced-motion: reduce)').matches) c.classList.add('settle'); };
function openSheet(html) {
  sheet.innerHTML = `<div role="dialog" aria-modal="true">${html}</div>`;
  sheet.hidden = false;
  sheet.querySelector('button')?.focus();
}
const closeSheet = () => { sheet.hidden = true; sheet.innerHTML = ''; };

const EXPORT_PARTS = [['entry', 'Entry and route', true], ['motivation', 'Motivations and comparison', true], ['discern', 'Discernment and worksheet', true], ['plan', 'Response plan', true], ['link', 'Entry link details', false]];
const exportFields = (x, parts) => fields(x).filter(([p]) => parts.includes(p));
function exportText(x, parts) {
  return ['Reflecting Minds export (MOCK PROTOTYPE, fictional data)', `Schema ${x.schema_version} · ${x.content_version} · ${x.taxonomy_version} · exported ${now()}`, `Fields: ${parts.join(', ')}`, '',
    ...exportFields(x, parts).map(([, l, v]) => `${l}: ${v}`)].join('\n');
}
function exportJson(x, parts) {
  return JSON.stringify({
    manifest: { schema_version: x.schema_version, content_version: x.content_version, taxonomy_version: x.taxonomy_version, door: x.doorId, exported_at: now(), fields: parts },
    data: exportFields(x, parts).map(([part, label, value]) => ({ part, label, value })),
  }, null, 2);
}

// ---------- actions ----------
let timer = null, left = 60;
function enter(id) { s.doorId = id; s.route = id ? '' : 'neutral'; s.branch = null; show('door'); }
const ACTIONS = {
  prev() { card = Math.max(0, card - 1); render(); settle(); },
  next() { card = Math.min(ORDER.length - 1, card + 1); render(); settle(); },
  try(el) { enter(el.dataset.door); },
  neutralEntry() { enter(null); },
  surprise() { picked = CONTENT.doors[Math.floor(Math.random() * CONTENT.doors.length)].id; show('surprise'); },
  prefs() {
    openSheet(`<h2>Language and presentation</h2>
      <label>Language<select><option>English</option><option disabled>Other languages: not in this mock</option></select></label>
      <p>Presentation</p>
      <div class="chips">${['Visual cards', 'Text only', 'Audio (not in mock)'].map(p => `<button data-pref="${p}" aria-pressed="${prefs.presentation === p}" ${p.includes('not in') ? 'disabled' : ''}>${p}</button>`).join('')}</div>
      <p class="muted">Changing these keeps your answers.</p>
      <button class="btn" data-act="close">Done</button>`);
  },
  setRoute(el) { s.route = el.dataset.route; ACTIONS.begin(); },
  begin() {
    const target = s.route === 'fictional' ? 'scene' : s.route === 'personal' ? 'situation' : 'notice';
    if (!privacyOk) { pending = target; show('privacy'); } else show(target);
  },
  privacyOk() { privacyOk = true; const t = pending || 'notice'; pending = null; show(t, false); }, // privacy step is not a Back target
  timer() {
    const b = document.getElementById('timer');
    const rings = on => document.querySelector('.breathe')?.classList.toggle('run', on);
    if (timer) { clearInterval(timer); timer = null; rings(false); b.textContent = `Paused at ${left} s: resume`; return; }
    timer = setInterval(() => { left = Math.max(0, left - 1); const t = document.getElementById('timer'); if (t) t.textContent = `${left} s left: pause`; if (!left) { clearInterval(timer); timer = null; rings(false); } }, 1000);
    rings(true);
    b.textContent = `${left} s left: pause`;
  },
  close: closeSheet,
  stages() {
    const at = SCREENS[cur].stage;
    openSheet(`<h2>Go to a stage</h2><p class="muted">Any order. Skipping is fine.</p>${STAGES.map((t, i) =>
      `<button class="btn" data-stage="${i}" ${i === at ? 'aria-current="page"' : ''}>${icon(STAGE_ICONS[i])}${t}${i === at ? ' (here now)' : ''}</button>`).join('')}
      <button class="btn" data-act="close">Close</button>`);
  },
  save() {
    const all = loadAll();
    s.mode = 'device'; s.state = 'finished'; s.savedAt = now(); s.title = entryTitle();
    all[s.id] = JSON.parse(JSON.stringify(s));
    flash = saveAll(all)
      ? 'Saved on this device. You can reopen it later from Saved. No reminder will be sent.'
      : 'Not saved. Storage is unavailable. Your answers are still here; you can export them.';
    render();
  },
  export() {
    fmt = 'txt';
    openSheet(`<h2>Export selected fields</h2><p>Choose what to include. The preview matches the file.</p>
      ${EXPORT_PARTS.map(([k, l, on]) => `<label><input type="checkbox" data-part="${k}" ${on ? 'checked' : ''}> ${l}</label>`).join('')}
      <p class="muted">Entry link details are left out by default.</p>
      <div class="row"><button data-act="fmt" data-fmt="txt" aria-pressed="true">Preview .txt</button><button data-act="fmt" data-fmt="json" aria-pressed="false">Preview .json</button></div>
      <pre id="preview"></pre>
      <div class="row"><button data-act="download" data-fmt="txt">Download .txt</button><button data-act="download" data-fmt="json">Download .json</button></div>
      <p class="muted">Exported files are outside in-app delete.</p>
      <button class="btn" data-act="close">Close</button>`);
    updatePreview();
  },
  fmt(el) { fmt = el.dataset.fmt; sheet.querySelectorAll('[data-act=fmt]').forEach(b => b.setAttribute('aria-pressed', b === el)); updatePreview(); },
  download(el) {
    const parts = exportParts(), json = el.dataset.fmt === 'json';
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([json ? exportJson(s, parts) : exportText(s, parts)], { type: json ? 'application/json' : 'text/plain' }));
    a.download = `reflecting-minds-mock.${el.dataset.fmt}`;
    a.click();
  },
  discard() {
    openSheet(`<h2>Discard this session?</h2><p>Unsaved answers will be removed from this page.</p>
      <button class="btn primary" data-act="leave">Discard</button><button class="btn" data-act="close">Keep</button>`);
  },
  leave() { closeSheet(); s = fresh(); hist = []; flash = ''; privacyOk = false; show('exit'); },
  seed() {
    const x = fresh('divided-group');
    Object.assign(x, { seeded: true, state: 'finished', mode: 'device', route: 'fictional', branch: 1, title: DOORS['divided-group'].title,
      savedAt: new Date(Date.now() - 3 * 864e5).toISOString() });
    x.m1.label = 'Wanting to be right';
    x.plan = { ...x.plan, choice: 'Further inquiry', text: 'Ask the two quiet people what they wanted from the day.', expected: 'Maybe the route matters less than I think.' };
    const all = loadAll(); all[x.id] = x;
    flash = saveAll(all) ? 'Fictional saved session added.' : 'Not saved. Storage is unavailable.';
    render();
  },
  delOne(el) {
    const all = loadAll(); delete all[el.dataset.id];
    flash = saveAll(all) ? 'Session and its later notes deleted from this device.' : 'Not deleted. Storage is unavailable.';
    closeSheet(); render();
  },
  delall() {
    openSheet(`<h2>Delete all saved sessions?</h2><p>This removes every session and later note this app saved on this device. Exports, screenshots and copies are not affected.</p>
      <button class="btn primary" data-act="delallYes">Delete all</button><button class="btn" data-act="close">Cancel</button>`);
  },
  delallYes() { try { localStorage.removeItem(STORE); } catch {} closeSheet(); flash = 'All saved sessions deleted from this device.'; render(); },
  outcome() {
    const all = loadAll(), x = all[opened];
    x.outcomes.push({ id: uid(), plan_revision: x.revision, at: now(), ...draftOutcome });
    x.state = 'reviewed';
    // Keep the draft until the write succeeds, so a storage failure never loses text.
    if (saveAll(all)) { draftOutcome = {}; flash = 'Later note saved. Your original plan is unchanged.'; }
    else flash = 'Not saved. Storage is unavailable. Your text is still here.';
    render();
  },
  reportPreview() {
    openSheet(`<h2>Report preview</h2><p>This is everything the report would contain:</p>
      <pre>${esc(JSON.stringify({ type: report.type || '(none)', comment: report.comment, content: s.doorId || 'neutral', content_version: CONTENT.content_version, screen: hist.at(-1) || cur }, null, 2))}</pre>
      <p class="muted">No answers or saved sessions attached. Mock: nothing is sent.</p><button class="btn" data-act="close">Close</button>`);
  },
};

const exportParts = () => [...sheet.querySelectorAll('[data-part]:checked')].map(c => c.dataset.part);
let fmt = 'txt';
function updatePreview() { const p = document.getElementById('preview'); if (p) p.textContent = (fmt === 'json' ? exportJson : exportText)(s, exportParts()); }

// ---------- navigation ----------
function show(name, push = true) {
  if (TEXT_SCREENS.includes(name) && !privacyOk) { pending = name; name = 'privacy'; }
  if (push && name !== cur) hist.push(cur);
  if (!['review', 'saved', 'return'].includes(name)) flash = '';
  cur = name;
  render();
  document.getElementById('screen').focus();
  window.scrollTo(0, 0);
}
function render() {
  const sc = SCREENS[cur];
  const m = document.getElementById('screen');
  m.innerHTML = sc.html();
  m.dataset.screen = cur;
  document.getElementById('where').textContent =
    (sc.flow ? `Flow ${sc.flow} · ` : '') + sc.title;
  // Plain stage menu (no track, counts or ticks): any stage can be opened in any order once a door is chosen.
  document.getElementById('progress').innerHTML = sc.stage === undefined ? '' :
    `<button class="stagemenu" data-act="stages" aria-haspopup="dialog">Stage: <b>${STAGES[sc.stage]}</b> · change ▾</button>`;
  document.body.dataset.rmaSpace = ENTRY_SCREENS.includes(cur) ? 'entry' : 'room';
  document.getElementById('back').disabled = !hist.length;
  const c = document.getElementById('card');
  if (c) { // swipe gesture; buttons give the same result without swiping
    let x0 = null;
    c.onpointerdown = e => { x0 = e.clientX; };
    c.onpointerup = e => { if (x0 !== null && Math.abs(e.clientX - x0) > 40) ACTIONS[e.clientX < x0 ? 'next' : 'prev'](); x0 = null; };
    c.onpointercancel = () => { x0 = null; };
  }
}

document.addEventListener('input', e => {
  const k = e.target.dataset.k;
  if (k) set(k, e.target.value);
  if (e.target.dataset.part) updatePreview();
});
document.addEventListener('change', e => { if (e.target.dataset.part) updatePreview(); });
document.addEventListener('click', e => {
  const el = e.target.closest('button');
  if (!el || el.disabled) return;
  const d = el.dataset;
  if (d.go) { closeSheet(); show(d.go); }
  else if (d.act) ACTIONS[d.act](el);
  else if (d.chip) {
    if (d.multi === 'true') { const arr = get(d.chip); arr.includes(d.val) ? arr.splice(arr.indexOf(d.val), 1) : arr.push(d.val); }
    else set(d.chip, get(d.chip) === d.val ? '' : d.val);
    render();
  }
  else if (d.route) { s.route = d.route; render(); }
  else if (d.branch) { s.branch = +d.branch; render(); }
  else if (d.pref) { prefs.presentation = d.pref; ACTIONS.prefs(); render(); }
  else if (d.stage) closeSheet(), show(+d.stage === 0 ? 'door' : STAGE_SCREEN[+d.stage]);
  else if (d.skip) { if (!s.skipped.includes(d.skip)) s.skipped.push(d.skip); show(d.next); }
  else if (d.open) { opened = d.open; draftOutcome = {}; show('return'); }
  else if (d.del) openSheet(`<h2>Delete this session?</h2><p>Removes the saved session and its later notes from this device. Exports are not affected.</p>
    <button class="btn primary" data-act="delOne" data-id="${esc(d.del)}">Delete</button><button class="btn" data-act="close">Cancel</button>`);
});
document.getElementById('back').addEventListener('click', () => { if (hist.length) show(hist.pop(), false); });
document.getElementById('exit').addEventListener('click', () => openSheet(`<h2>Leave now?</h2>
  <p>Answers you have not saved will be lost. Leaving is always a valid choice.</p>
  <button class="btn primary" data-act="leave">Leave</button><button class="btn" data-act="close">Stay</button>`));
sheet.addEventListener('click', e => { if (e.target === sheet) closeSheet(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !sheet.hidden) closeSheet(); });

// Deep link: ?door=<id> from the allowlist; retired or unknown ids open a safe fallback (FR01).
const want = new URLSearchParams(location.search).get('door');
if (want && DOORS[want]) { s.doorId = want; s.entry_link = `?door=${want}`; cur = 'door'; }
else if (want) { fallbackReason = CONTENT.retired.includes(want) ? 'This door has been retired.' : 'This door is unknown.'; cur = 'fallback'; }
else if (location.hash === '#saved') cur = 'saved';
render();
