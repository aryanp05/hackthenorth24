console.log("Shopify Purchase Advisor content script loaded");

function createPopup() {
  console.log("Creating popup");
  const popupHTML = `
    <div id="shopify-advisor-overlay" style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9998;
    ">
      <div id="shopify-advisor-popup" style="
        width: 80%;
        max-width: 600px;
        background: white;
        border-radius: 10px;
        padding: 20px;
        z-index: 9999;
        box-shadow: 0 0 20px rgba(0,0,0,0.3);
        text-align: center;
      ">
        <h2 style="font-size: 24px; margin-bottom: 20px;">Should you make this purchase?</h2>
        <div style="display: flex; justify-content: space-around; margin-bottom: 20px;">
          <img src="${chrome.runtime.getURL('angel.png')}" alt="Angel" style="width: 150px; height: 150px;">
          <img src="${chrome.runtime.getURL('devil.png')}" alt="Devil" style="width: 150px; height: 150px;">
        </div>
        <p id="shopify-advisor-message" style="font-size: 18px; margin-bottom: 20px;"></p>
        <button id="shopify-advisor-close" style="
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
        ">×</button>
      </div>
    </div>
  `;

  const popupElement = document.createElement('div');
  popupElement.innerHTML = popupHTML;
  document.body.appendChild(popupElement.firstElementChild);

  const messages = [
    { angel: "Do you really need this?", devil: "Treat yourself!" },
    { angel: "Think about your savings", devil: "You deserve it!" },
    { angel: "Consider waiting a day", devil: "Buy now, think later!" }
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  document.getElementById('shopify-advisor-message').innerHTML = `
    <strong>Angel:</strong> ${randomMessage.angel}<br>
    <strong>Devil:</strong> ${randomMessage.devil}
  `;

  document.getElementById('shopify-advisor-close').addEventListener('click', () => {
    document.getElementById('shopify-advisor-overlay').remove();
  });

  // Close popup when clicking outside
  document.getElementById('shopify-advisor-overlay').addEventListener('click', (event) => {
    if (event.target.id === 'shopify-advisor-overlay') {
      document.getElementById('shopify-advisor-overlay').remove();
    }
  });
}

function checkForCheckoutPage() {
  console.log("Checking for checkout page");
  if (window.location.pathname.includes("/checkouts/")) {
    console.log("Checkout page detected");
    createPopup();
  }
}

// Run the check when the content script loads
checkForCheckoutPage();

// Also run the check when the page changes (for single-page applications)
window.addEventListener('popstate', checkForCheckoutPage);