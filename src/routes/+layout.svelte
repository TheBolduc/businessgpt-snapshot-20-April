<script>
  import Sidebar from 'businessgpt-snapshot-20-april/src/lib/components/Sidebar.svelte';
  import '../app.css';
</script>

<div class="flex">
  <Sidebar />
  <main class="flex-grow flex flex-col items-center max-w-2xl mx-auto">
    <slot />
  </main>
</div>
