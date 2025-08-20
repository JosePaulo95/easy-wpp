chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'askDDD') {
        let ddd = prompt('Por favor, informe o DDD (ex: 11, 21, 98...)');
      
        while (ddd && !/^\d{2}$/.test(ddd)) {
          ddd = prompt('Opa! DDD inválido. Digite exatamente 2 dígitos (ex: 11, 21, 98...)');
        }
      
        if (ddd) {
          sendResponse({ ddd });
        }
    }
      
    return true; // precisa pra resposta async
});
  