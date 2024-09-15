<script lang="ts">
  let budget = 0;
  let showBudgetSlider = true;
  let showPopup = true;

  function save() {
    localStorage.setItem('monthly_budget', String(budget));

    // Ensure localStorage is cleared
    localStorage.removeItem('authToken');

    // Trigger reactivity to hide popup
    showBudgetSlider = false;
    showPopup = false;
  }
</script>

{#if showPopup}
  <div class="popup-container">
    <h2 class="text-center">Set Your Monthly Budget</h2>
    <div class="budget-container">
      <input
        type="range"
        min="0"
        max="10000"
        step="100"
        bind:value={budget}
      />
      <p>Monthly Budget: <strong>${budget}</strong></p>
    </div>
    <button class="logout-button" on:click={save}>Save</button>
  </div>
{/if}

<style>
  .popup-container {
    padding: 20px;
    min-width: 300px;
    border-radius: 12px;
    background-color: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border: 2px solid transparent;
    position: relative;
    overflow: hidden;
    border-image: linear-gradient(45deg, gold, gold);
    border-image-slice: 1;
  }

  input {
    padding: 10px;
    width: 100%;
    max-width: 250px;
    border-radius: 8px;
    border: 1px solid #ccc;
  }

  .logout-button {
    padding: 5px 10px;
    border-radius: 4px;
    border: none;
    color: rgb(0, 0, 0);
    font-size: 12px;
    cursor: pointer;
    transition: background-color 0.3s;
    background-color: gold;
  }

  .text-center {
    text-align: center;
  }
</style>
