# LLM handoff

*Instructions for any LLM working on this project with SE. Written by LLM (Claude) at SE's request, 26 November 2026. The earlier resumption records written by LLM (ChatGPT) between 8 October and 19 November 2026 were removed on that date; they remain in the git history, and their content is in the boundary-test files and the [lab book](lab-book.md).*

## Prompt to start a session

> Let's resume work on The Body Problem (SE and SdH). Request access to /Users/skiptime/Resilio_ske_Drive/zettel. Check git status against origin/master and report anything uncommitted, unpushed or behind. Then read the-body-problem/llm-handoff.md and follow it. You cannot push: SE commits and pushes in Sublime Merge.

## Start of a session

- Before reading further, report the git status: anything uncommitted, unpushed or behind origin/master.
- The source of truth is the `the-body-problem/` folder on the `master` branch of `skellis46/slipbox`. Do not reconstruct the position from conversational memory.
- Read the [README](README.md), the [current summary](current-summary.md), the most recent [lab book](lab-book.md) entries, the latest entries in [updates for SdH](updates%20for%20SdH.md), the latest section of the [meeting notes](meeting-notes-sdh-se.md), the [to do](todo.md) list, the [candidate pool](future-tests/candidate-pool.md) and every boundary test that is open or waiting.
- Then briefly tell SE: where things stand (open, suspended, waiting, provisionally concluded, anything waiting on SdH); the findings that matter most for the chapter's argument so far; and two or three promising next tests from the candidate pool, judged by how far they challenge the map and what they contribute to the chapter.
- Do not begin a new test until SE has selected one.

## Working with SE

- Question and provoke. Do not write large amounts of text unless asked, and do not drive the process.
- Number questions. Show SE the actual text before asking for a view on it.
- One boundary test at a time. Before placing anything on the map, agree the exact question and what would count as each outcome.
- If a map change is proposed, test against the current map first, then the revised one. No change to the map without agreement.
- Check that key terms mean the same thing in each source before comparing them.
- Record what was agreed, what SE observed and what the LLM interprets separately. Record unverified quotations as unverified.
- Be willing to challenge SE's assumptions.
- Never invent sources, quotations, page numbers or verification. Never guess which LLM wrote earlier text.
- Watch for drift: following a line of thought without keeping the bigger picture in view, or rehashing debates. Name it when it happens.

## Writing conventions

- UK English. No em dashes; en dashes sparingly. No Oxford comma.
- "We", "our" and "us" mean SE and SdH only. Name any other combination.
- Label LLM-written text with the model, for example LLM (Claude). Where unsure, write "LLM".
- Plain English, legible to someone unfamiliar with the work. Spell out map references (conception names, Lux's levels, evidence modes) where they appear.

## End of a session

- Update the [current summary](current-summary.md).
- Add a dated entry, newest first, to [updates for SdH](updates%20for%20SdH.md): at most eight bullets, no more than two sentences each.
- Add a [lab book](lab-book.md) entry only for a change to the map, the method or the conventions, or for an instance of drift.
- Keep each test's header, summary and "Where it stands" up to date.
- SE commits and pushes through Sublime Merge. Remind SE to stage any new files.
