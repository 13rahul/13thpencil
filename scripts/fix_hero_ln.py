from pathlib import Path

REPLACEMENTS = [
    (
        ".ln{display:block;position:relative;border:0;margin:0 0 clamp(5px,.9vh,9px);padding:0;min-width:0}",
        ".sheet .ln{display:block;position:relative;border:0;margin:0 0 clamp(5px,.9vh,9px);padding:0;min-width:0}",
    ),
    (
        ".ln > span,.ln > label,.ln legend{display:block;font-family:var(--hand);font-weight:700;font-size:1.1rem;line-height:1.05;color:#6B7076;padding:0}",
        ".sheet .ln > span,.sheet .ln > label,.sheet .ln legend{display:block;font-family:var(--hand);font-weight:700;font-size:1.1rem;line-height:1.05;color:#6B7076;padding:0}",
    ),
    (
        ".ln i{font-style:normal;font-weight:500;color:#A2A6AA;font-size:.92em}",
        ".sheet .ln i{font-style:normal;font-weight:500;color:#A2A6AA;font-size:.92em}",
    ),
    (".ln input,.ln textarea,.tel select{", ".sheet .ln input,.sheet .ln textarea,.sheet .tel select{"),
    (".ln input,.ln textarea{background-image:", ".sheet .ln input,.sheet .ln textarea{background-image:"),
    (".ln textarea{resize:none;", ".sheet .ln textarea{resize:none;"),
    (
        ".ln.bad > span,.ln.bad > label,.ln.bad legend{color:var(--mark)}",
        ".sheet .ln.bad > span,.sheet .ln.bad > label,.sheet .ln.bad legend{color:var(--mark)}",
    ),
    (".ln--obv input{transition:opacity .9s}", ".sheet .ln--obv input{transition:opacity .9s}"),
    (".ln--obv.erased input{opacity:.32}", ".sheet .ln--obv.erased input{opacity:.32}"),
    (
        ".ln--obv.erased .smudge{width:min(100%,var(--sw,200px))}",
        ".sheet .ln--obv.erased .smudge{width:min(100%,var(--sw,200px))}",
    ),
]


def scope_form_ln(text: str) -> str:
    for old, new in REPLACEMENTS:
        if old not in text:
            raise SystemExit(f"missing pattern: {old[:80]}")
        text = text.replace(old, new)
    return text


def fix_index(text: str) -> str:
    text = scope_form_ln(text)
    old = ".hero__h .ln > span{display:block;transform:translateY(105%);transition:transform 1.05s var(--ease-out)}"
    new = (
        ".hero__h .ln > span{display:block;font:inherit;font-size:inherit;font-weight:inherit;"
        "letter-spacing:inherit;line-height:inherit;color:inherit;transform:translateY(105%);"
        "transition:transform 1.05s var(--ease-out)}"
    )
    if old not in text:
        raise SystemExit("missing hero span rule")
    return text.replace(old, new)


def fix_principle(text: str) -> str:
    text = scope_form_ln(text)
    pairs = [
        (
            ".ln{display:block;overflow:hidden;padding-bottom:.04em}\n.ln > span{display:inline-block;transform:translateY(108%);",
            ".ph__h .ln{display:block;overflow:hidden;padding-bottom:.04em}\n.ph__h .ln > span{display:inline-block;font:inherit;font-size:inherit;font-weight:inherit;letter-spacing:inherit;line-height:inherit;color:inherit;transform:translateY(108%);",
        ),
        (".ln:nth-child(2) > span{transition-delay:.12s}", ".ph__h .ln:nth-child(2) > span{transition-delay:.12s}"),
        ("body.ready .ln > span{transform:none}", "body.ready .ph__h .ln > span{transform:none}"),
        ("  .ln > span{transform:none;transition:none}", "  .ph__h .ln > span{transform:none;transition:none}"),
    ]
    for old, new in pairs:
        if old not in text:
            raise SystemExit(f"missing principle rule: {old[:70]}")
        text = text.replace(old, new)
    return text


root = Path(r"D:\New folder\htdocs\13thpencil\public\_handoff")
index = root / "index.html"
principle = root / "principle.html"
index.write_text(fix_index(index.read_text(encoding="utf-8")), encoding="utf-8")
principle.write_text(fix_principle(principle.read_text(encoding="utf-8")), encoding="utf-8")
print("fixed index + principle")
