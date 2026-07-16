import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Baby,
  BookOpen,
  Building2,
  CalendarCheck,
  Contact,
  Eye,
  GraduationCap,
  HandHeart,
  HeartPulse,
  Hospital,
  Microscope,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";

export const site = {
  name: "Kabra Eye Hospital",
  seoName: "Kabra Eye Jaipur",
  description:
    "Jaipur super-specialty eye hospital advancing diagnosis-led eye surgery with Schwind Amaris Trans PRK, cataract, retina, glaucoma, cornea, squint, and pediatric care.",
  url: "https://kabraeyejaipur.com",
  phone: "+91 83027 44446",
  phoneHref: "tel:+918302744446",
  whatsapp:
    "https://wa.me/918302744446?text=Hello%20Kabra%20Eye%20Hospital%2C%20I%20want%20to%20book%20an%20appointment.",
  email: "kabraeyehospital@gmail.com",
  secondEmail: "kabraeyejaipur@gmail.com",
  address: "C-59-60, Jamuna Nagar, Sodala, Ajmer Road, Jaipur, Rajasthan 302006",
  hours: "Mon - Sat: 09:00 AM - 08:00 PM, Sunday: 09:00 AM - 01:00 PM",
  maps: "https://maps.app.goo.gl/",
  logo: "/Screenshot_2026-07-09_at_5.26.40_PM-removebg-preview.png",
  instagram: "https://www.instagram.com/kabraeyehospital_sodala/",
  instagramHandle: "kabraeyehospital_sodala",
};

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  details: string[];
  symptoms: string[];
  image: string;
  icon: LucideIcon;
};

export type ContentTopicGroup = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  topics: Array<
    | string
    | {
        question: string;
        answer: string;
      }
  >;
};

export const services: Service[] = [
  {
    slug: "trans-prk-glasses-spectacle-removal-surgery",
    title: "Trans PRK - Glasses / Spectacle Removal Surgery",
    shortTitle: "Trans PRK",
    description:
      "A touch-free, bladeless laser vision correction option for suitable patients who want freedom from glasses or contact lenses.",
    details: [
      "Surface laser procedure with no flap creation",
      "Useful for eligible active lifestyles and thinner corneas",
      "Counselling, diagnostics, suitability checks, and post-operative follow-up",
    ],
    symptoms: ["Spectacle dependence", "Contact lens discomfort", "Lifestyle need for clear unaided vision"],
    image: "/Adobe Lightroom 3/DSC_0159.jpg",
    icon: Sparkles,
  },
  {
    slug: "icl-ipcl-high-power-number-correction",
    title: "ICL/IPCL - High Power Number Correction",
    shortTitle: "ICL/IPCL",
    description:
      "Implantable lens options for patients with high refractive power where laser correction may not be ideal.",
    details: [
      "Advanced diagnostics before lens selection",
      "A reversible alternative for selected high-power patients",
      "Personalized counselling around risks, recovery, and expectations",
    ],
    symptoms: ["High spectacle number", "Unsuitable laser profile", "Poor contact lens tolerance"],
    image: "/Adobe Lightroom 3/DSC_0163.jpg",
    icon: Eye,
  },
  {
    slug: "cataract-surgery",
    title: "Cataract Surgery (मोतियाबिंद)",
    shortTitle: "Cataract",
    description:
      "Sutureless cataract surgery with modern lens options and careful counselling for clearer, safer everyday vision.",
    details: [
      "Premium lens choices explained in plain language",
      "Cashless treatment support for eligible insurance and TPA patients",
      "Pre-surgery testing, surgical planning, and follow-up care",
    ],
    symptoms: ["Cloudy vision", "Glare while driving", "Frequent change in glasses"],
    image: "/Adobe Lightroom 3/DSC_0142.jpg",
    icon: ShieldCheck,
  },
  {
    slug: "retina-diabetic-eye-care",
    title: "Retina & Diabetic Eye Care",
    shortTitle: "Retina",
    description:
      "Diagnosis and treatment planning for diabetic retinopathy, retinal disease, and complex back-of-eye conditions.",
    details: [
      "Retina screening for diabetic patients",
      "Medical and surgical retina management",
      "Monitoring plans for chronic retinal conditions",
    ],
    symptoms: ["Floaters or flashes", "Diabetes with vision changes", "Distorted or reduced vision"],
    image: "/Adobe Lightroom 3/DSC_0151.jpg",
    icon: Activity,
  },
  {
    slug: "glaucoma-clinic",
    title: "Glaucoma Clinic (कालापानी)",
    shortTitle: "Glaucoma",
    description:
      "Early detection and long-term monitoring for glaucoma, a silent condition that can damage vision without obvious symptoms.",
    details: [
      "Eye pressure, optic nerve, and field testing",
      "Medication, laser, and surgery guidance where suitable",
      "Family-risk and chronic-care counselling",
    ],
    symptoms: ["Family history of glaucoma", "High eye pressure", "Peripheral vision concerns"],
    image: "/Adobe Lightroom 3/DSC_0142.jpg",
    icon: Microscope,
  },
  {
    slug: "cornea-clinic",
    title: "Cornea Clinic",
    shortTitle: "Cornea",
    description:
      "Medical and surgical care for corneal infections, injuries, shape disorders, dryness, and surface disease.",
    details: [
      "Dry eye and ocular surface assessment",
      "Corneal infection and injury management",
      "Specialized investigations for corneal shape and clarity",
    ],
    symptoms: ["Red painful eye", "Light sensitivity", "Blur from corneal disease"],
    image: "/Adobe Lightroom 3/DSC_0161.jpg",
    icon: Stethoscope,
  },
  {
    slug: "squint-clinic",
    title: "Squint Clinic (भेंगापन)",
    shortTitle: "Squint",
    description:
      "Evaluation and treatment planning for eye alignment concerns in children and adults.",
    details: [
      "Child and adult squint assessment",
      "Vision therapy guidance where relevant",
      "Surgical and non-surgical options explained clearly",
    ],
    symptoms: ["Eyes not aligned", "Double vision", "Child closing one eye"],
    image: "/Adobe Lightroom 3/DSC_0138.jpg",
    icon: Users,
  },
  {
    slug: "neuro-ophthalmology-clinic",
    title: "Neuro Ophthalmology Clinic",
    shortTitle: "Neuro Ophthalmology",
    description:
      "Focused evaluation for vision concerns linked to the optic nerve, brain, headaches, and unexplained visual loss.",
    details: [
      "Optic nerve and visual pathway assessment",
      "Coordination for complex neurological eye symptoms",
      "Detailed testing for unexplained vision reduction",
    ],
    symptoms: ["Sudden vision changes", "Persistent headache with vision symptoms", "Optic nerve concerns"],
    image: "/Adobe Lightroom 3/DSC_0151.jpg",
    icon: HeartPulse,
  },
  {
    slug: "childrens-eye-care",
    title: "Children's Eye Care",
    shortTitle: "Children's Eye Care",
    description:
      "Pediatric eye checks for clear vision, learning comfort, squint, lazy eye, and early eye health issues.",
    details: [
      "Child-friendly vision testing",
      "Lazy eye, squint, and refractive error care",
      "Guidance for parents on screen, school, and follow-up needs",
    ],
    symptoms: ["Child sits close to screen", "Frequent rubbing or watering", "School vision complaints"],
    image: "/Adobe Lightroom 3/DSC_0140.jpg",
    icon: Baby,
  },
];

