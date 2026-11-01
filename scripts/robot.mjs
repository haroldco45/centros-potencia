// Robot de noticias — Centros PotencIA al Día (Vibras Positivas HM)
// Corre en GitHub Actions cada 30 minutos. Sin dependencias (Node 20+).
import { readFile, writeFile } from 'node:fs/promises';

const FILE = 'data/noticias.json';
const RELEVANT = /potencia/i;
const FEEDS = [
  'https://news.google.com/rss/search?q=%22Centros+PotencIA%22&hl=es-419&gl=CO&ceid=CO:es-419',
  'https://news.google.com/rss/search?q=%22Centros+Potencia%22+MinTIC+Findeter&hl=es-419&gl=CO&ceid=CO:es-419',
  'https://www.bing.com/news/search?q=%22Centros+PotencIA%22&format=rss&cc=CO',
  'https://www.bing.com/news/search?q=Centros+Potencia+MinTIC+Findeter&format=rss&cc=CO'
];
const UA = 'Mozilla/5.0 (compatible; VibrasPositivasHM-Robot/1.0; +https://centros-potencia.netlify.app)';

const norm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
const decode = s => String(s || '').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/<[^>]+>/g, '').trim();
const tag = (x, t) => { const m = x.match(new RegExp(`<${t}[^>]*>([\\s\\S]*?)</${t}>`, 'i')); return m ? decode(m[1]) : ''; };

async function get(url, ms = 12000) {
  const ctl = new AbortController(); const to = setTimeout(() => ctl.abort(), ms);
  try { const r = await fetch(url, { headers: { 'user-agent': UA, 'accept-language': 'es-CO,es;q=0.9' }, signal: ctl.signal, redirect: 'follow' });
        return r.ok ? { text: await r.text(), url: r.url } : null; }
  catch { return null; } finally { clearTimeout(to); }
}

function parse(xml) {
  return (xml.match(/<item[\s\S]*?<\/item>/gi) || []).map(it => {
    let title = tag(it, 'title'); let source = tag(it, 'source');
    const m = title.match(/^(.*) - ([^-]+)$/); if (m) { title = m[1].trim(); if (!source) source = m[2].trim(); }
    let link = tag(it, 'link');
    // Bing envuelve el enlace real en apiclick.aspx?url=...
    try { const u = new URL(link); const real = u.searchParams.get('url'); if (u.hostname.includes('bing.com') && real) link = real; } catch {}
    if (!source) { try { source = new URL(link).hostname.replace('www.', ''); } catch {} }
    const imgM = it.match(/<News:Image>([\s\S]*?)<\/News:Image>/i) || it.match(/<media:content[^>]*url="([^"]+)"/i);
    const pd = tag(it, 'pubDate');
    return { title, url: link, source, date: pd ? new Date(pd).toISOString() : '', image: imgM ? decode(imgM[1]) : '' };
  }).filter(n => n.title && n.url && RELEVANT.test(n.title));
}

async function ogImage(url) {
  if (/news\.google\.com/.test(url)) return '';
  const r = await get(url, 9000); if (!r) return '';
  const m = r.text.match(/<meta[^>]+property=["']og:image(?::secure_url)?["'][^>]+content=["']([^"']+)["']/i)
         || r.text.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)
         || r.text.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i);
  if (!m) return '';
  try { return new URL(decode(m[1]), r.url).href; } catch { return ''; }
}

const old = JSON.parse(await readFile(FILE, 'utf8').catch(() => '{"items":[]}'));
const map = new Map(old.items.map(n => [norm(n.title).slice(0, 70), n]));

let fresh = 0;
for (const f of FEEDS) {
  const r = await get(f); if (!r) { console.log('feed falló:', f); continue; }
  for (const n of parse(r.text)) {
    const k = norm(n.title).slice(0, 70);
    const ex = map.get(k);
    if (!ex) { map.set(k, n); fresh++; }
    else {
      if (ex.seed && n.date) { ex.date = n.date; delete ex.seed; }
      if (!ex.image && n.image) ex.image = n.image;
      if (/news\.google\.com/.test(ex.url) && !/news\.google\.com/.test(n.url)) ex.url = n.url;
    }
  }
}

// Fotos reales: busca og:image para las noticias que aún no tienen
const items = [...map.values()].sort((a, b) => Date.parse(b.date || 0) - Date.parse(a.date || 0)).slice(0, 80);
let imgs = 0;
for (const n of items.filter(n => !n.image).slice(0, 20)) { const im = await ogImage(n.url); if (im) { n.image = im; imgs++; } }

const now = new Date();
const out = { updated: now.toISOString(), items };
await writeFile(FILE, JSON.stringify(out, null, 1) + '\n');
console.log(`Listo: ${items.length} noticias · ${fresh} nuevas · ${imgs} fotos nuevas · ${now.toLocaleString('es-CO', { timeZone: 'America/Bogota' })} (hora Colombia)`);

// ---------- Videos reales de YouTube ----------
const VFILE = 'data/videos.json';
const VQUERIES = ['Centros PotencIA', 'Centros Potencia MinTIC', 'Centros PotencIA Findeter'];
const vold = JSON.parse(await readFile(VFILE, 'utf8').catch(() => '{"items":[]}'));
const vmap = new Map(vold.items.map(v => [v.id, v]));
for (const q of VQUERIES) {
  const r = await get('https://www.youtube.com/results?search_query=' + encodeURIComponent(q) + '&sp=CAI%253D&hl=es&gl=CO');
  if (!r) { console.log('youtube falló:', q); continue; }
  const m = r.text.match(/var ytInitialData = (\{[\s\S]*?\});<\/script>/);
  if (!m) continue;
  let data; try { data = JSON.parse(m[1]); } catch { continue; }
  const found = [];
  (function walk(o) {
    if (!o || typeof o !== 'object') return;
    if (o.videoRenderer && o.videoRenderer.videoId) found.push(o.videoRenderer);
    for (const k in o) walk(o[k]);
  })(data);
  for (const v of found) {
    const title = (v.title?.runs || []).map(x => x.text).join('');
    if (!RELEVANT.test(title)) continue;
    if (!vmap.has(v.videoId)) vmap.set(v.videoId, {
      id: v.videoId, title,
      channel: (v.ownerText?.runs || [])[0]?.text || '',
      when: v.publishedTimeText?.simpleText || '',
      found: now.toISOString()
    });
  }
}
const videos = [...vmap.values()].sort((a, b) => Date.parse(b.found) - Date.parse(a.found)).slice(0, 24);
await writeFile(VFILE, JSON.stringify({ updated: now.toISOString(), items: videos }, null, 1) + '\n');
console.log(`Videos: ${videos.length}`);
