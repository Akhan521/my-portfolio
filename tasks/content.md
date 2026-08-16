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

## Skills (About section), implemented 2026-08-07 (curated, categorized chips)

Owner-confirmed, curated for AI SWE recruiters (not overloaded). No XP levels, no %, no emoji.
Rendered as solid-tactile `.skill-chip`s under green category labels. See
`docs/superpowers/specs/2026-08-07-about-skills-design.md`.

- **Languages:** Python · SQL · JavaScript · C++
- **AI / ML:** PyTorch · LLMs & NLP · Agentic AI · RAG · Fine-tuning (LoRA/PEFT) · Transformers
- **Tools & Frameworks:** Hugging Face · LangChain · FastAPI · Docker · Git
- **Production & MLOps:** MLflow · Databricks · Airflow · Model serving · Feature stores · Shadow deployment · Monitoring · CI/CD
  _(added 2026-08-08: signals Aamir's differentiator, he ships/operates AI in production. Owner
  chose the label "Production & MLOps" (ampersand matches "Tools & Frameworks"). Expanded
  2026-08-15 with Airflow, Feature stores, and Shadow deployment, all backed by real depth in
  `tasks/tatari-accomplishments-report.md`; these are the vocabulary ML-platform hiring managers
  scan for.)_

_Set aside to avoid overload (easy to add back): generic "Machine Learning", standalone Vector
DBs/embeddings (implied by RAG), React / Node (web-leaning), NumPy / Pandas (assumed alongside
PyTorch), and deeper infra terms (Kubernetes, Terraform, OAuth2/M2M, champion/challenger as a
separate chip, it's implied by Shadow deployment) kept out to stay curated and application-leaning._

**Retired:** the earlier XP-bar skills (`level`/`icon` array with "SKILL TREE" eyebrow). The
game-y XP/% and emoji read as AI-generic, replaced per the clean-professional north star.

---

## Hero copy (verbatim) — redesigned 2026-08-05 (Approach B, clean-professional)

- Greeting: `"Hi, I'm Aamir!"` (first name only — the navbar already shows the full "Aamir Khan"; no emoji)
- Role: `"AI Software Engineer"`
- Value line: `"I build AI software and make it reliable in production, and I'm strongest at diagnosing why it fails."`
- Credentials line (muted): `"AI/ML Software Engineer Intern @ Tatari · CS Master's @ UC Riverside"`
- Buttons (matched tactile pair): `"View Projects"` (`.duo-btn`, → `#projects`) ·
  `"Resume"` (`.duo-btn-blue`, → resume URL, new tab)
- Status chip (replaces the streak badge): `"Open to full-time & internship AI roles"` with a
  pulsing green availability dot (updated 2026-08-08: Aamir is seeking both full-time and internship)
- Retired: the `"🔥 Streak: 365 days"` badge and the `👋` emoji (read as AI-generic filler).

## About section copy (verbatim) — updated 2026-08-15

- Eyebrow: `"About Me"` (was `"SKILL TREE"` — dropped the game framing)
- Heading: `"What I've Learned"`
- Bio (repositioned 2026-08-08 to AI software engineer / application side; leads with shipping to
  production + failure diagnosis, features Tatari as proof; "end to end" dropped per Aamir.
  P1 rewritten 2026-08-15 from `tasks/tatari-accomplishments-report.md`: added the
  champion/challenger routing build with its 3.4M+ rows and ~45% speedup, replacing the weak
  "shipped new serving and monitoring features" closer. Owner validated the ~3.9M figure and
  chose to omit the postmortem-adoption detail. P1 now carries **two** brand-green bolds, a
  deliberate exception to the one-bold-per-paragraph rule so the fix and the build get equal
  billing.) Rendered as **two paragraphs** (readability), bolds via `<strong>` +
  `.about-text strong { color: var(--duo-green) }` (green chosen 2026-08-08; weight-only white
  was too subtle on the already-white body):
  > I'm Aamir, an AI software engineer focused on building AI systems and getting them into production. At Tatari, I work on a production ML platform serving millions of predictions a day. I **root-caused and fixed a multi-month outage** that had been silently failing ~3.9M predictions daily, and I **built the champion/challenger routing system** that scores 3.4M+ rows nightly, which I then optimized to run about 45% faster.
  >
  > I've also **built AI systems from scratch**, from an image-captioning library to a hand-written GPT and a fine-tuned text-to-SQL model, so I understand what's happening under the hood. I care about shipping AI software that holds up in production, not just in a demo.

## Footer / CTA copy (verbatim)

- Heading: `"Let's build something."`
- Subheading: `"Open to SWE and AI/ML internships · Let's talk."`
- Gamification pill: `"🎉 Lesson complete! You've unlocked: Aamir Khan"`
- Buttons: `"📄 Resume"` (resume URL) · `"💼 LinkedIn"` · `"🐙 GitHub"` · `"✉️ Email"` (mailto)
- Copyright: `© <year> Aamir Khan · Built with ♥ and too much Duolingo` (year via `getFullYear()`)