export const specialists = [
  {
    name: "Dr. Manoj Kabra",
    role: "Phaco Refractive Surgeon",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4gG0xrhaFYeLd5VUIhbFjUThU922224nxO_GqIiUzH4CClUrjJO2wEpc&s=10",
  },
  {
    name: "Dr. Chitra Kabra",
    role: "Director",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR_YM0OoC-y3z4bhAY8YGB734lqf1jehzhgAajLEusmw&s=10",
  },
  {
    name: "Dr. Chitra Sitaraman",
    role: "Glaucoma and Squint Specialist",
    image: "https://fpimages.withfloats.com/tile/6711e92772486a60157507c6.jpg",
  },
  {
    name: "Dr. Vighnesh Kabra",
    role: "Refractive Surgeon",
    image: "/DSC_0056.jpg",
  },
];

export const contentTopicGroups: ContentTopicGroup[] = [
  {
    slug: "lasik-specs-removal",
    eyebrow: "LASIK & Specs Removal",
    title: "LASIK, Trans PRK, and specs-removal education ideas.",
    description:
      "Short-form topics for patients comparing glasses-removal options, eligibility, recovery, and common fears.",
    topics: [
      {
        question: "Can LASIK make you completely glasses-free?",
        answer:
          "LASIK can greatly reduce dependence on glasses in suitable eyes, but no ethical surgeon should promise permanent perfect unaided vision. Results depend on number stability, corneal shape, dry eye status, age, healing, and future natural eye changes.",
      },
      {
        question: "What does LASIK actually feel like?",
        answer:
          "Numbing drops are used, so patients usually feel pressure, light, water, or touch rather than sharp pain. Anxiety is common because the eye is open, but the laser portion is usually brief and the team guides the patient throughout.",
      },
      {
        question: "LASIK surgery in real-time (patient POV)",
        answer:
          "From a patient point of view, the process usually feels like lying under a microscope light, keeping focus on a target, feeling brief pressure, and then having the laser applied for seconds. Preparation and counselling take longer than the laser itself.",
      },
      {
        question: "Biggest myth about LASIK",
        answer:
          "The biggest myth is that LASIK is suitable for everyone who wears glasses. Suitability depends on corneal thickness, corneal mapping, dry eye, prescription stability, age, lifestyle, and retina findings where needed.",
      },
      {
        question: "Why some people are not eligible for LASIK",
        answer:
          "People may be unsuitable because of thin or irregular corneas, keratoconus risk, unstable number, severe dry eye, certain autoimmune conditions, pregnancy-related changes, uncontrolled diabetes, or unrealistic expectations.",
      },
      {
        question: "LASIK vs SMILE vs PRK",
        answer:
          "LASIK creates a flap, SMILE removes a lenticule through a small incision, and PRK or Trans PRK treats the corneal surface without a flap. The safest option is chosen after scans, not by popularity or marketing alone.",
      },
      {
        question: "What happens if you blink during LASIK?",
        answer:
          "A small instrument keeps the eyelids open, and modern laser systems include tracking features. Patients should still follow instructions, but ordinary blinking fear is usually handled by the surgical setup.",
      },
      {
        question: "Can eyesight return after LASIK?",
        answer:
          "Some patients can have regression, residual number, dry-eye-related blur, or age-related reading glasses later. LASIK changes corneal shape, but it does not stop natural ageing, cataract, presbyopia, or other eye disease.",
      },
      {
        question: "LASIK at age 18 vs age 35",
        answer:
          "At 18, number stability must be checked carefully because prescriptions can still change. At 35, stability may be better, but dry eye, lifestyle, and future reading-glasses age should be discussed before surgery.",
      },
      {
        question: "Why pilots choose LASIK",
        answer:
          "Pilots and defence candidates often ask about laser vision correction because unaided vision and spectacle independence can matter for work. Final fitness depends on the specific authority rules, healing, and complete eye findings.",
      },
      {
        question: "Night vision after LASIK: truth vs myth",
        answer:
          "Some patients notice glare, halos, dryness, or night-vision fluctuation during healing. Good screening, pupil assessment, prescription planning, and dry-eye management reduce risk, but symptoms should be discussed honestly before surgery.",
      },
      {
        question: "LASIK recovery day by day",
        answer:
          "Many LASIK patients see better quickly, but vision can fluctuate for days or weeks. Drops, avoiding eye rubbing, hygiene, follow-ups, and doctor instructions are important even when vision feels good early.",
      },
      {
        question: "How much screen time after LASIK?",
        answer:
          "Screen use is usually limited at first because blinking reduces and dryness can worsen. The surgeon gives a schedule based on the procedure, surface health, job needs, and healing response.",
      },
      {
        question: "LASIK complications explained honestly",
        answer:
          "Possible issues include dry eye, glare, halos, residual number, regression, flap-related problems, infection, inflammation, or reduced quality of vision. Serious problems are uncommon but screening and follow-up are essential.",
      },
      {
        question: "Celebrity LASIK transformations",
        answer:
          "Celebrity stories can make LASIK look simple, but each eye is different. A safe decision should be based on medical measurements, surgeon counselling, and realistic expectations rather than famous before-and-after examples.",
      },
      {
        question: "Before and after vision simulation",
        answer:
          "A simulation can show how blur may reduce after treatment, but it cannot predict the exact result. Final vision depends on prescription, cornea, healing, dry eye, retina health, and brain adaptation.",
      },
      {
        question: "How lasers reshape your cornea",
        answer:
          "Excimer lasers remove microscopic corneal tissue in a planned pattern to change how light focuses on the retina. The treatment plan is based on prescription and corneal measurements.",
      },
      {
        question: "Most common LASIK fears answered",
        answer:
          "Common fears include pain, blinking, moving, losing vision, and long recovery. These are addressed with numbing drops, eyelid support, eye tracking, sterile protocol, careful screening, and clear post-operative instructions.",
      },
      {
        question: "Is LASIK painful?",
        answer:
          "During LASIK, numbing drops usually prevent sharp pain. Some pressure or discomfort can occur, and dryness or irritation may happen after surgery. Severe pain should be reported promptly.",
      },
      {
        question: "Things nobody tells you before LASIK",
        answer:
          "The most important point is that surgery starts with saying no when the eye is not suitable. Dry eye care, realistic expectations, follow-ups, and future reading-glasses age matter as much as the laser day.",
      },
    ],
  },
  {
    slug: "trans-prk-patient-education",
    eyebrow: "Trans PRK Patient Education",
    title: "Common Trans PRK questions, answered simply.",
    description:
      "Patient-facing answers for people comparing no-touch Trans PRK, LASIK, recovery, safety, and suitability.",
    topics: [
      {
        question: "What is Trans PRK?",
        answer:
          "Trans PRK is a surface laser vision-correction procedure. The laser works on the outer surface of the cornea without creating a LASIK flap, blade-based cut, or corneal incision.",
      },
      {
        question: "How is Trans PRK different from LASIK?",
        answer:
          "LASIK usually involves creating a corneal flap before laser correction. Trans PRK is flapless, so it is often discussed for suitable patients who want a no-cut, no-flap option. The right choice depends on corneal scans, dryness, number stability, lifestyle, and doctor advice.",
      },
      {
        question: "Is Trans PRK painful?",
        answer:
          "Numbing eye drops are used during the laser step, so many patients feel little or no pain during treatment. Afterward, watering, irritation, light sensitivity, or discomfort can happen while the surface heals for the first few days.",
      },
      {
        question: "How long does Trans PRK recovery take?",
        answer:
          "Initial surface healing commonly takes a few days, but visual clarity can continue improving over several weeks. Follow-up visits and prescribed drops are important during recovery.",
      },
      {
        question: "Who is suitable for Trans PRK?",
        answer:
          "Suitability is decided after testing the glasses number, corneal thickness, corneal shape, dry eye status, eye pressure, and retina where needed. Trans PRK is not advised for every eye.",
      },
      {
        question: "Can Trans PRK remove glasses permanently?",
        answer:
          "Trans PRK can reduce dependence on glasses for suitable patients, but exact results depend on the eye measurements and healing response. The doctor explains realistic expectations after screening.",
      },
      {
        question: "Why is Schwind Amaris important for Trans PRK?",
        answer:
          "Schwind Amaris supports true no-touch Trans PRK, where the surface step and vision correction are performed by laser. Kabra Eye Hospital uses this platform for eligible Trans PRK patients in Jaipur.",
      },
      {
        question: "What tests are done before Trans PRK?",
        answer:
          "The screening usually includes refraction, corneal mapping, corneal thickness measurement, dry eye evaluation, eye pressure check, and doctor-led counselling before any procedure is advised.",
      },
      {
        question: "When can I return to work or screens after Trans PRK?",
        answer:
          "Many patients need a short recovery window because the surface of the eye has to heal. Screen use, work, driving, and exercise should be resumed according to the doctor’s post-operative instructions.",
      },
      {
        question: "How do I know whether Trans PRK or another option is better?",
        answer:
          "A refractive consultation compares Trans PRK, LASIK, ICL/IPCL, glasses, contact lenses, or no procedure based on safety and suitability. The safest option is chosen from the measurements, not from the procedure name alone.",
      },
    ],
  },
  {
    slug: "cataract-content",
    eyebrow: "Cataract Content",
    title: "Cataract topics for patient awareness and surgical counselling.",
    description:
      "Practical topics around symptoms, lens choices, myths, recovery, and why timely cataract evaluation matters.",
    topics: [
      {
        question: "First sign of cataract most people ignore",
        answer:
          "The first sign is often not complete blur. Many people notice glare from headlights, needing brighter light for reading, faded colours, or frequent spectacle changes. If daily tasks feel harder even with updated glasses, a cataract evaluation is sensible.",
      },
      {
        question: "Why cataract causes yellow vision",
        answer:
          "A cataract is clouding and ageing of the eye's natural lens. As the lens becomes cloudy and denser, it can scatter light and filter colours, so white objects may look yellowish and colours may look duller than before.",
      },
      {
        question: "Cataract surgery animation",
        answer:
          "In simple terms, cataract surgery removes the cloudy natural lens through a small opening and places a clear artificial intraocular lens, called an IOL, inside the eye. Modern surgery usually uses phacoemulsification, where ultrasound breaks the cloudy lens into tiny pieces before removal.",
      },
      {
        question: "How cataract patients see the world",
        answer:
          "Patients commonly describe cataract vision as foggy, smoky, yellow, faded, or glare-filled. Night driving can become difficult because headlights may scatter or form halos, and reading may need stronger light.",
      },
      {
        question: "Can cataracts come back?",
        answer:
          "The removed cataract does not grow back because the cloudy natural lens has been replaced with an artificial lens. Some patients later develop clouding of the thin capsule behind the lens; this is not a new cataract and can often be treated with a quick laser procedure after examination.",
      },
      {
        question: "Why modern cataract surgery takes minutes",
        answer:
          "Modern cataract surgery is efficient because the incision is small, measurements are planned before surgery, and phacoemulsification can break and remove the cloudy lens quickly. The total hospital visit is longer because preparation, safety checks, and recovery instructions still matter.",
      },
      {
        question: "Difference between old and modern cataract surgery",
        answer:
          "Older cataract surgery often needed larger incisions, more stitches, and longer healing. Modern phaco cataract surgery usually uses smaller incisions, foldable IOLs, faster visual rehabilitation, and more precise lens-power planning.",
      },
      {
        question: "Premium lens vs standard lens",
        answer:
          "A standard monofocal lens usually focuses best at one main distance, often distance vision, so reading glasses may still be needed. Premium lenses may address astigmatism, intermediate vision, or near vision in selected patients, but the right lens depends on eye health, lifestyle, budget, and expectations.",
      },
      {
        question: "Multifocal lens worth it?",
        answer:
          "A multifocal lens can reduce dependence on glasses for near and distance in suitable eyes, but it is not ideal for everyone. Dry eye, retina disease, glaucoma, irregular cornea, night-driving needs, and tolerance for halos must be discussed before choosing it.",
      },
      {
        question: "Cataract surgery myths from India",
        answer:
          "Common myths include waiting until the cataract is fully white, believing eye drops can dissolve cataract, or assuming surgery is always painful. In reality, timing depends on vision needs and eye findings, surgery is usually done with anaesthesia drops or local anaesthesia, and drops cannot remove an established cataract.",
      },
      {
        question: "What happens if cataract is left untreated?",
        answer:
          "Untreated cataract can keep reducing vision and quality of life. Advanced cataracts may make surgery more difficult and can interfere with retina or glaucoma evaluation. A mature white cataract can occasionally cause inflammation or high eye pressure, so regular review is important.",
      },
      {
        question: "Age-wise cataract risk",
        answer:
          "Cataract risk rises with age and is common in older adults, but it can appear earlier with diabetes, steroid use, eye injury, high UV exposure, previous eye inflammation, or family tendency. Children can rarely have congenital or developmental cataracts too.",
      },
      {
        question: "Why diabetics get cataracts earlier",
        answer:
          "Diabetes can change the metabolism and water balance inside the natural lens, making cataract develop earlier or progress faster. Diabetic patients also need retina evaluation because cataract surgery planning should consider diabetic retinopathy status.",
      },
      {
        question: "World's oldest cataract patient stories",
        answer:
          "Very elderly patients can still be considered for cataract surgery when the expected benefit is meaningful and general health allows it. The decision is individual: the surgeon weighs vision needs, eye condition, anaesthesia safety, medicines, and follow-up support.",
      },
      {
        question: "Cataract surgery success rates",
        answer:
          "Cataract surgery is one of the most commonly performed and successful eye surgeries. Vision often improves, but the final result depends on other eye conditions such as retina disease, glaucoma, corneal disease, amblyopia, or optic nerve damage.",
      },
      {
        question: "Can eye drops cure cataracts?",
        answer:
          "No proven eye drop can remove an established cataract. Drops may be prescribed before or after surgery for infection control, inflammation, dryness, or allergy, but the definitive treatment for visually significant cataract is surgical lens replacement.",
      },
      {
        question: "Cataract surgery live reaction",
        answer:
          "Many patients are surprised that the surgery is usually quick and not like a major operation. They may feel light, water, mild pressure, or movement, but pain control is used. Anxiety is common, so the team explains each step before surgery.",
      },
      {
        question: "White cataract explained",
        answer:
          "A white cataract is an advanced cataract where the natural lens has become very dense or opaque. It can cause severe vision reduction and may need more careful surgical planning than an early cataract.",
      },
      {
        question: "Is cataract hereditary?",
        answer:
          "Age-related cataract is usually multifactorial, but family tendency can play a role. Some cataracts in babies or children may be inherited or linked to developmental, metabolic, or pregnancy-related factors and need early specialist evaluation.",
      },
      {
        question: "Recovery timeline after cataract surgery",
        answer:
          "Many patients notice better vision within a few days, but healing and drop schedules continue for weeks. Avoid rubbing the eye, follow the medicine plan, attend follow-ups, and ask the surgeon when to resume driving, heavy work, swimming, and final glasses testing.",
      },
    ],
  },
  {
    slug: "eye-disease-topics",
    eyebrow: "Eye Disease Topics",
    title: "Disease-awareness topics for symptoms patients should not ignore.",
    description:
      "Education prompts for glaucoma, retina, cornea, diabetes-related eye disease, childhood eye disease, and urgent warning signs.",
    topics: [
      {
        question: "Silent eye diseases that cause blindness",
        answer:
          "Glaucoma, diabetic retinopathy, macular degeneration, and some retinal diseases can progress with few early symptoms. Regular eye exams matter because damage may be advanced before vision loss is noticed.",
      },
      {
        question: "Glaucoma: the thief of sight",
        answer:
          "Glaucoma can damage the optic nerve slowly, often affecting side vision first. Because early glaucoma may not hurt or blur central vision, pressure checks, optic nerve evaluation, and visual field testing are important.",
      },
      {
        question: "Eye pressure explained simply",
        answer:
          "Eye pressure is the fluid pressure inside the eye. High pressure can increase glaucoma risk, but glaucoma can also occur at normal pressure, so doctors evaluate the optic nerve and visual fields too.",
      },
      {
        question: "Why glaucoma has no symptoms",
        answer:
          "Glaucoma often damages peripheral vision gradually, and the brain adapts to small changes. By the time a patient notices missing vision, optic nerve damage may already be significant.",
      },
      {
        question: "Macular degeneration warning signs",
        answer:
          "Warning signs include distorted straight lines, blurred central vision, difficulty reading, dull colours, or a dark spot in the centre of vision. Sudden distortion should be checked promptly.",
      },
      {
        question: "Diabetic retinopathy explained in 30 seconds",
        answer:
          "Diabetic retinopathy happens when diabetes damages tiny retinal blood vessels. It can cause leakage, swelling, bleeding, and abnormal vessels, so diabetic patients need scheduled retina screening even when vision seems normal.",
      },
      {
        question: "Retinal detachment symptoms everyone should know",
        answer:
          "Sudden floaters, flashes, a curtain-like shadow, or sudden side-vision loss can signal retinal tear or detachment. These symptoms need urgent retina evaluation because delay can threaten vision.",
      },
      {
        question: "Floaters: when to worry",
        answer:
          "A few long-standing floaters may be harmless, but sudden new floaters, floaters with flashes, vision loss, or a curtain shadow need urgent examination to rule out retinal tear or bleeding.",
      },
      {
        question: "Flashes in vision explained",
        answer:
          "Flashes can occur when the vitreous pulls on the retina, but they can also signal retinal tear risk. New flashes, especially with floaters or shadow, should be checked quickly.",
      },
      {
        question: "Eye stroke explained",
        answer:
          "An eye stroke usually refers to blocked blood flow in a retinal artery or vein. Sudden painless vision loss, field loss, or distortion needs urgent medical and eye evaluation.",
      },
      {
        question: "Corneal ulcer emergency signs",
        answer:
          "Severe eye pain, redness, watering, light sensitivity, discharge, or a white spot on the cornea can be signs of corneal ulcer. Contact lens users should be especially careful and seek urgent care.",
      },
      {
        question: "Keratoconus symptoms nobody notices",
        answer:
          "Early keratoconus can look like frequent glasses changes, increasing cylinder, ghost images, glare, night-driving difficulty, or poor vision despite new glasses. Corneal mapping helps detect it.",
      },
      {
        question: "Uveitis causes and treatment",
        answer:
          "Uveitis is inflammation inside the eye and may be linked to infection, autoimmune disease, injury, or no clear cause. Treatment depends on the type and may include anti-inflammatory drops, dilating drops, tests, or systemic care.",
      },
      {
        question: "Retinitis pigmentosa explained",
        answer:
          "Retinitis pigmentosa is a group of inherited retinal disorders that often affect night vision and peripheral vision first. It needs retina evaluation, counselling, monitoring, and genetic discussion where appropriate.",
      },
      {
        question: "Color blindness tests",
        answer:
          "Colour vision tests use special plates or digital tests to check how a person distinguishes colours. Most inherited colour deficiency is lifelong, but sudden colour-vision change needs eye or nerve evaluation.",
      },
      {
        question: "Childhood eye diseases parents miss",
        answer:
          "Parents can miss lazy eye, squint, high glasses power, congenital cataract, childhood glaucoma, allergy-related rubbing, or retinal problems. Eye checks are important if a child sits close, closes one eye, or struggles at school.",
      },
      {
        question: "Lazy eye treatment success stories",
        answer:
          "Lazy eye treatment works best when started early. Glasses, patching, atropine drops, or treating the cause can improve vision, but success depends on age, severity, consistency, and follow-up.",
      },
      {
        question: "Eye cancer warning signs",
        answer:
          "Warning signs can include a new visible eye growth, unexplained vision loss, persistent redness, distorted pupil, eye bulging, or white pupil reflex in a child. These signs need specialist evaluation.",
      },
      {
        question: "How diabetes damages eyesight",
        answer:
          "Diabetes can damage retinal vessels, cause macular swelling, bleeding, cataract, glaucoma risk, and fluctuating vision. Good sugar control and scheduled retina exams reduce risk of severe vision loss.",
      },
      {
        question: "Autoimmune diseases affecting eyes",
        answer:
          "Autoimmune disease can affect the eyes through dryness, uveitis, scleritis, optic nerve inflammation, or retinal vessel inflammation. Eye symptoms in autoimmune patients should not be ignored.",
      },
    ],
  },
  {
    slug: "dry-eye-digital-strain",
    eyebrow: "Dry Eye & Digital Eye Strain",
    title: "Digital-eye-strain topics for screen-heavy patients.",
    description:
      "Everyday eye-comfort topics for office workers, students, gamers, contact-lens users, and patients with dryness.",
    topics: [
      {
        question: "Why your eyes burn after screen use",
        answer:
          "Screen use reduces blinking and can make the tear film evaporate faster, causing burning, dryness, heaviness, watering, or blurred vision. Persistent redness, pain, light sensitivity, or reduced vision needs an eye exam.",
      },
      {
        question: "Dry eye test demonstration",
        answer:
          "A dry eye evaluation may include symptom scoring, tear film assessment, fluorescein staining, tear breakup time, eyelid and meibomian gland checks, and sometimes Schirmer testing. The goal is to find the cause, not just prescribe drops.",
      },
      {
        question: "The 20-20-20 rule explained",
        answer:
          "Every 20 minutes, look about 20 feet away for 20 seconds. It relaxes near focusing, encourages blinking, and reduces digital eye strain, but it does not replace treatment for dry eye disease or uncorrected spectacle power.",
      },
      {
        question: "Blue light myth vs reality",
        answer:
          "Ordinary screen blue light is more strongly linked with glare, sleep disruption, and discomfort than proven retinal damage. Brightness control, breaks, correct glasses, and treating dry eye usually matter more than blue-light filters alone.",
      },
      {
        question: "Screen addiction and vision",
        answer:
          "Long uninterrupted near work can increase eye strain, dryness, headaches, and in children may contribute to myopia risk. Outdoor time, planned breaks, good lighting, and early eye checks are healthier than marathon screen sessions.",
      },
      {
        question: "Best foods for dry eyes",
        answer:
          "Hydration, leafy greens, nuts, seeds, and omega-3 rich foods can support eye comfort and tear health. Diet helps the foundation, but moderate to severe dry eye often needs a proper treatment plan.",
      },
      {
        question: "AC rooms and dry eye disease",
        answer:
          "Air conditioning lowers humidity and moving air increases tear evaporation. Avoid direct vents, blink consciously, use lubricating drops if advised, and consider humidity control for long office or bedroom exposure.",
      },
      {
        question: "Contact lenses causing dryness",
        answer:
          "Contact lenses can disturb the tear film and may worsen dryness, especially with long wear, AC exposure, or screen work. Pain, redness, discharge, or light sensitivity means remove the lens and seek urgent care.",
      },
      {
        question: "Office workers' eye problems",
        answer:
          "Office workers commonly develop digital eye strain, dry eye symptoms, headaches, fluctuating blur, neck strain, and contact-lens discomfort. Ergonomics, correct prescription, breaks, and dry-eye treatment can make workdays much easier.",
      },
      {
        question: "Gaming and eye strain",
        answer:
          "Gaming often combines long near focus, reduced blinking, dark rooms, and high screen brightness. Breaks, room lighting, distance, hydration, and treating dryness can reduce burning and blurred vision after gaming.",
      },
    ],
  },
  {
    slug: "interesting-eye-facts",
    eyebrow: "Interesting Eye Facts",
    title: "Curiosity-led eye facts for broad patient engagement.",
    description:
      "Simple, shareable ideas that make eye science approachable while bringing people back to reliable eye-care advice.",
    topics: [
      {
        question: "Why are eyes different colors?",
        answer:
          "Eye color mainly depends on melanin in the iris and inherited genetics. Brown eyes have more pigment, while lighter colors have less pigment and more light scattering within the iris.",
      },
      {
        question: "Can crying improve eye health?",
        answer:
          "Tears help lubricate and clean the eye surface, but crying does not cure eye disease. Constant watering, irritation, or sticky discharge may signal dryness, allergy, infection, or blocked tear drainage.",
      },
      {
        question: "Why do eyes twitch?",
        answer:
          "Most eyelid twitching is linked to fatigue, stress, caffeine, screen strain, or dryness. Twitching that persists, closes the eye, involves the face, or comes with weakness should be checked.",
      },
      {
        question: "Why do we get dark circles?",
        answer:
          "Dark circles can come from genetics, pigmentation, allergies, lack of sleep, thin skin, dehydration, or facial anatomy. They are usually cosmetic, but swelling, pain, or sudden change deserves evaluation.",
      },
      {
        question: "How many colors can humans see?",
        answer:
          "Many people can distinguish millions of color shades because of cone cells in the retina and brain processing. Color perception varies with lighting, age, eye disease, and color vision deficiency.",
      },
      {
        question: "Human eye vs camera comparison",
        answer:
          "The cornea and lens focus light like a camera lens, while the retina captures signals and the brain builds the image. Unlike a camera, vision constantly adapts, predicts, and corrects.",
      },
      {
        question: "Can eyesight naturally improve?",
        answer:
          "Rest, lighting, nutrition, and screen breaks can reduce strain, but true spectacle power usually does not disappear naturally. Children with myopia may need myopia-control care, not just eye exercises.",
      },
      {
        question: "Why do pupils change size?",
        answer:
          "Pupils constrict in bright light and enlarge in dim light, emotion, near focus, and with some medicines. New unequal pupils, drooping eyelid, pain, or vision loss can be urgent.",
      },
      {
        question: "Eye facts that sound fake but are true",
        answer:
          "Each eye has a natural blind spot, the cornea has no blood vessels, and the brain corrects the image your eyes capture. Fun facts are useful, but symptoms still need real exams.",
      },
      {
        question: "World's rarest eye diseases",
        answer:
          "Rare eye diseases can involve the retina, cornea, optic nerve, genetics, inflammation, or tumors. Because symptoms can overlap with common problems, specialist diagnosis and documented follow-up matter.",
      },
    ],
  },
  {
    slug: "childrens-eye-health",
    eyebrow: "Children's Eye Health",
    title: "Children's eye-health topics for parents and schools.",
    description:
      "Parent-friendly topics covering glasses, myopia, screen habits, squint, lazy eye, school performance, and preventive checks.",
    topics: [
      {
        question: "Signs your child needs glasses",
        answer:
          "Squinting, sitting close to screens, headaches, eye rubbing, poor school copying, closing one eye, or avoiding reading can signal a vision problem. Children may not complain because they think their vision is normal.",
      },
      {
        question: "Myopia epidemic explained",
        answer:
          "Myopia is increasing worldwide, especially in children with long near-work hours, limited outdoor time, and family history. Early diagnosis helps plan glasses and myopia-control options before numbers progress rapidly.",
      },
      {
        question: "Why kids' eyesight is worsening",
        answer:
          "Children's eyesight may worsen because of myopia progression, genetics, heavy near work, low outdoor exposure, uncorrected glasses, or untreated eye conditions. Regular pediatric eye exams catch problems early.",
      },
      {
        question: "Mobile phones and children's eyes",
        answer:
          "Mobile phones can cause strain, dryness, poor posture, and sleep disruption. Prolonged close viewing may add to myopia risk, so children need breaks, distance, lighting, and outdoor play.",
      },
      {
        question: "Squint treatment options",
        answer:
          "Squint treatment depends on the cause and may include glasses, patching, eye exercises, prism, or surgery. Early treatment is important because squint can lead to lazy eye and poor depth perception.",
      },
      {
        question: "When should children get eye exams?",
        answer:
          "Children should be checked early if there is squint, white reflex, poor tracking, family history, headaches, school complaints, or suspected low vision. Routine checks before school age are also valuable.",
      },
      {
        question: "Eye patch treatment success stories",
        answer:
          "Patching can improve lazy eye by encouraging the weaker eye to work, especially when started early and done consistently. Success depends on age, severity, glasses correction, and follow-up.",
      },
      {
        question: "School performance and vision",
        answer:
          "Blurred distance vision, focusing problems, squint, or lazy eye can affect reading, board work, concentration, and confidence. A child struggling in school should have vision checked, not just academics reviewed.",
      },
      {
        question: "Common mistakes parents make",
        answer:
          "Common mistakes include ignoring squint, delaying glasses, using steroid or redness drops without advice, assuming children will complain, and skipping follow-ups after patching or myopia treatment.",
      },
      {
        question: "Preventing childhood myopia",
        answer:
          "More outdoor time, breaks from near work, correct glasses, healthy sleep, and myopia-control treatment when advised can slow progression. Prevention works best when risk is identified early.",
      },
    ],
  },
  {
    slug: "viral-reel-topics",
    eyebrow: "Viral/Reel-Style Topics",
    title: "Reel-ready topics that can still point to serious eye care.",
    description:
      "High-retention hooks for social videos, challenges, myth reactions, and symptom-awareness stories.",
    topics: [
      {
        question: "POV: This is how a cataract patient sees",
        answer:
          "Cataract vision can look foggy, yellowish, dim, or glare-heavy, especially while night driving. A simulation can raise awareness, but lens clarity and surgery timing need slit-lamp examination.",
      },
      {
        question: "Guess the eye disease challenge",
        answer:
          "These challenges are useful for awareness because many eye diseases have recognizable clues. They should always end with one message: symptoms overlap, and diagnosis belongs in an eye clinic.",
      },
      {
        question: "Eye illusion test",
        answer:
          "Illusions show how the eyes and brain interpret contrast, motion, and patterns. They are fun educational tools, but they are not medical tests for glaucoma, cataract, or retina disease.",
      },
      {
        question: "Can you pass this vision test?",
        answer:
          "Online vision tests can show that something may be wrong, but they cannot replace refraction, eye pressure testing, retina examination, or pediatric screening by an eye-care professional.",
      },
      {
        question: "Find the hidden number challenge",
        answer:
          "Hidden-number charts can hint at color vision difficulty, but screen brightness and image quality affect results. Formal color vision testing is needed for school, career, and medical decisions.",
      },
      {
        question: "Spot the difference vision challenge",
        answer:
          "Spot-the-difference posts can train attention and contrast awareness. Sudden distortion, missing areas, flashes, floaters, or one-eye vision change is not a challenge; it needs examination.",
      },
      {
        question: "Doctor reacts to eye myths",
        answer:
          "Useful myth reactions include explaining that cataract drops do not cure cataract, glaucoma may be silent, steroid drops can be risky, and sudden flashes or floaters should not be ignored.",
      },
      {
        question: "Things ophthalmologists never do",
        answer:
          "Eye doctors avoid sleeping in contact lenses, rubbing eyes aggressively, using steroid drops without diagnosis, ignoring chemical injuries, and delaying care for sudden vision loss or new flashes.",
      },
      {
        question: "Worst eye emergency cases doctors see",
        answer:
          "Serious emergencies include chemical injury, corneal ulcer, eye trauma, retinal detachment symptoms, sudden painless vision loss, and severe red painful eye. These need urgent care, not home remedies.",
      },
      {
        question: "\"I ignored this symptom and nearly lost my vision\"",
        answer:
          "Symptoms people should never ignore include sudden vision loss, flashes with floaters, curtain-like shadow, painful red eye, chemical splash, eye injury, and white pupil reflex in a child.",
      },
    ],
  },
];

