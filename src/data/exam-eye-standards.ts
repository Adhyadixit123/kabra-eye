export type ExamCategory = "SSC" | "CAPF & CRPF" | "Railways" | "Rajasthan Police";
export type ExamSource = { label: string; href: string };

export const examSources = {
  cpo: { label: "SSC CPO 2026, sections 12.11.2–12.11.3, page 21", href: "https://www.sscmpr.gov.in/newlook/downloads/noticeboard/Notice_of_adv_capf_2026_10092026.pdf" },
  cgl: { label: "SSC CGL 2026, post-specific standards, pages 117–129", href: "https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_cgl_2025.pdf" },
  gd: { label: "SSC GD 2026, section 12.6.2", href: "https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/notice_01122025.pdf" },
  mha: { label: "MHA medical guidelines, eye tables on printed pages 63–64 (PDF pages 75–76)", href: "https://www.mha.gov.in/sites/default/files/policedevison_17062021_0.pdf" },
  capf: { label: "UPSC CAPF AC 2026, Appendix V(A), pages 21–22", href: "https://www.upsc.gov.in/sites/default/files/ExamNotifi_CAPF_AC_Exam_2026_Eng_20022026.pdf" },
  alp: { label: "RRB ALP CEN 01/2026: medical standards and surgery declaration", href: "https://www.rrbcdg.gov.in/uploads/2026/01-ALP/012026ALP-CEN.pdf" },
  ntpc: { label: "RRB NTPC Graduate CEN 06/2025, pages 4, 7–8 and Annexure VIII (page 59)", href: "https://rrbajmer.gov.in/Upload_PDF/Final%20CEN%2006_2025_21-10-2025_Publish_compressed-638966585099809472.pdf" },
  manual: { label: "Indian Railway Medical Manual, Chapter V, paragraph 512(1)(A): appointment standards", href: "https://indianrailways.gov.in/railwayboard/uploads/codesmanual/MMVol-I/Chapter5.pdf" },
  rpf: { label: "RPF SI CEN 01/2024, sections 3 and 12.4", href: "https://www.rrbcdg.gov.in/uploads/2024/RPF01-SI/CEN%202024-01%20RPF-SI.pdf" },
  rrb: { label: "Official Railway Recruitment Board portal: current notices and corrigenda", href: "https://rrb.indianrailways.gov.in/" },
  police: { label: "Rajasthan Police Standing Order 07/2025, medical standards on PDF page 9", href: "https://police.rajasthan.gov.in/uploads/1259_3c6b1fb049.pdf" },
  rpsc: { label: "RPSC: official recruitment advertisements", href: "https://rpsc.rajasthan.gov.in/advertisements" },
  ssc: { label: "SSC: official examinations and notices", href: "https://ssc.gov.in/" },
  colour: { label: "National Eye Institute: colour vision deficiency", href: "https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/color-blindness" },
} satisfies Record<string, ExamSource>;

export type ExamEyeStandard = {
  id: string;
  name: string;
  categories: ExamCategory[];
  scope: string;
  posts: string;
  stages: string;
  distance: string;
  near: string;
  correction: string;
  surgery: string;
  conditions: string;
  caution?: string;
  sources: ExamSource[];
};

