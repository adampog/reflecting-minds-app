// Records the visual v0.2 walkthrough: a simulated video post, one tap into the matching door,
// then Flow A, B, C page by page, other ways in, other routes and navigation.
// Usage: node scripts/record-walkthrough-v02-visual.js          -> out/entry-walkthrough.mp4
//        node scripts/record-walkthrough-v02-visual.js --fast   -> no video, no pauses (smoke check)
//        node scripts/record-walkthrough-v02-visual.js --dry    -> real pauses, no video; storyboard stills in out/storyboard/
const { chromium } = require('playwright'); // via NODE_PATH from the accepted checkout's node_modules
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const FAST = process.argv.includes('--fast');
const DRY = process.argv.includes('--dry');
let shot = 0;
const ROOT = path.resolve(__dirname, '..');
const APP = 'file://' + path.join(ROOT, 'app', 'index.html');
const OUT = path.join(ROOT, 'out');
const VIEW = { width: +process.env.W || 390, height: 844 };

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: VIEW, ...(FAST || DRY ? {} : { recordVideo: { dir: OUT, size: VIEW } }) });
  const page = await ctx.newPage();
  const errors = [], external = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('request', r => { if (!r.url().startsWith('file:') && !r.url().startsWith('blob:')) external.push(r.url()); });

  const hold = ms => page.waitForTimeout(FAST ? 0 : ms);
  // Video-only caption strip, injected by this script (not part of the app).
  const caption = async text => {
    await page.evaluate(t => {
      let c = document.getElementById('rec-caption');
      if (!c) {
        c = document.createElement('div');
        c.id = 'rec-caption';
        c.style.cssText = 'position:fixed;left:0;right:0;top:0;z-index:99;pointer-events:none;background:#ffe36e;color:#000;font:bold 14px system-ui;padding:6px 10px;border-top:2px solid #000;border-bottom:2px solid #000';
        document.body.appendChild(c);
      }
      c.textContent = 'WALKTHROUGH · ' + t;
      // Keep the app's mock banner and Exit visible below the caption, whatever its height.
      document.body.style.paddingTop = c.offsetHeight + 'px'; const st = document.querySelector('.sticky'); if (st) st.style.top = c.offsetHeight + 'px';
    }, text);
    await hold(900);
    if (DRY) { fs.mkdirSync(path.join(OUT, 'storyboard'), { recursive: true }); await page.screenshot({ path: path.join(OUT, 'storyboard', `${String(++shot).padStart(2, '0')}.png`) }); }
  };
  const on = async name => {
    const got = await page.getAttribute('main', 'data-screen');
    if (got !== name) throw new Error(`expected screen ${name}, got ${got}`);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    if (overflow) throw new Error(`horizontal overflow on ${name}`);
  };
  // Exact name first; buttons with a sub-line (e.g. "As a list" + description) match by prefix.
  const tap = async (text, ms = 700) => {
    let b = page.getByRole('button', { name: text, exact: true });
    if (!await b.count()) b = page.getByRole('button', { name: new RegExp('^' + text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) });
    await b.first().click(); await hold(ms);
  };
  const type = async (label, text) => {
    const box = page.getByLabel(label);
    await box.scrollIntoViewIfNeeded();
    await box.pressSequentially(text, { delay: FAST ? 0 : 18 });
    await hold(300);
  };
  const scroll = async () => { await page.mouse.wheel(0, 500); await hold(900); };

  const swipe = async dir => {
    const b = await page.locator('#card').boundingBox();
    const y = b.y + b.height / 2, from = dir === 'left' ? b.x + b.width - 20 : b.x + 20, to = dir === 'left' ? b.x + 20 : b.x + b.width - 20;
    const before = await page.getAttribute('#card', 'aria-label');
    await page.mouse.move(from, y); await page.mouse.down(); await page.mouse.move(to, y, { steps: 8 }); await page.mouse.up(); await hold(900);
    const after = await page.getAttribute('#card', 'aria-label');
    if (after === before) throw new Error(`swipe ${dir} did not change the card (${before})`);
    swipes.push(`${before} -> ${after}`);
  };
  const must = async (...texts) => { const t = await page.locator('main').innerText(); for (const v of texts) if (!t.includes(v)) throw new Error(`missing on ${await page.getAttribute('main', 'data-screen')}: ${v}`); };

  const swipes = [];
  const t0 = Date.now();
  // Fixed door order so the walkthrough repeats; the app shuffles per visit otherwise.
  const go = async (q = '') => { await page.goto(APP + '?order=fixed' + q); await hold(600); };
  const stage = async n => { await page.click('.stagemenu'); await hold(900); await page.click(`#sheet [data-stage="${n}"]`); await hold(900); };

  // ---------------- Arrival ----------------
  await go();
  await caption('Entry · Arrival: warm, two equal ways to look through the doors');
  await on('arrival'); await must('As a list', 'One at a time', 'Surprise me'); await hold(5000);

  // ---------------- List route (reference) ----------------
  await tap('As a list');
  // Every rendered plate's alt must equal Art's pinned description (QA r2).
  const alts = await page.locator('main img.plate').evaluateAll(es => es.map(e => [e.getAttribute('src'), e.getAttribute('alt')]));
  const PL = JSON.parse(fs.readFileSync(path.join(ROOT, 'app', 'assets', 'plates.js'), 'utf8').match(/const RMA_PLATES = (\{[\s\S]*?\});/)[1]);
  const want = Object.fromEntries(Object.values(PL).map(p => [p.src, p.alt + ' Fictional drawing.']));
  if (alts.length !== 9 || alts.some(([src, alt]) => alt !== want[src])) throw new Error('plate alt mismatch ' + JSON.stringify(alts));
  await caption('List route · All nine doors, plates and text; order shuffled per visit, fixed for this video');
  await on('list'); await hold(2500); await scroll(); await scroll(); await scroll(); await hold(1000);
  await caption('List route · Every door is one tap; nothing is ranked or featured');
  await page.mouse.wheel(0, -3000); await hold(1500);

  // ---------------- Reel route (enhancement) ----------------
  await tap('See them one at a time');
  await caption('Reel route · Swipe or use buttons; nothing moves on its own');
  await on('deck'); await hold(2500);
  await swipe('left'); await hold(1200); await swipe('left'); await hold(1200);
  await tap('Next ›', 1500); await tap('‹ Previous', 1500);
  await caption('Reel route · Same doors, same text, a list one tap away');
  await must('See them as a list', 'Surprise me', 'Neutral introduction, no story');
  await hold(2500);

  await tap('Surprise me', 800);
  await caption('Entry · Surprise me picks only after you ask, and you can still choose');
  await hold(2700); await on('surprise'); await must('Picked at random because you asked.');
  await tap('Choose myself: list', 1200);

  // ---------------- Doors that are not situations ----------------
  await page.getByRole('button', { name: /Just curious/ }).click(); await hold(800);
  await caption('Entry · Just curious: not a situation, a shorter path');
  await on('door'); await must('Not a situation'); await hold(3500);
  await page.click('#back'); await hold(800);
  await page.getByRole('button', { name: /Divided group/ }).click(); await hold(800);
  await caption('Entry · Divided group: one person reflecting about a group');
  await on('door'); await must('A context rather than a personal situation'); await hold(3500);
  await page.click('#back'); await hold(800);

  // ---------------- Door selection and route choice ----------------
  await page.getByRole('button', { name: /Seeing things differently/ }).click(); await hold(800);
  await caption('Entry · The riverbank: type, language, duration, labelled fictional');
  await on('door'); await must('designed, fictional experience', 'The riverbank'); await hold(3000); await scroll();
  await caption('Entry · How involved to be: fictional, personal or neutral');
  await tap('Reflect on my own situation', 900); await tap('Neutral alternative', 900); await tap('Use the fictional example', 1500);
  await tap('Continue', 800);

  // ---------------- The room: privacy, then the first stage ----------------
  await caption('Privacy · Quiet from here on: explained before any typing');
  await on('privacy'); await hold(6000);
  await tap('I understand, continue');
  await caption('Scene · A pre-written branch you choose; no AI');
  await on('scene'); if (await page.locator('main .plate').count()) throw new Error('scene shows a plate in the quiet room'); await hold(2500);
  await tap('Ask how each one measured', 3000); await must('Pre-written branch, chosen by you. No AI.');
  await tap('Continue');
  await caption('Notice · The first stage: text practice, optional timer, skip or report');
  await on('notice'); await hold(3500);
  await tap('Optional 60 s timer: start', 2500); await page.click('#timer'); await hold(1000);
  await scroll(); await hold(1500);
  await page.mouse.wheel(0, -3000); await page.click('.stagemenu'); await hold(600);
  await caption('Stage menu · Any stage, any order; no progress or completion marks'); await hold(2900);
  await page.locator('#sheet [data-act=close]').click(); await hold(600);

  // ---------------- Later stages reuse the v0.2 tap-through, quiet ----------------
  await tap('Continue'); await on('motivation');
  await caption('Later stages · Reused from v0.2, same quiet treatment'); await hold(1200);
  await tap('Wanting to understand', 800);
  await type('What does it feel like?', 'Curious, a little unsure.');
  await hold(1200);
  await stage(3); await on('compare'); await hold(2000);
  await stage(4); await on('discern'); await hold(2000);
  await stage(5); await on('respond'); await hold(2000);
  await stage(6); await on('review');
  await caption('Later stages · Nothing celebrates finishing; leaving is always valid'); await hold(3000);

  // ---------------- Other routes, fallback, reduced motion ----------------
  await go('&door=uncertainty');
  await caption('Entry link · Opens the matching door; the link names content only');
  await on('door'); await must('Opened from a link (door id only).'); await hold(3000);
  await tap('Change language or presentation', 1200); await tap('Text only', 900); await tap('Done', 600);
  await caption('Text only · Every picture is dropped; the text stands on its own');
  if (await page.locator('main img, main .plate').count()) throw new Error('Text only still shows a picture on door');
  await hold(2500);
  await tap('Reflect on my own situation', 800); await tap('Continue', 800);
  await caption('Personal route · Privacy first, then your own words');
  await on('privacy'); await must('Illustrative mock — not a verified security statement.');
  if (await page.locator('main img, main .plate').count()) throw new Error('Text only still shows a picture on privacy');
  await hold(2500); await tap('I understand, continue');
  await on('situation'); await type('In your words', 'A decision I keep putting off.'); await hold(1500);

  await go('&door=old-route-pack');
  await caption('Fallback · A retired or unknown link opens a safe page');
  await on('fallback'); await must('retired'); await hold(3000);

  await page.goto('file://' + path.join(ROOT, 'app', 'plate-comparison.html')); await hold(600);
  await caption('Review only · Displaced or contemporary setting, side by side; untested');
  await on('plate-comparison'); await hold(2500); await scroll(); await hold(1500);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await go();
  await caption('Reduced motion · Same doors and routes, no motion');
  await tap('One at a time'); await tap('Next ›', 1500); await hold(1500);
  await page.click('#exit'); await hold(600);
  await caption('Exit · Always one tap; leaving is a valid choice');
  await hold(2500); await page.locator('#sheet [data-act=leave]').click(); await hold(2500);

  const secs = (Date.now() - t0) / 1000;
  const video = page.video();
  await ctx.close();
  await browser.close();
  console.log(`walk time ${secs.toFixed(1)} s, page errors ${errors.length}, external requests ${external.length}`);
  console.log('swipes', JSON.stringify(swipes));
  if (errors.length || external.length) { console.log(errors, external); process.exit(1); }
  if (video) {
    const webm = await video.path(), mp4 = path.join(OUT, 'entry-walkthrough.mp4');
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', webm, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', mp4]);
    fs.unlinkSync(webm);
    console.log('video', mp4, execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', mp4]).toString().trim(), 's');
  }
})().catch(e => { console.error(e.message); process.exit(1); });
