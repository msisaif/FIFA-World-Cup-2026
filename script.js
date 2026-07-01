/* ---------------- data ---------------- */
const TEAMS = [
    {
        n: 'Brazil',
        c: 'br',
        k: 'BRA',
        col: ['#009b3a', '#ffdf00', '#009b3a'],
    },
    {
        n: 'Japan',
        c: 'jp',
        k: 'JPN',
        col: ['#ffffff', '#bc002d', '#ffffff'],
    },
    {
        n: 'Côte d’Ivoire',
        c: 'ci',
        k: 'CIV',
        col: ['#f77f00', '#ffffff', '#009e60'],
    },
    {
        n: 'Norway',
        c: 'no',
        k: 'NOR',
        col: ['#ba0c2f', '#ffffff', '#00205b'],
    },
    {
        n: 'Mexico',
        c: 'mx',
        k: 'MEX',
        col: ['#006847', '#ffffff', '#ce1126'],
    },
    {
        n: 'Ecuador',
        c: 'ec',
        k: 'ECU',
        col: ['#ffd100', '#0033a0', '#ef3340'],
    },
    {
        n: 'England',
        c: 'gb-eng',
        k: 'ENG',
        col: ['#ffffff', '#ce1124', '#ffffff'],
    },
    {
        n: 'DR Congo',
        c: 'cd',
        k: 'COD',
        col: ['#007fff', '#f7d618', '#ce1021'],
    },
    {
        n: 'Argentina',
        c: 'ar',
        k: 'ARG',
        col: ['#74acdf', '#ffffff', '#74acdf'],
    },
    {
        n: 'Cape Verde',
        c: 'cv',
        k: 'CPV',
        col: ['#003893', '#ffffff', '#cf2027'],
    },
    {
        n: 'Australia',
        c: 'au',
        k: 'AUS',
        col: ['#00008b', '#ffffff', '#e4002b'],
    },
    {
        n: 'Egypt',
        c: 'eg',
        k: 'EGY',
        col: ['#ce1126', '#ffffff', '#000000'],
    },
    {
        n: 'Switzerland',
        c: 'ch',
        k: 'SUI',
        col: ['#d52b1e', '#ffffff', '#d52b1e'],
    },
    {
        n: 'Algeria',
        c: 'dz',
        k: 'ALG',
        col: ['#006233', '#ffffff', '#d21034'],
    },
    {
        n: 'Colombia',
        c: 'co',
        k: 'COL',
        col: ['#fcd116', '#003893', '#ce1126'],
    },
    {
        n: 'Ghana',
        c: 'gh',
        k: 'GHA',
        col: ['#ce1126', '#fcd116', '#006b3f'],
    },
    {
        n: 'Senegal',
        c: 'sn',
        k: 'SEN',
        col: ['#00853f', '#fdef42', '#e31b23'],
    },
    {
        n: 'Belgium',
        c: 'be',
        k: 'BEL',
        col: ['#000000', '#fae042', '#ed2939'],
    },
    {
        n: 'Bosnia',
        c: 'ba',
        k: 'BIH',
        col: ['#002395', '#fecb00', '#002395'],
    },
    {
        n: 'USA',
        c: 'us',
        k: 'USA',
        col: ['#3c3b6e', '#ffffff', '#b22234'],
    },
    {
        n: 'Austria',
        c: 'at',
        k: 'AUT',
        col: ['#ed2939', '#ffffff', '#ed2939'],
    },
    {
        n: 'Spain',
        c: 'es',
        k: 'ESP',
        col: ['#aa151b', '#f1bf00', '#aa151b'],
    },
    {
        n: 'Croatia',
        c: 'hr',
        k: 'CRO',
        col: ['#ff0000', '#ffffff', '#171796'],
    },
    {
        n: 'Portugal',
        c: 'pt',
        k: 'POR',
        col: ['#006600', '#ff0000', '#006600'],
    },
    {
        n: 'Morocco',
        c: 'ma',
        k: 'MAR',
        col: ['#c1272d', '#006233', '#c1272d'],
    },
    {
        n: 'Netherlands',
        c: 'nl',
        k: 'NED',
        col: ['#ae1c28', '#ffffff', '#21468b'],
    },
    {
        n: 'Canada',
        c: 'ca',
        k: 'CAN',
        col: ['#ff0000', '#ffffff', '#ff0000'],
    },
    {
        n: 'South Africa',
        c: 'za',
        k: 'RSA',
        col: ['#007749', '#ffb81c', '#de3831'],
    },
    {
        n: 'Sweden',
        c: 'se',
        k: 'SWE',
        col: ['#006aa7', '#fecc00', '#006aa7'],
    },
    {
        n: 'France',
        c: 'fr',
        k: 'FRA',
        col: ['#0055a4', '#ffffff', '#ef4135'],
    },
    {
        n: 'Paraguay',
        c: 'py',
        k: 'PAR',
        col: ['#d52b1e', '#ffffff', '#0038a8'],
    },
    {
        n: 'Germany',
        c: 'de',
        k: 'GER',
        col: ['#000000', '#dd0000', '#ffce00'],
    },
];
const flag = (c) => `https://flagcdn.com/w80/${c}.png`;

