chrome.contextMenus.create({
    id: 'easy-wpp',
    title: 'Iniciar conversa com este número',
    contexts: ['selection']
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'easy-wpp' && info.selectionText) {
        const numero = info.selectionText.replace(/\D/g, ''); // Remove não números
        const url = `https://wa.me/${numero}`;
        chrome.tabs.create({ url }); // Abre a aba com o link
    }
});
