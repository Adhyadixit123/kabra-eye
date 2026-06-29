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
  description: "Super Specialty Eye Centre",
  url: "https://kabraeyejaipur.com",
  phone: "+91 9529 888 000",
  phoneHref: "tel:+919529888000",
  whatsapp:
    "https://wa.me/919529888000?text=Hello%20Kabra%20Eye%20Hospital%2C%20I%20want%20to%20book%20an%20appointment.",
  email: "kabraeyehospital@gmail.com",
  secondEmail: "kabraeyejaipur@gmail.com",
  address: "C-59-60, Jamuna Nagar, Sodala, Ajmer Road, Jaipur, Rajasthan 302006",
  hours: "Mon - Sat: 09:00 AM - 08:00 PM, Sunday: 09:00 AM - 01:00 PM",
  maps: "https://maps.app.goo.gl/",
  logo: "https://kabraeyejaipur.com/wp-content/uploads/2025/08/logo.png",
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
    image: "https://kabraeyejaipur.com/wp-content/uploads/2025/10/01-Dr-Manoj-Kabra-720x700.png",
  },
  {
    name: "Dr. Chitra Kabra",
    role: "Director",
    image: "https://kabraeyejaipur.com/wp-content/uploads/2025/10/02-Dr-Chitra-Kabra-720x700.png",
  },
  {
    name: "Dr. Chitra Sitaraman",
    role: "Glaucoma and Squint Specialist",
    image:
      "https://kabraeyejaipur.com/wp-content/uploads/2025/10/03-Dr-Chitra-sitaraman-720x700.png",
  },
  {
    name: "Dr. Anoop Kishore Gupta",
    role: "Vitreo-Retinal Specialist",
    image:
      "https://kabraeyejaipur.com/wp-content/uploads/2025/10/04-Dr-Anoop-Kishore-Gupta-720x700.png",
  },
  {
    name: "Dr. Vighnesh Kabra",
    role: "Refractive Surgeon",
    image: "/WhatsApp Image 2026-06-29 at 17.52.16 (1).jpeg",
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
      "Can LASIK make you completely glasses-free?",
      "What does LASIK actually feel like?",
      "LASIK surgery in real-time (patient POV)",
      "Biggest myth about LASIK",
      "Why some people are not eligible for LASIK",
      "LASIK vs SMILE vs PRK",
      "What happens if you blink during LASIK?",
      "Can eyesight return after LASIK?",
      "LASIK at age 18 vs age 35",
      "Why pilots choose LASIK",
      "Night vision after LASIK: truth vs myth",
      "LASIK recovery day by day",
      "How much screen time after LASIK?",
      "LASIK complications explained honestly",
      "Celebrity LASIK transformations",
      "Before and after vision simulation",
      "How lasers reshape your cornea",
      "Most common LASIK fears answered",
      "Is LASIK painful?",
      "Things nobody tells you before LASIK",
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
      "First sign of cataract most people ignore",
      "Why cataract causes yellow vision",
      "Cataract surgery animation",
      "How cataract patients see the world",
      "Can cataracts come back?",
      "Why modern cataract surgery takes minutes",
      "Difference between old and modern cataract surgery",
      "Premium lens vs standard lens",
      "Multifocal lens worth it?",
      "Cataract surgery myths from India",
      "What happens if cataract is left untreated?",
      "Age-wise cataract risk",
      "Why diabetics get cataracts earlier",
      "World's oldest cataract patient stories",
      "Cataract surgery success rates",
      "Can eye drops cure cataracts?",
      "Cataract surgery live reaction",
      "White cataract explained",
      "Is cataract hereditary?",
      "Recovery timeline after cataract surgery",
    ],
  },
  {
    slug: "eye-disease-topics",
    eyebrow: "Eye Disease Topics",
    title: "Disease-awareness topics for symptoms patients should not ignore.",
    description:
      "Education prompts for glaucoma, retina, cornea, diabetes-related eye disease, childhood eye disease, and urgent warning signs.",
    topics: [
      "Silent eye diseases that cause blindness",
      "Glaucoma: the thief of sight",
      "Eye pressure explained simply",
      "Why glaucoma has no symptoms",
      "Macular degeneration warning signs",
      "Diabetic retinopathy explained in 30 seconds",
      "Retinal detachment symptoms everyone should know",
      "Floaters: when to worry",
      "Flashes in vision explained",
      "Eye stroke explained",
      "Corneal ulcer emergency signs",
      "Keratoconus symptoms nobody notices",
      "Uveitis causes and treatment",
      "Retinitis pigmentosa explained",
      "Color blindness tests",
      "Childhood eye diseases parents miss",
      "Lazy eye treatment success stories",
      "Eye cancer warning signs",
      "How diabetes damages eyesight",
      "Autoimmune diseases affecting eyes",
    ],
  },
  {
    slug: "dry-eye-digital-strain",
    eyebrow: "Dry Eye & Digital Eye Strain",
    title: "Digital-eye-strain topics for screen-heavy patients.",
    description:
      "Everyday eye-comfort topics for office workers, students, gamers, contact-lens users, and patients with dryness.",
    topics: [
      "Why your eyes burn after screen use",
      "Dry eye test demonstration",
      "The 20-20-20 rule explained",
      "Blue light myth vs reality",
      "Screen addiction and vision",
      "Best foods for dry eyes",
      "AC rooms and dry eye disease",
      "Contact lenses causing dryness",
      "Office workers' eye problems",
      "Gaming and eye strain",
    ],
  },
  {
    slug: "interesting-eye-facts",
    eyebrow: "Interesting Eye Facts",
    title: "Curiosity-led eye facts for broad patient engagement.",
    description:
      "Simple, shareable ideas that make eye science approachable while bringing people back to reliable eye-care advice.",
    topics: [
      "Why are eyes different colors?",
      "Can crying improve eye health?",
      "Why do eyes twitch?",
      "Why do we get dark circles?",
      "How many colors can humans see?",
      "Human eye vs camera comparison",
      "Can eyesight naturally improve?",
      "Why do pupils change size?",
      "Eye facts that sound fake but are true",
      "World's rarest eye diseases",
    ],
  },
  {
    slug: "childrens-eye-health",
    eyebrow: "Children's Eye Health",
    title: "Children's eye-health topics for parents and schools.",
    description:
      "Parent-friendly topics covering glasses, myopia, screen habits, squint, lazy eye, school performance, and preventive checks.",
    topics: [
      "Signs your child needs glasses",
      "Myopia epidemic explained",
      "Why kids' eyesight is worsening",
      "Mobile phones and children's eyes",
      "Squint treatment options",
      "When should children get eye exams?",
      "Eye patch treatment success stories",
      "School performance and vision",
      "Common mistakes parents make",
      "Preventing childhood myopia",
    ],
  },
  {
    slug: "viral-reel-topics",
    eyebrow: "Viral/Reel-Style Topics",
    title: "Reel-ready topics that can still point to serious eye care.",
    description:
      "High-retention hooks for social videos, challenges, myth reactions, and symptom-awareness stories.",
    topics: [
      "POV: This is how a cataract patient sees",
      "Guess the eye disease challenge",
      "Eye illusion test",
      "Can you pass this vision test?",
      "Find the hidden number challenge",
      "Spot the difference vision challenge",
      "Doctor reacts to eye myths",
      "Things ophthalmologists never do",
      "Worst eye emergency cases doctors see",
      "\"I ignored this symptom and nearly lost my vision\"",
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
      "Use the appointment form, call the hospital, or send a WhatsApp message to +91 9529 888 000. The team can guide you to the right clinic and timing.",
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
  { label: "Specialists", href: "/meet-our-specialists/" },
  { label: "Training", href: "/education-training/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Contact", href: "/contacts/" },
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
