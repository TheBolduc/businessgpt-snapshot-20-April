<script lang="ts">
  import ChatMessage from '$lib/components/ChatMessage.svelte';
  import type { ChatCompletionRequestMessage } from 'openai';
  import { SSE } from 'sse.js';

  let query: string = '';
  let answer: string = '';
  let loading: boolean = false;
  let chatMessages: ChatCompletionRequestMessage[] = [];

  let scrollToDiv: HTMLDivElement;
  let inputField: HTMLInputElement;
  let chatContainer: HTMLDivElement;

  $: {
    if (scrollToDiv) {
      scrollToDiv.scrollIntoView({ behavior: 'smooth' });
    }
  }

  async function handleSubmit() {
    if (loading) {
      return;
    }

    if (!query.trim()) {
      return;
    }

    loading = true;
    chatMessages = [...chatMessages, { role: 'user', content: query }];
    const eventSource = new SSE('/api/chat', {
      headers: {
        'Content-Type': 'application/json',
      },
      payload: JSON.stringify({ messages: chatMessages }),
    });
    query = '';
    inputField.disabled = true;
    eventSource.addEventListener('error', handleError);
    eventSource.addEventListener('message', (e) => {
      try {
        if (e.data === '[DONE]') {
          chatMessages = [...chatMessages, { role: 'assistant', content: answer }];
          answer = '';
          eventSource.close(); // Close the connection
          loading = false;
          inputField.disabled = false;
          scrollToDiv.scrollIntoView({ behavior: 'smooth' });
          return;
        }
        const completionResponse = JSON.parse(e.data);
        const [{ delta }] = completionResponse.choices;
        if (delta.content) {
          answer = (answer ?? '') + delta.content;
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      } catch (err) {
        handleError(err);
      }
    });
    eventSource.stream();
  }

  function handleError<T>(err: T) {
    loading = false;
    query = '';
    answer = '';
    inputField.disabled = false;
    console.error(err);
  }
</script>

<style>
  ::placeholder {
    color: #8e8e9e;
  }
</style>

<main>
  <div class="chatbot-wrapper">
    <div class="flex flex-col min-h-screen pt-4 w-full px-8 items-center gap-2">
      <div class="flex flex-col w-full max-w-screen-md bg-white p-6 rounded-lg shadow-lg">
        <div class="flex flex-col items-center justify-center mb-4">
          <h1 class="text-2xl font-bold w-full text-center">BusinessGPT</h1>
          <p class="text-sm italic">
            Your own personal business analyst and assistant.
          </p>
          <div class="w-full border-b border-gray-400 mb-6"></div>
        </div>
        <div class="flex flex-col pt-4 w-full h-full px-8 items-center gap-2">
          <div class="flex flex-col gap-2 h-[calc(100vh-300px)] overflow-y-auto mt-4 mb-4" bind:this={chatContainer}>
            <ChatMessage
              type="assistant"
              message="Hi! My name is Tommy, ask me any business-related questions, I'm here to help you grow your business, learn about business, start your business and much more!"
            />
            {#each chatMessages as message}
              <ChatMessage type={message.role} message={message.content} />
            {/each}
            {#if answer}
              <ChatMessage type="assistant" message={answer} />
            {/if}
            {#if loading && !answer}
              <ChatMessage type="assistant" message="Loading.." />
            {/if}
          </div>
          <div class="" bind:this={scrollToDiv} />
        </div>
        <form
          class="flex w-full rounded-md bg-gray-200 py-6 px-2 shadow-inner space-x-2"
          on:submit|preventDefault={() => handleSubmit()}
        >
          <input
            type="text"
            class="input input-bordered w-full shadow bg-white text-black"
            bind:this={inputField}
            bind:value={query}
            placeholder="Ask me anything about business..."
            disabled={loading}
          />
          <button
            type="submit"
            class="btn btn-primary bg-green-500 hover:bg-green-600 border border-green-500 hover:border-green-600"
            disabled={loading}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  </div>
</main>
