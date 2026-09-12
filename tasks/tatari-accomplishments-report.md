# Tatari Internship, Accomplishments Report -- Aamir Khan
### AI/ML Software Engineer Intern, Tatari · Media Intelligence (MINT) · June 15 to September 18, 2026

> The canonical record of Aamir's Tatari internship: the four headline workstreams, what else
> shipped, how he worked, and the skills it built. This is the source to draw from for portfolio,
> GitHub, resume, and LinkedIn copy.

---

## Team context

Tatari buys TV advertising for companies. Two ML models predict how those ads will perform:
**linear performance** for broadcast TV and **streaming performance** for streaming. Both are
served in production and retrained nightly on Databricks. Aamir owned linear performance and
worked in parallel with a peer intern, Aditya Iyer, who owned the streaming counterpart.

When the internship started, neither model logged what it predicted, so nobody could see its
output or tell whether it had begun to drift. The team could not read its own gauges. Giving
linear performance that visibility was the assignment; the rest is what he found and built along
the way.

---

## 1. The four things that define the internship

### Inference logging, and the four-month serving defect it exposed

He rewired the nightly `batch_predict` job to source predictions from the model's serving
endpoint rather than scoring in-process, so every prediction emits an inference log. He enabled
AI-gateway inference logging, registered the endpoint with the monitor controller, and stood up a
Lakehouse monitoring dashboard over the resulting tables.

Wiring that path is what exposed the defect. Before scoring an ad slot, the model looks up recent
features for that advertiser from an online feature store, a fast key-value copy of the training
data. **Those lookups returned nothing, roughly 3.9M of them a day, and had for four months.**
Nobody had noticed, because nothing read them: no serving endpoint sat in the prediction path and
no inference logging existed to show it.

**The honest framing, and the one that matters:** no production prediction was wrong during those
four months, because nothing was using the broken path yet. He built the path, uncovered a defect
that would have broken it the moment it carried traffic, and fixed it first.

Two problems sat underneath, each hiding the other. A cost-saving change months earlier had
switched off the publish step that refreshes the online store. Even after republishing, lookups
stayed empty: the online store keys each record by the feature table's **physical** column order,
while the served model built its lookup key in the **declared** primary-key order, so every lookup
missed. He confirmed it byte-level against the Databricks feature-store library source on both the
publish and the serve side, corroborated it four independent ways, and retracted his own earlier
theory when it did not hold. **The platform team adopted the finding into their own postmortem.**

He shipped the fix across four repositories, validated it in production, closed two null-coercion
gaps it revealed, and replaced a no-op endpoint test with a real one that fails loudly on null
predictions.

He also proved the change itself was safe. Moving from in-process scoring to calling the served
model over its endpoint risked quietly changing the numbers. It did not: linear performance came
out **100% bit-exact across three separate served dates**, and streaming differed only within 3
units in the last place. He shipped that check as a reusable, checked-in tool so the streaming side
could consume it by import rather than by copy.

### Creative Intelligence: revived a dead LLM service, measured it, then shipped the compliance check

He met with Media Operations to find where he could genuinely help, and scoped the work from their
answer: an LLM-backed service that checks a TV creative against a network's Standards and Practices
rules *before* the network rejects it. A rejection costs days of back-and-forth. The service
existed, but its main endpoint returned HTTP 500 every time and **it had never carried real
production traffic.**

- **Diagnosis.** He established the failure was deterministic, 3 of 3, and isolated it to one
  provider stage rather than the service as a whole. Root cause: an API key revoked during an
  earlier platform migration. That made it latent cleanup, not a regression. After installing the
  replacement key he worked four diagnostic cycles across two clusters to get it live, then found
  the next cause with a two-arm production experiment: a hardcoded flag was skipping media
  normalization, which starved the transcription step.
- **Then he measured it instead of declaring victory.** Against 84 real creatives: recall 20 of 21
  on genuinely rejected creatives, specificity 55 of 56 on approved controls. At that sample size
  the honest report is a bound, so he published **76.2% recall and 90.4% specificity at 95%
  confidence** rather than the flattering raw ratios. He adjudicated disputed cases mechanically,
  decoding actual frames with ffmpeg and OpenCV rather than ruling by judgment, and **withdrew a
  second rule type's metrics entirely** once he found the label and the prompt were asking
  different questions, making the measurement invalid by construction.
- **The finding that mattered most: the rule corpus was the ceiling, not the model.** The existing
  implementation drove its checks from a rule corpus that covers only a small fraction of the
  networks in play, and cannot express the kinds of conditional rules that cause most rejections.
  That reframed the problem from "tune the model" to "the inputs cannot support the task," and it
  is why the check he went on to build does not depend on that corpus at all.
