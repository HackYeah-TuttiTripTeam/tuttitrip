---
name: open-pr
description: Open a pull request in the tuttitrip umbrella repo (README, AGENTS.md, submodule bumps) with the team's title format and Polish description template. Use when asked to open/create a PR or to ship a change in this repo.
---

# Open a PR (umbrella repo)

This repo has only `main`. Code changes belong in the `frontend`, `backend`
or `worker` repos and their own `open-pr` skills; here PRs change the README,
AGENTS.md or bump the submodules.

1. Branch from fresh `main`:
   `git fetch origin && git switch -c <type>/<short-kebab-name> origin/main`
   with `<type>` = `feature`, `fix`, `docs` or `chore`.
2. Commit with an imperative subject (< 72 chars). No AI attribution trailers.
3. PR title: `feat:`, `docs:`, `chore:` or `bugfix:` (not `bug:`, that prefix
   is for issues), optionally with a scope, then a Polish description, e.g.
   `chore(submodules): Podbić frontend do najnowszego main`. It must match
   `^(feat|docs|chore|bugfix)(\([a-z0-9-]+\))?: \S.{3,}`.
4. Push and open the PR:

   ```bash
   git push -u origin HEAD
   gh pr create --base main --title "docs: <opis>" --body-file - <<'MD'
   ## Co i dlaczego
   <1-3 zdania: co zmienia PR i po co>

   ## Powiązane issue
   Closes #<numer>   (dla docs i chore może być "brak")

   ## Lista zmian
   - <zmiana>

   ## Jak przetestować
   1. <kroki>

   ## Zrzuty ekranu
   nie dotyczy

   ## Checklista
   - [ ] linki i polecenia sprawdzone
   - [ ] brak sekretów w treści i opisie
   MD
   ```

5. Wait for `PR format / check` (`gh pr checks --watch`). It goes red with a
   bot comment when the title or a section is wrong; a red check does not
   block the merge button (free plan), so fix it before merging.
6. Merge with "Squash and merge" (`gh pr merge --squash --delete-branch`); the
   PR title becomes the commit on `main`. This repo has no release notes.

Rules: https://github.com/HackYeah-TuttiTripTeam/.github/blob/main/CONTRIBUTING.md
