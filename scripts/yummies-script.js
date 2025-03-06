const addNew = document.querySelector('#addNew');
const editPopup = document.querySelector("#popupEdit");
const editCloseBtn = document.querySelector('#editCloseBtn');
const editForm = document.querySelector('#editForm');
const overlay = document.querySelector('.overlay');

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

const cardTemplate = document.querySelector('#cardTemplate').content;
const userTitle = document.querySelector('#userTitle');
const userUrl = document.querySelector('#userUrl');
const container = document.querySelector('#container');

editForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const titleValue = userTitle.value.trim();
    const urlValue = userUrl.value.trim();

    if (titleValue !== '' && urlValue !== '') {
        const card = cardTemplate.cloneNode(true);
        card.querySelector('.title').innerHTML = titleValue;
        card.querySelector('.card-body').innerHTML = `<img src="${urlValue}" alt="${titleValue}">`;
        container.append(card);
        userTitle.value = '';
        userUrl.value = '';
    }
})

container.addEventListener('click', (evt) => {
    const trash = evt.target.closest('.trash');
    if (trash) {
        const item = evt.target.closest('.card');
        item.remove();
    }
})