- **A crash nobody owned.** Real rejected creatives sent by a stakeholder killed the pod. He
  isolated it cleanly to high-resolution creatives, fixed it by capping analysed width, added 11
  tests, and deployed it green the same afternoon. A creative with zero successes across ten prior
  attempts then scored twice in production.
- **The demo turned into real commitments.** He presented the working service and its measured
  results to directors and the Media Ops lead. They aligned on an engineering sprint covering the
  main rejection classes, handed him a long-standing auth problem that had kept Media Ops locked
  out of the service, and Media Ops committed to running live creatives through it.
- **He then shipped the compliance check itself.** He closed the model-validation gate first,
  reproducing all 12 of a prior spike's real test creatives where the earlier pass had covered only
  one, matching 11, and root-causing the single mismatch to a genuine prompt-design collision
  rather than a code bug or randomness. Then he **authored and tuned all seven detection prompts
  against real creatives across nine iterations**, cutting the false-positive rate on clean
  creatives from a third and two-thirds down to zero and a third, and found and fixed a structural
  bug that had been silently limiting every check to one violation per creative. Shipped as a real
  pull request, feature-flagged off by default.
- **Managed the model-lifecycle risk.** He confirmed the Gemini model family the service depends on
  is being discontinued by the vendor, benchmarked two replacement candidates rather than pick one
  on reputation, and filed the migration as its own tracked item with the deadline and blast radius
  documented, leaving the model decision to whoever owns that call.
- **Tested a vendor's efficiency claims before adopting them.** Asked whether the service should
  switch to a newly announced processing mode marketed at up to 88% fewer tokens and 66% lower
  cost, he ran a real 200-call benchmark against production instead of trusting the marketing: the
  new mode **failed 22% of the time versus 3% for the current approach, and used roughly 15x the
  tokens** on the calls that completed. He recommended against adopting it and kept the tested code
  in place as an opt-in path in case that changes.

### The MLOps port: 86% off the training loop

He did the complete port of the linear performance model onto Tatari's standardized MLOps
framework (Databricks Asset Bundles, MLflow pyfunc, Feature Store training), then stood up its
second deployment end to end across dev, staging, and production, turned on its inference logging,
and registered it as a live challenger.

The impact is in the training loop:

| | Before | After |
|---|---|---|
| Training time | **109 min** | **15 min** |
| Variants trained nightly | 2 (to serve 1) | 1 |
| Full train-and-deploy cycle | ~2.5 hours | **27 min** |
| Compute per run | baseline | **68% less** |

Anyone who wants to try a change to this model now waits a quarter of an hour to see the result
instead of nearly two hours. Fleet-wide, the migration this port fed into measured **cheaper per
month while serving 50% more models**, six against four.

### The champion/challenger router, and a nightly job nearly twice as fast

He built the champion/challenger machinery: a registry recording which deployment is live and which
are under evaluation, plus a batch routing client that scores the same work against all of them and
returns only the champion's output. Challengers run on full production volume without touching what
a customer sees. He wrote it from scratch rather than copy the sibling system's version, which
never waits for challenger results: fine for a live service, but in a nightly job those results
vanish when the process shuts down. **First production run: 3,435,473 rows, 100% non-null, 424
companies.**

The client was scoring each deployment one after another, so the night took as long as all of them
added up. He reworked the routing to run them concurrently and drop challenger results as they
arrive rather than hold them in memory. **The nightly run went from ~145 minutes to 80**, verified
in Databricks run history: 144.1, 145.9, and 144.7 minutes on the three nights before, 80.0 the
night it shipped, then 78 to 80 flat for the next two weeks on identical volume. Since the cluster
is billed for every minute it is up, that time is the saving, and adding a third model to the
comparison now costs almost nothing.

---

## 2. Also shipped

### Cost engineering with numbers traceable to a bill

By reading the code rather than assuming, he found the online feature store carries exactly two
metric types and that one of them is never trained on, never scored, and never becomes a
prediction. A one-line filter cut nightly write volume **about 49%, verified empirically at 4.07M
rows against 7.98M**, on top of an earlier 14% cut. Neither the AWS nor the Databricks cost
dashboard could isolate a single table, so he queried the raw billing tables and **derived unit
costs from billing data rather than a price sheet.**

