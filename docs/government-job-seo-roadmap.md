# Government job eye medical content plan

Implemented locally: 15 October 2026. No deployment or search-engine submission performed.

## Strategy

Create useful entry points for candidates searching for LASIK for SSC, Railway, CRPF/CAPF and Rajasthan Police in Jaipur or Rajasthan. Use one page per distinct recruitment intent and one hub for discovery. Preserve existing Army/defence URLs until Search Console evidence supports any consolidation. Rankings and inclusion in AI answers cannot be guaranteed.

The first release contains one hub, four category guides and four supporting articles. Additional articles are conditional on verified, distinct recruitment requirements or search demand. Do not turn each force, city or phrase variation into a duplicate page.

## Implemented URL ownership

| URL | Primary intent |
| --- | --- |
| `/government-job-eye-surgery-medical-guide/` | Government job medical and eye surgery, Jaipur/Rajasthan; category discovery |
| `/ssc-lasik-transprk-medical-standards/` | LASIK for SSC, CGL/CPO/GD distinction |
| `/capf-crpf-lasik-transprk-medical-standards/` | CRPF/CAPF LASIK, force versus entry route |
| `/railway-lasik-transprk-medical-standards/` | Railway LASIK and medical category checks |
| `/rajasthan-police-lasik-transprk-medical-standards/` | Rajasthan Police Constable/SI LASIK |
| `/blog/ssc-cpo-lasik-eye-surgery-medical-rules/` | CPO corrective-surgery restriction |
| `/blog/ssc-gd-constable-lasik-transprk-medical/` | GD medical guidelines and candidate documents |
| `/blog/ssc-cgl-eye-test-lasik-post-wise-standards/` | Whether CGL candidates need surgery for their preferred post |
| `/blog/railway-alp-lasik-a1-medical-standard/` | ALP A1 refractive-surgery exclusion |

Existing `/blog/capf-police-lasik-transprk-medical-test/` is retained and updated as a short bridge to the distinct CAPF and Rajasthan Police guides. No redirect or deletion is implemented.

## Source register and limitations

- SSC CPO 2026: official SSC MPR PDF, published 10 September 2026. Section 12.11.2, page 21, explicitly excludes vision correction through glasses or surgery. Verified from the PDF text. URL: https://www.sscmpr.gov.in/newlook/downloads/noticeboard/Notice_of_adv_capf_2026_10092026.pdf
- SSC GD 2026: section 12.6.2 references MHA guidelines and amendments. This release does not claim a universally permitted surgery or apply officer criteria to GD candidates. URL: https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/notice_01122025.pdf
- SSC CGL 2026: the official PDF's filename includes 2025, but the document identifies the 2026 examination. Certain posts have specific standards, with glasses permitted in some listed vision criteria. URL: https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_cgl_2025.pdf
- MHA: linked guideline compilation is a reference for entry-specific checks; do not assume it includes every later amendment. URL: https://www.mha.gov.in/sites/default/files/policedevison_17062021_0.pdf
- ALP CEN 01/2026: official RRB indexed notice states the refractive-error surgery exclusion and includes the declaration. URL: https://www.rrbcdg.gov.in/uploads/2026/01-ALP/012026ALP-CEN.pdf
- Rajasthan Police: official recruitment portal located, but a current post-specific surgery clause was not verified. The page states this limitation and makes no permission claim. URL: https://police.rajasthan.gov.in/portal/JoinTheForce

Do not add a "medically reviewed by" claim or `reviewedBy` schema until the named doctor has actually reviewed the content. The pages currently identify the editorial team and separately introduce Dr. Vighnesh Kabra as the consulting refractive surgeon.

## Discovery implemented

- Homepage, main Trans PRK page, defence comparison, blog index and footer link to the hub.
- Hub links to all four category guides and all four new articles.
- Category guides link to relevant articles, the hub, other categories and clinical service pages.
- Articles link back to their parent guides and the hub.
- New URLs are generated as static HTML with canonical URLs and social metadata.
- Hub/category pages have MedicalWebPage, BreadcrumbList and visible-content-matched FAQPage JSON-LD; articles use the existing BlogPosting/FAQPage implementation.
- XML sitemap includes every new URL, an image and a substantive modification date.
- `llms.txt` includes category answers, source scope and official references. It is supplementary; it does not guarantee crawler use, AI citations or rankings.
- Sitemap priority values are organizational hints, not ranking signals. Google does not use sitemap priority or change frequency to rank these pages.

## Next work, after publication and evidence

1. Record the publication date and submit the sitemap in the site's existing Search Console property. Inspect the hub and category URLs for indexability. Submission does not guarantee indexing.
2. Export 16 months of query/page data and a recent 28-day comparison. Separate Army, SSC, CAPF, Railway and state police searches. Establish baseline impressions, clicks, CTR and landing pages.
3. Check whether existing defence URLs compete for the same intent before merging anything. Do not redirect a ranking URL merely because its title resembles another page.
4. Obtain the current Rajasthan Police Constable/SI medical annexures and current RRB NTPC, RPF, Technician and Level 1 notices. Verify exact clauses and amendments before adding acceptance tables or new specialist articles.
5. Ask the clinician to review procedure descriptions and recruitment interpretations. Record an actual review date only when completed.
6. At 30 days after publication, improve pages earning relevant impressions but few clicks. Make title/snippet improvements based on actual queries; avoid repeating the same job keywords throughout the page.
7. At 60 days, add an original clinician Q&A video and candidate document checklist if useful. Add separate CRPF, NTPC, RPF or police articles only when their verified content answers a materially different question.
8. At 90 days, assess enquiries by landing page and compare search performance. Consolidate genuinely competing pages based on evidence. Seek editorial coverage from relevant local education/coaching publishers; avoid paid ranking links or mass comment posting.

## Measurement

- Search Console: indexed URLs, impressions, clicks, CTR and position by query cluster and landing page.
- Enquiries: appointment, phone and WhatsApp conversions attributed to landing pages using the site's existing analytics, once its event coverage is confirmed.
- Content quality: exact notice version, last substantive verification date and outstanding rule questions.
- Review sources when a new recruitment notice or amendment appears. No recurring automation is installed by this implementation.

## References for search guidance

- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/essentials/spam-policies
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
