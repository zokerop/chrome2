chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'startExtraction') {
        chrome.storage.local.get('links', (data) => {
            const links = data.links;
            openNextLink(links, 0);
        });
    }
});

function openNextLink(links, index) {
    if (index >= links.length) return;

    chrome.tabs.create({ url: links[index] }, (tab) => {
        chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo, tab) {
            if (tabId === tab.id && changeInfo.status === 'complete') {
                chrome.tabs.sendMessage(tabId, { action: 'extractData' }, (response) => {
                    if (response && response.success) {
                        console.log('Successfully extracted and sent profile data for:', links[index]);
                        chrome.tabs.remove(tabId);
                        openNextLink(links, index + 1);
                    } else {
                        console.error('Error extracting data for:', links[index], response.error);
                        chrome.tabs.remove(tabId);
                        openNextLink(links, index + 1);
                    }
                });
                chrome.tabs.onUpdated.removeListener(listener);
            }
        });
    });
}
