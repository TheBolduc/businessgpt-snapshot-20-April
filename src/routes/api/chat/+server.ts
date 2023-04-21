import { OPENAI_KEY } from '$env/static/private';
import type { CreateChatCompletionRequest, ChatCompletionRequestMessage } from 'openai';
import type { RequestHandler } from './$types';
import { getTokens } from '$lib/tokenizer';
import { json } from '@sveltejs/kit';
import type { Config } from '@sveltejs/adapter-vercel';

export const config: Config = {
  runtime: 'edge',
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    if (!OPENAI_KEY) {
      throw new Error('OPENAI_KEY env variable not set');
    }

    const requestData = await request.json();

    if (!requestData) {
      throw new Error('No request data');
    }

    const reqMessages: ChatCompletionRequestMessage[] = requestData.messages;
    const selectedChatbot = requestData.selectedChatbot;

    let prompt = '';

    switch (selectedChatbot) {
      case 'chatbot1':
        prompt = 'Prompt for chatbot1 goes here.';
        break;
      case 'chatbot2':
        prompt = 'Prompt for chatbot2 goes here.';
        break;
      case 'chatbot3':
        prompt = 'Prompt for chatbot3 goes here.';
        break;
      case 'chatbot4':
        prompt = 'Prompt for chatbot4 goes here.';
        break;
      case 'chatbot5':
        prompt = 'Prompt for chatbot5 goes here.';
        break;
      case 'chatbot6':
        prompt = 'Prompt for chatbot6 goes here.';
        break;
      default:
        prompt = 'Your name is Tommy and you are working for BusinessGPT. You are a business analyst and expert that worked in the business industry for tons of years. You will solely answer business-related questions and ignore any other type of questions. Every time you will answer a question, your goal will either be to help the entrepreneur increase their sales in their business, achieve their business goal or teach aspiring entrepreneurs. Make sure to be extremely precise every time you answer a question and give a lot of information. Never apologize and always act serious and professional. Also try to use numbers and percentages a lot.';
    }

    let tokenCount = 0;

    reqMessages.forEach((msg) => {
      const tokens = getTokens(msg.content);
      tokenCount += tokens;
    });

    tokenCount += getTokens(prompt);

    if (tokenCount >= 4000) {
      throw new Error('Query too large');
    }

    const messages: ChatCompletionRequestMessage[] = [
      { role: 'system', content: prompt },
      ...reqMessages,
    ];

    const chatRequestOpts: CreateChatCompletionRequest = {
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.8,
      stream: true,
    };

    const chatResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      headers: {
        Authorization: `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(chatRequestOpts),
    });

    if (!chatResponse.ok) {
      const err = await chatResponse.json();
      throw new Error(err.error.message);
    }

    return new Response(chatResponse.body, {
      headers: {
        'Content-Type': 'text/event-stream',
      },
    });
  } catch (err) {
    console.error(err);
    return json({ error: 'There was an error processing your request' }, { status: 500 });
  }
};
