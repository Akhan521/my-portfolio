# Tatari Internship, Accomplishments Summary -- Aamir Khan
### AI/ML Software Engineering Intern, Tatari · Summer 2026 (June to August 2026, ongoing)

> A **sanitized, outward-facing** summary of Aamir's accomplishments at Tatari, meant to feed
> portfolio / GitHub / resume copy. Private internal details (ticket names/numbers, epic names,
> teammate and manager names, repository and release lists, internal ledgers) have been deliberately
> removed. Exact request/row/company counts are given as ballparks except in the "six things that
> most matter" list, which Aamir has kept as-is. All figures here are cleared by Aamir for public use.
> This is the foundation for the Tatari section of `tasks/aamir-info-bank.md`.

**Team context.** The internship sits inside Tatari's machine-learning platform team, on the
"performance" models: ML systems that predict advertising performance for linear (broadcast) and
streaming TV, served in production and retrained nightly on Databricks. Aamir worked in parallel with
a peer intern on the streaming counterpart.

---

## 1. Executive summary

Over nine weeks, the internship delivered dozens of shipped changes across many of the platform's
repositories, taking multiple workstreams from investigation through production rollout and permanent
regression guards. The work spanned production ML serving, batch inference, feature stores, MLOps
infrastructure, cost optimization, and cross-team incident response.

**The things that matter most:**

1. **Root-caused and fixed a multi-month production serving outage** that had silently returned NaN
   for every online feature lookup. The root cause -- a publish-vs-serve key-order mismatch in the
   platform's feature store -- was confirmed byte-level against library source and **adopted into the
   platform team's own postmortem**. Fixed, validated in prod, and sealed with a permanent regression
   test so the class of bug cannot recur silently.
2. **Built and shipped the generic batch routing client** (the largest single build of the
   internship): registry-driven champion/challenger fan-out with its own OAuth2 M2M auth layer.
   Verified in production at **3,435,473 rows, 100% non-null, 424 companies**, then optimized so
   champion and challenger scoring overlap -- measured at **80.0 min vs. ~145 min, roughly 45%
   faster**.
3. **Found a real security vulnerability in his own code before it shipped** (an unvalidated
   registry-supplied URL that could redirect a live auth credential to an attacker-controlled host),
   and separately **held a security bar on a teammate's PRs** through an entire incident close-out,
   withholding approval under deadline pressure and being proven right three rounds later.
4. **Prevented at least two production incidents**: a proposed data prune that would have silently
   dropped **3.44M daily predictions**, and a stale branch that would have deleted a teammate's
   already-merged monitoring entry.
5. **Established an unusually strong evidence-and-correction discipline.** Across the internship he
   overturned roughly a dozen claims -- most of them his own, several already published to the team --
   including a parity number corrected *in the team's favor*, an impact estimate that measured to
   exactly zero, and a headline performance figure that would otherwise have made a correct result
   look like a regression.

---

## 2. Major workstreams

### Linear-performance inference logging and the multi-month serving outage -- **closed**
*The foundational arc of the internship.*

Assigned the linear inference-logging and dashboard project, run in parallel with a peer's streaming
equivalent. Took it from scoping through a production-validated serving fix and a live team demo.

- **Shipped the pipeline changes:** gated the batch prediction step on a serving-endpoint test, and
  reworked the batch prediction path to source predictions from the endpoint's `/invocations` route
  so the endpoint emits inference logs -- a unit-testable pure-pandas client with bounded concurrency
  (a thread pool, ~30 requests in flight, cutting a ~40-minute sequential scoring step), order-
  preserving key re-attachment, and count-integrity guards, plus data lineage and the final dashboard
  registration.
- **Root-caused a multi-day, cross-team blocker.** The endpoint returned all-NaN. He traced it to a
  feature online store that had been frozen months earlier by a prior cost-saving change, got it
  republished, then methodically eliminated data, feature-spec, staleness, deploy-time binding, and
  host/auth as causes -- isolating the failure to the platform's serving-time key-value read.
- **Definitively root-caused it as a publish-vs-serve key-order mismatch**, confirmed byte-level by
  reading the Databricks feature-store library source on *both* the publish and serve sides, and
  corroborated four independent ways. He explicitly refuted his own earlier theory in the process.
  **The finding was adopted into the platform team's postmortem.**
- **Built and validated the fix** across four coordinated PRs in four repositories, establishing the
  subtle correctness detail that it needs *both* a primary-key reorder and a lookup reorder, because
  the platform trains by registered-PK order but serves by physical column order. Dev-proved it end to
  end (finite per-key predictions where there had been all-NaN), then rolled it to production.
