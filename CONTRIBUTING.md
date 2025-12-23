# Contributing (HealthArchive Frontend)

## Quickstart

- Install: `npm ci`
- Dev: `npm run dev`
- Full checks (what CI runs): `npm run check`

## Optional: pre-commit

This repo includes a `.pre-commit-config.yaml` with fast, mechanical checks (whitespace/EOF, YAML/TOML validation, detecting private keys).

- Install (recommended): `pipx install pre-commit` (or `python -m pip install --user pre-commit`)
- Enable: `pre-commit install`
- Run on demand: `pre-commit run --all-files`

Note: CI runs these hooks on pull requests. Installing the hook locally avoids “CI fixed whitespace” failures.
