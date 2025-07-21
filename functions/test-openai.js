// Simple test script for OpenAI function
require('dotenv').config({ path: '.env.local' });
const { OpenAI } = require('openai');

async function testOpenAI() {
  try {
    console.log('Initializing OpenAI...');
    
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    console.log('Calling OpenAI API...');

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are Denarii, a wise financial advisor inspired by Charlie Munger.'
        },
        { role: 'user', content: 'Should I buy a new car?' }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    console.log('OpenAI API response received');
    console.log(completion.choices[0]?.message?.content);
  } catch (error) {
    console.error('OpenAI error:', error);
  }
}

testOpenAI();