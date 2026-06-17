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
    role: "Senior Ophthalmologist",
    image: "https://kabraeyejaipur.com/wp-content/uploads/2025/10/01-Dr-Manoj-Kabra-720x700.png",
  },
  {
    name: "Dr. Chitra Kabra",
    role: "Consultant Specialist",
    image: "https://kabraeyejaipur.com/wp-content/uploads/2025/10/02-Dr-Chitra-Kabra-720x700.png",
  },
  {
    name: "Dr. Chitra Sitaraman",
    role: "Consultant Ophthalmologist",
    image:
      "https://kabraeyejaipur.com/wp-content/uploads/2025/10/03-Dr-Chitra-sitaraman-720x700.png",
  },
  {
    name: "Dr. Anoop Kishore Gupta",
    role: "Consultant Specialist",
    image:
      "https://kabraeyejaipur.com/wp-content/uploads/2025/10/04-Dr-Anoop-Kishore-Gupta-720x700.png",
  },
  {
    name: "Dr. Seema Srivastava",
    role: "Consultant Specialist",
    image:
      "https://kabraeyejaipur.com/wp-content/uploads/2025/10/05-Dr-Seema-Srivastava-720x700.png",
  },
  {
    name: "Dr. Neelam Sharma",
    role: "Consultant Specialist",
    image: "https://kabraeyejaipur.com/wp-content/uploads/2025/10/06-Dr-Neelam-Sharma-720x700.png",
  },
];

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
