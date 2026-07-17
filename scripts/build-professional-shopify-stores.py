import csv
import html
import re
import sys
from pathlib import Path


INTERNAL_OR_TOOLING_DOMAINS = {
    "myshopify.com",
    "shopify.com",
    "shop.app",
    "shopify.dev",
    "shopifypreview.com",
    "shopify.plus",
    "oberlo.com",
    "pagefly.io",
    "gempages.net",
}


def extract_rows(page_paths: list[str]) -> list[dict[str, str]]:
    rows: list[dict[str, str]] = []
    pattern = re.compile(
        r"<tr[^>]*>\s*"
        r"<td\s+align='left' class='arial collapsible'>(?P<rank>\d+)</td>\s*"
        r"<td class='row_name'><a\s+href='/view/sites/(?P<site_id>\d+)/[^']+'\s*>(?P<domain>[^<]+)</a>.*?"
        r"<td align='left'><a href='/info/whois/(?P<ip>[^']+)'>(?P=ip)</a></td>.*?"
        r"<td align='center'><span class='bold arial grey'>#\s*(?P<global_rank>[0-9,]+)</span></td>.*?"
        r"<tr class='expand-child'>.*?"
        r"Website Popularity:</b></div><div class='sval'><span class='bold arial grey'>(?P<visitors>[0-9,]+)</span> visitors per day.*?"
        r"Record Update Time:</b></div><div class='sval'>(?P<updated>[^<]+)</div>",
        re.S,
    )

    for page_path in page_paths:
        text = Path(page_path).read_text(errors="ignore")
        for match in pattern.finditer(text):
            row = {key: html.unescape(value.strip()) for key, value in match.groupdict().items()}
            domain = row["domain"].lower()
            if domain.endswith(".myshopify.com") or domain in INTERNAL_OR_TOOLING_DOMAINS:
                continue
            rows.append(row)

    seen: set[str] = set()
    unique_rows: list[dict[str, str]] = []
    for row in rows:
        domain = row["domain"].lower()
        if domain in seen:
            continue
        seen.add(domain)
        unique_rows.append(row)

    unique_rows.sort(key=lambda item: int(item["rank"]))
    return unique_rows


def write_csv(rows: list[dict[str, str]], output_path: str, limit: int = 550) -> None:
    with Path(output_path).open("w", newline="") as file:
        writer = csv.DictWriter(
            file,
            fieldnames=[
                "rank",
                "domain",
                "store_url",
                "estimated_visitors_per_day",
                "global_popularity_rank",
                "ip",
                "myipms_site_id",
                "source",
                "record_update_time",
            ],
        )
        writer.writeheader()
        for row in rows[:limit]:
            writer.writerow(
                {
                    "rank": row["rank"],
                    "domain": row["domain"],
                    "store_url": f"https://{row['domain']}",
                    "estimated_visitors_per_day": row["visitors"].replace(",", ""),
                    "global_popularity_rank": row["global_rank"].replace(",", ""),
                    "ip": row["ip"],
                    "myipms_site_id": row["site_id"],
                    "source": "MyIP.ms Shopify Inc hosting ranked sites",
                    "record_update_time": row["updated"],
                }
            )


if __name__ == "__main__":
    if len(sys.argv) < 3:
        raise SystemExit("Usage: python build-professional-shopify-stores.py output.csv page1.html [page2.html...]")
    output = sys.argv[1]
    page_files = sys.argv[2:]
    extracted = extract_rows(page_files)
    write_csv(extracted, output)
    print(f"Wrote {min(len(extracted), 550)} rows to {output}")
