# git workflow

Repository: `skellis46/slipbox`  
Shared branch: `master`  
Git application: Sublime Merge

## 1. Working directly on master

For adding research notes, references or making straightforward edits.

1. Switch to `master` in Sublime Merge.
2. **Pull** to get Simon's latest changes.
3. Edit or add files using your preferred editor.
4. **Stage** the changed files in Sublime Merge.
5. **Commit** with a short description of your changes.
6. **Push** to GitHub.

Simon can now pull your changes.

## 2. Working on a branch

For substantial revisions or changes you want Simon to review and discuss.

1. Switch to `master` and **Pull**.
2. **Create Branch** (Repository → Create Branch). Give it a descriptive name, e.g. `scott/embodiment-revision`.
3. Edit or add files as normal.
4. **Stage → Commit → Push** in Sublime Merge.
5. Open GitHub and select **Compare & pull request**.
6. Check that the base is `master` and create the pull request.
7. Discuss changes with Simon using comments. Make further edits, commit and push if necessary.
8. **Merge pull request** on GitHub once agreed.
9. Switch back to `master` in Sublime Merge and **Pull**.
10. Delete the old branch once the merge is complete.

## 3. A few rules

- Always **Pull before starting** work on `master`.
- Always **Commit and Push** when you want to share changes.
- Use branches when you want to propose changes rather than immediately incorporate them.
- Don't edit the same passage on `master` simultaneously without coordinating.
- Never **Force Push** to `master`.
- GitHub is the shared source of truth. Your local files are your working copy.

**Remember:** Pull = receive changes. Push = share changes. Commit = record changes locally.