import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowDownRight, ArrowLeft, ArrowRight, Check, Compass, Copy, Waves } from "lucide-react";

export const Route = createFileRoute("/")({ component: Index });

/* =========================================================
   CONTEÚDO — edite este array para alterar os cinco capítulos.
   ========================================================= */
const problems = [
  {
    title: <>Não toque nos <em>corais</em> nem nos animais</>,
    plainTitle: "Não toque nos corais nem nos animais",
    kicker: "Vida recifal · observação sem contato",
    text: "Um recife parece feito de pedra, mas está cheio de vida. Um toque pode ferir tecidos delicados, remover a camada protetora de um animal e aumentar o risco de doenças. Observe de perto — sem encostar.",
    stat: "≈ 1 cm/ano",
    statLabel: "crescimento de algumas espécies de coral",
    depth: "05 m",
    coordinate: "08°03′S 34°52′W",
    annotation: "Acropora · crescimento lento",
    image: "/public/images/Mergulho consciente_ não toque nos corais.png",
    imageAlt: "Ilustração de mergulho consciente, mantendo distância dos corais",
    stamp: "OBSERVE\nSEM TOCAR",
    note: "Um segundo de contato pode apagar anos de crescimento.",
    background: "#F4F1EA",
    foreground: "#06232B",
    muted: "#49656A",
  },
  {
    title: <>Não alimente os <em>animais</em> marinhos</>,
    plainTitle: "Não alimente os animais marinhos",
    kicker: "Fauna · comportamento natural",
    text: "Oferecer comida parece um gesto gentil, mas pode alterar a alimentação, aproximar animais de embarcações e aumentar a competição entre espécies. No mar, a melhor lembrança é deixar cada ser seguir seu próprio ritmo.",
    stat: "0 ofertas",
    statLabel: "de alimento durante o mergulho",
    depth: "10 m",
    coordinate: "08°04′S 34°51′W",
    annotation: "Fauna livre · distância respeitosa",
    image: "/public/images/Não alimente os peixes marinhos.png",
    imageAlt: "Peixes marinhos observados sem serem alimentados",
    stamp: "VIDA LIVRE\nVIDA SELVAGEM",
    note: "A curiosidade não precisa virar interferência.",
    background: "#DCE9E3",
    foreground: "#06232B",
    muted: "#3F6568",
  },
  {
    title: <>Não deixe <em>plástico</em> para trás</>,
    plainTitle: "Não deixe plástico para trás",
    kicker: "Resíduos · impacto persistente",
    text: "Embalagens e fragmentos podem permanecer no ambiente por muito tempo. Com o sol, as ondas e o desgaste, o plástico se divide em partículas menores que podem ser ingeridas por animais marinhos. Tudo o que desce com você precisa voltar com você.",
    stat: "1 resíduo",
    statLabel: "já é motivo para agir com responsabilidade",
    depth: "15 m",
    coordinate: "08°05′S 34°50′W",
    annotation: "Microplásticos · partículas persistentes",
    image: "/public/images/Não perturbe o fundo do mar.png",
    imageAlt: "Ilustração sobre proteção do fundo do mar e do habitat marinho",
    stamp: "TRAGA DE VOLTA\nNÃO DEIXE RASTRO",
    note: "Pequenas escolhas também chegam ao oceano.",
    background: "#A8C9C1",
    foreground: "#06232B",
    muted: "#244E54",
  },
  {
    title: <>Mantenha a <em>flutuabilidade</em> sob controle</>,
    plainTitle: "Mantenha a flutuabilidade sob controle",
    kicker: "Técnica · mergulho de baixo impacto",
    text: "Uma flutuabilidade estável ajuda você a passar pelo recife sem tocar no fundo, levantar sedimentos ou danificar organismos frágeis. Confira o lastro, ajuste o colete e pratique movimentos lentos antes de se aproximar da vida marinha.",
    stat: "0 contatos",
    statLabel: "meta de um mergulho consciente",
    depth: "20 m",
    coordinate: "08°06′S 34°49′W",
    annotation: "Controle fino · nadadeiras longe do fundo",
    image: "/public/images/Flutuabilidade correta_ proteja o fundo do mar.png",
    imageAlt: "Mergulhador mantendo a flutuabilidade correta sobre o fundo do mar",
    stamp: "MOVIMENTO\nCONSCIENTE",
    note: "Controle é cuidado — para você e para o habitat.",
    background: "#3D777B",
    foreground: "#F4F1EA",
    muted: "#D0E2DA",
  },
  {
    title: <>Não deixe marcas nos <em>recifes</em> e naufrágios</>,
    plainTitle: "Não deixe marcas nos recifes e naufrágios",
    kicker: "Patrimônio submerso · mínimo impacto",
    text: "Recifes e naufrágios são abrigo para muitas espécies e guardam histórias que não podem ser refeitas. Não ancore sobre corais, não retire objetos e não toque nas estruturas. Explore com respeito e deixe o lugar como encontrou.",
    stat: "0 marcas",
    statLabel: "o melhor vestígio da sua visita",
    depth: "25 m",
    coordinate: "08°07′S 34°48′W",
    annotation: "Habitat compartilhado · não tocar",
    image: "/public/images/Não Toque no Naufrágio Corroído.png",
    imageAlt: "Naufrágio submerso que deve ser observado sem contato",
    stamp: "PRESERVE\nO QUE ENCONTROU",
    note: "A melhor lembrança é um lugar intacto.",
    background: "#06232B",
    foreground: "#F4F1EA",
    muted: "#B4D0C8",
  },
];

