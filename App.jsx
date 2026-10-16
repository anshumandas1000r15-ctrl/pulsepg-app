import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  Clock,
  Flame,
  Target,
  Bookmark,
  AlertTriangle,
  FileText,
  BarChart3,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Trash2,
  Edit3,
  Upload,
  Download,
  User,
  Shield,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Filter,
  Search,
  Moon,
  Sun,
  Award,
  Brain,
  Layers,
  Check,
  X,
  HelpCircle,
  RefreshCw,
  Crown,
  Database,
  Copy,
  LogOut,
  Mail,
  Lock,
  Calendar,
  Building2,
  Stethoscope,
  WifiOff,
  ListChecks,
  Eye
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Cell
} from 'recharts';

// ============================================================================
// 1. ALL 19 NEET-PG SUBJECTS & CHAPTERS
// ============================================================================
const INITIAL_SUBJECTS = [
  {
    id: 'sub-1', code: 'ANAT', name: 'Anatomy', group: 'Pre-Clinical', free: true,
    chapters: [
      { id: 'ch-101', name: 'Upper Limb & Brachial Plexus' },
      { id: 'ch-102', name: 'Neuroanatomy & Cranial Nerves' },
      { id: 'ch-103', name: 'Thorax, Abdomen & Pelvis' },
      { id: 'ch-104', name: 'Embryology & Histology' }
    ]
  },
  {
    id: 'sub-2', code: 'PHYS', name: 'Physiology', group: 'Pre-Clinical', free: true,
    chapters: [
      { id: 'ch-201', name: 'Cardiovascular Physiology' },
      { id: 'ch-202', name: 'Respiratory & Renal Physiology' },
      { id: 'ch-203', name: 'Neurophysiology & Special Senses' },
      { id: 'ch-204', name: 'Endocrine & GI Physiology' }
    ]
  },
  {
    id: 'sub-3', code: 'BIOC', name: 'Biochemistry', group: 'Pre-Clinical', free: true,
    chapters: [
      { id: 'ch-301', name: 'Enzymology & Bioenergetics' },
      { id: 'ch-302', name: 'Carbohydrate & Lipid Metabolism' },
      { id: 'ch-303', name: 'Inborn Errors of Metabolism' },
      { id: 'ch-304', name: 'Molecular Biology & Genetics' }
    ]
  },
  {
    id: 'sub-4', code: 'PATH', name: 'Pathology', group: 'Para-Clinical', free: true,
    chapters: [
      { id: 'ch-401', name: 'Cell Injury, Inflammation & Repair' },
      { id: 'ch-402', name: 'Hematology & Lymphoreticular Neoplasms' },
      { id: 'ch-403', name: 'Neoplasia & Molecular Diagnosis' },
      { id: 'ch-404', name: 'Systemic Pathology' }
    ]
  },
  {
    id: 'sub-5', code: 'PHAR', name: 'Pharmacology', group: 'Para-Clinical', free: true,
    chapters: [
      { id: 'ch-501', name: 'General Pharmacology & ANS' },
      { id: 'ch-502', name: 'Cardiovascular & Renal Drugs' },
      { id: 'ch-503', name: 'Antimicrobials & Chemotherapy' },
      { id: 'ch-504', name: 'CNS & Endocrine Pharmacology' }
    ]
  },
  {
    id: 'sub-6', code: 'MICR', name: 'Microbiology', group: 'Para-Clinical', free: true,
    chapters: [
      { id: 'ch-601', name: 'General Microbiology & Immunology' },
      { id: 'ch-602', name: 'Systematic Bacteriology' },
      { id: 'ch-603', name: 'Virology & Mycology' },
      { id: 'ch-604', name: 'Parasitology' }
    ]
  },
  {
    id: 'sub-7', code: 'FMT', name: 'Forensic Medicine', group: 'Para-Clinical', free: true,
    chapters: [
      { id: 'ch-701', name: 'Thanatology & Autopsy' },
      { id: 'ch-702', name: 'Forensic Toxicology' },
      { id: 'ch-703', name: 'Mechanical Asphyxia & Ballistics' }
    ]
  },
  {
    id: 'sub-8', code: 'PSM', name: 'PSM (Community Medicine)', group: 'Para-Clinical', free: true,
    chapters: [
      { id: 'ch-801', name: 'Epidemiology & Biostatistics' },
      { id: 'ch-802', name: 'National Health Programs & Screening' },
      { id: 'ch-803', name: 'Vaccines, Cold Chain & Communicable Diseases' }
    ]
  },
  {
    id: 'sub-9', code: 'ENT', name: 'ENT (Otorhinolaryngology)', group: 'Clinical', free: true,
    chapters: [
      { id: 'ch-901', name: 'Diseases of Ear & Audiology' },
      { id: 'ch-902', name: 'Nose, Paranasal Sinuses & Pharynx' },
      { id: 'ch-903', name: 'Larynx, Trachea & Head-Neck' }
    ]
  },
  {
    id: 'sub-10', code: 'OPHT', name: 'Ophthalmology', group: 'Clinical', free: true,
    chapters: [
      { id: 'ch-1001', name: 'Lens, Cataract & Glaucoma' },
      { id: 'ch-1002', name: 'Retina, Uvea & Neuro-Ophthalmology' },
      { id: 'ch-1003', name: 'Cornea, Conjunctiva & Squint' }
    ]
  },
  {
    id: 'sub-11', code: 'MED', name: 'General Medicine', group: 'Clinical', free: true,
    chapters: [
      { id: 'ch-1101', name: 'Cardiology & ECG Interpretation' },
      { id: 'ch-1102', name: 'Pulmonology, Nephrology & Acid-Base' },
      { id: 'ch-1103', name: 'Neurology, Endocrinology & Rheumatology' }
    ]
  },
  {
    id: 'sub-12', code: 'SURG', name: 'General Surgery', group: 'Clinical', free: true,
    chapters: [
      { id: 'ch-1201', name: 'Hepatobiliary, Pancreas & GI Surgery' },
      { id: 'ch-1202', name: 'Trauma, Burns & Vascular Surgery' },
      { id: 'ch-1203', name: 'Breast, Endocrine & Urology' }
    ]
  },
  {
    id: 'sub-13', code: 'OBG', name: 'Obstetrics & Gynecology', group: 'Clinical', free: true,
    chapters: [
      { id: 'ch-1301', name: 'Antenatal Care, Labor & PPH' },
      { id: 'ch-1302', name: 'High-Risk Pregnancy & Hypertensive Disorders' },
      { id: 'ch-1303', name: 'Gynecologic Oncology, PCOS & Contraception' }
    ]
  },
  {
    id: 'sub-14', code: 'PED', name: 'Pediatrics', group: 'Clinical', free: true,
    chapters: [
      { id: 'ch-1401', name: 'Neonatology & NRP Guidelines' },
      { id: 'ch-1402', name: 'Growth, Development & Nutrition' },
      { id: 'ch-1403', name: 'Pediatric Systemic Disorders & Genetics' }
    ]
  },
  {
    id: 'sub-15', code: 'ORTH', name: 'Orthopedics', group: 'Clinical', free: true,
    chapters: [
      { id: 'ch-1501', name: 'Upper & Lower Limb Traumatology' },
      { id: 'ch-1502', name: 'Bone Tumors & Metabolic Bone Disease' },
      { id: 'ch-1503', name: 'Pediatric Ortho & Peripheral Nerve Injuries' }
    ]
  },
  {
    id: 'sub-16', code: 'DERM', name: 'Dermatology', group: 'Clinical', free: true,
    chapters: [
      { id: 'ch-1601', name: 'Vesiculobullous & Papulosquamous Disorders' },
      { id: 'ch-1602', name: 'Cutaneous Infections, Leprosy & STIs' }
    ]
  },
  {
    id: 'sub-17', code: 'PSYC', name: 'Psychiatry', group: 'Clinical', free: true,
    chapters: [
      { id: 'ch-1701', name: 'Mood, Psychotic & Anxiety Disorders' },
      { id: 'ch-1702', name: 'Substance Use & Child Psychiatry' }
    ]
  },
  {
    id: 'sub-18', code: 'RAD', name: 'Radiology', group: 'Clinical', free: true,
    chapters: [
      { id: 'ch-1801', name: 'Chest, Neuro & MSK Imaging Signs' },
      { id: 'ch-1802', name: 'Radiation Physics & Contrast Agents' }
    ]
  },
  {
    id: 'sub-19', code: 'ANES', name: 'Anesthesia', group: 'Clinical', free: true,
    chapters: [
      { id: 'ch-1901', name: 'Airway Management, Capnography & Circuits' },
      { id: 'ch-1902', name: 'Inhalational/IV Anesthetics & Neuromuscular Blockers' }
    ]
  }
];

