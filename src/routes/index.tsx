import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronRight, Waves, Leaf, Fish, Recycle, ShieldCheck, Check, RotateCcw, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/")({ component: Index });

const problems = [
  { title: "Não toque nos corais nem nos animais", text: "Muitos corais crescem apenas cerca de 1 cm por ano. Ao tocar ou quebrar um coral, um mergulhador pode danificar anos de crescimento. O contato também pode ferir ou estressar outros animais marinhos.", image: "/public/images/Mergulho consciente_ não toque nos corais.png", imageAlt: "Mergulho consciente: mantenha distância dos corais" },
  { title: "Não alimente os peixes", text: "Quando recebem alimento de mergulhadores, os peixes podem mudar seus hábitos naturais de alimentação. Isso interfere em seu papel no ecossistema e pode desequilibrar a cadeia alimentar.", image: "/public/images/Não alimente os peixes marinhos.png", imageAlt: "Peixes marinhos que devem ser observados sem serem alimentados" },
  { title: "Mantenha as nadadeiras longe do fundo", text: "Ao bater as nadadeiras no solo, o mergulhador levanta areia e sedimentos. Essas partículas podem cobrir organismos marinhos, prejudicar alguns habitats e reduzir a entrada de luz na água.", image: "/public/images/Não perturbe o fundo do mar.png", imageAlt: "Proteção do fundo do mar contra sedimentos levantados pelas nadadeiras" },
  { title: "Controle a sua flutuabilidade", text: "Ajustar corretamente o colete equilibrador e o lastro ajuda a manter a estabilidade durante o mergulho. Sem esse controle, o mergulhador pode colidir com o fundo, quebrar corais e danificar habitats essenciais à vida marinha.", image: "/public/images/Flutuabilidade correta_ proteja o fundo do mar.png", imageAlt: "Mergulhador mantendo a flutuabilidade correta" },
  { title: "Não toque nos naufrágios", text: "O contato frequente pode acelerar a degradação dos naufrágios. Essas estruturas também servem de abrigo e fixação para organismos marinhos; tocá-los pode danificar esses seres e perturbar seus habitats.", image: "/public/images/Não Toque no Naufrágio Corroído.png", imageAlt: "Naufrágio marinho que deve ser preservado sem contato" },
];

const questions = [
  { q: "Qual é a melhor atitude ao observar um coral durante um mergulho?", a: ["Tocar de leve para sentir a textura", "Manter distância e controlar a flutuabilidade", "Apoiar a nadadeira para tirar uma foto", "Levar um pequeno fragmento como lembrança"], correct: 1, why: "Corais são animais frágeis. Um toque pode danificar seus tecidos e aumentar o risco de doenças." },
  { q: "Por que o plástico é um problema persistente no oceano?", a: ["Porque se dissolve instantaneamente", "Porque só afeta animais grandes", "Porque pode se fragmentar em microplásticos", "Porque transforma água salgada em doce"], correct: 2, why: "O plástico pode se fragmentar em partículas minúsculas que permanecem no ambiente e entram na cadeia alimentar." },
  { q: "O que é branqueamento de corais?", a: ["Uma limpeza natural feita por peixes", "A perda das algas que vivem em parceria com o coral", "O crescimento acelerado dos recifes", "Uma camada de areia sobre o recife"], correct: 1, why: "O estresse, especialmente o calor excessivo, pode levar o coral a perder as algas que lhe dão cor e energia." },
  { q: "Qual ação ajuda a reduzir o impacto climático?", a: ["Desperdiçar energia quando possível", "Queimar resíduos ao ar livre", "Reduzir desperdícios e emissões no dia a dia", "Descartar pilhas no lixo comum"], correct: 2, why: "Reduzir emissões e desperdícios ajuda a diminuir a pressão sobre o clima e os oceanos." },
  { q: "O que significa pesca excessiva?", a: ["Pescar somente para alimentação", "Capturar peixes mais rápido do que as populações conseguem se recuperar", "Proteger áreas de reprodução", "Observar peixes sem capturá-los"], correct: 1, why: "Quando a captura supera a capacidade de reposição das espécies, populações e ecossistemas ficam ameaçados." },
  { q: "Ao encontrar um animal marinho durante o mergulho, você deve…", a: ["Persegui-lo para conseguir uma foto", "Oferecer alimento", "Observar sem perseguir, tocar ou alimentar", "Bloquear sua passagem"], correct: 2, why: "Dar espaço aos animais evita estresse e permite que mantenham seu comportamento natural." },
  { q: "Por que controlar a flutuabilidade é importante?", a: ["Só para economizar tempo", "Para evitar contato acidental com o fundo e os organismos", "Para nadar sempre mais rápido", "Para dispensar o planejamento do mergulho"], correct: 1, why: "Boa flutuabilidade ajuda a evitar impactos em corais, sedimentos e outros habitats." },
  { q: "Como lidar com resíduos durante uma saída de mergulho?", a: ["Deixar na areia", "Enterrar o lixo", "Levar os resíduos de volta e descartá-los corretamente", "Jogar no mar se forem pequenos"], correct: 2, why: "Resíduos devem voltar com você e receber destinação adequada." },
  { q: "O que uma área marinha protegida pode ajudar a preservar?", a: ["Apenas a cor da água", "Habitats, espécies e locais de reprodução", "Somente embarcações", "A poluição dentro de suas fronteiras"], correct: 1, why: "Áreas protegidas bem planejadas podem dar espaço para habitats e populações marinhas se recuperarem." },
  { q: "Qual atitude combina com o Mar Sem Marcas?", a: ["Interagir com tudo", "Levar lembranças naturais", "Explorar com curiosidade, cuidado e impacto mínimo", "Priorizar fotos mesmo tocando no recife"], correct: 2, why: "A ideia é aproveitar o oceano com respeito à vida e aos ambientes marinhos." },
];

