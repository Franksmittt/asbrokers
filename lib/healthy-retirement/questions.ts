export const HEALTH_QUESTIONS = [
  {
    id: "age",
    question: "How old are you?",
    options: [
      { value: "under-50", label: "Under 50" },
      { value: "50-59", label: "50–59" },
      { value: "60-69", label: "60–69" },
      { value: "70+", label: "70+" },
    ],
  },
  {
    id: "exerciseDays",
    question: "How many days per week do you exercise?",
    options: [
      { value: "0", label: "0" },
      { value: "1-2", label: "1–2" },
      { value: "3-4", label: "3–4" },
      { value: "5+", label: "5+" },
    ],
  },
  {
    id: "walk30Minutes",
    question: "Can you comfortably walk for 30 minutes without stopping?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: "smoke",
    question: "Do you currently smoke?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: "sleepHours",
    question: "How many hours do you sleep most nights?",
    options: [
      { value: "less-than-6", label: "Less than 6" },
      { value: "6-7", label: "6–7" },
      { value: "7-8", label: "7–8" },
      { value: "more-than-8", label: "More than 8" },
    ],
  },
  {
    id: "checkup12Months",
    question: "Have you had a medical check-up in the last 12 months?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: "knowBloodPressure",
    question: "Do you know your blood pressure?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: "knowCholesterol",
    question: "Do you know your cholesterol level?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: "healthRating",
    question: "How would you rate your current health?",
    options: [
      { value: "poor", label: "Poor" },
      { value: "fair", label: "Fair" },
      { value: "good", label: "Good" },
      { value: "excellent", label: "Excellent" },
    ],
  },
  {
    id: "retirement20Years",
    question: "Do you believe your health will allow you to enjoy retirement for the next 20 years?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "unsure", label: "Unsure" },
    ],
  },
] as const;

export type HealthQuestionId = (typeof HEALTH_QUESTIONS)[number]["id"];

export type HealthyRetirementAnswers = {
  [K in HealthQuestionId]: string;
};
