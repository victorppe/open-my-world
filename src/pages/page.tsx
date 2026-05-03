import { useEffect, useRef, useState, type FormEvent } from "react";

const Page = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formMsg, setFormMsg] = useState("");
  const [year] = useState(new Date().getFullYear());
  const statsRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const targets = [
      { key: "projetos", value: 120 },
      { key: "clientes", value: 38 },
      { key: "premios", value: 14 },
    ];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            targets.forEach(({ key, value }) => {
              let cur = 0;
              const step = Math.max(1, Math.round(value / 40));
              const id = setInterval(() => {
                cur = Math.min(value, cur + step);
                setCounts((c) => ({ ...c, [key]: cur }));
                if (cur >= value) clearInterval(id);
              }, 30);
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (!data.get("nome") || !data.get("email") || !data.get("mensagem")) {
      setFormMsg("Preencha todos os campos.");
      return;
    }
    setFormMsg("Mensagem enviada! Responderemos em breve.");
    e.currentTarget.reset();
  };

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", color: "#1a1a1a", background: "#faf8f3" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { color: inherit; text-decoration: none; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        .nav { position: sticky; top: 0; background: rgba(250,248,243,0.85); backdrop-filter: blur(10px); z-index: 50; border-bottom: 1px solid rgba(0,0,0,0.06); }
        .nav__inner { display: flex; align-items: center; justify-content: space-between; padding: 18px 0; }
        .brand { font-family: 'Instrument Serif', serif; font-size: 24px; }
        .nav__links { display: flex; gap: 32px; font-size: 14px; }
        .nav__links a:hover { opacity: 0.6; }
        .nav__toggle { display: none; background: none; border: 0; font-size: 22px; cursor: pointer; }
        .btn { display: inline-block; padding: 12px 22px; border-radius: 999px; font-size: 14px; font-weight: 500; transition: transform .2s, opacity .2s; cursor: pointer; border: 0; }
        .btn--primary { background: #1a1a1a; color: #faf8f3; }
        .btn--primary:hover { transform: translateY(-2px); }
        .btn--ghost { background: transparent; color: #1a1a1a; border: 1px solid #1a1a1a; }
        .hero { padding: 100px 0 80px; }
        .eyebrow { display: inline-block; font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; opacity: 0.6; margin-bottom: 24px; }
        .hero__title { font-family: 'Instrument Serif', serif; font-size: clamp(40px, 7vw, 88px); line-height: 1.05; font-weight: 400; margin-bottom: 24px; }
        .hero__title em { font-style: italic; color: #c44a2c; }
        .hero__lead { font-size: 18px; max-width: 560px; opacity: 0.75; margin-bottom: 40px; line-height: 1.5; }
        .hero__cta { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 80px; }
        .hero__stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; padding-top: 40px; border-top: 1px solid rgba(0,0,0,0.1); }
        .hero__stats strong { font-family: 'Instrument Serif', serif; font-size: 48px; font-weight: 400; display: block; }
        .hero__stats span { font-size: 13px; opacity: 0.6; }
        .section { padding: 100px 0; }
        .section--alt { background: #f0ece3; }
        .section--cta { background: #1a1a1a; color: #faf8f3; }
        .section__title { font-family: 'Instrument Serif', serif; font-size: clamp(32px, 5vw, 56px); font-weight: 400; margin-bottom: 56px; line-height: 1.1; }
        .grid { display: grid; gap: 24px; }
        .grid--3 { grid-template-columns: repeat(3, 1fr); }
        .grid--2 { grid-template-columns: repeat(2, 1fr); }
        .card { background: #fff; padding: 36px; border-radius: 16px; transition: transform .3s; }
        .card:hover { transform: translateY(-4px); }
        .card__icon { font-size: 28px; margin-bottom: 20px; color: #c44a2c; }
        .card h3 { font-family: 'Instrument Serif', serif; font-size: 24px; font-weight: 400; margin-bottom: 10px; }
        .card p { opacity: 0.7; font-size: 15px; line-height: 1.5; }
        .work { display: flex; flex-direction: column; justify-content: flex-end; aspect-ratio: 4/3; padding: 32px; border-radius: 16px; background: var(--c); cursor: pointer; transition: transform .3s; }
        .work:hover { transform: scale(1.02); }
        .work span { font-family: 'Instrument Serif', serif; font-size: 28px; }
        .work em { font-size: 13px; opacity: 0.7; font-style: normal; }
        .about { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
        .about p { font-size: 17px; line-height: 1.6; opacity: 0.8; margin-bottom: 24px; }
        .checklist { list-style: none; }
        .checklist li { padding: 12px 0; border-bottom: 1px solid rgba(0,0,0,0.08); font-size: 15px; }
        .checklist li::before { content: "✓ "; color: #c44a2c; font-weight: 700; }
        .cta { text-align: center; max-width: 640px; margin: 0 auto; }
        .cta h2 { font-family: 'Instrument Serif', serif; font-size: clamp(36px, 6vw, 64px); font-weight: 400; margin-bottom: 16px; }
        .cta p { opacity: 0.7; margin-bottom: 40px; }
        .form { text-align: left; display: grid; gap: 16px; }
        .form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form label { display: flex; flex-direction: column; gap: 6px; font-size: 13px; opacity: 0.8; }
        .form input, .form textarea { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #faf8f3; padding: 14px; border-radius: 10px; font-family: inherit; font-size: 15px; }
        .form input:focus, .form textarea:focus { outline: none; border-color: #c44a2c; }
        .form button { justify-self: start; background: #c44a2c; color: #fff; }
        .form__msg { font-size: 14px; opacity: 0.8; min-height: 20px; }
        .footer { padding: 40px 0; border-top: 1px solid rgba(0,0,0,0.08); font-size: 14px; }
        .footer__inner { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
        .footer__links { display: flex; gap: 24px; }
        @media (max-width: 768px) {
          .nav__links { display: ${menuOpen ? "flex" : "none"}; position: absolute; top: 100%; left: 0; right: 0; flex-direction: column; background: #faf8f3; padding: 24px; gap: 20px; border-bottom: 1px solid rgba(0,0,0,0.08); }
          .nav__toggle { display: block; }
          .nav .btn--primary { display: none; }
          .grid--3, .grid--2, .about, .form__row { grid-template-columns: 1fr; }
          .hero__stats { grid-template-columns: 1fr; gap: 16px; }
          .hero { padding: 60px 0; }
          .section { padding: 60px 0; }
        }
      `}</style>

      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <header className="nav">
        <div className="container nav__inner">
          <a href="#" className="brand">◆ Nova</a>
          <nav className="nav__links">
            <a href="#servicos" onClick={() => setMenuOpen(false)}>Serviços</a>
            <a href="#trabalhos" onClick={() => setMenuOpen(false)}>Trabalhos</a>
            <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a>
            <a href="#contato" onClick={() => setMenuOpen(false)}>Contato</a>
          </nav>
          <a href="#contato" className="btn btn--primary">Iniciar projeto</a>
          <button className="nav__toggle" aria-label="Menu" onClick={() => setMenuOpen((v) => !v)}>☰</button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <span className="eyebrow">Estúdio digital · Desde 2021</span>
            <h1 className="hero__title">
              Criamos <em>experiências</em> digitais<br />que vendem por você.
            </h1>
            <p className="hero__lead">
              Sites, produtos e marcas pensados do pixel ao código. Rápidos, acessíveis e com performance que importa.
            </p>
            <div className="hero__cta">
              <a href="#contato" className="btn btn--primary">Começar agora</a>
              <a href="#trabalhos" className="btn btn--ghost">Ver trabalhos →</a>
            </div>
            <div className="hero__stats" ref={statsRef}>
              <div><strong>{counts.projetos ?? 0}</strong><span>projetos entregues</span></div>
              <div><strong>{counts.clientes ?? 0}</strong><span>clientes felizes</span></div>
              <div><strong>{counts.premios ?? 0}</strong><span>prêmios recebidos</span></div>
            </div>
          </div>
        </section>

        <section id="servicos" className="section">
          <div className="container">
            <h2 className="section__title">O que fazemos</h2>
            <div className="grid grid--3">
              <article className="card"><div className="card__icon">✦</div><h3>Branding</h3><p>Identidades visuais com personalidade e sistema escalável.</p></article>
              <article className="card"><div className="card__icon">◐</div><h3>Web Design</h3><p>Interfaces sob medida, acessíveis e otimizadas para conversão.</p></article>
              <article className="card"><div className="card__icon">▲</div><h3>Desenvolvimento</h3><p>Código moderno, performático e fácil de manter. Sem firulas.</p></article>
            </div>
          </div>
        </section>

        <section id="trabalhos" className="section section--alt">
          <div className="container">
            <h2 className="section__title">Trabalhos selecionados</h2>
            <div className="grid grid--2">
              <a className="work" style={{ ["--c" as string]: "#f4d8a8" } as React.CSSProperties}><span>Lumen Café</span><em>Branding · Web</em></a>
              <a className="work" style={{ ["--c" as string]: "#cfe3d4" } as React.CSSProperties}><span>Orbit App</span><em>Produto · UX</em></a>
              <a className="work" style={{ ["--c" as string]: "#e7d4f0" } as React.CSSProperties}><span>Marés</span><em>E-commerce</em></a>
              <a className="work" style={{ ["--c" as string]: "#ffd0c2" } as React.CSSProperties}><span>Forma Studio</span><em>Portfólio</em></a>
            </div>
          </div>
        </section>

        <section id="sobre" className="section">
          <div className="container about">
            <div>
              <h2 className="section__title">Pequenos demais para terceirizar.<br />Grandes o bastante para entregar.</h2>
            </div>
            <div>
              <p>Somos um time enxuto formado por designers e engenheiros. Cuidamos de cada projeto como se fosse nosso próprio produto — do briefing à última linha de código.</p>
              <ul className="checklist">
                <li>Atendimento direto com quem faz</li>
                <li>Entregas por sprints curtas</li>
                <li>Foco em performance e SEO</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="contato" className="section section--cta">
          <div className="container cta">
            <h2>Vamos construir algo bom?</h2>
            <p>Conte um pouco sobre seu projeto. Respondemos em até 1 dia útil.</p>
            <form className="form" onSubmit={handleSubmit} noValidate>
              <div className="form__row">
                <label>Nome<input type="text" name="nome" required /></label>
                <label>Email<input type="email" name="email" required /></label>
              </div>
              <label>Mensagem<textarea name="mensagem" rows={4} required /></label>
              <button type="submit" className="btn btn--primary">Enviar mensagem</button>
              <p className="form__msg" role="status">{formMsg}</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <span>© {year} Nova Estúdio. Feito com ♥ no Brasil.</span>
          <div className="footer__links">
            <a href="#">Instagram</a>
            <a href="#">Behance</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;