export const serviceContentTopicSlugs: Record<string, string[]> = {
  "trans-prk-glasses-spectacle-removal-surgery": ["trans-prk-patient-education"],
  "icl-ipcl-high-power-number-correction": ["lasik-specs-removal"],
  "cataract-surgery": ["cataract-content"],
  "retina-diabetic-eye-care": ["eye-disease-topics"],
  "glaucoma-clinic": ["eye-disease-topics"],
  "cornea-clinic": ["dry-eye-digital-strain", "eye-disease-topics"],
  "squint-clinic": ["childrens-eye-health", "eye-disease-topics"],
  "neuro-ophthalmology-clinic": ["eye-disease-topics"],
  "childrens-eye-care": ["childrens-eye-health"],
};

export const empanelments = [
  "RGHS",
  "CGHS",
  "ECHS",
  "ESIC",
  "BSNL",
  "North Western Railway",
  "Air India",
  "Ayushman Bharat",
  "Chiranjeevi Health Insurance Scheme",
  "Food Corporation of India",
  "Star Health",
  "Medi Assist",
  "Paramount Health",
  "HDFC ERGO",
  "TATA AIG",
];

export const faqs = [
  {
    question: "How do I book an appointment?",
    answer:
      "Use the appointment form, call the hospital, or send a WhatsApp message to +91 83027 44446. The team can guide you to the right clinic and timing.",
  },
  {
    question: "Does Kabra Eye Hospital support cashless treatment?",
    answer:
      "The hospital is empaneled with major government schemes, insurance partners, and TPAs. Eligibility depends on your policy or scheme approval.",
  },
  {
    question: "Which eye treatments are available?",
    answer:
      "The hospital provides Trans PRK, ICL/IPCL, cataract surgery, retina and diabetic eye care, glaucoma care, cornea services, squint care, neuro ophthalmology, and pediatric eye care.",
  },
  {
    question: "Where is the hospital located?",
    answer:
      "Kabra Eye Hospital is located at C-59-60, Jamuna Nagar, Sodala, Ajmer Road, Jaipur, Rajasthan 302006.",
  },
  {
    question: "Is Sunday consultation available?",
    answer:
      "The current public timing says Sunday is open from 09:00 AM to 01:00 PM. Calling before visiting is recommended.",
  },
];

