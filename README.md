# git-node-autochangelog
git-hook / post-commit / Auto-Changelog


## What is it?
If you maintain a *changelog.txt* by hand, stop now. 

    git commit -m "A change that goes to the changelog $" -m "Description .........."

This will be added to your changelog.txt. Because there is a trailing Dollar-$-Sign at the end.

    git commit -m "A change that will not go to the changelog" -m "Description .........."
    
    
## How does it work?
Your changelog.txt contains a placeholder where your insertions will be put. That's it.

## But how do I use it?
1. Copy hooks/post-commit script to your .git/hooks/post-commit
2. Copy post-commit.js to .git/../post-commit.js (so basically to your git base directory)
3. Customize the changelog path and the placeholder in post-commit.js
4. Done

