window.addEventListener('message', (event) => {
    if (event.source !== window) return; // Ignore messages from other sources
  
    if (event.data.action === 'keyPressed') {
      // Forward the message to the background script
      if (typeof browser !== 'undefined') {
        // For browsers that support the browser namespace (e.g., Firefox)
        browser.runtime.sendMessage(event.data);
      } else if (typeof chrome !== 'undefined') {
        // For browsers that support the chrome namespace (e.g., Chrome, Edge)
        chrome.runtime.sendMessage(event.data);
      } else {
        console.error('No valid browser namespace found');
      }
    }
  });
  