export const educationPrograms = [
  {
    title: "Education & Training",
    href: "/education-training/",
    icon: BookOpen,
    text: "Structured medical education built around clinical exposure, ethical practice, and supervised hospital learning.",
  },
  {
    title: "Paramedical Courses",
    href: "/paramedical-courses/",
    icon: GraduationCap,
    text: "Kabra Institute of Medical Sciences prepares allied healthcare professionals for practical patient-care roles.",
  },
  {
    title: "DNB Affiliated Post-Graduation Courses",
    href: "/dnb-affiliated-post-graduation-courses/",
    icon: Hospital,
    text: "NBEMS-accredited postgraduate ophthalmology training with academic and clinical exposure.",
  },
];

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us/" },
  { label: "Services", href: "/services/" },
  { label: "Keratoconus", href: "/keratoconus/" },
  { label: "Specialists", href: "/meet-our-specialists/" },
  { label: "Authority", href: "/authority/" },
  { label: "Training", href: "/education-training/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Contact", href: "/contacts/" },
];

export const authorityHighlights = [
  {
    title: "Research and academic credibility",
    label: "Research papers and clinical education",
    description:
      "Kabra Eye Hospital presents doctor-led clinical education, DNB-linked training, and research-aware patient guidance so complex eye decisions are explained with medical context.",
    href: "/authority/#research",
  },
  {
    title: "Featured patient education",
    label: "News, public awareness, and media-ready explainers",
    description:
      "The hospital builds public-facing eye health education around cataract, Trans PRK, keratoconus, retina, glaucoma, children's vision, and urgent symptoms patients should not ignore.",
    href: "/authority/#media",
  },
  {
    title: "Community eye camps",
    label: "Free camps and outreach with AU Finance Bank",
    description:
      "Kabra Eye Hospital has participated in free eye-check camps and community screening work, including outreach associated with AU Finance Bank, to improve access beyond the hospital building.",
    href: "/authority/#camps",
  },
  {
    title: "Visible social proof",
    label: "@kabraeyehospital_sodala on Instagram",
    description:
      "Patient stories, doctor explainers, camp updates, eye-health reels, and hospital updates are connected through the official Instagram presence.",
    href: site.instagram,
  },
];

