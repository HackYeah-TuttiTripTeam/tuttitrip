#!/usr/bin/env bash
# Branch -> Worker and hostname of its decks (KEY=VALUE lines for $GITHUB_OUTPUT).
#   docs/presentations/_site/target.sh <branch>
# Slug rules as in frontend/scripts/slugify.sh; "tuttitrip-decks-" + 47 = 63 (DNS label).
set -euo pipefail
branch="${1:?usage: target.sh <branch>}"
domain="${TT_DOMAIN:-gburek.app}"
if [ "$branch" = main ]; then
  worker=tuttitrip-decks
else
  slug=$(printf '%s' "$branch" | LC_ALL=C tr '[:upper:]' '[:lower:]' |
    LC_ALL=C sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//')
  slug=${slug:0:47}
  worker="tuttitrip-decks-${slug%-}"
fi
echo "worker=$worker"
echo "host=$worker.$domain"
echo "url=https://$worker.$domain"