// flag-coloured gradient used as the always-visible base (works offline)
function grad(t) {
    const [a, b, c] = t.col;
    return `linear-gradient(90deg, ${a} 0 33.3%, ${b} 33.3% 66.6%, ${c} 66.6% 100%)`;
}
// badge = colour base + code label, with the real flag layered on top if it loads
function badge(t, showCode) {
    const code = showCode
        ? `<span class="code"><i>${t.k}</i></span>`
        : '';
    return `${code}<img class="flagimg" src="${flag(t.c)}" alt="" loading="lazy" onerror="this.remove()">`;
}
function paint(el, t, showCode) {
    el.style.background = grad(t);
    el.innerHTML = badge(t, showCode);
    el.title = t.n;
}

/* ---------------- geometry ---------------- */
const RINGS = [32, 16, 8, 4, 2, 1]; // teams -> ... -> champion
const RADII = [455, 352, 266, 182, 100, 0]; // distance from centre (in 0..1000 space)
const C = 500;

const rad = (d) => (d * Math.PI) / 180;
const angleOf = (r, i) => ((i + 0.5) * 360) / RINGS[r] - 90;
function posOf(r, i) {
    const a = rad(angleOf(r, i)),
        R = RADII[r];
    return { x: C + R * Math.cos(a), y: C + R * Math.sin(a) };
}
function midPoint(r, i) {
    // point at parent radius, on child's angle (the elbow)
    const a = rad(angleOf(r, i)),
        R = RADII[r + 1];
    return { x: C + R * Math.cos(a), y: C + R * Math.sin(a) };
}

/* ---------------- state ---------------- */
const winners = {}; // "r-i" (internal) -> team index
const winnerChild = {}; // "r-i" (internal) -> child id that won it
const locked = new Set(); // ids of nodes whose result is fixed (cannot change)

/* ================= FIXED RESULTS =================
   Hard-code real results here. Put a team's 3-letter CODE under the
   round it has WON. That match becomes locked — clicking can't change it,
   and "আবার শুরু" keeps it. A later-round win automatically locks the
   team's earlier-round wins too.

   Valid codes:
   BRA JPN CIV NOR MEX ECU ENG COD ARG CPV AUS EGY SUI ALG COL GHA
   SEN BEL BIH USA AUT ESP CRO POR MAR NED CAN RSA SWE FRA PAR GER

   Example:
     r32:  ['BRA','ARG','GER'],   // these 3 won their Round-of-32 match
     r16:  ['BRA','ARG'],         // BRA & ARG also won Round-of-16
     qf:   ['BRA'],
     final:'BRA'                  // BRA is the locked champion
================================================== */
const FIXED = {
    r32: [
        'CAN', // CAN 1 - 0 RSA
        'BRA', // BRA 2 - 1 JPN
        'PAR', // PAR 1(4) - 1(3) GER
        'MAR', // MAR 1(3) - 1(2) NED
        'NOR', // NOR 2 - 2 CIV
        'FRA', // FRA 3 - 0 SWE
        'MEX', // MEX 2 - 0 ECU
    ], // Round of 32 winners (locked)
    r16: [], // Round of 16 winners (locked)
    qf: [], // Quarter-final winners (locked)
    sf: [], // Semi-final winners (locked)
    final: null, // champion, e.g. 'ARG'
};

const codeIndex = (code) => TEAMS.findIndex((t) => t.k === code);

// team `ti` wins every round from 1..R; lock those nodes to that result
function lockPath(ti, R) {
    for (let r = 1; r <= R; r++) {
        const parent = Math.floor(ti / 2 ** r); // node index at ring r
        const child = Math.floor(ti / 2 ** (r - 1)); // node index at ring r-1
        const pid = `${r}-${parent}`;
        if (winners[pid] !== undefined && winners[pid] !== ti)
            console.warn(
                'FIXED conflict at',
                pid,
                '—',
                TEAMS[winners[pid]].k,
                'vs',
                TEAMS[ti].k
            );
        winners[pid] = ti;
        winnerChild[pid] = `${r - 1}-${child}`;
        locked.add(pid);
    }
}

