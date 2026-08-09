# Portfolio Information Bank: Aamir Khan

> Provided by Aamir on 2026-08-07 as the factual source of truth about him, to replace generic
> portfolio copy with specific, evidence-backed wording. Facts and background only (who he is,
> experience, projects, skills); it does not contain build/design guidance. Sourced from Aamir's
> resume, his Tatari internship record, and his project READMEs. All content is factual and, per
> Aamir, free to use publicly (including naming Tatari and citing the specific metrics).
>
> Use with `tasks/copy-repositioning` notes in `docs/HANDOFF.md` (positioning spine + drafted copy).

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

Python is the primary language. Most infra/MLOps tools below are working, production-built familiarity from the internship rather than years of expertise.

- **Languages & data:** Python (primary), SQL (near-daily production querying), C/C++ (familiar), JavaScript/TypeScript (familiar); Delta/Parquet, CSV, YAML, JSON.
- **AI / ML:** PyTorch, HuggingFace Transformers, LoRA / PEFT fine-tuning, 4-bit quantization (bitsandbytes), transformer architectures (built from scratch), multi-modal (vision + language), LightGBM, scikit-learn, NumPy, Pandas, RAG, prompt engineering.
- **ML systems / MLOps:** MLflow (artifacts, pyfunc models), Databricks model serving (`/invocations` endpoints), inference logging / monitoring, batch inference, champion/challenger registries, blue/green + shadow deployment, feature stores (online vs offline), serving-parity testing, bounded and nested concurrency for throughput (ThreadPoolExecutor, overlapping fan-out to cut wall-time).
- **Backend / infra:** FastAPI, REST APIs, OAuth2 machine-to-machine auth, Docker, Apache Airflow, Databricks (Unity Catalog, DBFS), AWS (DynamoDB), CI/CD (GitHub Actions), dependency locking.
- **Tooling & workflow:** Git/GitHub PR workflow, PyTest, Jupyter, Claude Code (heavy use, custom command suite and self-review workflows), Jira/Confluence, Agile.
- **Statistics:** error metrics (MAPE and its failure modes, WAPE/median alternatives), prediction intervals, coverage analysis.

---

## 4. Experience

### Tatari: AI/ML Software Engineer Intern, Media Intelligence (Jun 2026 to Sep 2026, Culver City, CA)

**Context:** Tatari is a TV advertising measurement/optimization company. Aamir works on the ML platform team, on the "performance" models that predict advertising performance metrics for linear (broadcast) and streaming TV, served in production and retrained nightly on Databricks. His central project was adding inference logging and monitoring to the linear-performance model, which expanded into a much larger production-debugging and MLOps body of work.

**Key highlights:**
- Diagnosed a ~4-month production outage that silently failed ~3.9M daily ML predictions, traced it to a Databricks feature-store key-ordering bug spanning four repositories, and shipped a fix that restored full prediction volume and prevented further downtime.
- Migrated a production ML model to Databricks' MLOps framework, verified valid predictions across 100% of test data, and eliminated a ~40-minute processing bottleneck by parallelizing ~3,900 daily requests covering 1.5M+ predictions.
- Reduced daily writes to a production ML feature database by ~49% (7.98M to 4.07M rows) by identifying and removing an entire data category no model used, cutting infrastructure cost with zero impact on training or predictions.

**Deeper detail:**

- **Flagship arc, inference logging + the multi-month serving outage fix.** Scoped the project into a phased plan; reworked the batch prediction path to source predictions from the serving endpoint's `/invocations` route so it emits inference logs (a unit-testable client with bounded concurrency via `ThreadPoolExecutor`, order-preserving key re-attachment, and count-integrity guards). When the endpoint returned all-empty predictions, root-caused a cross-team production outage: the online feature store had been frozen months earlier as a cost measure, and even after republishing, predictions stayed empty. Methodically ruled out data staleness, feature spec, deploy-time binding, and auth, isolating it to a publish-vs-serve key-ordering mismatch, confirmed at the byte level by reading the feature-store library source on both publish and serve sides, corroborated four independent ways. The finding was adopted into the platform team's official postmortem. The fix required aligning both the served model's lookup key and the history table's primary key to physical column order (the subtle correctness detail: the platform trains by registered-PK order but serves by physical column order). Shipped four coordinated PRs across four repos plus a deep-dive research doc, proved it end to end in dev, validated in staging, and rolled to production. Added a permanent regression guard so this class of bug fails loudly instead of silently recurring.

- **Cost optimization on the online feature store.** Re-enabled a disabled publish under a cost bound, then found a larger lever: proved in code (not assumption) that an entire metric category was never trained on, scored, or predicted, and removed it for a roughly-half cut in write volume with zero downstream risk. Ran a real-dollar cost investigation by querying the raw billing table directly when dashboards couldn't isolate a single table, and corrected a misattributed cost drop before it reached leadership. Separately prevented a production incident by proving that a "dead-looking" data partition was actually scored against millions of times daily; pruning it would have silently dropped millions of real predictions.

