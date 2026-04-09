# 🚀 CalorAI Assignment - Telegram Health Bot with A/B Testing

## 📌 Overview
This project is a Telegram-based Health Chatbot that allows users to log meals, track activity, and experience different onboarding flows using A/B Testing.

The goal is to evaluate whether a guided onboarding experience improves user engagement and retention.

---

## 🧠 Features

### ✅ Primary Task (A/B Testing)
- Users are randomly assigned to:
  - Control Group → Simple welcome message
  - Test Group → 3-step onboarding flow
- Event logging for:
  - User join
  - Onboarding steps
  - Meal actions

---

### 🥗 Secondary Task (Health Chatbot)
Users can:
- Add meals (`/addmeal`)
- View meals (`/meals`)
- Delete meals (`/delete <number>`)

---

### 📊 Bonus Task (Analytics Dashboard)
- Displays:
  - A/B test user distribution
  - Event logs
- Built using React + Chart.js

---

## ⚙️ Tech Stack

- Backend: Node.js, Express  
- Bot: node-telegram-bot-api (Polling)  
- Frontend: React (Vite)  
- Charts: Chart.js  
- Other: dotenv, cors  

---

## 🏗️ Architecture
```
Telegram User → Telegram Bot (Node.js)
↓
Business Logic (A/B + Meals)
↓
In-Memory Storage
↓
Express API (Events + Meals)
↓
React Dashboard
```


---

## 🚀 Setup Instructions

### 1. Clone Repository

```
git clone <your-repo-link>
cd backend
```


---

### 2. Install Dependencies
```
npm install
```

---

### 3. Add Environment Variables

Create `.env` file:

```
BOT_TOKEN=your_telegram_bot_token
```


---

### 4. Run Backend

```
node server.js
```

---

### 5. Run Dashboard

```
cd dashboard
npm install
npm run dev
```


---

## 📊 API Endpoints

- GET /events → Returns all user events  
- GET /meals-data → Returns meal data  

---

## 🧪 Evaluation Plan

### 🎯 Primary Metric
- Onboarding Completion Rate

### ⚠️ Guardrail Metric
- Bot drop-off rate

### 📈 Secondary Metrics
- Meal logging activity  
- User engagement  

### 🧠 Decision Framework
- If Test Group performs better → adopt onboarding  
- Otherwise → keep control flow  

---

## ⏱️ Time Breakdown

- A/B Testing: 3 hrs  
- Health Chatbot: 4 hrs  
- Dashboard: 2 hrs  
- Debugging: 2 hrs  

---

## ⚖️ Assumptions & Trade-offs

- Used in-memory storage (can be replaced with database)
- Used polling instead of webhook for simplicity
- Focused more on functionality than UI

---

## 🎥 Walkthrough Video
(Add your video link here)

---

## 📌 Future Improvements
- Add database (MongoDB/Firebase)
- Integrate Statsig for real A/B testing
- Add real-time updates & notifications
- Improve UI/UX

---

## 🙌 Conclusion
This project demonstrates:
- A/B testing implementation  
- Chatbot development  
- Full-stack integration  
- Product thinking & analytics  