function applyLocks() {
    locked.clear();
    const rounds = [
        ['r32', 1],
        ['r16', 2],
        ['qf', 3],
        ['sf', 4],
    ];
    for (const [key, R] of rounds) {
        (FIXED[key] || []).forEach((code) => {
            const ti = codeIndex(code);
            if (ti < 0)
                return console.warn('FIXED: unknown code', code);
            lockPath(ti, R);
        });
    }
    if (FIXED.final) {
        const ti = codeIndex(FIXED.final);
        if (ti < 0)
            console.warn('FIXED: unknown final code', FIXED.final);
        else lockPath(ti, 5);
    }
}

const stage = document.getElementById('stage');
const svg = document.getElementById('lines');
const SVGNS = 'http://www.w3.org/2000/svg';

const edgeEls = {}; // childId -> polyline
const nodeEls = {}; // "r-i" -> div

/* ---------------- build edges ---------------- */
for (let r = 0; r < 5; r++) {
    for (let i = 0; i < RINGS[r]; i++) {
        const child = posOf(r, i);
        const parent = posOf(r + 1, Math.floor(i / 2));
        const mid = midPoint(r, i);
        const pts = `${child.x},${child.y} ${mid.x},${mid.y} ${parent.x},${parent.y}`;
        const line = document.createElementNS(SVGNS, 'polyline');
        line.setAttribute('points', pts);
        line.setAttribute('class', 'edge');
        svg.appendChild(line);
        edgeEls[`${r}-${i}`] = line;
    }
}

/* ---------------- build nodes ---------------- */
function place(el, p) {
    el.style.left = p.x / 10 + '%';
    el.style.top = p.y / 10 + '%';
}

// leaves (teams)
for (let i = 0; i < 32; i++) {
    const p = posOf(0, i),
        t = TEAMS[i];
    const el = document.createElement('div');
    el.className = 'node leaf';
    paint(el, t, true);
    place(el, p);
    el.addEventListener('click', () => advance(0, i));
    stage.appendChild(el);
    nodeEls[`0-${i}`] = el;
}

// inner nodes
for (let r = 1; r < 5; r++) {
    for (let i = 0; i < RINGS[r]; i++) {
        const el = document.createElement('div');
        el.className = 'node inner';
        place(el, posOf(r, i));
        el.addEventListener('click', () => advance(r, i));
        stage.appendChild(el);
        nodeEls[`${r}-${i}`] = el;
    }
}

// champion / trophy
const champ = document.createElement('div');
champ.className = 'node champ';
champ.innerHTML = `<div class="trophy">🏆</div><div class="flagchip" id="champFlag"></div>`;
const champFlagEl = () => document.getElementById('champFlag');
place(champ, { x: C, y: C });
stage.appendChild(champ);
nodeEls['5-0'] = champ;

/* ---------------- logic ---------------- */
function teamIndexAt(r, i) {
    if (r === 0) return i;
    const v = winners[`${r}-${i}`];
    return v === undefined ? null : v;
}

// clear a node's winner and everything inward of it (but never a locked/fixed result)
function clearFrom(r, i) {
    let cr = r,
        ci = i;
    while (cr <= 5) {
        const id = `${cr}-${ci}`;
        if (cr > 0 && !locked.has(id)) {
            delete winners[id];
            delete winnerChild[id];
        }
        ci = Math.floor(ci / 2);
        cr++;
    }
}

// a round is "complete" when every slot in that ring is filled
function roundComplete(r) {
    if (r === 0) return true; // teams always exist
    for (let i = 0; i < RINGS[r]; i++)
        if (winners[`${r}-${i}`] === undefined) return false;
    return true;
}

// a node lost if its parent match is decided and this node isn't the winner
function isLoser(r, i) {
    if (r >= 5) return false;
    const pid = `${r + 1}-${Math.floor(i / 2)}`;
    return (
        winnerChild[pid] !== undefined &&
        winnerChild[pid] !== `${r}-${i}`
    );
}

// show / hide the little lock badge on a node element
function setLockMark(el, on) {
    const m = el.querySelector('.lockmark');
    if (on && !m) {
        const s = document.createElement('span');
        s.className = 'lockmark';
        s.title = 'ফল নিশ্চিত (সম্পন্ন)';
        el.appendChild(s);
    } else if (!on && m) {
        m.remove();
    }
}

