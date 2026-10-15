import type { AeoArticle } from "@/data/aeo";

export const governmentJobsUpdated = "2026-10-15";
export const governmentJobsHub = "/government-job-eye-surgery-medical-guide/";
export const governmentJobsImage = "/Adobe Lightroom 3/DSC_0159.jpg";

export const recruitmentSources = {
  cpo: { label: "SSC CPO 2026 notification, section 12.11.2 (page 21)", href: "https://www.sscmpr.gov.in/newlook/downloads/noticeboard/Notice_of_adv_capf_2026_10092026.pdf" },
  cgl: { label: "SSC CGL 2026 notification and post-specific physical standards", href: "https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_cgl_2025.pdf" },
  gd: { label: "SSC GD 2026 notification, section 12.6.2: medical examination", href: "https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/notice_01122025.pdf" },
  mha: { label: "MHA uniform CAPF recruitment medical guidelines and 2021 review procedure", href: "https://www.mha.gov.in/sites/default/files/policedevison_17062021_0.pdf" },
  alp: { label: "RRB ALP CEN 01/2026: medical standards and surgery declaration", href: "https://www.rrbcdg.gov.in/uploads/2026/01-ALP/012026ALP-CEN.pdf" },
  rrb: { label: "Official Railway Recruitment Board notices and corrigenda", href: "https://www.rrbcdg.gov.in/" },
  police: { label: "Rajasthan Police: Join the Force and recruitment guidance", href: "https://police.rajasthan.gov.in/portal/JoinTheForce" },
};

type Source = { label: string; href: string };
type RuleRow = { role: string; position: string; nextStep: string; source: Source };
export type GovernmentJobGuide = {
  path: string;
  label: string;
  title: string;
  seoTitle: string;
  description: string;
  answer: string;
  notice: string;
  rows: RuleRow[];
  sections: { heading: string; paragraphs: string[] }[];
  faqs: { question: string; answer: string }[];
  sources: Source[];
  articleSlugs: string[];
};

