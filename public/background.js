function handleMessage(message) {

  if (message.action === 'keyPressed') {
    console.log('Key pressed:', message.key);
  }  
}