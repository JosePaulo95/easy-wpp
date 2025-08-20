chrome.contextMenus.removeAll(() => {
  chrome.contextMenus.create({
    id: 'easy-wpp',
    title: 'Iniciar conversa com este número',
    contexts: ['selection']
  }, () => {
    if (chrome.runtime.lastError) {
      console.warn('Erro ao criar menu:', chrome.runtime.lastError.message);
    }
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'easy-wpp' && info.selectionText) {
      const numero = info.selectionText.replace(/\D/g, '');
      
      if (numero.length <= 9) {
          chrome.tabs.sendMessage(tab.id, { action: 'askDDD' }, (response) => {
              if (chrome.runtime.lastError) {
                  console.warn('Erro ao enviar mensagem:', chrome.runtime.lastError.message);
                  // Fallback: tenta mandar sem DDD
                  const url = `https://wa.me/55${numero}`;
                  chrome.tabs.create({ url });
              } else if (response && response.ddd) {
                  // Sucesso: monta número com DDD
                  const url = `https://wa.me/55${response.ddd}${numero}`;
                  chrome.tabs.create({ url });
              } else {
                  // Usuário cancelou o prompt
                  console.log('Usuário cancelou inserção do DDD');
              }
          });
      } else {
          // Número já tem tamanho adequado, assume q é br
          const finalNumber = numero.startsWith('55') ? numero : '55' + numero;
          const url = `https://wa.me/${finalNumber}`;
          chrome.tabs.create({ url });
      }
  }
});