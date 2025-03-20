const addNew = document.querySelector('#addNew');
const editPopup = document.querySelector("#popupEdit");
const editCloseBtn = document.querySelector('#editCloseBtn');
const editForm = document.querySelector('#editForm');
const overlay = document.querySelector('.overlay');

const cardTemplate = document.querySelector('#cardTemplate').content;
const userTitle = document.querySelector('#userTitle');
const userUrl = document.querySelector('#userUrl');
const container = document.querySelector('#container');

const edited = document.querySelector('#edited');

const form = document.querySelector('#form');
const editTitle = document.querySelector('#editTitle');
const editURL = document.querySelector('#editURL');

const closeEditBtn = document.querySelector('#closeEditBtn');

document.addEventListener('DOMContentLoaded', loadCards());

const closeAll = (popup, overlay) => {
    popup.style.display = 'none';
    overlay.style.opacity = '0';
    overlay.style.zIndex = '0';
    overlay.style.display = 'none';
    return 'done';
}

addNew.addEventListener('click', () => {
    editPopup.style.display = 'block';
    overlay.style.opacity = '100%';
    overlay.style.zIndex = '1';
    overlay.style.display = 'block';
})

editCloseBtn.addEventListener('click', () => {
    closeAll(editPopup, overlay);
})

editForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    closeAll(editPopup, overlay);
})

document.addEventListener('mousedown', (evt) => {
    if(evt.target.closest('.popup-edit') === null){
        closeAll(editPopup, overlay);
    }
})

document.addEventListener('keydown', function (evt) {
    if (evt.code == 'Escape') {
        closeAll(editPopup, overlay);
    }
})

const toHome = () => {
    window.location.href = 'index.html'
}

const toPlayer = () => {
    window.location.href = 'videoplayer.html'
}

container.addEventListener('click', (evt) => {
    const trash = evt.target.closest('.trash');
    if (trash) {
        const item = evt.target.closest('.card');
        const cardId = item.dataset.id;
        item.remove();
        removeCards(cardId);
    }
})

userUrl.addEventListener('input', () => {
    const urlValue = userUrl.value.trim();
    const previewImg = document.querySelector('#previewImg');
    if (userUrl !== '') {
        previewImg.src = urlValue;
    } else {
        previewImg.src = 'images/stars.jpg';
    }
})

editForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const titleValue = userTitle.value.trim();
    const urlValue = userUrl.value.trim();

    if (titleValue !== '' && urlValue !== '') {
        const previewImg = document.querySelector('#previewImg');
        const card = cardTemplate.cloneNode(true);
        card.querySelector('.title').innerHTML = titleValue;
        card.querySelector('.card-body').innerHTML = `<img src="${urlValue}" alt="${titleValue}">`;

        const cardID = Date.now();
        card.querySelector('.card').dataset.id = cardID;
        container.append(card);

        const cardData = {
            title: titleValue,
            url: urlValue,
            id: cardID
        };
        saveCards(cardData);

        userTitle.value = '';
        userUrl.value = '';
        previewImg.src = 'images/stars.jpg';
    }
})

container.addEventListener('click', (evt) => {
    const editBtn = evt.target.closest('#openEdit');
    if (editBtn) {
        edited.style.display = 'block';
        overlay.style.opacity = '100%';
        overlay.style.zIndex = '1';
        overlay.style.display = 'block';
        const card = evt.target.closest('.card');
        card.classList.add('edit')
    }
})

editURL.addEventListener('input', () => {
    const urlValue = editURL.value.trim();
    const previewImg = document.querySelector('#editPreviewImg');
    if (editURL !== '') {
        previewImg.src = urlValue;
    } else {
        previewImg.src = 'images/stars.jpg';
    }
})

form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const titleValue = editTitle.value.trim();
    const urlValue = editURL.value.trim();

    if (titleValue !== '' || urlValue !== '') {
        const previewImg = document.querySelector('#editPreviewImg');
        const card = container.querySelector('.edit');
        console.log(card);
        const cardId = card.dataset.id;
        card.querySelector('.title').innerHTML = titleValue;
        card.querySelector('.card-body').innerHTML = `<img src="${urlValue}" alt="${titleValue}">`;
        card.classList.remove('edit');

        updateCard(cardId, titleValue, urlValue);

        userTitle.value = '';
        userUrl.value = '';
        previewImg.src = 'images/stars.jpg';
    }
})

closeEditBtn.addEventListener('click', () => {
    closeAll(edited, overlay);
})

form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    closeAll(edited, overlay);
})

document.addEventListener('mousedown', (evt) => {
    if(evt.target.closest('.popup-edit') === null){
        closeAll(edited, overlay);
    }
})

document.addEventListener('keydown', function (evt) {
    if (evt.code == 'Escape') {
        closeAll(edited, overlay);
    }
})

