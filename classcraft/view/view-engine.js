/* ============================================================
   AI Study Method — Shared utilities for View-stage engines
   ============================================================ */

window.VW = (function(){

  function qs() {
    const o = {};
    const s = window.location.search.slice(1);
    s.split('&').forEach(p => {
      if (!p) return;
      const [k,v] = p.split('=');
      o[decodeURIComponent(k)] = decodeURIComponent((v||'').replace(/\+/g,' '));
    });
    return o;
  }

  async function loadCurriculum() {
    const params = qs();
    const subject = params.subject || 'biology';
    const level   = params.level   || 'gcse';
    const url = `curricula/${subject}-${level}.json`;
    try {
      const r = await fetch(url, { cache: 'no-cache' });
      if (!r.ok) throw new Error('Curriculum not found: ' + r.status);
      const c = await r.json();
      c._params = { subject, level };
      return c;
    } catch (e) {
      throw e;
    }
  }

  function setMeta(curriculum, engineName, engineBlurb) {
    document.getElementById('vw-crumb').textContent = `${curriculum.subjectDisplay} · ${curriculum.levelDisplay}`;
    document.getElementById('vw-title').textContent = `${curriculum.subjectDisplay} — ${engineName}`;
    document.getElementById('vw-sub').textContent = engineBlurb;
    document.title = `${curriculum.subjectDisplay} ${curriculum.levelDisplay} — ${engineName} — AI Study Method`;
  }

  function toast(text, kind) {
    const t = document.getElementById('vw-toast');
    if (!t) return;
    t.textContent = text;
    t.className = 'vw-toast show ' + (kind || '');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('show'), 2000);
  }

  function showEnd(emoji, title, stats) {
    const end = document.getElementById('vw-end');
    if (!end) return;
    document.getElementById('vw-end-emoji').textContent = emoji;
    document.getElementById('vw-end-title').textContent = title;
    const sd = document.getElementById('vw-end-stats');
    sd.innerHTML = '';
    (stats || []).forEach(s => {
      const el = document.createElement('div');
      el.className = 'vw-end-stat';
      el.innerHTML = `<div class="vw-end-stat-num">${s.value}</div><div class="vw-end-stat-label">${s.label}</div>`;
      sd.appendChild(el);
    });
    end.classList.add('visible');
  }

  function hideEnd() {
    const end = document.getElementById('vw-end');
    if (end) end.classList.remove('visible');
  }

  function shuffle(a) {
    const r = a.slice();
    for (let i = r.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [r[i], r[j]] = [r[j], r[i]];
    }
    return r;
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function renderState(kind, msg) {
    const stage = document.querySelector('.vw-stage');
    if (!stage) return;
    if (kind === 'loading') {
      stage.innerHTML = `<div class="vw-state"><div class="spinner"></div><div class="msg">${esc(msg||'Loading curriculum…')}</div></div>`;
    } else if (kind === 'error') {
      stage.innerHTML = `<div class="vw-state"><div style="font-size:34px">🤔</div><div class="msg err">${esc(msg||'Could not load curriculum.')}</div><a class="vw-btn" href="../../subjects.html">← Back to subjects</a></div>`;
    }
  }

  return { qs, loadCurriculum, setMeta, toast, showEnd, hideEnd, shuffle, esc, renderState };
})();
