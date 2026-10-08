import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Activity, ArrowDown, ArrowDownToLine, ArrowRight, ArrowUp, ArrowUpRight, Award, BriefcaseBusiness, Check, Code2, Copy, Database, GraduationCap, LayoutTemplate, MapPin, Menu, Sparkles, X } from 'lucide-react';
import { portfolio as content } from './content/portfolio';

type SectionKey = keyof typeof content.sections;
type Project = typeof content.projects[number];
const iconMap = { github: Code2, linkedin: BriefcaseBusiness, layout: LayoutTemplate, database: Database, sparkles: Sparkles, code: Code2 };

function Icon({ name }: { name: string }) {
  const Component = iconMap[name as keyof typeof iconMap] || ArrowUpRight;
  return <Component size={19} aria-hidden="true" />;
}

function ExternalLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}<ArrowUpRight size={15} aria-hidden="true" /></a>;
}

function SectionHeading({ section, number }: { section: SectionKey; number: string }) {
  const copy = content.sections[section];
  return <div className="section-heading"><div><span className="eyebrow"><span>{number}</span> / {copy.eyebrow}</span><h2>{copy.title}</h2></div>{copy.description && <p>{copy.description}</p>}</div>;
}

function ProjectArtwork({ project }: { project: Project }) {
  if (project.image) return <div className="project-art has-image"><img src={project.image} alt={project.imageAlt || project.name} loading="lazy" decoding="async" /></div>;
  return <div className={`project-art art-${project.artwork}`} aria-hidden="true">
    {project.artwork === 'editorial' ? <div className="mini-publication"><div className="publication-masthead"><span>{project.artworkTitle}</span><div className="publication-dots"><i /><i /><i /></div></div><div className="publication-body"><div className="publication-graphic"><span>i.</span></div><div className="publication-copy"><strong>{project.artworkCaption}</strong><div className="ink-line" /><div className="ink-line short" /></div></div></div> : <div className="data-art"><div className="signal-orbit"><Activity strokeWidth={1} /></div><strong>{project.artworkTitle}</strong><span>{project.artworkCaption}</span></div>}
  </div>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const visibleSections = (Object.keys(content.sections) as SectionKey[]).filter(key => content.sections[key].enabled);
  const number = (key: SectionKey) => String(visibleSections.indexOf(key) + 1).padStart(2, '0');
  const theme = Object.fromEntries(Object.entries(content.theme.colors).map(([key, value]) => [`--${key}`, value])) as CSSProperties;
  const emailLink = `mailto:${content.profile.email}?subject=${encodeURIComponent(content.contact.emailSubject)}`;

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) { setMenuOpen(false); menuButton.current?.focus(); }
    };
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOutside);
    return () => { document.removeEventListener('keydown', closeOnEscape); document.removeEventListener('pointerdown', closeOutside); };
  }, [menuOpen]);

  useEffect(() => () => { if (copyTimer.current) clearTimeout(copyTimer.current); }, []);

  async function copyEmail() {
    try { await navigator.clipboard.writeText(content.profile.email); setCopyStatus(content.labels.emailCopied); }
    catch { setCopyStatus(content.labels.copyFailed); }
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopyStatus(''), 4000);
  }

  return <div className="site" style={theme} id="home">
    <a href="#main" className="skip-link">{content.labels.skip}</a>
    <header className="site-header"><div className="container header-inner" ref={menuRef}>
      <a href="#home" className="wordmark" aria-label={`${content.profile.name} — ${content.labels.backToTop}`}>{content.profile.brand}<span>.</span></a>
      <button className="menu-toggle" ref={menuButton} type="button" aria-label={content.labels.menu} aria-expanded={menuOpen} aria-controls="site-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
      <nav id="site-nav" className={menuOpen ? 'navigation is-open' : 'navigation'} aria-label={content.labels.navigation}>
        {visibleSections.filter(key => content.sections[key].nav).map(key => <a key={key} href={`#${key}`} onClick={() => setMenuOpen(false)} className={key === 'contact' ? 'nav-contact' : ''}>{content.sections[key].nav}{key === 'contact' && <ArrowUpRight size={15} aria-hidden="true" />}</a>)}
        {content.profile.resume && <a className="nav-resume" href={content.profile.resume} download onClick={() => setMenuOpen(false)}>{content.labels.resume}<ArrowDownToLine size={15} aria-hidden="true" /></a>}
      </nav>
    </div></header>
    <main id="main" className="container">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          {content.profile.available && <div className="availability"><span className="status-dot" />{content.profile.availability}</div>}
          <div className="hero-greeting">{content.hero.greeting} <strong>{content.profile.name}.</strong></div>
          <h1 id="hero-title">{content.hero.title}<br /><em>{content.hero.accentTitle}</em></h1>
          <p className="hero-description">{content.hero.introduction}</p>
          <div className="hero-actions">{content.sections.work.enabled && <a href="#work" className="button button-primary">{content.hero.primaryAction}<ArrowUpRight size={18} aria-hidden="true" /></a>}{content.sections.contact.enabled && <a href="#contact" className="text-link">{content.hero.secondaryAction}<ArrowRight size={17} aria-hidden="true" /></a>}</div>
          <div className="hero-location"><MapPin size={14} aria-hidden="true" />{content.profile.location}</div>
        </div>
        <div className="hero-visual"><div className={`hero-art${content.profile.photo ? ' has-portrait' : ''}`}>{content.profile.photo ? <img src={content.profile.photo} alt={content.profile.photoAlt} className="portrait" fetchPriority="high" /> : <div className="monogram-art" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" /><span className="star star-one">✦</span><span className="star star-two">✧</span><span className="monogram">{content.profile.initials}</span><div className="art-grid" /></div>}<span className="art-caption">{content.hero.artCaption}</span></div><div className="visual-caption"><span className="caption-line" />{content.profile.role}</div></div>
      </section>
      <div className="hero-bottom"><div className="stats"><div className="stat"><strong>{String(content.experience.filter(job => job.kind === 'internship').length).padStart(2, '0')}</strong><span>{content.labels.internships}</span></div><div className="stat"><strong>{String(content.certifications.length).padStart(2, '0')}</strong><span>{content.labels.certifications}</span></div><div className="stat"><strong>{content.education.cgpa}</strong><span>{content.labels.cgpa}</span></div></div><span className="hero-footnote">{content.hero.eyebrow}</span></div>
      {content.sections.work.enabled && <section className="section" id="work" aria-labelledby="work-title"><div id="work-title"><SectionHeading section="work" number={number('work')} /></div><div className="project-grid">{content.projects.map(project => <article className="project" key={project.id}><ProjectArtwork project={project} /><div className="project-meta"><span className="eyebrow">{project.category}</span><span className="project-index">{String(content.projects.indexOf(project) + 1).padStart(2, '0')}</span></div><h3>{project.name}</h3><p>{project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-links">{project.sourceUrl && <ExternalLink href={project.sourceUrl}>{content.labels.source}</ExternalLink>}{project.demoUrl && <ExternalLink href={project.demoUrl}>{content.labels.demo}</ExternalLink>}</div><details className="project-details"><summary>{content.labels.projectDetails}<ArrowDown size={14} aria-hidden="true" /></summary><ul>{project.details.map(detail => <li key={detail}>{detail}</li>)}</ul></details></article>)}</div></section>}
      {content.sections.experience.enabled && <section className="section" id="experience"><SectionHeading section="experience" number={number('experience')} /><div className="experience-list">{content.experience.map(job => <article className="experience" key={`${job.company}-${job.dates}`}><div className="experience-date"><span>{job.dates}</span><span className="job-location">{job.location}</span></div><div className="experience-body"><h3>{job.role}</h3><span className="company">{job.company}</span><p>{job.description}</p><ul>{job.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul><div className="tags">{job.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><span className="experience-marker" aria-hidden="true"><ArrowUpRight size={22} /></span></article>)}</div></section>}
      {content.sections.skills.enabled && <section className="section" id="skills"><SectionHeading section="skills" number={number('skills')} /><div className="skill-grid">{content.skills.map(group => <article className="skill-group" key={group.title}><div className="skill-icon"><Icon name={group.icon} /></div><h3>{group.title}</h3><p>{group.description}</p><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div></section>}
      {content.sections.about.enabled && <section className="section about-section" id="about"><div><SectionHeading section="about" number={number('about')} />{content.about.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<div className="about-note"><span className="small-star" aria-hidden="true">✦</span>{content.about.note}</div></div><aside className="education"><div className="education-top"><span className="eyebrow">{content.labels.education}</span><GraduationCap size={26} strokeWidth={1.4} aria-hidden="true" /></div><h3>{content.education.institution}</h3><p>{content.education.degree}</p><div className="education-meta"><span>{content.education.dates}</span><span>{content.education.location}</span></div><div className="education-grade"><strong>{content.education.cgpa}</strong><span>{content.labels.cgpa}</span></div></aside></section>}
      {content.sections.certifications.enabled && <section className="section" id="certifications"><SectionHeading section="certifications" number={number('certifications')} /><div className="certifications">{content.certifications.map(certificate => <article className="certificate" key={`${certificate.issuer}-${certificate.title}`}><Award size={24} strokeWidth={1.3} aria-hidden="true" /><div><h3>{certificate.issuer}</h3><p>{certificate.title}</p>{certificate.url && <ExternalLink href={certificate.url}>{content.labels.credential}</ExternalLink>}</div></article>)}</div></section>}
      {content.sections.contact.enabled && <section className="contact-section" id="contact"><div className="contact-star" aria-hidden="true">✳</div><span className="eyebrow">{content.sections.contact.eyebrow}</span><h2>{content.sections.contact.title}</h2><p>{content.sections.contact.description}</p><a href={emailLink} className="button button-primary">{content.contact.action}<ArrowUpRight size={19} aria-hidden="true" /></a><div className="email-row"><a href={emailLink}>{content.profile.email}</a><button type="button" className="icon-button" onClick={copyEmail} aria-label={content.labels.copyEmail}>{copyStatus === content.labels.emailCopied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}</button></div><div className="copy-status" role="status">{copyStatus}</div><div className="contact-socials">{content.profile.socials.map(social => <ExternalLink key={social.label} href={social.url}><Icon name={social.icon} />{social.label}</ExternalLink>)}{content.profile.resume && <a href={content.profile.resume} download>{content.labels.downloadResume}<ArrowDownToLine size={16} aria-hidden="true" /></a>}</div></section>}
    </main>
    <footer className="site-footer container"><div><a className="wordmark" href="#home">{content.profile.brand}<span>.</span></a><span>© {new Date().getFullYear()} {content.profile.fullName}</span></div><p>{content.footer.note}</p><a className="back-top" href="#home" aria-label={content.labels.backToTop}><ArrowUp size={18} aria-hidden="true" /></a></footer>
  </div>;
}
