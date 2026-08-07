export const APP_NAME = 'Letterly AI';
export const APP_TAGLINE = 'Generate ATS-Friendly Cover Letters in Seconds with AI';
export const DEFAULT_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';

export const WRITING_TONES = [
  { value: 'professional', label: 'Professional', description: 'Balanced and business-appropriate' },
  { value: 'formal', label: 'Formal', description: 'Traditional and structured' },
  { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
  { value: 'confident', label: 'Confident', description: 'Bold and assertive' },
  { value: 'concise', label: 'Concise', description: 'Brief and to the point' },
  { value: 'jedi', label: 'Jedi Mind Trick', description: 'Highly persuasive and subtly humorous' },
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
Generate a personalized cover letter, interview prep questions, and keyword matches.

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

Rules for Cover Letter:
- Never invent skills, work experience, or projects.
- Never exaggerate achievements.
- Use only information available inside the uploaded resume.
- Match the candidate with the job description.
- Maintain the selected writing tone: ${tone}.
- Keep between 250 and 350 words.
- Include: Professional Greeting, Opening Paragraph, Skills Alignment, Why Candidate Fits, Professional Closing.

Rules for Output:
You must return ONLY a valid JSON object with the following exact structure:
{
  "coverLetter": "The complete cover letter text...",
  "interviewQuestions": [
    "Question 1 based on their resume gap...",
    "Question 2...",
    "Question 3..."
  ],
  "matchedKeywords": [
    "Keyword 1 from JD found in Resume",
    "Keyword 2",
    "Keyword 3"
  ]
}

Ensure the response is valid, parseable JSON. Do not include markdown formatting like \`\`\`json or any other text before or after the JSON.`;
};

export const STORAGE_KEYS = {
  THEME: 'letterly-theme',
  API_KEY: 'letterly-api-key',
  HISTORY: 'letterly-history',
  FORM_DATA: 'letterly-form-data',
};
