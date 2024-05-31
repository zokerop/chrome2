document.getElementById('extract').addEventListener('click', () => {
    const links = document.getElementById('links').value.split('\n').map(link => link.trim()).filter(link => link);
    if (links.length < 1) {
        alert('Please enter at least 1 LinkedIn profile link.');
        return;
    }

    chrome.storage.local.set({ links }, () => {
        chrome.runtime.sendMessage({ action: 'startExtraction' });
        window.close();
    });
});
