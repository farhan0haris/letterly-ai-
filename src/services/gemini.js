import { GoogleGenerativeAI } from '@google/generative-ai';
import { generatePrompt } from '../utils/constants';

/**
 * Parses Google Generative AI errors into clean, user-friendly messages.
 */
const getCleanErrorMessage = (error) => {
  const msg = error?.message || String(error);

  if (msg.includes('quota') || msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED')) {
    return 'You have exceeded the free API rate limit. Please wait 1-2 minutes and try again.';
  }
  if (msg.includes('API_KEY_INVALID') || msg.includes('401') || msg.includes('UNAUTHENTICATED')) {
    return 'Your API key is invalid. Please check your key or generate a new one at aistudio.google.com/apikey';
  }
  if (msg.includes('PERMISSION_DENIED') || msg.includes('403')) {
    return 'API key does not have permission. Please generate a new key at aistudio.google.com/apikey';
  }
  if (msg.includes('SAFETY') || msg.includes('blocked')) {
    return 'The AI flagged the content. Please adjust your resume or job description and try again.';
  }
  if (msg.includes('fetch') || msg.includes('network') || msg.includes('Failed to fetch')) {
    return 'Network error. Please check your internet connection and try again.';
  }
  if (msg.includes('model') && msg.includes('not found')) {
    return 'AI model is temporarily unavailable. Please try again in a few minutes.';
  }

  return 'Unable to generate cover letter. Please try again in a moment.';
};

export const generateCoverLetter = async (apiKey, resumeText, jobDescription, companyName, position, tone) => {
  if (!apiKey) throw new Error('API key is required. Please add your Gemini API key.');
  if (!resumeText) throw new Error('Please upload your resume.');
  if (!jobDescription) throw new Error('Please enter the job description.');
  if (!companyName) throw new Error('Please enter the company name.');

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = generatePrompt(resumeText, jobDescription, companyName, position, tone);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) throw new Error('Empty response from AI.');

    return text.trim();
  } catch (error) {
    throw new Error(getCleanErrorMessage(error));
  }
};
