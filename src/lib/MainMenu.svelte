<script>
  import { goto } from '$app/navigation';

  function navigateToChatbot(chatbotId) {
    goto(`/chatbot/${chatbotId}`);
  }
</script>

<style>
  /* Add your styles for the main menu here */
</style>

<main>
  <h1>Select a chatbot:</h1>
  <ul>
    <li><button on:click={() => navigateToChatbot('business-operations')}>Business Operations and Efficiency</button></li>
    <li><button on:click={() => navigateToChatbot('customer-relationship')}>Customer Relationship and Change Management</button></li>
    <li><button on:click={() => navigateToChatbot('data-driven-decision')}>Data-Driven Decision Making and Analytics</button></li>
    <li><button on:click={() => navigateToChatbot('innovation-sustainability')}>Innovation, Sustainability, and Growth</button></li>
    <li><button on:click={() => navigateToChatbot('sales-marketing')}>Sales, Marketing, and Customer Experience</button></li>
    <li><button on:click={() => navigateToChatbot('workforce-management')}>Workforce Management and Development</button></li>
  </ul>
</main>