export const governmentJobGuides: GovernmentJobGuide[] = [
  {
    path: "/ssc-lasik-transprk-medical-standards/",
    label: "SSC",
    title: "LASIK for SSC medical in Rajasthan: start with your exact post.",
    seoTitle: "LASIK for SSC Medical in Rajasthan | CGL, CPO & GD Rules",
    description: "Compare SSC CGL, CPO and GD eye medical requirements before LASIK or Trans PRK. Official notice links and eye assessment at Kabra Eye Hospital, Jaipur.",
    answer: "SSC is a recruiting commission, not one medical category. CGL, CPO and GD candidates must identify their post, department and recruitment year before considering LASIK or Trans PRK. An eye assessment in Jaipur can document your vision and eye health; recruitment eligibility depends on the applicable notice and medical board.",
    notice: "Sources checked: CGL 2026, GD 2026 and CPO 2026. CPO section 12.11.2, page 21, excludes correction through glasses or surgery. Read any later amendments before acting.",
    rows: [
      { role: "CPO: Delhi Police / CAPF Sub-Inspector", position: "CPO 2026 section 12.11.2 excludes corrective surgery.", nextStep: "Read the medical section and amendments; do not assume a flapless exemption.", source: recruitmentSources.cpo },
      { role: "GD Constable / Rifleman", position: "GD 2026 refers candidates to MHA medical guidelines, as amended.", nextStep: "Match your entry category to the applicable eye standards.", source: recruitmentSources.gd },
      { role: "CGL posts", position: "Physical and vision requirements differ by department and post; some listed standards permit glasses.", nextStep: "Check your preferred post's annexure before deciding whether surgery is needed.", source: recruitmentSources.cgl },
    ],
    sections: [
      { heading: "SSC CGL: check the department before the procedure", paragraphs: ["A candidate choosing between office work and an investigative or field post should not use one universal eyesight checklist. In the CGL 2026 notice, certain posts have specific physical standards. Some listed vision standards can be met with glasses, so surgery may not be necessary for the recruitment requirement.", "Bring your post preference list to the consultation. Record the rule for each preferred post separately, including any department instructions issued after selection. Permission to wear glasses does not itself establish permission for prior eye surgery."] },
      { heading: "SSC CPO and GD need separate decisions", paragraphs: ["CPO 2026 section 12.11.2 excludes corrective surgery. Check that clause and any later corrigendum before treatment.", "For GD, start with the 2026 notice and the medical guidelines it incorporates. Avoid applying a rule for a commissioned officer to a constable entry. If the applicable rule is unclear, obtain clarification from the recruiting authority before surgery."] },
      { heading: "Choosing LASIK or Trans PRK in Jaipur for an SSC candidate", paragraphs: ["First establish whether any procedure is compatible with your intended post. If it is, the surgeon can discuss your prescription, corneal measurements, eye surface, recovery needs and alternatives. A technology name alone cannot establish eligibility.", "Kabra Eye Hospital in Sodala, Jaipur offers refractive assessment with Dr. Vighnesh Kabra. Bring the complete notice, your glasses prescription and your expected medical date so the discussion can address both your eyes and your career plans."] },
    ],
    faqs: [
      { question: "Which is the best LASIK for SSC in Rajasthan?", answer: "There is no single best procedure for all SSC posts. Check the post's surgery rules first, then discuss clinical suitability. Some candidates may meet their post's vision standard with glasses and may not need surgery for recruitment." },
      { question: "Is Trans PRK automatically accepted because it is flapless?", answer: "No. A flapless procedure is still refractive surgery. Acceptance must be established from the applicable recruitment rules." },
      { question: "Do Jaipur candidates have different SSC eye rules?", answer: "Receiving treatment in Jaipur does not change the medical standard for your selected post. Use the relevant national notice and department instructions." },
    ],
    sources: [recruitmentSources.cpo, recruitmentSources.cgl, recruitmentSources.gd],
    articleSlugs: ["ssc-cpo-lasik-eye-surgery-medical-rules", "ssc-gd-constable-lasik-transprk-medical", "ssc-cgl-eye-test-lasik-post-wise-standards"],
  },
  {
    path: "/capf-crpf-lasik-transprk-medical-standards/",
    label: "CAPF & CRPF",
    title: "CRPF and CAPF eye medical guidance for Rajasthan candidates.",
    seoTitle: "LASIK for CRPF & CAPF Medical in Rajasthan | Jaipur Guide",
    description: "Planning LASIK or Trans PRK for CRPF, BSF, CISF, ITBP or SSB recruitment? Check the exact entry and official eye rules with this Jaipur candidate guide.",
    answer: "A force name alone does not establish whether LASIK is accepted. A CRPF GD constable, a Sub-Inspector recruited through SSC CPO and a gazetted officer can come under different entry standards. Identify your route and current notice before considering surgery. Kabra Eye Hospital can assess eye health; the recruiting medical board decides fitness.",
    notice: "The SSC GD 2026 notice refers to MHA guidelines and subsequent amendments. The linked MHA document contains different entry categories. It should be read alongside your recruitment notice, not treated as universal permission for LASIK.",
    rows: [
      { role: "CRPF / BSF / CISF / ITBP / SSB GD", position: "Use SSC GD and the applicable CAPF medical entry category.", nextStep: "Check medical guidelines, amendments and the exact post on your application.", source: recruitmentSources.gd },
      { role: "CAPF Sub-Inspector through CPO", position: "CPO has its own published medical requirements.", nextStep: "Read the current CPO notice; do not substitute GD or officer criteria.", source: recruitmentSources.cpo },
      { role: "Officer / other direct recruitment", position: "Entry-specific standards must be identified.", nextStep: "Bring the advertisement and relevant MHA annexure.", source: recruitmentSources.mha },
    ],
    sections: [
      { heading: "CRPF candidates: write down your entry route", paragraphs: ["Begin with the full post name on your application. General Duty, a technical or tradesman vacancy, and a Sub-Inspector vacancy are not interchangeable labels. A useful consultation starts with the recruitment document, not simply the question 'Is LASIK allowed in CRPF?'.", "Keep a copy of the medical instructions issued with your call letter. If a recruitment notice refers to another guideline, obtain that document and any amendment too. Ask the authority which provision applies if two documents appear to conflict."] },
      { heading: "BSF, CISF, ITBP and SSB: why the post still matters", paragraphs: ["The SSC GD route covers several forces, but an answer about that route should not be extended to every vacancy advertised by those forces. Rank, recruitment route and the current notice determine which text needs checking.", "When comparing several applications, create one row per post in your own checklist. A procedure that is acceptable for one planned career path should not be assumed acceptable for another."] },
      { heading: "An eye assessment before a physical-duty career", paragraphs: ["Tell the ophthalmologist about your training plans, contact sports, medical date and any previous surgery. Request a clear record of your current visual acuity and examination findings. Keep old prescriptions and operative records if surgery has already taken place.", "Dr. Vighnesh Kabra provides refractive consultations at Kabra Eye Hospital in Jaipur. Treatment options are discussed after clinical assessment and review of the recruitment documents you bring. Consultation does not constitute recruitment certification."] },
    ],
    faqs: [
      { question: "What is the best LASIK for CRPF medical in Rajasthan?", answer: "Start with your CRPF post and entry route. There is no procedure that guarantees CRPF medical clearance. If surgery is permitted for the applicable entry, clinical measurements guide the choice." },
      { question: "Can a CAPF officer LASIK rule be used for SSC GD?", answer: "Do not assume that it can. Match the exact entry category in the medical guidelines and check the recruitment notice and amendments." },
      { question: "Can surgery records be omitted from the medical examination?", answer: "Give an accurate medical history and provide records as requested. A clinic cannot promise that prior surgery will be undetectable." },
    ],
    sources: [recruitmentSources.gd, recruitmentSources.mha, recruitmentSources.cpo],
    articleSlugs: ["ssc-gd-constable-lasik-transprk-medical", "ssc-cpo-lasik-eye-surgery-medical-rules", "capf-police-lasik-transprk-medical-test"],
  },
  {
    path: "/railway-lasik-transprk-medical-standards/",
    label: "Railways",
    title: "LASIK for Railway medical: check the post and medical category.",
    seoTitle: "LASIK for Railway Medical in Rajasthan | ALP & RRB Guide",
    description: "Understand Railway eye medical categories before LASIK or Trans PRK. ALP restrictions, NTPC and other post checks, with assessment in Jaipur, Rajasthan.",
    answer: "Railway eye requirements depend on the post and its medical category. RRB ALP CEN 01/2026 excludes candidates who have undergone LASIK or other refractive-error surgery. Other Railway applications require their own notice and category check. Do not apply an employee medical circular or another post's rules to your recruitment without confirmation.",
    notice: "ALP guidance here is tied to CEN 01/2026. For NTPC, Technician, Level 1 and RPF, use the exact CEN, post parameters, medical annexure and later corrigenda. This page does not certify acceptance in any category.",
    rows: [
      { role: "Assistant Loco Pilot: A1", position: "CEN 01/2026 excludes LASIK and other refractive-error corrective surgery.", nextStep: "Read the restriction before treatment; keep your medical history accurate.", source: recruitmentSources.alp },
      { role: "NTPC / Technician / Level 1", position: "Medical category and duties vary by post.", nextStep: "Find your exact post's category and surgery clause in its CEN.", source: recruitmentSources.rrb },
      { role: "RPF Constable / Sub-Inspector", position: "Separate RPF recruitment standards apply.", nextStep: "Check the RPF CEN; do not borrow an NTPC acceptance rule.", source: recruitmentSources.rrb },
    ],
    sections: [
      { heading: "A1, A2, A3, B1, B2, C1 and C2 are not interchangeable", paragraphs: ["When reading a Railway advertisement, locate the post parameters table first. Write down the medical category attached to the exact post you are choosing. Then read the vision requirements and any surgery note for that category in the same recruitment cycle.", "A table circulating online may refer to employees undergoing periodic examination rather than new recruits. Before using it, check its date, intended population and whether your CEN incorporates it. A category label without this context is not an eligibility answer."] },
      { heading: "ALP candidates should check the restriction before surgery", paragraphs: ["The ALP 2026 notice contains a specific exclusion for refractive-error surgery and a declaration about prior corrective eye surgery. Reaching a particular vision level after an operation does not cancel an exclusion based on surgical history.", "If you have already had treatment, obtain your operative report and consult the recruiting authority about the rule applicable to your application. A hospital cannot waive an RRB requirement or guarantee an alternative appointment."] },
      { heading: "Preparing for an RRB eye assessment in Jaipur", paragraphs: ["Bring your CEN number, selected post, medical category, call letter and old glasses prescriptions. If a Railway form asks for an eye specialist's measurements, bring the actual form rather than a social-media checklist.", "At Kabra Eye Hospital, the consultation can document your eye findings and discuss clinical options. Keep the difference clear between an ophthalmologist's examination report and the recruitment medical board's fitness decision."] },
    ],
    faqs: [
      { question: "Which is the best LASIK for Railway jobs in Rajasthan?", answer: "There is no single best operation for Railway recruitment. First identify the post, CEN and medical category. Some posts exclude prior corrective surgery, so booking an operation first can harm your plans." },
      { question: "Is Trans PRK an alternative route to ALP eligibility?", answer: "Do not treat it as an exemption. CEN 01/2026 refers to other surgical procedures correcting refractive error as well as LASIK." },
      { question: "Does an NTPC rule apply to RPF or ALP?", answer: "No automatic transfer should be assumed. Read the separate recruitment notice and the category for the post you applied for." },
    ],
    sources: [recruitmentSources.alp, recruitmentSources.rrb],
    articleSlugs: ["railway-alp-lasik-a1-medical-standard"],
  },
  {
    path: "/rajasthan-police-lasik-transprk-medical-standards/",
    label: "Rajasthan Police",
    title: "Rajasthan Police Constable and SI eye medical planning in Jaipur.",
    seoTitle: "LASIK for Rajasthan Police Constable & SI | Jaipur Guide",
    description: "Considering LASIK or Trans PRK for Rajasthan Police Constable or SI medical? Check the recruitment notice and plan an eye assessment at Kabra Eye Hospital.",
    answer: "Before LASIK or Trans PRK for Rajasthan Police recruitment, identify your exact post, recruitment year and applicable medical instructions. We have not verified a universal Rajasthan Police rule allowing refractive surgery. Bring the current notification to an eye assessment in Jaipur; meeting an eyesight target alone does not establish recruitment eligibility.",
    notice: "The Rajasthan Police recruitment portal is linked as the official starting point. A current, post-specific surgery clause has not been established for this guide. The page therefore does not claim LASIK or Trans PRK is permitted for Constable or SI recruitment.",
    rows: [
      { role: "Police Constable", position: "Surgery acceptance needs verification in the applicable recruitment documents.", nextStep: "Bring the notice for your recruitment and any medical instructions.", source: recruitmentSources.police },
      { role: "Constable Driver / specialised vacancy", position: "Do not assume identical requirements to another constable vacancy.", nextStep: "Check the complete post name and its medical conditions.", source: recruitmentSources.police },
      { role: "Sub-Inspector", position: "Use the authority and notice named for your SI recruitment.", nextStep: "Obtain the relevant medical annexure and later instructions.", source: recruitmentSources.police },
    ],
    sections: [
      { heading: "Police Constable: confirm the rule before arranging treatment", paragraphs: ["A candidate may know the required vision level but still not know how previous surgery is treated. Those are separate questions. Ask for the clause covering refractive surgery, not only the eyesight chart or a summary of the physical test.", "If the notice does not clearly answer your situation, request clarification from the recruiting authority. Keep that response with the complete notification. A friend's result in an earlier recruitment cycle is not evidence for your own application."] },
      { heading: "SI, driver and other police posts", paragraphs: ["Save the exact advertisement and the post description you applied under. Do not use SSC CPO guidance as Rajasthan Police guidance simply because both include the words 'Sub-Inspector'. Different recruiting authorities can publish different requirements.", "Candidates applying for several posts should bring all relevant notices. The consultation can help you identify which medical questions still need an official answer before you decide on treatment."] },
      { heading: "A practical consultation for Rajasthan candidates", paragraphs: ["Kabra Eye Hospital is in Sodala on Ajmer Road, Jaipur. When travelling from another Rajasthan district, call ahead to arrange an eye consultation and ask what records to carry. Bring your glasses, old prescriptions, current notice and expected medical date.", "Dr. Vighnesh Kabra can discuss refractive assessment and treatment suitability. The aim is an informed decision about your eyes and timing. Any final recruitment fitness decision remains with the designated medical board."] },
    ],
    faqs: [
      { question: "What is the best LASIK for Rajasthan Police Constable medical?", answer: "The first question is whether the exact recruitment permits the proposed surgery. This guide has not verified a universal permission. Once that is clarified, an eye examination can determine clinically appropriate options." },
      { question: "Is Trans PRK guaranteed to pass Rajasthan Police medical?", answer: "No. No procedure or hospital can guarantee recruitment medical clearance. A flapless technique does not remove the need to check the official rule." },
      { question: "Can I consult in Jaipur before deciding on surgery?", answer: "Yes. Bring your current recruitment notice and eye records to Kabra Eye Hospital for an eye assessment and discussion of the questions to resolve before treatment." },
    ],
    sources: [recruitmentSources.police],
    articleSlugs: ["capf-police-lasik-transprk-medical-test"],
  },
];

