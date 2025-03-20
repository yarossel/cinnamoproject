const video = document.querySelector('#video');
const playPause = document.querySelector('#play');
const volumeSlider = document.querySelector('#volume');

const playSvg = `<img src="components/play.png" alt="play">`;
const pauseSvg = `<img src="components/pause.png" alt="pause">`;

playPause.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playPause.innerHTML = pauseSvg;
    } else {
        video.pause();
        playPause.innerHTML = playSvg;
    }
})

video.addEventListener('play', () => {
    playPause.innerHTML = pauseSvg;
})

video.addEventListener('pause', () => {
    playPause.innerHTML = playSvg;
})

volumeSlider.addEventListener('input', () => {
    video.volume = volumeSlider.value;
})

const currentTime = document.querySelector('#current-time');
const seekbar = document.querySelector('#seekbar');

video.addEventListener('timeupdate', () => {
    const value = (video.currentTime / video.duration) * 100;
    seekbar.value = value;
    currentTime.textContent = formatTime(video.currentTime);
})

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

seekbar.addEventListener('input', () => {
    const seekTime = (seekbar.value / 100) * video.duration;
    video.currentTime = seekTime;
})

const fullScreen = document.querySelector('#full-screen');

fullScreen.addEventListener('click', () => {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    }
})

const addNewVideo = document.querySelector('#addNewVideo');
const popup = document.querySelector('#popup');
const overlay = document.querySelector('#overlay');
const closeAddVideo = document.querySelector('#closeAddVideo');
const addVideoForm = document.querySelector('#addVideoForm');
const cardsForm = document.querySelector('#cardsForm');
const videoCardTemplate = document.querySelector('#videoCardTemplate').content;

const closeAll = (popup, overlay) => {
    popup.style.display = 'none';
    overlay.style.opacity = '0';
    overlay.style.zIndex = '0';
    overlay.style.display = 'none';
    return 'done';
}

addNewVideo.addEventListener('click', () => {
    popup.style.display = 'block';
    overlay.style.opacity = '100%';
    overlay.style.zIndex = '1';
    overlay.style.display = 'block';
})

closeAddVideo.addEventListener('click', () => {
    closeAll(popup, overlay);
})

addVideoForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    closeAll(popup, overlay);
})

document.addEventListener('mousedown', (evt) => {
    if(evt.target.closest('.popup') === null){
        closeAll(popup, overlay);
    }
})

document.addEventListener('keydown', function (evt) {
    if (evt.code == 'Escape') {
        closeAll(popup, overlay);
    }
})

document.addEventListener('DOMContentLoaded', loadCards());
// document.addEventListener('DOMContentLoaded', localStorage.clear());

const userTitle = document.querySelector('#userVideoTitle');
const userUrl = document.querySelector('#userVideoUrl');

addVideoForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const titleValue = userVideoTitle.value.trim();
    const urlValue = userVideoUrl.value.trim();

    if (titleValue !== '' && urlValue !== '') {
        const card = videoCardTemplate.cloneNode(true);
        card.querySelector('.title').innerHTML = titleValue;

        const cardID = Date.now();
        card.querySelector('.card').dataset.id = cardID;
        cardsForm.append(card);

        const cardData = {
            title: titleValue,
            url: urlValue,
            id: cardID
        };
        console.log(cardData.id);
        saveCards(cardData);

        userVideoTitle.value = '';
        userVideoUrl.value = '';
    }
})

function saveCards(cardData) {
    const cards = JSON.parse(localStorage.getItem('videoCards')) || [];
    cards.push(cardData);
    localStorage.setItem('videoCards', JSON.stringify(cards));
}

function loadCards() {
    const cards = JSON.parse(localStorage.getItem('videoCards')) || [];
    cards.forEach(cardData => {
        const card = videoCardTemplate.cloneNode(true);
        card.querySelector('.title').innerHTML = cardData.title;
        card.querySelector('.card').innerHTML += `<video class="card-video">
                            <source src="${cardData.url}" type="video/mp4">
                        </video>`;
        card.querySelector('.card').dataset.id = cardData.id;
        cardsForm.append(card);
    });
}

const videoContainer = document.querySelector('#videoContainer');
const videoFooter = document.querySelector('#videoFooter');
const mainVideo = document.querySelector('#video');

cardsForm.addEventListener('click', (evt) => {
    const card = evt.target.closest('.card')
    if (card) {
        const cards = JSON.parse(localStorage.getItem('videoCards'));
        const id = card.dataset.id;
        const cardVideo = findVideoById(cards, Number(id));
        console.log(cardVideo.url);

        if (cardVideo) {
            const videoSrc = video.querySelector('source');
            videoSrc.src = cardVideo.url;
            videoFooter.querySelector('.title').innerHTML = `<h2 class="playlist-title">Sailor Moon -- ${cardVideo.title}</h2>`
        }
            video.load();
            video.addEventListener('loadeddata', () => {
                video.play();
            })
            }
})
    // const videoCont = evt.target.closest('.card');

const findVideoById = (videoArray, id) => {
    return videoArray.find(video => video.id === Number(id));
}

const next = document.querySelector('#next');
const prev = document.querySelector('#previous');