export const seoSupportLinks = [
  { label: "Trans PRK in Jaipur", href: "/lasik-trans-prk/" },
  { label: "Keratoconus Treatment in Jaipur", href: "/keratoconus/" },
  { label: "Cornea Clinic", href: "/service/cornea-clinic/" },
  { label: "Cataract Surgery Jaipur", href: "/service/cataract-surgery/" },
  { label: "Retina and Diabetic Eye Care", href: "/service/retina-diabetic-eye-care/" },
  { label: "Glaucoma Clinic", href: "/service/glaucoma-clinic/" },
  { label: "Meet Eye Specialists", href: "/meet-our-specialists/" },
  { label: "Free Eye Camps and Authority", href: "/authority/" },
  { label: "Instagram Eye Health Reels", href: site.instagram },
];

export const stats = [
  { value: "35+", label: "Years of trusted eye care" },
  { value: "100K+", label: "Successful eye surgeries" },
  { value: "50+", label: "Bedded hospital" },
  { value: "24+", label: "Insurance and TPA partners" },
];

export const pageSummaries = {
  about:
    "Kabra Eye Hospital, Sodala, Ajmer Road, Jaipur is a trusted super-specialty eye centre led by Dr. Manoj Kabra with decades of patient-first care.",
  education:
    "Training programs at Kabra combine structured academics, clinical exposure, and a disciplined healthcare environment.",
  contact:
    "Book an appointment, call the hospital, find the Sodala location, and send a consultation request.",
};

