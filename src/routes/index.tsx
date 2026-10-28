import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowDown, ArrowRight, Check, ChevronRight, CircleHelp, Waves, Leaf,
  ShieldCheck, Fish, Recycle, Anchor, Menu, X, CheckCircle2, RotateCcw,
  Building2, Mail, Instagram, Send, Sparkles, Heart, Compass, Droplets
} from "lucide-react";

export const Route = createFileRoute("/")({ component: Index });

const topics = [
  { n: "01", icon: Waves, title: "O oceano em aquecimento", text: "Como as mudanças climáticas afetam a vida marinha e o equilíbrio dos recifes.", tag: "Clima & oceano", tone: "blue" },
  { n: "02", icon: Recycle, title: "Plástico não desaparece", text: "Do lixo na praia aos microplásticos que entram na cadeia alimentar.", tag: "Poluição marinha", tone: "sand" },
  { n: "03", icon: Heart, title: "Recifes de coral", text: "Por que esses ecossistemas são tão importantes — e como podemos protegê-los.", tag: "Biodiversidade", tone: "coral" },
  { n: "04", icon: Fish, title: "Pesca e vida marinha", text: "Entenda a pesca excessiva, as espécies ameaçadas e o consumo consciente.", tag: "Vida marinha", tone: "mint" },
  { n: "05", icon: ShieldCheck, title: "Mergulho responsável", text: "Boas práticas para explorar o fundo do mar sem deixar marcas.", tag: "Atitude na prática", tone: "navy" },
];

const questions = [
  { q: "Qual é a melhor atitude ao observar um coral durante um mergulho?", a: ["Tocar de leve para sentir a textura", "Manter distância e controlar a flutuabilidade", "Apoiar a nadadeira para tirar uma foto", "Levar um pequeno fragmento como lembrança"], correct: 1, why: "Corais são animais frágeis. Um toque pode danificar seus tecidos e aumentar o risco de doenças." },
  { q: "Por que o plástico é um problema persistente no oceano?", a: ["Porque se dissolve instantaneamente", "Porque só afeta animais grandes", "Porque pode se fragmentar em microplásticos", "Porque transforma água salgada em doce"], correct: 2, why: "O plástico pode se fragmentar em partículas minúsculas que permanecem no ambiente e entram na cadeia alimentar." },
  { q: "O que é branqueamento de corais?", a: ["Uma limpeza natural feita por peixes", "A perda das algas que vivem em parceria com o coral", "O crescimento acelerado dos recifes", "Uma camada de areia sobre o recife"], correct: 1, why: "O estresse, especialmente o calor excessivo, pode levar o coral a perder as algas que lhe dão cor e energia." },
  { q: "Qual ação ajuda a reduzir o impacto climático?", a: ["Desperdiçar energia quando possível", "Queimar resíduos ao ar livre", "Reduzir desperdícios e emissões no dia a dia", "Descartar pilhas no lixo comum"], correct: 2, why: "Pequenas escolhas somadas — junto a mudanças coletivas — ajudam a diminuir emissões e desperdício." },
  { q: "O que significa pesca excessiva?", a: ["Pescar somente para alimentação", "Capturar peixes mais rápido do que as populações conseguem se recuperar", "Proteger áreas de reprodução", "Observar peixes sem capturá-los"], correct: 1, why: "Quando a captura supera a capacidade de reposição das espécies, populações e ecossistemas ficam ameaçados." },
  { q: "Ao encontrar um animal marinho durante o mergulho, você deve…", a: ["Persegui-lo para conseguir uma foto", "Oferecer alimento", "Observar sem perseguir, tocar ou alimentar", "Bloquear sua passagem"], correct: 2, why: "Dar espaço aos animais evita estresse e permite que eles mantenham seu comportamento natural." },
  { q: "Por que controlar a flutuabilidade é importante?", a: ["Só para economizar tempo", "Para evitar contato acidental com o fundo e os organismos", "Para nadar sempre mais rápido", "Para dispensar o planejamento do mergulho"], correct: 1, why: "Boa flutuabilidade ajuda a evitar impactos em corais, sedimentos e outros habitats." },
  { q: "Qual é uma forma correta de lidar com resíduos durante uma saída de mergulho?", a: ["Deixar na areia para recolher depois", "Enterrar o lixo na praia", "Levar os resíduos de volta e descartá-los corretamente", "Jogar no mar se forem pequenos"], correct: 2, why: "Resíduos devem voltar com você e receber destinação adequada — nunca ser deixados na praia ou no mar." },
  { q: "O que uma área marinha protegida pode ajudar a preservar?", a: ["Apenas a cor da água", "Habitats, espécies e locais de reprodução", "Somente embarcações", "A poluição dentro de suas fronteiras"], correct: 1, why: "Quando bem planejadas e fiscalizadas, áreas protegidas dão espaço para habitats e populações marinhas se recuperarem." },
  { q: "Qual atitude combina com o princípio do Mar Sem Marcas?", a: ["Interagir com tudo para ter uma experiência completa", "Levar lembranças naturais do fundo do mar", "Explorar com curiosidade, cuidado e impacto mínimo", "Priorizar a foto mesmo que toque no recife"], correct: 2, why: "A ideia é aproveitar o oceano e sair deixando apenas bolhas — com respeito à vida e aos ambientes marinhos." },
];

