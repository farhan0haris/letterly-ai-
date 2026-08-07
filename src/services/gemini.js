import { generatePrompt } from '../utils/constants';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

/**
 * Parses Groq API errors into clean, user-friendly messages.
 */
const getCleanErrorMessage = (error) => {
  const msg = error?.message || String(error);

  if (msg.includes('rate_limit') || msg.includes('429') || msg.includes('quota')) {
    return 'You have exceeded the free API rate limit. Please wait 1-2 minutes and try again.';
  }
  if (msg.includes('invalid_api_key') || msg.includes('401') || msg.includes('Unauthorized')) {
    return 'Your API key is invalid. Please check your key or generate a new one at console.groq.com';
  }
  if (msg.includes('403') || msg.includes('permission')) {
    return 'API key does not have permission. Please generate a new key at console.groq.com';
  }
  if (msg.includes('safety') || msg.includes('blocked') || msg.includes('content_filter')) {
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
  if (!apiKey) throw new Error('API key is required. Please add your Groq API key.');
  if (!resumeText) throw new Error('Please upload your resume.');
  if (!jobDescription) throw new Error('Please enter the job description.');
  if (!companyName) throw new Error('Please enter the company name.');

  try {
    const prompt = generatePrompt(resumeText, jobDescription, companyName, position, tone);

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are an experienced HR recruiter and career consultant. Output your response strictly in the requested JSON format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1024,
        response_format: { type: 'json_object' }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMsg = errorData?.error?.message || `API request failed with status ${response.status}`;
      throw new Error(errorMsg);
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content;

    if (!text) throw new Error('Empty response from AI.');
    
    try {
      const parsed = JSON.parse(text);
      return parsed;
    } catch (e) {
      // Fallback if AI somehow fails to return valid JSON
      console.error('Failed to parse AI response as JSON:', text);
      return {
        coverLetter: text.trim(),
        interviewQuestions: [],
        matchedKeywords: []
      };
    }
  } catch (error) {
    throw new Error(getCleanErrorMessage(error));
  }
};
