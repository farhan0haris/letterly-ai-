# ⚡ Letterly AI — ATS Cover Letter Generator

Generate ATS-friendly, personalized cover letters in seconds using Groq AI.

![Design](https://img.shields.io/badge/Design-Apple%20HIG%20Inspired-000000?style=for-the-badge&logo=apple&logoColor=white)
![Privacy First](https://img.shields.io/badge/Security-Privacy%20First%20100%25-10B981?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-38BDF8?style=for-the-badge)

---

## ✨ Features

- **AI-Powered Generation**: Leverages Groq AI (Llama 3.3 70B) to analyze your resume and tailor a cover letter to any job description.
- **Premium Design System**: A handcrafted, elegant UI inspired by Apple's Human Interface Guidelines (HIG). Features soft shadows, precise spacing, and smooth micro-interactions.
- **Subtle Star Wars Theming**: Includes hidden, premium easter eggs inspired by the Star Wars universe for observant users to discover.
- **ATS Optimized**: Tailored keyword matching and formatting built to pass Applicant Tracking Systems.
- **Custom Writing Tones**: Choose between Professional, Formal, Friendly, Confident, or Concise.
- **Export & Edit**: Real-time inline editing, 1-click clipboard copy, and professional PDF export.
- **Local Cover Letter History**: Search, preview, and manage all your past cover letters offline in your browser.

---

## 🔒 Security & Privacy Architecture

Letterly AI is designed with strict **privacy-first** principles:

- **100% Client-Side Processing**: Your resume text, job descriptions, and generated cover letters never leave your browser. No middleman backend server exists.
- **Zero Data Collection**: No user tracking, analytics, or remote database logging.
- **Safe Document Extraction**: PDF, DOCX, and TXT files are parsed locally inside the browser memory.

---

## 🔑 Groq API Keys

Letterly AI is built on top of [Groq](https://console.groq.com/keys) to leverage the blazingly fast Llama 3.3 70B model.

The application comes with a built-in API key so you can start generating instantly out of the box. However, if you are a heavy user or wish to deploy this yourself, you can easily use your own Groq API key:

1. Click the **API Key** button (or ⚙️ settings icon) in the navigation bar.
2. Paste your personal Groq API key into the secure modal.
3. Your key is stored securely in your browser's `localStorage` and is never sent anywhere except directly to Groq's API.

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

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 8, React Router v7
- **Styling**: Vanilla CSS (Custom Design System, Zero Frameworks)
- **AI Engine**: Groq API — Llama 3.3 70B Versatile
- **Document Parsing**: `pdfjs-dist`, `mammoth`
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
