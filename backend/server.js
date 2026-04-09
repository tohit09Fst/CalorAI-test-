require("dotenv").config();

// ================= IMPORTS =================
const express = require("express");
const cors = require("cors");
const TelegramBot = require("node-telegram-bot-api");

// ================= EXPRESS SETUP =================
const app = express();
app.use(cors());
app.use(express.json());

// ================= TELEGRAM BOT =================
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

console.log("🤖 Bot started...");

// ================= DATA STORAGE =================
const users = {}; // A/B groups
const onboardingState = {}; // onboarding steps
const events = []; // logs
const meals = {}; // meals per user
const mealState = {}; // adding meal state

// ================= EVENT LOG =================
const logEvent = (userId, event, group) => {
  const data = {
    userId,
    event,
    group,
    time: new Date(),
  };
  console.log("📊 Event:", data);
  events.push(data);
};

// ================= START COMMAND =================
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  if (!users[chatId]) {
    const random = Math.random();
    users[chatId] = random < 0.5 ? "control" : "test";
  }

  const group = users[chatId];
  console.log(`👤 User ${chatId} → ${group}`);

  logEvent(chatId, "joined", group);

  if (group === "control") {
    bot.sendMessage(chatId, "Welcome to CalorAI Bot 👋");
  } else {
    bot.sendMessage(chatId, "Welcome! Let’s get started 🚀");
    bot.sendMessage(chatId, "Step 1: What is your name?");
    onboardingState[chatId] = "step1";
  }
});

// ================= ADD MEAL =================
bot.onText(/\/addmeal/, (msg) => {
  const chatId = msg.chat.id;
  mealState[chatId] = "adding";
  bot.sendMessage(chatId, "What did you eat?");
});

// ================= VIEW MEALS =================
bot.onText(/\/meals/, (msg) => {
  const chatId = msg.chat.id;
  const userMeals = meals[chatId] || [];

  if (userMeals.length === 0) {
    bot.sendMessage(chatId, "No meals found ❌");
    return;
  }

  let response = "🍽 Your Meals:\n\n";

  userMeals.forEach((meal, index) => {
    response += `${index + 1}. ${meal.text} (${meal.time.toLocaleTimeString()})\n`;
  });

  bot.sendMessage(chatId, response);
});

// ================= DELETE MEAL =================
bot.onText(/\/delete (\d+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const index = parseInt(match[1]) - 1;

  if (!meals[chatId] || !meals[chatId][index]) {
    bot.sendMessage(chatId, "Invalid meal number ❌");
    return;
  }

  meals[chatId].splice(index, 1);
  bot.sendMessage(chatId, "Meal deleted ✅");
});

// ================= MESSAGE HANDLER =================
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text || text.startsWith("/")) return;

  const group = users[chatId];

  // ===== ONBOARDING FLOW =====
  if (group === "test") {
    if (onboardingState[chatId] === "step1") {
      bot.sendMessage(chatId, `Nice to meet you, ${text}!`);
      bot.sendMessage(chatId, "Step 2: What is your goal? (lose/gain)");
      onboardingState[chatId] = "step2";
      logEvent(chatId, "onboarding_step1", group);
      return;
    }

    if (onboardingState[chatId] === "step2") {
      bot.sendMessage(chatId, "Step 3: You can now log meals using /addmeal 🍔");
      onboardingState[chatId] = "done";
      logEvent(chatId, "onboarding_step2", group);
      return;
    }
  }

  // ===== ADD MEAL FLOW =====
  if (mealState[chatId] === "adding") {
    if (!meals[chatId]) meals[chatId] = [];

    meals[chatId].push({
      text: text,
      time: new Date(),
    });

    bot.sendMessage(chatId, "Meal added ✅");
    mealState[chatId] = null;

    logEvent(chatId, "meal_added", group);
    return;
  }

  // Default reply
  bot.sendMessage(chatId, `You said: ${text}`);
});

// ================= API FOR DASHBOARD =================

// Get events
app.get("/events", (req, res) => {
  res.json(events);
});

// Get meals
app.get("/meals-data", (req, res) => {
  res.json(meals);
});

// ================= START SERVER =================
app.listen(4000, () => {
  console.log("📊 Dashboard API running on http://localhost:4000");
});