let warnTimer = null;
function feedback(r, i, msg) {
    const el = nodeEls[`${r}-${i}`];
    el.classList.remove('shake');
    void el.offsetWidth;
    el.classList.add('shake');
    const hint = document.getElementById('hint');
    hint.textContent = msg;
    hint.classList.add('warn');
    clearTimeout(warnTimer);
    warnTimer = setTimeout(() => {
        hint.classList.remove('warn');
        updateStatus();
    }, 1500);
}

function advance(r, i) {
    const ti = teamIndexAt(r, i);
    if (ti === null) return; // empty junction, nothing to advance
    if (r === 5) return; // already champion

    const pr = r + 1,
        pi = Math.floor(i / 2),
        pid = `${pr}-${pi}`;
    if (locked.has(pid)) {
        feedback(r, i, '🔒 এই ফল লক করা আছে');
        return;
    } // fixed result
    if (r >= 1 && !roundComplete(r)) {
        feedback(r, i, '⚠ আগে এই রাউন্ডের সব ম্যাচ শেষ করো');
        return;
    }

    clearFrom(pr, pi); // reset this match + inward path
    winners[pid] = ti;
    winnerChild[pid] = `${r}-${i}`;
    render();
}

function render() {
    // edges
    for (const childId in edgeEls) {
        const pr = +childId.split('-')[0] + 1;
        const pi = Math.floor(+childId.split('-')[1] / 2);
        const pid = `${pr}-${pi}`;
        const isOn = winnerChild[pid] === childId;
        edgeEls[childId].classList.toggle('on', isOn);
        edgeEls[childId].classList.toggle('fixed', isOn && locked.has(pid));
    }

    // inner nodes
    for (let r = 1; r < 5; r++) {
        for (let i = 0; i < RINGS[r]; i++) {
            const el = nodeEls[`${r}-${i}`];
            const ti = winners[`${r}-${i}`];
            if (ti === undefined) {
                el.className = 'node inner';
                el.style.background = '';
                el.innerHTML = '';
                el.title = '';
            } else {
                const lock = roundComplete(r) ? '' : ' locked';
                const lost = isLoser(r, i) ? ' lost' : '';
                const fix = locked.has(`${r}-${i}`) ? ' fixed' : '';
                el.className =
                    'node inner filled' + lock + lost + fix;
                paint(el, TEAMS[ti], false);
                setLockMark(el, !!fix);
            }
        }
    }

    // dim leaves that lost their match; mark fixed (locked round-1) winners
    for (let i = 0; i < 32; i++) {
        const el = nodeEls[`0-${i}`];
        el.classList.toggle('lost', isLoser(0, i));
        const pid = `1-${Math.floor(i / 2)}`;
        const isWinner = winnerChild[pid] === `0-${i}`;
        const wonLocked = locked.has(pid) && isWinner;
        el.classList.toggle('fixed', wonLocked);
        el.classList.toggle('won', isWinner && !wonLocked);
        setLockMark(el, wonLocked);
    }

    // champion
    const ci = winners['5-0'];
    const banner = document.getElementById('banner');
    const champFlag = champFlagEl();
    if (ci === undefined) {
        champ.classList.remove('crowned');
        champFlag.style.background = '';
        champFlag.innerHTML = '';
        banner.classList.remove('show');
    } else {
        champ.classList.add('crowned');
        paint(champFlag, TEAMS[ci], false);
        document.getElementById('champName').textContent =
            TEAMS[ci].n;
        banner.classList.add('show');
    }

    updateStatus();
}

// shows which round is being played and how many matches are done
function updateStatus() {
    const hint = document.getElementById('hint');
    hint.classList.remove('warn');
    if (winners['5-0'] !== undefined) {
        hint.textContent = '🏆 চ্যাম্পিয়ন নির্ধারিত!';
        return;
    }
    const names = [
        'Round of 32',
        'Round of 16',
        'Quarter-finals',
        'Semi-finals',
        'Final',
    ];
    for (let k = 1; k <= 5; k++) {
        if (!roundComplete(k)) {
            let done = 0;
            for (let i = 0; i < RINGS[k]; i++)
                if (winners[`${k}-${i}`] !== undefined) done++;
            hint.textContent = `${names[k - 1]} · ${done}/${RINGS[k]} ম্যাচ`;
            return;
        }
    }
}

