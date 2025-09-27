import React, { useState } from 'react';
import './App.css';

// Main portfolio application component
export default function PortfolioApp() {
  // Track which "page" the user is on (acts like routing)
  const [route, setRoute] = useState('home');

  // Store messages submitted through the Contact form
  const [messages, setMessages] = useState([]);

  // Handle Contact form submission
  function submitContact(e) {
    e.preventDefault();
    const form = e.target;

    const data = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      phone: form.phone.value,
      email: form.email.value,
      message: form.message.value,
      date: new Date().toISOString(),
    };

    setMessages(prev => [data, ...prev]);
    form.reset();
    setRoute('home');
    alert('Message captured — redirecting to Home. (Not sent to a server)');
  }

  // Logo component
  const Logo = () => (
    <div className="flex items-center gap-2">
      <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <polygon points="50,5 95,30 95,70 50,95 5,70 5,30" fill="#0ea5a4" />
        <text x="50" y="58" textAnchor="middle" fontSize="36" fill="white" fontFamily="Inter, Arial">ZA</text>
      </svg>
      <span className="font-semibold text-white">Z A — Portfolio</span>
    </div>
  );

  // Navigation bar
  const Nav = () => (
    <nav className="navbar">
      <button aria-label="home" onClick={() => setRoute('home')}>
        <Logo />
      </button>
      <div className="nav-links">
        {['home','about','projects','education','services','contact'].map(r => (
          <button
            key={r}
            onClick={() => setRoute(r)}
            className={`px-3 py-2 rounded transition relative ${route===r ? 'font-bold underline' : ''}`}
          >
            {r[0].toUpperCase() + r.slice(1)}
          </button>
        ))}
      </div>
    </nav>
  );

  // Home page
  const Home = () => (
    <section className="min-h-[70vh] flex flex-col justify-center items-center p-6 text-center">
      <h1 className="text-4xl font-extrabold mb-3">Welcome — I'm Zahra Aden</h1>
      <p className="mb-4 text-lg max-w-xl">Mission: Build accessible, maintainable web apps that solve real problems and help teams move faster.</p>
      <div className="flex gap-3">
        <button onClick={() => setRoute('about')} className="px-4 py-2 rounded shadow-sm bg-teal-600 text-white hover:bg-teal-700">About Me</button>
        <button onClick={() => setRoute('projects')} className="px-4 py-2 rounded shadow-sm bg-blue-600 text-white hover:bg-blue-700">See Projects</button>
      </div>
      <section className="mt-8 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-2"></h2>
        {messages.length === 0 ? (
          <p className="text-sm text-gray-500">No messages yet — try the Contact page.</p>
        ) : (
          <ul className="space-y-2">
            {messages.map((m,i) => (
              <li key={i} className="p-3 border rounded bg-white shadow-sm">
                <div className="text-sm text-slate-600">{m.firstName} {m.lastName} — {m.email} — {m.phone}</div>
                <div className="mt-1">{m.message}</div>
                <div className="text-xs text-gray-400 mt-2">{new Date(m.date).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );

  // About page
  const About = () => (
   <section className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-6 items-start">
  <div className="headshot-container">
    <img src="/projects/Headshot.jpg" alt="Headshot photo" className="headshot" />
  </div>
  <div>
    <h2 className="text-2xl font-semibold">About Me</h2>
    <p className="mt-3"><strong>Zahra Aden</strong></p>
    <p className="mt-3">I'm a motivated health informatics student interested in web and health-related applications...</p>
    <p className="mt-4">Resume: <a href="/ZahraAdenResume.pdf" target="_blank" rel="noreferrer" className="text-teal-600 underline">Download PDF resume</a></p>
  </div>
</section>

  );

  // Project card
  const ProjectCard = ({ title, image, description, role }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="project-card relative cursor-pointer">
        <img
          src={image}
          alt={title}
          className="w-full h-56 object-cover rounded-lg shadow-md transition-transform hover:scale-105"
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <div className="absolute inset-0 bg-black bg-opacity-85 text-white p-4 rounded-lg flex flex-col justify-center items-start">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-sm">{description}</p>
            <p className="mt-1 text-xs italic">Role: {role}</p>
            <button onClick={() => setIsOpen(false)} className="mt-3 px-3 py-1 bg-teal-600 rounded hover:bg-teal-700 text-white text-sm">Close</button>
          </div>
        )}
      </div>
    );
  };

  // Projects page
  const Projects = () => (
    <section className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="projects-grid">
        <ProjectCard
          title="Saffron Ember Website"
          image="/projects/Saffron.jpg.png"
          description="A multi-page restaurant website built with HTML, CSS and JS for COMP125."
          role="Front-end developer, designer"
        />
        <ProjectCard
          title="Sukoon – Spa Website"
          image="/projects/Sukoon.jpg.png"
          description="A multi-page, responsive spa website designed to create a serene and calming user experience. Built with HTML and CSS, this project highlights clean layouts, relaxing visuals, and an intuitive navigation system. Features include a mission statement, customer testimonials, a services overview, and an interactive appointment booking call-to-action."
          role="Graphic Design"
        />
        <ProjectCard
          title="Hospital Management System (HMS)"
          image="/projects/HMS.jpeg"
          description="A comprehensive database-driven system designed to streamline hospital operations, including departments, appointments, billing, treatments, and patient data."
          role="DB developer & analyst"
        />
      </div>
    </section>
  );

  // Education page
  const Education = () => (
    <section className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Education & Qualifications</h2>
      <ul className="space-y-3">
        <li className="p-3 border rounded">
          <div className="font-semibold">Centennial College — Diploma, Health Informatics Technology</div>
          <div className="text-sm text-gray-600">2024 — 2027</div>
        </li>
      </ul>
    </section>
  );

  // Services page
  const Services = () => (
    <section className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Services I Offer</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded">
          <h3 className="font-semibold">Web Development</h3>
          <p className="text-sm mt-2">Frontend and responsive web apps using React, HTML, CSS and JavaScript.</p>
        </div>
        <div className="p-4 border rounded">
          <h3 className="font-semibold">Mobile-friendly UIs</h3>
          <p className="text-sm mt-2">Designing mobile-first user experiences and accessible components.</p>
        </div>
        <div className="p-4 border rounded">
          <h3 className="font-semibold">Data & SQL</h3>
          <p className="text-sm mt-2">Database queries, reporting, and basic analytics for small datasets.</p>
        </div>
      </div>
    </section>
  );

  // Contact page
  const Contact = () => (
    <section className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Contact Me</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 border rounded">
          <h3 className="font-semibold">Contact Info</h3>
          <p className="mt-2">Email: <a href="mailto:zaden2@mycentennialcollege.ca" className="underline">zaden2@mycentennialcollege.ca</a></p>
          <p className="mt-1">Phone: (416) 832-9245</p>
          <p className="mt-1">Location: Toronto, ON</p>
        </div>
        <form className="p-4 border rounded" onSubmit={submitContact}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input name="firstName" placeholder="First name" required className="p-2 border rounded" />
            <input name="lastName" placeholder="Last name" required className="p-2 border rounded" />
            <input name="phone" placeholder="Contact number" className="p-2 border rounded md:col-span-2" />
            <input name="email" type="email" placeholder="Email address" required className="p-2 border rounded md:col-span-2" />
            <textarea name="message" placeholder="Message" rows={4} className="p-2 border rounded md:col-span-2" />
          </div>
          <div className="mt-3 flex gap-2">
            <button type="submit" className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700">Send Message</button>
            <button type="button" onClick={() => setRoute('home')} className="px-4 py-2 rounded border">Cancel</button>
          </div>
        </form>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Nav />
      <main className="pt-6 pb-20">
        {route === 'home' && <Home />}
        {route === 'about' && <About />}
        {route === 'projects' && <Projects />}
        {route === 'education' && <Education />}
        {route === 'services' && <Services />}
        {route === 'contact' && <Contact />}
      </main>

      <footer className="border-t py-6 mt-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">© {new Date().getFullYear()} Zahra Aden — Built with React</div>
      </footer>
    </div>
  );
}
