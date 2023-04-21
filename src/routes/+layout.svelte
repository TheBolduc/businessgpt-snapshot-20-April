<script>
  import Sidebar from '../../lib/components/Sidebar.svelte';
  import '../app.css';
</script>

<div class="flex">
  <Sidebar />
  <main class="flex-grow flex flex-col items-center max-w-2xl mx-auto">
    <slot />
  </main>
</div>