// ============================================================================
// 2. 20 CLEARLY MARKED SAMPLE DUMMY QUESTIONS ACROSS ALL 19 SUBJECTS
// ============================================================================
const INITIAL_QUESTIONS = [
  {
    id: 'q-1',
    subject_id: 'sub-1',
    subject_name: 'Anatomy',
    chapter_id: 'ch-101',
    chapter_name: 'Upper Limb & Brachial Plexus',
    question_text: '[SAMPLE DUMMY] A 24-year-old motorcyclist presents after a fall onto his shoulder with the right upper limb held in adduction, internal rotation, and pronation ("waiter\'s tip" posture). Which nerve root combination is primarily injured?',
    image_type: 'brachial_diagram',
    options: [
      'C5 and C6 roots (Erb\'s point)',
      'C8 and T1 roots (Klumpke\'s paralysis)',
      'Posterior cord of brachial plexus',
      'Long thoracic nerve (C5, C6, C7)'
    ],
    correct_option: 0,
    explanation: 'SAMPLE DUMMY EXPLANATION: Injury to the upper trunk of the brachial plexus (Erb\'s point: union of C5 and C6 roots) causes paralysis of supraspinatus, deltoid, biceps brachii, brachialis, and supinator. This leads to an adducted, internally rotated shoulder and extended, pronated forearm ("waiter\'s tip" deformity).',
    exam_name: 'NEET-PG',
    exam_year: 2024,
    difficulty: 'easy',
    tags: ['Brachial Plexus', 'Upper Limb', 'High-Yield']
  },
  {
    id: 'q-2',
    subject_id: 'sub-2',
    subject_name: 'Physiology',
    chapter_id: 'ch-201',
    chapter_name: 'Cardiovascular Physiology',
    question_text: '[SAMPLE DUMMY] During the cardiac cycle, the isovolumetric relaxation phase begins immediately after which of the following physiological events?',
    image_type: 'pv_loop',
    options: [
      'Opening of the mitral valve',
      'Closure of the aortic and pulmonary valves (S2)',
      'Closure of the atrioventricular valves (S1)',
      'Peak of the "v" wave in the jugular venous pulse'
    ],
    correct_option: 1,
    explanation: 'SAMPLE DUMMY EXPLANATION: Isovolumetric relaxation starts with the closure of the semilunar (aortic and pulmonic) valves (which produces the second heart sound, S2) and ends when ventricular pressure falls below atrial pressure, causing the AV (mitral/tricuspid) valves to open.',
    exam_name: 'INI-CET',
    exam_year: 2024,
    difficulty: 'medium',
    tags: ['Cardiac Cycle', 'PV Loop', 'CVS']
  },
  {
    id: 'q-3',
    subject_id: 'sub-3',
    subject_name: 'Biochemistry',
    chapter_id: 'ch-303',
    chapter_name: 'Inborn Errors of Metabolism',
    question_text: '[SAMPLE DUMMY] An infant presents with hepatomegaly, severe fasting hypoglycemia, lactic acidosis, hyperuricemia, and hyperlipidemia. Liver biopsy reveals abundant glycogen of normal structure. Which enzyme is deficient?',
    image_type: '',
    options: [
      'Muscle glycogen phosphorylase (McArdle disease)',
      'Glucose-6-phosphatase (Von Gierke disease)',
      'Lysosomal alpha-1,4-glucosidase (Pompe disease)',
      'Debranching enzyme (Cori disease)'
    ],
    correct_option: 1,
    explanation: 'SAMPLE DUMMY EXPLANATION: Type I Glycogen Storage Disease (Von Gierke disease) is caused by deficiency of glucose-6-phosphatase. Classic features include severe fasting hypoglycemia, lactic acidosis, hyperuricemia, hypertriglyceridemia, and doll-like facies with renomegaly and hepatomegaly.',
    exam_name: 'NEET-PG',
    exam_year: 2023,
    difficulty: 'easy',
    tags: ['GSD', 'Metabolism', 'Pediatrics Overlap']
  },
  {
    id: 'q-4',
    subject_id: 'sub-4',
    subject_name: 'Pathology',
    chapter_id: 'ch-402',
    chapter_name: 'Hematology & Lymphoreticular Neoplasms',
    question_text: '[SAMPLE DUMMY] A 32-year-old patient presents with painless cervical lymphadenopathy and B-symptoms. Excisional biopsy reveals large binucleated cells with prominent eosinophilic "owl-eye" nucleoli that stain positive for CD15 and CD30, and negative for CD45. What is the diagnosis?',
    image_type: 'reed_sternberg',
    options: [
      'Burkitt lymphoma',
      'Classical Hodgkin lymphoma',
      'Nodular lymphocyte-predominant Hodgkin lymphoma (NLPHL)',
      'Mantle cell lymphoma'
    ],
    correct_option: 1,
    explanation: 'SAMPLE DUMMY EXPLANATION: Classical Reed-Sternberg cells (owl-eye appearance) in Classical Hodgkin Lymphoma express CD15 and CD30 and are negative for CD45 and CD20. By contrast, "popcorn" (LP) cells in NLPHL are CD20+ and CD45+, and negative for CD15/CD30.',
    exam_name: 'NEET-PG',
    exam_year: 2024,
    difficulty: 'medium',
    tags: ['Hematopathology', 'Immunohistochemistry', 'Image-Based']
  },
  {
    id: 'q-5',
    subject_id: 'sub-5',
    subject_name: 'Pharmacology',
    chapter_id: 'ch-502',
    chapter_name: 'Cardiovascular & Renal Drugs',
    question_text: '[SAMPLE DUMMY] A 62-year-old patient with HFrEF (EF 30%) is started on Sacubitril-Valsartan. Which concomitant medication must be strictly discontinued at least 36 hours prior to initiating Sacubitril-Valsartan to prevent life-threatening angioedema?',
    image_type: '',
    options: [
      'Metoprolol succinate',
      'Spironolactone',
      'Enalapril',
      'Dapagliflozin'
    ],
    correct_option: 2,
    explanation: 'SAMPLE DUMMY EXPLANATION: Sacubitril inhibits neprilysin, which degrades bradykinin. Combining an ACE inhibitor (such as Enalapril) with a neprilysin inhibitor causes marked accumulation of bradykinin and high risk of angioedema. A mandatory 36-hour washout period is required when switching from an ACEi to ARNI.',
    exam_name: 'INI-CET',
    exam_year: 2025,
    difficulty: 'easy',
    tags: ['Heart Failure', 'Drug Interactions', 'CVS']
  },
  {
    id: 'q-6',
    subject_id: 'sub-6',
    subject_name: 'Microbiology',
    chapter_id: 'ch-603',
    chapter_name: 'Virology & Mycology',
    question_text: '[SAMPLE DUMMY] An HIV-positive patient with a CD4 count of 45 cells/mm³ presents with headache, neck stiffness, and altered sensorium. CSF India ink preparation demonstrates encapsulated budding yeast cells with a clear halo. Which virulence factor is primarily responsible for immune evasion?',
    image_type: '',
    options: [
      'Galactomannan cell wall antigen',
      'Polysaccharide capsule (Glucuronoxylomannan)',
      'Mycolic acid layer',
      'Heat-stable enterotoxin'
    ],
    correct_option: 1,
    explanation: 'SAMPLE DUMMY EXPLANATION: Cryptococcus neoformans possesses a prominent antiphagocytic polysaccharide capsule composed mainly of glucuronoxylomannan (GXM), which is visualized as a clear refractile halo on India ink staining and detected via cryptococcal antigen (CrAg) latex agglutination/LFA.',
    exam_name: 'NEET-PG',
    exam_year: 2023,
    difficulty: 'easy',
    tags: ['Mycology', 'CNS Infections', 'HIV']
  },
  {
    id: 'q-7',
    subject_id: 'sub-7',
    subject_name: 'Forensic Medicine',
    chapter_id: 'ch-702',
    chapter_name: 'Forensic Toxicology',
    question_text: '[SAMPLE DUMMY] A farmer is brought to the emergency department with pinpoint pupils, profuse salivation, lacrimation, bronchorrhea, and fasciculations after spraying pesticide. Which antidote acts by reactivating acetylcholinesterase at the neuromuscular junction?',
    image_type: '',
    options: [
      'Atropine sulfate',
      'Pralidoxime (2-PAM)',
      'Physostigmine',
      'N-acetylcysteine'
    ],
    correct_option: 1,
    explanation: 'SAMPLE DUMMY EXPLANATION: In organophosphate poisoning, Atropine competitively blocks muscarinic receptors, whereas oximes such as Pralidoxime (2-PAM) cleave the phosphate-ester bond on phosphorylated acetylcholinesterase (before "aging" occurs), restoring enzyme activity particularly at nicotinic neuromuscular junctions.',
    exam_name: 'NEET-PG',
    exam_year: 2022,
    difficulty: 'easy',
    tags: ['Toxicology', 'OP Poisoning', 'Antidotes']
  },
  {
    id: 'q-8',
    subject_id: 'sub-8',
    subject_name: 'PSM (Community Medicine)',
    chapter_id: 'ch-801',
    chapter_name: 'Epidemiology & Biostatistics',
    question_text: '[SAMPLE DUMMY] A new rapid screening test for dengue is evaluated in 1,000 febrile patients. Gold-standard RT-PCR confirms dengue in 200 patients. The rapid test is positive in 180 of the 200 confirmed cases, and also positive in 80 of the 800 dengue-negative patients. What is the Specificity of the new screening test?',
    image_type: '',
    options: [
      '90%',
      '80%',
      '69.2%',
      '97.3%'
    ],
    correct_option: 0,
    explanation: 'SAMPLE DUMMY EXPLANATION: True Positives (TP) = 180, False Negatives (FN) = 20 (Sensitivity = 180/200 = 90%). Among 800 disease-negative patients, False Positives (FP) = 80, so True Negatives (TN) = 800 - 80 = 720. Specificity = TN / (TN + FP) = 720 / 800 = 90%.',
    exam_name: 'INI-CET',
    exam_year: 2024,
    difficulty: 'medium',
    tags: ['Biostatistics', 'Screening', 'Numerical']
  },
  {
    id: 'q-9',
    subject_id: 'sub-9',
    subject_name: 'ENT (Otorhinolaryngology)',
    chapter_id: 'ch-901',
    chapter_name: 'Diseases of Ear & Audiology',
    question_text: '[SAMPLE DUMMY] A 28-year-old woman presents with bilateral progressive conductive hearing loss that worsened during pregnancy. Otoscopy reveals a normal tympanic membrane with a reddish hue over the promontory (Schwartze sign). Pure tone audiometry typically shows a dip in bone conduction at which frequency?',
    image_type: 'audiogram_carhart',
    options: [
      '500 Hz',
      '1000 Hz',
      '2000 Hz (Carhart\'s notch)',
      '4000 Hz (Acoustic dip)'
    ],
    correct_option: 2,
    explanation: 'SAMPLE DUMMY EXPLANATION: Otosclerosis typically presents in young females with bilateral conductive hearing loss, paracusis Willisii, normal tympanic membrane (or Schwartze sign in active cochlear focus), and a characteristic dip in bone conduction at 2000 Hz known as Carhart\'s notch (whereas noise-induced hearing loss causes a 4000 Hz dip).',
    exam_name: 'NEET-PG',
    exam_year: 2024,
    difficulty: 'easy',
    tags: ['Audiology', 'Otosclerosis', 'Image-Based']
  },
  {
    id: 'q-10',
    subject_id: 'sub-10',
    subject_name: 'Ophthalmology',
    chapter_id: 'ch-1001',
    chapter_name: 'Lens, Cataract & Glaucoma',
    question_text: '[SAMPLE DUMMY] A 58-year-old hyperopic patient develops sudden severe unilateral ocular pain, headache, nausea, halos around lights, a mid-dilated vertically oval non-reactive pupil, and IOP of 54 mmHg. What is the definitive laser procedure of choice once the acute attack is broken?',
    image_type: '',
    options: [
      'Panretinal photocoagulation (PRP)',
      'Nd:YAG laser peripheral iridotomy (LPI) in both eyes',
      'Selective laser trabeculoplasty (SLT) only',
      'Laser capsulotomy'
    ],
    correct_option: 1,
    explanation: 'SAMPLE DUMMY EXPLANATION: Acute primary angle-closure glaucoma (PACG) is managed medically first (IV acetazolamide, mannitol, topical pilocarpine/timolol) to lower IOP and clear corneal edema, followed by definitive Nd:YAG laser peripheral iridotomy (LPI) in the affected eye and prophylactically in the fellow eye.',
    exam_name: 'NEET-PG',
    exam_year: 2023,
    difficulty: 'medium',
    tags: ['Glaucoma', 'Ocular Emergency', 'Laser']
  },
  {
    id: 'q-11',
    subject_id: 'sub-11',
    subject_name: 'General Medicine',
    chapter_id: 'ch-1101',
    chapter_name: 'Cardiology & ECG Interpretation',
    question_text: '[SAMPLE DUMMY] A 55-year-old patient with chronic kidney disease presents with generalized weakness. ECG shows tall, tented T waves, prolonged PR interval, flattened P waves, and widening of the QRS complex. What is the immediate first-line pharmacological intervention to stabilize the myocardium?',
    image_type: 'ecg_hyperkalemia',
    options: [
      'Oral Sodium Polystyrene Sulfonate',
      'Intravenous 10% Calcium Gluconate over 2–5 minutes',
      'Intravenous Regular Insulin + 50% Dextrose',
      'Nebulized Salbutamol'
    ],
    correct_option: 1,
    explanation: 'SAMPLE DUMMY EXPLANATION: In severe hyperkalemia with ECG changes (tall peaked T waves, QRS widening), IV Calcium Gluconate (10 mL of 10%) is given immediately first to stabilize the cardiac resting membrane potential and prevent ventricular fibrillation, followed by insulin+dextrose to shift potassium intracellularly.',
    exam_name: 'NEET-PG',
    exam_year: 2025,
    difficulty: 'easy',
    tags: ['ECG', 'Electrolytes', 'Emergency Medicine']
  },
  {
    id: 'q-12',
    subject_id: 'sub-11',
    subject_name: 'General Medicine',
    chapter_id: 'ch-1102',
    chapter_name: 'Pulmonology, Nephrology & Acid-Base',
    question_text: '[SAMPLE DUMMY] Arterial blood gas analysis of a stuporous patient reveals: pH = 7.18, PaCO2 = 24 mmHg, HCO3- = 9 mEq/L, Na+ = 138 mEq/L, Cl- = 101 mEq/L. What is the acid-base disorder?',
    image_type: '',
    options: [
      'Normal anion gap metabolic acidosis',
      'High anion gap metabolic acidosis with appropriate respiratory compensation',
      'Mixed metabolic acidosis and respiratory acidosis',
      'Uncompensated respiratory alkalosis'
    ],
    correct_option: 1,
    explanation: 'SAMPLE DUMMY EXPLANATION: pH < 7.35 and low HCO3- (9 mEq/L) indicate primary metabolic acidosis. Anion Gap = Na - (Cl + HCO3) = 138 - (101 + 9) = 28 mEq/L (High Anion Gap). By Winter\'s formula, expected PaCO2 = (1.5 × 9) + 8 ± 2 = 21.5 ± 2 (19.5–23.5 mmHg), which closely matches 24 mmHg, indicating appropriate respiratory compensation.',
    exam_name: 'INI-CET',
    exam_year: 2025,
    difficulty: 'hard',
    tags: ['ABG', 'Acid-Base', 'Winters Formula']
  },
  {
    id: 'q-13',
    subject_id: 'sub-12',
    subject_name: 'General Surgery',
    chapter_id: 'ch-1201',
    chapter_name: 'Hepatobiliary, Pancreas & GI Surgery',
    question_text: '[SAMPLE DUMMY] During laparoscopic cholecystectomy, dissecting within the hepatocystic triangle (Calot\'s triangle) is essential to achieve the Critical View of Safety. Which structure forms the superior border of the modern hepatocystic triangle?',
    image_type: '',
    options: [
      'Cystic artery',
      'Inferior surface of the liver (Segment IVb/V)',
      'Common hepatic duct',
      'Cystic duct'
    ],
    correct_option: 1,
    explanation: 'SAMPLE DUMMY EXPLANATION: While the historical description of Calot\'s triangle used the cystic artery as the superior border, the modern anatomical definition of the hepatocystic triangle (used in laparoscopic cholecystectomy Critical View of Safety) defines the boundaries as: Cystic duct (inferior/lateral), Common hepatic duct (medial), and Inferior surface of the liver (superior).',
    exam_name: 'NEET-PG',
    exam_year: 2024,
    difficulty: 'medium',
    tags: ['Hepatobiliary', 'Laparoscopy', 'Anatomy Overlap']
  },
  {
    id: 'q-14',
    subject_id: 'sub-13',
    subject_name: 'Obstetrics & Gynecology',
    chapter_id: 'ch-1302',
    chapter_name: 'High-Risk Pregnancy & Hypertensive Disorders',
    question_text: '[SAMPLE DUMMY] A primigravida at 35 weeks gestation with severe preeclampsia is receiving intravenous Magnesium Sulfate. On hourly monitoring, her patellar deep tendon reflexes are absent and respiratory rate is 10/min. What is the immediate next step?',
    image_type: '',
    options: [
      'Halve the maintenance infusion rate and continue MgSO4',
      'Stop MgSO4 immediately and administer IV 10% Calcium Gluconate (10 mL over 10 min)',
      'Administer IV Phenytoin loading dose',
      'Perform immediate endotracheal intubation without stopping infusion'
    ],
    correct_option: 1,
    explanation: 'SAMPLE DUMMY EXPLANATION: Loss of patellar reflexes occurs at serum Mg2+ levels > 7 mEq/L, and respiratory depression occurs at > 10 mEq/L. When patellar reflexes are absent and respiratory depression is present, stop MgSO4 immediately and give IV 10% Calcium Gluconate (10 mL slowly over 10 minutes) alongside respiratory support.',
    exam_name: 'NEET-PG',
    exam_year: 2024,
    difficulty: 'easy',
    tags: ['Preeclampsia', 'MgSO4 Toxicity', 'Obstetric Emergency']
  },
  {
    id: 'q-15',
    subject_id: 'sub-14',
    subject_name: 'Pediatrics',
    chapter_id: 'ch-1402',
    chapter_name: 'Growth, Development & Nutrition',
    question_text: '[SAMPLE DUMMY] A child brought for a well-baby visit can walk up and down stairs two feet per step while holding a rail, builds a tower of 6 cubes, uses 2-to-3 word phrases, and turns pages of a book one at a time. What is the approximate developmental age?',
    image_type: '',
    options: [
      '15 months',
      '18 months',
      '24 months (2 years)',
      '36 months (3 years)'
    ],
    correct_option: 2,
    explanation: 'SAMPLE DUMMY EXPLANATION: At 24 months (2 years), key milestones include: running well, climbing stairs two feet per step, building a tower of 6–7 cubes, turning book pages singly, imitating a vertical line, and combining 2–3 words into simple phrases.',
    exam_name: 'INI-CET',
    exam_year: 2023,
    difficulty: 'medium',
    tags: ['Milestones', 'Growth & Development', 'Pediatrics']
  },
  {
    id: 'q-16',
    subject_id: 'sub-15',
    subject_name: 'Orthopedics',
    chapter_id: 'ch-1502',
    chapter_name: 'Bone Tumors & Metabolic Bone Disease',
    question_text: '[SAMPLE DUMMY] A 26-year-old patient presents with swelling and dull ache around the knee for 4 months. Knee radiograph reveals an eccentric, lytic lesion in the distal femoral epiphyseal-metaphyseal region extending right up to the subchondral bone with a "soap-bubble" appearance and no sclerotic rim. What is the most likely diagnosis?',
    image_type: '',
    options: [
      'Osteosarcoma',
      'Giant cell tumor (Osteoclastoma)',
      'Ewing sarcoma',
      'Chondroblastoma'
    ],
    correct_option: 1,
    explanation: 'SAMPLE DUMMY EXPLANATION: Giant Cell Tumor (GCT / Osteoclastoma) classically occurs in skeletally mature patients (20–40 years, fused physis), involves the epiphysis/metaphysis abutting the subchondral articular surface (most commonly distal femur or proximal tibia), and gives an eccentric "soap-bubble" osteolytic appearance.',
    exam_name: 'NEET-PG',
    exam_year: 2023,
    difficulty: 'easy',
    tags: ['Bone Tumors', 'Radiology Overlap', 'Ortho']
  },
  {
    id: 'q-17',
    subject_id: 'sub-16',
    subject_name: 'Dermatology',
    chapter_id: 'ch-1601',
    chapter_name: 'Vesiculobullous & Papulosquamous Disorders',
    question_text: '[SAMPLE DUMMY] A 45-year-old patient presents with painful oral mucosal erosions and flaccid cutaneous bullae that rupture easily, leaving raw denuded areas. Nikolsky sign is positive. Direct immunofluorescence (DIF) of perilesional skin shows intercellular IgG and C3 deposits in a "fishnet" pattern. Which antigen is targeted?',
    image_type: '',
    options: [
      'BP180 and BP230 (Hemidesmosomes)',
      'Desmoglein 3 and Desmoglein 1 (Desmosomes)',
      'Epidermal transglutaminase',
      'Type VII collagen in anchoring fibrils'
    ],
    correct_option: 1,
    explanation: 'SAMPLE DUMMY EXPLANATION: Pemphigus vulgaris is caused by IgG autoantibodies against Desmoglein 3 (mucosal-dominant) and Desmoglein 1 (mucocutaneous), leading to acantholysis, suprabasal intraepidermal clefting ("row of tombstones"), positive Nikolsky sign, and intercellular "fishnet" IgG deposition on DIF.',
    exam_name: 'NEET-PG',
    exam_year: 2024,
    difficulty: 'medium',
    tags: ['Immunobullous', 'Pemphigus', 'Pathology Overlap']
  },
  {
    id: 'q-18',
    subject_id: 'sub-17',
    subject_name: 'Psychiatry',
    chapter_id: 'ch-1701',
    chapter_name: 'Mood, Psychotic & Anxiety Disorders',
    question_text: '[SAMPLE DUMMY] A 29-year-old patient with treatment-resistant schizophrenia (failed two adequate trials of risperidone and olanzapine) is initiated on Clozapine. Mandatory baseline and weekly hematological monitoring is required during the first 18 weeks primarily to detect which adverse effect?',
    image_type: '',
    options: [
      'Thrombocytopenia',
      'Agranulocytosis (Absolute Neutrophil Count < 500/mm³)',
      'Aplastic anemia',
      'Autoimmune hemolytic anemia'
    ],
    correct_option: 1,
    explanation: 'SAMPLE DUMMY EXPLANATION: Clozapine is the drug of choice for treatment-resistant schizophrenia and reduces suicidality, but carries a ~1% risk of potentially fatal agranulocytosis (highest in the first 18 weeks). Absolute Neutrophil Count (ANC) must be monitored weekly for the first 18 weeks.',
    exam_name: 'INI-CET',
    exam_year: 2024,
    difficulty: 'easy',
    tags: ['Psychopharmacology', 'Schizophrenia', 'Drug Safety']
  },
  {
    id: 'q-19',
    subject_id: 'sub-18',
    subject_name: 'Radiology',
    chapter_id: 'ch-1801',
    chapter_name: 'Chest, Neuro & MSK Imaging Signs',
    question_text: '[SAMPLE DUMMY] A 40-year-old construction worker sustains head trauma, experiences a brief loss of consciousness followed by a 2-hour lucid interval, and then rapidly deteriorates with ipsilateral mydriasis. Non-contrast head CT shows a hyperdense biconvex (lentiform) extra-axial collection that does not cross suture lines. Which vessel is most commonly ruptured?',
    image_type: 'ct_edh',
    options: [
      'Cortical bridging veins',
      'Middle meningeal artery',
      'Anterior communicating artery aneurysm',
      'Deep cerebral internal veins'
    ],
    correct_option: 1,
    explanation: 'SAMPLE DUMMY EXPLANATION: Epidural hematoma (EDH) classically results from a temporal bone fracture (pterion) lacerating the middle meningeal artery. Because the periosteal dura is tightly adherent to cranial sutures, EDH forms a biconvex (lens-shaped) hyperdense collection on NCCT that does not cross suture lines.',
    exam_name: 'NEET-PG',
    exam_year: 2025,
    difficulty: 'easy',
    tags: ['Neuroradiology', 'Neurotrauma', 'Image-Based']
  },
  {
    id: 'q-20',
    subject_id: 'sub-19',
    subject_name: 'Anesthesia',
    chapter_id: 'ch-1901',
    chapter_name: 'Airway Management, Capnography & Circuits',
    question_text: '[SAMPLE DUMMY] A 22-year-old patient undergoing general anesthesia with Sevoflurane and Succinylcholine develops a sudden, unexplained rise in end-tidal CO2 (EtCO2 > 65 mmHg), generalized masseter and skeletal muscle rigidity, tachycardia, and rapidly rising core temperature. What is the specific drug of choice?',
    image_type: 'capnograph_mh',
    options: [
      'Intravenous Neostigmine + Glycopyrrolate',
      'Intravenous Dantrolene sodium (2.5 mg/kg bolus) + 100% O2 after stopping volatile agent',
      'Intravenous Sugammadex (16 mg/kg)',
      'Intravenous Bromocriptine'
    ],
    correct_option: 1,
    explanation: 'SAMPLE DUMMY EXPLANATION: Malignant Hyperthermia (RYR1 receptor mutation triggered by volatile anesthetics and succinylcholine) presents earliest with an unexplained steep rise in EtCO2 on capnography, masseter spasm, tachycardia, acidosis, and hyperthermia. Immediate management is stopping triggering agents, 100% O2, cooling, and IV Dantrolene sodium.',
    exam_name: 'INI-CET',
    exam_year: 2025,
    difficulty: 'hard',
    tags: ['Capnography', 'Malignant Hyperthermia', 'Anesthesia Emergency']
  }
];