// Numbers are tied to the named document, not promoted to universal or future-entry rules.
export const examEyeStandards: ExamEyeStandard[] = [
  {
    id: "ssc-cpo", name: "SSC CPO: Delhi Police and CAPF Sub-Inspector", categories: ["SSC", "CAPF & CRPF"], scope: "CPO 2026 notice",
    posts: "Sub-Inspector in Delhi Police and Central Armed Police Forces.",
    stages: "Paper I; physical standard/endurance tests (PST/PET); Paper II; medical examination and document verification under the notice.",
    distance: "Better eye 6/6; worse eye 6/9.", near: "Better eye N6; worse eye N9.",
    correction: "Required without glasses or other correction. The notice assigns the better eye by handedness.",
    surgery: "The notice excludes surgery of any kind used to improve visual acuity. Do not treat Trans PRK or SmartSight as an exemption.",
    conditions: "No squint; high colour vision is required. Passing the acuity chart alone is insufficient.", sources: [examSources.cpo],
  },
  {
    id: "ssc-gd", name: "SSC GD: Constable and Assam Rifles Rifleman", categories: ["SSC", "CAPF & CRPF"], scope: "GD 2026 with incorporated MHA direct-entry OR/SO table",
    posts: "GD recruitment for BSF, CISF, CRPF, ITBP, SSB, SSF and Rifleman (GD) in Assam Rifles, as notified.",
    stages: "Computer-based examination; PST/PET; document verification and detailed medical examination (DME); review medical (RME) where applicable.",
    distance: "Better eye 6/6; worse eye 6/9, unaided.", near: "Better eye N6; worse eye N9, unaided.",
    correction: "The MHA direct-entry OR/SO table does not permit correction, including glasses.",
    surgery: "The linked MHA LASIK permission is for gazetted officers, not a GD permission. Check amendments before treatment.",
    conditions: "CP-III colour perception by Ishihara and binocular vision; handedness determines the better eye in the table.", sources: [examSources.gd, examSources.mha],
  },
  {
    id: "ssc-cgl-investigation", name: "SSC CGL: CBI, NIA and NCB posts", categories: ["SSC"], scope: "CGL 2026 post-specific annexures",
    posts: "CBI Sub-Inspector, NIA Sub-Inspector, and NCB Sub-Inspector / Junior Intelligence Officer.",
    stages: "CGL Tier I and Tier II; applicable skill modules, document verification and department-specific physical/medical checks.",
    distance: "6/6 in one eye and 6/9 in the other.", near: "0.6 in one eye and 0.8 in the other, using the notice's notation.",
    correction: "With or without glasses for these named posts.", surgery: "Glasses permission is explicit; it is not a standalone permission for previous surgery. Obtain the department's applicable instruction.",
    conditions: "Check the full department annexure and medical instructions, including physical standards. Do not substitute CPO colour or surgery rules.", sources: [examSources.cgl],
  },
  {
    id: "ssc-cgl-bro", name: "SSC CGL: posts in Border Roads Organisation", categories: ["SSC"], scope: "CGL 2026 BRO medical annexure",
    posts: "Only CGL preferences allocated to BRO and covered by its annexure.", stages: "CGL examination, followed by the applicable BRO physical and medical assessment.",
    distance: "6/12 in each eye, or right eye 6/6 and left eye 6/24; unaided vision at least 6/60 in each eye.", near: "Use the complete BRO examination instructions; a separate near cutoff is not reproduced here.",
    correction: "Glasses are allowed within the annexure's requirements.", surgery: "BRO's permanent-rejection list includes corneal surgery for refractive error. Do not extend this rule to all CGL jobs.",
    conditions: "The list includes squint, nystagmus, colour blindness, gross myopia and corneal opacity affecting binocular vision.", sources: [examSources.cgl],
  },
  {
    id: "ssc-office-other", name: "Other SSC exams and office posts", categories: ["SSC"], scope: "Department-specific: no single SSC-wide eyesight cutoff",
    posts: "Other CGL posts; CHSL (LDC/JSA and DEO); MTS/Havaldar; Stenographer; Junior Engineer; Selection Posts.",
    stages: "Exam and skill/physical stages vary. Use the particular notice: a typing test, stenography test or Havaldar PET/PST is not required for every SSC job.",
    distance: "No single verified minimum applies to this entire group.", near: "Determined by the actual post and appointing department.", correction: "Do not assume that wearing glasses disqualifies an office applicant.",
    surgery: "Check the department rule only after identifying the job. A CPO or BRO exclusion cannot be automatically applied to every SSC examination.",
    conditions: "Check post suitability, disability provisions and department medical instructions. A disability certificate and recruitment fitness are separate assessments.",
    caution: "Directory entry, not a verified numeric medical standard for every listed examination.", sources: [examSources.ssc, examSources.cgl],
  },
  {
    id: "upsc-capf-ac", name: "UPSC CAPF Assistant Commandant", categories: ["CAPF & CRPF"], scope: "CAPF AC 2026, Appendix V(A)",
    posts: "Assistant Commandant recruitment to the CAPFs listed in the UPSC notice.", stages: "Written Paper I and Paper II; physical tests and medical examination; interview/personality test, with document checks.",
    distance: "Corrected 6/6 and 6/12, or 6/9 in both eyes.", near: "Corrected N6 and N9.",
    correction: "Glasses permitted. Myopia limit −4 D and hypermetropia +4 D, including cylinder; CP-III colour perception.",
    surgery: "LASIK is conditional: age 18–35, axial length 21–26 mm, corneal thickness 425 microns, pre-LASIK error 6 D, stable refractive flap, and at least six months after surgery, as specified in the notice.",
    conditions: "The complete medical examination still applies. Supply preoperative measurements and postoperative records; the board assesses compliance.",
    caution: "These officer criteria are not SSC GD or CPO criteria. They do not automatically establish permission for PRK, SMILE or SmartSight.", sources: [examSources.capf],
  },
  {
    id: "capf-driver-trades", name: "CAPF drivers, technical and tradesman recruitment", categories: ["CAPF & CRPF"], scope: "MHA baseline tables; separate force advertisement required",
    posts: "Force-specific constable driver, tradesman, technical and ministerial vacancies outside the shared GD route.",
    stages: "Use the force advertisement for written, trade/skill, physical and medical stages; there is no common sequence for all these posts.",
    distance: "MHA driver/DCPO table: 6/6 each eye. Listed tradesmen/followers table: 6/6 better and 6/9 worse eye.",
    near: "Both tables list N6/N9; the tradesmen table permits near-reading glasses only.", correction: "Drivers: no correction. Listed tradesmen: no distance correction.",
    surgery: "Do not borrow the gazetted-officer LASIK provision. Match the force's notice and amendments to the entry table.",
    conditions: "Drivers: CP-II. Listed tradesmen: CP-IV, red/green recognition. Binocular vision is required.",
    caution: "Technical/ministerial vacancies may use a different table. These numbers cover only the named driver and tradesmen categories.", sources: [examSources.mha],
  },
  {
    id: "railway-alp", name: "RRB Assistant Loco Pilot (ALP)", categories: ["Railways"], scope: "ALP CEN 01/2026, category A1; IRMM appointment table",
    posts: "Assistant Loco Pilot.", stages: "CBT 1; CBT 2; computer-based aptitude test (CBAT); document verification and medical examination under the CEN.",
    distance: "6/6 in each eye, without glasses; A1 includes the prescribed fogging test.", near: "Sn 0.6 in each eye without glasses.", correction: "Unaided standard; glasses cannot be used to meet it.",
    surgery: "CEN 01/2026 excludes LASIK and other refractive-error corrective surgery.", conditions: "Acuity is only one part of A1: category-specific colour, binocular and other visual-function tests also apply.",
    sources: [examSources.alp, examSources.manual],
  },
  {
    id: "ntpc-a2", name: "NTPC: Station Master, Goods Train Manager and Traffic Assistant", categories: ["Railways"], scope: "NTPC Graduate CEN 06/2025, category A2",
    posts: "These three graduate NTPC posts are assigned A2 in this CEN.", stages: "CBT 1 and CBT 2; CBAT for Station Master/Traffic Assistant; document verification and medical examination.",
    distance: "6/9 in each eye, unaided.", near: "Sn 0.6 in each eye, unaided.", correction: "Glasses not permitted to meet this A2 standard.",
    surgery: "LASIK and other refractive-error surgery are excluded for A2 posts in this CEN.", conditions: "Additional colour, binocular and night-vision checks apply; read all tests in section 3.",
    sources: [examSources.ntpc],
  },
  {
    id: "ntpc-b2", name: "NTPC: Chief Commercial cum Ticket Supervisor", categories: ["Railways"], scope: "NTPC Graduate CEN 06/2025, category B2",
    posts: "Chief Commercial cum Ticket Supervisor.", stages: "CBT 1; CBT 2; document verification and medical examination.",
    distance: "6/9 and 6/12; lenses no stronger than 4 D.", near: "Sn 0.6 each eye when required for close work.", correction: "Glasses permitted.",
    surgery: "Conditional under Annexure VIII: at least one year after LASIK with the institution's specialist certificate; no complications; residual cornea at least 425 microns; required acuity; normal fundus; no progressive eye disease.",
    conditions: "Visual-field/binocular assessment also applies.", sources: [examSources.ntpc],
  },
  {
    id: "ntpc-c2", name: "NTPC: Junior Accounts Assistant and Senior Clerk cum Typist", categories: ["Railways"], scope: "NTPC Graduate CEN 06/2025, category C2",
    posts: "Junior Accounts Assistant cum Typist and Senior Clerk cum Typist.", stages: "CBT 1; CBT 2; typing skill test; document verification and medical examination.",
    distance: "6/12 in one eye; the table specifies nil for the other.", near: "Combined Sn 0.6 for close work.", correction: "Glasses permitted.", surgery: "C2 is listed as fit after LASIK in Annexure VIII, subject to the complete medical assessment.",
    conditions: "The acuity row is not a blanket clearance for eye disease or every one-eyed candidate.", sources: [examSources.ntpc],
  },
  {
    id: "railway-other", name: "RRB NTPC Undergraduate, Technician, JE and Level 1", categories: ["Railways"], scope: "Find the exact post's CEN and medical category",
    posts: "NTPC undergraduate clerical/ticketing posts; Technician grades; Junior Engineer/DMS/CMA; Level 1 posts such as Track Maintainer and assistants.",
    stages: "CBT stages depend on recruitment. Typing, physical efficiency or other tests apply only where the notice specifies them, followed by document and medical checks.",
    distance: "Use the A1/A2/A3/B1/B2/C1/C2 category assigned to the exact post, not a universal Railway cutoff.", near: "See the appointment-category table below, then verify it against the CEN.",
    correction: "Category-dependent. Some roles require unaided vision; others allow glasses.", surgery: "Check the CEN's surgery note and incorporated circular. NTPC Graduate permission is not automatic permission for another post.",
    conditions: "Colour, field, binocular and night-vision tests depend on category and duties.", caution: "Route directory only: a current numeric standard has not been separately verified for every trade and post here.", sources: [examSources.rrb, examSources.manual],
  },
  {
    id: "rpf-si", name: "RPF Sub-Inspector and Constable recruitment", categories: ["Railways"], scope: "SI CEN 01/2024 verified; check the separate Constable notice",
    posts: "RPF/RPSF Sub-Inspector through CEN 01/2024. Constable recruitment is a separate CEN, not SSC GD.",
    stages: "For SI: CBT; PET/physical measurement; document verification; Railway hospital medical examination.",
    distance: "SI uses B1: 6/9 and 6/12. The RPF entry rule requires this without glasses.", near: "B1: Sn 0.6 in each eye when close work is required; RPF recruitment does not permit glasses.",
    correction: "SI sections 3 and 12.4 exclude candidates wearing glasses.", surgery: "A glasses exclusion does not answer the surgery question. Obtain the applicable Railway Board circular and recruitment clarification; do not assume either universal acceptance or prohibition.",
    conditions: "SI notice excludes squint and colour blindness. Additional B1 and general medical requirements apply.",
    caution: "Do not copy the SI numbers to a different Constable recruitment without checking its notice and amendments.", sources: [examSources.rpf, examSources.manual, examSources.rrb],
  },
  {
    id: "rajasthan-constable", name: "Rajasthan Police Constable", categories: ["Rajasthan Police"], scope: "Standing Order 07/2025, page 9",
    posts: "Constable recruitment covered by this order, including Civil Police, Intelligence, RAC/MBC and the listed specialist categories. Telecom is outside this order's scope.",
    stages: "Written examination, PET/PST, post-specific proficiency test where applicable, document checks and medical examination. Follow the advertisement for your category's sequence and exemptions.",
    distance: "Better eye 6/6; worse eye 6/9.", near: "Better eye N6; worse eye N9.", correction: "With or without correction. The order specifies the better eye according to handedness.",
    surgery: "The vision clause does not expressly settle LASIK, PRK or lenticule surgery eligibility. Obtain post-specific clarification before an operation.",
    conditions: "No night blindness or squint; high colour vision required. Other defects affecting duty are assessed by the medical board.", sources: [examSources.police],
  },
  {
    id: "rajasthan-si", name: "Rajasthan Police SI / Platoon Commander and SI Telecom", categories: ["Rajasthan Police"], scope: "Separate RPSC recruitment; numeric eye standard not verified here",
    posts: "RPSC Sub-Inspector / Platoon Commander and separately advertised SI Telecom vacancies.",
    stages: "Use the relevant RPSC advertisement for written papers, physical tests, interview and medical/document requirements. Telecom and general SI are separate recruitments.",
    distance: "Not established from a current SI medical annexure in this guide.", near: "Not verified; request the annexure from the recruiting authority.", correction: "Do not apply the Constable order or SSC CPO rule to state SI automatically.",
    surgery: "No verified surgery permission is claimed here.", conditions: "Bring the medical annexure and call letter; the absence of a numeric rule on this page is not an exemption from medical assessment.",
    caution: "Awaiting a verified current SI medical source. We have intentionally not invented a passing-vision number.", sources: [examSources.rpsc],
  },
];

