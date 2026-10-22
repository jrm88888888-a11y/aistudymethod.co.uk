/* sci-notation.js — window.SciNotation.html(text)
   The IB science banks write maths as plain text: M_r, N_A, E_k, v_x0, e^(−λt), 10^−5.
   html() escapes the text, then turns those into real <sub>/<sup>. Ported from
   Study Pitstop tools/sci.js. Used only by quizzes that set "notation": "sci". */
(function () {
  'use strict';
  function esc(t) {
    return String(t == null ? '' : t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  var SUB_TOKEN = /^(?:[A-Za-z]+[0-9]*|[0-9]+[A-Z]*|[α-ωΑ-Ω⊥∥∞])/;
  var SUP_TOKEN = /^(?:[0-9]+(?:\.[0-9]+)?|[A-Za-z]+|[α-ωΑ-Ωπ∞½ℓ])/;
  var CLOSE = { '{': '}', '(': ')' };
  function group(s, i) {
    var open = s[i], close = CLOSE[open], depth = 0;
    for (var j = i; j < s.length; j++) {
      if (s[j] === open) depth++;
      else if (s[j] === close && --depth === 0) return j;
    }
    return -1;
  }
  function conv(s) {
    var out = '';
    for (var i = 0; i < s.length; i++) {
      var ch = s[i];
      var isSub = ch === '_' && i > 0 && !/[\s_]/.test(s[i - 1]);
      if (!isSub && ch !== '^') { out += ch; continue; }
      var tag = isSub ? 'sub' : 'sup', j = i + 1, sign = '';
      if (!isSub && /[−+-]/.test(s[j] || '')) sign = s[j++];
      if (s[j] === '{' || s[j] === '(') {
        var end = group(s, j);
        if (end > 0) {
          var inner = conv(s.slice(j + 1, end));
          out += '<' + tag + '>' + sign + (s[j] === '(' && sign ? '(' + inner + ')' : inner) + '</' + tag + '>';
          i = end; continue;
        }
      }
      var m = s.slice(j).match(isSub ? SUB_TOKEN : SUP_TOKEN);
      if (m) { out += '<' + tag + '>' + sign + m[0] + '</' + tag + '>'; i = j + m[0].length - 1; continue; }
      out += ch;
    }
    return out;
  }
  window.SciNotation = { html: function (t) { return conv(esc(t)); }, esc: esc };
})();
