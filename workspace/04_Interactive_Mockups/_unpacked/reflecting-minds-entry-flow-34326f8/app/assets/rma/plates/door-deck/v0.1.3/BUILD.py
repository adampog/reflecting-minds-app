#!/usr/bin/env python3
"""Build the nine vector-only RMA entry plates and measured parity proofs."""
from __future__ import annotations
import hashlib, json, math, subprocess, tempfile
from copy import deepcopy
from xml.etree import ElementTree as ET
from pathlib import Path
import numpy as np
from PIL import Image, ImageOps, ImageDraw

ROOT = Path(__file__).resolve().parent
PALETTE = {"sky":"#F1C98E","sage":"#91AD7E","river":"#2F8790","water":"#72B4B2","clay":"#D68052","soil":"#E7A268","dark":"#704F3B","wood":"#8B553A","cream":"#F7E2C7","ink":"#394941"}
DEFS = '''<defs>
<pattern id="paper-fiber" width="34" height="30" patternUnits="userSpaceOnUse"><path d="M4 7q5-2 10 0M21 19q4-1 8 1M8 27l4-1" fill="none" stroke="#704C39" stroke-width=".7" opacity=".18"/></pattern>
<filter id="object-shadow" x="-25%" y="-20%" width="150%" height="160%"><feGaussianBlur in="SourceAlpha" stdDeviation="1.2"/><feOffset dx="3" dy="4" result="shadow"/><feComponentTransfer><feFuncA type="linear" slope=".24"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>'''

ALT = {
"personal-tension":"A shared wooden fence and its rails run through an orchard with a fuller row of trees. Several hives sit at the far end, and one stands by the fence.",
"seeing-differently":"Two equal wooden stakes stand a stride apart on a riverbank beside a calm river. One is planted at the summer waterline; the other is farther up the bank at a faint old spring-flood trace, with open ground between them.",
"uncertainty":"Timber ribs and plank seams line a pale ship's hold. Empty barrel rings surround one remaining barrel; a small port shows open sea at an empty horizon.",
"divided-group":"A shallow ford of stepping stones lies before a small distant bridge. Several travel packs rest on the bank between the two crossings.",
"another-perspective":"A half-copied sheet, original letter, pen and inkwell rest on a clear desk with a visible front edge, against a plain wall.",
"seen-or-heard":"Two empty market stalls have striped cloth awnings on poles, counters and covered baskets, with crates on packed earth; a small mill stands on the far hill. No signs or people are visible.",
"values-tension":"At dusk, one unlit lantern hangs at a fork where two equal roads lead toward small distant villages. Subtle furrow bands cross both sides of the field; neither road is highlighted.",
"self-understanding":"A round stone well with a visible rim and small wooden crossbar stands where a short straight path and a longer, gently curving path meet. Stone joints mark the well and path edges.",
"just-curious":"Five low, wide bowls from one potter rest on a wooden shelf against a paneled wall with a second shelf line. Each bowl has a small difference in its rim or base.",
}
P2_FOCAL = [258,230,355,322]  # accepted source focal; P2 remains byte-identical

def svg(body):
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">{DEFS}{body}</svg>\n'