export const railwayAppointmentStandards = [
  { category: "A1", distance: "6/6, 6/6", near: "Sn 0.6, 0.6", correction: "Without glasses; prescribed fogging test" },
  { category: "A2", distance: "6/9, 6/9", near: "Sn 0.6, 0.6", correction: "Without glasses" },
  { category: "A3", distance: "6/9, 6/9", near: "Sn 0.6, 0.6", correction: "Glasses allowed, lenses up to 2 D" },
  { category: "B1 / B2", distance: "6/9, 6/12", near: "Sn 0.6, 0.6 for close work", correction: "Glasses allowed, lenses up to 4 D; RPF entry exception" },
  { category: "C1", distance: "6/12, 6/18", near: "Sn 0.6, 0.6 for close work", correction: "With or without glasses" },
  { category: "C2", distance: "6/12, nil", near: "Combined Sn 0.6 for close work", correction: "With or without glasses" },
];

export const visionGlossary = [
  { term: "6/6 and 6/9", meaning: "Distance-chart results, not your glasses power. At 6/9, you read at 6 metres what a reference observer reads at 9 metres. Each eye is assessed separately where the rule requires it." },
  { term: "N6, N9 and Sn 0.6", meaning: "Near-reading chart notations. Use the exact chart and testing distance specified by the authority; do not convert these casually into a distance-vision or spectacle-power number." },
  { term: "Unaided versus corrected", meaning: "Unaided means without optical correction. Corrected means tested with permitted correction. A post can still separately exclude previous surgery even if postoperative vision is 6/6." },
  { term: "Dioptres (D) and cylinder", meaning: "Prescription power, not an acuity score. A rule may limit total refractive error including astigmatism. Your prescription alone cannot establish whether you pass the chart standard." },
  { term: "Colour and binocular vision", meaning: "Colour testing assesses colour discrimination; binocular testing assesses the eyes working together. Passing a distance chart does not establish that these separate requirements are met." },
  { term: "DME, RME and medical fitness", meaning: "DME is the detailed medical examination; RME is a review where provided by the rules. A hospital report is supporting information, not a recruitment pass certificate." },
];

