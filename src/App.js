import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, Github, Linkedin, Mail, MapPin, ExternalLink, Download,
  GraduationCap, Briefcase, Server, Code, Database, Wrench, ArrowDown, Lock, Users,
} from 'lucide-react';

const SECTIONS = [
  { id: 'home', label: 'Accueil' },
  { id: 'about', label: 'Parcours' },
  { id: 'skills', label: 'Compétences' },
  { id: 'projects', label: 'Projets' },
  { id: 'contact', label: 'Contact' },
];

const SKILLS = [
  { name: 'Back-end', icon: Server, items: ['Java', 'Spring Boot','Spring Security (JWT)', 'JPA / Hibernate', 'Maven', 'PHP', 'Laravel', 'Python', 'C/C++', 'API REST', 'Node.js','Kotlin'] },
  { name: 'Front-end', icon: Code, items: ['Angular', 'TypeScript','React', 'JavaScript', 'HTML / CSS', 'Bootstrap', 'JavaFX','Android'] },
  { name: 'Bases de données', icon: Database, items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase','SQL'] },
  { name: 'Outils & qualité', icon: Wrench, items: ['Git / GitHub', 'GitHub Actions', 'GitLab CI/CD', 'Docker', 'Docker Compose', 'Nginx', 'JUnit','Mockito', 'Jira'] },
];

const EXPERIENCES = [
  {
    role: 'Développeuse Web & Mobile',
    place: 'ADETIC (Agence de Développement des TIC) – Tchad',
    date: '2023 – 2024',
    points: [
      "Site institutionnel de la Caisse Nationale d'Assurance Santé (CNAS)",
      'Application web de gestion de clinique',
      "Espace d'administration sécurisé pour gérer les contenus",
    ],
    tech: 'PHP, Laravel, MySQL, Kotlin, XML',
  },
  {
    role: 'Stagiaire développeuse',
    place: 'SAADA Technology – Tchad',
    date: '2023',
    points: ['Développement des applications en équipe', "Participation à la gestion et à l'évaluation de projets logiciels"],
    tech: 'Java, Maven, JUnit, React, Node.js, MySQL, Git',
  },
  {
    role: 'Stage de fin d\'études',
    place: 'Université Virtuelle du Tchad',
    date: '2022 – 2023',
    points: ["Développement d'une plateforme de planification et de suivi-évaluation des activités pédagogiques virtuelles"],
    tech: 'PHP, Laravel, MySQL, Blade, Bootstrap, JavaScript',
  },
];

const FORMATION = [
  { title: 'Master 2 Informatique – Génie logiciel', place: 'Université de Bordeaux', date: '2026 – 2027' },
  { title: 'Master 1 Informatique', place: 'Université de Bordeaux', date: '2025 – 2026' },
  { title: 'Licence 3 Informatique générale', place: 'Université de Limoges', date: '2024 – 2025' },
  { title: 'Licence Informatique – option Génie logiciel', place: 'Ecole Nationale Supérieure des Technologies de l\'Information et de la Communication ', date: '2023' },
];

const GH = 'https://github.com/khadidja-ahmat';
const PROJECTS = [
    {
    title: 'Réservation de salles',
    tech: 'Java 21 · Spring Boot · Spring Security (JWT) · Angular · PostgreSQL · Docker',
    description: "Application web de réservation de salles : API REST Java / Spring Boot sécurisée (JWT), interface Angular (guard, intercepteur HTTP), tests JUnit, Mockito et MockMvc, conteneurisation Docker Compose et Nginx, pipeline GitHub Actions.",
    github: `${GH}/reservation-de-salles`,
  },
  {
    title: 'StageFlow',
    tech: 'Java 21 · Spring Boot · React · MySQL',
    description: 'Application web de suivi des candidatures de stage, avec API REST, persistance JPA/Hibernate et tests JUnit.',
    github: `${GH}/StageFlow`,
  },
  {
    title: 'StageFlow Deploy',
    tech: 'Docker · Docker Compose · GitHub Actions · Nginx · Prometheus · Grafana · MySQL',
     description: "Docker et CI/CD autour de StageFlow : Docker Compose, pipeline GitHub Actions (tests, test de bout en bout, publication des images), supervision Prometheus / Grafana et sauvegardes MySQL testées.",
    github: `${GH}/stageflow-deploy`,
  },
 {
    title: 'Quoridor',
    tech: 'Java 21 · JavaFX · Maven · JUnit · Minimax/MCTS',
    description: "Projet universitaire en équipe : jeu de Quoridor avec interface graphique, mode console, réseau et IA. J'ai réalisé les modules graph, network, CLI, GUI et persistance, ainsi que les tests associés.",
    team: true,
    soon: true,
  },
  {
    title: 'Programmation Web',
    tech: 'HTML · CSS · JavaScript · Node.js · Express · MongoDB',
    description: 'Programmation web du Master : jeu de cartes, blackjack, météo avec carte interactive, puis API REST avec Express et MongoDB (CRUD, authentification JWT, documentation Swagger).',
    github: `${GH}/programmation-web`,
    demo: 'https://khadidja-ahmat.github.io/programmation-web/',
  },
   {
    title: 'CoupDeMain',
    tech: 'Kotlin · Android · Firebase (Authentication, Realtime Database)',
    description: "Application Android d'entraide : comptes utilisateurs, services partagés en ligne, photo avec l'appareil, lien vers la carte, recherche, fragments et tests unitaires.",
    github: `${GH}/coupdemain`,
  },
 {
    title: 'ChariPHP',
    tech: 'PHP · MySQL · AJAX · Bootstrap',
    description: "Générateur d'applications web PHP/MySQL : site public, back-office sécurisé et modules CRUD générés automatiquement depuis les tables.",
    github: `${GH}/ChariPHP`,
  },

  {
    title: 'Clinique Espoir – Laravel',
    tech: 'Laravel · MySQL · API · Tests',
    description: 'Gestion de clinique (patients, rendez-vous, ordonnances) avec authentification, API et tests.',
    github: `${GH}/site-web-clinique_espoir`,
  },
  {
    title: 'Site de la CNAS',
    tech: 'Laravel · PHP · MySQL',
    description: "Site de la Caisse Nationale d'Assurance Santé : site visiteur en Laravel, administration en PHP natif.",
    github: `${GH}/Site_web_CNAS`,
  },
];

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setShown(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${shown ? 'reveal-on' : ''} ${className}`}>
      {children}
    </div>
  );
}

function Typing({ words }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState('');
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[i % words.length];
    const t = setTimeout(() => {
      if (!del) {
        setText(w.slice(0, text.length + 1));
        if (text.length + 1 === w.length) setTimeout(() => setDel(true), 1400);
      } else {
        setText(w.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDel(false); setI(i + 1); }
      }
    }, del ? 40 : 85);
    return () => clearTimeout(t);
  }, [text, del, i, words]);
  return <span className="text-violet-700">{text}<span className="caret">|</span></span>;
}

function SectionTitle({ kicker, children }) {
  return (
    <Reveal className="mb-14 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-violet-600 mb-2">{kicker}</p>
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">{children}</h2>
      <div className="mx-auto mt-4 h-1 w-14 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500" />
    </Reveal>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [progress, setProgress] = useState(0);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
      const cur = SECTIONS.find(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top <= 120 && r.bottom >= 120;
      });
      if (cur) setActive(cur.id);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <div className="bg-white text-slate-700">
      <div className="fixed left-0 top-0 z-[60] h-1 bg-gradient-to-r from-violet-600 to-fuchsia-500" style={{ width: `${progress}%` }} />
      {/* Navigation */}
      <nav className={`fixed top-0 z-50 w-full transition-all ${scrolled ? 'bg-white/95 backdrop-blur shadow-sm border-b border-violet-100' : 'bg-transparent'}`}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <button onClick={() => go('home')} className="text-lg font-extrabold text-violet-700">
            Khadidja<span className="text-fuchsia-500">.</span>
          </button>
          <div className="hidden md:flex gap-8">
            {SECTIONS.map((s) => (
              <button key={s.id} onClick={() => go(s.id)}
                className={`text-sm font-medium transition-colors hover:text-violet-700 ${active === s.id ? 'text-violet-700' : 'text-slate-600'}`}>
                {s.label}
              </button>
            ))}
          </div>
          <button className="md:hidden p-2 text-slate-700" aria-label="Menu" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {open && (
          <div className="md:hidden border-t border-violet-100 bg-white px-5 py-3">
            {SECTIONS.map((s) => (
              <button key={s.id} onClick={() => go(s.id)} className="block w-full py-3 text-left font-medium text-slate-700 hover:text-violet-700">
                {s.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Accueil */}
      <section id="home" className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-violet-50 via-white to-white px-5 pt-24 pb-16">
        <div className="blob absolute -left-24 top-24 h-72 w-72 rounded-full bg-violet-300/30 blur-3xl" />
        <div className="blob-2 absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-fuchsia-300/30 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.2fr_0.8fr]">
          <div className="order-2 md:order-1 text-center md:text-left">
            <p className="fade-up mb-3 inline-block rounded-full bg-violet-100 px-4 py-1 text-sm font-semibold text-violet-700">
              Disponible pour un stage de fin d'études dès mars 2027
            </p>
            <h1 style={{ animationDelay: '150ms' }} className="fade-up text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">
              Khadidja <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">Ahmat Hassan</span>
            </h1>
            <p style={{ animationDelay: '300ms' }} className="fade-up mt-4 min-h-[2rem] text-xl font-medium text-slate-700 md:text-2xl"><Typing words={['Développeuse Java / Angular', 'Java & Spring Boot', 'Docker & CI/CD', 'React & Node.js']} /></p>
            <p style={{ animationDelay: '450ms' }} className="fade-up mt-5 max-w-xl text-lg leading-relaxed text-slate-600 mx-auto md:mx-0">
              Étudiante en Master 2 Informatique, parcours Génie logiciel, à l'Université de Bordeaux. Je conçois des applications full-stack avec
              Java, Spring Boot, Angular et React, conteneurisées avec Docker et testées en CI.
            </p>
            <div style={{ animationDelay: '600ms' }} className="fade-up mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <button onClick={() => go('projects')} className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-7 py-3 font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:bg-violet-700">
                Voir mes projets <ArrowDown size={18} />
              </button>
              <a href="/CV_Khadidja_Ahmat_Hassan.pdf" download className="inline-flex items-center gap-2 rounded-full border-2 border-violet-600 px-7 py-3 font-semibold text-violet-700 transition hover:bg-violet-50">
                <Download size={18} /> Télécharger mon CV
              </a>
            </div>
            <div style={{ animationDelay: '750ms' }} className="fade-up mt-8 flex justify-center gap-4 md:justify-start">
              <a href={GH} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-slate-500 transition hover:text-violet-700"><Github size={26} /></a>
              <a href="https://www.linkedin.com/in/khadidjaahmat" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-500 transition hover:text-violet-700"><Linkedin size={26} /></a>
              <a href="mailto:ahmathassankhadidja@gmail.com" aria-label="Email" className="text-slate-500 transition hover:text-violet-700"><Mail size={26} /></a>
            </div>
          </div>
          <div className="order-1 md:order-2 mx-auto fade-in">
            <div className="relative float">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-violet-300 to-fuchsia-300 opacity-60 blur-xl" />
              <img src="/profile.jpg" alt="Khadidja Ahmat Hassan" className="relative h-72 w-60 rounded-[2rem] border-4 border-white object-cover object-top shadow-xl md:h-96 md:w-80" />
            </div>
          </div>
        </div>
      </section>

      {/* Parcours */}
      <section id="about" className="px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionTitle kicker="Parcours">Formation & expériences</SectionTitle>
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal><div className="rounded-2xl border border-violet-100 bg-white p-8 shadow-sm h-full">
              <div className="mb-6 flex items-center gap-3">
                <span className="rounded-xl bg-violet-100 p-3 text-violet-700"><GraduationCap size={26} /></span>
                <h3 className="text-xl font-bold text-slate-900">Formation</h3>
              </div>
              <ul className="space-y-6 border-l-2 border-violet-200 pl-6">
                {FORMATION.map((f) => (
                  <li key={f.title} className="relative">
                    <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-violet-600 ring-4 ring-white" />
                    <p className="font-semibold text-slate-900">{f.title}</p>
                    <p className="text-sm text-slate-500">{f.place} · {f.date}</p>
                  </li>
                ))}
              </ul>
            </div></Reveal>
            <Reveal delay={150}><div className="rounded-2xl border border-violet-100 bg-white p-8 shadow-sm h-full">
              <div className="mb-6 flex items-center gap-3">
                <span className="rounded-xl bg-fuchsia-100 p-3 text-fuchsia-700"><Briefcase size={26} /></span>
                <h3 className="text-xl font-bold text-slate-900">Expériences</h3>
              </div>
              <ul className="space-y-6 border-l-2 border-fuchsia-200 pl-6">
                {EXPERIENCES.map((e) => (
                  <li key={e.role + e.date} className="relative">
                    <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-fuchsia-500 ring-4 ring-white" />
                    <p className="font-semibold text-slate-900">{e.role}</p>
                    <p className="text-sm text-slate-500">{e.place} · {e.date}</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                      {e.points.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                    <p className="mt-2 text-xs font-medium text-violet-700">{e.tech}</p>
                  </li>
                ))}
              </ul>
            </div></Reveal>
          </div>
        </div>
      </section>

      {/* Compétences */}
      <section id="skills" className="bg-violet-50/60 px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionTitle kicker="Compétences">Technologies que j'utilise</SectionTitle>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SKILLS.map((c, i) => (
              <Reveal key={c.name} delay={i * 100}><div className="h-full rounded-2xl border border-violet-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-xl bg-violet-100 p-2.5 text-violet-700"><c.icon size={22} /></span>
                  <h3 className="font-bold text-slate-900">{c.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {c.items.map((s) => (
                    <span key={s} className="rounded-full bg-violet-50 px-3 py-1 text-sm font-medium text-violet-800">{s}</span>
                  ))}
                </div>
              </div></Reveal>
            ))}
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              ['Génie logiciel', 'Architecture MVC · API REST · SOLID · Agile/Scrum · tests unitaires'],
              ['Qualités', 'Autonomie · Curiosité · Travail d\'équipe · Résolution de problèmes'],
              ['Langues', 'Français · Anglais'],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 100}><div className="h-full rounded-2xl border border-violet-100 bg-white p-6 text-center shadow-sm">
                <h4 className="mb-2 font-bold text-violet-700">{t}</h4>
                <p className="text-sm text-slate-600">{d}</p>
              </div></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projets */}
      <section id="projects" className="px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionTitle kicker="Projets">Ce que j'ai réalisé</SectionTitle>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 100} className="h-full"><article
                role="button" tabIndex={0} aria-pressed={selected === p.title}
                onClick={() => setSelected(selected === p.title ? null : p.title)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(selected === p.title ? null : p.title); } }}
                className={`h-full flex cursor-pointer flex-col rounded-2xl border p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                  selected === p.title
                    ? 'border-violet-900 bg-gradient-to-br from-violet-950 via-violet-900 to-fuchsia-900 shadow-xl shadow-violet-900/30'
                    : 'border-violet-100 bg-white hover:border-violet-300'
                }`}>
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className={`text-lg font-bold transition-colors ${selected === p.title ? 'text-white' : 'text-slate-900'}`}>{p.title}</h3>
                  {p.team && (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-fuchsia-100 px-2.5 py-0.5 text-xs font-semibold text-fuchsia-700">
                      <Users size={12} /> En équipe
                    </span>
                  )}
                </div>
                <p className={`mb-3 text-xs font-semibold transition-colors ${selected === p.title ? 'text-fuchsia-300' : 'text-violet-700'}`}>{p.tech}</p>
                <p className={`flex-1 text-sm leading-relaxed transition-colors ${selected === p.title ? 'text-violet-100' : 'text-slate-600'}`}>{p.description}</p>
                <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
                  {p.github && (
                    <a href={p.github} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 ${selected === p.title ? 'text-white hover:text-fuchsia-200' : 'text-violet-700 hover:text-violet-900'}`}>
                      <Github size={16} /> Code <ExternalLink size={13} />
                    </a>
                  )}
                  {p.demo && (
                    <a href={p.demo} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 ${selected === p.title ? 'text-fuchsia-300 hover:text-fuchsia-100' : 'text-fuchsia-600 hover:text-fuchsia-800'}`}>
                      Démo en ligne <ExternalLink size={13} />
                    </a>
                  )}
                  {p.soon && (
                    <span className={`inline-flex items-center gap-1.5 ${selected === p.title ? 'text-violet-300' : 'text-slate-400'}`}><Lock size={14} /> Dépôt bientôt disponible</span>
                  )}
                </div>
              </article></Reveal>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-slate-500">
            Plus de projets sur <a className="font-semibold text-violet-700 hover:underline" href={GH} target="_blank" rel="noopener noreferrer">mon GitHub</a>.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-violet-50/60 px-5 py-24">
        <div className="mx-auto max-w-3xl">
          <SectionTitle kicker="Contact">Travaillons ensemble</SectionTitle>
          <Reveal><div className="rounded-2xl border border-violet-100 bg-white p-8 shadow-sm">
            <p className="mb-8 text-center text-lg text-slate-600">
              Je recherche un <strong className="text-violet-700">stage de fin d'études de 4 à 6 mois</strong> en développement logiciel,
              à partir du <strong className="text-violet-700">1er mars 2027</strong>.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: Mail, label: 'Email', value: 'ahmathassankhadidja@gmail.com', href: 'mailto:ahmathassankhadidja@gmail.com' },
                { icon: Linkedin, label: 'LinkedIn', value: 'khadidjaahmat', href: 'https://www.linkedin.com/in/khadidjaahmat' },
                { icon: Github, label: 'GitHub', value: 'khadidja-ahmat', href: GH },
                { icon: MapPin, label: 'Localisation', value: 'Talence (Bordeaux), France' },
              ].map((c) => {
                const inner = (
                  <>
                    <span className="mr-4 rounded-xl bg-violet-100 p-3 text-violet-700"><c.icon size={22} /></span>
                    <span className="min-w-0">
                      <span className="block text-xs text-slate-500">{c.label}</span>
                      <span className="block break-all font-semibold text-slate-900">{c.value}</span>
                    </span>
                  </>
                );
                return c.href ? (
                  <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    className="flex items-center rounded-xl border border-violet-100 p-4 transition hover:border-violet-300 hover:bg-violet-50">{inner}</a>
                ) : (
                  <div key={c.label} className="flex items-center rounded-xl border border-violet-100 p-4">{inner}</div>
                );
              })}
            </div>
            <div className="mt-8 text-center">
              <a href="/CV_Khadidja_Ahmat_Hassan.pdf" download className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-7 py-3 font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:bg-violet-700">
                <Download size={18} /> Télécharger mon CV (PDF)
              </a>
            </div>
          </div></Reveal>
        </div>
      </section>

      <footer className="border-t border-violet-100 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Khadidja Ahmat Hassan
      </footer>
    </div>
  );
}