function Index() {
  const [quizOpen, setQuizOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const score = answers.reduce((sum, answer, i) => sum + (answer === questions[i].correct ? 1 : 0), 0);
  const choose = (index: number) => {
    const next = [...answers];
    next[current] = index;
    setAnswers(next);
  };
  const nextQuestion = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
    else setFinished(true);
  };
  const resetQuiz = () => { setCurrent(0); setAnswers([]); setFinished(false); };
  const startQuiz = () => { resetQuiz(); setQuizOpen(true); };
  const submitContact = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent("Quero levar o Mar Sem Marcas para minha operação");
    const body = encodeURIComponent("Centro de mergulho: " + company + "\nE-mail: " + email + "\nMensagem: " + (message || "Gostaria de saber mais."));
    window.location.href = "mailto:ola@marsemmarcas.com?subject=" + subject + "&body=" + body;
    setSent(true);
  };

  return (
    <main className="msm">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
        :root { scroll-behavior:smooth; }
        * { box-sizing:border-box; }
        body { margin:0; }
        .msm { --ink:#092e3a; --ocean:#07566a; --sea:#0d8491; --foam:#eaf6f3; --paper:#fbfaf6; --muted:#5b7479; color:var(--ink); background:var(--paper); font-family:'DM Sans',sans-serif; overflow:hidden; }
        .msm h1,.msm h2,.msm h3,.msm .brand { font-family:'Manrope',sans-serif; letter-spacing:-.045em; }
        .msm a { color:inherit; text-decoration:none; }
        .msm button,.msm input,.msm textarea { font:inherit; }
        .msm button { cursor:pointer; }
        .msm .wrap { width:min(1160px,calc(100% - 48px)); margin:0 auto; }
        .msm .nav { display:flex; align-items:center; justify-content:space-between; height:82px; gap:24px; }
        .msm .brand { display:flex; align-items:center; gap:10px; font-size:19px; font-weight:800; letter-spacing:-.06em; }
        .msm .brand-mark { display:grid; place-items:center; width:37px; height:37px; border-radius:13px; color:#eaffff; background:var(--ocean); transform:rotate(-5deg); }
        .msm .navlinks { display:flex; align-items:center; gap:30px; font-size:13px; font-weight:600; color:#49656b; }
        .msm .navlinks a:hover { color:var(--sea); }
        .msm .btn { display:inline-flex; align-items:center; justify-content:center; gap:10px; padding:14px 19px; border-radius:999px; border:0; background:var(--ocean); color:white; font-weight:700; font-size:13px; transition:transform .2s,background .2s; }
        .msm .btn:hover { transform:translateY(-2px); background:#063f50; }
        .msm .btn.light { background:#fff; color:var(--ink); box-shadow:0 8px 30px #003f4a14; }
        .msm .btn.outline { background:transparent; color:var(--ocean); border:1px solid #bdd7d7; }
        .msm .hero { position:relative; padding:46px 0 70px; }
        .msm .hero-grid { display:grid; grid-template-columns:1fr .95fr; align-items:center; gap:54px; }
        .msm .eyebrow { display:inline-flex; align-items:center; gap:8px; padding:8px 12px; background:#e6f3ef; color:#247b7e; border:1px solid #d5eae5; border-radius:99px; font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:.12em; }
        .msm h1 { font-size:clamp(48px,6vw,78px); line-height:.99; margin:22px 0 22px; font-weight:800; }
        .msm h1 em { color:var(--sea); font-style:normal; }
        .msm .lead { max-width:490px; font-size:17px; line-height:1.75; color:var(--muted); margin:0 0 28px; }
        .msm .hero-actions { display:flex; flex-wrap:wrap; gap:12px; align-items:center; }
        .msm .micro { display:flex; align-items:center; gap:10px; color:#5a7378; font-size:12px; margin-top:26px; }
        .msm .avatars { display:flex; padding-left:4px; }
        .msm .avatars span { display:grid; place-items:center; width:29px; height:29px; margin-left:-5px; border:2px solid var(--paper); border-radius:50%; background:#c5e3dc; color:#164c56; font-size:10px; font-weight:800; }
        .msm .hero-art { position:relative; min-height:470px; border-radius:38px; overflow:hidden; background:linear-gradient(160deg,#0b8290 0%,#064858 58%,#052e3c 100%); box-shadow:0 28px 70px #063d4c22; }
        .msm .hero-art:before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 75% 20%,#6de2d155,transparent 35%),radial-gradient(ellipse at 12% 78%,#28a5ad55,transparent 42%); }
        .msm .sun { position:absolute; width:170px; height:170px; border-radius:50%; background:#c9eee0; top:46px; right:48px; opacity:.9; box-shadow:0 0 80px #b5fff666; }
        .msm .wave { position:absolute; width:150%; height:62%; left:-20%; bottom:-10%; border-radius:48% 52% 0 0 / 16% 20% 0 0; background:#0b6574; transform:rotate(-9deg); }
        .msm .wave.two { bottom:-23%; left:-10%; background:#0b5366; transform:rotate(7deg); border-radius:45% 55% 0 0 / 20% 15% 0 0; }
        .msm .wave.three { bottom:-36%; left:-15%; background:#083e52; transform:rotate(-3deg); }
        .msm .fish { position:absolute; color:#bdebe2; opacity:.92; }
        .msm .bubble { position:absolute; border:1px solid #b7f5ed80; border-radius:50%; }
        .msm .art-label { position:absolute; left:26px; bottom:25px; z-index:2; color:#e8fffb; }
        .msm .art-label small { text-transform:uppercase; letter-spacing:.18em; font-size:10px; opacity:.75; font-weight:700; }
        .msm .art-label strong { display:block; font:700 23px 'Manrope'; margin-top:5px; letter-spacing:-.04em; }
        .msm .floating-note { position:absolute; z-index:3; top:25px; left:24px; display:flex; gap:11px; align-items:center; border:1px solid #ffffff5e; background:#ffffffed; backdrop-filter:blur(12px); border-radius:16px; padding:12px 15px; box-shadow:0 14px 30px #002c3c22; }
        .msm .floating-note b { display:block; font-size:12px; letter-spacing:-.02em; }
        .msm .floating-note small { color:#60797c; font-size:10px; }
        .msm .note-icon { display:grid; place-items:center; width:35px; height:35px; background:#dff3ed; border-radius:11px; color:#16747b; }
        .msm .stats { display:grid; grid-template-columns:repeat(3,1fr); border-top:1px solid #dce9e4; border-bottom:1px solid #dce9e4; padding:25px 0; margin-top:0; }
        .msm .stat { display:flex; align-items:center; justify-content:center; gap:12px; border-right:1px solid #dce9e4; }
        .msm .stat:last-child { border:0; }
        .msm .stat-icon { display:grid; place-items:center; width:42px; height:42px; background:#e7f3ef; color:#147783; border-radius:14px; }
        .msm .stat b { display:block; font:800 19px 'Manrope'; letter-spacing:-.05em; }
        .msm .stat small { color:#718588; font-size:11px; }
        .msm .section { padding:100px 0; }
        .msm .section-head { display:flex; justify-content:space-between; align-items:end; gap:30px; margin-bottom:38px; }
        .msm .kicker { font-size:11px; text-transform:uppercase; letter-spacing:.16em; font-weight:800; color:#16838b; }
        .msm h2 { font-size:clamp(34px,4.3vw,53px); line-height:1.05; margin:13px 0 0; }
        .msm .section-intro { max-width:390px; font-size:14px; line-height:1.8; color:var(--muted); margin:0 0 4px; }
        .msm .topics { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        .msm .topic { min-height:250px; border:1px solid #e1eae5; border-radius:24px; background:#fffefa; padding:25px; transition:transform .25s,box-shadow .25s; }
        .msm .topic:hover { transform:translateY(-5px); box-shadow:0 18px 40px #154b5010; }
        .msm .topic-top { display:flex; justify-content:space-between; align-items:center; }
        .msm .topic-icon { display:grid; place-items:center; width:48px; height:48px; border-radius:16px; }
        .msm .topic-num { font:700 12px 'Manrope'; color:#a4b8b5; }
        .msm .topic h3 { font-size:20px; margin:25px 0 9px; letter-spacing:-.04em; }
        .msm .topic p { color:#60777a; font-size:13px; line-height:1.7; margin:0 0 18px; }
        .msm .topic-tag { color:#21818a; font-size:10px; font-weight:800; text-transform:uppercase; letter-spacing:.09em; }
        .msm .blue .topic-icon { background:#e1f1f5; color:#1b8194; } .msm .sand .topic-icon { background:#f5ecd9; color:#a67a36; } .msm .coral .topic-icon { background:#fbe7df; color:#c66b50; } .msm .mint .topic-icon { background:#e1f1e6; color:#4a906d; } .msm .navy .topic-icon { background:#e4eaf4; color:#526c9b; }
        .msm .quiz-section { background:#073b4a; color:#f4fffb; position:relative; }
        .msm .quiz-section:before { content:''; position:absolute; width:420px; height:420px; border-radius:50%; background:#0a7c8360; filter:blur(70px); right:-150px; top:-170px; }
        .msm .quiz-grid { position:relative; display:grid; grid-template-columns:.85fr 1.15fr; gap:70px; align-items:center; }
        .msm .quiz-section .kicker { color:#8ee2d4; }
        .msm .quiz-section h2 { color:#f4fffb; }
        .msm .quiz-section .section-intro { color:#b6d0d0; margin-top:20px; }
        .msm .quiz-points { display:grid; gap:15px; margin:27px 0 30px; }
        .msm .quiz-point { display:flex; align-items:center; gap:12px; color:#d7ece8; font-size:13px; }
        .msm .quiz-point svg { color:#8de2d4; }
        .msm .quiz-card { background:#fbfaf6; color:var(--ink); border-radius:26px; padding:28px; box-shadow:0 25px 80px #001e2c35; }
        .msm .quiz-top { display:flex; justify-content:space-between; align-items:center; gap:15px; margin-bottom:22px; }
        .msm .quiz-top small { color:#658084; font-size:11px; font-weight:700; }
        .msm .progress { height:5px; border-radius:10px; background:#dfebe6; overflow:hidden; margin:0 0 24px; }
        .msm .progress span { display:block; height:100%; background:#19949a; transition:width .2s; }
        .msm .quiz-card h3 { font-size:22px; line-height:1.3; margin:0 0 20px; letter-spacing:-.04em; }
        .msm .answer { width:100%; display:flex; align-items:center; gap:12px; text-align:left; padding:13px 14px; margin:8px 0; border:1px solid #dfe9e3; background:#fffefa; border-radius:13px; color:#284951; font-size:12px; line-height:1.45; transition:border .2s,background .2s; }
        .msm .answer:hover { border-color:#6eb8b4; }
        .msm .answer.selected { background:#e5f4ef; border-color:#198c8e; }
        .msm .answer-letter { display:grid; place-items:center; flex:0 0 27px; width:27px; height:27px; border-radius:9px; background:#eef3ef; font-size:10px; font-weight:800; }
        .msm .answer.selected .answer-letter { background:#147c83; color:white; }
        .msm .quiz-bottom { display:flex; justify-content:space-between; align-items:center; gap:12px; margin-top:22px; }
        .msm .quiz-bottom span { color:#6b8283; font-size:11px; }
        .msm .quiz-result { text-align:center; padding:18px 5px; }
        .msm .result-icon { width:68px; height:68px; display:grid; place-items:center; border-radius:22px; background:#e2f4ec; color:#168779; margin:0 auto 18px; }
        .msm .quiz-result h3 { font-size:30px; margin:0 0 10px; }
        .msm .quiz-result p { color:#647b7d; font-size:13px; line-height:1.7; }
        .msm .score { font:800 50px 'Manrope'; letter-spacing:-.06em; color:#11818a; margin:8px 0; }
        .msm .partner { background:#f0f6f0; }
        .msm .partner-grid { display:grid; grid-template-columns:1fr 1fr; gap:65px; align-items:center; }
        .msm .partner-visual { position:relative; min-height:390px; border-radius:30px; overflow:hidden; background:#d7e9df; padding:30px; display:flex; align-items:end; }
        .msm .partner-visual:before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 70% 20%,#f7f2d6 0 10%,transparent 10.5%),linear-gradient(155deg,#b8ddd1,#75b6b1 48%,#0b5666 49%,#063b4a); }
        .msm .partner-visual:after { content:''; position:absolute; width:130%; height:42%; bottom:-15%; left:-10%; border-radius:50% 50% 0 0; background:#084555; transform:rotate(-8deg); }
        .msm .partner-quote { position:relative; z-index:2; max-width:310px; background:#fffffff0; padding:21px; border-radius:18px; box-shadow:0 15px 35px #053e4b22; }
        .msm .partner-quote strong { display:block; font:800 19px 'Manrope'; letter-spacing:-.04em; }
        .msm .partner-quote span { display:block; color:#668084; font-size:12px; line-height:1.6; margin-top:8px; }
        .msm .partner-copy p { color:#60777a; font-size:14px; line-height:1.8; margin:20px 0 24px; }
        .msm .benefits { display:grid; gap:13px; margin:0 0 28px; }
        .msm .benefit { display:flex; gap:11px; align-items:center; font-size:13px; color:#35585e; }
        .msm .benefit svg { color:#198a8d; }
        .msm .contact-box { display:grid; grid-template-columns:.8fr 1.2fr; gap:60px; align-items:start; background:#fff; border:1px solid #e3ece6; border-radius:28px; padding:40px; }
        .msm .contact-box h2 { font-size:38px; }
        .msm .contact-box p { color:#60777a; font-size:13px; line-height:1.8; }
        .msm .contact-form { display:grid; grid-template-columns:1fr 1fr; gap:13px; }
        .msm .field { display:grid; gap:7px; }
        .msm .field.full { grid-column:1/-1; }
        .msm .field label { color:#49686d; font-size:11px; font-weight:800; }
        .msm .field input,.msm .field textarea { width:100%; border:1px solid #dce8e3; background:#fcfdfa; padding:13px 14px; border-radius:12px; color:var(--ink); outline:none; font-size:13px; }
        .msm .field input:focus,.msm .field textarea:focus { border-color:#399b9a; box-shadow:0 0 0 3px #399b9a18; }
        .msm .field textarea { min-height:90px; resize:vertical; }
        .msm .contact-form .btn { justify-self:start; }
        .msm .footer { padding:28px 0; border-top:1px solid #dce9e4; }
        .msm .footer-row { display:flex; justify-content:space-between; align-items:center; gap:20px; }
        .msm .footer p { font-size:11px; color:#789092; margin:0; }
        .msm .footer-links { display:flex; gap:18px; color:#668084; font-size:12px; }
        .msm .mobile-toggle { display:none; background:transparent; border:0; color:var(--ink); }
        @media(max-width:850px) { .msm .hero-grid,.msm .quiz-grid,.msm .partner-grid,.msm .contact-box { grid-template-columns:1fr; gap:36px; } .msm .hero-art { min-height:400px; } .msm .topics { grid-template-columns:repeat(2,1fr); } .msm .quiz-grid { gap:35px; } .msm .section { padding:75px 0; } .msm .contact-box { padding:28px; } .msm .navlinks { gap:15px; } }
        @media(max-width:600px) { .msm .wrap { width:min(100% - 32px,1160px); } .msm .nav { height:72px; } .msm .navlinks { display:none; position:absolute; z-index:20; top:66px; left:16px; right:16px; background:#fffefa; border:1px solid #dce9e4; border-radius:18px; padding:20px; box-shadow:0 18px 45px #063d4c1c; flex-direction:column; align-items:stretch; } .msm .navlinks.open { display:flex; } .msm .navlinks .btn { width:100%; } .msm .mobile-toggle { display:block; } .msm .nav > .btn { display:none; } .msm .hero { padding:28px 0 48px; } .msm .hero-grid { gap:32px; } .msm h1 { font-size:49px; } .msm .lead { font-size:15px; } .msm .hero-art { min-height:350px; border-radius:26px; } .msm .sun { width:130px; height:130px; right:30px; top:62px; } .msm .stats { grid-template-columns:1fr; gap:17px; padding:22px 0; } .msm .stat { justify-content:flex-start; border-right:0; padding-left:20%; } .msm .section-head { display:block; } .msm .section-intro { margin-top:18px; } .msm .topics { grid-template-columns:1fr; } .msm .topic { min-height:0; } .msm .section { padding:68px 0; } .msm .quiz-card { padding:20px; } .msm .quiz-card h3 { font-size:20px; } .msm .partner-visual { min-height:320px; padding:18px; } .msm .contact-box { padding:23px; } .msm .contact-box h2 { font-size:32px; } .msm .contact-form { grid-template-columns:1fr; } .msm .field.full { grid-column:auto; } .msm .footer-row { align-items:flex-start; flex-direction:column; } }
      `}</style>

      <header className="wrap nav">
        <a className="brand" href="#inicio" aria-label="Mar Sem Marcas, início">
          <span className="brand-mark"><Waves size={21} strokeWidth={2.3} /></span>
          <span>mar sem marcas<span style={{color:"#15929a"}}>.</span></span>
        </a>
        <nav className={"navlinks" + (mobileOpen ? " open" : "")}>
          <a href="#proposito" onClick={() => setMobileOpen(false)}>Nosso propósito</a>
          <a href="#trilhas" onClick={() => setMobileOpen(false)}>O que você aprende</a>
          <a href="#quiz" onClick={() => setMobileOpen(false)}>Quiz do oceano</a>
          <a href="#parcerias" onClick={() => setMobileOpen(false)}>Para centros de mergulho</a>
        </nav>
        <a className="btn" href="#parcerias">Seja parceiro <ArrowRight size={15} /></a>
        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Abrir menu">{mobileOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="hero" id="inicio">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow"><Sparkles size={13} /> Educação que protege o oceano</span>
            <h1>Explore o mar.<br />Deixe só <em>boas marcas.</em></h1>
            <p className="lead">Uma nova forma de aprender sobre o oceano antes de mergulhar. Conhecimento simples, escolhas conscientes e um futuro mais azul — dentro e fora d’água.</p>
            <div className="hero-actions">
              <a className="btn" href="#trilhas">Conheça as trilhas <ArrowRight size={16} /></a>
              <button className="btn outline" onClick={startQuiz}><CircleHelp size={16} /> Teste seus conhecimentos</button>
            </div>
            <div className="micro"><div className="avatars"><span>🌊</span><span>🐠</span><span>🪸</span></div><span>Aprenda hoje. Proteja em cada mergulho.</span></div>
          </div>
          <div className="hero-art" aria-label="Ilustração de um oceano profundo">
            <div className="sun" />
            <div className="bubble" style={{width:12,height:12,left:"18%",top:"27%"}} />
            <div className="bubble" style={{width:22,height:22,left:"28%",top:"42%"}} />
            <div className="bubble" style={{width:8,height:8,left:"44%",top:"22%"}} />
            <div className="bubble" style={{width:15,height:15,right:"17%",top:"46%"}} />
            <Fish className="fish" size={58} style={{top:"38%",left:"38%",transform:"rotate(-8deg)"}} />
            <Fish className="fish" size={32} style={{top:"53%",left:"20%",transform:"rotate(9deg)",opacity:.55}} />
            <Fish className="fish" size={25} style={{top:"31%",right:"18%",transform:"rotate(-4deg)",opacity:.55}} />
            <div className="wave" /><div className="wave two" /><div className="wave three" />
            <div className="floating-note"><span className="note-icon"><Leaf size={19}/></span><span><b>Conhecer é cuidar</b><small>Educação para um mar vivo</small></span></div>
            <div className="art-label"><small>Um compromisso de todos</small><strong>O oceano é a nossa casa.</strong></div>
          </div>
        </div>
      </section>

      <div className="wrap stats" id="proposito">
        <div className="stat"><span className="stat-icon"><Compass size={20}/></span><span><b>Aprender</b><small>Conhecimento antes da aventura</small></span></div>
        <div className="stat"><span className="stat-icon"><Droplets size={20}/></span><span><b>Respeitar</b><small>Menos impacto, mais consciência</small></span></div>
        <div className="stat"><span className="stat-icon"><Heart size={20}/></span><span><b>Preservar</b><small>O mar para as próximas gerações</small></span></div>
      </div>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div><span className="kicker">Por que Mar Sem Marcas?</span><h2>O melhor mergulho<br/>é aquele que respeita.</h2></div>
            <p className="section-intro">A experiência no oceano começa antes de colocar a máscara. Queremos transformar curiosidade em consciência — e consciência em atitudes que fazem diferença.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}} className="purpose-cards">
            <div style={{background:"#e8f3ed",borderRadius:22,padding:24}}><Waves size={25} color="#17858c"/><h3 style={{fontSize:20,margin:"18px 0 8px"}}>O oceano conecta tudo</h3><p style={{fontSize:13,color:"#597579",lineHeight:1.7,margin:0}}>Clima, alimento, biodiversidade e comunidades dependem de mares saudáveis.</p></div>
            <div style={{background:"#f4eee0",borderRadius:22,padding:24}}><Anchor size={25} color="#9c783e"/><h3 style={{fontSize:20,margin:"18px 0 8px"}}>Cada atitude conta</h3><p style={{fontSize:13,color:"#716c5e",lineHeight:1.7,margin:0}}>Uma boa prática durante o mergulho pode evitar danos a ambientes muito frágeis.</p></div>
            <div style={{background:"#e4eff1",borderRadius:22,padding:24}}><Leaf size={25} color="#397f78"/><h3 style={{fontSize:20,margin:"18px 0 8px"}}>Educação vira ação</h3><p style={{fontSize:13,color:"#597579",lineHeight:1.7,margin:0}}>Conteúdo direto e acessível para levar a conservação para além da água.</p></div>
          </div>
        </div>
      </section>

      <section className="section" id="trilhas" style={{paddingTop:20}}>
        <div className="wrap">
          <div className="section-head">
            <div><span className="kicker">Sua jornada azul</span><h2>Cinco temas.<br/>Um oceano para cuidar.</h2></div>
            <p className="section-intro">Trilhas curtas para entender as ameaças ao ambiente marinho e descobrir como cada mergulhador pode fazer parte da solução.</p>
          </div>
          <div className="topics">{topics.map((topic) => { const Icon = topic.icon; return <article className={"topic " + topic.tone} key={topic.n}><div className="topic-top"><span className="topic-icon"><Icon size={23}/></span><span className="topic-num">{topic.n} / 05</span></div><h3>{topic.title}</h3><p>{topic.text}</p><span className="topic-tag">{topic.tag}</span></article>; })}</div>
        </div>
      </section>

      <section className="section quiz-section" id="quiz">
        <div className="wrap quiz-grid">
          <div><span className="kicker">Aprender fazendo</span><h2>Você está pronto<br/>para mergulhar<br/>com consciência?</h2><p className="section-intro">Responda a 10 perguntas rápidas e descubra o quanto você já sabe sobre conservação marinha e boas práticas no mergulho.</p><div className="quiz-points"><div className="quiz-point"><CheckCircle2 size={18}/> 10 perguntas de múltipla escolha</div><div className="quiz-point"><CheckCircle2 size={18}/> Explicação depois de cada resposta</div><div className="quiz-point"><CheckCircle2 size={18}/> Meta de aprovação: 8 de 10</div></div><button className="btn light" onClick={startQuiz}>Começar o quiz <ArrowRight size={16}/></button><p style={{fontSize:10,color:"#8db4b6",marginTop:16}}>Demonstração educativa com perguntas de exemplo.</p></div>
          <div className="quiz-card">
            {!quizOpen ? <><div className="quiz-top"><span className="eyebrow"><Sparkles size={12}/> Desafio do oceano</span><small>~ 4 minutos</small></div><div className="progress"><span style={{width:"20%"}}/></div><h3>Pequenas escolhas podem proteger grandes ecossistemas.</h3><p style={{fontSize:13,color:"#678084",lineHeight:1.8}}>Teste seus conhecimentos e veja como suas atitudes ajudam a manter o oceano saudável. Preparado?</p><div style={{display:"flex",gap:10,alignItems:"center",marginTop:24,color:"#668084",fontSize:11}}><span className="topic-icon" style={{width:36,height:36,background:"#e5f3ed"}}><ShieldCheck size={18}/></span>Resultado na hora · Sem cadastro</div><button className="btn" style={{width:"100%",marginTop:24}} onClick={startQuiz}>Iniciar agora <ArrowRight size={16}/></button></> :
            finished ? <div className="quiz-result"><div className="result-icon">{score >= 8 ? <CheckCircle2 size={32}/> : <Waves size={32}/>}</div><span className="kicker">{score >= 8 ? "Missão cumprida" : "Continue aprendendo"}</span><h3>{score >= 8 ? "Você está no caminho certo!" : "O oceano ainda tem muito a ensinar."}</h3><div className="score">{score}<span style={{fontSize:20,color:"#7b9697"}}>/10</span></div><p>{score >= 8 ? "Parabéns! Você atingiu a meta de 8 acertos. Leve esse cuidado para cada mergulho." : "Você precisa de pelo menos 8 acertos para atingir a meta. Revise as explicações e tente novamente."}</p><button className="btn" onClick={resetQuiz}><RotateCcw size={15}/> Refazer quiz</button></div> :
            <><div className="quiz-top"><span className="eyebrow">Questão {current + 1} de 10</span><small>{answers.filter(a => a !== undefined).length} respondidas</small></div><div className="progress"><span style={{width:(((current+1)/questions.length)*100)+"%"}}/></div><h3>{questions[current].q}</h3><div>{questions[current].a.map((answer,i)=><button key={answer} className={"answer"+(answers[current]===i?" selected":"")} onClick={()=>choose(i)}><span className="answer-letter">{String.fromCharCode(65+i)}</span><span>{answer}</span>{answers[current]===i&&<Check size={16} style={{marginLeft:"auto",flexShrink:0}}/>}</button>)}</div><div className="quiz-bottom"><span>{current+1} / 10 perguntas</span><button className="btn" disabled={answers[current]===undefined} style={{opacity:answers[current]===undefined?.5:1}} onClick={nextQuestion}>{current===9?"Ver resultado":"Próxima"} <ChevronRight size={15}/></button></div></>}
          </div>
        </div>
      </section>

      <section className="section partner" id="parcerias">
        <div className="wrap partner-grid">
          <div className="partner-visual"><div className="partner-quote"><strong>Seu próximo mergulho começa com conhecimento.</strong><span>Leve educação ambiental para a experiência dos seus alunos e clientes.</span></div></div>
          <div className="partner-copy"><span className="kicker">Para centros de mergulho</span><h2>Seu centro.<br/>Seu jeito de ensinar.<br/><span style={{color:"#16878d"}}>O mesmo cuidado.</span></h2><p>O Mar Sem Marcas quer ser parceiro de quem apresenta o oceano ao mundo. Estamos construindo materiais educativos que podem ser adaptados à identidade e à realidade de cada operação.</p><div className="benefits"><div className="benefit"><CheckCircle2 size={18}/> Conteúdo educativo pré-mergulho</div><div className="benefit"><CheckCircle2 size={18}/> Quiz de aprendizagem e conscientização</div><div className="benefit"><CheckCircle2 size={18}/> Possibilidade de personalização para sua marca</div><div className="benefit"><CheckCircle2 size={18}/> Uma experiência mais completa para seus clientes</div></div><a className="btn" href="#contato">Vamos conversar <ArrowRight size={16}/></a></div>
        </div>
      </section>

      <section className="section" id="contato" style={{paddingTop:10}}>
        <div className="wrap contact-box">
          <div><span className="kicker">Vamos fazer parte da mudança?</span><h2>Leve o Mar Sem Marcas para o seu centro.</h2><p>Conte um pouquinho sobre sua operação. Queremos ouvir ideias, entender necessidades e construir essa experiência junto com você.</p><div style={{display:"flex",gap:10,alignItems:"center",color:"#638084",fontSize:12,marginTop:20}}><Mail size={17} color="#16878d"/> Fale com a equipe do projeto</div></div>
          <form className="contact-form" onSubmit={submitContact}>
            <div className="field"><label htmlFor="company">Nome do centro / operação</label><input id="company" required value={company} onChange={e=>setCompany(e.target.value)} placeholder="Ex.: Mergulho Azul"/></div>
            <div className="field"><label htmlFor="email">Seu e-mail</label><input id="email" type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="voce@empresa.com"/></div>
            <div className="field full"><label htmlFor="message">O que você tem em mente? (opcional)</label><textarea id="message" value={message} onChange={e=>setMessage(e.target.value)} placeholder="Quero saber mais sobre personalização..."/></div>
            <div className="field full"><button className="btn" type="submit">Enviar interesse <Send size={15}/></button>{sent&&<span style={{fontSize:11,color:"#168779"}}>Seu aplicativo de e-mail deve abrir para concluir o envio.</span>}<span style={{fontSize:10,color:"#809294"}}>O botão abre seu e-mail para você revisar e enviar a mensagem.</span></div>
          </form>
        </div>
      </section>

      <footer className="footer"><div className="wrap footer-row"><a className="brand" href="#inicio"><span className="brand-mark"><Waves size={19}/></span><span>mar sem marcas<span style={{color:"#15929a"}}>.</span></span></a><p>Feito com cuidado pelo oceano. 🌊</p><div className="footer-links"><a href="#proposito">Propósito</a><a href="#trilhas">Trilhas</a><a href="#contato">Contato</a></div></div></footer>
    </main>
  );
}
