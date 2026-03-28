# Resume

Private repository managing JSON Resume files with automated deployment.

## Resumes

| Person | File | GitHub Pages | Registry |
|--------|------|-------------|----------|
| Sudhansu Bhatta | `resumes/sudhansu.json` | [sudhansu08.github.io/resume](https://sudhansu08.github.io/resume/) | [registry.jsonresume.org/sudhansu08](https://registry.jsonresume.org/sudhansu08) |
| Priyanka Mohapatra | `resumes/priyanka.json` | [sudhansu08.github.io/resume/priyanka](https://sudhansu08.github.io/resume/priyanka/) | [registry.jsonresume.org/sudhansu08?gistname=resume-priyanka.json](https://registry.jsonresume.org/sudhansu08?gistname=resume-priyanka.json) |

## How It Works

1. Edit resume JSON files in `resumes/`
2. Push to `main`
3. GitHub Actions automatically:
   - Builds HTML using [resumed](https://github.com/rbardini/resumed) + [elegant theme](https://github.com/mudassir0909/jsonresume-theme-elegant)
   - Deploys to GitHub Pages
   - Syncs JSON to public GitHub Gists

## Local Development

```bash
npm install
npm run build      # Generate HTML in dist/
npm run validate   # Validate resume JSON files
```

## Adding a New Resume

1. Create a new public gist on GitHub
2. Add a new JSON file in `resumes/`
3. Add a sync job in `.github/workflows/sync-gists.yml` with the gist ID
4. Push to `main`

## Setup

### GitHub Personal Access Token

Create a [personal access token](https://github.com/settings/tokens) with the `gist` scope and add it as a repository secret named `GIST_TOKEN`:

```bash
gh secret set GIST_TOKEN
```

### GitHub Pages

Enable GitHub Pages in repository settings with **Source: GitHub Actions**.