- **Standardized model port.** Ported the linear-performance LightGBM model into Tatari's standardized MLOps framework (Databricks Asset Bundles + MLflow pyfunc + Feature Store training), dev-verified end to end (validation check passed 495/495 supported rows non-empty, 0% failure), and converged the port with a teammate's parallel streaming port on every best-practice dimension.

- **Champion/challenger registry.** Built the media-planning-service champion/challenger model registry, the single source of truth for which model version is live vs. under evaluation, with shared response models and an authenticated read endpoint. Made a proactive design call to extract a shared registry class rather than duplicate it, verified via the full test suite, validated in staging, and promoted to production.

- **Generic batch routing client (largest end-to-end build).** Built a reusable batch routing client that fans the nightly batch out to the live model plus shadow challenger candidates, keeping the live result while shadow scores flow to inference tables for evaluation. Included an OAuth2 machine-to-machine auth layer and a fail-loud registry read. During self-review, found and fixed a real security vulnerability (the client trusted a URL from the registry response without validation; an attacker-controlled registry could have redirected an auth credential) by adding a strict URL allowlist and tests. Coded and proved the production phase before credentials existed using an injected fake connection to write a byte-identical-output test. Shipped to production successfully.

- **Concurrency optimization on the routing client (follow-on).** Reworked the routing so champion and challenger shadow scoring overlap instead of running sequentially: an outer per-runner pool wraps the bounded per-endpoint pool, so total shadow wall-time becomes the max of the runners rather than the sum. Grew the test suite from 44 to 50 tests, proven non-vacuous (they fail against the old code), and released it as a versioned internal library. Then made a disciplined deploy call: deliberately held the production rollout so the first-ever concurrent nightly run wouldn't go unattended over a weekend, after verifying production couldn't auto-adopt the change.

- **Serving-parity testing.** Verified that the new serving cutover produces predictions identical to the prior in-process scoring path (never parity-checked before), and shipped the reusable parity tool merged to main. Established that data-version pinning is mandatory to avoid phantom diffs, and consolidated one-off scripts into a single checked-in, parameterized tool. Result: linear parity was bit-exact across three dates once a lossless parser was used; streaming held ~79% with a genuine sub-3-ULP floor. Notably, the bit-exact result came from a self-review that overturned a previously-published parity number in the team's favor: the earlier "~1-ULP linear discrepancy" was an artifact of a lossy default CSV parser, not the model cutover. Also surfaced two genuine streaming defects (it scores on the previous day's features due to a cross-DAG cron race, and its grid key isn't unique).

- **Monitoring dashboards.** Stood up production Lakehouse monitors (blue and green) with resolving dashboards end to end.

- **Fast, careful production bug fix (`lightgbm_metrics`).** A metrics task started failing in the staging pipeline, unrelated to any active workstream. Root-caused it to a `KeyError` hitting an empty result on sparse staging data (confirmed production ran the same code fine on denser data, so a data-shape issue, not a regression), fixed it, got it reviewed, merged, and staging-verified within 48 hours. While in the file, found and folded in a second unrelated latent bug (a Spark 3.5 API removal linear-performance still carried). Three rounds of adversarial review caught a regression risk in the naive fix (it would have silently swallowed the same error in production and killed alerting there), so the shipped fix is environment-gated: raises in production, degrades gracefully elsewhere. Shipped with new unit tests and a green staging DAG run.

- **Runtime-migration explainer that moved a team decision (DBR 16.4).** During a Databricks Runtime + pandas migration across the mirrored-service family, wrote a technical explainer clarifying what actually triggers a real production deployment vs. a training run in each environment. The clarification directly changed a team decision: the team moved ahead migrating the actual production model via the careful manual process, advancing it by weeks, rather than waiting. Also caught during migration review that a `requirements.txt` pandas-floor bump was a no-op for the served model because those repos already pin a newer pandas via an explicit `conda_env()`.

- **Code review & security.** During his mentor's leave (named a point of contact), reviewed cleanup PRs and found real issues repeated across all of them, a CI action pinned to a movable tag (a supply-chain risk given the credentials in scope) and a script-injection pattern, and withheld approval pending fixes rather than rubber-stamp under deadline. Also caught, pre-merge, a PR that would have deleted a teammate's already-merged work. In a later review of a teammate's parity harness, caught that the recorded PASS numbers came from a pre-fix version of the model and that a cited "divergence = 0" metric was a tautology by construction (deterministic training compared against itself), stopping stale evidence from backing a cutover sign-off. Separately showed cross-team judgment over territorial momentum: after building the first phase of a ticket, recognized in review that it mechanically overlapped a teammate's ticket (same endpoints, same inference tables, same join), paused his own work, and reassigned it to the teammate rather than pressing on.

**Working style demonstrated at Tatari:** evidence-over-assumption debugging, adversarial self-review before shipping, honest scoping, ownership under ambiguity, and consistent end-to-end delivery.

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
