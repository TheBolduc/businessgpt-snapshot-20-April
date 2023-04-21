<script context="module">
  import { loadOpenAIChatbot } from '$lib/loadOpenAIChatbot';
  export async function load({ page }) {
    const chatbotId = page.params.chatbotId;
    return { props: { chatbotId } };
  }
</script>

<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import ChatMessage from '$lib/components/ChatMessage.svelte';
  import { chatHandler } from '$lib/chatHandler';
  
  export let chatbotId;
  let chatInstance;

  onMount(async () => {
    chatInstance = await chatHandler(chatbotId);
    chatInstance.startChat();
  });

  function goHome() {
    goto('/');
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

