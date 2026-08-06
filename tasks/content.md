# Content Data — Reference

Verbatim copy and data for the portfolio. `CLAUDE.md` points here; use these values exactly.

---

## Projects (carousel — five, use verbatim)

```javascript
const projects = [
  {
    name: "GPT From Scratch",
    category: "Deep Learning",
    description: "Built multi-head self-attention, transformer blocks, and autoregressive decoding entirely from scratch in PyTorch.",
    stack: ["Python", "PyTorch", "Transformers"],
    demoUrl: "https://github.com/Akhan521/GPT-From-Scratch",   // verify before deploy
    githubUrl: "https://github.com/Akhan521/GPT-From-Scratch",
    characterMood: "excited",
    inProgress: false
  },
  {
    name: "Text2SQL LLaMA Analyst",
    category: "LLM Fine-Tuning",
    description: "Fine-tuned LLaMA-2-7B to translate natural language into SQL using LoRA and 4-bit quantization.",
    stack: ["Python", "LLaMA-2", "LoRA", "Quantization"],
    demoUrl: "https://github.com/Akhan521/Text2SQL-LLaMA",     // update with Colab demo link
    githubUrl: "https://github.com/Akhan521/Text2SQL-LLaMA",
    characterMood: "happy",
    inProgress: false
  },
  {
    name: "Snaption",
    category: "Computer Vision + NLP",
    description: "End-to-end image captioning system combining computer vision and NLP, trained on Flickr8k with PyTorch.",
    stack: ["Python", "PyTorch", "CNN", "LSTM"],
    demoUrl: "https://github.com/Akhan521/Snaption",            // update with live demo link
    githubUrl: "https://github.com/Akhan521/Snaption",
    characterMood: "surprised",
    inProgress: false
  },
  {
    name: "bat-code",
    category: "Agentic AI",
    description: "A Batman-themed AI coding TUI powered by agentic AI (deepagents). Currently in active development.",
    stack: ["Python", "Agentic AI", "TUI", "deepagents"],
    demoUrl: null,
    githubUrl: "https://github.com/Akhan521/bat-code",
    characterMood: "surprised",
    inProgress: true
  },
  {
    name: "Pixelate",
    category: "Accessibility + AI",
    description: "Colorblind-friendly pixel-art editor with an AI assistant and real-time accessibility filters.",
    stack: ["Python", "AI Assistant", "Accessibility"],
    demoUrl: "https://github.com/Akhan521/Pixelate",            // update with live demo link
    githubUrl: "https://github.com/Akhan521/Pixelate",
    characterMood: "happy",
    inProgress: false
  }
];
```

**`inProgress: true`:** Category badge renders as `"🚧 In Progress"` with `var(--duo-orange)`
background and `var(--duo-snow)` text. `demoUrl: null` → hide Live Demo button entirely (no
disabled state). GitHub button renders normally.

**`inProgress: false`:** Category badge uses `var(--duo-green-light)` background and
`var(--duo-green)` text (light-island recipe — cards sit on the white laptop screen), label
is the `category` value. Both buttons render normally.

**URL verification:** Repo slugs above are inferred. Confirm each URL before first deploy.

---

## Skills (About / Skill Tree — levels are estimates, adjust if requested)

```javascript
const skills = [
  { name: "Python",           level: 90, icon: "🐍" },
  { name: "PyTorch",          level: 85, icon: "🔥" },
  { name: "Machine Learning", level: 80, icon: "🧠" },
  { name: "LLMs / NLP",       level: 75, icon: "💬" },
  { name: "Agentic AI",       level: 70, icon: "🤖" },
  { name: "JavaScript",       level: 65, icon: "⚡" },
];
```

---

## Hero copy (verbatim) — redesigned 2026-08-05 (Approach B, clean-professional)

- Greeting: `"Hi, I'm Aamir!"` (first name only — the navbar already shows the full "Aamir Khan"; no emoji)
- Role: `"Aspiring AI Engineer"`
- Value line: `"CS Master's student at UC Riverside, building applied AI and agentic systems."`
- Credentials line (muted): `"AI Trainer @ Handshake AI · AI Product Tester @ DeepLearning.AI"`
- Buttons (matched tactile pair): `"View Projects"` (`.duo-btn`, → `#projects`) ·
  `"Resume"` (`.duo-btn-neutral`, → resume URL, new tab)
- Status chip (replaces the streak badge): `"Open to SWE & AI/ML internships"` with a pulsing
  green availability dot
- Retired: the `"🔥 Streak: 365 days"` badge and the `👋` emoji (read as AI-generic filler).

## About / Skill Tree copy (verbatim)

- Eyebrow: `"SKILL TREE"`
- Heading: `"What I've Learned"`
- Bio:
  > I'm Aamir — a CS Master's student at UC Riverside with a focus on applied AI and agentic systems. I've built transformers from scratch, fine-tuned LLMs, and shipped AI-powered tools. Currently training AI models at Handshake AI and testing AI products at DeepLearning.AI. Open to SWE and AI/ML internships.

## Footer / CTA copy (verbatim)

- Heading: `"Let's build something."`
- Subheading: `"Open to SWE and AI/ML internships · Let's talk."`
- Gamification pill: `"🎉 Lesson complete! You've unlocked: Aamir Khan"`
- Buttons: `"📄 Resume"` (resume URL) · `"💼 LinkedIn"` · `"🐙 GitHub"` · `"✉️ Email"` (mailto)
- Copyright: `© <year> Aamir Khan · Built with ♥ and too much Duolingo` (year via `getFullYear()`)