document.getElementById('reset').addEventListener('click', () => {
    for (const k in winners) delete winners[k];
    for (const k in winnerChild) delete winnerChild[k];
    applyLocks(); // keep the hard-coded fixed results
    render();
});

/* ---------------- snapshot: copy / download as image ---------------- */
const EXPORT = 1000,
    EX_H = 1080,
    SCALE = 2;

function toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove('show'), 2200);
}

function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}

// load real flags with CORS so the canvas stays exportable; rejects if blocked
function preloadFlags() {
    return new Promise((resolve, reject) => {
        const map = {};
        let pending = TEAMS.length,
            failed = false;
        const done = () => {
            if (--pending === 0) failed ? reject() : resolve(map);
        };
        const t0 = setTimeout(() => {
            failed = true;
            reject();
        }, 6000);
        TEAMS.forEach((t) => {
            const im = new Image();
            im.crossOrigin = 'anonymous';
            im.onload = () => {
                map[t.k] = im;
                done();
            };
            im.onerror = () => {
                failed = true;
                done();
            };
            im.src = flag(t.c);
        });
        Promise.resolve().then(() => {
            if (pending === 0) clearTimeout(t0);
        });
    });
}

function drawBadge(ctx, cx, cy, r, t, dim, imgs, forceStroke) {
    ctx.save();
    if (dim) ctx.globalAlpha = 0.42;
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();
    const img = imgs && imgs[t.k];
    if (img && img.naturalWidth) {
        const s = Math.max(
            (2 * r) / img.naturalWidth,
            (2 * r) / img.naturalHeight
        );
        const dw = img.naturalWidth * s,
            dh = img.naturalHeight * s;
        ctx.drawImage(img, cx - dw / 2, cy - dh / 2, dw, dh);
    } else {
        const [a, b, c] = t.col,
            x = cx - r,
            y = cy - r,
            w = 2 * r;
        ctx.fillStyle = a;
        ctx.fillRect(x, y, w / 3 + 0.5, w);
        ctx.fillStyle = b;
        ctx.fillRect(x + w / 3, y, w / 3 + 0.5, w);
        ctx.fillStyle = c;
        ctx.fillRect(x + (2 * w) / 3, y, w / 3, w);
        const fs = Math.max(9, r * 0.58);
        ctx.font = `500 ${fs}px "Segoe UI",Arial,sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const tw = ctx.measureText(t.k).width + fs * 0.6;
        ctx.fillStyle = 'rgba(12,12,12,0.6)';
        roundRect(
            ctx,
            cx - tw / 2,
            cy - fs * 0.74,
            tw,
            fs * 1.48,
            fs * 0.3
        );
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.fillText(t.k, cx, cy + 0.5);
    }
    ctx.restore();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.lineWidth = 2;
    ctx.strokeStyle =
        forceStroke ||
        (dim ? 'rgba(255,255,255,0.12)' : 'rgba(244,183,64,0.55)');
    ctx.stroke();
    ctx.restore();
}

function drawTrophy(ctx, cx, cy, crowned) {
    ctx.save();
    const R = crowned ? 72 : 48;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
    g.addColorStop(
        0,
        crowned ? 'rgba(244,183,64,0.5)' : 'rgba(244,183,64,0.26)'
    );
    g.addColorStop(1, 'rgba(244,183,64,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fill();
    ctx.translate(cx, cy);
    const sc = crowned ? 1.05 : 0.95;
    ctx.scale(sc, sc);
    ctx.fillStyle = '#f4b740';
    ctx.beginPath();
    ctx.moveTo(-20, -30);
    ctx.lineTo(20, -30);
    ctx.lineTo(20, -18);
    ctx.quadraticCurveTo(20, 3, 0, 9);
    ctx.quadraticCurveTo(-20, 3, -20, -18);
    ctx.closePath();
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#f4b740';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-20, -26);
    ctx.bezierCurveTo(-37, -26, -37, -5, -20, -10);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(20, -26);
    ctx.bezierCurveTo(37, -26, 37, -5, 20, -10);
    ctx.stroke();
    ctx.fillStyle = '#f4b740';
    ctx.fillRect(-3, 9, 6, 11);
    ctx.fillRect(-13, 20, 26, 6);
    ctx.fillStyle = '#7a5fae';
    ctx.fillRect(-17, 26, 34, 6);
    ctx.restore();
}

function canvasRender(imgs) {
    const cv = document.createElement('canvas');
    cv.width = EXPORT * SCALE;
    cv.height = EX_H * SCALE;
    const ctx = cv.getContext('2d');
    ctx.scale(SCALE, SCALE);

    ctx.fillStyle = '#15130f';
    ctx.fillRect(0, 0, EXPORT, EX_H);
    const bg = ctx.createRadialGradient(500, 492, 0, 500, 492, 540);
    bg.addColorStop(0, '#2c2316');
    bg.addColorStop(0.55, 'rgba(28,23,15,0)');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, EXPORT, EX_H);

    // edges
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    for (const childId in edgeEls) {
        const parts = childId.split('-'),
            r = +parts[0],
            i = +parts[1];
        const pid = `${r + 1}-${Math.floor(i / 2)}`;
        const on = winnerChild[pid] === childId;
        const ch = posOf(r, i),
            pa = posOf(r + 1, Math.floor(i / 2)),
            mid = midPoint(r, i);
        ctx.beginPath();
        ctx.moveTo(ch.x, ch.y);
        ctx.lineTo(mid.x, mid.y);
        ctx.lineTo(pa.x, pa.y);
        ctx.strokeStyle = on ? '#f4b740' : 'rgba(229,210,170,0.10)';
        ctx.lineWidth = on ? 3.2 : 2;
        ctx.shadowBlur = on ? 5 : 0;
        ctx.shadowColor = 'rgba(244,183,64,0.6)';
        ctx.stroke();
    }
    ctx.shadowBlur = 0;

    // leaves
    for (let i = 0; i < 32; i++) {
        const p = posOf(0, i);
        drawBadge(ctx, p.x, p.y, 34, TEAMS[i], isLoser(0, i), imgs);
    }
    // inner nodes
    for (let r = 1; r < 5; r++)
        for (let i = 0; i < RINGS[r]; i++) {
            const p = posOf(r, i),
                ti = winners[`${r}-${i}`];
            if (ti === undefined) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, 13, 0, Math.PI * 2);
                ctx.fillStyle = '#39332a';
                ctx.fill();
                ctx.lineWidth = 1.5;
                ctx.strokeStyle = 'rgba(229,210,170,0.18)';
                ctx.stroke();
            } else {
                drawBadge(
                    ctx,
                    p.x,
                    p.y,
                    33,
                    TEAMS[ti],
                    isLoser(r, i),
                    imgs
                );
            }
        }

    // trophy + champion
    const ci = winners['5-0'];
    drawTrophy(ctx, 500, 500, ci !== undefined);
    if (ci !== undefined) {
        drawBadge(
            ctx,
            500,
            562,
            27,
            TEAMS[ci],
            false,
            imgs,
            '#f4b740'
        );
        ctx.textAlign = 'center';
        ctx.fillStyle = '#caa24e';
        ctx.font = '600 15px "Segoe UI",Arial,sans-serif';
        ctx.fillText('C H A M P I O N', 500, 1034);
        ctx.fillStyle = '#f4b740';
        ctx.font = '34px Georgia,"Times New Roman",serif';
        ctx.fillText(TEAMS[ci].n, 500, 1068);
    }

    return new Promise((res, rej) =>
        cv.toBlob(
            (b) => (b ? res(b) : rej(new Error('blob'))),
            'image/png'
        )
    );
}

async function exportBlob() {
    let imgs = null;
    try {
        imgs = await preloadFlags();
    } catch (_) {
        imgs = null;
    } // real flags if CORS allows
    try {
        return await canvasRender(imgs);
    } catch (_) {
        return await canvasRender(null);
    } // taint -> badge fallback
}

const copyBtn = document.getElementById('copyBtn');
const dlBtn = document.getElementById('dlBtn');

copyBtn.addEventListener('click', async () => {
    copyBtn.disabled = true;
    try {
        const blob = await exportBlob();
        if (!navigator.clipboard || !window.ClipboardItem)
            throw new Error('no clipboard');
        await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob }),
        ]);
        toast('✓ ছবি ক্লিপবোর্ডে কপি হয়েছে');
    } catch (_) {
        toast('কপি করা গেল না — ডাউনলোড করে দেখো');
    }
    copyBtn.disabled = false;
});

dlBtn.addEventListener('click', async () => {
    dlBtn.disabled = true;
    try {
        const blob = await exportBlob();
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'worldcup-bracket.png';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(a.href), 1500);
        toast('✓ ছবি ডাউনলোড হয়েছে');
    } catch (_) {
        toast('ডাউনলোড ব্যর্থ হয়েছে');
    }
    dlBtn.disabled = false;
});

applyLocks(); // load any hard-coded fixed results
render();