function Index() {
  const [step, setStep] = useState(0);
  const [screen, setScreen] = useState<"problems" | "quiz">("problems");
  const [animKey, setAnimKey] = useState(0);
  const [question, setQuestion] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState(questions);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizError, setQuizError] = useState("");
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const score = answers.reduce((total, answer, i) => total + (answer === quizQuestions[i]?.correct ? 1 : 0), 0);

  // Baixa a próxima ilustração enquanto a pessoa lê a atual, evitando espera ao avançar.
  useEffect(() => {
    const nextImage = problems[step + 1]?.image;
    if (!nextImage) return;
    const preload = new Image();
    preload.decoding = "async";
    preload.src = nextImage;
  }, [step]);

  const moveTo = (next: number) => {
    setAnimKey((key) => key + 1);
    setStep(next);
  };
  const startQuiz = async () => {
    setScreen("quiz");
    setQuestion(0);
    setAnswers([]);
    setDone(false);
    setQuizError("");
    setQuizLoading(true);
    try {
      const response = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: "preservação dos oceanos, mergulho responsável, biodiversidade marinha e poluição", count: 10 }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Não foi possível gerar o quiz agora.");
      if (!Array.isArray(payload.questions) || payload.questions.length !== 10) throw new Error("A IA retornou um quiz incompleto. Tente novamente.");
      setQuizQuestions(payload.questions);
    } catch (error) {
      setQuizError(error instanceof Error ? error.message : "Erro ao conectar com a IA.");
      setQuizQuestions(questions);
    } finally {
      setQuizLoading(false);
    }
  };
  const selectAnswer = (choice: number) => {
    const updated = [...answers];
    updated[question] = choice;
    setAnswers(updated);
  };
  const nextQuestion = () => {
    if (question === quizQuestions.length - 1) setDone(true);
    else setQuestion((q) => q + 1);
  };
  const resetQuiz = () => {
    void startQuiz();
  };

  return (
    <main className="mar">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
        :root { scroll-behavior:smooth; }
        * { box-sizing:border-box; }
        body { margin:0; background:#FAFCF9; }
        .mar { min-height:100vh; background:#FAFCF9; color:#082F3A; font-family:'DM Sans',sans-serif; }
        .mar button { font:inherit; cursor:pointer; }
        .mar button:focus-visible { outline:3px solid #50B9AD; outline-offset:3px; }
        .mar .primary:hover:not(:disabled) { background:#082F3A; transform:translateY(-1px); }
        .mar .subtle:hover:not(:disabled) { background:#E8F4EF; border-color:#50B9AD; }
        .mar button:disabled { cursor:not-allowed; opacity:.55; }
        .mar .answer.selected { border-color:#126E75; background:#E8F4EF; color:#082F3A; }
        .mar .answer:hover:not(.selected) { border-color:#50B9AD; background:#FAFCF9; }
        .mar .shell { width:min(820px,calc(100% - 36px)); margin:0 auto; padding-bottom:88px; }
        .mar .topbar { min-height:94px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #D7E8E4; padding:10px 2px; }
        .mar .brand { display:flex; align-items:center; gap:12px; color:#082F3A; text-decoration:none; font:800 20px/1 'Manrope',sans-serif; letter-spacing:-.045em; }
        .mar .brand-logo { display:block; width:84px; height:84px; object-fit:contain; flex:0 0 auto; }
        .mar .brand-wordmark { display:flex; flex-direction:column; justify-content:center; gap:4px; }
        .mar .brand-name { display:block; white-space:nowrap; }
        .mar .brand-name span { color:#50B9AD; }
        .mar .brand-caption { color:#52777A; font:600 9px/1.2 'DM Sans',sans-serif; letter-spacing:.16em; text-transform:uppercase; }
        .mar .intro { padding:58px 0 26px; text-align:center; }
        .mar .eyebrow { display:inline-flex; gap:8px; align-items:center; color:#126E75; font-size:10px; font-weight:800; letter-spacing:.15em; text-transform:uppercase; }
        .mar h1,.mar h2,.mar h3 { font-family:'Manrope',sans-serif; letter-spacing:-.055em; }
        .mar .intro h1 { font-size:clamp(36px,6vw,58px); line-height:1.06; margin:15px 0 14px; }
        .mar .intro p { max-width:500px; margin:0 auto; font-size:14px; line-height:1.8; color:#52777A; }
        .mar .problem-heading { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:18px 0 14px; color:#126E75; font-size:11px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; }
        .mar .progress-wrap { margin:0; }
        .mar .progress-label { display:flex; justify-content:space-between; gap:12px; margin-bottom:9px; color:#52777A; font-size:10px; font-weight:700; }
        .mar .progress { height:4px; border-radius:20px; background:#E8F4EF; overflow:hidden; }
        .mar .progress span { display:block; height:100%; border-radius:20px; background:#126E75; transition:width .55s cubic-bezier(.2,.8,.2,1); }
        .mar .problem-card { position:relative; overflow:hidden; min-height:0; padding:clamp(18px,3vw,30px) 0 0; border:0; border-radius:0; background:transparent; box-shadow:none; animation:oceanReveal .45s cubic-bezier(.16,1,.3,1) both; }
        @keyframes oceanReveal { 0% { opacity:.15; clip-path:inset(0 0 100% 0 round 27px); transform:translateY(22px) scale(.985); filter:blur(5px); } 55% { opacity:1; filter:blur(1px); } 100% { opacity:1; clip-path:inset(0 0 0 0 round 27px); transform:translateY(0) scale(1); filter:blur(0); } }
        @keyframes arrive { from { opacity:0; transform:translateY(13px) scale(.99); } to { opacity:1; transform:translateY(0) scale(1); } }
        .mar .problem-top { display:flex; justify-content:space-between; align-items:center; }
        .mar .problem-number { font:800 clamp(70px,12vw,112px)/.9 'Manrope',sans-serif; color:#082F3A; letter-spacing:-.09em; }
        .mar .problem-symbol { display:grid; place-items:center; width:47px; height:47px; border-radius:16px; background:#E8F4EF; color:#50B9AD; }
        .mar .problem-card h2 { max-width:610px; font-size:clamp(27px,4.5vw,40px); line-height:1.13; margin:22px 0 12px; }
        .mar .problem-card p { max-width:620px; margin:0; font-size:15px; line-height:1.9; color:#52777A; }
        .mar .illustration-area { position:relative; width:100%; margin:18px 0 0; overflow:visible; border-radius:0; background:transparent; isolation:isolate; -webkit-mask-image:linear-gradient(to bottom, #000 0%, #000 82%, transparent 100%); mask-image:linear-gradient(to bottom, #000 0%, #000 82%, transparent 100%); }
        .mar .illustration-image { position:relative; z-index:1; display:block; width:100%; height:auto; max-width:100%; object-fit:contain; object-position:center; animation:arrive .35s cubic-bezier(.16,1,.3,1) both; }
        .mar .actions { display:flex; justify-content:space-between; align-items:center; gap:14px; padding:20px 2px 0; }
        .mar .subtle { border:1px solid #C7DCD7; background:#FFFFFF; color:#126E75; font-size:12px; padding:13px 18px; border-radius:999px; transition:background .2s,border-color .2s; }
        .mar .subtle:hover { background:#E8F4EF; border-color:#50B9AD; }
        .mar .subtle:disabled { opacity:.45; cursor:not-allowed; }
        .mar .primary { display:inline-flex; justify-content:center; align-items:center; gap:10px; border:0; border-radius:999px; background:#126E75; color:white; padding:14px 21px; font-size:12px; font-weight:700; transition:transform .2s,background .2s; }
        .mar .primary:hover { background:#082F3A; transform:translateY(-1px); }
        .mar .primary:disabled { opacity:.45; cursor:not-allowed; transform:none; }
        .mar .quiz-panel { margin:20px 0 60px; border:1px solid #D7E8E4; border-radius:25px; background:#FFFFFF; padding:clamp(22px,4vw,36px); animation:arrive .35s ease both; }
        .mar .quiz-heading { display:flex; justify-content:space-between; align-items:center; gap:10px; color:#52777A; font-size:11px; margin-bottom:18px; }
        .mar .quiz-panel h2 { font-size:clamp(22px,4vw,29px); line-height:1.3; margin:0 0 20px; }
        .mar .answer { display:flex; align-items:center; gap:12px; width:100%; padding:13px; margin:8px 0; border:1px solid #D7E8E4; border-radius:13px; background:#FFFFFF; color:#082F3A; text-align:left; font-size:12px; line-height:1.5; }
        .mar .answer:hover { border-color:#50B9AD; }
        .mar .answer.selected { border-color:#126E75; background:#E8F4EF; }
        .mar .letter { display:grid; place-items:center; flex:0 0 27px; width:27px; height:27px; border-radius:9px; background:#E8F4EF; font-size:10px; font-weight:800; }
        .mar .answer.selected .letter { background:#126E75; color:#FFFFFF; }
        .mar .quiz-bottom { display:flex; align-items:center; justify-content:space-between; gap:10px; margin-top:23px; }
        .mar .quiz-bottom small { color:#52777A; font-size:11px; }
        .mar .result { text-align:center; padding:18px 0 8px; }
        .mar .result-icon { display:grid; place-items:center; width:62px; height:62px; border-radius:21px; background:#E8F4EF; color:#126E75; margin:0 auto 17px; }
        .mar .result h2 { margin:0 0 12px; font-size:30px; }
        .mar .score { margin:10px 0; color:#126E75; font:800 50px 'Manrope',sans-serif; letter-spacing:-.06em; }
        .mar .result p { color:#52777A; font-size:13px; line-height:1.8; }
        @media(max-width:560px) {
          .mar .topbar { min-height:80px; padding:8px 0; }
          .mar .brand { gap:9px; font-size:17px; }
          .mar .brand-logo { width:68px; height:68px; }
          .mar .brand-caption { font-size:8px; letter-spacing:.12em; }
          .mar .intro { padding:43px 0 20px; }
          .mar .problem-card { min-height:0; padding:18px 0 0; border:0; border-radius:0; background:transparent; box-shadow:none; }
          .mar .problem-card h2 { margin-top:18px; }
          .mar .problem-card p { font-size:14px; }
          .mar .problem-number { font-size:76px; }
          .mar .illustration-area { width:100%; height:auto; margin:18px 0 0; border-radius:0; background:transparent; }
          .mar .actions { align-items:stretch; }
          .mar .actions .primary { padding:13px 16px; }
        }
        @media(prefers-reduced-motion:reduce) { .mar *, .mar *:before, .mar *:after { animation:none!important; transition:none!important; scroll-behavior:auto!important; } }
      `}</style>

      <div className="shell">
        <header className="topbar">
          <a className="brand" href="/" aria-label="Mar Sem Marcas">
            <img className="brand-logo" src="/public/images/Emblema%20de%20Sa%C3%BAde%20e%20Ondas.png?v=3" alt="Logo Mar Sem Marcas" />
            <span className="brand-wordmark">
              <span className="brand-name">mar sem marcas<span>.</span></span>
              <span className="brand-caption">Preservar é deixar livre</span>
            </span>
          </a>
        </header>

        {screen === "problems" ? <>
          <div className="problem-heading"><span>Problemas do oceano</span><span>{String(step + 1).padStart(2,"0")} / 05</span></div>
          <div className="progress-wrap"><div className="progress"><span style={{width:(((step+1)/problems.length)*100)+"%"}}/></div></div>
          <article className="problem-card" key={animKey}>
            <div className="problem-top">
              <span className="problem-number">{step + 1}</span>
              <span className="problem-symbol">{step===0?<Waves size={23}/>:step===1?<Recycle size={23}/>:step===2?<Fish size={23}/>:step===3?<ShieldCheck size={23}/>:<Leaf size={23}/>}</span>
            </div>
            <h2>{problems[step]!.title}</h2>
            <p>{problems[step]!.text}</p>
            <div className="illustration-area">
              <img className="illustration-image" src={problems[step]!.image} alt={problems[step]!.imageAlt} loading="eager" fetchPriority="high" decoding="async" />
            </div>
          </article>
          <div className="actions">
            <button className="subtle" onClick={()=>moveTo(Math.max(0,step-1))} disabled={step===0}>← Voltar</button>
            {step < problems.length - 1
              ? <button className="primary" onClick={()=>moveTo(step+1)}>Próximo problema <ArrowRight size={15}/></button>
              : <button className="primary" onClick={startQuiz}>Fazer o Quiz <ArrowRight size={15}/></button>}
          </div>
        </> : <>
          <section className="intro" style={{paddingBottom:12}}>
            <span className="eyebrow"><CheckCircle2 size={13}/> Hora de testar o que aprendeu</span>
            <h1>Fazer o Quiz</h1>
            <p>Dez perguntas rápidas. Você precisa acertar pelo menos oito para atingir a meta.</p>
          </section>
          <div className="quiz-panel" key={done?"result":"question-"+question}>
            {quizLoading ? <div className="result"><div className="result-icon"><Waves size={30}/></div><h2>Preparando seu quiz...</h2><p>A IA está criando perguntas novas sobre a preservação dos oceanos.</p></div> : quizError ? <div className="result"><div className="result-icon"><Waves size={30}/></div><h2>Não foi possível conectar à IA</h2><p>{quizError}</p><button className="primary" onClick={()=>void startQuiz()}><RotateCcw size={15}/> Tentar novamente</button><div style={{marginTop:12}}><button className="subtle" onClick={()=>{setQuizQuestions(questions);setQuizError("");setQuestion(0);setAnswers([]);setDone(false)}}>Usar quiz de reserva</button></div></div> : !done ? <>
              <div className="quiz-heading"><span>PERGUNTA {String(question+1).padStart(2,"0")} / {quizQuestions.length}</span><span>{answers.filter(a=>a!==undefined).length} respondidas · IA</span></div>
              <div className="progress" style={{marginBottom:24}}><span style={{width:(((question+1)/quizQuestions.length)*100)+"%"}}/></div>
              <h2>{quizQuestions[question]!.q}</h2>
              {quizQuestions[question]!.a.map((answer,i)=><button key={answer} className={"answer"+(answers[question]===i?" selected":"")} onClick={()=>selectAnswer(i)}><span className="letter">{String.fromCharCode(65+i)}</span><span>{answer}</span>{answers[question]===i&&<Check size={15} style={{marginLeft:"auto",flexShrink:0}}/>}</button>)}
              <div className="quiz-bottom"><button className="subtle" onClick={()=>setScreen("problems")}>Voltar aos problemas</button><button className="primary" disabled={answers[question]===undefined} onClick={nextQuestion}>{question===quizQuestions.length-1?"Ver resultado":"Próxima pergunta"} <ChevronRight size={15}/></button></div>
            </> : <div className="result"><div className="result-icon">{score>=8?<CheckCircle2 size={30}/>:<Waves size={30}/>}</div><span className="eyebrow">{score>=8?"Meta atingida":"Continue aprendendo"}</span><h2>{score>=8?"Mandou bem!":"Vamos tentar de novo?"}</h2><div className="score">{score}<span style={{fontSize:20,color:"#52777A"}}>/10</span></div><p>{score>=8?"Você acertou pelo menos oito perguntas. Leve esse cuidado para cada mergulho.":"Você precisa de 8 acertos para atingir a meta. Revise os temas e tente novamente."}</p><button className="primary" onClick={resetQuiz}><RotateCcw size={15}/> Refazer o quiz</button><div style={{marginTop:12}}><button className="subtle" onClick={()=>{setScreen("problems");setStep(0);setAnimKey(k=>k+1)}}>Voltar aos problemas</button></div></div>}
          </div>
        </>}
      </div>
    </main>
  );
}
