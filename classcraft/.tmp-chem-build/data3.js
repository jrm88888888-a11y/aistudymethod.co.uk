/* Topics 11-15 */
module.exports = [

/* ================= TOPIC 11 ================= */
{
  slug: 'equilibrium-ii',
  specTopic: 'Topic 11: Equilibrium II',
  title: 'Equilibrium II',
  emoji: '🧮',
  desc: 'Interactive Edexcel A-level Chemistry (9CH0) mini-lesson on Topic 11 Equilibrium II: calculating Kc from equilibrium concentrations, working out units, mole fractions and partial pressures, deducing and calculating Kp, and the effect of temperature, pressure and catalysts on the value of K.',
  intro: 'Equilibrium II is where you <b>calculate</b>. You work out <b>K<sub>c</sub></b> from equilibrium concentrations and <b>K<sub>p</sub></b> from <b>partial pressures</b>, derive the <b>units</b> from first principles, and prove that only <b>temperature</b> changes the value of K.',
  pillars: [['calculating', 'Kc'], ['mole', 'fractions'], ['partial', 'pressures'], ['Kp and', 'units']],
  pillarCaption: 'the position of equilibrium can move without K changing at all',
  screens: [
    { t: 'teach', tag: 'Calculating Kc', h: 'K<sub>c</sub> from equilibrium concentrations', html: `      <p>Put the <b>equilibrium</b> concentrations (mol dm<sup>−3</sup>) into the expression. Take care to divide moles by the <b>volume of the container</b> first.</p>
      <div class="eqn">H<sub>2</sub>(g) + I<sub>2</sub>(g) ⇌ 2HI(g)&nbsp;&nbsp;K<sub>c</sub> = [HI]<sup>2</sup> ÷ ([H<sub>2</sub>][I<sub>2</sub>])</div>
      <p><b>Units:</b> do not learn them — <b>derive</b> them. Substitute mol dm<sup>−3</sup> for every square bracket and cancel:</p>
      <div class="work">
        <div class="wt">Deriving the units</div>
        <p>For H<sub>2</sub> + I<sub>2</sub> ⇌ 2HI: (mol dm<sup>−3</sup>)<sup>2</sup> ÷ [(mol dm<sup>−3</sup>)(mol dm<sup>−3</sup>)] — everything cancels, so K<sub>c</sub> has <b>no units</b>.</p>
        <p>For N<sub>2</sub> + 3H<sub>2</sub> ⇌ 2NH<sub>3</sub>: (mol dm<sup>−3</sup>)<sup>2</sup> ÷ (mol dm<sup>−3</sup>)<sup>4</sup> = (mol dm<sup>−3</sup>)<sup>−2</sup> = <b>mol<sup>−2</sup> dm<sup>6</sup></b>.</p>
      </div>` },

    { t: 'num', h: 'Calculate K<sub>c</sub>', q: 'For H<sub>2</sub>(g) + I<sub>2</sub>(g) ⇌ 2HI(g) the equilibrium concentrations are [H<sub>2</sub>] = 0.20, [I<sub>2</sub>] = 0.20 and [HI] = 1.60 mol dm<sup>−3</sup>. Calculate K<sub>c</sub>.', ans: '64', tol: '0.5', unit: '(no units)', hint: 'Kc = 1.60² ÷ (0.20 × 0.20) = 2.56 ÷ 0.04.' },

    { t: 'mcq', h: 'Deriving the units', q: 'What are the units of K<sub>c</sub> for N<sub>2</sub>(g) + 3H<sub>2</sub>(g) ⇌ 2NH<sub>3</sub>(g)?', why: 'Kc = [NH3]^2 / ([N2][H2]^3). Substituting units gives (mol dm-3)^2 over (mol dm-3)^4, which is (mol dm-3)^-2, i.e. mol-2 dm6.', opts: [['mol<sup>−2</sup> dm<sup>6</sup>', 1], ['mol dm<sup>−3</sup>', 0], ['mol<sup>2</sup> dm<sup>−6</sup>', 0], ['No units', 0]] },

    { t: 'teach', tag: 'Partial pressure', h: 'Mole fractions and partial pressures', html: `      <p>In a gas mixture, each gas contributes a share of the total pressure.</p>
      <div class="eqn">mole fraction x = moles of that gas ÷ TOTAL moles of gas<small>the mole fractions of all the gases must add up to 1</small></div>
      <div class="eqn">partial pressure p = mole fraction × total pressure<small>and the partial pressures add up to the total pressure</small></div>
      <p class="note"><b>Edexcel convention:</b> partial pressures for K<sub>p</sub> are quoted in <b>atm</b>. (Note that this sits alongside the standard pressure of 100 kPa used for enthalpy — do not mix them up.)</p>` },

    { t: 'num', h: 'A partial pressure', q: 'An equilibrium mixture contains <b>2.0 mol</b> N<sub>2</sub>, <b>6.0 mol</b> H<sub>2</sub> and <b>2.0 mol</b> NH<sub>3</sub>. The total pressure is <b>200 atm</b>. Calculate the partial pressure of NH<sub>3</sub>.', ans: '40', tol: '1', unit: 'atm', hint: 'Total = 10.0 mol, so x(NH₃) = 2.0 ÷ 10.0 = 0.20. Then p = 0.20 × 200.' },

    { t: 'teach', tag: 'Kp', h: 'The K<sub>p</sub> expression', html: `      <p>K<sub>p</sub> is written exactly like K<sub>c</sub>, but with <b>partial pressures</b> instead of concentrations. Only <b>gases</b> appear — solids and pure liquids are left out.</p>
      <div class="eqn">2SO<sub>2</sub>(g) + O<sub>2</sub>(g) ⇌ 2SO<sub>3</sub>(g)<br>K<sub>p</sub> = p(SO<sub>3</sub>)<sup>2</sup> ÷ [p(SO<sub>2</sub>)<sup>2</sup> × p(O<sub>2</sub>)]<small>units: atm² ÷ (atm² × atm) = atm⁻¹</small></div>
      <p class="note"><b>Method for a K<sub>p</sub> question:</b> (1) equilibrium <b>moles</b> of each gas · (2) <b>total</b> moles · (3) <b>mole fraction</b> of each · (4) <b>partial pressure</b> of each · (5) substitute · (6) derive the units.</p>` },

    { t: 'num', h: 'Calculate K<sub>p</sub>', q: 'For 2SO<sub>2</sub>(g) + O<sub>2</sub>(g) ⇌ 2SO<sub>3</sub>(g) at equilibrium: p(SO<sub>2</sub>) = 0.20 atm, p(O<sub>2</sub>) = 0.10 atm, p(SO<sub>3</sub>) = 0.40 atm. Calculate K<sub>p</sub>.', ans: '40', tol: '0.5', unit: 'atm⁻¹', hint: 'Kp = 0.40² ÷ (0.20² × 0.10) = 0.16 ÷ 0.0040.' },

    { t: 'num', h: 'K<sub>p</sub> from a degree of dissociation', q: '1.00 mol of N<sub>2</sub>O<sub>4</sub> is heated in a closed vessel and <b>50%</b> of it dissociates: N<sub>2</sub>O<sub>4</sub>(g) ⇌ 2NO<sub>2</sub>(g). The total pressure at equilibrium is <b>1.00 atm</b>. Calculate K<sub>p</sub> to 2 decimal places.', ans: '1.33', tol: '0.04', unit: 'atm', hint: 'At equilibrium: 0.50 mol N₂O₄ and 1.00 mol NO₂, total 1.50 mol. So p(NO₂) = (1.00/1.50) × 1.00 = 0.667 atm and p(N₂O₄) = 0.333 atm. Kp = 0.667² ÷ 0.333.' },

    { t: 'mcq', h: 'Does a catalyst change K?', q: 'A catalyst is added to a gaseous equilibrium at constant temperature. What happens to K<sub>p</sub>?', why: 'A catalyst speeds up the forward and backward reactions equally, so equilibrium is reached sooner but the position - and therefore the value of Kp - is completely unchanged.', opts: [['K<sub>p</sub> is unchanged; equilibrium is simply reached faster', 1], ['K<sub>p</sub> increases, because the forward reaction is faster', 0], ['K<sub>p</sub> decreases', 0], ['K<sub>p</sub> increases only if the forward reaction is exothermic', 0]] },

    { t: 'mcq', h: 'Does pressure change K<sub>p</sub>?', q: 'The total pressure on the equilibrium N<sub>2</sub>O<sub>4</sub>(g) ⇌ 2NO<sub>2</sub>(g) is increased at constant temperature. What happens?', why: 'The position shifts to the side with fewer gas moles (left, towards N2O4), but Kp is a constant at a given temperature: the partial pressures re-adjust so that the same value of Kp is restored. Only a change in TEMPERATURE changes the value of K.', opts: [['The position shifts left, but the value of K<sub>p</sub> stays exactly the same', 1], ['The position shifts left and K<sub>p</sub> decreases', 0], ['The position shifts right and K<sub>p</sub> increases', 0], ['Neither the position nor K<sub>p</sub> changes', 0]] },

    { t: 'teach', tag: 'Temperature', h: 'Temperature is the only thing that changes K', html: `      <ul>
        <li><b>Exothermic forward reaction</b> (ΔH negative): raising T shifts the position <b>backwards</b>, so <b>K decreases</b>.</li>
        <li><b>Endothermic forward reaction</b> (ΔH positive): raising T shifts the position <b>forwards</b>, so <b>K increases</b>.</li>
      </ul>
      <p class="note"><b>The clean way to think about it:</b> a change in concentration or pressure disturbs the ratio, and the system shifts until the <b>same</b> value of K is restored. A change in <b>temperature</b> changes <b>K itself</b>, and the position then moves to match the new constant.</p>` },

    { t: 'mcq', h: 'Defining a mole fraction', q: 'What is the mole fraction of a gas in a mixture?', why: 'The mole fraction is the number of moles of that gas divided by the total number of moles of gas present. Multiplying it by the total pressure gives the partial pressure of that gas.', opts: [['Its moles ÷ the total moles of gas present', 1], ['Its moles ÷ the moles of the other gases', 0], ['Its partial pressure ÷ its moles', 0], ['Its mass ÷ the total mass of the mixture', 0]] },

    { t: 'sort' },

    { t: 'match' }
  ],
  sort: {
    h: 'What units does K<sub>p</sub> have?', prompt: 'Tap the equilibrium, then tap the units of its Kp. Substitute atm into the expression and cancel.',
    bins: [{ key: 'none', label: '🟦 No units' }, { key: 'atm', label: '🟩 atm' }, { key: 'inv', label: '🟪 atm⁻¹' }],
    chips: [['H₂ + I₂ ⇌ 2HI', 'none'], ['CO + H₂O ⇌ CO₂ + H₂', 'none'], ['PCl₅ ⇌ PCl₃ + Cl₂', 'atm'], ['N₂O₄ ⇌ 2NO₂', 'atm'], ['2SO₂ + O₂ ⇌ 2SO₃', 'inv'], ['2NO₂ ⇌ N₂O₄', 'inv']],
    doneMsg: 'All sorted — the units come from (moles of gas on the right) minus (moles of gas on the left).'
  },
  match: {
    h: 'Equilibrium quantities', prompt: 'Match each quantity to its definition.', leftHead: 'Quantity', rightHead: 'Definition',
    pairs: [
      ['Mole fraction', 'Moles of that gas ÷ total moles of gas'],
      ['Partial pressure', 'Mole fraction × total pressure'],
      ['Kp', 'The equilibrium constant written using partial pressures'],
      ['Effect of a catalyst on K', 'None at all — only the time taken changes']
    ],
    doneMsg: 'All matched — only temperature changes the value of K.'
  },
  recap: [
    ['K<sub>c</sub>', 'use EQUILIBRIUM concentrations; derive the units by substituting mol dm<sup>−3</sup> and cancelling'],
    ['Mole fraction', 'moles of that gas ÷ total moles; they sum to 1'],
    ['Partial pressure', 'mole fraction × total pressure (Edexcel uses atm for K<sub>p</sub>)'],
    ['K<sub>p</sub>', 'same form as K<sub>c</sub> but with partial pressures; gases only'],
    ['Only T changes K', 'exothermic forward → K falls as T rises; catalysts and pressure never change K']
  ]
},

/* ================= TOPIC 12 ================= */
{
  slug: 'acid-base-equilibria',
  specTopic: 'Topic 12: Acid-base Equilibria',
  title: 'Acid-base Equilibria',
  emoji: '🧫',
  desc: 'Interactive Edexcel A-level Chemistry (9CH0) mini-lesson on Topic 12: Bronsted-Lowry acids and bases, conjugate pairs, pH of strong acids and bases, Ka and weak acids, Kw, buffers, titration curves and indicator choice.',
  intro: 'Acid–base equilibria is the most <b>calculation-heavy</b> topic on Paper 1. You need <b>pH of a strong acid</b>, <b>K<sub>a</sub> for a weak acid</b>, <b>K<sub>w</sub> for a strong base</b>, <b>buffers</b>, and the four <b>titration curves</b> with the right indicator.',
  pillars: [['pH and', 'strong acids'], ['Ka and', 'weak acids'], ['Kw and', 'bases'], ['buffers &amp;', 'curves']],
  pillarCaption: 'four calculations — decide which one before you touch the calculator',
  screens: [
    { t: 'teach', tag: 'Brønsted–Lowry', h: 'Acids, bases and conjugate pairs', html: `      <p>A <b>Brønsted–Lowry acid</b> is a <b>proton donor</b>; a <b>base</b> is a <b>proton acceptor</b>.</p>
      <div class="eqn">CH<sub>3</sub>COOH + H<sub>2</sub>O ⇌ CH<sub>3</sub>COO<sup>−</sup> + H<sub>3</sub>O<sup>+</sup><small>acid 1 · base 2 · conjugate base 1 · conjugate acid 2</small></div>
      <p>A <b>conjugate pair</b> differs by exactly <b>one H<sup>+</sup></b>. When the acid gives its proton away, what is left is its <b>conjugate base</b>.</p>
      <p class="note"><b>Strong vs weak is about dissociation, not concentration.</b> A strong acid is <b>fully</b> dissociated (HCl, HNO<sub>3</sub>, H<sub>2</sub>SO<sub>4</sub>); a weak acid is only <b>partially</b> dissociated (an equilibrium — CH<sub>3</sub>COOH, HCN, HF). You can have a concentrated weak acid and a dilute strong acid.</p>` },

    { t: 'mcq', h: 'Find the conjugate base', q: 'In HNO<sub>2</sub> + H<sub>2</sub>O ⇌ NO<sub>2</sub><sup>−</sup> + H<sub>3</sub>O<sup>+</sup>, which species is the <b>conjugate base of HNO<sub>2</sub></b>?', why: 'HNO2 donates a proton and what is left is NO2-, so NO2- is its conjugate base. Water is the base here, and H3O+ is the conjugate acid of water.', opts: [['NO<sub>2</sub><sup>−</sup>', 1], ['H<sub>3</sub>O<sup>+</sup>', 0], ['H<sub>2</sub>O', 0], ['HNO<sub>2</sub>', 0]] },

    { t: 'teach', tag: 'pH', h: 'pH and strong acids', html: `      <div class="eqn">pH = −log<sub>10</sub>[H<sup>+</sup>]&nbsp;&nbsp;and&nbsp;&nbsp;[H<sup>+</sup>] = 10<sup>−pH</sup></div>
      <p>A <b>strong monobasic acid</b> is fully dissociated, so <b>[H<sup>+</sup>] = [acid]</b> — that is all there is to it.</p>
      <p class="note"><b>Dilution:</b> diluting a strong acid by a factor of <b>10</b> raises the pH by exactly <b>1</b>. Note also that H<sub>2</sub>SO<sub>4</sub> is <b>dibasic</b> — the first dissociation is complete, so for a rough calculation [H<sup>+</sup>] ≈ 2 × [H<sub>2</sub>SO<sub>4</sub>].</p>` },

    { t: 'num', h: 'pH of a strong acid', q: 'Calculate the pH of <b>0.0100 mol dm<sup>−3</sup></b> hydrochloric acid. Give your answer to 2 decimal places.', ans: '2.00', tol: '0.03', unit: '', hint: 'HCl is strong, so [H⁺] = 0.0100. pH = −log(0.0100).' },

    { t: 'teach', tag: 'Weak acids', h: 'K<sub>a</sub> and weak acids', html: `      <div class="eqn">HA ⇌ H<sup>+</sup> + A<sup>−</sup>&nbsp;&nbsp;K<sub>a</sub> = [H<sup>+</sup>][A<sup>−</sup>] ÷ [HA]<small>units: mol dm⁻³ · pKa = −log₁₀Ka, so a SMALL pKa means a STRONG(er) acid</small></div>
      <p>Two <b>assumptions</b> make the calculation possible:</p>
      <ul>
        <li><b>[H<sup>+</sup>] = [A<sup>−</sup>]</b> — the H<sup>+</sup> from the water is negligible.</li>
        <li><b>[HA]<sub>equilibrium</sub> ≈ [HA]<sub>initial</sub></b> — so little dissociates that we can ignore the loss.</li>
      </ul>
      <div class="eqn">K<sub>a</sub> ≈ [H<sup>+</sup>]<sup>2</sup> ÷ [HA]&nbsp;&nbsp;so&nbsp;&nbsp;[H<sup>+</sup>] = √(K<sub>a</sub> × [HA])</div>` },

    { t: 'num', h: 'pH of a weak acid', q: 'Calculate the pH of <b>0.100 mol dm<sup>−3</sup></b> ethanoic acid. K<sub>a</sub> = <b>1.74 × 10<sup>−5</sup></b> mol dm<sup>−3</sup>. Give your answer to 2 decimal places.', ans: '2.88', tol: '0.05', unit: '', hint: '[H⁺] = √(1.74 × 10⁻⁵ × 0.100) = √(1.74 × 10⁻⁶) = 1.32 × 10⁻³. Then pH = −log(1.32 × 10⁻³).' },

    { t: 'mcq', h: 'The assumptions', q: 'Which pair of assumptions is made in the standard weak-acid pH calculation?', why: 'We assume all the H+ comes from the acid (so [H+] = [A-]) and that so little of the acid dissociates that the equilibrium concentration of HA is essentially the concentration we started with. Both break down for very dilute or moderately strong weak acids.', opts: [['[H<sup>+</sup>] = [A<sup>−</sup>], and [HA] at equilibrium equals the initial concentration', 1], ['[H<sup>+</sup>] = [HA], and the acid is fully dissociated', 0], ['[H<sup>+</sup>][OH<sup>−</sup>] = K<sub>a</sub>, and water does not dissociate at all', 0], ['The acid is fully dissociated, and [A<sup>−</sup>] = 0', 0]] },

    { t: 'teach', tag: 'Kw', h: 'K<sub>w</sub> and strong bases', html: `      <div class="eqn">K<sub>w</sub> = [H<sup>+</sup>][OH<sup>−</sup>] = 1.00 × 10<sup>−14</sup> mol<sup>2</sup> dm<sup>−6</sup> at 298 K</div>
      <p>For a <b>strong base</b>, [OH<sup>−</sup>] = [base] (× 2 for Ba(OH)<sub>2</sub>). Find [H<sup>+</sup>] from K<sub>w</sub>, then take the pH.</p>
      <p class="note"><b>The temperature trap.</b> The ionisation of water is <b>endothermic</b>, so raising the temperature <b>increases K<sub>w</sub></b>. At 50 °C, pure water has a pH <b>below 7</b> — but it is still <b>neutral</b>, because [H<sup>+</sup>] still equals [OH<sup>−</sup>]. Neutral means [H<sup>+</sup>] = [OH<sup>−</sup>], not pH = 7.</p>` },

    { t: 'num', h: 'pH of a strong base', q: 'Calculate the pH of <b>0.0500 mol dm<sup>−3</sup></b> NaOH at 298 K. (K<sub>w</sub> = 1.00 × 10<sup>−14</sup>.) Give your answer to 2 decimal places.', ans: '12.70', tol: '0.05', unit: '', hint: '[OH⁻] = 0.0500, so [H⁺] = 1.00 × 10⁻¹⁴ ÷ 0.0500 = 2.0 × 10⁻¹³. Then pH = −log(2.0 × 10⁻¹³).' },

    { t: 'teach', tag: 'Buffers', h: 'Buffer solutions', html: `      <p>A <b>buffer</b> resists a change in pH when a small amount of acid or alkali is added. An <b>acidic</b> buffer is a <b>weak acid + its salt</b> (e.g. CH<sub>3</sub>COOH + CH<sub>3</sub>COONa), which gives a large reservoir of <b>both</b> HA and A<sup>−</sup>.</p>
      <ul>
        <li><b>Add acid:</b> the added H<sup>+</sup> is removed by the reservoir of A<sup>−</sup>: H<sup>+</sup> + A<sup>−</sup> → HA.</li>
        <li><b>Add alkali:</b> the added OH<sup>−</sup> is removed by the reservoir of HA: HA + OH<sup>−</sup> → A<sup>−</sup> + H<sub>2</sub>O.</li>
      </ul>
      <div class="eqn">[H<sup>+</sup>] = K<sub>a</sub> × [HA] ÷ [A<sup>−</sup>]<small>At HALF-neutralisation [HA] = [A⁻], so [H⁺] = Ka and pH = pKa — the standard way to find Ka from a titration curve.</small></div>
      <p class="note"><b>Blood</b> is buffered by the <b>carbonic acid / hydrogencarbonate</b> system: H<sub>2</sub>CO<sub>3</sub> ⇌ H<sup>+</sup> + HCO<sub>3</sub><sup>−</sup>, holding blood pH at about 7.4.</p>` },

    { t: 'num', h: 'pH of a buffer', q: 'A buffer contains <b>0.200 mol dm<sup>−3</sup></b> ethanoic acid and <b>0.100 mol dm<sup>−3</sup></b> sodium ethanoate. K<sub>a</sub> = <b>1.74 × 10<sup>−5</sup></b>. Calculate the pH to 2 decimal places.', ans: '4.46', tol: '0.05', unit: '', hint: '[H⁺] = Ka × [HA]/[A⁻] = 1.74 × 10⁻⁵ × (0.200 ÷ 0.100) = 3.48 × 10⁻⁵. Then pH = −log(3.48 × 10⁻⁵).' },

    { t: 'mcq', h: 'How a buffer copes with acid', q: 'A little hydrochloric acid is added to an ethanoic acid / sodium ethanoate buffer. Which equation shows how the pH is held nearly constant?', why: 'The large reservoir of ethanoate ions removes the added H+ by shifting the equilibrium: H+ + CH3COO- gives CH3COOH. Because the ratio [HA]/[A-] barely changes, [H+] and therefore the pH barely change.', opts: [['H<sup>+</sup> + CH<sub>3</sub>COO<sup>−</sup> → CH<sub>3</sub>COOH', 1], ['H<sup>+</sup> + OH<sup>−</sup> → H<sub>2</sub>O', 0], ['CH<sub>3</sub>COOH + OH<sup>−</sup> → CH<sub>3</sub>COO<sup>−</sup> + H<sub>2</sub>O', 0], ['CH<sub>3</sub>COOH → CH<sub>3</sub>COO<sup>−</sup> + H<sup>+</sup>', 0]] },

    { t: 'teach', tag: 'Titration curves', h: 'Titration curves and indicators', html: `      <p>An indicator changes colour over a range of about <b>2 pH units</b> centred on its own <b>pK<sub>In</sub></b>. It only works if its whole range falls <b>within the vertical section</b> of the curve.</p>
      <ul>
        <li><b>Strong acid + strong base</b> — long vertical section (about pH 3–11), equivalence at <b>pH 7</b>. Either phenolphthalein <b>or</b> methyl orange works.</li>
        <li><b>Weak acid + strong base</b> — equivalence <b>above</b> pH 7 (salt of a weak acid is basic). Vertical section high up → use <b>phenolphthalein</b>.</li>
        <li><b>Strong acid + weak base</b> — equivalence <b>below</b> pH 7. Vertical section low down → use <b>methyl orange</b>.</li>
        <li><b>Weak acid + weak base</b> — <b>no</b> vertical section at all, so <b>no indicator is suitable</b>.</li>
      </ul>
      <p class="note"><b>End point vs equivalence point.</b> The <b>equivalence point</b> is where the moles are in the exact stoichiometric ratio. The <b>end point</b> is where the indicator changes colour. A good indicator makes them coincide.</p>` },

    { t: 'mcq', h: 'Choosing an indicator', q: 'Ethanoic acid is titrated with sodium hydroxide. Which indicator should be used?', why: 'This is weak acid with strong base, so the equivalence point lies above pH 7 (around pH 9) and the vertical section runs roughly from pH 7 to 11. Phenolphthalein changes over about 8.3 to 10.0, which lies inside that range. Methyl orange changes around pH 3.7 and would change far too early.', opts: [['Phenolphthalein, because the equivalence point lies above pH 7', 1], ['Methyl orange, because the equivalence point lies below pH 7', 0], ['Either, because the vertical section is very long', 0], ['Neither, because both reagents are weak', 0]] },

    { t: 'sort' },

    { t: 'match' }
  ],
  sort: {
    h: 'Strong, weak, or base?', prompt: 'Tap the substance, then tap the group it belongs to. Remember: strong means FULLY dissociated.',
    bins: [{ key: 'sa', label: '🟦 Strong acid' }, { key: 'wa', label: '🟩 Weak acid' }, { key: 'sb', label: '🟪 Strong base' }],
    chips: [['HCl', 'sa'], ['HNO₃', 'sa'], ['CH₃COOH', 'wa'], ['HCN', 'wa'], ['HF', 'wa'], ['NaOH', 'sb'], ['KOH', 'sb'], ['Ba(OH)₂', 'sb']],
    doneMsg: 'All sorted — HF is weak despite fluorine being so electronegative: the H–F bond is very strong.'
  },
  match: {
    h: 'Which curve is which?', prompt: 'Match each titration to the shape of its curve and the right indicator.', leftHead: 'Titration', rightHead: 'Curve and indicator',
    pairs: [
      ['Strong acid + strong base', 'Equivalence at pH 7; either indicator works'],
      ['Weak acid + strong base', 'Equivalence above pH 7; use phenolphthalein'],
      ['Strong acid + weak base', 'Equivalence below pH 7; use methyl orange'],
      ['Weak acid + weak base', 'No vertical section; no indicator is suitable']
    ],
    doneMsg: 'All matched — the indicator range must lie inside the vertical section of the curve.'
  },
  recap: [
    ['Brønsted–Lowry', 'acid = proton donor; conjugate pairs differ by one H<sup>+</sup>'],
    ['Strong acid', '[H<sup>+</sup>] = [acid]; pH = −log[H<sup>+</sup>]'],
    ['Weak acid', 'K<sub>a</sub> = [H<sup>+</sup>]<sup>2</sup> ÷ [HA]; pH = pK<sub>a</sub> at half-neutralisation'],
    ['Strong base', '[H<sup>+</sup>] = K<sub>w</sub> ÷ [OH<sup>−</sup>], K<sub>w</sub> = 1.00 × 10<sup>−14</sup> at 298 K'],
    ['Buffer', 'weak acid + its salt; [H<sup>+</sup>] = K<sub>a</sub> × [HA] ÷ [A<sup>−</sup>]'],
    ['Indicators', 'phenolphthalein for weak acid/strong base; methyl orange for strong acid/weak base']
  ]
},

/* ================= TOPIC 13 ================= */
{
  slug: 'energetics-ii',
  specTopic: 'Topic 13: Energetics II',
  title: 'Energetics II',
  emoji: '🧊',
  desc: 'Interactive Edexcel A-level Chemistry (9CH0) mini-lesson on Topic 13 Energetics II: lattice energy and Born-Haber cycles, theoretical versus experimental lattice energies and covalent character, enthalpies of solution and hydration, entropy, total entropy change and Gibbs free energy.',
  intro: 'Energetics II answers the question Energetics I could not: <b>why do endothermic reactions happen at all?</b> You build <b>Born–Haber cycles</b>, compare theoretical and experimental <b>lattice energies</b>, and then bring in <b>entropy</b> and <b>ΔG</b>.',
  pillars: [['Born–Haber'], ['covalent', 'character'], ['entropy'], ['ΔG = ΔH', '− TΔS']],
  pillarCaption: 'feasibility is decided by the TOTAL entropy change, not by ΔH',
  screens: [
    { t: 'teach', tag: 'Lattice energy', h: 'The definitions you need', html: `      <ul>
        <li><b>Lattice energy</b> — the enthalpy change when <b>one mole</b> of an ionic solid is formed from its <b>gaseous ions</b>. It is always <b>exothermic</b> (Edexcel uses the formation convention).</li>
        <li><b>Enthalpy of atomisation</b> — the enthalpy change when <b>one mole of gaseous atoms</b> is formed from the element in its standard state. Always endothermic.</li>
        <li><b>First electron affinity</b> — when one mole of gaseous atoms each gain an electron to give one mole of gaseous 1− ions. Usually <b>exothermic</b>; the <b>second</b> electron affinity is <b>endothermic</b> (you are forcing an electron onto an already negative ion).</li>
        <li><b>Enthalpy of hydration</b> — when one mole of <b>gaseous</b> ions is dissolved in water. Exothermic.</li>
      </ul>
      <div class="eqn">Na<sup>+</sup>(g) + Cl<sup>−</sup>(g) → NaCl(s)&nbsp;&nbsp;ΔLE = −787 kJ mol<sup>−1</sup></div>` },

    { t: 'teach', tag: 'Born–Haber', h: 'The Born–Haber cycle', html: `      <p>The lattice energy cannot be measured directly, so you get it from a <b>Hess cycle</b> that goes from the elements to the ionic solid by two routes.</p>
      <div class="work">
        <div class="wt">NaCl, all values in kJ mol⁻¹</div>
        <p>Δ<sub>f</sub>H(NaCl) = <b>−411</b> · Δ<sub>at</sub>H(Na) = <b>+107</b> · IE<sub>1</sub>(Na) = <b>+496</b> · Δ<sub>at</sub>H(Cl) = <b>+122</b> · EA<sub>1</sub>(Cl) = <b>−349</b></p>
        <p>Route 1 (direct): Δ<sub>f</sub>H = −411.</p>
        <p>Route 2 (the long way): atomise both elements, ionise the sodium, add the electron to the chlorine, then form the lattice.</p>
        <p><b>ΔLE = Δ<sub>f</sub>H − [Δ<sub>at</sub>H(Na) + IE<sub>1</sub> + Δ<sub>at</sub>H(Cl) + EA<sub>1</sub>]</b></p>
      </div>
      <p class="note"><b>Watch out for the stoichiometry.</b> For MgCl<sub>2</sub> you need <b>2 ×</b> Δ<sub>at</sub>H(Cl), <b>2 ×</b> EA<sub>1</sub>(Cl), and <b>both</b> the first and second ionisation energies of magnesium.</p>` },

    { t: 'num', h: 'Born–Haber for NaCl', q: 'Using the data above, calculate the lattice energy of NaCl in kJ mol<sup>−1</sup>. <b>Include the sign.</b>', ans: '-787', tol: '3', unit: 'kJ mol⁻¹', hint: 'The bracket adds up to 107 + 496 + 122 − 349 = +376. Then ΔLE = −411 − 376.' },

    { t: 'teach', tag: 'Covalent character', h: 'Theoretical vs experimental lattice energy', html: `      <p>A <b>theoretical</b> lattice energy is calculated from a <b>perfectly ionic</b> model (point charges in a lattice). The <b>experimental</b> value comes from the Born–Haber cycle.</p>
      <ul>
        <li>If the two agree closely (e.g. NaCl), the compound really is <b>close to purely ionic</b>.</li>
        <li>If the experimental value is <b>much more exothermic</b> than the theoretical one (e.g. AgI, ZnS), the bonding has significant <b>covalent character</b> — the lattice is <b>stronger</b> than a purely ionic model predicts.</li>
      </ul>
      <p class="note"><b>Fajans-style reasoning:</b> covalent character increases when the <b>cation</b> is <b>small and highly charged</b> (high <b>polarising power</b>) and the <b>anion</b> is <b>large and highly charged</b> (high <b>polarisability</b>). The cation distorts the anion electron cloud, pulling electron density into the space between them.</p>` },

    { t: 'mcq', h: 'Reading the discrepancy', q: 'For silver iodide the experimental lattice energy is considerably <b>more exothermic</b> than the theoretical value. What does that tell you?', why: 'The purely ionic model underestimates the strength of the lattice, which means there is extra bonding present: the small, polarising Ag+ distorts the large, polarisable I- so that electron density is shared between them - covalent character.', opts: [['The bonding has significant covalent character, so the lattice is stronger than a purely ionic model predicts', 1], ['The compound is more ionic than expected', 0], ['The Born–Haber cycle must contain an experimental error', 0], ['The ions are larger than the model assumed', 0]] },

    { t: 'teach', tag: 'Dissolving', h: 'Enthalpy of solution', html: `      <p>Dissolving an ionic solid is a competition: you must <b>break the lattice</b> (endothermic, the reverse of the lattice energy) and then <b>hydrate the ions</b> (exothermic).</p>
      <div class="eqn">Δ<sub>sol</sub>H = −ΔLE + ΣΔ<sub>hyd</sub>H<small>i.e. Δsol H = (lattice-breaking) + (hydration of every ion)</small></div>
      <p class="note"><b>Hydration enthalpy</b> becomes <b>more exothermic</b> for ions with a <b>higher charge</b> and a <b>smaller radius</b> — a higher charge density attracts the δ− oxygen of water more strongly. Mg<sup>2+</sup> is hydrated far more exothermically than Na<sup>+</sup>.</p>` },

    { t: 'num', h: 'Enthalpy of solution', q: 'For NaCl: lattice energy = <b>−787</b>, Δ<sub>hyd</sub>H(Na<sup>+</sup>) = <b>−406</b>, Δ<sub>hyd</sub>H(Cl<sup>−</sup>) = <b>−363</b> kJ mol<sup>−1</sup>. Calculate Δ<sub>sol</sub>H. <b>Include the sign.</b>', ans: '18', tol: '2', unit: 'kJ mol⁻¹', hint: 'ΔsolH = +787 + (−406) + (−363).' },

    { t: 'teach', tag: 'Entropy', h: 'Entropy', html: `      <p><b>Entropy (S)</b> measures the number of ways energy and particles can be arranged — loosely, the <b>disorder</b>. Units: <b>J K<sup>−1</sup> mol<sup>−1</sup></b> (note: <b>joules</b>, not kilojoules).</p>
      <ul>
        <li><b>solid &lt; liquid &lt; gas</b>, so melting, boiling and dissolving normally <b>increase</b> entropy.</li>
        <li>The dominant factor is nearly always the <b>change in the number of moles of GAS</b>.</li>
      </ul>
      <div class="eqn">ΔS<sub>system</sub> = ΣS(products) − ΣS(reactants)</div>
      <p class="note"><b>The classic endothermic demonstration:</b> Ba(OH)<sub>2</sub>·8H<sub>2</sub>O(s) + 2NH<sub>4</sub>Cl(s) is strongly endothermic — cold enough to freeze the beaker to the bench — yet it happens spontaneously, because two solids produce a liquid and a gas, so ΔS<sub>system</sub> is <b>hugely positive</b>.</p>` },

    { t: 'sort' },

    { t: 'num', h: 'Entropy change of the system', q: 'For N<sub>2</sub>(g) + 3H<sub>2</sub>(g) → 2NH<sub>3</sub>(g), the standard entropies (J K<sup>−1</sup> mol<sup>−1</sup>) are N<sub>2</sub> = 192, H<sub>2</sub> = 131, NH<sub>3</sub> = 193. Calculate ΔS<sub>system</sub>. <b>Include the sign.</b>', ans: '-199', tol: '2', unit: 'J K⁻¹ mol⁻¹', hint: 'ΔS = (2 × 193) − [192 + (3 × 131)] = 386 − 585.' },

    { t: 'teach', tag: 'Total entropy', h: 'ΔS<sub>total</sub> decides feasibility', html: `      <p>A reaction is <b>thermodynamically feasible</b> (spontaneous) if the entropy of the <b>universe</b> increases:</p>
      <div class="eqn">ΔS<sub>total</sub> = ΔS<sub>system</sub> + ΔS<sub>surroundings</sub>&nbsp;&nbsp;&gt; 0</div>
      <div class="eqn">ΔS<sub>surroundings</sub> = −ΔH ÷ T<small>ΔH in J mol⁻¹ so that the units match (J K⁻¹ mol⁻¹)</small></div>
      <p class="note"><b>That is why exothermic reactions are so common.</b> A negative ΔH gives a <b>positive</b> ΔS<sub>surroundings</sub> — heat released into the surroundings spreads out energy there. An endothermic reaction can still be feasible if ΔS<sub>system</sub> is positive enough to outweigh the negative ΔS<sub>surroundings</sub>.</p>` },

    { t: 'num', h: 'Entropy change of the surroundings', q: 'For the same reaction, ΔH = <b>−92 kJ mol<sup>−1</sup></b> at <b>298 K</b>. Calculate ΔS<sub>surroundings</sub> in J K<sup>−1</sup> mol<sup>−1</sup> to 1 decimal place. <b>Include the sign.</b>', ans: '308.7', tol: '2', unit: 'J K⁻¹ mol⁻¹', hint: 'ΔS(surr) = −ΔH ÷ T = −(−92 000 J mol⁻¹) ÷ 298 K.' },

    { t: 'num', h: 'Total entropy change', q: 'Combine your two answers: calculate ΔS<sub>total</sub> in J K<sup>−1</sup> mol<sup>−1</sup> to 1 decimal place. <b>Include the sign.</b>', ans: '109.7', tol: '2', unit: 'J K⁻¹ mol⁻¹', hint: 'ΔS(total) = ΔS(system) + ΔS(surroundings) = −199 + 308.7.' },

    { t: 'teach', tag: 'Gibbs', h: 'Gibbs free energy', html: `      <div class="eqn">ΔG = ΔH − TΔS<sub>system</sub><small>feasible when ΔG ≤ 0 · this is just −T × ΔS(total), so it says exactly the same thing</small></div>
      <p><b>Units discipline:</b> ΔH is in kJ mol<sup>−1</sup> but ΔS is in J K<sup>−1</sup> mol<sup>−1</sup> — <b>divide ΔS by 1000</b> before you use it.</p>
      <p><b>The feasible temperature</b> is found by setting ΔG = 0, giving <b>T = ΔH ÷ ΔS</b>.</p>
      <ul>
        <li>ΔH negative, ΔS positive → feasible at <b>all</b> temperatures.</li>
        <li>ΔH negative, ΔS negative → feasible only at <b>low</b> T.</li>
        <li>ΔH positive, ΔS positive → feasible only at <b>high</b> T.</li>
        <li>ΔH positive, ΔS negative → <b>never</b> feasible.</li>
      </ul>
      <p class="note">K and ΔG are linked by <b>ΔG = −RT ln K</b>: a more negative ΔG means a larger K, i.e. an equilibrium further to the right.</p>` },

    { t: 'num', h: 'Calculate ΔG', q: 'For N<sub>2</sub> + 3H<sub>2</sub> → 2NH<sub>3</sub>: ΔH = −92 kJ mol<sup>−1</sup>, ΔS<sub>system</sub> = −199 J K<sup>−1</sup> mol<sup>−1</sup>, T = 298 K. Calculate ΔG in kJ mol<sup>−1</sup> to 1 decimal place. <b>Include the sign.</b>', ans: '-32.7', tol: '1', unit: 'kJ mol⁻¹', hint: 'ΔG = −92 − [298 × (−0.199)] = −92 + 59.3.' },

    { t: 'num', h: 'The feasible temperature limit', q: 'Above what temperature does this reaction stop being feasible? Set ΔG = 0 and use T = ΔH ÷ ΔS (both must be in the same energy unit). Give the answer in K to the nearest kelvin.', ans: '462', tol: '5', unit: 'K', hint: 'T = (−92 000 J mol⁻¹) ÷ (−199 J K⁻¹ mol⁻¹).' },

    { t: 'mcq', h: 'Feasible but not happening', q: 'A reaction has ΔG = −60 kJ mol<sup>−1</sup> at 298 K, yet nothing observable happens when the reactants are mixed. Why?', why: 'Thermodynamic feasibility says nothing about rate. If the activation energy is very high, the reaction is kinetically inhibited and proceeds immeasurably slowly - the classic example is the conversion of diamond to graphite, which is feasible but takes geological time.', opts: [['The reaction is kinetically inhibited: the activation energy is too high for it to proceed at a measurable rate', 1], ['ΔG must be positive for a reaction to happen', 0], ['The entropy of the system must also be positive', 0], ['ΔG only applies to reactions in solution', 0]] },

    { t: 'match' }
  ],
  sort: {
    h: 'Does the entropy of the system rise or fall?', prompt: 'Tap the change, then tap what happens to the entropy of the system. Count the moles of GAS on each side.',
    bins: [{ key: 'up', label: '⬆️ ΔS positive' }, { key: 'down', label: '⬇️ ΔS negative' }],
    chips: [['melting ice', 'up'], ['CaCO₃(s) → CaO(s) + CO₂(g)', 'up'], ['2H₂O₂(l) → 2H₂O(l) + O₂(g)', 'up'], ['N₂(g) + 3H₂(g) → 2NH₃(g)', 'down'], ['condensing steam', 'down'], ['2Mg(s) + O₂(g) → 2MgO(s)', 'down']],
    doneMsg: 'All sorted — if the number of moles of gas goes up, the entropy goes up.'
  },
  match: {
    h: 'Thermodynamic definitions', prompt: 'Match each term to its definition. Every one is per mole.', leftHead: 'Term', rightHead: 'Definition',
    pairs: [
      ['Lattice energy', 'One mole of an ionic solid formed from its gaseous ions'],
      ['Enthalpy of atomisation', 'One mole of gaseous atoms formed from the element in its standard state'],
      ['First electron affinity', 'One mole of gaseous atoms each gain an electron to give gaseous 1− ions'],
      ['Enthalpy of hydration', 'One mole of gaseous ions dissolved in water to give aqueous ions']
    ],
    doneMsg: 'All matched — note that every species in these definitions is GASEOUS before the change.'
  },
  recap: [
    ['Lattice energy', 'gaseous ions → solid; always exothermic; found from a Born–Haber cycle'],
    ['Covalent character', 'experimental much more exothermic than theoretical → polarisation of the anion'],
    ['Δ<sub>sol</sub>H', '= −ΔLE + ΣΔ<sub>hyd</sub>H; hydration is more exothermic for small, highly charged ions'],
    ['Entropy', 'ΔS<sub>system</sub> = ΣS(products) − ΣS(reactants); moles of gas dominate'],
    ['Feasibility', 'ΔS<sub>total</sub> = ΔS<sub>sys</sub> + (−ΔH ÷ T) &gt; 0, equivalently ΔG = ΔH − TΔS ≤ 0'],
    ['Kinetics', 'a feasible reaction can still be immeasurably slow if E<sub>a</sub> is high']
  ]
},

/* ================= TOPIC 14 ================= */
{
  slug: 'redox-ii',
  specTopic: 'Topic 14: Redox II',
  title: 'Redox II',
  emoji: '🔋',
  desc: 'Interactive Edexcel A-level Chemistry (9CH0) mini-lesson on Topic 14 Redox II: standard electrode potentials and the standard hydrogen electrode, calculating E cell, predicting feasibility and its limitations, storage and fuel cells, and redox titrations with manganate(VII) and thiosulfate.',
  intro: 'Redox II turns redox into <b>numbers</b>. Standard <b>electrode potentials</b> let you calculate <b>E°<sub>cell</sub></b>, predict <b>feasibility</b> (and know when the prediction fails), understand <b>fuel cells</b>, and carry out <b>redox titrations</b>.',
  pillars: [['E° and the', 'SHE'], ['E°cell &amp;', 'feasibility'], ['fuel', 'cells'], ['redox', 'titrations']],
  pillarCaption: 'a positive E°cell means feasible — but says nothing about rate',
  screens: [
    { t: 'teach', tag: 'Electrode potentials', h: 'E° and the standard hydrogen electrode', html: `      <p>You cannot measure the potential of a single half-cell, so every value is quoted <b>relative to the standard hydrogen electrode</b>, which is <b>defined as exactly 0.00 V</b>.</p>
      <p><b>Standard conditions for E°:</b> all solutions at <b>1.00 mol dm<sup>−3</sup></b>, any gas at <b>100 kPa</b>, temperature <b>298 K</b>, and an inert <b>platinum</b> electrode where there is no metal (e.g. for Fe<sup>3+</sup>/Fe<sup>2+</sup>).</p>
      <div class="eqn">Zn<sup>2+</sup>(aq) + 2e<sup>−</sup> → Zn(s)&nbsp;&nbsp;E° = −0.76 V<br>Cu<sup>2+</sup>(aq) + 2e<sup>−</sup> → Cu(s)&nbsp;&nbsp;E° = +0.34 V<small>Half-equations are ALWAYS written as reductions, with the electrons on the left.</small></div>
      <p class="note"><b>What the sign tells you:</b> a <b>more negative</b> E° means the species on the <b>right</b> loses electrons more readily — it is the better <b>reducing agent</b>. A <b>more positive</b> E° means the species on the <b>left</b> is the better <b>oxidising agent</b>.</p>` },

    { t: 'mcq', h: 'Standard conditions for E°', q: 'Which conditions are required when a standard electrode potential is measured?', why: 'All solutions must be 1.00 mol dm-3, gases at 100 kPa, the temperature 298 K, and an inert platinum electrode is used where no metal is present. The value is always measured against the standard hydrogen electrode, defined as 0.00 V.', opts: [['1.00 mol dm<sup>−3</sup> solutions, 100 kPa, 298 K, measured against the standard hydrogen electrode', 1], ['0.100 mol dm<sup>−3</sup> solutions, 100 kPa, 273 K', 0], ['1.00 mol dm<sup>−3</sup> solutions at any temperature, using a copper electrode as the reference', 0], ['Any concentration, provided the temperature is 298 K', 0]] },

    { t: 'teach', tag: 'E°cell', h: 'Calculating E°<sub>cell</sub>', html: `      <div class="eqn">E°<sub>cell</sub> = E°(reduced, the more positive) − E°(oxidised, the more negative)<small>Or, from a cell diagram: E°(right-hand electrode) − E°(left-hand electrode).</small></div>
      <p>In the Zn/Cu cell: E°<sub>cell</sub> = (+0.34) − (−0.76) = <b>+1.10 V</b>. Zinc (more negative) is <b>oxidised</b>, so it is the <b>negative electrode</b>, and electrons flow through the wire <b>from the zinc to the copper</b>.</p>
      <p class="note"><b>A positive E°<sub>cell</sub> means the reaction is thermodynamically feasible.</b> Edexcel also expects you to know that E°<sub>cell</sub> is directly proportional to <b>ΔS<sub>total</sub></b> and to <b>ln K</b> — a bigger E°<sub>cell</sub> means an equilibrium lying further to the right.</p>` },

    { t: 'num', h: 'The Daniell cell', q: 'E°(Zn<sup>2+</sup>/Zn) = <b>−0.76 V</b>, E°(Cu<sup>2+</sup>/Cu) = <b>+0.34 V</b>. Calculate E°<sub>cell</sub> for the spontaneous reaction Zn + Cu<sup>2+</sup> → Zn<sup>2+</sup> + Cu.', ans: '1.10', tol: '0.02', unit: 'V', hint: 'E°cell = (+0.34) − (−0.76).' },

    { t: 'num', h: 'Will iron(III) oxidise iodide?', q: 'E°(Fe<sup>3+</sup>/Fe<sup>2+</sup>) = <b>+0.77 V</b>, E°(I<sub>2</sub>/I<sup>−</sup>) = <b>+0.54 V</b>. Calculate E°<sub>cell</sub> for 2Fe<sup>3+</sup> + 2I<sup>−</sup> → 2Fe<sup>2+</sup> + I<sub>2</sub>.', ans: '0.23', tol: '0.02', unit: 'V', hint: 'Fe³⁺ is reduced (the more positive system), I⁻ is oxidised: 0.77 − 0.54.' },

    { t: 'mcq', h: 'When the prediction fails', q: 'A reaction has a positive E°<sub>cell</sub> but no reaction is observed when the solutions are mixed. Give the best explanation.', why: 'E cell only tells you about thermodynamic feasibility, not rate. A high activation energy can make a feasible reaction immeasurably slow. The other limitation is that real conditions are rarely standard: different concentrations shift the electrode potentials.', opts: [['The reaction is kinetically inhibited — the activation energy is too high', 1], ['A positive E°<sub>cell</sub> means the reaction is not feasible', 0], ['The reaction must be endothermic', 0], ['Electrode potentials do not apply to reactions in solution', 0]] },

    { t: 'sort' },

    { t: 'teach', tag: 'Fuel cells', h: 'Fuel cells', html: `      <p>A <b>fuel cell</b> generates a voltage continuously while fuel and oxygen are supplied — the reactants are not stored inside it, so it does not run down.</p>
      <p><b>Alkaline hydrogen–oxygen cell:</b></p>
      <div class="eqn">Negative electrode: H<sub>2</sub> + 2OH<sup>−</sup> → 2H<sub>2</sub>O + 2e<sup>−</sup>&nbsp;&nbsp;E° = −0.83 V<br>Positive electrode: O<sub>2</sub> + 2H<sub>2</sub>O + 4e<sup>−</sup> → 4OH<sup>−</sup>&nbsp;&nbsp;E° = +0.40 V<small>Overall: 2H₂ + O₂ → 2H₂O — the only product is water.</small></div>
      <p class="note"><b>In an acidic electrolyte</b> the same cell is written H<sub>2</sub> → 2H<sup>+</sup> + 2e<sup>−</sup> and O<sub>2</sub> + 4H<sup>+</sup> + 4e<sup>−</sup> → 2H<sub>2</sub>O. <b>Drawbacks:</b> hydrogen is hard to store and transport, is usually made from fossil fuels or by electrolysis (which uses energy), and the cells need expensive catalysts.</p>` },

    { t: 'num', h: 'Voltage of a fuel cell', q: 'Using E°(O<sub>2</sub>/OH<sup>−</sup>) = <b>+0.40 V</b> and E°(H<sub>2</sub>O/H<sub>2</sub>, OH<sup>−</sup>) = <b>−0.83 V</b>, calculate E°<sub>cell</sub> for the alkaline hydrogen–oxygen fuel cell.', ans: '1.23', tol: '0.02', unit: 'V', hint: 'E°cell = (+0.40) − (−0.83).' },

    { t: 'teach', tag: 'Redox titrations', h: 'Manganate(VII) and thiosulfate titrations', html: `      <p><b>Manganate(VII) with iron(II)</b> — the classic. The MnO<sub>4</sub><sup>−</sup> goes in the burette and is <b>self-indicating</b>: the end point is the first <b>permanent pale pink</b> colour.</p>
      <div class="eqn">MnO<sub>4</sub><sup>−</sup> + 8H<sup>+</sup> + 5Fe<sup>2+</sup> → Mn<sup>2+</sup> + 4H<sub>2</sub>O + 5Fe<sup>3+</sup><small>Ratio 1 MnO₄⁻ : 5 Fe²⁺. Acidify with dilute SULFURIC acid — not HCl (which would be oxidised to chlorine) and not nitric acid (an oxidising agent itself).</small></div>
      <p><b>Iodine with thiosulfate</b> — used to find the concentration of an oxidising agent, which is first reacted with excess iodide to liberate iodine.</p>
      <div class="eqn">I<sub>2</sub> + 2S<sub>2</sub>O<sub>3</sub><sup>2−</sup> → 2I<sup>−</sup> + S<sub>4</sub>O<sub>6</sub><sup>2−</sup><small>Ratio 1 : 2. Add starch only NEAR the end point (straw colour); the blue-black colour then disappears at the end point.</small></div>` },

    { t: 'num', h: 'Manganate(VII) titration', q: '<b>25.0 cm<sup>3</sup></b> of an Fe<sup>2+</sup> solution needs <b>24.00 cm<sup>3</sup></b> of <b>0.0200 mol dm<sup>−3</sup></b> KMnO<sub>4</sub> for a permanent pink colour. Calculate the concentration of Fe<sup>2+</sup> in mol dm<sup>−3</sup> to 3 decimal places.', ans: '0.096', tol: '0.003', unit: 'mol dm⁻³', hint: 'n(MnO₄⁻) = 0.0200 × 0.02400 = 4.80 × 10⁻⁴ mol. Ratio 1 : 5, so n(Fe²⁺) = 2.40 × 10⁻³ mol. Divide by 0.0250 dm³.' },

    { t: 'num', h: 'Thiosulfate titration', q: '<b>25.0 cm<sup>3</sup></b> of an iodine solution needs <b>20.00 cm<sup>3</sup></b> of <b>0.100 mol dm<sup>−3</sup></b> sodium thiosulfate. Calculate the concentration of the iodine in mol dm<sup>−3</sup> to 3 decimal places.', ans: '0.040', tol: '0.003', unit: 'mol dm⁻³', hint: 'n(S₂O₃²⁻) = 0.100 × 0.02000 = 2.00 × 10⁻³ mol. Ratio 2 : 1, so n(I₂) = 1.00 × 10⁻³ mol. Divide by 0.0250 dm³.' },

    { t: 'mcq', h: 'Which acid?', q: 'Why is <b>dilute sulfuric acid</b> — not hydrochloric or nitric acid — used to acidify a manganate(VII) titration?', why: 'Chloride ions would themselves be oxidised by manganate(VII) to chlorine, so extra KMnO4 would be used and the titre would be too high. Nitric acid is an oxidising agent in its own right and would oxidise the Fe2+. Sulfuric acid provides H+ without interfering.', opts: [['HCl would be oxidised to chlorine and HNO<sub>3</sub> is itself an oxidising agent, so both would interfere', 1], ['Sulfuric acid is a stronger acid than either of the others', 0], ['Sulfuric acid is the only acid that is self-indicating', 0], ['HCl would reduce the Fe<sup>3+</sup> back to Fe<sup>2+</sup>', 0]] },

    { t: 'mcq', h: 'Which way do the electrons flow?', q: 'In the Zn/Cu cell, in which direction do electrons flow in the external circuit?', why: 'The half-cell with the more NEGATIVE electrode potential is oxidised and releases electrons, so zinc is the negative electrode. Electrons flow through the wire from the zinc (negative) to the copper (positive), where Cu2+ is reduced.', opts: [['From the zinc (negative electrode) to the copper (positive electrode)', 1], ['From the copper to the zinc', 0], ['Electrons flow through the salt bridge, not the wire', 0], ['No electrons flow until the salt bridge is removed', 0]] },

    { t: 'match' }
  ],
  sort: {
    h: 'Feasible or not?', prompt: 'Use these E° values: Zn²⁺/Zn = −0.76 · Cu²⁺/Cu = +0.34 · I₂/I⁻ = +0.54 · Fe³⁺/Fe²⁺ = +0.77 · Br₂/Br⁻ = +1.09 · MnO₄⁻/Mn²⁺ = +1.51 V. Tap the reaction, then tap whether E°cell is positive (feasible) or negative.',
    bins: [{ key: 'yes', label: '✅ Feasible (E°cell +)' }, { key: 'no', label: '❌ Not feasible (E°cell −)' }],
    chips: [['Zn + Cu²⁺ → Zn²⁺ + Cu', 'yes'], ['Fe³⁺ oxidises I⁻ to I₂', 'yes'], ['MnO₄⁻/H⁺ oxidises Fe²⁺', 'yes'], ['Fe³⁺ oxidises Br⁻ to Br₂', 'no'], ['I₂ oxidises Fe²⁺ to Fe³⁺', 'no'], ['Cu + Zn²⁺ → Cu²⁺ + Zn', 'no']],
    doneMsg: 'All sorted — the species on the LEFT of the more positive half-equation does the oxidising.'
  },
  match: {
    h: 'Half-equations', prompt: 'Match each electrode or reagent to its half-equation.', leftHead: 'Electrode or reagent', rightHead: 'Equation',
    pairs: [
      ['Negative electrode, alkaline H₂/O₂ fuel cell', 'H₂ + 2OH⁻ → 2H₂O + 2e⁻'],
      ['Positive electrode, alkaline H₂/O₂ fuel cell', 'O₂ + 2H₂O + 4e⁻ → 4OH⁻'],
      ['Manganate(VII) in acid solution', 'MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O'],
      ['Iodine with thiosulfate', 'I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻']
    ],
    doneMsg: 'All matched — check every one by balancing the charge as well as the atoms.'
  },
  recap: [
    ['E°', 'measured against the SHE (0.00 V) at 1.00 mol dm<sup>−3</sup>, 100 kPa, 298 K'],
    ['E°<sub>cell</sub>', '= E°(more positive) − E°(more negative); positive means feasible'],
    ['Limitations', 'kinetic inhibition (high E<sub>a</sub>) and non-standard conditions'],
    ['Fuel cell', 'alkaline H<sub>2</sub>/O<sub>2</sub>: E°<sub>cell</sub> = +1.23 V; the only product is water'],
    ['Titrations', 'MnO<sub>4</sub><sup>−</sup> : Fe<sup>2+</sup> = 1 : 5 (self-indicating) · I<sub>2</sub> : S<sub>2</sub>O<sub>3</sub><sup>2−</sup> = 1 : 2 (starch near the end)']
  ]
},

/* ================= TOPIC 15 ================= */
{
  slug: 'transition-metals',
  specTopic: 'Topic 15: Transition Metals',
  title: 'Transition Metals',
  emoji: '💎',
  desc: 'Interactive Edexcel A-level Chemistry (9CH0) mini-lesson on Topic 15: d-block electron configurations, the definition of a transition metal, complex ions and ligands, shapes and coordination numbers, the origin of colour, ligand substitution, the chelate effect, and catalysis.',
  intro: 'Transition metals are where <b>everything</b> comes together: electron configurations, complexes and <b>ligands</b>, <b>colour</b> from d-orbital splitting, <b>ligand substitution</b>, the entropy-driven <b>chelate effect</b>, and both kinds of <b>catalysis</b>.',
  pillars: [['d-block &amp;', 'complexes'], ['colour'], ['ligand', 'substitution'], ['catalysis']],
  pillarCaption: 'a part-full d sub-shell explains colour, catalysis and variable oxidation number',
  screens: [
    { t: 'teach', tag: 'The d block', h: 'What counts as a transition metal', html: `      <p>A <b>transition metal</b> is a d-block element that forms at least one <b>stable ion with a partially filled d sub-shell</b>.</p>
      <ul>
        <li><b>Scandium</b> is not one: its only ion, Sc<sup>3+</sup>, is 3d<sup>0</sup> — <b>empty</b>.</li>
        <li><b>Zinc</b> is not one: its only ion, Zn<sup>2+</sup>, is 3d<sup>10</sup> — <b>full</b>.</li>
      </ul>
      <p>Remember that the <b>4s electrons are removed first</b>: Fe is [Ar] 3d<sup>6</sup> 4s<sup>2</sup>, so Fe<sup>2+</sup> is [Ar] 3d<sup>6</sup> and Fe<sup>3+</sup> is [Ar] 3d<sup>5</sup>.</p>
      <p class="note"><b>The characteristic properties all follow from a part-full d sub-shell:</b> <b>variable oxidation number</b>, <b>coloured</b> ions, <b>catalytic</b> activity, and the formation of <b>complex ions</b>.</p>` },

    { t: 'mcq', h: 'Why zinc is not a transition metal', q: 'Zinc is in the d block, but it is not classed as a transition metal. Why?', why: 'Zinc forms only Zn2+, which is 3d10 - a completely full d sub-shell. With no partially filled d sub-shell in any of its stable ions, zinc compounds are colourless and zinc does not show the characteristic transition metal properties.', opts: [['Its only ion, Zn<sup>2+</sup>, has a full 3d<sup>10</sup> sub-shell', 1], ['Its only ion, Zn<sup>2+</sup>, has an empty 3d sub-shell', 0], ['Zinc has no 4s electrons to lose', 0], ['Zinc cannot form complex ions', 0]] },

    { t: 'teach', tag: 'Complexes', h: 'Complex ions, ligands and shapes', html: `      <p>A <b>ligand</b> is a species with a <b>lone pair</b> that it <b>donates</b> to the central metal ion to form a <b>dative covalent</b> (coordinate) bond. The <b>coordination number</b> is the number of dative bonds.</p>
      <ul>
        <li><b>Monodentate</b> ligands donate one pair: H<sub>2</sub>O, NH<sub>3</sub>, Cl<sup>−</sup>, CN<sup>−</sup>, OH<sup>−</sup>, CO.</li>
        <li><b>Bidentate</b> (two pairs): 1,2-diaminoethane ("en"), ethanedioate. <b>Multidentate</b>: EDTA<sup>4−</sup> (six).</li>
      </ul>
      <p><b>Shapes:</b> small ligands like H<sub>2</sub>O and NH<sub>3</sub> usually give <b>6-coordinate octahedral</b> complexes. Bigger ligands such as <b>Cl<sup>−</sup></b> can only fit <b>four</b> around the metal, giving a <b>tetrahedral</b> complex. Ag<sup>+</sup> gives <b>2-coordinate linear</b> complexes such as [Ag(NH<sub>3</sub>)<sub>2</sub>]<sup>+</sup> (Tollens' reagent).</p>
      <p class="note"><b>Cisplatin</b> is a <b>square planar</b> platinum(II) complex. Only the <b>cis</b> isomer works as an anti-cancer drug: it binds to DNA and prevents replication. Its side effects come from attacking healthy cells too.</p>` },

    { t: 'num', h: 'Oxidation number in a complex', q: 'What is the oxidation number of iron in <b>[Fe(CN)<sub>6</sub>]<sup>3−</sup></b>? Each CN<sup>−</sup> ligand carries a 1− charge. Give the answer as a signed number.', ans: '3', tol: '0.1', unit: '(sign + value)', hint: 'Fe + 6(−1) = −3.' },

    { t: 'num', h: 'Coordination number', q: 'What is the coordination number of the copper in <b>[CuCl<sub>4</sub>]<sup>2−</sup></b>?', ans: '4', tol: '0.1', unit: '', hint: 'Count the dative bonds — one per chloride ligand.' },

    { t: 'mcq', h: 'What is a ligand?', q: 'Which definition of a ligand is correct?', why: 'A ligand donates a lone pair of electrons to the metal ion, forming a dative covalent bond. It does not have to be negatively charged - water and ammonia are neutral ligands.', opts: [['A species that donates a lone pair of electrons to a metal ion, forming a dative covalent bond', 1], ['A negative ion that is electrostatically attracted to a metal ion', 0], ['A species that accepts a pair of electrons from a metal ion', 0], ['Any molecule that surrounds a metal ion in solution', 0]] },

    { t: 'teach', tag: 'Colour', h: 'Why transition metal complexes are coloured', html: `      <p>In an isolated ion the five d orbitals have the same energy. When <b>ligands</b> approach, they <b>split</b> the d orbitals into two groups separated by an energy gap <b>ΔE</b>.</p>
      <div class="eqn">ΔE = hν = hc ÷ λ<small>An electron absorbs a photon of visible light and is promoted from the lower group to the higher group.</small></div>
      <p>The light that is <b>absorbed</b> is removed from the white light passing through, and we see the <b>complementary</b> colour that is transmitted.</p>
      <p class="note"><b>No partly filled d sub-shell → no colour.</b> Sc<sup>3+</sup> (3d<sup>0</sup>) and Zn<sup>2+</sup> (3d<sup>10</sup>) are <b>colourless</b>, because there is no d electron that can be promoted (or no vacancy to promote it into). Changing the <b>ligand</b>, the <b>oxidation number</b> or the <b>coordination number</b> changes ΔE, and therefore changes the colour.</p>` },

    { t: 'num', h: 'Counting d electrons', q: 'Copper is [Ar] 3d<sup>10</sup> 4s<sup>1</sup>. How many <b>d electrons</b> does the Cu<sup>2+</sup> ion have?', ans: '9', tol: '0.1', unit: 'd electrons', hint: 'Remove the 4s electron first, then one 3d electron: 3d¹⁰4s¹ → 3d⁹.' },

    { t: 'teach', tag: 'Ligand substitution', h: 'Ligand substitution reactions', html: `      <p>Copper(II) in water is the pale blue <b>[Cu(H<sub>2</sub>O)<sub>6</sub>]<sup>2+</sup></b>.</p>
      <ul>
        <li><b>Excess NH<sub>3</sub></b>: four of the six water ligands are replaced → <b>[Cu(NH<sub>3</sub>)<sub>4</sub>(H<sub>2</sub>O)<sub>2</sub>]<sup>2+</sup></b>, a <b>deep blue</b> solution. (Add NH<sub>3</sub> a little at a time first and you see the pale blue <b>precipitate</b> of Cu(OH)<sub>2</sub>, which then dissolves in excess.)</li>
        <li><b>Concentrated HCl</b>: the bigger chloride ligands replace <b>all six</b> waters and the <b>coordination number falls to 4</b> → <b>[CuCl<sub>4</sub>]<sup>2−</sup></b>, a <b>yellow</b> tetrahedral complex.</li>
        <li><b>Cobalt(II)</b> does the same: pink <b>[Co(H<sub>2</sub>O)<sub>6</sub>]<sup>2+</sup></b> → blue <b>[CoCl<sub>4</sub>]<sup>2−</sup></b>.</li>
      </ul>
      <p class="note"><b>Haemoglobin</b> is an iron(II) complex that carries O<sub>2</sub> by reversible ligand substitution. <b>Carbon monoxide</b> binds far more strongly than oxygen and does not readily come off, so the haemoglobin can no longer carry oxygen — that is why CO is toxic.</p>` },

    { t: 'match' },

    { t: 'teach', tag: 'Chelate effect', h: 'The chelate effect', html: `      <p>Replacing <b>monodentate</b> ligands with a <b>bidentate</b> or <b>multidentate</b> ligand is strongly favoured:</p>
      <div class="eqn">[Cu(H<sub>2</sub>O)<sub>6</sub>]<sup>2+</sup> + 3en → [Cu(en)<sub>3</sub>]<sup>2+</sup> + 6H<sub>2</sub>O<small>4 particles on the left → 7 particles on the right</small></div>
      <p class="note"><b>It is driven by entropy, not enthalpy.</b> ΔH is close to zero (the same number of dative bonds, of similar strength, are made and broken), but the <b>number of particles increases</b>, so <b>ΔS<sub>system</sub> is large and positive</b>. That makes ΔG negative and the substitution effectively goes to completion.</p>` },

    { t: 'mcq', h: 'Why the chelate effect works', q: 'Why does a bidentate ligand such as 1,2-diaminoethane displace water from [Cu(H<sub>2</sub>O)<sub>6</sub>]<sup>2+</sup> so readily?', why: 'The enthalpy change is almost zero because similar dative bonds are broken and made. What drives it is entropy: three bidentate ligands displace six water molecules, so the number of free particles increases and delta S system is large and positive, making delta G negative.', opts: [['ΔH is nearly zero, but the number of particles increases, so ΔS<sub>system</sub> is large and positive', 1], ['The dative bonds formed by en are much stronger than those formed by water', 0], ['The complex formed is smaller and therefore more stable', 0], ['It is driven by a large negative ΔH', 0]] },

    { t: 'teach', tag: 'Vanadium &amp; chromium', h: 'Variable oxidation number in action', html: `      <p><b>Vanadium</b> shows four oxidation states with four different colours — reduce ammonium vanadate(V) with zinc in acid and you see them in turn:</p>
      <ul>
        <li><b>+5</b> VO<sub>2</sub><sup>+</sup> — <b>yellow</b> · <b>+4</b> VO<sup>2+</sup> — <b>blue</b> · <b>+3</b> V<sup>3+</sup> — <b>green</b> · <b>+2</b> V<sup>2+</sup> — <b>violet</b></li>
      </ul>
      <p><b>Chromium:</b> the orange dichromate(VI) / yellow chromate(VI) equilibrium shifts with pH:</p>
      <div class="eqn">Cr<sub>2</sub>O<sub>7</sub><sup>2−</sup> + H<sub>2</sub>O ⇌ 2CrO<sub>4</sub><sup>2−</sup> + 2H<sup>+</sup><small>Add acid → orange dichromate. Add alkali → yellow chromate.</small></div>` },

    { t: 'sort' },

    { t: 'teach', tag: 'Catalysis', h: 'Heterogeneous and homogeneous catalysis', html: `      <p>Transition metals catalyse so well because they can <b>change oxidation number</b> easily (for homogeneous catalysis) and can <b>adsorb</b> reactants onto their surface (for heterogeneous catalysis).</p>
      <ul>
        <li><b>Heterogeneous — the Contact process</b>, with solid <b>V<sub>2</sub>O<sub>5</sub></b>: SO<sub>2</sub> + V<sub>2</sub>O<sub>5</sub> → SO<sub>3</sub> + V<sub>2</sub>O<sub>4</sub>, then 2V<sub>2</sub>O<sub>4</sub> + O<sub>2</sub> → 2V<sub>2</sub>O<sub>5</sub>. The catalyst is regenerated.</li>
        <li><b>Homogeneous — Fe<sup>2+</sup></b> catalysing S<sub>2</sub>O<sub>8</sub><sup>2−</sup> + 2I<sup>−</sup> → 2SO<sub>4</sub><sup>2−</sup> + I<sub>2</sub>. Without the catalyst two <b>negative</b> ions have to collide, which is very slow; the Fe<sup>2+</sup>/Fe<sup>3+</sup> pair provides a route in which each step is between oppositely charged ions.</li>
        <li><b>Autocatalysis — Mn<sup>2+</sup></b> in the MnO<sub>4</sub><sup>−</sup> / C<sub>2</sub>O<sub>4</sub><sup>2−</sup> reaction: the <b>product</b> catalyses the reaction, so the rate <b>speeds up</b> as the reaction proceeds.</li>
      </ul>` },

    { t: 'mcq', h: 'Why they catalyse', q: 'Why are transition metal ions such good <b>homogeneous</b> catalysts?', why: 'They can change oxidation number easily by gaining or losing d electrons, so they can accept electrons from one reactant and pass them to another, providing an alternative route with a lower activation energy - and are regenerated at the end.', opts: [['They can change oxidation number easily, so they can accept and then donate electrons and be regenerated', 1], ['They have large surface areas for reactants to adsorb onto', 0], ['They lower the enthalpy change of the reaction', 0], ['They are always insoluble, so they can be filtered off', 0]] },

    { t: 'num', h: 'Colorimetry', q: 'A colorimeter calibration line for a copper(II) solution is <b>A = 2.5c</b>, where A is the absorbance and c is the concentration in mol dm<sup>−3</sup>. An unknown gives an absorbance of <b>0.60</b>. Calculate its concentration to 2 decimal places.', ans: '0.24', tol: '0.01', unit: 'mol dm⁻³', hint: 'c = A ÷ 2.5 = 0.60 ÷ 2.5.' }
  ],
  sort: {
    h: 'What shape is the complex?', prompt: 'Tap the complex ion, then tap its shape. Remember that big ligands like Cl⁻ can only fit four around the metal.',
    bins: [{ key: 'oct', label: '🟦 Octahedral' }, { key: 'tet', label: '🟩 Tetrahedral' }, { key: 'lin', label: '🟪 Linear' }],
    chips: [['[Cu(H₂O)₆]²⁺', 'oct'], ['[Cr(H₂O)₆]³⁺', 'oct'], ['[Co(NH₃)₆]³⁺', 'oct'], ['[CuCl₄]²⁻', 'tet'], ['[CoCl₄]²⁻', 'tet'], ['[Ag(NH₃)₂]⁺', 'lin']],
    doneMsg: 'All sorted — six small ligands give octahedral; four chlorides give tetrahedral; silver(I) gives linear.'
  },
  match: {
    h: 'Complex and colour', prompt: 'Match each complex ion to the colour of its solution.', leftHead: 'Complex ion', rightHead: 'Colour',
    pairs: [
      ['[Cu(H₂O)₆]²⁺', 'Pale blue solution'],
      ['[Cu(NH₃)₄(H₂O)₂]²⁺', 'Deep blue solution'],
      ['[CuCl₄]²⁻', 'Yellow solution'],
      ['[Co(H₂O)₆]²⁺', 'Pink solution']
    ],
    doneMsg: 'All matched — change the ligand and you change the size of the d-orbital splitting, so you change the colour.'
  },
  recap: [
    ['Transition metal', 'forms at least one stable ion with a PART-FULL d sub-shell (so not Sc or Zn)'],
    ['Ligand', 'donates a lone pair to form a dative covalent bond; mono-, bi- or multidentate'],
    ['Shapes', 'octahedral with H<sub>2</sub>O/NH<sub>3</sub>; tetrahedral with Cl<sup>−</sup>; linear for Ag(I); square planar cisplatin'],
    ['Colour', 'd orbitals split by ΔE; an electron absorbs a photon; we see the complementary colour'],
    ['Chelate effect', 'driven by a large positive ΔS<sub>system</sub>, not by ΔH'],
    ['Catalysis', 'V<sub>2</sub>O<sub>5</sub> (heterogeneous) · Fe<sup>2+</sup> with S<sub>2</sub>O<sub>8</sub><sup>2−</sup>/I<sup>−</sup> (homogeneous) · Mn<sup>2+</sup> autocatalysis']
  ]
}

];
