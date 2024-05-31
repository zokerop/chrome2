chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'extractData') {
        try {
            const name = document.querySelector('.text-heading-xlarge').innerText || "";
            const location = document.querySelector('.text-body-small').innerText || "";
            const about = document.querySelector('.pv-about__summary-text').innerText || "";
            const bio = document.querySelector('.pv-text-details__left-panel').innerText || "";
            const followerCount = parseInt(document.querySelector('.follower-count').innerText.replace(/\D/g, '')) || 0;
            const connectionCount = parseInt(document.querySelector('.pv-top-card--list-bullet').innerText.replace(/\D/g, '')) || 0;
            const profileData = {
                name,
                url: window.location.href,
                about,
                bio,
                location,
                followerCount,
                connectionCount
            };

            console.log('Extracted profile data:', profileData);

            fetch('http://localhost:3000/api/profiles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([profileData])
            })
            .then(response => response.json())
            .then(data => {
                console.log('Response from server:', data);
                sendResponse({ success: true });
            })
            .catch(error => {
                console.error('Error during fetch:', error);
                sendResponse({ success: false, error: error.message });
            });

        } catch (error) {
            console.error('Error extracting profile data:', error);
            sendResponse({ success: false, error: error.message });
        }

        return true; // Keeps the message channel open until sendResponse is called
    }
});
