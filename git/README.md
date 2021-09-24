# Git

## Git stash

- `git stash` stashes changes to tracked files or staged changes. Stash works like a first-in-last-out stack.
- `git stash -u` inclused untracked files
- `git stash -a` inclued ignored files
- `git stash list` lists all stashes
- `git stash show` shows stash-diffs
- `git stash show -p` shows full stash-diffs
- `git stash pop` applies changes from last stash and pops changes from stash-stack
- `git stash apply` applies changes and keeps them in the stash-stack (useful to apply same changes on multiple branches)

[Source](https://www.atlassian.com/git/tutorials/saving-changes/git-stash)
