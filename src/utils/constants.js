export const APP_NAME = 'Letterly AI';
export const APP_TAGLINE = 'Generate ATS-Friendly Cover Letters in Seconds with AI';
export const DEFAULT_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

export const WRITING_TONES = [
  { value: 'professional', label: 'Professional', description: 'Balanced and business-appropriate' },
  { value: 'formal', label: 'Formal', description: 'Traditional and structured' },
  { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
  { value: 'confident', label: 'Confident', description: 'Bold and assertive' },
  { value: 'concise', label: 'Concise', description: 'Brief and to the point' },
];

export const ACCEPTED_FILE_TYPES = {
  'application/pdf': ['.pdf'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'text/plain': ['.txt'],
};

export const ACCEPTED_EXTENSIONS = ['.pdf', '.docx', '.txt'];

export const generatePrompt = (resumeText, jobDescription, companyName, position, tone) => {
  return `You are an experienced HR recruiter and career consultant.

Read the uploaded resume carefully.
Read the provided job description.
Generate a personalized cover letter.

Candidate Resume:
---
${resumeText}
---

Job Description:
---
${jobDescription}
---

Company: ${companyName}
Position: ${position}
Writing Tone: ${tone}

Rules:
- Never invent skills.
- Never invent work experience.
- Never invent projects.
- Never exaggerate achievements.
- Use only information available inside the uploaded resume.
- Match the candidate with the job description.
- Maintain the selected writing tone: ${tone}.
- Keep between 250 and 350 words.

Include:
- Professional Greeting
- Opening Paragraph
- Skills Alignment
- Why Candidate Fits
- Professional Closing

Return only the finished cover letter. Do not include any explanations, notes, or metadata.`;
};

export const STORAGE_KEYS = {
  THEME: 'letterly-theme',
  API_KEY: 'letterly-api-key',
  HISTORY: 'letterly-history',
  FORM_DATA: 'letterly-form-data',
};
