import React, { useEffect, useRef, useState } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplashSlide from "./SplashSlide";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Support", to: "/support" },
  { label: "Careers", to: "/careers" },
  { label: "Events", to: "/events" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className={`site-header ${scrolled || location.pathname !== "/" ? "is-solid" : ""}`}>
      <NavLink className="wordmark" to="/" aria-label="7UP home">
      <img className="logo-img" src="/images/7up-logo.png" alt="7UP" />
     </NavLink>

      <button
        className="menu-toggle"
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span /><span />
      </button>

      <nav className={`nav-links ${open ? "menu-open" : ""}`} aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            {item.label}
          </NavLink>
        ))}
        <a className="nav-pill" href="/#brand-story">Discover <span>↗</span></a>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <NavLink className="wordmark footer-mark" to="/" aria-label="7UP home">
      <img className="logo-img" src="/images/7up-logo.png" alt="7UP" />
      </NavLink>
      <p>Stay curious. Stay crisp. Stay refreshed.</p>
      <div className="footer-links">
        {navItems.map((item) => <NavLink key={item.to} to={item.to}>{item.label}</NavLink>)}
      </div>
      <small>Fan-made frontend concept for learning purposes. Not an official 7UP website.</small>
    </footer>
  );
}

function Citrus({ className = "" }) {
  return <span className={`citrus-art ${className}`} aria-hidden="true"><span /></span>;
}




function Home() {
  const heroRef = useRef(null);
  const canRef = useRef(null);

 
useEffect(() => {
  const ctx = gsap.context(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    // 1. Cinematic entrance
    const intro = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    intro
      .from(".hero-kicker", {
        opacity: 0,
        y: 20,
        duration: 0.5,
      })
      .from(
        ".hero-title .line",
        {
          opacity: 0,
          y: 65,
          duration: 0.8,
          stagger: 0.16,
        },
        "-=0.15"
      )
      .from(
        ".hero-description, .hero-actions",
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.15,
        },
        "-=0.3"
      )
      .from(
        ".hero-product",
        {
          opacity: 0,
          y: -100,
          scale: 0.8,
          rotation: -8,
          duration: 1.2,
          ease: "bounce.out",
        },
        "-=0.8"
      )
      .from(
        ".hero-citrus",
        {
          opacity: 0,
          scale: 0,
          duration: 0.5,
          stagger: 0.15,
        },
        "-=0.5"
      );

    // 3. Product reacts to scrolling
    gsap.to(".hero-product", {
      yPercent: -7,
      scale: 0.94,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Animate the content further down the homepage
    gsap.from(".story-reveal", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".brand-story",
        start: "top 80%",
      },
    });

    gsap.from(".mini-product", {
      y: 35,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".featured-products",
        start: "top 80%",
      },
    });
  }, heroRef);

  return () => ctx.revert();
}, []);


  return (
    <main ref={heroRef}>
      <section className="hero">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Decorative background video"
          onError={(event) => event.currentTarget.style.display = "none"}
        >
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay" />
        <div className="hero-grid" />
        <div className="hero-copy">
          <p className="hero-kicker"><span className="pulse-dot" /> THE FEEL-GOOD FIZZ</p>
          <h1 className="hero-title">
            <span className="line">UNBORING</span>
            <span className="line"><em>THE</em> WORLD<span className="lime-dot">.</span></span>
          </h1>
          <p className="hero-description">
            A little citrus. A lot of attitude.<br />
            Find your fresh side and make every moment pop.
          </p>
          <div className="hero-actions">
            <NavLink className="button button-lime" to="/products">Explore the fizz <span>↗</span></NavLink>
            <a className="text-link" href="#brand-story">Meet the brand <span>↓</span></a>
          </div>
        </div>

        <div className="hero-product" ref={canRef}>
          <div className="product-halo" />
          <Citrus className="hero-citrus citrus-left" />
          <Citrus className="hero-citrus citrus-right" />
    <img
  className="hero-cartoon"
  src="/images/7up-cartoon.gif"
  alt="Cartoon character picking up and enjoying a green soda bottle"
/>
<div className="hero-ice ice-three" aria-hidden="true" />
          <span className="floating-note note-one">LIME ENERGY</span>
          <span className="floating-note note-two">100% GOOD VIBES</span>
        </div>

        <div className="hero-bottom">
          <span>01 / THE REFRESH</span>
          <a href="#brand-story">SCROLL TO EXPLORE ↓</a>
          <span>FRESHNESS IN FULL EFFECT</span>
        </div>
      </section>

      <section className="brand-story section-pad" id="brand-story">
        <div className="story-heading">
          <p className="section-kicker story-reveal">A FRESH TAKE ON EVERYDAY</p>
          <h2 className="display-heading story-reveal">LIFE IS BETTER<br /><span>WITH A LITTLE FIZZ.</span></h2>
        </div>
        <div className="story-copy story-reveal">
          <p>Bright citrus energy. Crisp refreshment. A playful spirit that turns ordinary moments into something a little more memorable.</p>
          <p className="fine-print">This is a student-built, fan-made brand experience. Replace this sample copy with researched, verified company information before publishing.</p>
          <NavLink className="dark-link" to="/events">Discover what’s happening <span>↗</span></NavLink>
        </div>
</section>
      <SplashSlide />

      <section className="featured-products section-pad">
        <div className="section-head">
          <div>
            <p className="section-kicker">MEET YOUR NEW MOOD</p>
            <h2 className="display-heading">PICK YOUR<br /><span>FRESH.</span></h2>
          </div>
          <NavLink className="dark-link" to="/products">All products ↗</NavLink>
        </div>

<div className="mini-product-grid">
  {[
    {
      name: "The Original",
      image: "/images/product-original.png",
      description: "Classic lemon-lime refreshment.",
    },
    {
      name: "Citrus Energy",
      image: "/images/product-citrus.png",
      description: "A bold citrus-inspired concept.",
    },
    {
      name: "Zero Sugar",
      image: "/images/product-zero.png",
      description: "Lime taste with a zero-sugar concept.",
    },
  ].map((product, index) => (
    <NavLink
      to="/products"
      className={`mini-product mini-product-${index + 1}`}
      key={product.name}
    >
      <img
        className="mini-product-image"
        src={product.image}
        alt={product.name}
      />
      <p>{product.name}</p>
      <span className="mini-product-description">
        {product.description}
      </span>
      <span className="mini-arrow">↗</span>
    </NavLink>
  ))}
</div>

      </section>

      <section className="home-cta">
        <p className="section-kicker">YOUR NEXT REFRESH STARTS HERE</p>
        <h2 className="display-heading">KEEP IT<br />UNBORING<span>.</span></h2>
        <NavLink className="button button-dark" to="/events">Explore the experience ↗</NavLink>
      </section>
    </main>
  );
}

 
const productList = [
  {
    name: "The Original",
    note: "Classic lemon-lime refreshment.",
    image: "/images/product-original.png",
    tone: "green",
  },
  {
    name: "Citrus Energy",
    note: "A bold citrus-inspired concept.",
    image: "/images/product-citrus.png",
    tone: "yellow",
  },
  {
    name: "Zero Sugar",
    note: "Lime taste with a zero-sugar concept.",
    image: "/images/product-zero.png",
    tone: "mint",
  },
];