container.addEventListener('click', (evt) => {
    const like = evt.target.closest('.heart');
    if (like) {
        like.innerHTML = `<svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 10.1983C0 18.6728 6.432 23.188 11.1392 27.2309C12.8 28.6564 14.4 30 16 30C17.6 30 19.2 28.6582 20.8608 27.2292C25.5696 23.1897 32 18.6728 32 10.2001C32 1.72735 23.2 -4.28651 16 3.86209C8.8 -4.28651 0 1.72387 0 10.1983Z" fill="#8DBCFF"/>
</svg>`;
        like.classList.remove('heart');
        like.classList.add('activeHeart');
    }
})

container.addEventListener('click', (evt) => {
    const like = evt.target.closest('.activeHeart');
    if (like) {
        like.innerHTML = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 8.25001L17.19 9.03001C17.2949 9.13889 17.4208 9.22549 17.5599 9.28465C17.6991 9.3438 17.8488 9.37429 18 9.37429C18.1512 9.37429 18.3009 9.3438 18.4401 9.28465C18.5792 9.22549 18.7051 9.13889 18.81 9.03001L18 8.25001ZM10.5015 24.63C10.2708 24.4402 9.97409 24.3499 9.67675 24.3789C9.37941 24.4079 9.10576 24.5538 8.916 24.7845C8.72624 25.0152 8.63591 25.3119 8.66488 25.6093C8.69386 25.9066 8.83976 26.1802 9.0705 26.37L10.5015 24.63ZM3.513 20.1165C3.58391 20.2461 3.67966 20.3605 3.79478 20.4531C3.9099 20.5457 4.04213 20.6148 4.18392 20.6563C4.32572 20.6978 4.4743 20.7109 4.62119 20.695C4.76807 20.6791 4.91039 20.6344 5.04 20.5635C5.16961 20.4926 5.28399 20.3968 5.3766 20.2817C5.46921 20.1666 5.53824 20.0344 5.57975 19.8926C5.62126 19.7508 5.63443 19.6022 5.61852 19.4553C5.6026 19.3084 5.55791 19.1661 5.487 19.0365L3.513 20.1165ZM4.125 13.7055C4.125 10.4805 5.9475 7.77451 8.436 6.63601C10.854 5.53051 14.103 5.82301 17.19 9.03001L18.81 7.47151C15.15 3.66601 10.896 3.03751 7.5 4.59001C4.179 6.10951 1.875 9.63751 1.875 13.7055H4.125ZM12.7455 29.25C13.515 29.856 14.34 30.501 15.1755 30.99C16.011 31.479 16.965 31.875 18 31.875V29.625C17.535 29.625 16.989 29.445 16.311 29.0475C15.6315 28.6515 14.928 28.1055 14.139 27.483L12.7455 29.25ZM23.2545 29.25C25.3935 27.5625 28.1295 25.6305 30.2745 23.214C32.46 20.754 34.125 17.7045 34.125 13.7055H31.875C31.875 17.0025 30.525 19.542 28.593 21.72C26.6205 23.94 24.135 25.6905 21.861 27.483L23.2545 29.25ZM34.125 13.7055C34.125 9.63751 31.8225 6.10951 28.5 4.59001C25.104 3.03751 20.853 3.66601 17.19 7.47001L18.81 9.03001C21.897 5.82451 25.146 5.53051 27.564 6.63601C30.0525 7.77451 31.875 10.479 31.875 13.7055H34.125ZM21.861 27.483C21.072 28.1055 20.3685 28.6515 19.689 29.0475C19.0095 29.4435 18.465 29.625 18 29.625V31.875C19.035 31.875 19.989 31.4775 20.8245 30.99C21.6615 30.501 22.485 29.856 23.2545 29.25L21.861 27.483ZM14.139 27.483C12.945 26.5425 11.7315 25.6425 10.5015 24.63L9.0705 26.37C10.3155 27.3945 11.6325 28.3725 12.7455 29.25L14.139 27.483ZM5.487 19.038C4.58329 17.4067 4.11427 15.5704 4.125 13.7055H1.875C1.875 16.1625 2.505 18.273 3.513 20.1165L5.487 19.038Z" fill="#4788E3"/>
                            </svg>                                    
                        </svg>`;
        like.classList.remove('activeHeart');
        like.classList.add('heart');
    }
})

function saveCards(cardData) {
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    cards.push(cardData);
    localStorage.setItem('cards', JSON.stringify(cards));
}

function loadCards() {
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    cards.forEach(cardData => {
        const card = cardTemplate.cloneNode(true);
        card.querySelector('.title').innerHTML = cardData.title;
        card.querySelector('.card-body').innerHTML = `<img src="${cardData.url}" alt="${cardData.title}">`;
        card.querySelector('.card').dataset.id = cardData.id;
        container.append(card);
    });
}

function removeCards(id) {
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    console.log(cards)
    const updated = cards.filter(card => card.id !== Number(id));
    localStorage.setItem('cards', JSON.stringify(updated));
    console.log(JSON.parse(localStorage.getItem('cards')));
}

function updateCard(id, newTitle, newUrl) {
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    const updatedCards = cards.map(card => {
        if (card.id === Number(id)) {
            return { ...card, title: newTitle, url: newUrl };
        }
        return card;
    });
    localStorage.setItem('cards', JSON.stringify(updatedCards));
}
