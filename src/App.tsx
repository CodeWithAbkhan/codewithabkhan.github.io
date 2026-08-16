import { lazy, Suspense, useEffect, useState } from "react";

const SystemScene = lazy(() => import("./SystemScene"));

type Project = {
  name: string;
  type: string;
  description: string;
  result: string;
  tags: string[];
  href: string;
  image?: string;
  imageAlt?: string;
  visual?: "pos";
  tone: "lime" | "blue" | "orange" | "ink";
};

const projects: Project[] = [
  {
    name: "MauiPOS",
    type: "Cross-platform product",
    description: "A point-of-sale foundation for desktop and mobile, designed around products, orders, and daily retail operations.",
    result: "One codebase · multi-device",
    tags: [".NET MAUI", "Blazor Hybrid", "POS"],
    href: "https://github.com/CodeWithAbkhan/MauiPOS",
    visual: "pos",
    tone: "lime",
  },
  {
    name: "Patient Operations",
    type: "Business system",
    description: "Role-aware patient records, files, reviews, search, and administration in a deployable healthcare workflow.",
    result: "SQL + Docker · production-shaped",
    tags: ["ASP.NET Core", "SQL Server", "Docker"],
    href: "https://github.com/CodeWithAbkhan/smpatients",
    image: "/images/projects/sm-patients-management-system-project-build-with-aspnet-core-dot-net-8-full-stack-docker-sql-server-image-deployed-on-vps-ubuntu-using-docker.png",
    imageAlt: "Patient management dashboard with navigation, metrics, and records",
    tone: "blue",
  },
  {
    name: "Prism Skygarden",
    type: "Interactive 3D experiment",
    description: "A procedural floating conservatory reconstructed from concept art as a navigable Three.js environment.",
    result: "Image-to-code · real-time 3D",
    tags: ["Three.js", "Procedural 3D", "WebGL"],
    href: "https://github.com/CodeWithAbkhan/prism-skygarden-v4",
    image: "/images/case-studies/prism-skygarden-night.webp",
    imageAlt: "Floating conservatory with illuminated glass domes at night",
    tone: "ink",
  },
  {
    name: "QWEN Ecommerce",
    type: "AI-assisted build",
    description: "A full ecommerce flow with catalog, account, admin, cart, and Stripe—built to test a context-engineering workflow.",
    result: "From prompt context to working product",
    tags: ["Blazor", ".NET", "Stripe"],
    href: "https://github.com/CodeWithAbkhan/EbikeSore-QWEN",
    image: "/images/case-studies/ebike-qwen.webp",
    imageAlt: "Ebike ecommerce storefront and admin dashboard",
    tone: "orange",
  },
];

const services = [
  {
    number: "01",
    title: "Agent systems that operate",
    description: "Chief-and-worker agent flows, OpenClaw setup, browser operations, research loops, and human approval where mistakes matter.",
    tags: ["OpenClaw", "Tool use", "Human review"],
  },
  {
    number: "02",
    title: "AI inside business software",
    description: "Add natural-language reporting, assisted workflows, search, and automation to POS, healthcare, inventory, or custom operations tools.",
    tags: ["Agents", "APIs", "Business logic"],
  },
  {
    number: "03",
    title: "Cross-platform product builds",
    description: "Responsive web, desktop, and mobile products backed by reliable .NET services and databases—not disconnected prototypes.",
    tags: [".NET", "Blazor", "MAUI"],
  },
  {
    number: "04",
    title: "Data architecture & rescue",
    description: "Schema design, ERDs, SQL performance, migrations, and careful modernization of software that already runs a real business.",
    tags: ["SQL Server", "PostgreSQL", "System design"],
  },
];