**He also stopped a change that would have caused an incident.** A large partition that everyone
assumed was dead weight was about to be pruned. Reading the nightly-rebuild and scoring code showed
millions of combinations are scored against it daily, so **pruning would have silently dropped
~3.44M real predictions a day.** He corrected the claim in a shared document before a teammate
could act on it.

### A pre-registered evaluation of a production AI tool

At a team hackathon on evals with no assigned project, he picked a comp-selection step in an
internal sales-planning tool, which decides which existing advertisers a prospect most resembles,
because nobody had ever measured it against real outcomes. Three methods were in play: an agentic
LLM approach, k-nearest-neighbours similarity, and k-means clustering.

- **He pre-registered four protocols before running any code** (judge model, rubric, sample size,
  pass/fail thresholds) so the result could not be reverse-engineered into a win. Then ran a
  **250-client, three-arm evaluation against realized advertiser spend: 750 scores, zero errors, in
  2.5 minutes** against a self-set two-hour budget.
- **He found a real ceiling on the approach**, and diagnosed why it existed rather than just
  reporting the number.
- **He measured steerability, not just accuracy.** A placebo-controlled test showed the agentic
  approach reliably honours one kind of constraint but effectively cannot honour another, a
  difference that matters for anyone relying on instructions to steer it. He then tested his own
  proposed fix and reported that the fix did not work either.
- **He reported against his own bars, including when it hurt.** The judge-validation rounds failed
  their pre-committed thresholds and he said so rather than soften them after the fact, disclosed a
  bug in his own evaluation harness, and retracted his own headline claim once a formal test
  rejected it.
- He also surfaced real defects in the tool itself, which he raised with its owners.

### Found the failures the monitoring was built to catch and had missed

Each had been running silently wrong for a long time. None set off an alarm, because in every case
the thing that broke was the part that was supposed to do the checking.

- **A grading job dark for 46 nights.** Every night one job compares yesterday's predictions against
  what actually happened, which is how the team knows whether a model is any good. It wrote its
  output to a scratch location that gets wiped, and when the next step could not find that output,
  the code caught the error and carried on quietly instead of failing. The model kept predicting
  normally, so every health check stayed green. Six weeks of accuracy figures simply did not exist
  and nobody had been told. He traced it to the exact commits and handed it to its owner.
- **A filter that never filtered, wrong since day one.** Code meant to narrow metrics to the rows the
  model actually supports reassigned its own variable inside a loop and discarded the result, so two
  metrics had been scored over *every* row instead. It had been there, character for character,
  since that file's first version, and had later been copy-pasted into linear performance. He
  extracted a testable helper, deleted the dead loop, and added mutation-verified regression tests
  in both repositories.
- **One broken template, six broken dashboards.** A defect in the inherited dashboard template
  pointed a panel at the wrong data, and every monitor generated from it carried the same wrong
  panel.
- **Drift alarms firing on the answer sheet.** The column holding the correct answer had been listed
  as a model input, so two monitors were reporting drift that was not real.

He also wrote the reference documentation for these dashboards, so the next person who sees a
number that looks wrong has somewhere to start.

### Killed work instead of building it when the premise did not hold

He closed two tickets without building them: one asked for a panel whose acceptance criteria were
impossible, and one rested on a premise already disproved. A third he shipped in the opposite
direction, because implementing it as written would have converted correctly-excluded nulls into
large finite wrong values, a regression.

The clearest case was a spike asking whether the model should score net-new companies with no
history. The assumption going in was a masked population of 429. He measured it: **231 churned
companies**, every one with real history (median 9 weeks, max 124), sitting behind a 54-week
recency rule working exactly as coded, which he verified to the day at two Delta time-travel
timestamps. The genuinely new companies were absent from the scoring grid entirely, with a literal
`TODO` to that effect in the scoring code. Reframing it that way let a decision that had been stuck
for five days finally get made, and produced five real follow-ups. He shipped the first the same
evening it was filed.

---

## 3. How he worked

- **Premise-checking before building.** Two tickets closed unbuilt, one shipped as the opposite of
  what it asked for, because the premise did not survive contact with production.
- **He corrects his own published numbers.** The habit that runs through the whole internship: when
  a result does not survive a second look, he says so, including when the claim was already shared
  with the team and including when the correction makes his own work look less impressive. It is
  why the numbers he does stand behind are worth trusting.
- **A genuine engineering pair.** The telemetry and platform work ran as a real pair with Aditya
  Iyer, who owned streaming while Aamir owned linear. They never shared a ticket, reviewed each
  other's work properly instead of waving it through, converged their two model ports on the same
  conventions so the team got one pattern rather than two, and split the shared library work so
  neither built the same thing twice. Aamir led Creative Intelligence end to end, with Aditya
  contributing review and ideas. When their mentor went on leave, he named them both the point
  people for platform-migration work across the org.
