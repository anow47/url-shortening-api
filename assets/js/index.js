const linkDisplay = document.querySelector('.shortlink_display');
const linkInput = document.querySelector('[name="urlInput"]');
const form = document.querySelector('.form');

function displayShortLink(links) {
    const card = document.createElement('div');
    card.classList.add('shortlink_display_card');
    
    card.innerHTML = `
        <span class="shortlink_display_card_link">${links.input}</span>
        <div class="shortlink_display_card_container">
            <span class="shortlink_display_card_container_url">${links.shortLink}</span>
            <button class="shortlink_display_card_container_button copied-btn btn">Copy</button>
        </div>
    `;
    linkDisplay.appendChild(card);

    // Add event listener for copy button
    const copyBtn = card.querySelector('.copied-btn');
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(links.shortLink)
            .then(() => {
                copyBtn.textContent = 'Copied!';
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    });
}

async function getApi(url) {
    try {
        const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(url)}`);
        const data = await res.json();
        if (data.ok) {
            const links = {
                input: url,
                shortLink: data.result.full_short_link
            };
            displayShortLink(links);
        } else {
            console.error('Error shortening the link:', data.error);
        }
    } catch (error) {
        console.error('Failed to fetch short link:', error);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = linkInput.value;
    getApi(url);
});

const menu = document.querySelector('.nav_bar');
const menuIcon = document.querySelector('.menu-icon');

menuIcon.addEventListener('click', showMenu);

function showMenu() {
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}