SCENES = {
"personal-tension": svg('''<rect width="600" height="400" fill="#F1C98E"/><g id="scene">
<path d="M0 0H600V167Q470 150 340 169T0 160Z" fill="#F1C98E"/><path d="M0 118Q78 77 149 110T299 106Q377 64 451 104T600 92V236H0Z" fill="#719764"/><path d="M0 155Q125 132 250 161T500 148Q552 142 600 151V400H0Z" fill="#D68052"/><path d="M30 190q52-11 104 0m40-3q44-10 88 0m198-6q38-10 76 0m-470 22q42-9 84 0m346-4q42-9 84 0" fill="none" stroke="#59744F" stroke-width="2" opacity=".55"/><path d="M0 222Q160 202 300 227T600 213V400H0Z" fill="#E7A268"/>
<path d="M0 120Q90 96 180 119T360 112Q470 92 600 115V147Q480 133 360 148T120 141T0 148Z" fill="#72B4B2" opacity=".72"/><g fill="#59744F" opacity=".6"><path d="M18 144q12-22 24 0m58-4q12-20 24 0m359-4q12-22 24 0m61 5q12-20 24 0"/></g><!-- orchard rows and dry ground; no stream or crop outcome -->
<g fill="#789B6B"><path d="M55 157q5-25 22-29 12-23 29-5 17-4 24 13 14 2 18 17zM173 152q6-25 23-29 12-22 29-4 17-5 24 14 15 2 18 17zM409 148q6-27 24-31 14-22 31-3 18-6 25 15 16 2 20 19zM514 145q4-22 20-26 11-19 26-3 17-3 21 13 12 1 16 16z"/></g><g fill="#2F8790" opacity=".78"><path d="M86 156q8-20 21-21 14-2 20 16zM205 151q8-20 22-21 14-2 20 17zM442 148q7-22 23-22 15 0 21 18z"/></g>
<g fill="none" stroke="#59744F" stroke-width="4" stroke-linecap="round"><path d="M88 170v-28m0 13-10-10m10 7 12-12M207 165v-27m0 13-10-11m10 7 12-12M447 162v-29m0 12-11-10m11 6 13-12"/></g>
<g fill="#A65A3E" stroke="#704331" stroke-width="1.5"><path d="M434 178v-15l8-5 8 5v15zM458 176v-14l8-5 8 5v14zM482 178v-15l8-5 8 5v15z"/></g>
<g fill="#547C58" opacity=".92"><path d="M26 163q9-15 19-2 10-12 20 3zM286 161q9-15 19-2 10-12 20 3zM362 157q8-13 17-1 9-10 18 2z"/></g><path d="M42 225q38-7 76 0m345 7q42-8 84 0m-391 18q26-5 52 0" fill="none" stroke="#704331" stroke-width="2" opacity=".65"/><g fill="#789B6B" stroke="#59744F" stroke-width="2"><path d="M282 154q8-24 23-25 12-24 27-5 17-5 25 14 14 2 18 17zM342 151q7-20 20-21 10-20 23-4 14-4 20 12 12 2 15 15z"/></g><path d="M302 173v-24m56 25v-22" stroke="#59744F" stroke-width="5"/><g fill="none" stroke="#704331" stroke-width="3" opacity=".75"><path d="M52 181h124m192-3h112M61 195h112m201-3h103M52 209h124m192-3h112"/></g><g fill="#789B6B" stroke="#59744F" stroke-width="2"><path d="M260 154q7-21 20-22 10-20 22-4 15-3 21 12 11 2 14 15z"/></g><path d="M291 174v-25" stroke="#59744F" stroke-width="5"/><g fill="#365C47" stroke="#416047" stroke-width="2"><path d="M34 163q9-23 27-24 14-21 29-4 19-6 28 11 15 3 19 17zM154 155q8-22 25-23 12-20 27-4 18-4 25 13 14 3 17 15zM400 157q10-24 28-25 14-21 30-3 19-5 27 13 16 2 20 16zM500 154q8-20 24-22 11-18 25-3 16-4 22 12 12 2 16 14zM208 151q8-22 24-24 12-19 26-4 18-4 25 14 13 2 16 14zM324 149q9-21 25-23 12-19 27-3 17-4 24 13 14 2 17 14z"/></g><!-- focal: a shared fence and the single nearer hive -->
<g id="focal" filter="url(#object-shadow)" stroke="#704331" stroke-width="2"><path d="M253 253v-35l8-7 8 7v35zM336 253v-35l8-7 8 7v35z" fill="#8B553A"/><path d="M261 224h83v9h-83zM261 243h83v9h-83z" fill="#8B553A"/><path d="M278 300v-57q22-14 44 0v57z" fill="#A65A3E"/><path d="M282 260h36m-36 14h36m-34 15h32" fill="none" stroke="#E7AA69" stroke-width="2"/></g>
<path d="M24 325q12-5 24 0m86 14q12-5 24 0m335-10q12-5 24 0" fill="none" stroke="#8B553A" stroke-width="1.5" opacity=".55"/><rect width="600" height="400" fill="url(#paper-fiber)" opacity=".42"/><rect width="600" height="400" fill="#704F3B" opacity=".03"/></g>'''),
"uncertainty": svg('''<rect width="600" height="400" fill="#F7E2C7"/><g id="scene">
<!-- ship's hold: warm curved hull ribs and plank floor -->
<path d="M0 0H600V290Q514 321 300 327Q88 321 0 290Z" fill="#F1C98E"/><path d="M0 0H600V28Q300 45 0 28Z" fill="#2F8790"/><path d="M0 28H600V56Q300 83 0 56Z" fill="#72B4B2"/><path d="M0 0V281Q64 315 114 319V72Q62 38 0 0M600 0Q540 38 486 72V319Q538 314 600 281Z" fill="#D68052"/><path d="M0 88Q300 136 600 88" fill="none" stroke="#8B553A" stroke-width="5" opacity=".45"/><path d="M112 48Q142 171 158 308M300 38Q300 170 300 318M488 48Q458 171 442 308" fill="none" stroke="#A65A3E" stroke-width="4" opacity=".62"/><path d="M18 325Q154 348 300 351T582 325" fill="none" stroke="#704331" stroke-width="2" opacity=".55"/>
<path d="M0 284Q120 317 300 322T600 284V400H0Z" fill="#D68052"/><path d="M0 313Q150 342 300 345T600 313V400H0Z" fill="#E7A268"/><g fill="none" stroke="#8B553A" stroke-width="1.5" opacity=".5"><path d="M0 350Q300 375 600 350M100 323l-4 77m400-77 4 77"/></g>
<!-- small port opens to sea and an empty horizon -->
<ellipse cx="490" cy="128" rx="42" ry="36" fill="#704F3B"/><ellipse cx="490" cy="128" rx="34" ry="29" fill="#F1C98E"/><path d="M459 128q15-2 31 0t31 0v21h-62z" fill="#2F8790"/><path d="M459 128q15-2 31 0t31 0" fill="none" stroke="#72B4B2" stroke-width="2"/>
<path d="M447 93q20-4 40 0m-37 8q18-4 36 0" fill="none" stroke="#8B553A" stroke-width="2" opacity=".55"/><path d="M274 267q26 13 52 0m-51 35q25 10 50 0" fill="none" stroke="#704331" stroke-width="1.5" opacity=".5"/><!-- focal: pale empty barrel rings around one remaining barrel -->
<g id="focal"><g fill="none" stroke="#F7E2C7" stroke-width="3"><ellipse cx="266" cy="321" rx="11" ry="6"/><ellipse cx="334" cy="321" rx="11" ry="6"/><ellipse cx="300" cy="324" rx="9" ry="5"/></g><g filter="url(#object-shadow)" stroke="#704331" stroke-width="2"><path d="M279 328q-10-25 0-79 21-12 42 0 10 49 0 79z" fill="#A65A3E"/><path d="M277 286q23 10 46 0M278 312q22 10 44 0" fill="none" stroke="#E7AA69" stroke-width="3"/></g></g>
<rect width="600" height="400" fill="url(#paper-fiber)" opacity=".58"/><rect width="600" height="400" fill="#E7A268" opacity=".10"/></g>'''),
"divided-group": svg('''<rect width="600" height="400" fill="#F1C98E"/><g id="scene">
<path d="M0 92Q130 55 258 82T498 77Q557 63 600 76V153H0Z" fill="#91AD7E"/><path d="M0 146Q140 126 260 151T600 141V270H0Z" fill="#2F8790"/><path d="M0 174Q140 154 260 178T600 169V196Q430 205 260 203T0 202Z" fill="#72B4B2"/><path d="M0 250Q144 231 285 253T600 246V400H0Z" fill="#D68052"/><path d="M0 276Q150 260 292 280T600 270V400H0Z" fill="#E7A268"/>
<path d="M0 250Q144 231 285 253T600 246M0 146Q140 126 260 151T600 141" fill="none" stroke="#704F3B" stroke-width="2" opacity=".5"/>
<!-- far bridge, restrained and small -->
<g fill="none" stroke="#8B553A" stroke-width="5" stroke-linecap="round"><path d="M352 151q34-26 68 0M350 153h72M358 152v15m28-15v15m29-15v15"/></g>
<!-- near ford stones -->
<g id="focal" fill="#F1C98E" stroke="#8B553A" stroke-width="2"><path d="M166 220l16-8 20 6-4 13-25 2zM206 204l14-8 18 5-3 12-24 2zM249 192l14-8 18 5-3 12-24 1zM292 183l13-7 17 5-3 11-22 2z"/></g>
<!-- travel packs rest on the bank between the routes -->
<g filter="url(#object-shadow)" fill="#A65A3E" stroke="#704331" stroke-width="2"><path d="M283 286v-33q15-12 31 0v33zM321 289v-27q13-11 27 0v27z"/></g><g fill="none" stroke="#E7AA69" stroke-width="2"><path d="M290 265h17m22 4h14M296 253v-6m39 9v-6"/></g>
<path d="M95 310q13-5 25 0m383-3q13-5 25 0M0 120q80-16 160 0m250 0q80-16 160 0" fill="none" stroke="#59744F" stroke-width="1.5" opacity=".45"/>
<rect width="600" height="400" fill="url(#paper-fiber)" opacity=".58"/></g>'''),
"another-perspective": svg('''<rect width="600" height="400" fill="#F1C98E"/><g id="scene">
<!-- warm plaster wall above a near-eye-level writing desk -->
<path d="M0 0H600V190H0Z" fill="#E7A268"/><path d="M0 190H600V310Q300 326 0 310Z" fill="#F1C98E"/><path d="M85 198H515V258H85Z" fill="#2F8790" stroke="#2F8790" stroke-width="2"/><path d="M0 310Q300 326 600 310V344Q300 359 0 344Z" fill="#D68052"/><path d="M0 310Q300 326 600 310" fill="none" stroke="#704331" stroke-width="4"/><path d="M52 344v52m496-52v52" fill="none" stroke="#8B553A" stroke-width="14"/>
<!-- focal: original letter, half-copied sheet, laid-down pen and inkwell -->
<g id="focal"><g filter="url(#object-shadow)" fill="#F7E2C7" stroke="#8B553A" stroke-width="2"><path d="M253 220l35-7 12 61-36 7z"/><path d="M296 207l35 4-4 70-35-4z"/></g><g fill="none" stroke="#8B553A" stroke-width="1.4" stroke-linecap="round"><path d="M260 229l24-5m-22 15 26-5m-23 14 20-4M302 223l22 2m-22 8 23 2m-23 8 13 1"/></g><path d="M281 294l43-20m-46 24 4-8 5 5" fill="none" stroke="#704331" stroke-width="3" stroke-linecap="round"/><path d="M332 283l5-7 10 1 3 17h-21z" fill="#2F8790" stroke="#704331" stroke-width="2"/><path d="M334 276l4-6 5 1" fill="none" stroke="#704331" stroke-width="2"/></g>
<rect width="600" height="400" fill="url(#paper-fiber)" opacity=".58"/><rect width="600" height="400" fill="#704F3B" opacity=".01"/></g>'''),
"seen-or-heard": svg('''<rect width="600" height="400" fill="#F1C98E"/><g id="scene">
<!-- empty market square of packed earth; a small mill sits on the far hill -->
<path d="M0 0H600V164Q455 144 310 171T0 154Z" fill="#F1C98E"/><path d="M0 137Q95 102 186 128T364 119Q468 86 600 118V239H0Z" fill="#719764"/><path d="M0 208Q150 188 300 211T600 199V400H0Z" fill="#D68052"/><path d="M0 255Q144 236 300 257T600 246V400H0Z" fill="#E7A268"/><path d="M0 319Q130 307 260 320M370 350q110-12 230 0M44 280q42-8 84 0m260-18q58-8 112 1M153 370q36-6 72 0m232-30q32-6 64 0" fill="none" stroke="#A65A3E" stroke-width="2" opacity=".5"/>
<g fill="#8B553A" stroke="#704331" stroke-width="1.5"><path d="M472 150v-27h22v27z"/><path d="M467 123l16-14 16 14z"/><path d="M483 111V91m0 20-11-9m11 9 11-9" fill="none" stroke-width="2"/></g>
<g fill="none" stroke="#F1C98E" stroke-width="4" opacity=".9"><path d="M254 216v10m9-12v14m9-14v14m9-14v14m9-14v12m26-12v14m9-14v14m9-14v14m9-12v10"/></g><g fill="#8B553A" opacity=".85"><path d="M24 302q60-15 120 0m-110 20q56-13 112 0m330-9q60-15 120 0m-100 22q50-12 100 0M75 365q54-12 108 0m232-12q58-13 116 0"/></g><path d="M302 275h58v20h-58zM306 279h24v12h-24zM334 279h22v12h-22z" fill="#A65A3E" stroke="#704331" stroke-width="2"/><!-- focal: two equally sized quiet stalls, no signs or people -->
<g id="focal" stroke="#704331" stroke-width="2"><g fill="none" stroke="#8B553A" stroke-width="3"><path d="M253 229v62m41-62v62m12-62v62m41-62v62"/></g><g filter="url(#object-shadow)"><path d="M247 232v-18h52v18q-5 7-10 0-5 7-10 0-5 7-10 0-5 7-10 0-5 7-12 0z" fill="#2F8790"/><path d="M306 232v-18h52v18q-5 7-10 0-5 7-10 0-5 7-10 0-5 7-10 0-5 7-12 0z" fill="#72B4B2"/></g><path d="M246 262h54v9h-54zM305 262h54v9h-54z" fill="#8B553A"/><path d="M250 271v27m46-27v27m13-27v27m46-27v27" fill="none" stroke="#704331" stroke-width="4"/><g fill="#F1C98E"><path d="M256 280h14v13h-14zM276 281h13v12h-13zM315 280h14v13h-14zM335 281h13v12h-13z"/></g><path d="M257 278h11m-11 4h11m48-4h11m-11 4h11" fill="none" stroke="#704F3B" stroke-width="1.4"/></g>
<rect width="600" height="400" fill="url(#paper-fiber)" opacity=".58"/></g>'''),
"values-tension": svg('''<rect width="600" height="400" fill="#F1C98E"/><g id="scene">
<!-- open field at dusk: two roads to two small equally weighted villages -->
<path d="M0 0H600V177Q450 153 300 175T0 161Z" fill="#F1C98E"/><path d="M0 134Q130 98 260 132T520 118Q565 112 600 124V289H0Z" fill="#719764"/><path d="M0 226Q154 210 302 231T600 219V400H0Z" fill="#D68052"/><path d="M0 288Q155 270 302 292T600 281V400H0Z" fill="#E7A268"/>
<path d="M0 192Q110 177 222 193M378 193Q490 177 600 192" fill="none" stroke="#59744F" stroke-width="4" opacity=".6"/><path d="M24 203q40-12 80 0m390 0q40-12 80 0M37 217q35-11 70 0m390 0q35-11 70 0" fill="none" stroke="#8B553A" stroke-width="2" opacity=".55"/><g fill="#8B553A" stroke="#704331" stroke-width="1.5"><path d="M154 171v-18h20v18zM150 153l14-13 14 13zM424 171v-18h20v18zM420 153l14-13 14 13z"/></g>
<path d="M0 176Q120 160 240 178T480 169Q550 164 600 174V222H0Z" fill="#72B4B2" opacity=".62"/><path d="M12 187q54-12 108 0m360-1q48-10 96 0M30 203q46-10 92 0m356 0q46-10 92 0" fill="none" stroke="#59744F" stroke-width="2" opacity=".6"/><g fill="#2F8790" opacity=".78"><path d="M35 147q15-12 30-1l-4 7H39zM98 154q12-10 25-1l-3 6h-20zM458 151q14-11 28-1l-3 7h-22zM531 146q14-10 27-1l-3 7h-21z"/></g><g fill="#E7A268" opacity=".72"><path d="M22 232q18-5 36 0m510-2q16-4 32 0M77 251q15-4 30 0m398 4q15-4 30 0"/></g><g opacity=".76"><path d="M10 235q90-12 180 0v13q-90-11-180 0zM410 235q90-12 180 0v13q-90-11-180 0z" fill="#F1C98E"/></g><!-- equal paths split from one junction; neither is favored -->
<path d="M280 400Q282 342 292 311Q276 285 244 261Q214 235 198 204L219 200Q239 237 266 253Q304 283 314 312Q320 351 319 400Z" fill="#F1C98E" stroke="#8B553A" stroke-width="2"/><path d="M320 400Q318 342 308 311Q324 285 356 261Q386 235 402 204L381 200Q361 237 334 253Q296 283 286 312Q280 351 281 400Z" fill="#F1C98E" stroke="#8B553A" stroke-width="2"/>
<!-- focal: one unlit lantern beside the shared fork -->
<g id="focal"><g fill="none" stroke="#704331" stroke-width="3" stroke-linecap="round"><path d="M300 276v-46m-10 4h20m-21-4q11-13 22 0l-2 18h-18z"/></g><path d="M291 249h18v18h-18z" fill="#8B553A" stroke="#704331" stroke-width="1.5"/><path d="M250 311Q278 287 300 277Q322 287 350 311" fill="none" stroke="#8B553A" stroke-width="5"/></g>
<path d="M0 225Q150 209 302 230T600 218" fill="none" stroke="#704F3B" stroke-width="2" opacity=".4"/><path d="M22 335q72-12 144 0m268 0q72-12 144 0" fill="none" stroke="#8B553A" stroke-width="2" opacity=".55"/><path d="M0 276q110-15 220 0v48Q110 309 0 324zm380 0q110-15 220 0v48q-110-15-220 0z" fill="#A65A3E" opacity=".84"/><rect width="600" height="400" fill="url(#paper-fiber)" opacity=".32"/><rect width="600" height="400" fill="#40514A" opacity=".04"/><rect width="600" height="400" fill="#704F3B" opacity=".035"/></g>'''),
"self-understanding": svg('''<rect width="600" height="400" fill="#F1C98E"/><g id="scene">
<!-- open meadow and dry earth; no river or village -->
<path d="M0 0H600V169Q460 148 300 171T0 157Z" fill="#F1C98E"/><path d="M0 130Q124 101 250 132T500 120Q557 110 600 127V282H0Z" fill="#668F5F"/><path d="M0 244Q150 225 300 248T600 238V400H0Z" fill="#D68052"/><path d="M0 300Q160 282 302 305T600 295V400H0Z" fill="#E7A268"/>
<g fill="#547C58" opacity=".9"><path d="M45 184q11-19 23-2 11-13 22 3zM116 174q10-17 20-2 12-12 22 4zM401 181q11-19 23-2 11-13 22 3zM503 170q10-17 20-2 12-12 22 4z"/></g>
<!-- short straight and longer gently worn paths meet at the well -->
<path d="M291 400L292 308 309 308 311 400Z" fill="#F1C98E" stroke="#8B553A" stroke-width="1.5"/><path d="M147 400Q164 354 207 335Q248 319 282 306l9 12q-32 31-70 46Q177 381 171 400Z" fill="#F1C98E" stroke="#8B553A" stroke-width="1.5"/><path d="M158 400Q181 359 216 342Q250 326 284 309" fill="none" stroke="#A65A3E" stroke-width="2" opacity=".55"/>
<g fill="#547C58" opacity=".9"><path d="M45 184q11-19 23-2 11-13 22 3zM116 174q10-17 20-2 12-12 22 4zM401 181q11-19 23-2 11-13 22 3zM503 170q10-17 20-2 12-12 22 4z"/></g><path d="M24 202q18-5 36 0m48 16q16-4 32 0m336-12q20-5 40 0m48 19q15-4 30 0M72 232q17-4 34 0m414-3q18-4 36 0m-454 26q15-4 30 0m374-5q15-4 30 0" fill="none" stroke="#59744F" stroke-width="2" opacity=".62"/><g fill="none" stroke="#704331" stroke-width="2"><path d="M269 283l9-2m9 5 9-1m10 0 9 1m9-2 9 2M268 296l8-2m10 4 8-2m11 0 9 2m9-3 9 2"/><path d="M154 391Q180 355 214 340m12-6q22-9 43-20M301 390l1-70m19 70-1-69M174 367l8 4m22-29 8 3m113-22 8-1m-9 27 8 1m-8 29 8 1m-20 28 12-4 12 3m-112-10 10 3m8-2 10 3m24-26 10-4m88-35 9 3M290 287v5m20 3v5m-39-12v5m58 0v5m-17-24v5m-26 19v4" stroke="#8B553A"/></g><!-- focal: quiet stone well at the paths' meeting point -->
<g id="focal" stroke="#704331" stroke-width="2"><path d="M252 269A48 14 0 0 0 348 269L340 309Q300 320 260 309Z" fill="#F1C98E"/><path d="M252 269A48 14 0 0 0 348 269A48 14 0 0 1 252 269Z" fill="#8B553A"/><ellipse cx="300" cy="269" rx="48" ry="13" fill="#F7E2C7" stroke="#704331" stroke-width="3"/><ellipse cx="300" cy="269" rx="39" ry="7" fill="#2F8790" stroke="#8B553A" stroke-width="1.5"/><path d="M260 281q40 10 80 0m-78 13q38 10 76 0m-76 12q38 9 76 0M271 285h14m19 0h14m-46 12h18m16 0h18" fill="none" stroke="#8B553A" stroke-width="2"/><path d="M252 263v-31m96 31v-31m-96 0h96" fill="none" stroke="#704331" stroke-width="5" stroke-linecap="round"/><path d="M252 232h96" stroke="#8B553A" stroke-width="3"/><path d="M260 286l9 2m8-1 9 2m9-1 9 2m9-1 9 2m9-2 8 2M261 300l8 2m10-1 8 2m10-1 8 2m10-1 8 2m9-1 8 2" fill="none" stroke="#8B553A" stroke-width="4"/></g>
<rect width="600" height="400" fill="url(#paper-fiber)" opacity=".58"/><rect width="600" height="400" fill="#704F3B" opacity=".04"/></g>'''),
"just-curious": svg('''<rect width="600" height="400" fill="#F7E2C7"/><g id="scene">
<!-- plain warm plaster wall above a single wooden shelf -->
<path d="M0 0H600V299H0Z" fill="#E7A167"/><path d="M0 222H600V260H0Z" fill="#55A4A9"/><path d="M0 260H600V299H0Z" fill="#2F8790"/><path d="M0 299H600V400H0Z" fill="#F7E2C7"/><path d="M0 299h600" fill="none" stroke="#8B553A" stroke-width="3" opacity=".5"/><g fill="none" stroke="#D68052" stroke-width="1.2" opacity=".35"><path d="M58 74h53m372 45h61M73 224h44m358-94h42M28 164q22-6 44 0m80-22q24-6 48 0m264 43q28-6 56 0M36 246q20-5 40 0m472-28q22-5 44 0"/></g>
<path d="M78 18V218M184 18V218M298 18V218M414 18V218M522 18V218" fill="none" stroke="#B87859" stroke-width="3" opacity=".72"/>
<path d="M24 164H576" fill="none" stroke="#B87859" stroke-width="4" opacity=".72"/><path d="M70 164v14m460-14v14" stroke="#704331" stroke-width="3"/>
<path d="M68 238h464" stroke="#D68052" stroke-width="8"/><path d="M100 242l-12 28m412-28 12 28" stroke="#704331" stroke-width="4"/><!-- focal: five near-identical bowls, with small differences in rim or base -->
<g id="focal"><path d="M150 294h300v10H150z" fill="#8B553A" stroke="#704331" stroke-width="2"/><g filter="url(#object-shadow)" stroke="#704331" stroke-width="1.8"><path d="M157 274q16 6 32 0l-4 15q-12 5-24 0z" fill="#F7E2C7"/><path d="M213 274q16 6 32 0l-4 15q-12 5-24 0z" fill="#F1C98E"/><path d="M269 274q16 6 32 0l-4 15q-12 5-24 0z" fill="#91AD7E"/><path d="M325 274q16 6 32 0l-4 15q-12 5-24 0z" fill="#F7E2C7"/><path d="M381 274q16 6 32 0l-4 15q-12 5-24 0z" fill="#E7A268"/></g><g fill="none" stroke="#2F8790" stroke-width="1.3"><path d="M157 275q16 6 32 0m26 0q16 6 32 0m26 0q16 6 32 0m26 0q16 6 32 0m26 0q16 6 32 0"/></g></g>
<rect width="600" height="400" fill="url(#paper-fiber)" opacity=".40"/><rect width="600" height="400" fill="#704F3B" opacity=".10"/></g>''')
}

