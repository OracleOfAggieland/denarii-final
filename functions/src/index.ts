import { onRequest } from 'firebase-functions/v2/https';
import { setGlobalOptions } from 'firebase-functions/v2';
import { defineSecret } from 'firebase-functions/params';
import OpenAI from 'openai';

// Define the secret
const openaiApiKey = defineSecret('OPENAI_API_KEY');

// Set global options
setGlobalOptions({
  maxInstances: 10,
  region: 'us-central1'
});

export const chat = onRequest(
  {
    cors: true,
    timeoutSeconds: 60,
    invoker: 'public',
    secrets: [openaiApiKey],
  },
  async (req, res) => {
    console.log('OpenAI Function called with method:', req.method);
    console.log('OpenAI Function called with body:', req.body);

    if (req.method === 'OPTIONS') {
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Access-Control-Allow-Methods', 'POST');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
      res.status(204).send('');
      return;
    }

    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method Not Allowed' });
      return;
    }

    try {
      const { message, conversationHistory } = req.body;

      if (!message) {
        res.status(400).json({ error: 'Message is required' });
        return;
      }

      console.log('Initializing OpenAI...');
      
      // Initialize OpenAI
      const openai = new OpenAI({
        apiKey: openaiApiKey.value(),
      });

      console.log('Building messages for OpenAI...');

      // Build messages for ChatGPT
      const messages = [
        {
          role: 'system' as const,
          content: 'You are Denarii, a wise financial advisor inspired by Charlie Munger. Help users make rational purchasing decisions by asking about their needs, budget, and long-term goals. Be practical and insightful.'
        },
        ...(conversationHistory || []),
        { role: 'user' as const, content: message }
      ];

      console.log('Calling OpenAI API...');

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      });

      console.log('OpenAI API response received');

      const response = completion.choices[0]?.message?.content;

      if (!response) {
        console.error('No response from OpenAI');
        res.status(500).json({ error: 'No response from AI' });
        return;
      }

      console.log('Sending response:', response.substring(0, 100) + '...');
      res.json({ response });

    } catch (error: any) {
      console.error('OpenAI error:', error);
      res.status(500).json({ 
        error: 'Failed to get AI response',
        details: error.message 
      });
    }
  }
);