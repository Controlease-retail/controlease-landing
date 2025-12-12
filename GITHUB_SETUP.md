# GitHub Repository Setup

## Option 1: Using GitHub CLI (Recommended)

1. **Authenticate with GitHub:**
   ```bash
   gh auth login
   ```
   Follow the prompts to authenticate.

2. **Create and push the repository:**
   ```bash
   gh repo create controlease-landing --public --source=. --remote=origin --push
   ```

## Option 2: Manual Setup

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Repository name: `controlease-landing`
   - Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license
   - Click "Create repository"

2. **Add remote and push:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/controlease-landing.git
   git push -u origin main
   ```

Replace `YOUR_USERNAME` with your GitHub username.

## After Setup

Your repository will be available at:
- `https://github.com/YOUR_USERNAME/controlease-landing`




