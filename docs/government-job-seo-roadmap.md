# Government job eye medical content plan

Implemented: 15 October 2026. Initial guide release pushed in commit 0670515. Expanded exam criteria target the same existing website via its established main-branch workflow; live delivery must be verified separately from Git push. No search-engine submission has been performed.

## Strategy

Create useful entry points for candidates searching for LASIK for SSC, Railway, CRPF/CAPF and Rajasthan Police in Jaipur or Rajasthan. Use one page per distinct recruitment intent and one hub for discovery. Preserve existing Army/defence URLs until Search Console evidence supports any consolidation. Rankings and inclusion in AI answers cannot be guaranteed.

The release contains one hub, four category guides and four supporting articles. The expanded version adds 15 source-scoped exam/post entries, an appointment-only Railway category reference, an eyesight glossary, other-eye-condition checks and medical-review preparation. Detailed exam anchors live inside the category pages rather than creating thin, repetitive URLs. Additional articles are conditional on verified, distinct recruitment requirements or search demand.

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
- Rajasthan Police Constable: Standing Order 07/2025, PDF page 9, visually checked. Distance 6/6 better and 6/9 worse; near N6/N9; with or without correction; no squint/night blindness and high colour vision. This does not expressly establish surgery permission. SI numeric eye standards remain unverified. URL: https://police.rajasthan.gov.in/uploads/1259_3c6b1fb049.pdf
- UPSC CAPF AC 2026: Appendix V(A), pages 21–22, corrected vision and conditional LASIK standards. Do not transplant these into GD/CPO. URL: https://www.upsc.gov.in/sites/default/files/ExamNotifi_CAPF_AC_Exam_2026_Eng_20022026.pdf
- MHA table alignment verified by rendering PDF pages 75–76. Separate direct-entry OR/SO, driver, tradesmen and gazetted-officer provisions. No blanket surgery clearance.
- CGL 2026: CBI/NIA/NCB numeric standards on pages 117–118; BRO vision and rejection list on pages 122/129. BRO exclusion is not a CGL-wide exclusion.
- NTPC Graduate CEN 06/2025: scanned official RRB Ajmer PDF visually checked at pages 4, 7–8 and 59. A2 posts exclude surgery; B2 conditional LASIK criteria include one year, institution specialist certificate, 425-micron residual cornea, required acuity, normal fundus and no progressive disease; C2 listed fit after LASIK subject to complete assessment. URL: https://rrbajmer.gov.in/Upload_PDF/Final%20CEN%2006_2025_21-10-2025_Publish_compressed-638966585099809472.pdf
- IRMM Chapter V paragraph 512(1)(A) is the appointment table. Do not use 512(1)(B), in-service, or ex-servicemen tables for new ordinary entrants. CEN-specific provisions and amendments take precedence. URL: https://indianrailways.gov.in/railwayboard/uploads/codesmanual/MMVol-I/Chapter5.pdf
- RPF SI CEN 01/2024 sections 3 and 12.4: B1, no glasses, squint or colour blindness. No universal RPF surgery decision is made; ask for the applicable circular and clarification. Constable cycle not independently verified. URL: https://www.rrbcdg.gov.in/uploads/2024/RPF01-SI/CEN%202024-01%20RPF-SI.pdf
- Other SSC and Railway route entries are explicitly directories, not independently verified numeric standards for every vacancy. The site's updated date must not be presented as proof that all recruitment cycles are current or open.

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
4. Resolve remaining gaps: Rajasthan SI/Telecom medical annexures, RPF Constable cycle, NTPC Undergraduate, Technician, JE and Level 1 post-specific notices. The Constable standing order and NTPC Graduate source are now verified. Check later amendments before extending any numeric table or surgery permission.
5. Ask the clinician to review procedure descriptions and recruitment interpretations. Record an actual review date only when completed.
6. At 30 days after publication, improve pages earning relevant impressions but few clicks. Make title/snippet improvements based on actual queries; avoid repeating the same job keywords throughout the page.
7. At 60 days, add an original clinician Q&A video and candidate document checklist if useful. Add separate CRPF, NTPC, RPF or police articles only when their verified content answers a materially different question.
8. At 90 days, assess enquiries by landing page and compare search performance. Consolidate genuinely competing pages based on evidence. Seek editorial coverage from relevant local education/coaching publishers; avoid paid ranking links or mass comment posting.

## Measurement

## Expanded-guide verification

- Production build, TypeScript and targeted ESLint passed.
- Tested all five guide pages at 1440px and 390px: HTTP 200, one H1, canonical URL, valid JSON-LD, no horizontal overflow and no broken on-page anchors.
- All 15 exam-directory links resolve to their target detail card. Four supporting articles contain the source-scoped measurements. Sitemap and llms.txt include the guide content.
- Added the existing appointment form to these routes so the shared navigation's appointment anchors work.
- Inspected the exam-card layout on desktop and mobile. Unverified criteria remain labelled, not replaced with guessed figures.

## Ongoing measurement

- Search Console: indexed URLs, impressions, clicks, CTR and position by query cluster and landing page.
- Enquiries: appointment, phone and WhatsApp conversions attributed to landing pages using the site's existing analytics, once its event coverage is confirmed.
- Content quality: exact notice version, last substantive verification date and outstanding rule questions.
- Review sources when a new recruitment notice or amendment appears. No recurring automation is installed by this implementation.

## References for search guidance

- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/essentials/spam-policies
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
