# Resume

The website's `static/resume.pdf` is built from `cv.tex`. The source includes the
publications and talks imported from the current Overleaf project.

With LuaLaTeX and `latexmk` installed (for example, via MacTeX), run from the
repository root:

```sh
sh resume/update_site.sh
```

The script builds in a temporary directory and updates `static/resume.pdf` only
after a successful build. Fonts are included locally; no Overleaf connection is
needed. The `dense` toggle keeps the published selection of older experience and
projects while retaining fuller entries in the shared source files.
