#!/bin/sh
set -eu

script_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
cd "$script_dir"

build_dir=$(mktemp -d "${TMPDIR:-/tmp}/joel-cv.XXXXXX")
trap 'rm -rf "$build_dir"' EXIT
trap 'exit 1' HUP INT TERM

latexmk -lualatex -interaction=nonstopmode -halt-on-error \
    -outdir="$build_dir" cv.tex
cp "$build_dir/cv.pdf" ../static/resume.pdf
