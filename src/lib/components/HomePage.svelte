<!-- HomePage.svelte -->
<script>
  import { goto } from '$app/navigation';
</script>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  .chatbot-option {
    background-color: #f3f4f6;
    border-radius: 0.5rem;
    padding: 1rem;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .chatbot-option:hover {
    background-color: #e5e7eb;
  }
</style>

<div class="grid">
  <div class="chatbot-option" on:click={() => goto('/business-operations')}>Business Operations and Efficiency</div>
  <div class="chatbot-option" on:click={() => goto('/customer-relationship')}>Customer Relationship and Change Management</div>
  <div class="chatbot-option" on:click={() => goto('/data-driven')}>Data-Driven Decision Making and Analytics</div>
  <div class="chatbot-option" on:click={() => goto('/innovation')}>Innovation, Sustainability, and Growth</div>
  <div class="chatbot-option" on:click={() => goto('/sales-marketing')}>Sales, Marketing, and Customer Experience</div>
  <div class="chatbot-option" on:click={() => goto('/workforce-management')}>Workforce Management and Development</div>
</div>