export const utilityPages = [
  "/404-2/",
  "/blog/",
  "/eye-disease/",
  "/home-option-2/",
  "/prices/",
  "/privacy-policy/",
  "/refund_returns/",
];

export const sitemapPaths = [
  "/",
  "/lasik-trans-prk/",
  "/keratoconus/",
  "/authority/",
  "/about-us/",
  "/services/",
  "/service/",
  ...services.map((service) => `/service/${service.slug}/`),
  "/meet-our-specialists/",
  "/contacts/",
  "/complete-empanelment-list/",
  "/education-training/",
  "/paramedical-courses/",
  "/dnb-affiliated-post-graduation-courses/",
  "/faq/",
  "/eye-disease/",
  "/blog/",
  "/blog/schwind-amaris-jaipur-trans-prk-center/",
  "/blog/best-no-cut-no-flap-laser-eye-surgery-jaipur/",
  "/blog/contoura-vs-trans-prk-lasik-difference-jaipur/",
  "/blog/icl-ipcl-improved-vision-benefits-high-power-number/",
  "/blog/trans-prk-lasik-government-job-medical-clearance/",
  "/prices/",
  "/privacy-policy/",
];

export const quickActions = [
  { label: "Book Appointment", href: "#appointment", icon: CalendarCheck },
  { label: site.phone, href: site.phoneHref, icon: Phone },
  { label: "Find Location", href: "/contacts/#location", icon: Contact },
];

export const careValues = [
  { title: "Advanced diagnostics", icon: Microscope },
  { title: "Honest counselling", icon: HandHeart },
  { title: "Insurance support", icon: ShieldCheck },
  { title: "Sodala, Jaipur location", icon: Building2 },
];
