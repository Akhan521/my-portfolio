# Portfolio Information Bank: Aamir Khan

> Provided by Aamir as the factual source of truth about him, to replace generic portfolio copy with
> specific, evidence-backed wording. Facts and background only (who he is, experience, projects,
> skills); it does not contain build/design guidance. Sourced from Aamir's resume, his Tatari
> internship record, and his project READMEs. Everything here is cleared for public use.
>
> **Scope:** this doc covers the whole profile. For Tatari specifically it carries only the headline
> figures copy needs; **the depth lives in `tasks/tatari-accomplishments-report.md`**, the canonical
> public-safe record. Keep Tatari detail in that one place so the two cannot drift apart.

---

## 1. Snapshot

- **Name:** Aamir Khan
- **Targeting:** AI Software Engineer / AI Engineer roles, application side (see positioning note below)
- **Location:** Riverside, CA
- **Education:** MS Computer Science, UC Riverside, GPA 4.0/4.0, expected Dec 2026. BS Computer Science, UC Riverside, GPA 3.98/4.0, Summa Cum Laude, Jun 2025. Honors: Dean's Honor List, Chancellor's Honor List.
- **Relevant coursework:** ML, Deep Learning, Reinforcement Learning, NLP, Computer Vision, Algorithms, AI, Data Structures.
- **Current role:** AI/ML Software Engineer Intern at Tatari (Media Intelligence / ML platform team), Jun 2026 to Sep 2026, Culver City, CA.
- **Links:** GitHub github.com/Akhan521 · LinkedIn linkedin.com/in/aamir-khan-aak521 · Email aamirksfg@gmail.com · Portfolio aamir-khans-portfolio.vercel.app

**One-line positioning (from resume):** An AI software engineer who builds ML systems end to end, from training and fine-tuning models to shipping them into production with real serving, logging, and monitoring, and who debugs hard production problems down to the root cause.

**IMPORTANT positioning steer (Aamir, 2026-08-07):** He wants to be positioned as an **AI software
engineer / AI engineer on the APPLICATION side** (builds AI-powered software and ships it to
production), NOT an ML engineer. Draw on the production-ML experience as evidence of shipping and
debugging rigor, but keep ML vocabulary light so he does not read as ML-engineering. The from-scratch
models/fine-tuning are credibility ("understands the internals"), not the headline.

---

## 2. Positioning themes

Aamir combines two things that rarely appear together in an early-career engineer: he builds models from scratch (custom transformers, fine-tuned LLMs) and he operates them in production (feature stores, serving endpoints, inference logging, monitoring, parity testing). Three evidence-backed themes:

1. **Ships end to end.** Multiple work arcs taken from investigation to implementation to staging validation to production rollout to permanent regression guard, largely single-handed.
2. **Debugs by evidence, not assumption.** Reproduce the problem, eliminate hypotheses one at a time, confirm the root cause in the actual source or data before committing. Has read library source at the byte level, queried raw billing tables, and used data-versioning to avoid phantom diffs.
3. **Reviews his own work adversarially.** Multi-lens self-reviews have caught real bugs in his own code before shipping, including a security vulnerability, a retry client mishandling non-retryable errors, and a metrics result that turned out to be a parser artifact.