function Products()

 {
  return (
    <main className="inner-page products-page">
      <PageIntro
        kicker="THE LINEUP"
        title={<>FIND YOUR<br /><span>FRESH.</span></>}
        text="Discover your favourite citrus-inspired refresh."
      />

      <section className="product-catalog product-gallery">
        {productList.map((product, index) => (
          <article
            className={`catalog-card ${product.tone}`}
            key={product.name}
          >
            <div className="catalog-art product-image-wrap">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
            </div>

            <div className="catalog-info">
              <p>LEMON-LIME COLLECTION</p>
              <h2>{product.name}</h2>
              <span>{product.note}</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}


function Support() {
  const [active, setActive] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const faqs = [
    ["Where can I find product information?", "For this demo, use the Products page as a sample product gallery. Add verified official product links before publishing."],
    ["How do I get in touch?", "The form below demonstrates frontend form handling only. It does not send messages to a real support team yet."],
    ["Can I use these images commercially?", "Use only assets you own or have permission to use. This fan-made concept is for learning and portfolio practice."],
  ];

  return (
    <main className="inner-page support-page">
      <PageIntro kicker="WE'RE HERE TO HELP" title={<>GOOD VIBES.<br /><span>GOOD SUPPORT.</span></>} text="Find an answer or try the demo contact form." />
      <section className="support-layout section-pad">
        <div>
          <p className="section-kicker">QUICK ANSWERS</p>
          <h2 className="subheading">Frequently asked.</h2>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <div className={`faq-item ${active === index ? "faq-open" : ""}`} key={question}>
                <button type="button" onClick={() => setActive(active === index ? -1 : index)}>
                  {question}<span>{active === index ? "−" : "+"}</span>
                </button>
                {active === index && <p>{answer}</p>}
              </div>
            ))}
          </div>
        </div>
        <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
          <p className="section-kicker">DEMO CONTACT FORM</p>
          <h2 className="subheading">Drop us a note.</h2>
          <label>Your name<input required name="name" placeholder="Your name" /></label>
          <label>Email address<input required type="email" name="email" placeholder="you@example.com" /></label>
          <label>What can we help with?<textarea required name="message" rows="4" placeholder="Write your message..." /></label>
          <button className="button button-dark" type="submit">Submit demo message ↗</button>
          {submitted && <p className="form-success" role="status">Demo submitted locally. No message was sent to a server.</p>}
        </form>
      </section>
    </main>
  );
}

function Careers() {
  const jobs = [
    ["Brand & Creative Intern", "Creative", "Build ideas that bring a campaign to life."],
    ["Digital Experience Intern", "Digital", "Help shape playful, accessible digital journeys."],
    ["Events Assistant", "Experiences", "Help make brand moments memorable."],
  ];
  return (
    <main className="inner-page careers-page">
      <PageIntro kicker="MAKE SOMETHING REFRESHING" title={<>BRING YOUR<br /><span>BIG ENERGY.</span></>} text="A concept careers page about creativity, collaboration and bold ideas." />
      <section className="culture-band section-pad">
        <div><p className="section-kicker">THE WAY WE WORK</p><h2 className="display-heading">GOOD IDEAS<br /><span>NEVER SIT STILL.</span></h2></div>
        <p>Curiosity starts conversations. Collaboration makes ideas better. And a little playfulness can make the work more memorable.</p>
      </section>
      <section className="jobs-section section-pad">
        <p className="section-kicker">SAMPLE OPPORTUNITIES</p><h2 className="subheading">Find your next move.</h2>
        {jobs.map(([title, team, description]) => (
          <article className="job-row" key={title}>
            <div><span>{team}</span><h3>{title}</h3><p>{description}</p></div>
            <a href="mailto:hello@example.com?subject=Careers%20page%20demo">View role ↗</a>
          </article>
        ))}
        <p className="demo-note">These are fictional portfolio examples, not real vacancies. The contact link is a placeholder.</p>
      </section>
    </main>
  );
}

function Events() {
  const events = [
    { date: "01", month: "CONCEPT", title: "The Citrus Sessions", type: "MUSIC & CULTURE", text: "A vibrant concept for a music-led pop-up with friends, flavour and feel-good energy." },
    { date: "02", month: "CONCEPT", title: "Refresh Outside", type: "OUTDOOR EXPERIENCE", text: "A summer-inspired outdoor gathering filled with colour, movement and playful moments." },
    { date: "03", month: "CONCEPT", title: "The Fizz Lab", type: "CREATIVE WORKSHOP", text: "A hands-on workshop concept for experimenting with visuals, ideas and new perspectives." },
  ];
  return (
    <main className="inner-page events-page">
      <PageIntro kicker="GOOD TIMES IN MOTION" title={<>LET'S MAKE<br /><span>A MOMENT.</span></>} text="Explore fictional campaign and event concepts designed for this frontend portfolio." />
      <section className="event-list section-pad">
        {events.map((event, index) => (
          <article className={`event-card event-card-${index + 1}`} key={event.title}>
            <div className="event-date"><strong>{event.date}</strong><span>{event.month}</span></div>
            <div className="event-content"><p className="section-kicker">{event.type}</p><h2>{event.title}</h2><p>{event.text}</p><a href="mailto:hello@example.com?subject=Event%20concept">Enquire about this concept ↗</a></div>
            <div className="event-art"><Citrus /><span className="event-sun" /></div>
          </article>
        ))}
      </section>
      <p className="demo-note">These events are concepts only, not official or scheduled 7UP events.</p>
    </main>
  );
}

function PageIntro({ kicker, title, text }) {
  return (
    <section className="page-intro">
      <p className="section-kicker">{kicker}</p>
      <h1 className="display-heading">{title}</h1>
      <p className="page-intro-text">{text}</p>
      <div className="intro-orb" />
    </section>
  );
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/support" element={<Support />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/events" element={<Events />} />
        <Route path="*" element={<PageIntro kicker="404 / WRONG TURN" title={<>THIS PAGE<br /><span>ISN'T HERE.</span></>} text="Use the navigation to get back to the refresh." />} />
      </Routes>
      <Footer />
    </>
  );
}