- **Surfaced and fixed downstream null-resilience gaps** on both the current and legacy model
  generations, closing the loop rather than fixing only his own surface.
- **Shipped a permanent regression guard:** replaced a no-op endpoint-test stub with a real
  `/invocations` call that fails loudly on null predictions, and gated the pipeline on it, so this
  class of silent failure cannot recur.
- **Capped by a live internal demo** of the finished dashboards.

### The champion/challenger router and the generic batch routing client -- **core pieces shipped**
*The largest build of the internship.*

**Design phase.** A shadow-endpoint design question had stalled for over a week. He worked a long
design thread to a concrete decision, verified its load-bearing assumptions directly against code
(finding the sibling system it was modeled on isn't actually called at the assumed batch scale),
tracked down what was *actually* blocking the decision (an unbuilt auth path and untested proxy
capacity, not design complexity), and drove it to a locked decision in a live sync the same day. He
then **adversarially reviewed his own consolidated research before trusting it**, catching a 5x volume
miscalculation, a misattribution, and a misquote.

**The registry.** Shipped end to end in under two days: shared family-neutral response models, the
registry module, and an authenticated read endpoint. Made a proactive design call mid-implementation
to extract a shared component rather than let it be duplicated a third time for the streaming sibling.
Verified in staging with a documented business-level smoke test in the product UI, not just a
technical health check.

**The batch routing client.** The nightly batch fans out to the champion plus shadow challengers,
keeping only the live result while shadow scores flow to inference tables for evaluation.
- **Found and fixed a real security vulnerability via self-review:** the client trusted a URL returned
  in the registry response without validation -- a compromised registry could have redirected a live
  auth credential to an attacker-controlled host. Fixed with a strict allowlist plus tests.
- **Engineered around a blocker instead of idling:** with production credentials pending an external
  team, he fully coded *and proved* the final phase using an injected fake connection to write a
  byte-identical-output test, holding it on a branch so it could ship the moment credentials landed.
- **Empirically pinned the real nightly run-as service identity** rather than trusting a config guess
  that would have failed silently at runtime.
- A staging gate then caught a genuine prod-blocking dependency incompatibility, which he diagnosed
  precisely (including that a tagged release was an unpublished draft absent from the artifact repo)
  and resolved.
- **Verified in production** at millions of rows, all non-null, with a rollback runbook written before
  it was needed.

**Overlap optimization and green rollout.** Reworked the client so champion and challenger scoring
**overlap rather than run sequentially** (total wall time becomes the max of the runners, not the
sum), with a test suite grown by more than a dozen tests and proven non-vacuous (they fail against
the old code). Made a **disciplined weekend-safe deploy call**, holding the production tag so the
first-ever concurrent nightly wouldn't run unattended, after verifying prod couldn't auto-adopt the
change. Measured the result at **~45% faster**, then registered a new candidate model as a shadow
challenger in both families and confirmed it live at full traffic, bit-identical to the incumbent.

**Hardening.** Bounded the multiplicative thread/socket exposure by capping the registry read,
choosing to **fail rather than truncate** because the registry contract is active-last and truncation
would silently drop the champion. For a follow-on hardening task he **reproduced every finding live**
rather than taking them on faith, rescoped it to one right-sized PR, and an adversarial second pass
found several *more* issues the task itself had missed.

### Standardized MLOps model port, mirrored service, and monitoring -- **closed**

- **Ported the linear LightGBM model into the standardized MLOps framework** (Databricks Asset Bundles
  + MLflow pyfunc + a Feature-Store training notebook), dev-verified at a clean 100% pass (every
  supported row non-null on real dev data). Caught a cluster-only bug that local linting structurally
  cannot catch, and proactively converged his port with the peer's parallel streaming port on every
  best-practice dimension.
- **Stood up a new "green" mirrored service and launched it to production.** He first corrected the
  task's own scope (a stale description had it as re-verifying an existing endpoint; it was actually a
  new repository), then scaffolded and byte-for-byte verified the mirror, launched to prod, and
  verified with a real inference probe. A 5-lens self-review of the smoke-test backport **caught a
  real bug** -- the retry client retried non-retryable HTTP codes against its own docstring -- fixed
  with regression tests in both repositories.
- **Shipped production inference logging and dashboards** for both blue and green deployments, standing
  up Lakehouse monitors ACTIVE with resolving dashboards in production.

### Serving-parity verification -- **closed**

