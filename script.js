let data = [];
const messageContentDiv = document.getElementById("message-content");
const mainActionButton = document.getElementById("main-action-button");
const homeButton = document.getElementById("home-button");
const spotifyButton = document.getElementById("spotify-button");
const youtubeButton = document.getElementById("youtube-button");
const spotifyDropdown = document.getElementById("spotify-dropdown");
const youtubeDropdown = document.getElementById("youtube-dropdown");
const bodyElement = document.body;

const embedContainer = document.getElementById("embed-container");
const embedContent = document.getElementById("embed-content");
const closeEmbedButton = document.getElementById("close-embed-button");

let hasShownFirstMessage = false;

const backgroundColors = [
  'var(--beige-background)',
  'var(--pastel-pink)',
  'var(--sage-green)',
  'var(--pastel-purple)'
];
let currentBgColorIndex = 0;

const spotifyEmbedCodes = {
  "spotify-happy-vibes": '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX2nX8HgBDmgL?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
  "spotify-sad-healing": '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/0FBThDDbHEBUKoBbiNzSVC?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
  "spotify-peaceful-retreat": '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
  "spotify-sleep-sounds": '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX0jgyAiPl8Af?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>'
};

const youtubeEmbedCodes = {
  "youtube-happy": '<iframe width="100%" height="315" src="https://www.youtube.com/embed/cazdPa9icmo?si=RC4Ndup43oc-Uctt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  "youtube-motivational": '<iframe width="100%" height="315" src="https://www.youtube.com/embed/zWwrzfsUJVg?si=9X6fY0INbUyMBJgS" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  "youtube-research": '<iframe width="100%" height="315" src="https://www.youtube.com/embed/g9NMf5BNMao?si=gqinb8imyVgGAO0T" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  "youtube-timepass": '<iframe width="100%" height="315" src="https://www.youtube.com/embed/1SF5T0fXx54?si=rjith6GVBSObOQ87" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
};


function updateBodyBackgroundColor() {
  currentBgColorIndex = (currentBgColorIndex + 1) % backgroundColors.length;
  bodyElement.style.backgroundColor = backgroundColors[currentBgColorIndex];
}

function toggleDropdown(dropdownElement, otherDropdownElement, buttonElement) {
  const arrowIcon = buttonElement.querySelector('.dropdown-button-arrow');

  if (otherDropdownElement.classList.contains('show')) {
    otherDropdownElement.classList.remove('show');
    otherDropdownElement.previousElementSibling.setAttribute('aria-expanded', 'false'); // Set other button's aria-expanded
    otherDropdownElement.previousElementSibling.querySelector('.dropdown-button-arrow').classList.remove('rotated');
  }

  const isShowing = dropdownElement.classList.toggle('show');
  buttonElement.setAttribute('aria-expanded', isShowing); // Set aria-expanded for the current button

  if (isShowing) {
    arrowIcon.classList.add('rotated');
  } else {
    arrowIcon.classList.remove('rotated');
  }
  hideEmbed();
}

function showEmbed(embedCode) {
  embedContent.innerHTML = embedCode;
  embedContainer.classList.add('show');
  spotifyDropdown.classList.remove('show');
  youtubeDropdown.classList.remove('show');
}

function hideEmbed() {
  embedContainer.classList.remove('show');
  embedContent.innerHTML = '';
}

document.addEventListener('click', (event) => {
  const isClickInsideSpotifyDropdown = spotifyButton.contains(event.target) || spotifyDropdown.contains(event.target);
  const isClickInsideYoutubeDropdown = youtubeButton.contains(event.target) || youtubeDropdown.contains(event.target);
  const isClickInsideEmbedContainer = embedContainer.contains(event.target);

  if (!isClickInsideSpotifyDropdown && !isClickInsideEmbedContainer) {
    spotifyDropdown.classList.remove('show');
    spotifyButton.setAttribute('aria-expanded', 'false');
    spotifyButton.querySelector('.dropdown-button-arrow').classList.remove('rotated');
  }
  if (!isClickInsideYoutubeDropdown && !isClickInsideEmbedContainer) {
    youtubeDropdown.classList.remove('show');
    youtubeButton.setAttribute('aria-expanded', 'false');
    youtubeButton.querySelector('.dropdown-button-arrow').classList.remove('rotated');
  }
});


