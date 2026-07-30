#!/usr/bin/env bash

set -e

PROJECT="AiHarness"

echo "========================================="
echo " Creating $PROJECT"
echo "========================================="

mkdir -p "$PROJECT"
cd "$PROJECT"

########################################
# Node Project
########################################

pnpm init

########################################
# Directories
########################################

mkdir -p \
knowledge \
policies \
examples \
scripts \
tests \
src/cli \
src/contracts \
src/knowledge

########################################
# Root Files
########################################

touch \
README.md \
.gitignore \
tsconfig.json

########################################
# Knowledge
########################################

touch \
knowledge/manifest.yaml \
knowledge/authority.yaml \
knowledge/terminology.yaml \
knowledge/retrieval-rules.yaml

########################################
# Policies
########################################

touch \
policies/ownership.yaml \
policies/terminology.yaml

########################################
# Example Feature
########################################

touch \
examples/add-goal.yaml

########################################
# Scripts
########################################

touch \
scripts/resolve-knowledge.ts

########################################
# CLI
########################################

touch \
src/cli/index.ts

########################################
# Contracts
########################################

touch \
src/contracts/PipelineContext.ts \
src/contracts/KnowledgeBundle.ts

########################################
# Knowledge Resolution
########################################

touch \
src/knowledge/ManifestLoader.ts \
src/knowledge/AuthorityResolver.ts \
src/knowledge/TerminologyResolver.ts \
src/knowledge/PolicyResolver.ts \
src/knowledge/KnowledgeBundleBuilder.ts

########################################
# Entry
########################################

touch \
src/index.ts

########################################
# Tests
########################################

touch \
tests/KnowledgeResolver.test.ts

########################################
# Git Ignore
########################################

cat > .gitignore <<EOF
node_modules
dist
coverage
.env
.artifacts
EOF

echo
echo "========================================="
echo " Bootstrap Complete"
echo "========================================="
echo

tree -L 3