# Lab book

*Renamed from `decisions.md` on 26 November 2026. Text by LLM (Claude) at SE's request unless an entry says otherwise.*

A short record of the moments the process changed, newest first. It is meant to be useful to people and to machines reading the project cold.

## What goes in

Each entry has one or more type tags:

- **Map**: a change to the map, or a proposed change.
- **Method**: a change to how the work is done, across the whole process, not only the boundary tests (for example, SdH bringing the trade literature into the repository).
- **Convention**: a change to how the record itself is written or organised.
- **Drift**: a moment when the work slid away from its question or terms, recording who noticed, what drifted, how it was noticed and what was done.

Opening, suspending or concluding a boundary test is **not** recorded here; each test file carries its own status. The tags are being tried out and may change in practice.

Heading format: `YYYY-MM-DD HH:mm GMT/BST | Type | Status | Scope`. Where the time is unknown, give the date only. Do not silently rewrite an entry; add a new one that points back to it.

## Entries

### 2026-11-26 11:55 GMT | Convention | Agreed (SE) | Project-wide

**Attribution from git:** where a file's text was written by an LLM, the model is identified from the commit history, using what SE has confirmed about each account. Commits by `skellis` (GitHub no-reply address) between 8 October and 5 November 2026 were made by ChatGPT through its GitHub connector. Work from 19 November 2026 onwards was done with Claude, committed from SE's machine. A commit shows which LLM wrote a file to the repository, not that it wrote every word; SE's contributions within an exchange are covered by "in iterative exchange with SE". Where neither git nor SE can settle it, the label is "LLM" alone.

*Entry written by LLM (Claude) at SE's request.*

### 2026-11-26 11:40 GMT | Convention | Agreed (SE) | Project-wide

**Decision (SE; to be shared with SdH):** `decisions.md` becomes this lab book. It records only map, method, convention and drift entries, newest first. The 8 October legacy summary and twelve entries that repeated what is in the boundary-test files were removed (they remain in the git history). The earlier append-only rule is replaced: entries are not silently rewritten, but the log can be trimmed when it duplicates other files. The four type tags are being tested in practice.

### 2026-11-26 10:15 GMT | Convention | Agreed (SE) | Project-wide

