console.log("ProofTree v0.0.1");
const f = "bussproofs-html__", A = `div.${f}proof-tree{max-width:100%;margin:20px auto}div.${f}sequent{width:auto;text-align:center}div.${f}premises{width:auto;display:flex;flex-direction:row;gap:20px;align-items:flex-end}div.${f}horizontal-rule{width:100%;border-bottom:1.3px solid;position:relative}div.${f}horizontal-rule>.${f}right-label{position:absolute;height:auto;top:-50%;right:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}`, X = () => {
  console.log("renderProofTreesOnLoad()"), document.addEventListener("DOMContentLoaded", function() {
    B();
  });
}, B = () => {
  console.log("renderProofTrees()");
  const t = document.createElement("style");
  t.innerHTML = A, document.head.appendChild(t), Array.from(
    document.body.getElementsByTagName("P")
  ).filter(
    (r) => r.innerHTML.includes("\\begin{prooftree}")
  ).forEach((r) => C(r));
}, C = (t) => {
  try {
    const e = v(t);
    if (!e) throw new Error("cannot find fragment");
    const s = z(e);
    if (!s) throw new Error("error: cannot recognise latex command");
    const r = $(s);
    if (!r) throw new Error("error: cannot construct proof tree");
    e == null || e.nodeList.slice(1).forEach((o) => {
      var l;
      return (l = o.parentNode) == null ? void 0 : l.removeChild(o);
    });
    const n = S(r);
    t.insertBefore(e == null ? void 0 : e.beforeTextNode, e == null ? void 0 : e.nodeList[0]), t.insertBefore(n, e == null ? void 0 : e.nodeList[0]), t.insertBefore(e == null ? void 0 : e.afterTextNode, e == null ? void 0 : e.nodeList[0]), t.removeChild(e == null ? void 0 : e.nodeList[0]), window.addEventListener("load", () => R(n), !1), t.innerHTML.includes("\\begin{prooftree}") && C(t);
  } catch (e) {
    console.error(e);
  }
}, L = (t, e) => {
  let s = -1, r = -1;
  for (let i = 0; i < e.length; i++)
    if (e[i].nodeType === Node.TEXT_NODE) {
      const u = e[i].nodeValue.indexOf(t);
      if (u !== -1) {
        r = i, s = u;
        break;
      }
    }
  if (s === -1) return null;
  const n = e[r].nodeValue, o = n.slice(0, s), l = n.slice(s + t.length), c = document.createTextNode(o), m = document.createTextNode(l);
  return [r, c, m];
}, v = (t) => {
  const e = Array.from(t.childNodes), s = L("\\begin{prooftree}", e);
  if (s === null) return null;
  const [r, n, o] = s, l = e.slice(r), c = [...l];
  c.splice(0, 1, o);
  const m = L("\\end{prooftree}", c);
  if (m === null) return null;
  const [i, u, d] = m, h = l.slice(0, i + 1), y = c;
  y.splice(
    i,
    c.length - i,
    u
  );
  const p = y.filter(
    (x) => x.nodeType !== Node.COMMENT_NODE
  );
  return {
    nodeList: h,
    prtrNodeList: p,
    beforeTextNode: n,
    afterTextNode: d
  };
}, I = (t) => {
  t[0].nodeValue = t[0].nodeValue.trimStart();
}, N = (t) => {
  const e = t[0].nodeValue.indexOf(`
`);
  if (e !== -1)
    return t[0].nodeValue = t[0].nodeValue.substring(e + 1), !0;
  for (t.shift(); t.length > 0; )
    if (t[0].nodeType !== Node.TEXT_NODE) t.shift();
    else return N(t);
  return !1;
}, a = (t, e) => {
  const s = t[0].nodeValue, r = s.indexOf("}");
  if (r !== -1) {
    const n = document.createTextNode(s.slice(0, r));
    return t[0].nodeValue = s.substring(r + 1), e.push(n), e;
  } else {
    for (e.push(t.shift()); t.length > 0; )
      if (t[0].nodeType !== Node.TEXT_NODE) e.push(t.shift());
      else return a(t, e);
    return null;
  }
}, z = (t) => {
  const e = t.prtrNodeList;
  let s = [], r = 100;
  for (; e.length > 0 && r-- > 0 && (I(e), e.length !== 0); ) {
    if (e[0].nodeType !== Node.TEXT_NODE) return null;
    const n = e[0].nodeValue;
    if (n.startsWith("%")) {
      if (e[0].nodeValue = n.substring(1), !N(e)) return null;
    } else if (n.startsWith("\\AXC{")) {
      e[0].nodeValue = n.substring(5);
      const o = a(e, []);
      if (o === null) return null;
      s.push({ type: "AXC", body: o });
    } else if (n.startsWith("\\UIC{")) {
      e[0].nodeValue = n.substring(5);
      const o = a(e, []);
      if (o === null) return null;
      s.push({ type: "UIC", body: o });
    } else if (n.startsWith("\\BIC{")) {
      e[0].nodeValue = n.substring(5);
      const o = a(e, []);
      if (o === null) return null;
      s.push({ type: "BIC", body: o });
    } else if (n.startsWith("\\TIC{")) {
      e[0].nodeValue = n.substring(5);
      const o = a(e, []);
      if (o === null) return null;
      s.push({ type: "TIC", body: o });
    } else if (n.startsWith("\\QuaternaryInfC{")) {
      e[0].nodeValue = n.substring(16);
      const o = a(e, []);
      if (o === null) return null;
      s.push({ type: "QuaternaryInfC", body: o });
    } else if (n.startsWith("\\RightLabel{")) {
      e[0].nodeValue = n.substring(12);
      const o = a(e, []);
      if (o === null) return null;
      s.push({ type: "RightLabel", body: o });
    } else if (n.startsWith("\\normalsize{")) {
      if (e[0].nodeValue = n.substring(12), a(e, []) === null) return null;
    } else if (n.startsWith("\\normalsize"))
      e[0].nodeValue = n.substring(11);
    else if (n.startsWith("\\small{")) {
      if (e[0].nodeValue = n.substring(7), a(e, []) === null) return null;
    } else if (n.startsWith("\\small"))
      e[0].nodeValue = n.substring(6);
    else if (n.startsWith("\\footnotesize{")) {
      if (e[0].nodeValue = n.substring(14), a(e, []) === null) return null;
    } else if (n.startsWith("\\footnotesize"))
      e[0].nodeValue = n.substring(13);
    else if (n.startsWith("\\scriptsize{")) {
      if (e[0].nodeValue = n.substring(12), a(e, []) === null) return null;
    } else if (n.startsWith("\\scriptsize"))
      e[0].nodeValue = n.substring(11);
    else if (n.startsWith("\\tiny{")) {
      if (e[0].nodeValue = n.substring(6), a(e, []) === null) return null;
    } else if (n.startsWith("\\tiny"))
      e[0].nodeValue = n.substring(5);
    else if (e[0].nodeValue.length === 0)
      e.shift();
    else
      return console.error("error: unrecognised charactor", e[0].nodeValue), null;
  }
  return s;
}, T = (t, e, s) => {
  const r = t[0];
  if (!r) return null;
  let n = [];
  r.type === "RightLabel" && (t.shift(), n = r.body);
  const o = [];
  for (let l = 0; l < s; l++) {
    const c = P(t);
    if (!c) return null;
    o.push(c);
  }
  return {
    type: "Sequent",
    premises: o.reverse(),
    rightLabel: n,
    conclusion: e
  };
}, P = (t) => {
  const e = t.shift();
  if (!e) return null;
  switch (e.type) {
    case "AXC":
      return { type: "Axiom", axiom: e.body };
    case "UIC":
      return T(t, e.body, 1);
    case "BIC":
      return T(t, e.body, 2);
    case "TIC":
      return T(t, e.body, 3);
    case "QuaternaryInfC":
      return T(t, e.body, 4);
  }
  return null;
}, $ = (t) => {
  const e = P(t.reverse());
  return t.length > 0 ? null : e;
}, g = (t, e) => {
  const s = document.createElement("div");
  return s.classList.add(f + t), (t === "axiom" || t === "right-label" || t === "conclusion") && (s.style.width = "max-content"), e.forEach((r) => s.appendChild(r)), s;
}, V = (t) => {
  switch (t.type) {
    case "Axiom":
      return g("axiom", t.axiom);
    case "Sequent":
      return g("sequent", [
        g("premises", t.premises.map(V)),
        g("horizontal-rule", [g("right-label", t.rightLabel)]),
        g("conclusion", t.conclusion)
      ]);
  }
}, S = (t) => g("proof-tree", [V(t)]), O = 20, w = 20, H = 10, M = (t) => t.reduce((e, s) => e + s, 0), E = (t) => {
  switch (t.type) {
    case "PSAxiom": {
      t.node.style.marginLeft = `${w}px`;
      return;
    }
    case "PSSequent": {
      const e = t.prtrStyleAux;
      t.node.style.width = `${e.w}px`, t.nodePremises.style.marginLeft = `${e.mlp}px`, t.nodeHR.style.width = `${e.whr}px`, t.nodeHR.style.marginLeft = `${e.mlhr}px`, t.nodeHR.style.marginRight = `${e.mrhr}px`, t.nodeLabel.style.right = `-${e.widthL}px`, t.nodeConclusion.style.width = `${e.widthC}px`, t.nodeConclusion.style.marginLeft = `${e.mlc}px`, t.premises.forEach(E);
      return;
    }
  }
}, W = (t) => {
  if (t.classList.contains(f + "axiom")) {
    const e = t.offsetWidth + w * 2;
    return {
      type: "PSAxiom",
      prtrStyleAux: {
        w: e,
        whr: e,
        mlc: 0,
        mrc: 0,
        mlhr: 0,
        mrhr: 0,
        widthC: e,
        widthL: 0,
        mlp: 0
      },
      node: t
    };
  } else if (t.classList.contains(f + "sequent")) {
    const e = t.children[0], s = t.children[1], r = s.children[0], n = t.children[2], o = Array.prototype.slice.apply(e.children), l = n.children[0].offsetWidth + w * 2, c = r.offsetWidth + H, m = o.map(W), i = m.map((d) => d.prtrStyleAux);
    o.length === 0 && console.error("error: empty premises", o);
    const u = M(i.map((d) => d.w)) + O * (i.length - 1) - i[0].mlc - i[i.length - 1].mrc;
    if (u > l) {
      const d = u, h = i[0].mlc, y = h + (u - l) / 2, p = Math.max(i[i.length - 1].mrc, c), b = p + (u - l) / 2;
      return {
        type: "PSSequent",
        prtrStyleAux: { w: d + h + p, whr: d, mlc: y, mrc: b, mlhr: h, mrhr: p, widthC: l, widthL: c, mlp: 0 },
        premises: m,
        node: t,
        nodePremises: e,
        nodeHR: s,
        nodeLabel: r,
        nodeConclusion: n
      };
    } else {
      const d = l, h = Math.max(i[0].mlc - (l - u) / 2, 0), y = Math.max((l - u) / 2 - i[0].mlc, 0), p = h, b = Math.max(i[i.length - 1].mrc - (l - u) / 2, c), x = b;
      return {
        type: "PSSequent",
        prtrStyleAux: { w: d + h + b, whr: d, mlc: p, mrc: x, mlhr: h, mrhr: b, widthC: l, widthL: c, mlp: y },
        premises: m,
        node: t,
        nodePremises: e,
        nodeHR: s,
        nodeLabel: r,
        nodeConclusion: n
      };
    }
  } else
    throw new Error("error");
}, R = (t) => {
  const e = W(t.children[0]);
  E(e);
};
export {
  B as renderProofTrees,
  X as renderProofTreesOnLoad
};
