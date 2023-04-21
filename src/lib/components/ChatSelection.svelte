<script>
  export let chatbotOptions = [];
  export let onSelect;
</script>

<div class="flex flex-wrap gap-4 justify-center">
  {#each chatbotOptions as chatbot}
    <button
      class="btn btn-primary"
      on:click={() => onSelect(chatbot)}
    >
      {chatbot.name}
    </button>
  {/each}
</div>
