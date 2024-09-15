<script lang="ts">
  let username = '';
  let password = '';
  let token: string = null;
  let errorMessage: string = null;
  let budget = 0;
  let showBudgetSlider = false;

  async function login() {
      showBudgetSlider = true;
  }

  function logout() {
    localStorage.setItem('monthly_budget', String(budget));

    localStorage.removeItem('authToken');
    token = null;
    username = '';
    password = '';
    showBudgetSlider = false;
}
</script>

<div class="popup-container">
    {#if showBudgetSlider}
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
      <button class="logout-button" on:click={logout}>Save and Logout</button>
    {/if}
  

  {#if !token && !showBudgetSlider}
    <h2 class="text-center">Budget Defender Login</h2>
    <div class="form-container">
      <input
        type="text"
        placeholder="Username"
        bind:value={username}
      />
      <input
        type="password"
        placeholder="Password"
        bind:value={password}
      />
      <button class="login-button" on:click={login}>Login</button>
    </div>

    {#if errorMessage}
      <p class="error">{errorMessage}</p>
    {/if}
  {/if}
</div>

<style>
  /* Use a serif font */
  body {
    font-family: 'Times New Roman', serif;
  }

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

  .popup-container::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border-radius: 14px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    z-index: -1;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }

  .budget-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }

  input {
    padding: 10px;
    width: 100%;
    max-width: 250px;
    border-radius: 8px;
    border: 1px solid #ccc;
  }

  .login-button {
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    color: rgb(0, 0, 0);
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    background-color: gold; /* Same color as the border */
  }

  .logout-button {
    padding: 5px 10px;
    border-radius: 4px;
    border: none;
    color: rgb(0, 0, 0);
    font-size: 12px;
    cursor: pointer;
    transition: background-color 0.3s;
    background-color: gold; /* Same color as the border */
  }

  .login-button:hover,
  .logout-button:hover {
    background-color: #ffeb94; /* Slightly darker gold for hover effect */
  }

  .error {
    color: red;
    text-align: center;
  }

  .text-center {
    text-align: center;
  }
</style>