**Decision (SE; to be shared with SdH):** a pronoun and attribution convention for the repository. "We", "our" and "us" mean SE and SdH only; other combinations are named. Co-authors are referred to as **SE** and **SdH**. LLM-written text is labelled, naming the model where known, for example LLM (ChatGPT) or LLM (Claude). Signed first-person notes are left as written. See the [README conventions](README.md#conventions).

**Reorganisation:** instructions addressed to LLM sessions and the dated resumption records were moved from the README to [llm-handoff.md](llm-handoff.md). `quotes/README.md` was renamed [`quotes/about-quotes.md`](quotes/about-quotes.md) and `sources/README.md` was renamed [`sources/source-inventory.md`](sources/source-inventory.md), so the README is the only README. "One co-author" was replaced by SE throughout.

*Entry written by LLM (Claude) at SE's request.*

### 2026-11-20 | Method | Agreed (SE and SdH) | Whole process

**Form of the outcome:** what SE and SdH produce (for now, "the chapter") uses language as a constraint, not something to be bypassed, and may include diagrams or drawings. No audio, no video and no expositions. The challenge noted is to account for non-propositional knowing differently while still materialising it visually.

*Entry added by LLM (Claude) on 26 November 2026 from the [meeting notes](meeting-notes-sdh-se.md) of 20 November and SdH's [Nutshell note](analogue_trade/The_Body_Problem_in_a_Nutshell.md).*

### 2026-11-19 12:38 GMT | Map, Method | Agreed findings; proposed map change | BT-07

**Two-stage method agreed:** place Nelson (2022) against the current map, then against a proposed revised key, to avoid confirming a revision made in anticipation of the test.

**Stage 1 finding (agreed):** a conceptual boundary. The dimension title "type of evidence or knowledge" can suggest evidence and knowledge are the same; the map cannot hold praxis as both. Know-what is strained and convergence cannot be shown. The test also exposed contested wording in the practice marker. The problems belong to the map's construction by SE and LLM (ChatGPT).

**Proposed map change (SE; not agreed with SdH):** title → "How claims are investigated and supported"; pentagon → "practice-based".

**Stage 2 finding (agreed):** the revision removes the conceptual boundary, but Nelson's kinds of knowing then have no place on this dimension or elsewhere on the map. This is not a C07b finding.

**Provenance recorded:** the six modes were devised with LLM (ChatGPT); an LLM summary of their development is secondary and partly corrected by SE. Several LLM claims were withdrawn. See [BT-07](boundary-tests/BT-07-knowing-and-evidence.md). BT-07 is not yet provisionally concluded.

### 2026-11-05 | Method | Decided by SE | Whole process

**Simpler tests:** SE proposed simpler boundary tests (BT-05 was the first) to avoid ontological and epistemological debates with LLM (ChatGPT) that did not push the enquiry forward and were, for the most part, being rehashed. Behind this is a recognition that the process is hard to contain intellectually and that it is easy to lose track of what is happening at a high level. That is partly about working with an LLM and partly about the scale of the project.

*Entry written by LLM (Claude) from SE's account, 26 November 2026.*

### 2026-11-05 | Method | Agreed direction; provisional inventory | Future tests

**Decision:** Maintain a Markdown [candidate pool](future-tests/candidate-pool.md) for possible future boundary tests, including the simpler tests suggested on 5 November and lines emerging from BT-01 through BT-05. Preserve **origin/provenance** as analytical data, documenting how proposals evolve rather than merely enumerating topics.

**Selection preference:** Favour bounded tests that both evaluate the provisional map and help develop the chapter's argument about the body problem. This is a preference, not an entry criterion. The fourteen candidate questions, M/A assessments and difficulty estimates are **LLM (ChatGPT) proposals** pending selection, not collectively agreed questions. No additional test number, priority order or map alteration was agreed.

### 2026-10-16 | Method | Agreed (SE and SdH) | Whole process

**SdH joins the repository:** SdH was set up to work in GitHub, with a new `analogue_trade` folder for the trade literature and a [git workflow](git%20workflow.md) to follow each time. SE and SdH agreed to work separately for now and to use branches when working on a document together.

*Entry added by LLM (Claude) on 26 November 2026 from [simon updates](simon%20updates.md) (written by SdH) of 16 October.*

### 2026-10-14 | Drift | Recorded 26 November 2026 | BT-03

*Written by LLM (Claude) from the BT-03 record and SE's account, 26 November 2026.*

- **Who noticed:** SE.
- **What drifted:** in comparing four texts, LLM (ChatGPT) moved between *awareness*, *consciousness*, *conscious experience*, *deliberate attention* and *reportability* as though they were interchangeable. LLM (ChatGPT) also presented treating consciousness as awareness as a novel claim originating with SE; it is an existing usage in wider discourse.
- **How it was noticed** *(SE, 26 November 2026)*: LLM (ChatGPT) seemed to be following its nose without keeping the bigger picture in mind, and SE and LLM (ChatGPT) were in a rabbit hole of questions about consciousness.
- **What was done:** SE corrected the attribution and BT-03 was suspended without a finding. The method lesson in the next entry followed.

### 2026-10-14 | Method | Agreed (SE and LLM (ChatGPT)) | Project-wide, from BT-03

**Lesson:** Before treating a concept as a cross-account discriminator, establish whether its meanings and uses are sufficiently comparable in the actual sources. Otherwise apparent contrasts may derive from the researchers' shifting terminology rather than differences between accounts. The map has not thereby been shown to fail; awareness may be beyond this map's current scope, but that remains provisional.

### 2026-10-14 09:44 BST | Map, Method | Agreed and provisional | Project-wide

**Agreed:** The initial use of Lux et al. (2021) as the basis for the maps was exploratory and somewhat arbitrary, motivated by curiosity. The maps are working instruments, not taxonomies bound by fidelity to Lux et al. Methodological rigour should be proportionate and support progress.

**Agreed:** Case choice materially affects the enquiry. Whether an account falls within, at the edge of or outside the map must be established through examination, not preassigned as a selection result. Record why cases are chosen, without assuming the comparison's outcome.

**Provisional scope, not settled:** For now, examine accounts within and at the edges of the map, allowing genuinely outside accounts to emerge; a more explicit search outside may come later. The extent to which this should be the guiding scope remains open. Retain the uncertainty rather than silently treating this as an exclusion rule.

**Practical direction:** Use a proportionate, transparent selection of a few identifiable primary accounts rather than elaborate sampling machinery. The four-case scheme already noted in BT-03 is a proposal, not a requirement or an agreed set.

### 2026-10-09 | Method | Agreed (SE and SdH) | Whole process

**Crude difference:** for now, SE and SdH keep their processes separate. SdH works with analogue material (dance's trade literature, largely not digitised); SE works with digital material (the boundary tests with LLM (ChatGPT)). Both processes are partial; whether and how they bridge is left open.

*Entry added by LLM (Claude) on 26 November 2026 from the [meeting notes](meeting-notes-sdh-se.md) of 9 October.*

### 2026-10-08 | Method | Agreed (SE and LLM (ChatGPT)) | Project-wide, from BT-02

**Failure points:** no account is required to fit every dimension of the map. Poor fits, or "failure points", are recorded rather than smoothed away. They may show limits of the map or shed light on the conceptions and assumptions being mapped. A dimension that does not apply is not the same as a strained or distorting classification. See [BT-02](boundary-tests/BT-02-embodiment-without-experience.md). *Entry added by LLM (Claude) on 26 November 2026 from the 8 October summary; original time not recorded.*

### 2026-10-08 | Method | Decided by SE | Whole process

**Where the record lives:** SE decided that the research record (the `the-body-problem/` folder, first committed on 8 October at 12:23) is kept in Markdown in the existing GitHub repository of SE's Obsidian vault (`skellis46/slipbox`), with updates recorded explicitly.

*Entry added by LLM (Claude) on 26 November 2026 from the 8 October summary in the former `decisions.md`; original time not recorded.*

### 2026-10-08 15:27 BST | Convention | Agreed | Project-wide

**Decision:** Use a dated and time-stamped chronological record for substantive decisions and changes of position. Apply the statuses **Agreed**, **Provisional**, **Revised** and **Rejected** where appropriate. Distinguish proposed questions from agreed decisions. Preserve earlier entries and record changes as new dated entries rather than silently replacing earlier positions.

**Scope:** This convention applies to future research decisions and boundary tests. Existing thematic decisions are preserved without invented historical times. Git commit timestamps remain a separate audit trail.

*Partly superseded by the 26 November 2026 11:40 entry.*