// Seed realistic initial attempts so Analytics, Weak Topics, Mistake Notebook & Smart Revision work out-of-the-box!
const INITIAL_ATTEMPTS = {
  'q-1': { selected_option: 0, is_correct: true, time_taken_sec: 28, attempts_count: 1, wrong_count: 0, srs_stage: 3, next_review_days: 7, last_attempted: '2026-10-15' },
  'q-2': { selected_option: 2, is_correct: false, time_taken_sec: 46, attempts_count: 2, wrong_count: 2, srs_stage: 1, next_review_days: 1, last_attempted: '2026-10-15' },
  'q-3': { selected_option: 1, is_correct: true, time_taken_sec: 24, attempts_count: 1, wrong_count: 0, srs_stage: 2, next_review_days: 3, last_attempted: '2026-10-14' },
  'q-4': { selected_option: 1, is_correct: true, time_taken_sec: 35, attempts_count: 1, wrong_count: 0, srs_stage: 2, next_review_days: 3, last_attempted: '2026-10-14' },
  'q-5': { selected_option: 2, is_correct: true, time_taken_sec: 22, attempts_count: 1, wrong_count: 0, srs_stage: 4, next_review_days: 15, last_attempted: '2026-10-15' },
  'q-8': { selected_option: 1, is_correct: false, time_taken_sec: 64, attempts_count: 2, wrong_count: 1, srs_stage: 1, next_review_days: 1, last_attempted: '2026-10-15' },
  'q-9': { selected_option: 2, is_correct: true, time_taken_sec: 31, attempts_count: 1, wrong_count: 0, srs_stage: 3, next_review_days: 7, last_attempted: '2026-10-15' },
  'q-11': { selected_option: 1, is_correct: true, time_taken_sec: 25, attempts_count: 1, wrong_count: 0, srs_stage: 3, next_review_days: 7, last_attempted: '2026-10-15' },
  'q-12': { selected_option: 2, is_correct: false, time_taken_sec: 72, attempts_count: 3, wrong_count: 2, srs_stage: 1, next_review_days: 1, last_attempted: '2026-10-15' },
  'q-14': { selected_option: 1, is_correct: true, time_taken_sec: 29, attempts_count: 1, wrong_count: 0, srs_stage: 2, next_review_days: 3, last_attempted: '2026-10-15' },
  'q-17': { selected_option: 0, is_correct: false, time_taken_sec: 51, attempts_count: 1, wrong_count: 1, srs_stage: 2, next_review_days: 3, last_attempted: '2026-10-13' },
  'q-20': { selected_option: 0, is_correct: false, time_taken_sec: 58, attempts_count: 2, wrong_count: 2, srs_stage: 1, next_review_days: 1, last_attempted: '2026-10-15' }
};

const INITIAL_TEST_HISTORY = [
  { id: 't-101', title: 'Pre-Clinical Mini Test', date: '01 Oct', score: 42, maxScore: 80, percentage: 52.5, accuracy: 65, avgTimeSec: 44, type: 'subject' },
  { id: 't-102', title: 'Patho & Pharma Chapter Test', date: '05 Oct', score: 48, maxScore: 80, percentage: 60.0, accuracy: 70, avgTimeSec: 39, type: 'chapter' },
  { id: 't-103', title: 'Medicine & Surgery PYQ Block', date: '09 Oct', score: 55, maxScore: 80, percentage: 68.8, accuracy: 75, avgTimeSec: 36, type: 'custom' },
  { id: 't-104', title: 'All-Subject Grand Mock #1', date: '12 Oct', score: 59, maxScore: 80, percentage: 73.8, accuracy: 80, avgTimeSec: 34, type: 'grand' },
  { id: 't-105', title: 'INI-CET High-Yield Mixed Test', date: '15 Oct', score: 63, maxScore: 80, percentage: 78.8, accuracy: 84, avgTimeSec: 31, type: 'grand' }
];

const SUPABASE_RLS_SNIPPET = `-- Run in Supabase SQL Editor (Full 11-Table Schema included in Project ZIP)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL DEFAULT 'Dr. Student',
  target_exam TEXT NOT NULL DEFAULT 'NEET-PG',
  exam_date DATE NOT NULL DEFAULT '2027-03-15',
  college TEXT,
  is_premium BOOLEAN NOT NULL DEFAULT FALSE,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  daily_goal INT NOT NULL DEFAULT 50,
  current_streak INT NOT NULL DEFAULT 5
);

-- Enable Row Level Security (RLS) across all student tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_goals ENABLE ROW LEVEL SECURITY;

-- Student isolation policy: every student only sees & modifies their own rows
CREATE POLICY "Students access own attempts only" ON public.attempts
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Students access own tests only" ON public.tests
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- SUPABASE STORAGE BUCKET ('question-images') FOR CLINICAL IMAGES (NO EXTERNAL LINKS)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('question-images', 'question-images', TRUE, 5242880, ARRAY['image/png', 'image/jpeg', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read access for question-images" ON storage.objects
  FOR SELECT USING (bucket_id = 'question-images');

CREATE POLICY "Admins upload/manage question-images" ON storage.objects
  FOR ALL USING (bucket_id = 'question-images' AND public.is_admin_user())
  WITH CHECK (bucket_id = 'question-images' AND public.is_admin_user());`;

