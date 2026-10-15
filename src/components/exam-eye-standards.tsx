import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { examEyeStandards, examSources, eyeConditionChecks, railwayAppointmentStandards, visionGlossary, type ExamCategory, type ExamEyeStandard } from "@/data/exam-eye-standards";
import styles from "./government-job-guides.module.css";

const categoryPaths: Record<ExamCategory, string> = {
  SSC: "/ssc-lasik-transprk-medical-standards/",
  "CAPF & CRPF": "/capf-crpf-lasik-transprk-medical-standards/",
  Railways: "/railway-lasik-transprk-medical-standards/",
  "Rajasthan Police": "/rajasthan-police-lasik-transprk-medical-standards/",
};

export function ExamStandardCard({ exam }: { exam: ExamEyeStandard }) {
  const rows = [
    ["Posts covered", exam.posts], ["Selection stages", exam.stages],
    ["Minimum distance vision", exam.distance], ["Minimum near vision", exam.near],
    ["Glasses / correction", exam.correction], ["LASIK and other surgery", exam.surgery],
    ["Other eye checks", exam.conditions],
  ];
  return <article className={styles.examCard} id={exam.id}>
    <header><span className={styles.eyebrow}>{exam.scope}</span><h3>{exam.name}</h3></header>
    <dl className={styles.examFacts}>{rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    {exam.caution && <p className={styles.examCaution}>{exam.caution}</p>}
    <footer><strong>Read the official rule</strong>{exam.sources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noreferrer">{source.label}<ExternalLink size={14} aria-hidden /></a>)}</footer>
  </article>;
}

export function ExamStandardsSection({ category }: { category?: ExamCategory }) {
  const exams = examEyeStandards.filter((exam) => !category || exam.categories.includes(category));
  return <>
    <section className={styles.section} id="exam-standards">
      <span className={styles.eyebrow}>Exams · Posts · Eyesight · Surgery rules</span>
      <h2>{category ? `${category} exam-wise eye standards` : "Find your exam and its minimum vision requirements."}</h2>
      <p>These are medical qualifying standards, not written-exam marks or a personal eligibility result. Each entry names its source cycle. Later amendments, disability provisions and entry-specific rules can change the answer. Age, education, vacancies and application dates must be checked in the full notice.</p>
      {category ? <>
        <nav className={styles.examNav} aria-label="Jump to your exam">{exams.map((exam) => <a key={exam.id} href={`#${exam.id}`}>{exam.name}<ArrowRight size={15} aria-hidden /></a>)}</nav>
        <div className={styles.examList}>{exams.map((exam) => <ExamStandardCard key={exam.id} exam={exam} />)}</div>
      </> : <div className={`${styles.tableWrap} ${styles.examDirectory}`}><table>
        <caption>Choose an exam for selection stages, near vision, glasses rules, surgery conditions and official references. Entries marked unverified do not claim a passing cutoff.</caption>
        <thead><tr><th scope="col">Exam / post</th><th scope="col">Distance-vision summary</th><th scope="col">Source scope and details</th></tr></thead>
        <tbody>{exams.map((exam) => <tr key={exam.id}><th scope="row">{exam.name}</th><td data-label="Distance vision">{exam.distance}</td><td data-label="Source scope">{exam.scope}<Link href={`${categoryPaths[exam.categories[0]]}#${exam.id}`}>Read full eye criteria <ArrowRight size={15} aria-hidden /></Link></td></tr>)}</tbody>
      </table></div>}
    </section>
    {category === "Railways" && <section className={styles.section} id="railway-vision-categories">
      <span className={styles.eyebrow}>Reference, not a standalone clearance rule</span><h2>Railway A1 to C2: appointment eyesight table</h2>
      <p>IRMM paragraph 512(1)(A), for appointment, not the relaxed in-service re-examination table. Match your CEN and amendments first. Surgery history, colour vision and other medical criteria are additional.</p>
      <div className={styles.tableWrap}><table><caption>Two distance values refer to the two eyes. RPF initial recruitment has a no-glasses exception.</caption><thead><tr><th scope="col">Category</th><th scope="col">Distance and near vision</th><th scope="col">Correction</th></tr></thead><tbody>{railwayAppointmentStandards.map((row) => <tr key={row.category}><th scope="row">{row.category}</th><td data-label="Distance and near">{row.distance}<br />Near: {row.near}</td><td data-label="Correction">{row.correction}</td></tr>)}</tbody></table></div>
      <p className={styles.sourceLine}><a href={examSources.manual.href} target="_blank" rel="noreferrer">Official appointment table: IRMM Chapter V, paragraph 512(1)(A) <ExternalLink size={14} aria-hidden /></a></p>
    </section>}
  </>;
}

export function VisionGuideReference() {
  return <>
    <section className={styles.section} id="understand-vision"><span className={styles.eyebrow}>Understand your eye report</span><h2>What do 6/6, N6 and corrected vision mean?</h2><dl className={styles.glossary}>{visionGlossary.map((item) => <div key={item.term}><dt>{item.term}</dt><dd>{item.meaning}</dd></div>)}</dl></section>
    <section className={styles.section} id="other-eye-conditions"><span className={styles.eyebrow}>Beyond the eyesight chart</span><h2>Other eye conditions that can matter at medical.</h2><p>These are reasons to check your post&apos;s rules and obtain an examination, not a universal rejection list.</p><div className={styles.conditionGrid}>{eyeConditionChecks.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p><div className={styles.conditionSources}>{item.sources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noreferrer">{source.label}<ExternalLink size={13} aria-hidden /></a>)}</div></article>)}</div></section>
    <section className={styles.section} id="medical-review"><h2>If an eye finding is questioned at medical</h2><ol className={styles.reviewSteps}><li>Obtain the written finding and the rule cited. Ask which measurement or condition led to the decision.</li><li>Check the notice&apos;s review or appeal procedure immediately. Deadlines and permitted evidence vary; there is no universal appeal period.</li><li>Keep your prescriptions, scans and surgery records. A specialist can document findings, but cannot overturn the recruitment board.</li><li>Do not rush into surgery to meet a review date. First establish whether the procedure is permitted and whether any postoperative interval can be met.</li></ol></section>
  </>;
}
