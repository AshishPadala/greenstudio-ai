# 🌱 GreenStudio AI  
**Eco-Optimized Conversational AI Layer**

GreenStudio AI is a sustainability-aware AI chat system that demonstrates how **large language models can reduce environmental impact** by generating **concise, task-focused responses** while transparently tracking **token usage, energy, water, and CO₂ savings** in real time.

This project was built for the **Gemini Hackathon**, focusing on the idea that *every unnecessary token has a real environmental cost*.

---

## 🌍 Inspiration

The inspiration for GreenStudio AI came from **Priya’s work on CO₂ tracking for aeroplanes**.  
That project highlighted how invisible emissions can be measured and optimized.

At the same time, there has been growing concern about the **water and electricity consumption of large language models (LLMs)**. This sparked the idea:

> *What if AI systems could make their environmental cost visible — and actively reduce it?*

GreenStudio AI explores that idea by combining **concise AI responses** with **real-time eco-impact metrics**.

---

## 🚀 What It Does

- Provides a **chat interface** similar to ChatGPT
- Forces **minimal, efficient AI responses** to reduce token usage
- Calculates and displays **eco impact per response**:
  - Tokens used
  - Energy saved (kWh)
  - Water saved (litres)
  - CO₂ saved (grams)
- Aggregates **session-wide sustainability metrics**
- Includes **dark mode** and a clean, modern UI
- Uses a **serverless backend** for secure API handling

---

### Key Design Choices
- **Serverless backend** to protect API keys
- **REST-based Gemini integration** for reliability
- **One-sentence response constraint** to reduce waste
- **Real-time eco metrics** calculated from token usage
- **Netlify deployment** for fast, scalable hosting

---

## 🧰 Built With

- **Frontend**
  - React
  - TypeScript
  - Vite
  - CSS (custom styling)

- **Backend**
  - Netlify Functions
  - Node.js

- **AI**
  - Google Gemini API (via REST)

- **Deployment**
  - GitHub
  - Netlify

---