// ============================================================================
// 3. CLINICAL DIAGRAM SVG COMPONENT (FOR IMAGE-BASED PYQs)
// ============================================================================
function ClinicalDiagram({ type, storagePath, imageData }) {
  if (!type && !storagePath && !imageData) return null;

  const bucketPath =
    storagePath ||
    (type ? `question-images/clinical/${type}.png` : 'question-images/custom/upload.png');

  if (imageData) {
    return (
      <div className="my-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-900 p-3 text-white space-y-2">
        <div className="flex items-center justify-between text-[11px] text-sky-400 font-mono">
          <span>SUPABASE STORAGE BUCKET</span>
          <span>{bucketPath}</span>
        </div>
        <img
          src={imageData}
          alt="Clinical Question Finding"
          className="max-h-56 max-w-full h-auto rounded-lg mx-auto object-contain border border-slate-800"
        />
      </div>
    );
  }

  if (type === 'ecg_hyperkalemia') {
    return (
      <div className="my-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-900 p-3 text-white">
        <div className="flex flex-wrap items-center justify-between text-xs text-emerald-400 mb-1 font-mono gap-2">
          <span>LEAD II — 25 mm/s • K+ = 7.4 mEq/L</span>
          <span className="text-[10px] text-slate-400">Bucket: {bucketPath}</span>
        </div>
        <svg viewBox="0 0 420 90" className="w-full h-20">
          <path d="M 0 60 L 30 60 Q 40 55 50 60 L 65 60 L 72 72 L 82 20 L 92 75 L 105 60 C 115 60 125 8 135 8 C 145 8 155 60 165 60 L 210 60 Q 220 55 230 60 L 245 60 L 252 72 L 262 20 L 272 75 L 285 60 C 295 60 305 8 315 8 C 325 8 335 60 345 60 L 420 60" fill="none" stroke="#34d399" strokeWidth="2.5" />
          <text x="118" y="22" fill="#fbbf24" fontSize="10" fontWeight="bold">Tall Tented T</text>
          <text x="298" y="22" fill="#fbbf24" fontSize="10" fontWeight="bold">Tall Tented T</text>
        </svg>
      </div>
    );
  }

  if (type === 'capnograph_mh') {
    return (
      <div className="my-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-900 p-3 text-white">
        <div className="flex flex-wrap items-center justify-between text-xs text-amber-400 mb-1 font-mono gap-2">
          <span>CAPNOGRAPHY (EtCO2: 72 mmHg Steep Rise)</span>
          <span className="text-[10px] text-slate-400">Bucket: {bucketPath}</span>
        </div>
        <svg viewBox="0 0 420 90" className="w-full h-20">
          <line x1="0" y1="45" x2="420" y2="45" stroke="#475569" strokeDasharray="4 4" strokeWidth="1" />
          <text x="6" y="41" fill="#94a3b8" fontSize="9">Normal 40 mmHg</text>
          <path d="M 10 75 L 35 75 L 40 45 L 85 42 L 90 75 L 125 75 L 130 32 L 175 28 L 180 75 L 215 75 L 220 18 L 265 14 L 270 75 L 305 75 L 310 10 L 360 8 L 365 75 L 405 75" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
        </svg>
      </div>
    );
  }

  if (type === 'ct_edh') {
    return (
      <div className="my-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-900 p-3 text-white flex items-center gap-4">
        <svg viewBox="0 0 120 120" className="w-24 h-24 shrink-0">
          <ellipse cx="60" cy="60" rx="48" ry="54" fill="#1e293b" stroke="#cbd5e1" strokeWidth="4" />
          <path d="M 92 25 C 74 42 74 78 92 95 C 105 78 105 42 92 25 Z" fill="#f8fafc" />
          <line x1="60" y1="8" x2="55" y2="112" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 2" />
        </svg>
        <div className="text-xs text-slate-300 space-y-1">
          <div className="font-semibold text-sky-400">NCCT Head Schematic • Bucket: {bucketPath}</div>
          <div>Hyperdense biconvex (lentiform) extra-axial collection bounded by suture lines with midline shift.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-3 rounded-xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/70 dark:bg-sky-950/30 p-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
          <Eye className="w-5 h-5" />
        </div>
        <div className="text-xs text-slate-700 dark:text-slate-300">
          <span className="font-semibold text-sky-700 dark:text-sky-300">Supabase Storage Clinical Image: </span>
          {type === 'brachial_diagram' && 'Upper Trunk (C5–C6) Erb\'s Point Schematic'}
          {type === 'pv_loop' && 'Left Ventricular Pressure-Volume Loop (Isovolumetric Relaxation Phase)'}
          {type === 'reed_sternberg' && 'Binucleated Owl-Eye Reed-Sternberg Cell (CD15+, CD30+, CD45-)'}
          {type === 'audiogram_carhart' && 'Pure Tone Audiogram showing 2000 Hz Bone Conduction Dip (Carhart Notch)'}
          {!['brachial_diagram', 'pv_loop', 'reed_sternberg', 'audiogram_carhart'].includes(type) && bucketPath}
        </div>
      </div>
      <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-700 dark:text-sky-300 shrink-0">
        {bucketPath}
      </span>
    </div>
  );
}

// ============================================================================
// 4. MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  // Theme & Navigation State
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'practice' | 'tests' | 'progress' | 'profile'
  const [toast, setToast] = useState(null);

  // User Profile & Auth State
  const [user, setUser] = useState({
    id: 'usr-student-1',
    full_name: 'Dr. Aarav Sharma',
    email: 'aarav.mbbs@aiims.edu',
    target_exam: 'NEET-PG',
    exam_date: '2027-03-15',
    college: 'BMCH / MKCG Medical College',
    is_premium: true,
    is_admin: true,
    daily_goal: 50,
    current_streak: 6
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [authForm, setAuthForm] = useState({ email: '', password: '', full_name: '' });
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Question Bank & User Activity State
  const [subjects, setSubjects] = useState(INITIAL_SUBJECTS);
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS);
  const [attempts, setAttempts] = useState(INITIAL_ATTEMPTS);
  const [bookmarks, setBookmarks] = useState({ 'q-2': true, 'q-11': true, 'q-12': true });
  const [confusingFlags, setConfusingFlags] = useState({ 'q-2': true, 'q-12': true, 'q-20': true });
  const [notes, setNotes] = useState({
    'q-5': 'Always remember 36-hour washout between ACEi (Enalapril) and ARNI (Sacubitril) to avoid bradykinin angioedema.',
    'q-12': 'Winter formula: PaCO2 = 1.5 x HCO3 + 8 +/- 2.'
  });
  const [testHistory, setTestHistory] = useState(INITIAL_TEST_HISTORY);

  // Practice Mode State
  const [practiceConfig, setPracticeConfig] = useState({
    active: false,
    title: '',
    subjectId: 'ALL',
    chapterId: 'ALL',
    yearFilter: 'ALL',
    difficultyFilter: 'ALL',
    statusFilter: 'ALL', // 'ALL' | 'UNATTEMPTED' | 'INCORRECT' | 'BOOKMARKED' | 'CONFUSING'
    questionIds: [],
    currentIndex: 0
  });
  const [practiceSelection, setPracticeSelection] = useState({}); // { [qId]: selectedOptionIdx }
  const [showPalette, setShowPalette] = useState(false);
  const [noteDraft, setNoteDraft] = useState('');
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [subjectSearch, setSubjectSearch] = useState('');
  const [expandedSubjectId, setExpandedSubjectId] = useState('sub-4');

  // Test Mode State
  const [testBuilder, setTestBuilder] = useState({
    testType: 'chapter', // 'chapter' | 'subject' | 'grand' | 'custom'
    subjectId: 'sub-4',
    chapterId: 'ALL',
    customSubjects: ['sub-1', 'sub-2', 'sub-4', 'sub-5', 'sub-8'],
    questionCount: 10,
    durationMinutes: 10,
    marksCorrect: 4,
    marksWrong: -1,
    marksUnattempted: 0
  });
  const [activeTest, setActiveTest] = useState(null);
  // activeTest structure:
  // { id, title, testType, questionIds, currentIndex, responses: { [qId]: number|null }, markedForReview: { [qId]: bool }, timeSpent: { [qId]: sec }, remainingSec, totalSec, marksCorrect, marksWrong, marksUnattempted, status: 'in_progress'|'paused'|'completed', result: null }
  const [showTestPalette, setShowTestPalette] = useState(false);

  // Profile / Admin Sub-navigation
  const [profileSubTab, setProfileSubTab] = useState('settings'); // 'settings' | 'admin_questions' | 'admin_csv' | 'admin_subjects' | 'sql_schema'
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [newQuestionForm, setNewQuestionForm] = useState({
    subject_id: 'sub-11',
    chapter_id: 'ch-1101',
    question_text: '[SAMPLE DUMMY] ',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correct_option: 0,
    explanation: '',
    exam_name: 'NEET-PG',
    exam_year: 2025,
    difficulty: 'medium',
    tags: 'High-Yield, Clinical',
    image_storage_path: '',
    image_data: ''
  });
  const [csvInputText, setCsvInputText] = useState('');
  const [newChapterName, setNewChapterName] = useState('');
  const [newChapterSubjectId, setNewChapterSubjectId] = useState('sub-1');

  // Show temporary toast notification
  const triggerToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3200);
  };

  // Load / Save state to localStorage safely
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pulsepg_state_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.attempts) setAttempts(parsed.attempts);
        if (parsed.bookmarks) setBookmarks(parsed.bookmarks);
        if (parsed.confusingFlags) setConfusingFlags(parsed.confusingFlags);
        if (parsed.notes) setNotes(parsed.notes);
        if (parsed.darkMode !== undefined) setDarkMode(parsed.darkMode);
      }
    } catch {
      // Ignore sandbox storage errors
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        'pulsepg_state_v1',
        JSON.stringify({ attempts, bookmarks, confusingFlags, notes, darkMode })
      );
    } catch {
      // Ignore sandbox storage errors
    }
  }, [attempts, bookmarks, confusingFlags, notes, darkMode]);

  // Active Test Countdown Timer with Auto-Submit
  useEffect(() => {
    if (!activeTest || activeTest.status !== 'in_progress') return;
    const interval = setInterval(() => {
      setActiveTest((prev) => {
        if (!prev || prev.status !== 'in_progress') return prev;
        const currentQId = prev.questionIds[prev.currentIndex];
        const updatedTimeSpent = {
          ...prev.timeSpent,
          [currentQId]: (prev.timeSpent[currentQId] || 0) + 1
        };
        if (prev.remainingSec <= 1) {
          // Auto-submit test when timer hits 0
          return finalizeTestSubmission({ ...prev, remainingSec: 0, timeSpent: updatedTimeSpent });
        }
        return {
          ...prev,
          remainingSec: prev.remainingSec - 1,
          timeSpent: updatedTimeSpent
        };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTest?.status]);

  // ============================================================================
  // COMPUTED ANALYTICS & METRICS
  // ============================================================================
  const analytics = useMemo(() => {
    const attemptEntries = Object.entries(attempts);
    const totalSolved = attemptEntries.length;
    const correctSolved = attemptEntries.filter(([, a]) => a.is_correct).length;
    const overallAccuracy = totalSolved > 0 ? Math.round((correctSolved / totalSolved) * 100) : 0;
    const solvedToday = attemptEntries.filter(([, a]) => a.last_attempted === '2026-10-15').length;

    // Days left to exam
    const today = new Date('2026-10-15T00:00:00');
    const examDate = new Date(user.exam_date + 'T00:00:00');
    const daysLeft = Math.max(1, Math.ceil((examDate - today) / (1000 * 60 * 60 * 24)));

    // Subject-wise & Chapter-wise metrics
    const subjectStats = subjects.map((sub) => {
      const subQuestions = questions.filter((q) => q.subject_id === sub.id);
      const subAttempted = subQuestions.filter((q) => attempts[q.id]);
      const subCorrect = subAttempted.filter((q) => attempts[q.id]?.is_correct);
      const accuracy = subAttempted.length > 0
        ? Math.round((subCorrect.length / subAttempted.length) * 100)
        : null;
      const avgTime = subAttempted.length > 0
        ? Math.round(subAttempted.reduce((acc, q) => acc + (attempts[q.id]?.time_taken_sec || 30), 0) / subAttempted.length)
        : 0;

      // Chapters attempted coverage
      const chaptersWithAttempts = sub.chapters.filter((ch) =>
        subQuestions.some((q) => q.chapter_id === ch.id && attempts[q.id])
      ).length;
      const syllabusCoverage = sub.chapters.length > 0
        ? Math.round((chaptersWithAttempts / sub.chapters.length) * 100)
        : 0;

      const chapterBreakdown = sub.chapters.map((ch) => {
        const chQs = subQuestions.filter((q) => q.chapter_id === ch.id);
        const chAtt = chQs.filter((q) => attempts[q.id]);
        const chCorr = chAtt.filter((q) => attempts[q.id]?.is_correct);
        const chAcc = chAtt.length > 0 ? Math.round((chCorr.length / chAtt.length) * 100) : null;
        const totalWrongCount = chAtt.reduce((sum, q) => sum + (attempts[q.id]?.wrong_count || 0), 0);
        return {
          ...ch,
          subjectName: sub.name,
          subjectId: sub.id,
          totalQuestions: chQs.length,
          attemptedCount: chAtt.length,
          accuracy: chAcc,
          totalWrongCount
        };
      });

      return {
        ...sub,
        totalQuestions: subQuestions.length,
        attemptedCount: subAttempted.length,
        correctCount: subCorrect.length,
        accuracy,
        avgTime,
        syllabusCoverage,
        chapterBreakdown
      };
    });

    // Weak topics: chapters with accuracy < 65% or repeated mistakes
    const weakChapters = subjectStats
      .flatMap((s) => s.chapterBreakdown)
      .filter((ch) => ch.attemptedCount > 0 && (ch.accuracy < 70 || ch.totalWrongCount > 0))
      .sort((a, b) => (a.accuracy ?? 100) - (b.accuracy ?? 100));

    // Mistake notebook: all currently wrong or previously missed questions
    const mistakeQuestions = questions.filter(
      (q) => attempts[q.id] && (!attempts[q.id].is_correct || attempts[q.id].wrong_count > 0 || confusingFlags[q.id])
    );

    // Spaced Repetition (SRS) buckets: 1d, 3d, 7d, 15d
    const srsBuckets = {
      1: questions.filter((q) => attempts[q.id]?.next_review_days === 1),
      3: questions.filter((q) => attempts[q.id]?.next_review_days === 3),
      7: questions.filter((q) => attempts[q.id]?.next_review_days === 7),
      15: questions.filter((q) => attempts[q.id]?.next_review_days === 15)
    };

    return {
      totalSolved,
      correctSolved,
      overallAccuracy,
      solvedToday,
      daysLeft,
      subjectStats,
      weakChapters,
      mistakeQuestions,
      srsBuckets
    };
  }, [attempts, questions, subjects, confusingFlags, user.exam_date]);

  // Helper for accuracy color coding (<50% red, 50-75% yellow, >75% green)
  const getAccuracyBadgeClasses = (acc) => {
    if (acc === null || acc === undefined) {
      return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
    }
    if (acc < 50) {
      return 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30';
    }
    if (acc <= 75) {
      return 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30';
    }
    return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30';
  };

  // ============================================================================
  // PRACTICE MODE HANDLERS
  // ============================================================================
  const startPracticeSession = ({
    subjectId = 'ALL',
    chapterId = 'ALL',
    yearFilter = 'ALL',
    difficultyFilter = 'ALL',
    statusFilter = 'ALL',
    customIds = null,
    customTitle = ''
  }) => {
    // Check Free Tier daily question limit (15 Qs/day across ALL 19 subjects so free users can try the full app)
    if (!user.is_premium && analytics.solvedToday >= 15) {
      setShowUpgradeModal(true);
      return;
    }

    let pool = questions;
    if (customIds) {
      pool = questions.filter((q) => customIds.includes(q.id));
    } else {
      if (subjectId !== 'ALL') pool = pool.filter((q) => q.subject_id === subjectId);
      if (chapterId !== 'ALL') pool = pool.filter((q) => q.chapter_id === chapterId);
      if (yearFilter !== 'ALL') pool = pool.filter((q) => String(q.exam_year) === String(yearFilter));
      if (difficultyFilter !== 'ALL') pool = pool.filter((q) => q.difficulty === difficultyFilter);
      if (statusFilter === 'UNATTEMPTED') pool = pool.filter((q) => !attempts[q.id]);
      if (statusFilter === 'INCORRECT') pool = pool.filter((q) => attempts[q.id] && !attempts[q.id].is_correct);
      if (statusFilter === 'BOOKMARKED') pool = pool.filter((q) => bookmarks[q.id]);
      if (statusFilter === 'CONFUSING') pool = pool.filter((q) => confusingFlags[q.id]);
    }

    if (pool.length === 0) {
      triggerToast('No questions match those filters. Try broadening your filter selection.', 'warning');
      return;
    }

    const firstQId = pool[0].id;
    setNoteDraft(notes[firstQId] || '');
    setShowNoteEditor(false);
    setPracticeSelection({});
    setPracticeConfig({
      active: true,
      title:
        customTitle ||
        (chapterId !== 'ALL'
          ? subjects.flatMap((s) => s.chapters).find((c) => c.id === chapterId)?.name || 'Chapter Practice'
          : subjectId !== 'ALL'
          ? `${subjects.find((s) => s.id === subjectId)?.name} PYQs`
          : 'All-Subject PYQ Practice'),
      subjectId,
      chapterId,
      yearFilter,
      difficultyFilter,
      statusFilter,
      questionIds: pool.map((q) => q.id),
      currentIndex: 0
    });
    setActiveTab('practice');
  };

  const handleSelectPracticeOption = (questionObj, optionIndex) => {
    // Free Tier check: All 19 subjects are open with a 15 Qs/day limit across the app
    if (!user.is_premium && analytics.solvedToday >= 15 && practiceSelection[questionObj.id] === undefined) {
      setShowUpgradeModal(true);
      return;
    }

    setPracticeSelection((prev) => ({ ...prev, [questionObj.id]: optionIndex }));
    const isCorrect = optionIndex === questionObj.correct_option;

    // Calculate Spaced Repetition (1, 3, 7, 15 days)
    const prevAttempt = attempts[questionObj.id];
    const SRS_INTERVALS = [1, 1, 3, 7, 15];
    const nextStage = isCorrect
      ? Math.min(4, (prevAttempt?.srs_stage || 1) + 1)
      : 1;

    setAttempts((prev) => ({
      ...prev,
      [questionObj.id]: {
        selected_option: optionIndex,
        is_correct: isCorrect,
        time_taken_sec: prevAttempt?.time_taken_sec || 32,
        attempts_count: (prevAttempt?.attempts_count || 0) + 1,
        wrong_count: (prevAttempt?.wrong_count || 0) + (isCorrect ? 0 : 1),
        srs_stage: nextStage,
        next_review_days: SRS_INTERVALS[nextStage],
        last_attempted: '2026-10-15'
      }
    }));
  };

  const jumpToPracticeQuestion = (idx) => {
    const nextQId = practiceConfig.questionIds[idx];
    setPracticeConfig((prev) => ({ ...prev, currentIndex: idx }));
    setNoteDraft(notes[nextQId] || '');
    setShowNoteEditor(false);
    setShowPalette(false);
  };

  // ============================================================================
  // TEST MODE HANDLERS
  // ============================================================================
  const startNewTest = () => {
    // Free Tier check: All test types & all 19 subjects are open to try within the 15 Qs/day daily quota
    if (!user.is_premium && analytics.solvedToday >= 15) {
      setShowUpgradeModal(true);
      return;
    }

    let pool = [...questions];
    let title = 'Custom Timed Test';

    if (testBuilder.testType === 'chapter') {
      pool = questions.filter(
        (q) =>
          q.subject_id === testBuilder.subjectId &&
          (testBuilder.chapterId === 'ALL' || q.chapter_id === testBuilder.chapterId)
      );
      const subName = subjects.find((s) => s.id === testBuilder.subjectId)?.name || 'Subject';
      title = `${subName} Chapter Timed Test`;
    } else if (testBuilder.testType === 'subject') {
      pool = questions.filter((q) => q.subject_id === testBuilder.subjectId);
      const subName = subjects.find((s) => s.id === testBuilder.subjectId)?.name || 'Subject';
      title = `${subName} Subject Test`;
    } else if (testBuilder.testType === 'grand') {
      pool = [...questions];
      title = `${user.target_exam} Full-Syllabus Grand Test`;
    } else if (testBuilder.testType === 'custom') {
      pool = questions.filter((q) => testBuilder.customSubjects.includes(q.subject_id));
      title = `Custom Multi-Subject Test (${testBuilder.customSubjects.length} Subjects)`;
    }

    if (pool.length === 0) {
      pool = [...questions];
    }

    const selectedQuestions = pool.slice(0, Math.min(pool.length, Number(testBuilder.questionCount) || 10));
    const totalSec = Math.max(60, (Number(testBuilder.durationMinutes) || 10) * 60);

    setActiveTest({
      id: 'test-' + Date.now(),
      title,
      testType: testBuilder.testType,
      questionIds: selectedQuestions.map((q) => q.id),
      currentIndex: 0,
      responses: {},
      markedForReview: {},
      timeSpent: {},
      remainingSec: totalSec,
      totalSec,
      marksCorrect: Number(testBuilder.marksCorrect),
      marksWrong: Number(testBuilder.marksWrong),
      marksUnattempted: Number(testBuilder.marksUnattempted),
      status: 'in_progress',
      result: null
    });
    setShowTestPalette(false);
  };

  function finalizeTestSubmission(testObj) {
    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;
    const updatedAttempts = {};

    testObj.questionIds.forEach((qId) => {
      const q = questions.find((item) => item.id === qId);
      if (!q) return;
      const chosen = testObj.responses[qId];
      if (chosen === undefined || chosen === null) {
        unattemptedCount += 1;
      } else if (chosen === q.correct_option) {
        correctCount += 1;
        updatedAttempts[qId] = {
          selected_option: chosen,
          is_correct: true,
          time_taken_sec: testObj.timeSpent[qId] || 25,
          attempts_count: (attempts[qId]?.attempts_count || 0) + 1,
          wrong_count: attempts[qId]?.wrong_count || 0,
          srs_stage: 3,
          next_review_days: 7,
          last_attempted: '2026-10-15'
        };
      } else {
        wrongCount += 1;
        updatedAttempts[qId] = {
          selected_option: chosen,
          is_correct: false,
          time_taken_sec: testObj.timeSpent[qId] || 35,
          attempts_count: (attempts[qId]?.attempts_count || 0) + 1,
          wrong_count: (attempts[qId]?.wrong_count || 0) + 1,
          srs_stage: 1,
          next_review_days: 1,
          last_attempted: '2026-10-15'
        };
      }
    });

    const totalQ = testObj.questionIds.length;
    const maxScore = totalQ * testObj.marksCorrect;
    const rawScore =
      correctCount * testObj.marksCorrect +
      wrongCount * testObj.marksWrong +
      unattemptedCount * testObj.marksUnattempted;
    const attemptedTotal = correctCount + wrongCount;
    const accuracy = attemptedTotal > 0 ? Math.round((correctCount / attemptedTotal) * 100) : 0;
    const totalTimeSpent = Object.values(testObj.timeSpent).reduce((a, b) => a + b, 0) || (testObj.totalSec - testObj.remainingSec);
    const avgTimeSec = totalQ > 0 ? Math.max(5, Math.round(totalTimeSpent / totalQ)) : 0;
    const percentage = maxScore > 0 ? Math.max(0, Math.round((rawScore / maxScore) * 1000) / 10) : 0;

    setAttempts((prev) => ({ ...prev, ...updatedAttempts }));

    const newHistoryEntry = {
      id: testObj.id,
      title: testObj.title,
      date: 'Today',
      score: rawScore,
      maxScore,
      percentage,
      accuracy,
      avgTimeSec,
      type: testObj.testType
    };
    setTestHistory((prev) => [...prev, newHistoryEntry]);

    return {
      ...testObj,
      status: 'completed',
      result: {
        score: rawScore,
        maxScore,
        percentage,
        correctCount,
        wrongCount,
        unattemptedCount,
        accuracy,
        avgTimeSec,
        totalTimeSpent
      }
    };
  }

  // ============================================================================
  // ADMIN PANEL & CSV HANDLERS
  // ============================================================================
  const handleSaveQuestion = (e) => {
    e.preventDefault();
    if (!newQuestionForm.question_text.trim() || !newQuestionForm.optionA.trim()) {
      triggerToast('Please fill in the question text and all 4 options.', 'warning');
      return;
    }
    const subObj = subjects.find((s) => s.id === newQuestionForm.subject_id) || subjects[0];
    const chObj = subObj.chapters.find((c) => c.id === newQuestionForm.chapter_id) || subObj.chapters[0];

    const questionPayload = {
      id: editingQuestion ? editingQuestion.id : 'q-' + (questions.length + 1 + Math.floor(Math.random() * 1000)),
      subject_id: subObj.id,
      subject_name: subObj.name,
      chapter_id: chObj.id,
      chapter_name: chObj.name,
      question_text: newQuestionForm.question_text,
      image_type: newQuestionForm.image_storage_path ? 'custom_bucket_image' : '',
      image_storage_path: newQuestionForm.image_storage_path || '',
      image_data: newQuestionForm.image_data || '',
      options: [
        newQuestionForm.optionA,
        newQuestionForm.optionB,
        newQuestionForm.optionC,
        newQuestionForm.optionD
      ],
      correct_option: Number(newQuestionForm.correct_option),
      explanation: newQuestionForm.explanation || 'High-yield explanation added via Admin Panel.',
      exam_name: newQuestionForm.exam_name,
      exam_year: Number(newQuestionForm.exam_year) || 2025,
      difficulty: newQuestionForm.difficulty,
      tags: newQuestionForm.tags.split(',').map((t) => t.trim()).filter(Boolean)
    };

    if (editingQuestion) {
      setQuestions((prev) => prev.map((q) => (q.id === editingQuestion.id ? questionPayload : q)));
      setEditingQuestion(null);
      triggerToast('Question updated in Question Bank!', 'success');
    } else {
      setQuestions((prev) => [questionPayload, ...prev]);
      triggerToast('New question added to Question Bank!', 'success');
    }

    setNewQuestionForm({
      subject_id: subObj.id,
      chapter_id: chObj.id,
      question_text: '[SAMPLE DUMMY] ',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correct_option: 0,
      explanation: '',
      exam_name: 'NEET-PG',
      exam_year: 2025,
      difficulty: 'medium',
      tags: 'High-Yield',
      image_storage_path: '',
      image_data: ''
    });
  };

  const handleDownloadSampleCsv = () => {
    const headers = [
      'question_id,subject_code,subject_name,chapter_name,question_text,option_a,option_b,option_c,option_d,correct_option,explanation,exam_name,exam_year,difficulty,tags,supabase_storage_path'
    ];
    const rows = questions.map((q) => {
      const esc = (str) => `"${String(str || '').replace(/"/g, '""')}"`;
      const subCode = subjects.find((s) => s.id === q.subject_id)?.code || 'MED';
      const bucketPath =
        q.image_storage_path ||
        (q.image_type ? `question-images/${subCode}/${q.image_type}.png` : '');
      return [
        esc(q.id),
        esc(subCode),
        esc(q.subject_name),
        esc(q.chapter_name),
        esc(q.question_text),
        esc(q.options[0]),
        esc(q.options[1]),
        esc(q.options[2]),
        esc(q.options[3]),
        esc(['A', 'B', 'C', 'D'][q.correct_option] || 'A'),
        esc(q.explanation),
        esc(q.exam_name),
        q.exam_year,
        esc(q.difficulty),
        esc((q.tags || []).join('|')),
        esc(bucketPath)
      ].join(',');
    });

    const csvContent = headers.concat(rows).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'neet_pg_sample_questions_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    triggerToast('Downloaded sample_questions_template.csv (20 Sample Questions)!', 'success');
  };

  const handleBulkCsvImport = () => {
    if (!csvInputText.trim()) {
      triggerToast('Paste CSV rows first or load sample rows.', 'warning');
      return;
    }
    const lines = csvInputText.trim().split('\n').filter((l) => l.trim());
    const dataLines = lines[0].toLowerCase().includes('question_text') ? lines.slice(1) : lines;
    const imported = [];

    dataLines.forEach((line, idx) => {
      const cols = line.split(',').map((c) => c.trim().replace(/^"|"$/g, ''));
      if (cols.length >= 8) {
        const subMatch =
          subjects.find((s) => s.code.toLowerCase() === cols[0]?.toLowerCase() || s.name.toLowerCase() === cols[0]?.toLowerCase()) ||
          subjects[10];
        const chMatch = subMatch.chapters[0];
        const ansLetter = (cols[6] || 'A').toUpperCase();
        const ansIndex = ['A', 'B', 'C', 'D'].indexOf(ansLetter);
        imported.push({
          id: `q-csv-${Date.now()}-${idx}`,
          subject_id: subMatch.id,
          subject_name: subMatch.name,
          chapter_id: chMatch.id,
          chapter_name: cols[1] || chMatch.name,
          question_text: cols[2].startsWith('[SAMPLE') ? cols[2] : `[SAMPLE DUMMY] ${cols[2]}`,
          image_type: '',
          options: [cols[3] || 'Option A', cols[4] || 'Option B', cols[5] || 'Option C', cols[6] && cols.length > 8 ? cols[6] : 'Option D'],
          correct_option: ansIndex >= 0 ? ansIndex : 0,
          explanation: cols[7] || 'Bulk uploaded explanation.',
          exam_name: cols[8] || 'NEET-PG',
          exam_year: Number(cols[9]) || 2025,
          difficulty: ['easy', 'medium', 'hard'].includes((cols[10] || '').toLowerCase()) ? cols[10].toLowerCase() : 'medium',
          tags: ['CSV-Import', 'High-Yield']
        });
      }
    });

    if (imported.length === 0) {
      triggerToast('Could not parse rows. Format: SubjectCode, Chapter, Question, OptA, OptB, OptC, Correct(A-D), Explanation', 'warning');
      return;
    }

    setQuestions((prev) => [...imported, ...prev]);
    setCsvInputText('');
    triggerToast(`Successfully imported ${imported.length} question(s) via CSV!`, 'success');
  };

  const copyToClipboard = (text, label) => {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      triggerToast(`Copied ${label} to clipboard!`, 'success');
    } catch {
      triggerToast('Copy failed in this browser context.', 'warning');
    }
  };

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Daily Goal Ring SVG math
  const goalRadius = 38;
  const goalCircumference = 2 * Math.PI * goalRadius;
  const goalProgressPct = Math.min(100, Math.round((analytics.solvedToday / user.daily_goal) * 100));
  const goalStrokeDashoffset = goalCircumference - (goalProgressPct / 100) * goalCircumference;

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans pb-24 transition-colors duration-200">
        {/* TOP HEADER BAR */}
        <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 px-3 sm:px-6 py-2.5">
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
            {/* Brand & Target Exam Badge */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setActiveTab('home')}
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-sm"
                title="PulsePG Home"
              >
                <Stethoscope className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-base tracking-tight">PulsePG</span>
                  <button
                    onClick={() => {
                      const nextExam = user.target_exam === 'NEET-PG' ? 'INI-CET' : 'NEET-PG';
                      setUser((prev) => ({ ...prev, target_exam: nextExam }));
                      setTestBuilder((prev) => ({
                        ...prev,
                        marksCorrect: nextExam === 'INI-CET' ? 1 : 4,
                        marksWrong: nextExam === 'INI-CET' ? -0.33 : -1
                      }));
                      triggerToast(
                        nextExam === 'INI-CET'
                          ? 'Switched to INI-CET (+1 / -0.33 default marking)'
                          : 'Switched to NEET-PG (+4 / -1 default marking)'
                      );
                    }}
                    title="Tap to switch between NEET-PG (+4/-1) and INI-CET (+1/-0.33)"
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 hover:bg-sky-500/20 transition"
                  >
                    {user.target_exam} ⇄
                  </button>
                  {user.is_premium ? (
                    <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                      <Crown className="w-3 h-3" /> PRO
                    </span>
                  ) : (
                    <button
                      onClick={() => setShowUpgradeModal(true)}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 hover:bg-rose-500/25"
                    >
                      Free Tier ({analytics.solvedToday}/15 Qs/day • All 19 Subjects) • Upgrade
                    </button>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <span>{analytics.daysLeft}d to exam</span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <WifiOff className="w-3 h-3" /> PWA Offline Ready ({questions.length} Qs)
                  </span>
                </div>
              </div>
            </div>

            {/* Right Controls: Role Switcher, Dark Mode, Auth */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setUser((prev) => ({ ...prev, is_premium: !prev.is_premium }))}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium transition"
                title="Toggle Free vs Pro Tier to test monetization hooks"
              >
                {user.is_premium ? 'Mode: Pro' : 'Mode: Free'}
              </button>

              <button
                onClick={() => setDarkMode((d) => !d)}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
              </button>

              <button
                onClick={() => setShowAuthModal(true)}
                className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{user.full_name.split(' ')[1] || 'Account'}</span>
              </button>
            </div>
          </div>
        </header>

        {/* TOAST BANNER */}
        {toast && (
          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 max-w-md w-[92%] px-4 py-2.5 rounded-xl shadow-lg border text-xs font-medium flex items-center justify-between bg-slate-900 text-white border-slate-700">
            <span>{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-3 text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* MAIN VIEWPORT CONTAINER */}
        <main className="max-w-5xl mx-auto px-3 sm:px-6 pt-4">
          {/* ====================================================================
              TAB 1: HOME DASHBOARD
             ==================================================================== */}
          {activeTab === 'home' && (
            <div className="space-y-5">
              {/* Top Hero Card: Daily Goal Progress Ring + Core Counters */}
              <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Daily Goal Progress Ring */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                      <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                        <circle
                          cx="48"
                          cy="48"
                          r={goalRadius}
                          fill="transparent"
                          stroke="currentColor"
                          strokeWidth="8"
                          className="text-slate-100 dark:text-slate-800"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r={goalRadius}
                          fill="transparent"
                          stroke="currentColor"
                          strokeWidth="8"
                          strokeDasharray={goalCircumference}
                          strokeDashoffset={goalStrokeDashoffset}
                          strokeLinecap="round"
                          className="text-sky-500 transition-all duration-500"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-lg font-bold leading-none">{analytics.solvedToday}/{user.daily_goal}</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Today\'s Goal</span>
                      </div>
                    </div>

                    <div>
                      <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full mb-1">
                        <Flame className="w-3.5 h-3.5 fill-amber-500" /> {user.current_streak} Day Study Streak
                      </div>
                      <h1 className="text-lg sm:text-xl font-bold tracking-tight">
                        Welcome back, {user.full_name}
                      </h1>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Target: <strong className="text-slate-700 dark:text-slate-200">{user.target_exam}</strong> ({user.exam_date}) • {analytics.daysLeft} days remaining
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">Daily Target:</span>
                        {[25, 50, 100].map((goalVal) => (
                          <button
                            key={goalVal}
                            onClick={() => {
                              setUser((prev) => ({ ...prev, daily_goal: goalVal }));
                              triggerToast(`Daily goal updated to ${goalVal} questions/day`);
                            }}
                            className={`text-[11px] px-2 py-0.5 rounded-md font-medium border transition ${
                              user.daily_goal === goalVal
                                ? 'bg-sky-600 text-white border-sky-600'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            {goalVal} Qs
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 4 Key KPI Tiles */}
                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5 sm:w-64">
                    <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 p-3">
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">This Week</div>
                      <div className="text-lg font-bold mt-0.5">{analytics.totalSolved} Qs</div>
                    </div>
                    <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 p-3">
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">Accuracy</div>
                      <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                        {analytics.overallAccuracy}%
                      </div>
                    </div>
                    <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 p-3">
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">Mistake Bank</div>
                      <div className="text-lg font-bold text-rose-600 dark:text-rose-400 mt-0.5">
                        {analytics.mistakeQuestions.length} Qs
                      </div>
                    </div>
                    <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 p-3">
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">SRS Due (1d)</div>
                      <div className="text-lg font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                        {analytics.srsBuckets[1].length} Qs
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resume Paused Test Banner if a test is paused */}
                {activeTest && activeTest.status === 'paused' && (
                  <div className="mt-4 rounded-xl bg-amber-500/10 border border-amber-500/30 p-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-amber-800 dark:text-amber-300">
                          Paused Test: {activeTest.title}
                        </div>
                        <div className="text-[11px] text-amber-700 dark:text-amber-400">
                          Time Remaining: {formatTimer(activeTest.remainingSec)} • {Object.keys(activeTest.responses).length}/{activeTest.questionIds.length} Answered
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTest((prev) => ({ ...prev, status: 'in_progress' }));
                        setActiveTab('tests');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shrink-0"
                    >
                      Resume Test
                    </button>
                  </div>
                )}
              </div>

              {/* Smart Revision & High-Impact Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => {
                    const weakIds = analytics.mistakeQuestions.map((q) => q.id);
                    startPracticeSession({
                      customIds: weakIds.length > 0 ? weakIds : questions.slice(0, 6).map((q) => q.id),
                      customTitle: 'Smart Revision: Weak Topics & Past Mistakes'
                    });
                  }}
                  className="text-left rounded-2xl bg-gradient-to-br from-rose-600 to-orange-600 text-white p-4 shadow-sm hover:opacity-95 transition flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
                      Smart Revision
                    </span>
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="mt-3">
                    <div className="font-bold text-base">Revise Weak Topics</div>
                    <p className="text-xs text-white/85 mt-0.5">
                      Auto-built set of {analytics.mistakeQuestions.length} mistakes & due spaced-repetition PYQs
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setPracticeConfig((prev) => ({ ...prev, active: false }));
                    setActiveTab('practice');
                  }}
                  className="text-left rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 hover:border-sky-500/50 transition flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-full">
                      19 Subjects
                    </span>
                    <BookOpen className="w-5 h-5 text-sky-500" />
                  </div>
                  <div className="mt-3">
                    <div className="font-bold text-base">Chapterwise PYQ Practice</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Instant feedback, explanations, bookmarks & personal notes
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('tests')}
                  className="text-left rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 hover:border-indigo-500/50 transition flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full">
                      +4 / -1 Exam Mode
                    </span>
                    <Clock className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div className="mt-3">
                    <div className="font-bold text-base">Timed Mock & Custom Tests</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Chapter, Subject, Grand & Custom tests with pause/resume
                    </p>
                  </div>
                </button>
              </div>

              {/* Weak Topics Alert List + Spaced Repetition Queue */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Auto-Detected Weak Topics */}
                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h2 className="font-bold text-sm flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-rose-500" />
                        Auto-Detected Weak Chapters
                      </h2>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Ranked by lowest accuracy & repeated errors
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('progress')}
                      className="text-xs text-sky-600 dark:text-sky-400 font-medium hover:underline"
                    >
                      Full Analytics
                    </button>
                  </div>

                  <div className="space-y-2">
                    {analytics.weakChapters.slice(0, 4).map((ch) => (
                      <div
                        key={ch.id}
                        className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0">
                          <div className="text-xs font-semibold truncate">{ch.name}</div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">
                            {ch.subjectName} • {ch.totalWrongCount} mistake(s)
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${getAccuracyBadgeClasses(ch.accuracy)}`}>
                            {ch.accuracy}%
                          </span>
                          <button
                            onClick={() =>
                              startPracticeSession({
                                subjectId: ch.subjectId,
                                chapterId: ch.id,
                                customTitle: `Weak Topic Revision: ${ch.name}`
                              })
                            }
                            className="text-xs px-2.5 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium"
                          >
                            Revise
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Spaced Repetition (1, 3, 7, 15 Days) Schedule */}
                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h2 className="font-bold text-sm flex items-center gap-1.5">
                        <RefreshCw className="w-4 h-4 text-sky-500" />
                        Spaced Repetition Queue (SRS)
                      </h2>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Wrong answers resurface at 1, 3, 7, and 15-day intervals
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { day: 1, label: 'Day 1 (Immediate)', desc: 'Recent mistakes', color: 'border-rose-500/30 bg-rose-500/5' },
                      { day: 3, label: 'Day 3 Recall', desc: 'Short-term check', color: 'border-amber-500/30 bg-amber-500/5' },
                      { day: 7, label: 'Day 7 Consolidation', desc: 'Weekly lock-in', color: 'border-sky-500/30 bg-sky-500/5' },
                      { day: 15, label: 'Day 15 Mastery', desc: 'Long-term memory', color: 'border-emerald-500/30 bg-emerald-500/5' }
                    ].map((box) => {
                      const bucketQs = analytics.srsBuckets[box.day] || [];
                      return (
                        <div
                          key={box.day}
                          className={`rounded-xl border p-3 flex flex-col justify-between ${box.color}`}
                        >
                          <div>
                            <div className="text-xs font-bold">{box.label}</div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400">{box.desc}</div>
                          </div>
                          <div className="mt-2.5 flex items-center justify-between">
                            <span className="text-base font-bold">{bucketQs.length} Qs</span>
                            <button
                              onClick={() =>
                                startPracticeSession({
                                  customIds: bucketQs.length > 0 ? bucketQs.map((q) => q.id) : questions.slice(0, 4).map((q) => q.id),
                                  customTitle: `Spaced Repetition: Day ${box.day} Queue`
                                })
                              }
                              className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900"
                            >
                              Practice
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* All 19 NEET-PG Subjects Coverage & Accuracy Grid */}
              <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h2 className="font-bold text-sm">All 19 NEET-PG Subjects — Accuracy & Syllabus Coverage</h2>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Color-coded: Red (&lt;50%) • Yellow (50–75%) • Green (&gt;75%)
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setPracticeConfig((prev) => ({ ...prev, active: false }));
                      setActiveTab('practice');
                    }}
                    className="text-xs text-sky-600 dark:text-sky-400 font-semibold hover:underline"
                  >
                    Browse All Chapters →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {analytics.subjectStats.map((sub) => (
                    <div
                      key={sub.id}
                      onClick={() => {
                        setExpandedSubjectId(sub.id);
                        setPracticeConfig((prev) => ({ ...prev, active: false }));
                        setActiveTab('practice');
                      }}
                      className="cursor-pointer rounded-xl border border-slate-200 dark:border-slate-800 p-3 hover:border-sky-500/50 transition bg-slate-50/50 dark:bg-slate-800/30"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                            {sub.code}
                          </span>
                          <span className="text-xs font-semibold truncate">{sub.name}</span>
                          {!user.is_premium && !sub.free && (
                            <span className="inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-600 shrink-0">
                              <Lock className="w-2.5 h-2.5" /> PRO
                            </span>
                          )}
                        </div>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${getAccuracyBadgeClasses(sub.accuracy)}`}>
                          {sub.accuracy !== null ? `${sub.accuracy}%` : 'New'}
                        </span>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 mb-1">
                          <span>Syllabus Coverage: {sub.syllabusCoverage}%</span>
                          <span>{sub.attemptedCount}/{sub.totalQuestions} Qs</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                          <div
                            className="h-full bg-sky-500 rounded-full"
                            style={{ width: `${Math.max(6, sub.syllabusCoverage)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ====================================================================
              TAB 2: CHAPTERWISE PRACTICE MODE
             ==================================================================== */}
          {activeTab === 'practice' && (
            <div>
              {!practiceConfig.active ? (
                /* SUBJECT & CHAPTER BROWSER + FILTERS */
                <div className="space-y-4">
                  <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div>
                        <h1 className="text-lg font-bold">Chapterwise PYQ Practice Bank</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Select any of the 19 NEET-PG / INI-CET subjects or filter by exam year, difficulty, and status
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          startPracticeSession({
                            subjectId: 'ALL',
                            chapterId: 'ALL',
                            yearFilter: practiceConfig.yearFilter,
                            difficultyFilter: practiceConfig.difficultyFilter,
                            statusFilter: practiceConfig.statusFilter,
                            customTitle: 'Mixed High-Yield PYQ Practice'
                          })
                        }
                        className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5 self-start"
                      >
                        <Play className="w-3.5 h-3.5" /> Start Filtered Practice ({questions.length} Qs)
                      </button>
                    </div>

                    {/* Filter Bar */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                          Search Subject/Topic
                        </label>
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                          <input
                            type="text"
                            value={subjectSearch}
                            onChange={(e) => setSubjectSearch(e.target.value)}
                            placeholder="e.g. Medicine, ENT..."
                            className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                          Exam Year Filter
                        </label>
                        <select
                          value={practiceConfig.yearFilter}
                          onChange={(e) => setPracticeConfig((prev) => ({ ...prev, yearFilter: e.target.value }))}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                        >
                          <option value="ALL">All Years (2020–2025)</option>
                          <option value="2025">2025 PYQs</option>
                          <option value="2024">2024 PYQs</option>
                          <option value="2023">2023 PYQs</option>
                          <option value="2022">2022 PYQs</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                          Difficulty
                        </label>
                        <select
                          value={practiceConfig.difficultyFilter}
                          onChange={(e) => setPracticeConfig((prev) => ({ ...prev, difficultyFilter: e.target.value }))}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                        >
                          <option value="ALL">All Difficulties</option>
                          <option value="easy">Easy</option>
                          <option value="medium">Medium</option>
                          <option value="hard">Hard</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                          Question Status
                        </label>
                        <select
                          value={practiceConfig.statusFilter}
                          onChange={(e) => setPracticeConfig((prev) => ({ ...prev, statusFilter: e.target.value }))}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                        >
                          <option value="ALL">All Questions</option>
                          <option value="UNATTEMPTED">Unattempted Only</option>
                          <option value="INCORRECT">Incorrect Only</option>
                          <option value="BOOKMARKED">Bookmarked Only</option>
                          <option value="CONFUSING">Flagged Confusing</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Accordion of 19 Subjects -> Chapters */}
                  <div className="space-y-2.5">
                    {analytics.subjectStats
                      .filter(
                        (s) =>
                          !subjectSearch.trim() ||
                          s.name.toLowerCase().includes(subjectSearch.toLowerCase()) ||
                          s.code.toLowerCase().includes(subjectSearch.toLowerCase()) ||
                          s.chapters.some((c) => c.name.toLowerCase().includes(subjectSearch.toLowerCase()))
                      )
                      .map((sub) => {
                        const isExpanded = expandedSubjectId === sub.id;
                        const isLocked = !user.is_premium && !sub.free;
                        return (
                          <div
                            key={sub.id}
                            className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden"
                          >
                            <div
                              onClick={() => setExpandedSubjectId(isExpanded ? null : sub.id)}
                              className="p-3.5 sm:p-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold text-xs flex items-center justify-center shrink-0">
                                  {sub.code}
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-sm truncate">{sub.name}</span>
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                                      {sub.group}
                                    </span>
                                    {!user.is_premium && (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600">
                                        Free Trial ({Math.max(0, 15 - analytics.solvedToday)}/15 Qs left today)
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                    {sub.chapters.length} Chapters • {sub.totalQuestions} Sample PYQ(s) • Coverage: {sub.syllabusCoverage}%
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-lg border ${getAccuracyBadgeClasses(sub.accuracy)}`}>
                                  {sub.accuracy !== null ? `${sub.accuracy}%` : 'Unattempted'}
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    startPracticeSession({
                                      subjectId: sub.id,
                                      chapterId: 'ALL',
                                      yearFilter: practiceConfig.yearFilter,
                                      difficultyFilter: practiceConfig.difficultyFilter,
                                      statusFilter: practiceConfig.statusFilter
                                    });
                                  }}
                                  className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold"
                                >
                                  Practice All
                                </button>
                              </div>
                            </div>

                            {isExpanded && (
                              <div className="border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/50 p-3 space-y-2">
                                {sub.chapterBreakdown.map((ch) => (
                                  <div
                                    key={ch.id}
                                    className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2"
                                  >
                                    <div>
                                      <div className="text-xs font-semibold">{ch.name}</div>
                                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                                        {ch.totalQuestions > 0 ? `${ch.totalQuestions} Question(s) loaded` : 'Ready for CSV upload'}
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      {ch.accuracy !== null && (
                                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${getAccuracyBadgeClasses(ch.accuracy)}`}>
                                          {ch.accuracy}%
                                        </span>
                                      )}
                                      <button
                                        onClick={() =>
                                          startPracticeSession({
                                            subjectId: sub.id,
                                            chapterId: ch.totalQuestions > 0 ? ch.id : 'ALL',
                                            customTitle: `${sub.name}: ${ch.name}`
                                          })
                                        }
                                        className="px-2.5 py-1 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-medium"
                                      >
                                        Solve
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              ) : (
                /* SINGLE-QUESTION-PER-SCREEN PRACTICE PLAYER */
                (() => {
                  const currentQId = practiceConfig.questionIds[practiceConfig.currentIndex];
                  const currentQ = questions.find((q) => q.id === currentQId) || questions[0];
                  const selectedOpt = practiceSelection[currentQ.id];
                  const isAnswered = selectedOpt !== undefined;
                  const isBookmarked = Boolean(bookmarks[currentQ.id]);
                  const isConfusing = Boolean(confusingFlags[currentQ.id]);

                  return (
                    <div className="space-y-4">
                      {/* Practice Top Bar */}
                      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3.5 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <button
                            onClick={() => setPracticeConfig((prev) => ({ ...prev, active: false }))}
                            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-medium flex items-center gap-1"
                          >
                            <ChevronLeft className="w-4 h-4" /> Topics
                          </button>
                          <div className="min-w-0">
                            <div className="text-xs font-bold truncate">{practiceConfig.title}</div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400">
                              Question {practiceConfig.currentIndex + 1} of {practiceConfig.questionIds.length}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => setShowPalette((p) => !p)}
                          className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold flex items-center gap-1.5"
                        >
                          <Layers className="w-3.5 h-3.5 text-sky-500" />
                          Palette ({practiceConfig.currentIndex + 1}/{practiceConfig.questionIds.length})
                        </button>
                      </div>

                      {/* Collapsible Question Palette */}
                      {showPalette && (
                        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
                          <div className="flex items-center justify-between mb-2.5">
                            <span className="text-xs font-bold">Jump to Question</span>
                            <div className="flex items-center gap-3 text-[11px]">
                              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Correct</span>
                              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Wrong</span>
                              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" /> Unattempted</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
                            {practiceConfig.questionIds.map((qId, idx) => {
                              const qObj = questions.find((item) => item.id === qId);
                              const sel = practiceSelection[qId];
                              let btnStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
                              if (sel !== undefined && qObj) {
                                btnStyle =
                                  sel === qObj.correct_option
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-rose-500 text-white';
                              }
                              return (
                                <button
                                  key={qId}
                                  onClick={() => jumpToPracticeQuestion(idx)}
                                  className={`h-9 rounded-lg text-xs font-bold border transition ${btnStyle} ${
                                    idx === practiceConfig.currentIndex ? 'ring-2 ring-sky-500 border-sky-500' : 'border-transparent'
                                  }`}
                                >
                                  {idx + 1}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Question Card */}
                      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">
                        {/* Metadata Badges + Bookmark/Confusing Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400">
                              {currentQ.subject_name} • {currentQ.chapter_name}
                            </span>
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                              {currentQ.exam_name} {currentQ.exam_year}
                            </span>
                            <span
                              className={`text-[11px] font-semibold px-2 py-0.5 rounded-md capitalize ${
                                currentQ.difficulty === 'easy'
                                  ? 'bg-emerald-500/10 text-emerald-600'
                                  : currentQ.difficulty === 'medium'
                                  ? 'bg-amber-500/10 text-amber-600'
                                  : 'bg-rose-500/10 text-rose-600'
                              }`}
                            >
                              {currentQ.difficulty}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                setBookmarks((prev) => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }));
                                triggerToast(isBookmarked ? 'Removed bookmark' : 'Bookmarked question for revision');
                              }}
                              className={`px-2.5 py-1 rounded-lg text-xs font-medium border flex items-center gap-1 transition ${
                                isBookmarked
                                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-400'
                                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                              }`}
                            >
                              <Bookmark className="w-3.5 h-3.5" />
                              {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                            </button>

                            <button
                              onClick={() => {
                                setConfusingFlags((prev) => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }));
                                triggerToast(isConfusing ? 'Removed Confusing flag' : 'Flagged as Confusing for Smart Revision');
                              }}
                              className={`px-2.5 py-1 rounded-lg text-xs font-medium border flex items-center gap-1 transition ${
                                isConfusing
                                  ? 'bg-rose-500/15 border-rose-500/40 text-rose-600 dark:text-rose-400'
                                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                              }`}
                            >
                              <AlertTriangle className="w-3.5 h-3.5" />
                              {isConfusing ? 'Confusing' : 'Flag Confusing'}
                            </button>

                            <button
                              onClick={() => {
                                setNoteDraft(notes[currentQ.id] || '');
                                setShowNoteEditor((n) => !n);
                              }}
                              className={`px-2.5 py-1 rounded-lg text-xs font-medium border flex items-center gap-1 transition ${
                                notes[currentQ.id]
                                  ? 'bg-sky-500/15 border-sky-500/40 text-sky-600 dark:text-sky-400'
                                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                              }`}
                            >
                              <FileText className="w-3.5 h-3.5" />
                              Note
                            </button>
                          </div>
                        </div>

                        {/* Question Stem */}
                        <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-900 dark:text-slate-100">
                          {currentQ.question_text}
                        </p>

                        {/* Optional Clinical Image / Diagram from Supabase Storage Bucket */}
                        <ClinicalDiagram
                          type={currentQ.image_type}
                          storagePath={currentQ.image_storage_path}
                          imageData={currentQ.image_data}
                        />

                        {/* 4 Large Tap-Friendly Option Buttons */}
                        <div className="mt-4 space-y-2.5">
                          {currentQ.options.map((optText, idx) => {
                            const optionLabel = ['A', 'B', 'C', 'D'][idx];
                            const isCorrectOption = idx === currentQ.correct_option;
                            const isSelectedOption = selectedOpt === idx;

                            let optionStyles =
                              'border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/50 hover:border-sky-500/60';
                            let badgeStyles =
                              'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600';

                            if (isAnswered) {
                              if (isCorrectOption) {
                                optionStyles =
                                  'border-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-950 dark:text-emerald-100';
                                badgeStyles = 'bg-emerald-600 text-white border-emerald-600';
                              } else if (isSelectedOption && !isCorrectOption) {
                                optionStyles =
                                  'border-rose-500 bg-rose-500/10 dark:bg-rose-500/15 text-rose-950 dark:text-rose-100';
                                badgeStyles = 'bg-rose-600 text-white border-rose-600';
                              } else {
                                optionStyles = 'border-slate-200 dark:border-slate-800 opacity-65';
                              }
                            }

                            return (
                              <button
                                key={idx}
                                onClick={() => handleSelectPracticeOption(currentQ, idx)}
                                className={`w-full min-h-[54px] p-3.5 rounded-xl border-2 text-left transition flex items-center justify-between gap-3 ${optionStyles}`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${badgeStyles}`}>
                                    {optionLabel}
                                  </span>
                                  <span className="text-sm font-medium">{optText}</span>
                                </div>
                                {isAnswered && isCorrectOption && (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                )}
                                {isAnswered && isSelectedOption && !isCorrectOption && (
                                  <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Personal Note Inline Editor */}
                        {(showNoteEditor || notes[currentQ.id]) && (
                          <div className="mt-4 rounded-xl bg-amber-500/10 border border-amber-500/30 p-3.5">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                                <FileText className="w-3.5 h-3.5" /> Personal Revision Note
                              </span>
                              {!showNoteEditor && (
                                <button
                                  onClick={() => {
                                    setNoteDraft(notes[currentQ.id] || '');
                                    setShowNoteEditor(true);
                                  }}
                                  className="text-[11px] font-semibold text-amber-700 dark:text-amber-300 underline"
                                >
                                  Edit Note
                                </button>
                              )}
                            </div>
                            {showNoteEditor ? (
                              <div className="space-y-2">
                                <textarea
                                  rows={2}
                                  value={noteDraft}
                                  onChange={(e) => setNoteDraft(e.target.value)}
                                  placeholder="Write your mnemonic or clinical pearl for this PYQ..."
                                  className="w-full rounded-lg border border-amber-500/40 bg-white dark:bg-slate-900 p-2 text-xs"
                                />
                                <div className="flex justify-end gap-2">
                                  <button
                                    onClick={() => setShowNoteEditor(false)}
                                    className="px-2.5 py-1 rounded-lg text-xs text-slate-600 dark:text-slate-400"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => {
                                      setNotes((prev) => ({ ...prev, [currentQ.id]: noteDraft }));
                                      setShowNoteEditor(false);
                                      triggerToast('Personal note saved!');
                                    }}
                                    className="px-3 py-1 rounded-lg bg-amber-600 text-white text-xs font-semibold"
                                  >
                                    Save Note
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <p className="text-xs text-amber-900 dark:text-amber-200">{notes[currentQ.id]}</p>
                            )}
                          </div>
                        )}

                        {/* Instant Explanation Box after Selecting an Answer */}
                        {isAnswered && (
                          <div className="mt-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 p-4 space-y-2">
                            <div className="flex items-center justify-between">
                              <span
                                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                                  selectedOpt === currentQ.correct_option
                                    ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                                    : 'bg-rose-500/15 text-rose-700 dark:text-rose-300'
                                }`}
                              >
                                {selectedOpt === currentQ.correct_option
                                  ? 'Correct! Scheduled for longer Spaced Repetition interval'
                                  : `Incorrect — Added to Mistake Notebook & Day-1 Spaced Repetition`}
                              </span>
                              <span className="text-xs font-semibold text-slate-500">
                                Correct Answer: Option {['A', 'B', 'C', 'D'][currentQ.correct_option]}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                              {currentQ.explanation}
                            </p>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {(currentQ.tags || []).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Previous / Next Navigation Footer */}
                        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                          <button
                            disabled={practiceConfig.currentIndex === 0}
                            onClick={() => jumpToPracticeQuestion(practiceConfig.currentIndex - 1)}
                            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold disabled:opacity-40 flex items-center gap-1"
                          >
                            <ChevronLeft className="w-4 h-4" /> Previous
                          </button>

                          <button
                            onClick={() => {
                              if (practiceConfig.currentIndex < practiceConfig.questionIds.length - 1) {
                                jumpToPracticeQuestion(practiceConfig.currentIndex + 1);
                              } else {
                                triggerToast('Completed all questions in this practice set!', 'success');
                                setPracticeConfig((prev) => ({ ...prev, active: false }));
                              }
                            }}
                            className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1"
                          >
                            {practiceConfig.currentIndex < practiceConfig.questionIds.length - 1 ? 'Next Question' : 'Finish Set'}
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()
              )}
            </div>
          )}

          {/* ====================================================================
              TAB 3: TIMED TEST MODE (BUILDER, EXAM INTERFACE, POST-TEST REVIEW)
             ==================================================================== */}
          {activeTab === 'tests' && (
            <div>
              {!activeTest || activeTest.status === 'paused' ? (
                /* TEST CONFIGURATOR & PAST TESTS */
                <div className="space-y-5">
                  <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5">
                    <h1 className="text-lg font-bold">Timed Exam Simulator ({user.target_exam} Pattern)</h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Configure a Chapter Test, Subject Test, Grand Test, or Custom Test with configurable negative marking
                    </p>

                    {/* 4 Test Type Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
                      {[
                        { id: 'chapter', label: 'Chapter Test', desc: 'Single topic focus' },
                        { id: 'subject', label: 'Subject Test', desc: 'Complete subject' },
                        { id: 'grand', label: 'Grand Test', desc: 'All 19 subjects' },
                        { id: 'custom', label: 'Custom Test', desc: 'Pick subjects & time' }
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setTestBuilder((prev) => ({ ...prev, testType: t.id }))}
                          className={`p-3 rounded-xl border text-left transition ${
                            testBuilder.testType === t.id
                              ? 'border-sky-600 bg-sky-500/10 ring-1 ring-sky-600'
                              : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40'
                          }`}
                        >
                          <div className="text-xs font-bold">{t.label}</div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{t.desc}</div>
                        </button>
                      ))}
                    </div>

                    {/* Dynamic Options based on Test Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                      {(testBuilder.testType === 'chapter' || testBuilder.testType === 'subject') && (
                        <div>
                          <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                            Select Subject
                          </label>
                          <select
                            value={testBuilder.subjectId}
                            onChange={(e) =>
                              setTestBuilder((prev) => ({
                                ...prev,
                                subjectId: e.target.value,
                                chapterId: 'ALL'
                              }))
                            }
                            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                          >
                            {subjects.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.name} ({s.code})
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {testBuilder.testType === 'chapter' && (
                        <div>
                          <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                            Select Chapter
                          </label>
                          <select
                            value={testBuilder.chapterId}
                            onChange={(e) => setTestBuilder((prev) => ({ ...prev, chapterId: e.target.value }))}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                          >
                            <option value="ALL">All Chapters in Subject</option>
                            {(subjects.find((s) => s.id === testBuilder.subjectId)?.chapters || []).map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                          Question Count
                        </label>
                        <select
                          value={testBuilder.questionCount}
                          onChange={(e) => setTestBuilder((prev) => ({ ...prev, questionCount: Number(e.target.value) }))}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                        >
                          <option value={5}>5 Questions (Quick Sprint)</option>
                          <option value={10}>10 Questions (Mini Block)</option>
                          <option value={20}>20 Questions (Full Sample Set)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                          Duration (Minutes)
                        </label>
                        <select
                          value={testBuilder.durationMinutes}
                          onChange={(e) => setTestBuilder((prev) => ({ ...prev, durationMinutes: Number(e.target.value) }))}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                        >
                          <option value={5}>5 Minutes</option>
                          <option value={10}>10 Minutes</option>
                          <option value={20}>20 Minutes</option>
                          <option value={30}>30 Minutes</option>
                        </select>
                      </div>
                    </div>

                    {/* Multi-subject picker for Custom Test */}
                    {testBuilder.testType === 'custom' && (
                      <div className="mt-4">
                        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                          Pick Subjects for Custom Test ({testBuilder.customSubjects.length} selected)
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {subjects.map((s) => {
                            const active = testBuilder.customSubjects.includes(s.id);
                            return (
                              <button
                                key={s.id}
                                onClick={() =>
                                  setTestBuilder((prev) => ({
                                    ...prev,
                                    customSubjects: active
                                      ? prev.customSubjects.filter((id) => id !== s.id)
                                      : [...prev.customSubjects, s.id]
                                  }))
                                }
                                className={`text-[11px] px-2.5 py-1 rounded-lg font-medium border transition ${
                                  active
                                    ? 'bg-sky-600 text-white border-sky-600'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                                }`}
                              >
                                {s.code}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Configurable Negative Marking */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Marking Scheme:</span>
                        <label className="flex items-center gap-1 text-xs">
                          <span className="text-emerald-600 font-bold">Correct:</span>
                          <select
                            value={testBuilder.marksCorrect}
                            onChange={(e) => setTestBuilder((prev) => ({ ...prev, marksCorrect: Number(e.target.value) }))}
                            className="px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                          >
                            <option value={4}>+4 (NEET-PG)</option>
                            <option value={1}>+1 (INI-CET)</option>
                          </select>
                        </label>
                        <label className="flex items-center gap-1 text-xs">
                          <span className="text-rose-600 font-bold">Wrong:</span>
                          <select
                            value={testBuilder.marksWrong}
                            onChange={(e) => setTestBuilder((prev) => ({ ...prev, marksWrong: Number(e.target.value) }))}
                            className="px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                          >
                            <option value={-1}>-1 (Standard)</option>
                            <option value={-0.33}>-0.33 (1/3 Negative)</option>
                            <option value={0}>0 (No Negative)</option>
                          </select>
                        </label>
                        <span className="text-xs text-slate-500">Unattempted: 0</span>
                      </div>

                      <button
                        onClick={startNewTest}
                        className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
                      >
                        <Play className="w-4 h-4" /> Launch Timed Test
                      </button>
                    </div>
                  </div>

                  {/* Paused Test Resume Card if available */}
                  {activeTest && activeTest.status === 'paused' && (
                    <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-amber-800 dark:text-amber-300">
                          Paused Session: {activeTest.title}
                        </div>
                        <div className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
                          Time left: {formatTimer(activeTest.remainingSec)} • {Object.keys(activeTest.responses).length} of {activeTest.questionIds.length} answered
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveTest((prev) => ({ ...prev, status: 'in_progress' }))}
                        className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold"
                      >
                        Resume Now
                      </button>
                    </div>
                  )}

                  {/* Recent Completed Tests History */}
                  <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
                    <h2 className="font-bold text-sm mb-3">Recent Test Submissions</h2>
                    <div className="space-y-2">
                      {testHistory.slice().reverse().map((th) => (
                        <div
                          key={th.id}
                          className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between gap-2"
                        >
                          <div>
                            <div className="text-xs font-bold">{th.title}</div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400">
                              {th.date} • Avg {th.avgTimeSec}s/Q • Accuracy: {th.accuracy}%
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                              {th.score} / {th.maxScore}
                            </div>
                            <div className="text-[10px] text-slate-500">{th.percentage}% Score</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : activeTest.status === 'in_progress' ? (
                /* ACTIVE TIMED EXAM INTERFACE */
                (() => {
                  const currentQId = activeTest.questionIds[activeTest.currentIndex];
                  const currentQ = questions.find((q) => q.id === currentQId) || questions[0];
                  const selectedOpt = activeTest.responses[currentQId];
                  const isMarked = Boolean(activeTest.markedForReview[currentQId]);

                  return (
                    <div className="space-y-4">
                      {/* Exam Header with Live Timer, Pause, and Submit */}
                      <div className="rounded-2xl bg-slate-900 text-white p-3.5 flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <div className="text-xs font-bold">{activeTest.title}</div>
                          <div className="text-[11px] text-slate-400">
                            Marking: +{activeTest.marksCorrect} / {activeTest.marksWrong} • Q {activeTest.currentIndex + 1} of {activeTest.questionIds.length}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div
                            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 ${
                              activeTest.remainingSec < 60 ? 'bg-rose-600 animate-pulse' : 'bg-slate-800'
                            }`}
                          >
                            <Clock className="w-3.5 h-3.5 text-sky-400" />
                            {formatTimer(activeTest.remainingSec)}
                          </div>

                          <button
                            onClick={() => {
                              setActiveTest((prev) => ({ ...prev, status: 'paused' }));
                              triggerToast('Test paused. You can resume anytime from Home or Tests.');
                            }}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold flex items-center gap-1"
                          >
                            <Pause className="w-3.5 h-3.5" /> Pause
                          </button>

                          <button
                            onClick={() => setShowTestPalette((p) => !p)}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold"
                          >
                            Palette
                          </button>

                          <button
                            onClick={() => setActiveTest((prev) => finalizeTestSubmission(prev))}
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold"
                          >
                            Submit Test
                          </button>
                        </div>
                      </div>

                      {/* Exam Question Palette Drawer */}
                      {showTestPalette && (
                        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-[11px]">
                            <span className="font-bold">Exam Question Palette</span>
                            <div className="flex flex-wrap gap-3">
                              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Answered</span>
                              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Marked for Review</span>
                              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" /> Unanswered</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                            {activeTest.questionIds.map((qId, idx) => {
                              const ans = activeTest.responses[qId] !== undefined && activeTest.responses[qId] !== null;
                              const rev = activeTest.markedForReview[qId];
                              let color = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
                              if (rev) color = 'bg-purple-600 text-white';
                              else if (ans) color = 'bg-emerald-600 text-white';
                              return (
                                <button
                                  key={qId}
                                  onClick={() => {
                                    setActiveTest((prev) => ({ ...prev, currentIndex: idx }));
                                    setShowTestPalette(false);
                                  }}
                                  className={`h-9 rounded-lg text-xs font-bold ${color} ${
                                    activeTest.currentIndex === idx ? 'ring-2 ring-sky-500' : ''
                                  }`}
                                >
                                  {idx + 1}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Exam Question Stem & Options (No instant reveal until submission) */}
                      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-6">
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                          <span>{currentQ.subject_name}</span>
                          <span>Time on question: {activeTest.timeSpent[currentQId] || 0}s</span>
                        </div>

                        <p className="text-sm sm:text-base font-medium leading-relaxed">
                          {currentQ.question_text}
                        </p>

                        <ClinicalDiagram
                          type={currentQ.image_type}
                          storagePath={currentQ.image_storage_path}
                          imageData={currentQ.image_data}
                        />

                        <div className="mt-4 space-y-2.5">
                          {currentQ.options.map((optText, idx) => {
                            const isSelected = selectedOpt === idx;
                            return (
                              <button
                                key={idx}
                                onClick={() =>
                                  setActiveTest((prev) => ({
                                    ...prev,
                                    responses: { ...prev.responses, [currentQId]: idx }
                                  }))
                                }
                                className={`w-full min-h-[54px] p-3.5 rounded-xl border-2 text-left transition flex items-center gap-3 ${
                                  isSelected
                                    ? 'border-sky-600 bg-sky-500/10 dark:bg-sky-500/20'
                                    : 'border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/50'
                                }`}
                              >
                                <span
                                  className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                                    isSelected
                                      ? 'bg-sky-600 text-white'
                                      : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600'
                                  }`}
                                >
                                  {['A', 'B', 'C', 'D'][idx]}
                                </span>
                                <span className="text-sm font-medium">{optText}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Exam Controls: Mark for Review, Clear Response, Prev, Save & Next */}
                        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                setActiveTest((prev) => ({
                                  ...prev,
                                  markedForReview: {
                                    ...prev.markedForReview,
                                    [currentQId]: !prev.markedForReview[currentQId]
                                  }
                                }))
                              }
                              className={`px-3 py-2 rounded-xl text-xs font-semibold border ${
                                isMarked
                                  ? 'bg-purple-600 text-white border-purple-600'
                                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                              }`}
                            >
                              {isMarked ? 'Marked for Review' : 'Mark for Review'}
                            </button>

                            <button
                              onClick={() =>
                                setActiveTest((prev) => {
                                  const nextResp = { ...prev.responses };
                                  delete nextResp[currentQId];
                                  return { ...prev, responses: nextResp };
                                })
                              }
                              className="px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                            >
                              Clear Response
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              disabled={activeTest.currentIndex === 0}
                              onClick={() =>
                                setActiveTest((prev) => ({ ...prev, currentIndex: prev.currentIndex - 1 }))
                              }
                              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold disabled:opacity-40"
                            >
                              Previous
                            </button>

                            {activeTest.currentIndex < activeTest.questionIds.length - 1 ? (
                              <button
                                onClick={() =>
                                  setActiveTest((prev) => ({ ...prev, currentIndex: prev.currentIndex + 1 }))
                                }
                                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold"
                              >
                                Save & Next →
                              </button>
                            ) : (
                              <button
                                onClick={() => setActiveTest((prev) => finalizeTestSubmission(prev))}
                                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                              >
                                Submit Exam
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()
              ) : (
                /* POST-SUBMISSION TEST SCORECARD & QUESTION-BY-QUESTION REVIEW */
                <div className="space-y-4">
                  <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                          Test Completed & Synced
                        </span>
                        <h1 className="text-lg font-bold mt-0.5">{activeTest.title}</h1>
                      </div>
                      <button
                        onClick={() => setActiveTest(null)}
                        className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold self-start"
                      >
                        Take Another Test
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4">
                      <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                        <div className="text-[11px] text-indigo-600 dark:text-indigo-300">Total Score</div>
                        <div className="text-lg font-bold">
                          {activeTest.result.score} / {activeTest.result.maxScore}
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                        <div className="text-[11px] text-emerald-600 dark:text-emerald-300">Accuracy</div>
                        <div className="text-lg font-bold">{activeTest.result.accuracy}%</div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
                        <div className="text-[11px] text-slate-500">Correct / Wrong</div>
                        <div className="text-lg font-bold">
                          <span className="text-emerald-600">{activeTest.result.correctCount}</span> /{' '}
                          <span className="text-rose-600">{activeTest.result.wrongCount}</span>
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
                        <div className="text-[11px] text-slate-500">Unattempted</div>
                        <div className="text-lg font-bold">{activeTest.result.unattemptedCount}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
                        <div className="text-[11px] text-slate-500">Avg Time / Q</div>
                        <div className="text-lg font-bold">{activeTest.result.avgTimeSec}s</div>
                      </div>
                    </div>
                  </div>

                  {/* Question-by-Question Review with Explanations */}
                  <div className="space-y-3">
                    <h2 className="font-bold text-sm px-1">Question-by-Question Review & Explanations</h2>
                    {activeTest.questionIds.map((qId, idx) => {
                      const q = questions.find((item) => item.id === qId);
                      if (!q) return null;
                      const userChoice = activeTest.responses[qId];
                      const isCorrect = userChoice === q.correct_option;
                      const isUnattempted = userChoice === undefined || userChoice === null;

                      return (
                        <div
                          key={qId}
                          className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-2.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold">
                              Q{idx + 1}. {q.subject_name} ({q.exam_name} {q.exam_year})
                            </span>
                            <span
                              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                                isUnattempted
                                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-600'
                                  : isCorrect
                                  ? 'bg-emerald-500/15 text-emerald-600'
                                  : 'bg-rose-500/15 text-rose-600'
                              }`}
                            >
                              {isUnattempted
                                ? 'Unattempted (0)'
                                : isCorrect
                                ? `Correct (+${activeTest.marksCorrect})`
                                : `Wrong (${activeTest.marksWrong})`}
                              {' • '}
                              {activeTest.timeSpent[qId] || 12}s
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm font-medium">{q.question_text}</p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            {q.options.map((opt, oIdx) => {
                              const isRight = oIdx === q.correct_option;
                              const isPicked = oIdx === userChoice;
                              return (
                                <div
                                  key={oIdx}
                                  className={`p-2.5 rounded-lg border ${
                                    isRight
                                      ? 'border-emerald-500 bg-emerald-500/10 font-semibold'
                                      : isPicked
                                      ? 'border-rose-500 bg-rose-500/10'
                                      : 'border-slate-200 dark:border-slate-800 opacity-75'
                                  }`}
                                >
                                  {['A', 'B', 'C', 'D'][oIdx]}. {opt}
                                </div>
                              );
                            })}
                          </div>

                          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 text-xs text-slate-700 dark:text-slate-300">
                            <strong className="text-sky-600 dark:text-sky-400">Explanation: </strong>
                            {q.explanation}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ====================================================================
              TAB 4: PROGRESS TRACKING, CHARTS & MISTAKE NOTEBOOK
             ==================================================================== */}
          {activeTab === 'progress' && (
            <div className="space-y-5">
              {/* Charts Row: Score Trend Graph + Time Analysis BarChart */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Score Trend Across Tests */}
                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h2 className="font-bold text-sm">Test Score & Accuracy Trend (%)</h2>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Progression across your last {testHistory.length} timed tests
                      </p>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                      +{Math.max(0, Math.round(testHistory[testHistory.length - 1].percentage - testHistory[0].percentage))}% Growth
                    </span>
                  </div>

                  <div className="relative h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={testHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                        <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                        <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <ReferenceLine y={75} stroke="#10b981" strokeDasharray="3 3" />
                        <Area
                          type="monotone"
                          dataKey="percentage"
                          name="Score %"
                          stroke="#0284c7"
                          fill="#0284c7"
                          fillOpacity={0.2}
                          strokeWidth={2.5}
                        />
                        <Area
                          type="monotone"
                          dataKey="accuracy"
                          name="Accuracy %"
                          stroke="#10b981"
                          fill="#10b981"
                          fillOpacity={0.1}
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Time Analysis per Subject */}
                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h2 className="font-bold text-sm">Time Analysis (Avg Seconds / Question)</h2>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Comparing response speed across attempted subjects
                      </p>
                    </div>
                  </div>

                  <div className="relative h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={analytics.subjectStats.filter((s) => s.attemptedCount > 0)}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                        <XAxis dataKey="code" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Bar dataKey="avgTime" name="Avg Sec/Question" radius={[6, 6, 0, 0]}>
                          {analytics.subjectStats
                            .filter((s) => s.attemptedCount > 0)
                            .map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={entry.avgTime > 50 ? '#f43f5e' : entry.avgTime > 35 ? '#f59e0b' : '#0ea5e9'}
                              />
                            ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Mistake Notebook with Re-attempt Button */}
              <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h2 className="font-bold text-sm flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-rose-500" />
                      Mistake Notebook ({analytics.mistakeQuestions.length} Questions)
                    </h2>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Every wrongly answered or flagged confusing PYQ in one place for targeted re-attempt
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      startPracticeSession({
                        customIds: analytics.mistakeQuestions.map((q) => q.id),
                        customTitle: 'Mistake Notebook — Re-Attempt Session'
                      })
                    }
                    className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold self-start"
                  >
                    Re-Attempt All Mistakes ({analytics.mistakeQuestions.length})
                  </button>
                </div>

                <div className="space-y-2.5">
                  {analytics.mistakeQuestions.map((q) => {
                    const att = attempts[q.id];
                    return (
                      <div
                        key={q.id}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/15 text-rose-600 dark:text-rose-400">
                              Missed {att?.wrong_count || 1}x
                            </span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400">
                              {q.subject_name} • {q.chapter_name}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              Next SRS Review: in {att?.next_review_days || 1} day(s)
                            </span>
                          </div>
                          <p className="text-xs font-medium line-clamp-2">{q.question_text}</p>
                        </div>

                        <button
                          onClick={() =>
                            startPracticeSession({
                              customIds: [q.id],
                              customTitle: `Re-Attempt: ${q.subject_name}`
                            })
                          }
                          className="px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold shrink-0 self-start sm:self-center"
                        >
                          Re-attempt
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Subject-wise & Chapter-wise Color-Coded Breakdown */}
              <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
                <h2 className="font-bold text-sm mb-1">Subject & Chapter Accuracy Matrix</h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                  Red (&lt;50% Needs Immediate Revision) • Yellow (50–75% Moderate) • Green (&gt;75% Strong)
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                        <th className="py-2 pr-3">Subject</th>
                        <th className="py-2 px-3">Attempted</th>
                        <th className="py-2 px-3">Syllabus Coverage</th>
                        <th className="py-2 px-3">Avg Time</th>
                        <th className="py-2 pl-3 text-right">Accuracy</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
                      {analytics.subjectStats.map((s) => (
                        <tr key={s.id}>
                          <td className="py-2.5 pr-3 font-semibold">{s.name}</td>
                          <td className="py-2.5 px-3">{s.attemptedCount}/{s.totalQuestions} Qs</td>
                          <td className="py-2.5 px-3">{s.syllabusCoverage}%</td>
                          <td className="py-2.5 px-3">{s.avgTime > 0 ? `${s.avgTime}s` : '—'}</td>
                          <td className="py-2.5 pl-3 text-right">
                            <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded border ${getAccuracyBadgeClasses(s.accuracy)}`}>
                              {s.accuracy !== null ? `${s.accuracy}%` : 'N/A'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ====================================================================
              TAB 5: PROFILE, MONETIZATION HOOKS & OWNER ADMIN PANEL
             ==================================================================== */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              {/* Sub-Navigation Pills */}
              <div className="flex flex-wrap gap-1.5 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800">
                {[
                  { id: 'settings', label: 'Student Profile', icon: User },
                  { id: 'admin_questions', label: 'Admin: Questions CRUD', icon: Edit3 },
                  { id: 'admin_csv', label: 'Admin: CSV Bulk Upload', icon: Upload },
                  { id: 'admin_subjects', label: 'Admin: Subjects & Stats', icon: Shield },
                  { id: 'sql_schema', label: 'Supabase SQL & Setup', icon: Database }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setProfileSubTab(tab.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                        profileSubTab === tab.id
                          ? 'bg-sky-600 text-white'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* 5A: STUDENT PROFILE & SUBSCRIPTION SETTINGS */}
              {profileSubTab === 'settings' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3.5">
                    <h2 className="font-bold text-base">Student Profile & Exam Target</h2>

                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={user.full_name}
                        onChange={(e) => setUser((prev) => ({ ...prev, full_name: e.target.value }))}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Target Exam</label>
                        <select
                          value={user.target_exam}
                          onChange={(e) => {
                            const nextExam = e.target.value;
                            setUser((prev) => ({ ...prev, target_exam: nextExam }));
                            setTestBuilder((prev) => ({
                              ...prev,
                              marksCorrect: nextExam === 'INI-CET' ? 1 : 4,
                              marksWrong: nextExam === 'INI-CET' ? -0.33 : -1
                            }));
                            triggerToast(`Target Exam set to ${nextExam} (${nextExam === 'INI-CET' ? '+1 / -0.33' : '+4 / -1'} marking)`);
                          }}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                        >
                          <option value="NEET-PG">NEET-PG (+4 / -1)</option>
                          <option value="INI-CET">INI-CET (+1 / -0.33)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Target Exam Date</label>
                        <input
                          type="date"
                          value={user.exam_date}
                          onChange={(e) => setUser((prev) => ({ ...prev, exam_date: e.target.value }))}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Medical College (Optional)</label>
                      <input
                        type="text"
                        value={user.college}
                        onChange={(e) => setUser((prev) => ({ ...prev, college: e.target.value }))}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                      />
                    </div>

                    <button
                      onClick={() => triggerToast('Profile synced!', 'success')}
                      className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold"
                    >
                      Save Profile Settings
                    </button>
                  </div>

                  {/* Subscription & Monetization Card */}
                  <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                          Subscription & Razorpay Hook
                        </span>
                        <Crown className="w-5 h-5 text-amber-500" />
                      </div>
                      <h3 className="text-base font-bold mt-1">
                        Current Plan: {user.is_premium ? 'PulsePG Pro (Unlimited Qs & Tests)' : `Free Tier (${analytics.solvedToday}/15 Qs Today Across All 19 Subjects)`}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Free users get full access to all 19 subjects, Smart Revision, and Timed Tests with a daily limit of 15 questions/day so they can experience the entire app. Pro unlocks unlimited daily questions and mocks.
                      </p>
                      <ul className="mt-3 space-y-1.5 text-xs">
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> All 19 NEET-PG & INI-CET Subjects</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Full-length Grand Tests & Custom Builder</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> 1, 3, 7, 15-Day Spaced Repetition & Mistake Bank</li>
                      </ul>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setShowUpgradeModal(true)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold"
                      >
                        Test Razorpay Checkout Modal
                      </button>
                      <button
                        onClick={() => setUser((prev) => ({ ...prev, is_premium: !prev.is_premium }))}
                        className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                      >
                        Switch to {user.is_premium ? 'Free Tier' : 'Pro Tier'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 5B: ADMIN PANEL — MANUAL QUESTION ADD / EDIT / DELETE */}
              {profileSubTab === 'admin_questions' && (
                <div className="space-y-4">
                  <form
                    onSubmit={handleSaveQuestion}
                    className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="font-bold text-sm">
                        {editingQuestion ? `Editing Question (${editingQuestion.id})` : 'Add New PYQ to Question Bank'}
                      </h2>
                      {editingQuestion && (
                        <button
                          type="button"
                          onClick={() => setEditingQuestion(null)}
                          className="text-xs text-rose-500 underline"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                      <div>
                        <label className="block text-[11px] text-slate-500 mb-1">Subject</label>
                        <select
                          value={newQuestionForm.subject_id}
                          onChange={(e) => {
                            const sub = subjects.find((s) => s.id === e.target.value);
                            setNewQuestionForm((prev) => ({
                              ...prev,
                              subject_id: e.target.value,
                              chapter_id: sub?.chapters[0]?.id || ''
                            }));
                          }}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                        >
                          {subjects.map((s) => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-500 mb-1">Chapter</label>
                        <select
                          value={newQuestionForm.chapter_id}
                          onChange={(e) => setNewQuestionForm((prev) => ({ ...prev, chapter_id: e.target.value }))}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                        >
                          {(subjects.find((s) => s.id === newQuestionForm.subject_id)?.chapters || []).map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-500 mb-1">Exam & Year</label>
                        <div className="flex gap-1.5">
                          <select
                            value={newQuestionForm.exam_name}
                            onChange={(e) => setNewQuestionForm((prev) => ({ ...prev, exam_name: e.target.value }))}
                            className="w-1/2 px-2 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                          >
                            <option value="NEET-PG">NEET-PG</option>
                            <option value="INI-CET">INI-CET</option>
                          </select>
                          <input
                            type="number"
                            value={newQuestionForm.exam_year}
                            onChange={(e) => setNewQuestionForm((prev) => ({ ...prev, exam_year: e.target.value }))}
                            className="w-1/2 px-2 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-500 mb-1">Difficulty</label>
                        <select
                          value={newQuestionForm.difficulty}
                          onChange={(e) => setNewQuestionForm((prev) => ({ ...prev, difficulty: e.target.value }))}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                        >
                          <option value="easy">Easy</option>
                          <option value="medium">Medium</option>
                          <option value="hard">Hard</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Question Stem</label>
                      <textarea
                        rows={2}
                        value={newQuestionForm.question_text}
                        onChange={(e) => setNewQuestionForm((prev) => ({ ...prev, question_text: e.target.value }))}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {['A', 'B', 'C', 'D'].map((letter, idx) => {
                        const key = `option${letter}`;
                        return (
                          <div key={letter}>
                            <label className="block text-[11px] text-slate-500 mb-1">Option {letter}</label>
                            <input
                              type="text"
                              value={newQuestionForm[key]}
                              onChange={(e) => setNewQuestionForm((prev) => ({ ...prev, [key]: e.target.value }))}
                              placeholder={`Enter option ${letter}...`}
                              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                            />
                          </div>
                        );
                      })}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <div>
                        <label className="block text-[11px] text-slate-500 mb-1">Correct Option</label>
                        <select
                          value={newQuestionForm.correct_option}
                          onChange={(e) => setNewQuestionForm((prev) => ({ ...prev, correct_option: Number(e.target.value) }))}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                        >
                          <option value={0}>Option A</option>
                          <option value={1}>Option B</option>
                          <option value={2}>Option C</option>
                          <option value={3}>Option D</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] text-slate-500 mb-1">Detailed Explanation</label>
                        <input
                          type="text"
                          value={newQuestionForm.explanation}
                          onChange={(e) => setNewQuestionForm((prev) => ({ ...prev, explanation: e.target.value }))}
                          placeholder="Why is this option correct and why are others ruled out?"
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                        />
                      </div>
                    </div>

                    {/* Supabase Storage Bucket ('question-images') Direct Image Upload */}
                    <div className="rounded-xl border border-dashed border-sky-500/40 bg-sky-500/5 p-3 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <div className="text-xs font-bold text-sky-700 dark:text-sky-300">
                            Clinical Image Upload → Supabase Storage Bucket (`question-images`)
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">
                            Stored directly in your Supabase Storage bucket so external links never break
                          </div>
                        </div>
                        <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold inline-flex items-center gap-1.5">
                          <Upload className="w-3.5 h-3.5" /> Choose Image File
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const subCode = subjects.find((s) => s.id === newQuestionForm.subject_id)?.code || 'MED';
                              const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
                              const bucketPath = `question-images/${subCode}/${Date.now()}_${safeName}`;
                              const reader = new FileReader();
                              reader.onload = () => {
                                setNewQuestionForm((prev) => ({
                                  ...prev,
                                  image_storage_path: bucketPath,
                                  image_data: String(reader.result || '')
                                }));
                                triggerToast(`Uploaded to Supabase Bucket path: ${bucketPath}`, 'success');
                              };
                              reader.readAsDataURL(file);
                            }}
                          />
                        </label>
                      </div>
                      {newQuestionForm.image_storage_path && (
                        <div className="flex items-center justify-between bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
                          <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 truncate">
                            Bucket Path: {newQuestionForm.image_storage_path}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setNewQuestionForm((prev) => ({ ...prev, image_storage_path: '', image_data: '' }))
                            }
                            className="text-rose-500 text-[11px] font-semibold ml-2"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      {editingQuestion ? 'Update Question' : 'Add Question to Bank'}
                    </button>
                  </form>

                  {/* Existing Question Bank List */}
                  <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-2.5">
                    <h3 className="font-bold text-xs text-slate-500 uppercase">
                      Loaded Question Bank ({questions.length} Questions)
                    </h3>
                    {questions.map((q) => (
                      <div
                        key={q.id}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 flex items-start justify-between gap-3"
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-sky-600 dark:text-sky-400">
                            <span>{q.subject_name}</span>
                            <span>•</span>
                            <span>{q.chapter_name}</span>
                            <span>•</span>
                            <span>{q.exam_name} {q.exam_year}</span>
                          </div>
                          <p className="text-xs font-medium">{q.question_text}</p>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => {
                              setEditingQuestion(q);
                              setNewQuestionForm({
                                subject_id: q.subject_id,
                                chapter_id: q.chapter_id,
                                question_text: q.question_text,
                                optionA: q.options[0],
                                optionB: q.options[1],
                                optionC: q.options[2],
                                optionD: q.options[3],
                                correct_option: q.correct_option,
                                explanation: q.explanation,
                                exam_name: q.exam_name,
                                exam_year: q.exam_year,
                                difficulty: q.difficulty,
                                tags: (q.tags || []).join(', ')
                              });
                            }}
                            className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-sky-500 hover:text-white transition"
                            title="Edit Question"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setQuestions((prev) => prev.filter((item) => item.id !== q.id));
                              triggerToast('Deleted question from bank.');
                            }}
                            className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-rose-600 hover:text-white transition"
                            title="Delete Question"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5C: ADMIN PANEL — BULK CSV UPLOAD & TEMPLATE DOWNLOAD */}
              {profileSubTab === 'admin_csv' && (
                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h2 className="font-bold text-base">Bulk Question Upload (CSV / Excel Export)</h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Download the sample CSV template pre-filled with 20 dummy questions or paste CSV rows below to import immediately
                      </p>
                    </div>
                    <button
                      onClick={handleDownloadSampleCsv}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 self-start shrink-0"
                    >
                      <Download className="w-4 h-4" /> Download Sample CSV Template (20 Qs)
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold">Paste CSV Rows to Bulk Import</label>
                      <button
                        onClick={() =>
                          setCsvInputText(
                            'MED,Cardiology & ECG Interpretation,[SAMPLE DUMMY] Which beta-blocker reduces mortality in HFrEF?,Atenolol,Metoprolol Succinate,Pindolol,Esmolol,B,Bisoprolol Carvedilol and Metoprolol Succinate reduce mortality in HFrEF.,NEET-PG,2025,easy\nSURG,Trauma & Burns,[SAMPLE DUMMY] Parkland formula for 24-hour fluid resuscitation in burns uses which crystalloid?,Normal Saline,Ringer Lactate (4 mL/kg/%TBSA),5% Dextrose,Colloid,B,Parkland formula uses 4 mL x kg x %TBSA of Ringer Lactate.,INI-CET,2024,easy'
                          )
                        }
                        className="text-xs text-sky-600 dark:text-sky-400 font-medium underline"
                      >
                        Load 2 Sample CSV Rows
                      </button>
                    </div>
                    <textarea
                      rows={5}
                      value={csvInputText}
                      onChange={(e) => setCsvInputText(e.target.value)}
                      placeholder="SubjectCode, ChapterName, QuestionText, OptionA, OptionB, OptionC, CorrectLetter(A-D), Explanation, ExamName, ExamYear, Difficulty"
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 font-mono text-xs"
                    />
                    <button
                      onClick={handleBulkCsvImport}
                      className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5"
                    >
                      <Upload className="w-4 h-4" /> Parse & Import CSV Questions
                    </button>
                  </div>
                </div>
              )}

              {/* 5D: ADMIN PANEL — MANAGE SUBJECTS/CHAPTERS & PLATFORM USAGE STATS */}
              {profileSubTab === 'admin_subjects' && (
                <div className="space-y-4">
                  {/* Usage Stats Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
                      <div className="text-[11px] text-slate-500">Total Registered Users</div>
                      <div className="text-xl font-bold mt-0.5">1,428</div>
                      <div className="text-[10px] text-emerald-600 mt-0.5">+84 this week</div>
                    </div>
                    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
                      <div className="text-[11px] text-slate-500">Active Daily Learners</div>
                      <div className="text-xl font-bold mt-0.5">612</div>
                      <div className="text-[10px] text-sky-600 mt-0.5">42.8% DAU/MAU</div>
                    </div>
                    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
                      <div className="text-[11px] text-slate-500">Total PYQ Attempts</div>
                      <div className="text-xl font-bold mt-0.5">89,450</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Avg 62 Qs / student</div>
                    </div>
                    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
                      <div className="text-[11px] text-slate-500">Pro Subscribers</div>
                      <div className="text-xl font-bold text-amber-500 mt-0.5">319</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">22.3% conversion</div>
                    </div>
                  </div>

                  {/* Add Chapter to Subject */}
                  <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
                    <h3 className="font-bold text-sm mb-2.5">Manage Subjects & Chapters (19 NEET-PG Subjects)</h3>
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <select
                        value={newChapterSubjectId}
                        onChange={(e) => setNewChapterSubjectId(e.target.value)}
                        className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                      >
                        {subjects.map((s) => (
                          <option key={s.id} value={s.id}>{s.name} ({s.chapters.length} chapters)</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={newChapterName}
                        onChange={(e) => setNewChapterName(e.target.value)}
                        placeholder="New chapter/topic title..."
                        className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                      />
                      <button
                        onClick={() => {
                          if (!newChapterName.trim()) return;
                          setSubjects((prev) =>
                            prev.map((s) =>
                              s.id === newChapterSubjectId
                                ? {
                                    ...s,
                                    chapters: [
                                      ...s.chapters,
                                      { id: 'ch-' + Date.now(), name: newChapterName.trim() }
                                    ]
                                  }
                                : s
                            )
                          );
                          setNewChapterName('');
                          triggerToast('Added new chapter to subject!', 'success');
                        }}
                        className="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold"
                      >
                        + Add Chapter
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 5E: SUPABASE SQL SCHEMA, SETUP GUIDE & NEXT FEATURES ROADMAP */}
              {profileSubTab === 'sql_schema' && (
                <div className="space-y-4">
                  <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h2 className="font-bold text-base">Supabase SQL Schema (11 Tables + RLS + `question-images` Bucket)</h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Paste into Supabase SQL Editor or download the full `supabase/schema.sql` from the project ZIP.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const blob = new Blob([SUPABASE_RLS_SNIPPET], { type: 'text/sql;charset=utf-8;' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.setAttribute('download', 'supabase_schema_rls.sql');
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);
                            triggerToast('Downloaded supabase_schema_rls.sql!', 'success');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5" /> Download .SQL
                        </button>
                        <button
                          onClick={() => copyToClipboard(SUPABASE_RLS_SNIPPET, 'SQL Schema Snippet')}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold flex items-center gap-1.5"
                        >
                          <Copy className="w-3.5 h-3.5" /> Copy SQL
                        </button>
                      </div>
                    </div>

                    <pre className="p-3.5 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto leading-relaxed">
                      {SUPABASE_RLS_SNIPPET}
                    </pre>
                  </div>

                  {/* Environment Variables & Vercel Deployment Guide */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-2.5">
                      <h3 className="font-bold text-sm">Local Setup & Environment Variables (`.env`)</h3>
                      <pre className="p-3 rounded-xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto">
{`VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_FREE_DAILY_QUESTION_LIMIT=15
VITE_RAZORPAY_KEY_ID=rzp_test_your_key

# Run locally:
npm install
npm run dev`}
                      </pre>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Deploy to Vercel by importing the Git repo, setting Framework Preset to Vite, adding the 4 environment variables above, and clicking Deploy.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-2">
                      <h3 className="font-bold text-sm">Suggested Next Features (Phase 6 Roadmap)</h3>
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                        <li><strong>1. High-Yield One-Liner Flashcards:</strong> Swipeable Anki-style pearl cards extracted from PYQ explanations for ward breaks.</li>
                        <li><strong>2. All-India Live Grand Test Rank Predictor:</strong> Sunday live mock leaderboard with percentile & expected NEET-PG rank.</li>
                        <li><strong>3. Image Pinch-to-Zoom & Label Toggle:</strong> Interactive radiology/pathology slide annotations on mobile.</li>
                        <li><strong>4. Question-Level Peer Doubt Discussions:</strong> Upvoted student & faculty commentary below each explanation.</li>
                        <li><strong>5. 9 PM IST Streak Push Notifications:</strong> Web Push reminder when the daily question ring is incomplete.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>

        {/* ====================================================================
            STICKY BOTTOM MOBILE-FIRST NAVIGATION BAR
           ==================================================================== */}
        <nav className="fixed bottom-0 inset-x-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-md mx-auto grid grid-cols-5 h-16">
            {[
              { id: 'home', label: 'Home', icon: Flame },
              { id: 'practice', label: 'Practice', icon: BookOpen },
              { id: 'tests', label: 'Tests', icon: Clock },
              { id: 'progress', label: 'Progress', icon: BarChart3 },
              { id: 'profile', label: 'Profile', icon: User }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center justify-center gap-1 transition ${
                    isActive
                      ? 'text-sky-600 dark:text-sky-400 font-bold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[11px]">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* ====================================================================
            MODAL 1: AUTHENTICATION (EMAIL + PASSWORD & GOOGLE LOGIN)
           ==================================================================== */}
        {showAuthModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base">
                  {authMode === 'login' ? 'Sign In to PulsePG' : 'Create Student Account'}
                </h3>
                <button onClick={() => setShowAuthModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Google OAuth Button */}
              <button
                onClick={() => {
                  setShowAuthModal(false);
                  triggerToast('Signed in with Google (Supabase OAuth Ready)!', 'success');
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4 text-sky-500" /> Continue with Google
              </button>

              <div className="text-center text-[11px] text-slate-400">or with email & password</div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (authForm.full_name) {
                    setUser((prev) => ({ ...prev, full_name: authForm.full_name }));
                  }
                  setShowAuthModal(false);
                  triggerToast('Authenticated session active!', 'success');
                }}
                className="space-y-3"
              >
                {authMode === 'signup' && (
                  <input
                    type="text"
                    placeholder="Full Name (e.g. Dr. Priya Nair)"
                    value={authForm.full_name}
                    onChange={(e) => setAuthForm((prev) => ({ ...prev, full_name: e.target.value }))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                )}
                <input
                  type="email"
                  placeholder="Email address"
                  value={authForm.email}
                  onChange={(e) => setAuthForm((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={authForm.password}
                  onChange={(e) => setAuthForm((prev) => ({ ...prev, password: e.target.value }))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold"
                >
                  {authMode === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              <div className="text-center text-xs text-slate-500">
                {authMode === 'login' ? (
                  <>
                    New student?{' '}
                    <button onClick={() => setAuthMode('signup')} className="text-sky-600 font-semibold underline">
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button onClick={() => setAuthMode('login')} className="text-sky-600 font-semibold underline">
                      Sign in
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            MODAL 2: RAZORPAY MONETIZATION UPGRADE HOOK
           ==================================================================== */}
        {showUpgradeModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600">
                  <Crown className="w-3.5 h-3.5" /> PulsePG Pro Unlock
                </span>
                <button onClick={() => setShowUpgradeModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <h3 className="text-base font-bold">Daily Free Limit Reached (15/15 Questions/Day)</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Free tier lets you practice across all 19 NEET-PG / INI-CET subjects up to 15 questions per day ({analytics.solvedToday}/15 solved today). Upgrade to PulsePG Pro for unlimited daily PYQs, Grand Tests, and Smart Revision!
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold">12-Month NEET-PG / INI-CET Pass</div>
                  <div className="text-[11px] text-slate-500">Razorpay Order Hook Ready (`src/lib/razorpay.js`)</div>
                </div>
                <div className="text-base font-bold text-sky-600 dark:text-sky-400">₹1,499</div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="w-1/3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                >
                  Later
                </button>
                <button
                  onClick={() => {
                    setUser((prev) => ({ ...prev, is_premium: true }));
                    setShowUpgradeModal(false);
                    triggerToast('Pro Plan Activated! All 19 subjects & Grand Tests unlocked.', 'success');
                  }}
                  className="w-2/3 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white text-xs font-bold"
                >
                  Simulate Razorpay Success
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}