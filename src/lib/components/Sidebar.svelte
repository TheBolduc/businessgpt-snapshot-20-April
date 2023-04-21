<script>
  import { goto } from '$app/navigation';

  function navigateToHome() {
    goto('/');
  }
</script>

<aside class="fixed left-0 top-0 h-full w-64 bg-gray-100 p-4">
  <button
    class="btn btn-primary"
    on:click={navigateToHome}
  >
    Chatbots
  </button>
</aside>