def linearize(a):
    return np.where(a <= .04045, a / 12.92, ((a + .055) / 1.055) ** 2.4)

def focal_bbox(svg_path):
    if svg_path.stem == "seeing-differently":
        return P2_FOCAL
    root = ET.fromstring(svg_path.read_bytes())
    focal = next((node for node in root.iter() if node.attrib.get("id") == "focal"), None)
    if focal is None:
        raise ValueError(f"missing focal group in {svg_path.name}")
    namespace = "http://www.w3.org/2000/svg"
    isolated = ET.Element(f"{{{namespace}}}svg", {"width":"600", "height":"400", "viewBox":"0 0 600 400"})
    defs = next((node for node in root if node.tag == f"{{{namespace}}}defs"), None)
    if defs is not None:
        isolated.append(deepcopy(defs))
    isolated.append(deepcopy(focal))
    with tempfile.TemporaryDirectory() as tmp:
        source = Path(tmp) / "focal.svg"
        output = Path(tmp) / "focal.png"
        source.write_bytes(ET.tostring(isolated, encoding="utf-8", xml_declaration=True))
        subprocess.run(["rsvg-convert", "-w", "600", "-h", "400", "-o", str(output), str(source)], check=True)
        box = Image.open(output).convert("RGBA").getchannel("A").getbbox()
    if box is None:
        raise ValueError(f"empty focal group in {svg_path.name}")
    return list(box)