- **Review as a first-class contribution.** He reviewed a substantial volume of pull requests for
  other engineers, including a Data Platform engineer's runtime-migration work across four
  repositories.
- **Writing that moved decisions.** During a Databricks Runtime migration the team planned to wait
  for their mentor's return before touching the production model. He worked out what actually
  triggers a deployment versus only a training run, wrote it up, and they moved ahead the same day.
- **Onboarding others into what he learned.** Added late to a second initiative on a linear-clearance
  model, he spent his first two days learning it from scratch and turned that into two internal
  reference documents so the initiative had a real starting point instead of re-deriving everything
  from conversation.
- **Deploy-safety calls against his own momentum.** Held a production rollout so the first-ever
  concurrent nightly would not run unattended over a weekend, and is holding two finished pull
  requests rather than merge them into the middle of somebody else's live migration.

---

## 4. Skills demonstrated

**Languages & data:** Python (primary), SQL (near-daily production querying), PySpark/pandas,
Delta/Parquet, YAML, and JSON.

**LLM & applied AI engineering:** prompt authoring and iterative tuning against real data (seven
detection prompts across nine rounds), LLM-backed service debugging across provider stages,
multi-modal input handling (video/audio transcription, frame decoding with ffmpeg and OpenCV),
model-deprecation migration planning, and vendor-claim benchmarking.

**Evaluation & measurement:** pre-registered evaluation protocols (judge model, rubric, sample size,
thresholds committed before running), LLM-as-judge harnesses, placebo-controlled steerability
testing, confidence-bounded accuracy reporting over raw ratios, recall/specificity analysis,
adjudication by mechanical evidence, and formal equivalence testing.

**ML & model serving:** MLflow (run artifacts, pyfunc models), Databricks model serving via
`/invocations`, AI Gateway inference logging, LightGBM, champion/challenger registries, batch
inference, blue/green deployment, shadow scoring and request fan-out, and ULP-level bit-exact parity
testing between scoring paths.

**Databricks & data platform:** Databricks Runtime migration, Unity Catalog (grants, lineage, audit
tables), DBFS, online (DynamoDB-backed) vs. offline feature stores, feature-table publish/refresh,
service principals and run-as identities, secret scopes and ACLs, and Lakehouse monitoring.

**Orchestration & CI/CD:** Apache Airflow (DAG gating and edges, cron scheduling, cross-DAG
sensors), Databricks Asset Bundles, GitHub Actions, dependency locking, and the staging-off-`main`
vs. prod-off-release-tag deploy distinction.

**Statistics & metrics:** MAPE and its failure modes (and the case for WAPE/median), prediction
intervals, NDCG and rank correlation, coverage-rate analysis, confidence bounds at small sample
sizes, and reconciling apparently contradictory metrics by finding different denominators.

**Working practice:** multi-lens adversarial self-review before shipping, mutation-verified testing
(proving a test fails against the pre-fix code), evidence-over-assumption debugging, honest scoping,
and heavy Claude Code usage including a custom automation suite.

---

## 5. Plain-English glossary (for translating jargon into copy)

- **Feature store / online vs. offline:** a database of pre-computed model inputs; "online" is the
  fast key-value store used at prediction time, "offline" is the bulk table used for training.
- **Serving endpoint:** the live web service that returns model predictions.
- **Batch inference:** scoring a large set of inputs on a schedule (nightly), vs. one-at-a-time
  live requests.
- **Champion/challenger:** the "champion" is the model currently making real decisions; a
  "challenger" runs in shadow to be compared before any promotion.
- **Shadow scoring:** running a candidate model on real inputs without using its output, purely to
  evaluate it.
- **MLOps:** the standardized framework and pipelines for training, deploying, and monitoring ML
  models in production.
- **Inference logging / monitoring dashboards:** recording every prediction a model makes so its
  health and accuracy can be tracked over time.
- **Recall vs. specificity:** recall is how many genuinely bad items the check catches; specificity
  is how many good items it correctly leaves alone.
- **Pre-registration:** committing to the evaluation rules before seeing any results, so the
  conclusion cannot be reverse-engineered into a win.
- **ULP (unit in the last place):** the smallest representable difference between two floating-point
  numbers; "within 3 ULP" means effectively identical, differing only by rounding.
- **Drift detection:** comparing the inputs a model sees today against the inputs it was trained on,
  to catch the world changing underneath it.
