const openBtn = document.querySelector('#open-signup-popup');
const popup = document.querySelector('#popup');
const closeBtn = document.querySelector('#closeBtn');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('#form');
const changeBtn = document.querySelector('#change-btn');
const body = document.querySelector('body');

const closeAll = (pop, overlay) => {
    pop.style.display = 'none';
    overlay.style.opacity = '0';
    overlay.style.zIndex = '0';
    overlay.style.display = 'none';
    return 'done';
}

openBtn.addEventListener('click', () => {
    popup.style.display = 'block';
    overlay.style.opacity = '100%';
    overlay.style.zIndex = '1';
    overlay.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    closeAll(popup, overlay);
})

form.addEventListener('submit', (evt) => {
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

const toYummies = () => {
    window.location.href = 'yummies.html';
}

const toHome = () => {
    window.location.href = 'index.html'
}

changeBtn.addEventListener('click', () => {
    body.classList.toggle('change');
    if (elem.classList.contains('change')) {
        localStorage.setItem('theme', 'change')
    } else {
        localStorage.setItem('theme', 'light')
    }
})

const image = document.querySelector(".door");

const theme = localStorage.getItem('theme');
if (theme === 'change') {
    body.classList.add('change');
    body.addEventListener("click", () => {
        image.style.display = "block"
    })
}

const toPlayer = () => {
    window.location.href = 'videoplayer.html'
}