Verified that a prior batch-scoring cutover produced predictions identical to the path it replaced --
something never actually parity-checked before. Established that **Delta time-travel pinning is
mandatory** (comparing against a live table invents a phantom row gap), and worked around a Unity
Catalog permission denial by **loading the served models from MLflow run artifacts over DBFS and
scoring locally** rather than escalating for grants.

**Result: linear is literally 100% bit-exact** across three served dates; streaming holds ~79% with a
genuine <=3-ULP floor after the LightGBM Booster. Notably, that 100% figure came from a self-review
that **overturned a previously-published number in the team's favor** -- the earlier "~1-ULP
discrepancy" was an artifact of a lossy default CSV parser, not the cutover. Consolidated the
throwaway scripts into a single parameterized, checked-in tool the streaming side can consume by
import. Surfaced two genuine defects: streaming scores on the previous day's features (a cross-DAG
cron race), and its grid key isn't unique.

### Dashboard metrics-quality investigation -- **execution tail closed**

A demo raised questions about "null features" and low prediction coverage. The investigation
**reframed the entire premise**:

- The "null features" signal is a **logging artifact** -- the endpoint is called keys-only and
  resolves features server-side, so those columns are structurally null in the log. Not a
  data-quality problem.
- The ~56% NaN prediction rate is **by design** -- the scorer cross-joins every company by network at a
  sentinel forecast week and correctly masks pairs with no history -- which reconciled a 56%-vs-97%
  disagreement between two colleagues as a denominator difference, with both correct.
- **Found a real high-leverage data bug:** one company emitted `actual` values up to 3.6M, poisoning
  MAPE. Removing 2 of ~5,000 rows dropped one day's MAPE from **9.22 to 3.35**. Root cause: a
  `lift/spend` computation guarded only against zero spend while training filters at a much higher
  threshold -- a filter asymmetry.