function Arrow({ diagonal = true }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function PosVisual() {
  return (
    <div className="pos-visual" aria-label="Illustrated MauiPOS product interface" role="img">
      <div className="pos-topbar">
        <span>MAUI / POS</span>
        <span className="pos-live"><i /> REGISTER ONLINE</span>
      </div>
      <div className="pos-body">
        <div className="pos-products">
          <div className="pos-filter"><b>All items</b><span>Food</span><span>Drinks</span></div>
          <div className="pos-grid">
            <div><i>◎</i><b>Daily bowl</b><span>$8.50</span></div>
            <div><i>◒</i><b>House coffee</b><span>$3.20</span></div>
            <div><i>◇</i><b>Fresh plate</b><span>$6.90</span></div>
            <div><i>△</i><b>Quick bite</b><span>$4.40</span></div>
          </div>
        </div>
        <div className="pos-order">
          <span>ORDER / 024</span>
          <div><b>Daily bowl × 2</b><em>$17.00</em></div>
          <div><b>House coffee</b><em>$3.20</em></div>
          <hr />
          <div className="pos-total"><b>Total</b><em>$20.20</em></div>
          <button type="button" tabIndex={-1}>Take payment →</button>
        </div>
      </div>
      <small>SYSTEM VIEW / ILLUSTRATED</small>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className={`project-card project-${project.tone} ${index === 0 ? "project-featured" : ""}`} data-reveal>
      <a className="project-visual" href={project.href} target="_blank" rel="noreferrer" aria-label={`View ${project.name} on GitHub`}>
        {project.visual === "pos" ? (
          <PosVisual />
        ) : (
          <img src={project.image} alt={project.imageAlt} loading="lazy" />
        )}
        <span className="project-open"><Arrow /></span>
      </a>
      <div className="project-copy">
        <div className="project-heading">
          <span className="eyebrow">{project.type}</span>
          <h3>{project.name}</h3>
        </div>
        <p>{project.description}</p>
        <div className="project-result">{project.result}</div>
        <ul className="tag-list" aria-label={`${project.name} technologies`}>
          {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
      </div>
    </article>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <a className="brand" href="#top" onClick={closeMenu} aria-label="CodeWithABKhan home">
          <span>AB</span><i>/</i><span>KHAN</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
          <i aria-hidden="true" />
        </button>
        <nav id="site-nav" className={menuOpen ? "nav-open" : ""} aria-label="Primary navigation">
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Start a project <Arrow /></a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-copy">
            <div className="availability"><i /> AVAILABLE FOR SELECT PROJECTS</div>
            <p className="hero-kicker">ABDUL WAHAB · SYSTEMS DEVELOPER</p>
            <h1>Software that<br /><em>does the work.</em></h1>
            <p className="hero-lede">I build AI agent systems, cross-platform products, and data-heavy business software—starting with the job, not the hype.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">Explore the work <Arrow diagonal={false} /></a>
              <a className="button button-quiet" href="https://www.fiverr.com/itinteractive" target="_blank" rel="noreferrer">96 client reviews <Arrow /></a>
            </div>
          </div>

          <div className="hero-system" aria-label="Interactive map of agent, app, data, and automation capabilities">
            <div className="system-topline"><span>SYSTEM / 001</span><span>DRAG WITH POINTER</span></div>
            <Suspense fallback={<div className="scene-fallback" aria-hidden="true"><i /><span /></div>}>
              <SystemScene />
            </Suspense>
            <div className="system-label label-agents"><i /> AGENTS</div>
            <div className="system-label label-apps"><i /> APPS</div>
            <div className="system-label label-data"><i /> DATA</div>
            <div className="system-label label-automation"><i /> AUTOMATION</div>
            <div className="system-caption">
              <span>CAPABILITY ENGINE</span>
              <p>One useful system. Multiple tools working together.</p>
            </div>
          </div>
        </section>

        <section className="proof-strip" aria-label="Professional track record">
          <a href="https://www.fiverr.com/itinteractive" target="_blank" rel="noreferrer">
            <strong>5.0</strong><span>Fiverr rating</span>
          </a>
          <a href="https://www.fiverr.com/itinteractive" target="_blank" rel="noreferrer">
            <strong>96</strong><span>client reviews</span>
          </a>
          <div><strong>10+</strong><span>years building</span></div>
          <div><strong>Web · desktop · mobile</strong><span>one connected system</span></div>
        </section>

        <section className="section work-section" id="work">
          <div className="section-intro" data-reveal>
            <div>
              <span className="section-number">01 / SELECTED WORK</span>
              <h2>Proof before promises.</h2>
            </div>
            <p>Products, operations software, and experiments that show range without hiding the engineering underneath.</p>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => <ProjectCard key={project.name} project={project} index={index} />)}
          </div>
          <a className="text-link" href="https://github.com/CodeWithAbkhan?tab=repositories" target="_blank" rel="noreferrer">
            Browse the full GitHub archive <Arrow />
          </a>
        </section>

        <section className="workshop-feature" aria-labelledby="workshop-title" data-reveal>
          <img
            src="/images/systems-workshop-v2.jpg"
            alt="A physical systems workshop with a central controller linked to data, commerce, browser automation, and voice modules"
            loading="lazy"
          />
          <div className="workshop-shade" />
          <div className="workshop-copy">
            <span className="section-number">FIELD NOTE / ORCHESTRATION</span>
            <h2 id="workshop-title">One operator.<br />Many capable hands.</h2>
            <p>The agent is not the product. The connected workflow—tools, data, checks, and useful output—is the product.</p>
          </div>
          <div className="workshop-legend" aria-label="System modules">
            <span>01 DATA</span><span>02 COMMERCE</span><span>03 BROWSER</span><span>04 VOICE</span>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="section-intro inverse" data-reveal>
            <div>
              <span className="section-number">02 / WHAT I BUILD NOW</span>
              <h2>New capability.<br />Old discipline.</h2>
            </div>
            <p>The direction is AI-native, but the standard is still dependable software: clear workflows, inspectable decisions, and maintainable code.</p>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <article className="service-row" key={service.number} data-reveal>
                <span className="service-number">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>{service.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section trust-section" id="about">
          <div className="trust-grid">
            <div className="trust-heading" data-reveal>
              <span className="section-number">03 / WHY WORK WITH ME</span>
              <h2>A decade of solving the unglamorous parts.</h2>
              <p>Authentication, databases, deployment, permissions, edge cases, handover—the parts that turn an impressive demo into useful software.</p>
              <a className="button button-dark" href="https://www.fiverr.com/itinteractive" target="_blank" rel="noreferrer">See verified history <Arrow /></a>
            </div>
            <div className="review-panel" data-reveal>
              <div className="review-score"><strong>5.0</strong><span>★★★★★</span><small>FROM 96 REVIEWS</small></div>
              <blockquote>“Ab understood what I needed 1st time and delivered greater than expected.”</blockquote>
              <p>Verified Fiverr client · United States</p>
              <div className="review-divider" />
              <blockquote>“Far more advanced and intuitive than expected.”</blockquote>
              <p>Verified Fiverr client · Canada</p>
            </div>
          </div>

          <div className="timeline" data-reveal>
            <div><span>2014</span><p>Started with C#, SQL, ASP.NET, and business applications.</p></div>
            <div><span>2016</span><p>Began serving clients globally through Fiverr.</p></div>
            <div><span>2024</span><p>Expanded into Blazor Hybrid, MAUI, Docker, and cross-platform delivery.</p></div>
            <div><span>NOW</span><p>Building agent systems, AI-enabled products, and interactive 3D experiences.</p></div>
          </div>
        </section>

        <section className="stack-band" aria-label="Core technologies">
          <div className="stack-track">
            <span>C#</span><i>✦</i><span>.NET</span><i>✦</i><span>OPENCLAW</span><i>✦</i><span>REACT</span><i>✦</i><span>THREE.JS</span><i>✦</i><span>POSTGRESQL</span><i>✦</i><span>SQL SERVER</span><i>✦</i><span>DOCKER</span>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-copy" data-reveal>
            <span className="section-number">04 / START HERE</span>
            <h2>Bring me the messy workflow.</h2>
            <p>I’ll help turn it into a clear, testable system—whether that means agents, a product, a database, or all three.</p>
          </div>
          <div className="contact-actions" data-reveal>
            <a className="contact-primary" href="mailto:awahab.akhan@gmail.com">
              <span>Email the brief</span><Arrow />
            </a>
            <a href="https://www.fiverr.com/itinteractive" target="_blank" rel="noreferrer"><span>Hire on Fiverr</span><Arrow /></a>
            <a href="https://codewithabkhan.gumroad.com/" target="_blank" rel="noreferrer"><span>Browse free software</span><Arrow /></a>
          </div>
        </section>
      </main>

      <footer>
        <a className="brand footer-brand" href="#top"><span>AB</span><i>/</i><span>KHAN</span></a>
        <p>Building useful systems from Pakistan, for anywhere.</p>
        <div className="footer-links">
          <a href="https://x.com/smile_Awahab" target="_blank" rel="noreferrer">X</a>
          <a href="https://www.linkedin.com/in/itinteractive/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/CodeWithAbkhan" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.instagram.com/codewithabkhan/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://youtube.com/@codepey" target="_blank" rel="noreferrer">YouTube</a>
        </div>
        <small>© {new Date().getFullYear()} CodeWithABKhan</small>
      </footer>
    </>
  );
}