def metrics(path, bbox):
    rgb = np.asarray(Image.open(path).convert('RGB'), dtype=np.float32) / 255.0
    lin = linearize(rgb)
    y = lin @ np.array([.2126, .7152, .0722], dtype=np.float32)
    sat = (rgb.max(axis=2) - rgb.min(axis=2)) / np.maximum(rgb.max(axis=2), 1e-6)
    def sobel_density(luma, threshold=5.0):
        grey = luma * 255.0
        gx = (-grey[:-2,:-2] + grey[:-2,2:] - 2*grey[1:-1,:-2] + 2*grey[1:-1,2:] - grey[2:,:-2] + grey[2:,2:])
        gy = (-grey[:-2,:-2] - 2*grey[:-2,1:-1] - grey[:-2,2:] + grey[2:,:-2] + 2*grey[2:,1:-1] + grey[2:,2:])
        return float((np.hypot(gx, gy) >= threshold).mean())
    edge = sobel_density(y)
    full = Image.open(path.with_name(path.name.replace('-300x200.png','-1200x800.png'))).convert('RGB')
    small_gray = np.asarray(ImageOps.grayscale(full).resize((120,80),Image.Resampling.LANCZOS),dtype=np.float32)
    dx=small_gray[1:,1:]-small_gray[1:,:-1]
    dy=small_gray[1:,1:]-small_gray[:-1,1:]
    thumbnail_edge_density=float(((np.abs(dx)+np.abs(dy))>12).mean())
    rgb8=rgb*255.0; rg=rgb8[:,:,0]-rgb8[:,:,1]; yb=.5*(rgb8[:,:,0]+rgb8[:,:,1])-rgb8[:,:,2]
    colorfulness=float(math.sqrt(float(rg.std())**2+float(yb.std())**2)+.3*math.sqrt(float(rg.mean())**2+float(yb.mean())**2))
    x0,y0,x1,y1=bbox
    return {"mean_luminance_linear":float(y.mean()),"luminance_std_linear":float(y.std()),"mean_saturation_hsv":float(sat.mean()),"sobel_edge_density_at_300x200_threshold5":edge,"colorfulness_hasler_susstrunk":colorfulness,"l1_edge_density_at_120x80_gt12":thumbnail_edge_density,"focal_bbox_viewbox_px":bbox,"focal_bbox_area_viewbox_px2":int((x1-x0)*(y1-y0))}

