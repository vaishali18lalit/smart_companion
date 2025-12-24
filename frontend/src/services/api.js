import axios from 'axios';

const API_BASE = '/api';

export const getContent = async (domain, limit = 10) => {
  const response = await axios.get(`${API_BASE}/content/${domain}?limit=${limit}`);
  return response.data;
};

export const getContentSummary = async (domain, id) => {
  const response = await axios.get(`${API_BASE}/content/${domain}/${id}/summary`);
  return response.data;
};

export const getContentExplanation = async (domain, id) => {
  const response = await axios.get(`${API_BASE}/content/${domain}/${id}/explain`);
  return response.data;
};

export const getMicroBreakContent = async () => {
  const response = await axios.get(`${API_BASE}/content/random/microbreak`);
  return response.data;
};

export const askQuestion = async (question, domain = null) => {
  const response = await axios.post(`${API_BASE}/chat/ask`, { question, domain });
  return response.data;
};

export const generateQuiz = async (topic) => {
  const response = await axios.post(`${API_BASE}/chat/quiz`, { topic });
  return response.data;
};

export const getProgress = async () => {
  const response = await axios.get(`${API_BASE}/progress`);
  return response.data;
};

export const updateProgress = async (topic, quizScore = null) => {
  const response = await axios.post(`${API_BASE}/progress/update`, { topic, quizScore });
  return response.data;
};
export const checkQuizAnswer = async (question, userAnswer, correctAnswer, topic) => {
  const response = await axios.post(`${API_BASE}/quiz/check`, {
    question,
    userAnswer,
    correctAnswer,
    topic
  });
  return response.data;
};