const checklist = [
  "Conferi meu equipamento e minha flutuabilidade",
  "Vou manter distância dos corais e animais",
  "Não vou alimentar a fauna nem retirar lembranças",
  "Vou trazer de volta todos os meus resíduos",
  "Vou respeitar o local, a equipe e os limites do mergulho",
];

function Index() {
  const [step, setStep] = useState(0);
  const [surface, setSurface] = useState(false);
  const [checked, setChecked] = useState<boolean[]>(checklist.map(() => false));
  const [pledged, setPledged] = useState(false);
  const [copied, setCopied] = useState(false);
  const touchStart = useRef<number | null>(null);
  const current = problems[step]!;
  const theme = { background: "#F4F1EA", foreground: "#06232B", muted: "#49656A" };

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const win = window as any;
    const animate = () => {
      const run = () => {
        if (!win.gsap) return;
        if (win.ScrollTrigger) win.gsap.registerPlugin(win.ScrollTrigger);
        win.gsap.fromTo(".expedition-copy > *", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .8, stagger: .09, ease: "power2.out", clearProps: "transform" });
        win.gsap.fromTo(".artwork", { y: 14, opacity: 0, scale: .985 }, { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: "expo.out", clearProps: "transform" });
        win.gsap.utils.toArray(".stat-card, .pledge-card, .checklist").forEach((node: Element) => {
          win.gsap.fromTo(node, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: .7, ease: "power2.out", scrollTrigger: { trigger: node, start: "top 90%", once: true } });
        });
      };
      if (!win.gsap) return;
      if (win.ScrollTrigger) run();
      else if (!document.querySelector('script[data-scroll-trigger="expedition"]')) {
        const plugin = document.createElement("script");
        plugin.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";
        plugin.dataset.scrollTrigger = "expedition";
        plugin.onload = run;
        document.head.appendChild(plugin);
      } else run();
    };
    if (!document.querySelector('script[data-gsap="expedition"]')) {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
      script.dataset.gsap = "expedition";
      script.onload = animate;
      document.head.appendChild(script);
    } else animate();
    return () => {};
  }, [step, surface]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" && !surface) { event.preventDefault(); next(); }
      if (event.key === "ArrowLeft" && !surface) { event.preventDefault(); previous(); }
      if (event.key === "Escape" && surface) setSurface(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, surface]);

  function next() {
    if (step < problems.length - 1) setStep((value) => value + 1);
    else setSurface(true);
  }
  function previous() {
    if (surface) { setSurface(false); return; }
    setStep((value) => Math.max(0, value - 1));
  }
  async function share() {
    const message = "Mar Sem Marcas — Preservar é deixar livre. Prometo não deixar marcas.";
    try {
      if (navigator.share) await navigator.share({ title: "Mar Sem Marcas", text: message });
      else if (navigator.clipboard) { await navigator.clipboard.writeText(message); setCopied(true); window.setTimeout(() => setCopied(false), 2200); }
    } catch { /* O usuário pode cancelar o compartilhamento sem erro visual. */ }
  }

  return (
    <main className={"expedition" + (surface ? " surface-screen" : "")} style={{ "--paper": theme.background, "--ink": theme.foreground, "--muted": theme.muted } as CSSProperties}
      onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const delta = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
        if (Math.abs(delta) > 65) { if (delta < 0) next(); else previous(); }
        touchStart.current = null;
      }}>
      <div className="paper-noise" aria-hidden="true" />
      <div className="chart-grid" aria-hidden="true" />
      <div className="caustics" aria-hidden="true" />
      <div className="plankton" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/></div>

      <aside className="depth-ruler" aria-label={"Profundidade: " + (surface ? "superfície" : current.depth)}>
        <span className="ruler-label">PROFUNDIDADE</span>
        <div className="ruler-track"><span className="ruler-marker" style={{ top: surface ? "0%" : (step / 4 * 100) + "%" }}><span>{surface ? "0 m" : current.depth}</span></span></div>
      </aside>

      <div className="page-shell">
        <header className="masthead">
          <a className="wordmark" href="/" aria-label="Mar Sem Marcas — início">
            <img className="brand-logo" src="/public/images/Emblema%20de%20Sa%C3%BAde%20e%20Ondas.png" alt="" />
            <span>mar sem marcas<span className="coral-dot">.</span></span>
          </a>
          <div className="masthead-right"><span className="header-count">{surface ? "S / 05" : String(step + 1).padStart(2,"0") + " / 05"}</span></div>
        </header>

        {!surface ? <>
          <div className="chapter-bar">
            <span><Compass size={13} strokeWidth={1.5}/> PROBLEMAS DO OCEANO</span>
            
          </div>
          <div className="progress-segments" aria-label={"Problema " + (step + 1) + " de 5"}>
            {problems.map((item, index) => <span key={item.plainTitle} className={index <= step ? "filled" : ""} />)}
          </div>

          <section className="expedition-layout" key={step}>
            <div className="expedition-copy">
              <p className="field-kicker"><span className="note-label">NOTA <b className="note-number">{step + 1}</b></span><span className="kicker-divider">/ {current.kicker}</span></p>
              <h1>{current.title}</h1>
              <p className="description">{current.text}</p>
              <div className="stat-card">
                <span className="stat-label">OBSERVAÇÃO DE CAMPO</span>
                <strong>{current.stat}</strong>
                <span>{current.statLabel}</span>
              </div>
              <div className="field-note"><span className="note-rule" /><span>{current.note}</span></div>
              <div className="coordinate-line"><span>{current.coordinate}</span><span>PROF. {current.depth}</span></div>
            </div>

            <div className="artwork-column">
              <div className="artwork">
                <span className="giant-number" aria-hidden="true">{step + 1}</span>
                <div className="image-frame">
                  <img src={current.image} alt={current.imageAlt} className="field-illustration" />
                  <div className="image-vignette" />
                </div>
                
                <div className="round-stamp" aria-label={current.stamp.replace("\n", " ")}>
                  <svg viewBox="0 0 120 120" aria-hidden="true"><defs><path id="stamp-circle" d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0"/></defs><circle cx="60" cy="60" r="53"/><circle cx="60" cy="60" r="38"/><text><textPath href="#stamp-circle">PRESERVAR É DEIXAR LIVRE · MAR SEM MARCAS · </textPath></text></svg>
                  <Waves size={25} strokeWidth={1.2}/>
                  <small>{current.stamp.split("\n")[0]}</small>
                </div>
                <div className="artwork-caption"><span>FIG. 0{step + 1}</span></div>
              </div>
              <p className="mobile-annotation">{current.annotation} <span>— {current.depth}</span></p>
            </div>
          </section>

          <nav className="navigation" aria-label="Navegação entre problemas">
            <button className="back-button" onClick={previous} disabled={step === 0}><ArrowLeft size={15}/> Voltar</button>
            <span className="nav-hint">DESLIZE OU USE ← →</span>
            <button className="next-button" onClick={next}>
              {step === problems.length - 1 ? "Voltar à superfície" : "Descer mais fundo"}
              <ArrowDownRight size={17}/>
            </button>
          </nav>
          <footer className="page-footer"><span>MAR SEM MARCAS <b>·</b> CADERNO 01</span><span className="footer-coords">{current.coordinate} · PROF. {current.depth}</span></footer>
        </> : <>
          <section className="surface-content">
            <p className="field-kicker"><span>REGISTRO CONCLUÍDO</span> / FIM DA EXPEDIÇÃO</p>
            <h1>De volta à <em>superfície.</em></h1>
            <p className="surface-intro">O oceano não precisa de lembranças nossas. Precisa de espaço para continuar sendo ele mesmo.</p>
            <div className="pledge-card">
              <div className="pledge-seal"><Waves size={30} strokeWidth={1.2}/><span>COMPROMISSO DE CAMPO</span></div>
              <p>Eu escolho explorar com respeito.</p>
              <h2>Prometo não deixar <em>marcas.</em></h2>
              <button className={"pledge-button" + (pledged ? " pledged" : "")} onClick={() => setPledged(!pledged)} aria-pressed={pledged}>
                {pledged ? <><Check size={16}/> Compromisso assumido</> : <>Assumir compromisso <ArrowRight size={16}/></>}
              </button>
            </div>
            <div className="checklist">
              <div className="checklist-heading"><span>CHECKLIST DE MERGULHO RESPONSÁVEL</span><span>{checked.filter(Boolean).length} / {checklist.length}</span></div>
              {checklist.map((item, index) => <label className={"check-row" + (checked[index] ? " checked" : "")} key={item}>
                <input type="checkbox" checked={checked[index]} onChange={(event) => setChecked((values) => values.map((value, i) => i === index ? event.target.checked : value))}/>
                <span className="custom-check"><Check size={13}/></span><span>{item}</span>
              </label>)}
            </div>
            <div className="surface-actions">
              <button className="share-button" onClick={() => void share()}><Copy size={15}/>{copied ? "Mensagem copiada" : "Compartilhar compromisso"}</button>
              <button className="back-button" onClick={() => { setStep(0); setSurface(false); }}><ArrowLeft size={15}/> Revisitar o diário</button>
            </div>
          </section>
          <footer className="page-footer"><span>MAR SEM MARCAS <b>·</b> CADERNO 01</span><span>PRESERVAR É DEIXAR LIVRE.</span></footer>
        </>}
      </div>

      <style>{`
        /* 01 — TOKENS, PAPEL E BASE */
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        :root { --areia:#F4F1EA; --abissal:#06232B; --teal:#0F6E78; --coral:#FF6B4A; --agua-rasa:#8FD3C7; --mono:'IBM Plex Mono',monospace; --serif:'Fraunces',Georgia,serif; --sans:'DM Sans',sans-serif; }
        * { box-sizing:border-box; }
        html { background:var(--areia); scroll-behavior:smooth; }
        body { margin:0; }
        button,input { font:inherit; }
        button { cursor:pointer; }
        button:focus-visible,a:focus-visible,input:focus-visible + .custom-check { outline:3px solid var(--coral); outline-offset:4px; }
        .expedition { min-height:100svh; position:relative; overflow:hidden; isolation:isolate; background:var(--paper); color:var(--ink); font-family:var(--sans); transition:background-color 1s ease,color 1s ease; }
        .paper-noise { position:absolute; inset:0; z-index:-2; opacity:.035; pointer-events:none; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.92' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E"); }
        .chart-grid { position:absolute; inset:0; z-index:-3; pointer-events:none; opacity:.12; background-image:linear-gradient(to right,var(--muted) 1px,transparent 1px),linear-gradient(to bottom,var(--muted) 1px,transparent 1px); background-size:74px 74px; mask-image:linear-gradient(to bottom,black,transparent 90%); }
        .caustics { position:absolute; z-index:-2; width:70vw; height:70vw; right:-24vw; top:8%; border-radius:50%; pointer-events:none; opacity:.06; background:repeating-conic-gradient(from 10deg,transparent 0deg 8deg,var(--agua-rasa) 9deg 10deg,transparent 12deg 22deg); filter:blur(14px); animation:caustic-drift 26s ease-in-out infinite alternate; }
        @keyframes caustic-drift { to { transform:translate(-9vw,7vh) rotate(20deg) scale(1.12); } }
        .plankton { position:absolute; inset:0; z-index:-1; pointer-events:none; overflow:hidden; }
        .plankton i { position:absolute; width:3px; height:3px; border-radius:50%; background:var(--teal); opacity:.24; left:12%; bottom:-20px; animation:float-up 16s linear infinite; }
        .plankton i:nth-child(2) { left:26%; animation-delay:-4s; animation-duration:20s; }
        .plankton i:nth-child(3) { left:52%; animation-delay:-8s; animation-duration:17s; }
        .plankton i:nth-child(4) { left:71%; animation-delay:-11s; animation-duration:22s; }
        .plankton i:nth-child(5) { left:88%; animation-delay:-3s; animation-duration:19s; }
        .plankton i:nth-child(6) { left:43%; animation-delay:-14s; animation-duration:23s; width:2px;height:2px; }
        .plankton i:nth-child(7) { left:63%; animation-delay:-6s; animation-duration:18s; width:4px;height:4px; }
        @keyframes float-up { 0% { transform:translate3d(0,0,0); } 50% { transform:translate3d(28px,-50vh,0); } 100% { transform:translate3d(-12px,-110vh,0); } }

        /* 02 — LAYOUT E METADADOS DE CARTA NÁUTICA */
        .page-shell { width:min(1320px,calc(100% - 112px)); margin:0 auto; position:relative; }
        .masthead { min-height:100px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid color-mix(in srgb,var(--muted) 27%,transparent); }
        .wordmark { text-decoration:none; color:var(--ink); display:flex; flex-direction:column; gap:7px; }
        .wordmark > span { font:600 25px/.95 var(--serif); letter-spacing:-.055em; }
        .coral-dot { color:var(--coral); }
        .wordmark small,.masthead-right,.chapter-bar,.field-kicker,.stat-label,.coordinate-line,.artwork-caption,.round-stamp small,.page-footer,.nav-hint,.checklist-heading { font:500 9px/1.5 var(--mono); letter-spacing:.14em; text-transform:uppercase; }
        .wordmark small { color:var(--muted); font-size:8px; letter-spacing:.17em; }
        .masthead-right { display:flex; align-items:center; gap:9px; color:var(--muted); font-size:8px; }
        .status-dot { width:6px;height:6px;border-radius:50%;background:var(--coral); box-shadow:0 0 0 4px color-mix(in srgb,var(--coral) 13%,transparent); }
        .masthead-coords { margin-left:17px; padding-left:17px; border-left:1px solid color-mix(in srgb,var(--muted) 35%,transparent); }
        .chapter-bar { display:flex; align-items:center; justify-content:space-between; padding-top:25px; color:var(--muted); }
        .chapter-bar > span:first-child { display:flex; align-items:center; gap:9px; }
        .chapter-count { color:var(--ink); font-size:11px; }
        .chapter-count i { color:var(--coral); font-style:normal; margin:0 3px; }
        .progress-segments { display:grid; grid-template-columns:repeat(5,1fr); gap:5px; margin-top:12px; }
        .progress-segments span { height:2px; background:color-mix(in srgb,var(--muted) 25%,transparent); transition:background .6s ease; }
        .progress-segments span.filled { background:var(--coral); }

        /* 03 — COMPONENTES DO DIÁRIO */
        .expedition-layout { display:grid; grid-template-columns:minmax(0,5fr) minmax(0,7fr); gap:clamp(28px,5.5vw,88px); align-items:center; min-height:min(650px,calc(100svh - 240px)); padding:42px 0 32px; }
        .expedition-copy { position:relative; z-index:2; max-width:490px; }
        .field-kicker { color:var(--muted); font-size:9px; letter-spacing:.1em; margin:0 0 23px; }
        .field-kicker { display:flex; align-items:center; gap:12px; flex-wrap:wrap; }\n        .field-kicker .note-label { display:inline-flex; align-items:baseline; gap:7px; color:var(--coral); font-size:10px; letter-spacing:.14em; }\n        .field-kicker .note-number { font:500 clamp(42px,5vw,64px)/.78 var(--serif); letter-spacing:-.08em; color:var(--ink); }\n        .field-kicker .kicker-divider { color:var(--muted); }
        .expedition-copy h1,.surface-content h1 { font:400 clamp(43px,5.2vw,76px)/.99 var(--serif); letter-spacing:-.055em; margin:0 0 23px; max-width:560px; }
        .expedition-copy h1 em,.surface-content h1 em,.pledge-card h2 em { color:var(--teal); font-weight:400; }
        .expedition-copy .description { max-width:420px; font-size:14px; line-height:1.9; color:var(--muted); margin:0; }
        .stat-card { margin-top:30px; padding:17px 20px 18px; border-left:2px solid var(--coral); background:color-mix(in srgb,var(--paper) 83%,var(--muted) 17%); display:flex; flex-direction:column; align-items:flex-start; gap:4px; max-width:310px; }
        .stat-label { font-size:8px; color:var(--muted); }
        .stat-card strong { color:var(--ink); font:500 clamp(29px,3.5vw,43px)/1.15 var(--serif); letter-spacing:-.04em; }
        .stat-card > span:last-child { font-size:11px; color:var(--muted); line-height:1.5; }
        .field-note { display:flex; align-items:center; gap:12px; margin-top:22px; color:var(--muted); font:italic 12px/1.5 var(--serif); }
        .note-rule { width:25px;height:1px;background:var(--coral); flex:0 0 auto; }
        .coordinate-line { display:flex; gap:22px; margin-top:30px; padding-top:14px; border-top:1px solid color-mix(in srgb,var(--muted) 25%,transparent); color:var(--muted); font-size:8px; }
        .artwork-column { min-width:0; }
        .artwork { position:relative; min-height:480px; display:flex; align-items:center; justify-content:center; animation:art-float 5.5s ease-in-out infinite; }
        @keyframes art-float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
        .giant-number { position:absolute; z-index:0; left:-7%; top:-11%; font:500 clamp(170px,22vw,320px)/.9 var(--serif); letter-spacing:-.1em; color:transparent; -webkit-text-stroke:1px color-mix(in srgb,var(--muted) 42%,transparent); opacity:.6; user-select:none; }
        .image-frame { position:relative; z-index:1; width:112%; margin-right:-12%; filter:drop-shadow(0 24px 20px rgba(6,35,43,.12)); }
        .field-illustration { display:block; width:100%; height:auto; max-height:590px; object-fit:contain; mix-blend-mode:multiply; }
        .expedition[style*="#06232B"] .field-illustration { mix-blend-mode:normal; }
        .image-vignette { position:absolute; inset:0; pointer-events:none; background:linear-gradient(90deg,var(--paper) 0%,transparent 13%,transparent 85%,var(--paper) 100%); opacity:.12; }
        .annotation { position:absolute; z-index:3; top:18%; right:-4%; display:flex; align-items:center; gap:10px; color:var(--ink); font:italic 12px var(--serif); }
        .annotation-line { display:block; width:60px; height:1px; background:var(--coral); transform:rotate(-16deg); transform-origin:right; }
        .round-stamp { position:absolute; z-index:4; left:2%; bottom:7%; width:110px; height:110px; display:grid; place-items:center; color:var(--teal); transform:rotate(-12deg); }
        .round-stamp svg { position:absolute; inset:0; width:100%; height:100%; overflow:visible; fill:none; stroke:currentColor; stroke-width:.8; }
        .round-stamp svg text { fill:currentColor; stroke:none; font:6.6px var(--mono); letter-spacing:1.3px; }
        .round-stamp small { position:absolute; bottom:23px; font-size:6px; letter-spacing:.1em; text-align:center; }
        .artwork-caption { position:absolute; right:-1%; bottom:0; display:flex; gap:16px; color:var(--muted); font-size:8px; }
        .artwork-caption span:first-child { color:var(--coral); }
        .mobile-annotation { display:none; }
        .navigation { display:flex; align-items:center; justify-content:space-between; gap:16px; padding:20px 0 25px; border-top:1px solid color-mix(in srgb,var(--muted) 25%,transparent); }
        .back-button,.next-button,.share-button,.pledge-button { display:inline-flex; align-items:center; justify-content:center; gap:12px; min-height:48px; border:1px solid transparent; padding:0 18px; transition:background .25s,color .25s,border-color .25s,transform .25s; }
        .back-button { color:var(--ink); background:transparent; border-color:color-mix(in srgb,var(--muted) 32%,transparent); font-size:12px; }
        .back-button:disabled { opacity:.35; cursor:not-allowed; }
        .back-button:not(:disabled):hover { background:color-mix(in srgb,var(--paper) 70%,var(--muted) 30%); border-color:var(--teal); }
        .next-button,.share-button,.pledge-button { color:#F4F1EA; background:var(--teal); font-size:12px; font-weight:600; }
        .next-button svg { transition:transform .25s ease; }
        .next-button:hover { background:var(--abissal); transform:translateY(-2px); }
        .next-button:hover svg { transform:translate(3px,-3px); }
        .next-button:active,.share-button:active,.pledge-button:active { transform:scale(.98); }
        .nav-hint { color:var(--muted); font-size:8px; }
        .page-footer { display:flex; justify-content:space-between; gap:20px; padding:18px 0 24px; border-top:1px solid color-mix(in srgb,var(--muted) 22%,transparent); color:var(--muted); font-size:8px; }
        .page-footer b { color:var(--coral); }

        /* 04 — SUPERFÍCIE, CHECKLIST E COMPROMISSO */
        .surface-content { width:min(760px,100%); margin:0 auto; padding:64px 0 70px; }
        .surface-content h1 { font-size:clamp(52px,7vw,88px); max-width:650px; }
        .surface-intro { color:var(--muted); font-size:15px; line-height:1.8; max-width:520px; }
        .pledge-card { margin:38px 0; padding:clamp(24px,5vw,48px); border:1px solid color-mix(in srgb,var(--muted) 30%,transparent); position:relative; text-align:center; background:color-mix(in srgb,var(--paper) 85%,white 15%); }
        .pledge-seal { display:flex; flex-direction:column; align-items:center; gap:9px; color:var(--teal); }
        .pledge-seal span { font:500 8px var(--mono); letter-spacing:.16em; }
        .pledge-card > p { margin:27px 0 10px; color:var(--muted); font:italic 16px var(--serif); }
        .pledge-card h2 { font:400 clamp(30px,5vw,46px)/1.1 var(--serif); margin:0 auto 24px; letter-spacing:-.04em; }
        .pledge-button { min-height:46px; }
        .pledge-button:hover { background:var(--abissal); }
        .pledge-button.pledged { background:var(--abissal); }
        .checklist { margin:38px 0; }
        .checklist-heading { display:flex; justify-content:space-between; gap:10px; padding-bottom:14px; border-bottom:1px solid color-mix(in srgb,var(--muted) 35%,transparent); color:var(--muted); font-size:8px; }
        .checklist-heading span:last-child { color:var(--coral); }
        .check-row { display:flex; align-items:center; gap:13px; min-height:56px; border-bottom:1px solid color-mix(in srgb,var(--muted) 22%,transparent); font-size:13px; color:var(--ink); cursor:pointer; }
        .check-row input { position:absolute; opacity:0; width:1px;height:1px; }
        .custom-check { display:grid; place-items:center; flex:0 0 19px; width:19px;height:19px; border:1px solid color-mix(in srgb,var(--muted) 55%,transparent); color:transparent; transition:all .2s; }
        .check-row.checked .custom-check { background:var(--teal); border-color:var(--teal); color:white; }
        .check-row.checked > span:last-child { color:var(--muted); text-decoration:line-through; text-decoration-color:var(--coral); }
        .surface-actions { display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap; }
        .share-button { background:var(--abissal); }
        .share-button:hover { background:var(--teal); }
        .surface-screen .depth-ruler { opacity:.45; }
        .depth-ruler { position:fixed; z-index:5; top:27%; left:22px; height:44vh; min-height:260px; width:34px; color:var(--muted); font:8px var(--mono); transition:opacity .4s; }
        .ruler-label { position:absolute; top:-24px; left:0; writing-mode:vertical-rl; transform:rotate(180deg); font-size:7px; letter-spacing:.12em; }
        .ruler-track { position:absolute; top:0; left:15px; height:100%; width:1px; background:color-mix(in srgb,var(--muted) 40%,transparent); }
        .ruler-marker { position:absolute; left:-4px; width:9px;height:9px; border-radius:50%; background:var(--coral); border:2px solid var(--paper); transition:top .7s cubic-bezier(.2,.8,.2,1); }
        .ruler-tick { position:absolute; left:21px; transform:translateY(-50%); white-space:nowrap; }

        /* 05 — MOBILE-FIRST ADAPTATION AND ACCESSIBILITY */
        @media(max-width:900px) {
          .page-shell { width:calc(100% - 76px); }
          .depth-ruler { left:9px; transform:scale(.85); transform-origin:left center; }
          .expedition-layout { gap:25px; grid-template-columns:minmax(0,5fr) minmax(0,6fr); }
          .artwork { min-height:410px; }
          .annotation { right:-7%; }
          .annotation-line { width:35px; }
        }
        @media(max-width:650px) {
          .page-shell { width:calc(100% - 38px); margin-left:29px; }
          .masthead { min-height:80px; }
          .wordmark > span { font-size:22px; }
          .wordmark small { font-size:7px; }
          .masthead-right { font-size:0; gap:0; }
          .masthead-coords { display:none; }
          .status-dot { width:7px;height:7px; }
          .chapter-bar { padding-top:20px; font-size:8px; }
          .expedition-layout { display:flex; flex-direction:column; align-items:stretch; gap:0; min-height:0; padding:34px 0 20px; }
          .expedition-copy { max-width:none; }
          .field-kicker { margin-bottom:18px; font-size:8px; gap:9px; }\n          .field-kicker .note-label { font-size:8px; gap:5px; }\n          .field-kicker .note-number { font-size:clamp(42px,12vw,54px); }
          .expedition-copy h1 { font-size:clamp(44px,12vw,65px); margin-bottom:18px; max-width:520px; }
          .expedition-copy .description { font-size:13px; line-height:1.8; }
          .stat-card { margin-top:22px; padding:14px 17px; max-width:100%; }
          .stat-card strong { font-size:34px; }
          .field-note { margin-top:15px; }
          .coordinate-line { margin-top:20px; }
          .artwork { min-height:0; margin:14px -8px 0; animation-duration:6s; }
          .giant-number { top:-3%; left:0; font-size:clamp(145px,48vw,235px); }
          .image-frame { width:109%; margin-right:-9%; }
          .field-illustration { max-height:390px; }
          .annotation { display:none; }
          .round-stamp { width:88px;height:88px; left:3%; bottom:8%; }
          .round-stamp small { bottom:18px; font-size:5px; }
          .artwork-caption { right:2%; bottom:0; font-size:7px; }
          .mobile-annotation { display:block; margin:10px 0 0; color:var(--muted); font:italic 12px var(--serif); }
          .mobile-annotation span { font:8px var(--mono); text-transform:uppercase; }
          .navigation { margin-top:23px; padding:17px 0 21px; gap:8px; }
          .back-button,.next-button { min-height:45px; padding:0 12px; gap:7px; font-size:11px; }
          .nav-hint { display:none; }
          .page-footer { font-size:7px; gap:10px; }
          .page-footer span:last-child { text-align:right; max-width:45%; }
          .depth-ruler { top:33%; height:36vh; min-height:210px; transform:scale(.68); left:3px; }
          .surface-content { padding:45px 0 50px; }
          .surface-content h1 { font-size:clamp(49px,13vw,72px); }
          .surface-intro { font-size:14px; }
          .pledge-card { margin:28px 0; padding:28px 18px; }
          .check-row { font-size:12px; line-height:1.45; padding:10px 0; }
          .surface-actions { flex-direction:column; }
          .surface-actions button { width:100%; }
        }
        @media(prefers-reduced-motion:reduce) {
          *,*::before,*::after { animation:none!important; transition:none!important; scroll-behavior:auto!important; }
          .artwork { transform:none!important; }
        }

        /* 06 — REFINO DE HIERARQUIA: menos ruído, mais respiro */
        .expedition { --paper:#F4F1EA !important; --ink:#06232B !important; --muted:#49656A !important; }
        .chart-grid { opacity:.02; mask-image:linear-gradient(90deg,black,transparent 16%,transparent 84%,black); }
        .masthead { min-height:84px; border-bottom-color:rgba(6,35,43,.13); }
        .wordmark { gap:0; }
        .wordmark small { display:none; }
        .masthead-right { color:rgba(6,35,43,.55); font-size:10px; letter-spacing:.12em; }
        .header-count { font:500 10px var(--mono); letter-spacing:.12em; }
        .chapter-bar { padding-top:20px; color:rgba(6,35,43,.48); font-size:8px; }
        .chapter-bar svg { opacity:.65; }
        .progress-segments { margin-top:8px; gap:4px; }
        .progress-segments span { height:1px; background:rgba(6,35,43,.12); }
        .progress-segments span.filled { background:var(--coral); }
        .field-kicker { margin-bottom:20px; color:rgba(6,35,43,.5); font-size:8px; }
        .field-kicker > span:first-child { display:inline-block; margin-right:7px; color:var(--coral); }
        .expedition-copy h1 { font-size:clamp(2.4rem,4.5vw,4rem); line-height:1.08; max-width:560px; margin-bottom:24px; }
        .expedition-copy .description { color:#344F54; line-height:1.85; }
        .stat-card { margin-top:36px; padding:20px 22px; background:rgba(6,35,43,.035); }
        .stat-label { color:rgba(6,35,43,.48); }
        .field-note { margin-top:27px; color:#49656A; }
        .coordinate-line { margin-top:34px; color:rgba(6,35,43,.46); }
        .giant-number { display:none; }
        .artwork { min-height:470px; overflow:visible; animation-duration:5.5s; }
        .image-frame { width:100%; max-width:640px; margin:0 auto; filter:drop-shadow(0 20px 18px rgba(6,35,43,.10)); }
        .field-illustration { max-height:540px; object-fit:contain; mix-blend-mode:multiply; }
        .image-vignette { display:none; }
        .round-stamp { width:82px; height:82px; left:0; bottom:3%; color:var(--coral); opacity:.9; }
        .round-stamp svg { stroke-width:.65; }
        .round-stamp small { display:none; }
        .artwork-caption { right:0; bottom:-10px; color:rgba(6,35,43,.4); }
        .mobile-annotation { display:none; }
        .depth-ruler { width:24px; color:rgba(6,35,43,.5); }
        .ruler-label,.ruler-tick { display:none; }
        .ruler-track { left:10px; background:rgba(6,35,43,.22); }
        .ruler-marker { left:-3px; width:7px; height:7px; border:1px solid var(--areia); }
        .ruler-marker > span { position:absolute; left:12px; top:-5px; white-space:nowrap; color:rgba(6,35,43,.65); font:8px var(--mono); letter-spacing:.04em; }
        .navigation { margin-top:18px; padding:27px 0 28px; border-top-color:rgba(6,35,43,.14); }
        .back-button { color:rgba(6,35,43,.58); border-color:rgba(6,35,43,.22); }
        .page-footer { color:rgba(6,35,43,.48); border-top-color:rgba(6,35,43,.12); }
        .footer-coords { opacity:.4; font-size:7px; }
        .surface-content { padding-top:50px; }
        @media(max-width:900px) {
          .expedition-layout { grid-template-columns:minmax(0,5fr) minmax(0,6fr); gap:30px; }
          .artwork { min-height:400px; }
          .image-frame { width:100%; margin:0 auto; }
          .round-stamp { width:70px; height:70px; }
        }
        @media(max-width:650px) {
          .page-shell { width:calc(100% - 42px); margin-left:30px; }
          .masthead { min-height:72px; }
          .wordmark > span { font-size:22px; }
          .chapter-bar { padding-top:17px; }
          .expedition-layout { padding:28px 0 18px; }
          .expedition-copy h1 { font-size:clamp(2.4rem,10.5vw,3.4rem); line-height:1.08; margin-bottom:19px; max-width:100%; }
          .expedition-copy .description { font-size:13px; line-height:1.8; }
          .stat-card { margin-top:28px; padding:17px 18px; }
          .field-note { margin-top:23px; }
          .coordinate-line { margin-top:25px; }
          .artwork { min-height:0; margin:22px 0 0; padding-bottom:18px; }
          .image-frame { width:100%; max-width:430px; margin:0 auto; }
          .field-illustration { max-height:340px; }
          .round-stamp { width:62px; height:62px; left:0; bottom:5%; }
          .artwork-caption { bottom:0; }
          .navigation { margin-top:20px; padding:22px 0; }
          .depth-ruler { top:34%; left:2px; height:32vh; min-height:180px; transform:scale(.72); }
          .page-footer { padding-top:13px; }
          .footer-coords { font-size:6px; letter-spacing:.04em; }
        }

        /* 07 — LOGO E IMAGENS COM BORDAS SUAVES */
        .wordmark { flex-direction:row; align-items:center; gap:13px; }
        .brand-logo { display:block; width:64px; height:64px; flex:0 0 64px; object-fit:contain; border-radius:16px; }
        .image-frame { overflow:hidden; border-radius:30px; isolation:isolate; }
        .field-illustration { border-radius:30px; }
        @media(max-width:650px) {
          .wordmark { gap:10px; }
          .brand-logo { width:52px; height:52px; flex-basis:52px; border-radius:14px; }
          .wordmark > span { font-size:21px; }
          .image-frame { border-radius:23px; }
          .field-illustration { border-radius:23px; }
        }

                @media(max-height:760px) and (min-width:651px) {
          .expedition-layout { min-height:0; padding-top:26px; padding-bottom:22px; }
          .artwork { min-height:370px; }
          .field-illustration { max-height:420px; }
          .stat-card { margin-top:24px; }
          .field-note { margin-top:18px; }
        }

      `}</style>
    </main>
  );
}