export const governmentJobChecklist = [
  "Complete recruitment notification, post name, year and medical annexure",
  "Any corrigendum, medical call letter and written authority clarification",
  "Current glasses and previous prescriptions with dates",
  "Previous surgery report, scans and follow-up records, if applicable",
  "Expected medical date and training commitments",
];

const articleBase = {
  eyebrow: "Government Job Medical",
  publishedOn: governmentJobsUpdated,
  image: governmentJobsImage,
  imageCaption: "Refractive care at Kabra Eye Hospital, Jaipur. A clinical assessment is separate from a recruiting medical board's decision.",
  disclaimer: "Educational guidance based on the named sources. Check the current notice and amendments for your exact post. Kabra Eye Hospital is not a recruiting authority and does not guarantee medical clearance.",
  cta: "Bring your recruitment notice and eye records to an eye assessment with Dr. Vighnesh Kabra at Kabra Eye Hospital, Sodala, Jaipur.",
};

export const governmentJobArticles: AeoArticle[] = [
  {
    ...articleBase,
    slug: "ssc-cpo-lasik-eye-surgery-medical-rules",
    title: "SSC CPO Medical After LASIK: Check the Notice Before Surgery",
    description: "SSC CPO 2026 section 12.11.2 restricts corrective eye surgery. Read the official source and plan an eye assessment in Jaipur before deciding on treatment.",
    keywords: ["SSC CPO LASIK", "SSC CPO Trans PRK", "SSC CPO eye medical Rajasthan"],
    sections: [
      { heading: "What the 2026 notice says", paragraphs: ["SSC CPO 2026 section 12.11.2, page 21, requires the prescribed vision without correction through glasses or surgery. Check later amendments before acting.", "A search result that does not name the notice year leaves out information you need. Keep the actual PDF with your application records and highlight the clause that applies to your post."] },
      { heading: "Why a flapless operation is not an automatic exemption", paragraphs: ["If a rule refers broadly to surgery that corrects eyesight, the absence of a LASIK flap should not be interpreted as permission for another operation. Ask the recruiting authority about any procedure that is not explicitly addressed.", "An operation's clinical benefits and the recruitment rule are different considerations. The surgeon can assess your eyes, but cannot reinterpret an exclusion on behalf of the recruiting authority."] },
      { heading: "What to bring to a consultation in Jaipur", paragraphs: ["Bring your CPO notification, post details, any medical call letter and your prescription history. If you already had surgery, bring the procedure name, date, operative notes and follow-up measurements.", "Ask which measurements are relevant to your medical documents, which questions require an official answer and whether treatment should be deferred while that answer is obtained. Keep a copy of any written clarification with your records."] },
    ],
    faqs: [{ question: "Can a hospital guarantee SSC CPO fitness after LASIK?", answer: "No. The applicable recruitment standards and designated medical board determine fitness. A hospital examination cannot guarantee selection." }],
    sources: [recruitmentSources.cpo],
    relatedLinks: [{ label: "SSC post-wise guide", href: governmentJobGuides[0].path }, { label: "All government job guides", href: governmentJobsHub }],
  },
  {
    ...articleBase,
    slug: "ssc-gd-constable-lasik-transprk-medical",
    title: "SSC GD Constable Eye Medical: LASIK, Trans PRK and Your Entry Rules",
    description: "How SSC GD candidates in Rajasthan can locate the applicable CAPF medical guidance and prepare for an eye consultation before refractive surgery.",
    keywords: ["SSC GD LASIK", "SSC GD Trans PRK Rajasthan", "CRPF constable eye medical Jaipur"],
    sections: [
      { heading: "Start with the GD notice and its referenced guidelines", paragraphs: ["The SSC GD 2026 notification directs candidates to MHA recruitment medical guidelines, including amendments. Reading only the application dates or vacancy list does not establish whether a particular surgery is acceptable for your entry.", "Keep the notice and referenced guidelines together. Locate the section for your entry category and seek official clarification where the procedure or your circumstances are not clearly covered."] },
      { heading: "A force preference is not the full medical question", paragraphs: ["Write down both the force and the full post. A general answer about CRPF, BSF or CISF may actually describe a different rank or recruitment route. Likewise, advice given to a CPO candidate may not answer a GD candidate's question.", "Make a short list of unresolved points before your appointment: whether surgery is permitted, which procedure is covered, what documents are required and how any timing requirement is defined. These need answers before a surgical date is chosen."] },
      { heading: "Prepare accurate records for your assessment", paragraphs: ["Bring old prescriptions and any corneal scans or surgical records. Tell the doctor your expected medical date and training plans. An accurate history is more useful than a promise that a procedure cannot be detected.", "At Kabra Eye Hospital in Jaipur, refractive consultation can help you understand your clinical options. If recruitment permission remains unresolved, request an examination report and clarify the rule before committing to treatment."] },
    ],
    faqs: [{ question: "Is there one approved laser for all SSC GD candidates?", answer: "A laser brand does not establish recruitment approval. Check the applicable entry standards and amendments, then discuss clinical suitability with an ophthalmologist." }],
    sources: [recruitmentSources.gd, recruitmentSources.mha],
    relatedLinks: [{ label: "CAPF and CRPF guide", href: governmentJobGuides[1].path }, { label: "SSC post-wise guide", href: governmentJobGuides[0].path }, { label: "All government job guides", href: governmentJobsHub }],
  },
  {
    ...articleBase,
    slug: "ssc-cgl-eye-test-lasik-post-wise-standards",
    title: "SSC CGL Eye Test: Do You Need LASIK for Your Preferred Post?",
    description: "SSC CGL medical planning for Rajasthan candidates: post preferences, glasses, department-specific standards and questions for an eye assessment in Jaipur.",
    keywords: ["SSC CGL LASIK Rajasthan", "SSC CGL eyesight glasses", "SSC CGL medical Jaipur"],
    sections: [
      { heading: "Check your preferred post before changing your vision correction", paragraphs: ["CGL covers different departments and jobs. The 2026 notice includes specific physical standards for certain posts, and some listed eyesight standards allow glasses. Needing glasses does not by itself establish that an applicant must have surgery.", "Read the annexure for each post on your preference list. Do not substitute a CPO or Army eyesight rule for a CGL department's requirement."] },
      { heading: "Glasses permission and surgery permission are separate", paragraphs: ["If a standard can be met with glasses, ask whether you already meet it with your current correction. If you are considering surgery for personal reasons as well, separately check how the department treats previous surgery.", "A general phrase about vision does not answer every question about medical history. Ask the recruiting department for clarification where necessary and retain any written reply."] },
      { heading: "Make your consultation specific", paragraphs: ["Bring a list of preferred posts, relevant annexure pages and old prescriptions. Ask for an explanation of your unaided and corrected vision and which findings matter for your chosen post.", "Kabra Eye Hospital in Sodala, Jaipur can provide an eye assessment and discuss clinically appropriate choices. The decision may include continuing with glasses, further investigation or a refractive procedure if appropriate and compatible with the applicable rules."] },
    ],
    faqs: [{ question: "Is LASIK compulsory for SSC CGL if I wear glasses?", answer: "Do not assume it is. Requirements differ by post, and some listed CGL standards allow glasses. Check the exact department's requirements before considering surgery for recruitment." }],
    sources: [recruitmentSources.cgl],
    relatedLinks: [{ label: "SSC post-wise guide", href: governmentJobGuides[0].path }, { label: "All government job guides", href: governmentJobsHub }, { label: "Refractive care in Jaipur", href: "/lasik-trans-prk/" }],
  },
  {
    ...articleBase,
    slug: "railway-alp-lasik-a1-medical-standard",
    title: "Railway ALP Medical After LASIK: The A1 Restriction Candidates Must Check",
    description: "RRB ALP CEN 01/2026 excludes refractive-error corrective surgery. Understand why surgery history matters before planning an operation in Jaipur.",
    keywords: ["Railway ALP LASIK", "ALP A1 medical Trans PRK", "Railway LASIK Rajasthan"],
    sections: [
      { heading: "ALP has an explicit surgery restriction", paragraphs: ["RRB ALP CEN 01/2026 excludes LASIK and other operations to correct refractive error. It also includes a declaration about corrective eye surgery. Read that provision before arranging treatment for an ALP application.", "Do not assume that improving a vision measurement reverses a rule based on surgical history. If you have already had surgery, give an accurate history and obtain guidance from the recruiting authority."] },
      { heading: "Why a general Railway LASIK article can give the wrong impression", paragraphs: ["Railway recruitment includes posts with different medical categories. Guidance about another post or an employee's periodic medical examination is not automatically relevant to an ALP applicant.", "When checking information online, look for the exact post, CEN number, year and document section. A page saying 'LASIK allowed in Railways' without those details does not answer the ALP question."] },
      { heading: "An eye consultation can still be useful", paragraphs: ["An ophthalmologist can assess your eyesight and explain the measurements in your report. Bring the official recruitment documents and any previous treatment records so the purpose of the consultation is clear.", "Candidates in Jaipur and other Rajasthan districts can consult Kabra Eye Hospital for eye assessment. A clinical report does not override the Railway medical standard or guarantee recruitment fitness."] },
    ],
    faqs: [{ question: "Can another laser procedure bypass the ALP restriction?", answer: "Do not assume an exemption based on a procedure's brand or flapless design. Check the full wording covering refractive-error surgery and obtain clarification from the recruiting authority." }],
    sources: [recruitmentSources.alp],
    relatedLinks: [{ label: "Railway medical guide", href: governmentJobGuides[2].path }, { label: "All government job guides", href: governmentJobsHub }],
  },
];
