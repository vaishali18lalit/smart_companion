const axios = require('axios');
require('dotenv').config();

async function testOpenRouterAPI() {
  try {
    console.log('Testing OpenRouter API with GPT-OSS-20B...');
    
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: 'microsoft/wizardlm-2-8x22b',
      messages: [{ role: 'user', content: 'Say hello and explain what 2+2 equals in one sentence.' }],
      max_tokens: 100
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Smart Knowledge Companion'
      },
      timeout: 15000
    });
    
    console.log('✅ SUCCESS!');
    console.log('Response:', response.data.choices[0].message.content);
    console.log('Model used:', response.data.model);
    
  } catch (error) {
    console.log('❌ FAILED!');
    console.log('Error:', error.response?.data || error.message);
    
    // Try alternative model
    console.log('\nTrying alternative model: google/gemma-2-27b-it...');
    
    try {
      const altResponse = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
        model: 'google/gemma-2-27b-it',
        messages: [{ role: 'user', content: 'What is artificial intelligence? Answer in one sentence.' }],
        max_tokens: 50
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'Smart Knowledge Companion'
        },
        timeout: 15000
      });
      
      console.log('✅ Alternative model SUCCESS!');
      console.log('Response:', altResponse.data.choices[0].message.content);
      console.log('Model used:', altResponse.data.model);
      
    } catch (altError) {
      console.log('❌ Alternative model also failed!');
      console.log('Error:', altError.response?.data || altError.message);
    }
  }
}

testOpenRouterAPI();