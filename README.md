# ⚡ Letterly AI — ATS Cover Letter Generator

Generate ATS-friendly, personalized cover letters in seconds using Google Gemini AI.

![Star Wars Theme](https://img.shields.io/badge/Theme-Star%20Wars%20Galactic-FFE81F?style=for-the-badge&logoColor=black)
![Privacy First](https://img.shields.io/badge/Security-Privacy%20First%20100%25-10B981?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-38BDF8?style=for-the-badge)

---

## 🔒 Security & Privacy Architecture

Letterly AI is designed with strict **privacy-first** principles:

- **100% Client-Side Processing**: Your resume text, job descriptions, and generated cover letters never leave your browser. No middleman backend server exists.
- **Local API Key Storage**: Your Google Gemini API key is stored strictly in your browser's local storage (`localStorage`). It is sent **only** directly to Google's official Gemini API endpoints.
- **Zero Data Collection**: No user tracking, analytics, or remote database logging.
- **Safe Document Extraction**: PDF, DOCX, and TXT files are parsed locally inside the browser memory.

---

## ✨ Features

- **AI-Powered Generation**: Leverages Google Gemini AI to analyze your resume and tailor a cover letter to any job description.
- **ATS Optimized**: Tailored keyword matching and formatting built to pass Applicant Tracking Systems.
- **Custom Writing Tones**: Choose between Professional, Formal, Friendly, Confident, or Concise.
- **Galactic Star Wars Aesthetic**: Custom dark/light themes inspired by Kyber Gold & High Republic aesthetics.
- **Export & Edit**: Real-time inline editing, 1-click clipboard copy, and professional PDF export.
- **Local Cover Letter History**: Search, preview, and manage all your past cover letters offline in your browser.

---

## 🚀 Quick Start

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/farhan0haris/letterly-ai-.git
   cd letterly-ai-
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Local Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

---

## 🔑 Getting a Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/apikey).
2. Click **Create API Key**.
3. Paste the key into Letterly AI when prompted. It will be saved securely in your local browser storage.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 8, React Router v7
- **Styling**: Vanilla CSS with CSS Custom Properties (Theme Engine)
- **AI Engine**: `@google/generative-ai` (Gemini 2.0 Flash)
- **PDF & Document Parsing**: `pdfjs-dist`, `mammoth`
- **PDF Export**: `jspdf`
- **Icons**: `lucide-react`

---

## 👤 Developer & Contact

Created by **Farhan Haris**.

- **Email**: [farhanharis100@gmail.com](mailto:farhanharis100@gmail.com)
- **Instagram**: [@_farhan.haris](https://instagram.com/_farhan.haris)

---

## 📄 License

Distributed under the MIT License. Feel free to use and modify!
