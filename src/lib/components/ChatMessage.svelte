<script lang="ts">
  import type { ChatCompletionRequestMessageRoleEnum } from 'openai'
  export let type: ChatCompletionRequestMessageRoleEnum
  export let message: string
  $: formattedMessage = message.replace(/(\d+[\.-])/g, '<br><br>$1')
</script>

<div class="flex {type === 'user' ? 'justify-end' : 'justify-start'} py-2">
  <div class="hidden md:block w-10 min-w-10 h-10 flex-none">
    {#if type === 'assistant'}
      <img src="https://ui-avatars.com/api/?name=Tommy" alt="Tommy avatar" class="rounded-full w-10 h-10 object-cover" />
    {/if}
    {#if type === 'user'}
      <img src="https://ui-avatars.com/api/?name=User" alt="User avatar" class="rounded-full w-10 h-10 object-cover" />
    {/if}
  </div>
  <div class="px-2">
    {#if type === 'assistant'}
      <div class="text-sm text-gray-500">Tommy</div>
    {/if}
    {#if type === 'user'}
      <div class="text-sm text-gray-500">User</div>
    {/if}
    <div class="{type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-black'} p-2 rounded-lg break-words">
      {@html formattedMessage}
    </div>
  </div>
</div>