def main():
    for door, src in SCENES.items():
        p=ROOT/f"{door}.svg"; p.write_text(src,encoding='utf-8')
    for door in ALT:
        if door != 'seeing-differently':
            (ROOT/f"{door}.alt.txt").write_text(ALT[door]+"\n",encoding='utf-8')
    for door in ["personal-tension","uncertainty","divided-group","another-perspective","seen-or-heard","values-tension","self-understanding","just-curious"]:
        for w,h in [(1200,800),(300,200)]:
            subprocess.run(["rsvg-convert","-w",str(w),"-h",str(h),"-o",str(ROOT/f"{door}-{w}x{h}.png"),str(ROOT/f"{door}.svg")],check=True)
    # P2 is separately source-pinned by its checkpoint; render bytes are verified but never rewritten here.
    order=sorted(ALT)
    results={door:metrics(ROOT/f"{door}-300x200.png",focal_bbox(ROOT/f"{door}.svg")) for door in order}
    medians={}
    for key in ["mean_luminance_linear","luminance_std_linear","mean_saturation_hsv","sobel_edge_density_at_300x200_threshold5","focal_bbox_area_viewbox_px2","colorfulness_hasler_susstrunk","l1_edge_density_at_120x80_gt12"]:
        vals=[row[key] for row in results.values()]
        medians[key]=float(np.median(vals))
    checks={door:{key:round(abs(row[key]/medians[key]-1),5) for key in medians} for door,row in results.items()}
    parity={"method":{"color_space":"sRGB input; linear-light relative luminance","mean_luminance":"mean WCAG relative luminance","luminance_std":"population standard deviation of WCAG relative luminance","mean_saturation":"HSV S component in [0,1]","edge_density":"300x200: 3x3 Sobel gradient magnitude >= 5 on linear luminance scaled to 0..255. Thumbnail: convert 1200x800 export to greyscale, Lanczos downscale to 120x80, compute forward dx and dy at the 119x79 interior pixels, count |dx|+|dy| > 12 grey levels and divide by 119*79.","colorfulness":"Hasler-Süsstrunk: sqrt(std(R-G)^2 + std(0.5*(R+G)-B)^2) + 0.3*sqrt(mean(R-G)^2 + mean(0.5*(R+G)-B)^2), on 300x200 sRGB values scaled to 0..255","focal_bbox":"alpha bounds of isolated SVG focal groups, rasterized at 600x400; P2 carries forward its accepted source focal bbox because its SVG and PNGs remain byte-identical"},"tolerance_fraction":0.12,"additional_tolerances":{"colorfulness_hasler_susstrunk":0.15,"l1_edge_density_at_120x80_gt12":0.20},"medians":medians,"plates":results,"absolute_relative_delta_from_median":checks,"result":"PASS" if all(checks[d][k] <= (0.15 if k == "colorfulness_hasler_susstrunk" else 0.20 if k == "l1_edge_density_at_120x80_gt12" else 0.12) for d in checks for k in checks[d]) else "FAIL"}
    (ROOT/"PARITY.json").write_text(json.dumps(parity,indent=2)+"\n",encoding='utf-8')
    # 3x3 colour and 3x3 greyscale boards, both in alphabetical door-id order; no labels are drawn on the plates.
    thumb=[]
    for door in order:
        im=Image.open(ROOT/f"{door}-300x200.png").convert('RGB')
        thumb.append(im)
    gap=8
    board=Image.new('RGB',(3*300+2*gap,3*200+2*gap),'#F7F4ED')
    gray=Image.new('RGB',board.size,'#F7F4ED')
    for i,im in enumerate(thumb):
        x=(i%3)*(300+gap); y=(i//3)*(200+gap)
        board.paste(im,(x,y)); gray.paste(ImageOps.grayscale(im).convert('RGB'),(x,y))
    full=Image.new('RGB',(board.width*2+gap,board.height),'#F7F4ED'); full.paste(board,(0,0)); full.paste(gray,(board.width+gap,0)); full.save(ROOT/"parity-sheet.png",optimize=False)
    small=[]
    for door in order:
        src=Image.open(ROOT/f"{door}-1200x800.png").convert('RGB')
        small.append(src.resize((120,80),Image.Resampling.LANCZOS))
    sm=Image.new('RGB',(3*120+2*gap,3*80+2*gap),'#F7F4ED'); sg=Image.new('RGB',sm.size,'#F7F4ED')
    for i,im in enumerate(small):
        x=(i%3)*(120+gap); y=(i//3)*(80+gap); sm.paste(im,(x,y)); sg.paste(ImageOps.grayscale(im).convert('RGB'),(x,y))
    smfull=Image.new('RGB',(sm.width*2+gap,sm.height),'#F7F4ED'); smfull.paste(sm,(0,0)); smfull.paste(sg,(sm.width+gap,0)); smfull.save(ROOT/"parity-sheet-120x80.png",optimize=False)
    # Build README/provenance are authored separately so scene output remains data-only.
    listed=[]
    for p in sorted(ROOT.rglob('*')):
        if p.is_file() and p.name!="MANIFEST.sha256": listed.append(f"{hashlib.sha256(p.read_bytes()).hexdigest()}  {p.relative_to(ROOT).as_posix()}")
    (ROOT/"MANIFEST.sha256").write_text("\n".join(listed)+"\n",encoding='utf-8')
    print("Parity",parity['result'],"worst delta",max(v for r in checks.values() for v in r.values()),"files",len(listed))

if __name__=='__main__': main()
