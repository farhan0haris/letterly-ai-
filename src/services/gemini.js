import { GoogleGenerativeAI } from '@google/generative-ai';
import { generatePrompt } from '../utils/constants';

export const generateCoverLetter = async (apiKey, resumeText, jobDescription, companyName, position, tone) => {
  if (!apiKey) throw new Error('API key is required');
  if (!resumeText) throw new Error('Please upload your resume.');
  if (!jobDescription) throw new Error('Please enter the job description.');
  if (!companyName) throw new Error('Please enter the company name.');

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = generatePrompt(resumeText, jobDescription, companyName, position, tone);

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  if (!text) throw new Error('Unable to generate cover letter. Please try again.');

  return text.trim();
};