- Turned the findings into a priority-ordered plan, then worked its execution with a
  validate-before-you-build discipline that changed the outcome in several items: closed two of them
  without building anything (impossible acceptance criteria in one, an already-disproved premise in
  the other); fixed a `for y in [...]: y = y.loc[...]` loop that rebinds the loop variable and does
  nothing, so uncertainty and prediction-interval metrics had been scoring on *unfiltered* rows
  (streaming's metrics moved ~10%); **overturned his own release-hold advice** after measuring the
  linear impact at exactly 0 of ~5,000 rows/day; and found one item's premise was **backwards** --
  building what it asked would have been a regression -- so he dropped that scope and shipped only the
  real part.
- **The adversarial review of his own fix uncovered a 46-night silent outage:** streaming's grading
  step had been dark for 46 nights while scoring stayed healthy, because a scratch-bucket write plus a
  swallowed path error stopped it without tripping any monitor. Traced to the exact commits and handed
  to its owner.

### Cost optimization -- **closed**

- **Ran a real-dollar cost investigation from raw billing data.** Neither the AWS nor the Databricks
  cost dashboard could isolate a single table, so he bypassed both and queried the raw billing table,
  deriving unit costs from billing rather than price sheets (about $870/mo in staging measured,
  ~$1,695/mo in prod projected). Reconciled two apparently contradictory readings as
  correct-for-different-periods, and **caught that a ~4x cost drop people were crediting to his filter
  was actually "prod dormant vs. active"** -- correcting the message before it reached leadership. When
  a manager was skeptical the numbers were too high, he rebuilt the entire calculation from scratch
  rather than defend the first pass.
- **Prevented a production incident.** A proposed prune of a large, stale-looking partition (about 85%
  of every publish) looked like obvious dead weight from surface data. Reading the actual
  nightly-rebuild and scoring code showed millions of combinations are scored against it daily --
  **pruning would have silently dropped ~3.44M real daily predictions.** He corrected a wrong claim
  already sitting in a shared doc.
- **Found and shipped the biggest cost lever of the internship in a single day:** verified in code
  (not by assumption) that one of two metric types is never trained on, scored, or turned into a
  prediction, making it a **roughly-half cut in write volume (from ~8.0M to ~4.1M rows/day) with zero
  downstream risk.**

### Standalone production bug fixes
- **Root-caused, fixed, reviewed, merged, and staging-verified** a new production-adjacent pipeline
  failure **within 48 hours.** Three rounds of adversarial review caught a regression risk in the
  naive fix (it would have silently swallowed the same error in production and killed alerting there),
  so the shipped fix is **environment-gated:** raises in prod, degrades gracefully elsewhere. He also
  folded in a second latent bug found in the same file.
- Ported an empty-input fail-fast guard so an empty frame is blamed on the upstream feature build
  rather than misread as a serving failure. Filed, implemented, reviewed, merged, and closed the same
  day.

---

## 3. Production incidents and outages

### 3.1 The multi-month all-NaN serving outage -- **resolved**
Every online feature lookup silently returned NaN for roughly four months (millions of daily
lookups). Root-caused to a publish-vs-serve key-order mismatch in the platform's feature store,
confirmed byte-level against library source. **Adopted into the platform team's postmortem.** Fixed in
prod across both model generations and sealed with a permanent regression test.

### 3.2 The 46-night silent metrics outage -- **found and handed off**
Discovered via adversarial review of his own unrelated fix. Streaming's grading step had been dark for
46 nights while scoring stayed healthy -- a scratch-bucket write plus a swallowed path error stopped it
without tripping a single monitor. Traced to the exact commits.

### 3.3 Incidents prevented
- **~3.44M daily predictions** -- a proposed prune that surface data made look safe (see §2, cost
  optimization).
- **A teammate's merged work** -- a stale prepped branch would have silently deleted their
  already-merged monitoring entry instead of adding his alongside it. Caught pre-merge and rebuilt.
- **An untagged change leaking to prod** -- documented the previously-unwritten fact that staging
  deploys off `main` HEAD while prod deploys off release tags, and wrote the safe sequencing runbook.

### 3.4 Alerts correctly triaged
- Cleared a P2 alert on a sibling model **four independent ways**; when a manager on the affected team
  pushed back, he went back to the raw data rather than defend his answer and found a **materially
  better** root cause (a ~2-minute traffic burst that self-recovered). He also surfaced that the team's
  dashboards only aggregate daily, so short incidents are structurally invisible.
- Correctly triaged a second P2 (sustained unauthorized-request errors) as his own verification
  traffic rather than escalating or dismissing it.

---

## 4. Judgment, influence, and non-code contributions

- **Moved a team decision with a written explainer.** During a Databricks Runtime migration, he wrote
  a clarification of what actually triggers a real production deployment vs. a training run. The team
  had planned to hold off migrating their production model until the mentor returned from leave; after
  the explainer they concluded the proven low-risk approach applied and moved ahead the same day,
  **advancing that work by weeks.**
- **Recognized when ownership had shifted and stepped back.** When a data-platform teammate decided to
  run a migration himself, he moved to reviewer rather than duplicate the work. Separately, after
  building the first phase of a task, he recognized in review that it mechanically overlapped a peer's
  work, **paused his own**, and reassigned it rather than press on.
- **Knew what not to send.** On a task he had filed himself, the investigation surfaced a
  retain-vs-delete decision belonging to the model's owner, so the drafted messages to the wider team
  were deliberately held rather than sent.
- **Made deploy-safety calls against his own momentum:** deferred a prod deploy over a weekend so the
  first-ever concurrent nightly wouldn't run unattended; held the production half of a rollout at the
  end of a long day in favor of a clean handoff; and gated a challenger registration on verifying the
  prior night's run rather than firing it blindly.
- **Built shared knowledge, not just fixes:** runbooks (prod rollback, deploy sequencing, staging
  recovery), research docs adopted by teammates, a reusable parity tool consumable by import, and a
  two-person status dashboard hardened against its own failure modes.
- **Mentored laterally:** unblocked the peer intern repeatedly with concrete file-level pointers,
  compiled cross-repo resource indexes, and gave structural feedback on a review tool the peer built.

---

## 5. The self-correction record

The most distinctive pattern of the internship, and it cuts against his own interest as often as for
it. A representative list:

| What he corrected | Direction |
|---|---|
| A published parity number: "~1-ULP discrepancy" was a lossy CSV parser, not the model | **In the team's favor** -- linear is 100% bit-exact |
| His own release-hold advice: measured the impact at **exactly 0 rows/day** (vs. a repeated "<0.1%") | Against his own prior recommendation |
| A project headline figure: a 34-min shadow leg was a warm-endpoint artifact; steady state ~72 min | Prevented a correct result looking like a regression |
| His own "no usable signal" conclusion -- the cause was his own aggregation-axis error | Reversed himself; real signal R^2 ~0.15-0.24 |
| A dashboard-dependency justification already written to the team -- the dashboards were deleted | Retracted his own published claim |
| Two of his own risk flags (an "exposed" token already dead; "removable" connectors that were org-provisioned) | Walked both back after checking |
| His own research: a 5x volume miscalculation, a misattribution, a misquote | Caught pre-publication by adversarial self-review |
| His own demo slide understating a metric by ~1000x | Caught and fixed before presenting |

**Why this matters:** several of these were already published to the team, and several made his own
work look less impressive. The habit is what makes the *uncorrected* numbers trustworthy.

---

## 6. Skills developed

**Languages & data:** Python (primary), SQL (near-daily production querying), PySpark/pandas,
Delta/Parquet, plus working exposure to Terraform/tfvars, YAML, and JSON.

**ML & model serving:** MLflow (run artifacts, pyfunc models), Databricks model serving via
`/invocations`, AI Gateway inference logging, LightGBM (incl. Booster artifacts), champion/challenger
registries, batch inference, blue/green deployment, shadow scoring and request fan-out, and ULP-level
bit-exact parity testing between scoring paths.

**Databricks & data platform:** Databricks Runtime (incl. a 16.4 migration), Unity Catalog (schema
grants, lineage), DBFS, online (DynamoDB-backed) vs. offline feature stores, feature-table
publish/refresh, service principals and run-as identities, secret scopes and ACLs, and storage-volume
job configuration.

**Orchestration & CI/CD:** Apache Airflow (DAG gating and edges, cron scheduling, cross-DAG sensors),
Databricks Asset Bundles, GitHub Actions, AWS CodeArtifact, dependency locking and checksum
verification, and the staging-off-`main` vs. prod-off-release-tag deploy distinction.

**Production debugging & cloud infrastructure:** Kubernetes/Helm service and ingress configuration
(path routing, multi-port services, websocket routing), ArgoCD across multiple clusters, Loki/Grafana
log search, the External Secrets Operator refresh model, Backstage-managed secrets, and Terraform
state/lifecycle reasoning.

**Auth & security:** OAuth2 machine-to-machine authentication, secret delivery via 1Password,
URL-allowlist hardening against SSRF-style redirect risks, supply-chain risk in CI action pinning,
script/template-injection patterns, and recognizing and refusing a prompt-injection attempt.

**Statistics & metrics:** MAPE and its failure modes (and the case for WAPE/median), prediction
intervals, NDCG and rank correlation, coverage-rate analysis, and reconciling apparently
contradictory metrics by finding different denominators.

**Working practice:** multi-lens adversarial self-review before shipping, mutation-verified testing
(proving a test fails against the pre-fix code), evidence-over-assumption debugging, honest scoping,
and heavy Claude Code usage including a custom automation suite (daily logs, weekly accomplishments,
Slack standups, an automated morning brief, and a two-person status dashboard).

---

## 7. Plain-English glossary (for translating jargon into copy)

- **Feature store / online vs. offline:** a database of pre-computed model inputs; "online" is the
  fast key-value store (DynamoDB) used at prediction time, "offline" is the bulk table used for
  training.
- **Serving endpoint / `/invocations`:** the live web service that returns model predictions.
- **Batch inference / `batch_predict`:** scoring a large set of inputs on a schedule (nightly), vs.
  one-at-a-time live requests.
- **Champion/challenger:** the "champion" is the model currently making real decisions; a
  "challenger" runs in shadow to be compared before any promotion.
- **Shadow scoring:** running a candidate model on real inputs without using its output, purely to
  evaluate it.
- **Blue/green:** two parallel deployments of a service so one can be updated/tested without disturbing
  the other.
- **MLOps:** the standardized framework and pipelines for training, deploying, and monitoring ML models
  in production.
- **Inference logging / monitoring dashboards:** recording every prediction the model makes so its
  health and accuracy can be tracked over time.
- **ULP (unit in the last place):** the smallest representable difference between two floating-point
  numbers -- "within 3 ULP" means effectively identical, differing only by rounding.
- **M2M / OAuth2:** how one automated service proves its identity to another without a human logging in.
- **ArgoCD:** the tool that keeps what's actually running in a Kubernetes cluster in sync with what's
  declared in Git; "restarting the deployment" through it is how a service picks up a new secret.
- **External Secrets Operator:** syncs secrets from a central store into the cluster on a schedule --
  which is why saving a new key doesn't take effect until both the sync *and* a pod restart happen, in
  that order.
- **Websocket / HTTPRoute:** a websocket is a persistent two-way connection a live UI uses; an
  HTTPRoute decides which URL paths go to which port -- if the websocket path isn't routed, the page
  loads but never updates.
- **NDCG / rank correlation:** measures of whether a model *ranks* things in the right order, as
  opposed to whether its predicted numbers are close.