fetch("data.csv")
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();
  })
  .then(text => {
    const workbook = XLSX.read(text, { type: "string" });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    data = XLSX.utils.sheet_to_json(firstSheet);

    homeButton.classList.remove('show');
    bodyElement.style.backgroundColor = backgroundColors[currentBgColorIndex];
  })
  .catch(error => {
    messageContentDiv.innerHTML = `
      <p class="text-2xl md:text-3xl font-bold text-red-600 text-center mb-2">
        Error Loading Data!
      </p>
      <p class="text-lg text-red-500 text-center">
        Failed to load royal messages. Please try again later.
      </p>
    `;
    mainActionButton.classList.add('opacity-0', 'pointer-events-none');
    homeButton.classList.remove('show');
    spotifyButton.classList.add('opacity-0', 'pointer-events-none');
    youtubeButton.classList.add('opacity-0', 'pointer-events-none');
  });


function showTreatment() {
  if (data.length === 0) {
    messageContentDiv.innerHTML = `
      <p class="text-2xl md:text-3xl font-bold text-[var(--purple)] text-center mb-2">
        Loading Messages...
      </p>
      <p class="text-lg text-[var(--soft-gray)] text-center">
        Please wait a moment while we prepare your royal treatment.
      </p>
    `;
    return;
  }

  if (!hasShownFirstMessage) {
    homeButton.classList.add('show');
    mainActionButton.textContent = 'See Another!';
    hasShownFirstMessage = true;
  }

  spotifyDropdown.classList.remove('show');
  youtubeDropdown.classList.remove('show');
  hideEmbed();

  messageContentDiv.classList.remove('opacity-100', 'translate-y-0');
  messageContentDiv.classList.add('opacity-0', '-translate-y-2');

  setTimeout(() => {
    const row = data[Math.floor(Math.random() * data.length)];

    messageContentDiv.innerHTML = `
      <p class="message-field text-xl md:text-2xl font-semibold text-[var(--dark-text)]">
        <strong>🤎 Compliment:</strong> ${row.Compliment} <strong>🤎</strong>
      </p>
      <p class="message-field text-lg md:text-xl text-[var(--dark-text)]">
        <strong>🎀 Self-Care Tip:</strong> ${row.SelfCare} <strong>🎀</strong>
      </p>
      <p class="message-field text-lg md:text-xl text-[var(--dark-text)]">
        <strong>🖤 Quote:</strong> "${row.Quote}" <strong>🖤</strong>
      </p>
    `;
    messageContentDiv.classList.remove('opacity-0', '-translate-y-2');
    messageContentDiv.classList.add('opacity-100', 'translate-y-0');

    updateBodyBackgroundColor();
  }, 300);
}

spotifyButton.addEventListener('click', () => toggleDropdown(spotifyDropdown, youtubeDropdown, spotifyButton));
youtubeButton.addEventListener('click', () => toggleDropdown(youtubeDropdown, spotifyDropdown, youtubeButton));

spotifyDropdown.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('spotify-embed-trigger')) {
    event.preventDefault();
    const embedId = target.id;
    const embedCode = spotifyEmbedCodes[embedId];
    if (embedCode) {
      showEmbed(embedCode);
    }
  }
});

youtubeDropdown.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('youtube-embed-trigger')) {
    event.preventDefault();
    const embedId = target.id;
    const embedCode = youtubeEmbedCodes[embedId];
    if (embedCode) {
      showEmbed(embedCode);
    }
  }
});

closeEmbedButton.addEventListener('click', hideEmbed);

homeButton.addEventListener('click', () => {
  location.reload();
});

const heartColors = ['var(--pastel-pink)', 'var(--pastel-purple)', 'var(--sage-green)'];

function createFloatingHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');

  const startX = Math.random() * 100;
  heart.style.left = `${startX}vw`;
  heart.style.bottom = `-10vh`;

  const colors = ['var(--pastel-pink)', 'var(--pastel-purple)', 'var(--sage-green)'];
  heart.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

  document.getElementById('heart-container').appendChild(heart);

  heart.addEventListener('animationend', () => {
    heart.remove();
  });
}

setInterval(createFloatingHeart, 800);