export const eyeConditionChecks = [
  { title: "Colour vision deficiency", text: "CPO, CAPF, RPF and safety-related Railway posts specify colour requirements. The grade and test differ. Inherited colour vision deficiency has no cure; refractive surgery should not be offered as a way to pass a colour test.", sources: [examSources.colour, examSources.cpo] },
  { title: "Squint, binocular vision and nystagmus", text: "Squint is explicitly relevant to CPO, RPF and Rajasthan Constable assessment. BRO also lists nystagmus. These are separate from spectacle power and need an eye examination, not just a refraction.", sources: [examSources.cpo, examSources.rpf, examSources.police, examSources.cgl] },
  { title: "Night vision and visual fields", text: "Rajasthan Constable criteria exclude night blindness; Railway categories can require night-vision or field testing. Tell the examiner about difficulties in dim light or missing areas of vision.", sources: [examSources.police, examSources.ntpc] },
  { title: "Corneal opacity, retinal findings and progressive disease", text: "BRO lists corneal opacity affecting binocular vision. Railway LASIK criteria assess the fundus and progressive disease. If you have keratoconus, a corneal scar, retinal treatment or glaucoma, bring specialist records; this page does not assign a universal fit/unfit result to the diagnosis.", sources: [examSources.cgl, examSources.ntpc] },
  { title: "Previous surgery or injury", text: "Disclose LASIK, PRK/Trans PRK, SMILE/SmartSight, lens surgery and eye injury accurately. Bring the procedure date, preoperative prescription, operative report and follow-up scans. A technique being flapless or modern does not override a recruitment exclusion.", sources: [examSources.cpo, examSources.alp] },
];