Supporting traits: honest scoping (refuses to declare premature "done," flags open risks), and ownership under ambiguity (stepped up as a point of contact during his mentor's leave).

---

## 3. Skills inventory

Python is the primary language. Most infra/MLOps tools below are working, production-built familiarity from the internship rather than years of expertise. This is the capability list; for what he actually did with each at Tatari, see the accomplishments report.

- **Languages & data:** Python (primary), SQL (near-daily production querying), C/C++ (familiar), JavaScript/TypeScript (familiar); Delta/Parquet, CSV, YAML, JSON.
- **AI / ML:** PyTorch, HuggingFace Transformers, LoRA / PEFT fine-tuning, 4-bit quantization (bitsandbytes), transformer architectures (built from scratch), multi-modal (vision + language), LightGBM, scikit-learn, NumPy, Pandas, RAG, prompt engineering.
- **Applied LLM engineering:** production prompt authoring and iterative tuning, debugging LLM-backed services across provider stages, multi-modal input handling (video/audio transcription, frame decoding via ffmpeg/OpenCV), model-deprecation migration planning, vendor-claim benchmarking.
- **Evaluation & measurement:** pre-registered evaluation protocols, LLM-as-judge harnesses, placebo-controlled steerability testing, confidence-bounded accuracy reporting (recall/specificity), formal equivalence testing.
- **ML systems / MLOps:** MLflow (artifacts, pyfunc models), Databricks model serving (`/invocations` endpoints), inference logging / monitoring, batch inference, champion/challenger registries, blue/green + shadow deployment, feature stores (online vs offline), serving-parity testing, bounded and nested concurrency for throughput (ThreadPoolExecutor, overlapping fan-out to cut wall-time).
- **Backend / infra:** FastAPI, REST APIs, OAuth2 machine-to-machine auth, Docker, Apache Airflow, Databricks (Unity Catalog, DBFS), AWS (DynamoDB), CI/CD (GitHub Actions), dependency locking.
- **Tooling & workflow:** Git/GitHub PR workflow, PyTest, Jupyter, Claude Code (heavy use, custom command suite and self-review workflows), Jira/Confluence, Agile.
- **Statistics:** error metrics (MAPE and its failure modes, WAPE/median alternatives), prediction intervals, coverage analysis.

---

## 4. Experience

### Tatari: AI/ML Software Engineer Intern, Media Intelligence (MINT) (Jun 15 to Sep 18 2026, Culver City, CA)

**Context:** Tatari buys TV advertising for companies. Two ML models predict how those ads perform, linear performance (broadcast) and streaming performance (streaming), both served in production and retrained nightly on Databricks. Aamir owned linear performance; a peer intern owned streaming. When he started, neither model logged what it predicted, so the team could not see its own models' output or tell whether they had drifted.

**>> Full detail lives in `tasks/tatari-accomplishments-report.md`.** Read it before writing any Tatari copy. Below are only the figures that copy reuses, so there is one place to update when they change.

**The four headline workstreams, and their numbers:**

1. **Inference logging, and the four-month serving defect it exposed.** Rewired the nightly batch to score through the model's serving endpoint so every prediction emits an inference log. Building that path exposed a defect: online feature-store lookups had been returning nothing, **~3.9M a day for four months**, from a publish-vs-serve key-order mismatch. Fixed across four repositories. Note the wording: these were **feature lookups**, not customer-facing predictions, because nothing used the broken path yet. He built the path, found the dormant defect, and fixed it before it could carry traffic. Cutover proved safe at **100% bit-exact across three served dates**.
2. **Creative Intelligence.** Revived an LLM service that checks a TV creative against network Standards and Practices rules before the network rejects it, and which had never carried real production traffic. Measured it against **84 real creatives: 76.2% recall, 90.4% specificity at 95% confidence**. Then authored and tuned **seven detection prompts across nine iterations** and shipped the compliance endpoint. Also benchmarked a vendor's efficiency claims and measured **22% failure vs 3%, ~15x the tokens**, recommending against adoption.
3. **The MLOps port.** Ported linear performance onto the standardized MLOps framework: **training 109 min to 15 min, full train-and-deploy cycle ~2.5 hours to 27 min, 68% less compute**. Fleet-wide, cheaper per month while serving 50% more models.
4. **Champion/challenger router.** Built the registry and batch routing client so challengers score full production volume without touching customer results. **First production run: 3,435,473 rows, 100% non-null, 424 companies.** Reworked sequential scoring into concurrent: **~145 min to 80** (~45% faster), flat for two weeks after.

**Other figures copy uses:** cut nightly feature-store write volume **~49% (7.98M to 4.07M rows)**; prevented an incident by proving a proposed prune would have silently dropped **~3.44M real predictions a day**; ran a pre-registered **250-client, three-arm evaluation** (750 scores, zero errors) that found a steerability gap of **92.7% compliance on a named-brand exclusion vs +0.000 on a category exclusion**; found a grading job that had been dark for **46 nights** without tripping a monitor.

**The trait to lead with:** he corrects his own published numbers. When a result does not survive a second look he says so, including when the claim was already shared with the team and when the correction makes his own work look less impressive. That is what makes the figures he stands behind trustworthy.

### Handshake: AI Trainer, ML Specialist (Oct 2025 to Jun 2026, Remote)
- Improved training-signal fidelity through expert evaluation of model-generated visual outputs, giving structured feedback on instruction adherence, semantic correctness, and visual-text alignment to guide dataset refinement.
- Strengthened multi-modal model performance by designing and adversarially testing domain-specific prompt suites for image-editing tasks, uncovering systematic failure modes and improving training-data quality.
- Translated domain research into precise evaluation criteria and prompts for image-generation models.

### DeepLearning.AI: AI Education Product Tester (Aug 2025 to Present, Remote)
- Tested educational tools and short-course content on AI agents and AI/ML, giving structured feedback that shaped iterative feature development and contributed to the launch of 3 new AI courses.
- Identified usability issues and documented findings in comprehensive reports; recommendations helped drive an influx of 10,000+ new learners.

---

## 5. Projects

### Snaption: end-to-end image captioning system
- **Summary:** A from-scratch, multi-modal image captioning system that turns images into natural-language captions, packaged as an installable Python library with pretrained model releases.
- **Architecture:** Encoder-decoder. Frozen EfficientNet-B0 CNN encoder (chosen for accuracy/efficiency, ~5.3M params) to a linear projection to 512-dim to a 6-layer Transformer decoder with self-attention + cross-attention to a vocabulary projection (~8,500 tokens). 16 attention heads, 20-token context, dropout 0.3.
- **Data-scarcity engineering:** Flickr8k is tiny (~8k images), so the model initially memorized captions. Fixed via a deliberate regularization stack: frozen encoder, aggressive but semantically-safe augmentation (horizontal flip, random resized crop, ±15° rotation, color jitter, mild blur), label smoothing (0.1), dropout, plus a OneCycleLR schedule with warm-up and gradient clipping to stabilize training (loss +10 to ~2.15 over 500 epochs).
- **Engineering:** Refactored from a Colab notebook into a clean, modular installable package (`snaption/` core vs `training/` utilities), with a ~5-line inference API, docstrings, type hints, pretrained weights shipped via GitHub Releases, and a test script. Inference ~1s/image on CPU.
- **Stack:** Python, PyTorch, timm (EfficientNet), Albumentations, OpenCV, Pillow, Pandas, NumPy, custom tokenizer, AdamW, OneCycleLR, setuptools.
- **Honest limitations (stated by Aamir):** struggles with complex multi-object scenes, limited vocabulary, sometimes generic captions, Flickr8k bias.

### GPT From Scratch: decoder-only transformer built by hand
- **Summary:** A GPT-style decoder-only transformer implemented entirely from scratch in PyTorch (no pretrained libraries), trained character-level on the first six chapters of *Winnie-the-Pooh* to generate stylistically consistent text.
- **Built by hand:** multi-head self-attention with masking, feedforward blocks, residual connections + layer norm, autoregressive generation head. Modular `GPTTrainer` class (checkpointing, configurable hyperparameters via a `TrainingConfig`, loss plotting), and a temperature-controlled generation pipeline.
- **Design:** char-level tokenization, 64-token context, 128-dim embeddings, 4 transformer blocks, 4 heads, 60 epochs, deliberately small enough to train on a laptop CPU.
- **Stack:** Python, PyTorch, NumPy, Matplotlib. Interactive Colab demo included.

### Text2SQL LLaMA Analyst: parameter-efficient LLM fine-tuning
- **Summary:** Fine-tuned LLaMA-2-7B to translate natural-language questions into SQL, using LoRA + 4-bit quantization to train the whole thing on a free Colab GPU.
- **Technique:** LoRA adapters injected into attention + FFN projections (`q/k/v/o_proj`, `gate/up/down_proj`) instead of updating all 7B params; 4-bit NF4 quantization via bitsandbytes with float16 compute; causal-LM training on an instruction-formatted SQL dataset with HuggingFace `Trainer` + PEFT.
- **Outcome:** working fine-tune runnable on limited hardware, with an interactive Colab demo comparing predictions to ground-truth SQL. Aamir is candid that accuracy still needs work (incomplete/incorrect queries happen).
- **Stack:** Python, PyTorch, HuggingFace Transformers, PEFT, LoRA, bitsandbytes.

---

## 6. Professional development & certifications
- **CodePath, Foundations of AI Engineering (AI 110), Anthropic x CodePath** (Spring 2026): AI agent development, prompt engineering, LLM integration, AI-powered application development, open-source collaboration, large-scale codebase analysis.
- **Certifications:** Deep Learning Specialization (Sep 2025), Google AI Essentials (Aug 2025), Machine Learning Specialization (May 2025).

---

## 7. Available resources (facts, not instructions)
- **Live portfolio:** aamir-khans-portfolio.vercel.app
- **Project demos:** GPT From Scratch and Text2SQL LLaMA Analyst each have interactive Google Colab demos. Snaption ships pretrained model releases via GitHub Releases and has a demo asset in its README.
- **Repositories:** Snaption, GPT-From-Scratch, and Text2SQL-LLaMA-Analyst are public under github.com/Akhan521.
