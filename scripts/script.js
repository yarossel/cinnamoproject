const openBtn = document.querySelector('#open-signup-popup');
const popup = document.querySelector('#popup');
const closeBtn = document.querySelector('#closeBtn');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('#form');
const openYummies = document.querySelector('#open-yummies');

openBtn.addEventListener('click', () => {
    popup.style.display = 'block';

});

closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';

})

form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    popup.style.display = 'none';
})

document.addEventListener('mousedown', (evt) => {
    if(evt.target.closest('.popup') === null){
        popup.style.display = 'none';
    }
})

document.addEventListener('keydown', function (evt) {
    if (evt.code == 'Escape') {
        popup.style.display = 'none';
    }
})

const toYummies = () => {
    window.location.href = 'yummies.html';
}

const toHome = () => {
    window.location.href = 'index.html'
}




















// const products = [
//     { name: "Ноутбук", price: 1000 },
//     { name: "Телефон", price: 500 },
//     { name: "Планшет", price: 800 },
// ];

// function filterExpensiveProducts(products, minPrice) {
//     return products.filter(product => product.price > minPrice);
// }
// console.log(filterExpensiveProducts(products, 700)); 

// const products1 = [
//     { name: "Телевизор", discounted: false },
//     { name: "Кофеварка", discounted: true },
//     { name: "Часы", discounted: false },
// ];

// function hasDiscountedProducts(products1) {
//     return products1.some(product1 => product1.discounted);
// }
// console.log(hasDiscountedProducts(products1));

// const people = [
//     { name: "Алексей", age: 20 },
//     { name: "Мария", age: 25 },
//     { name: "Анна", age: 17 }
// ];

// function areAllAdults(people) {
//     return people.every(age => age > 18);
// }
// console.log(areAllAdults(people));


// const products3 = [
//     { name: "Клавиатура", price: 100 },
//     { name: "Мышь", price: 50 },
//     { name: "Монитор", price: 200 }
// ];

// function findProductByName(products3, name) {
//     return products3.find(product => product.name === name);
// }
// console.log(findProductByName(products3, "Мышь"));  

// const orders = [
//     { item: "Книга", price: 20, quantity: 2 },
//     { item: "Ручка", price: 5, quantity: 5 },
//     { item: "Рюкзак", price: 50, quantity: 1 }
// ];

// function calculateTotalPrice(orders) {
//     return orders.reduce((acc, order) => order.price * order.quantity + acc, 0);
// }
// console.log(calculateTotalPrice(orders));

// const words = ["яблоко", "банан", "яблоко", "апельсин", "банан", "банан"];

// function countWords(words) {
//     return words.reduce((acc, word) => {
//         acc[word] = (acc[word] || 0) + 1;
//         return acc;
//     }, {});
// }
// console.log(countWords(words));

// const students = [
//     { name: "Иван", age: 22 },
//     { name: "Анна", age: 19 },
//     { name: "Мария", age: 25 }
// ];

// function sortStudentsByAge(students) {
//     return students.sort((a, b) => a.age - b.age);
// }
// console.log(sortStudentsByAge(students));

// const chessChampions = [
//     'Вильгельм Стейниц',
//     'Эммануил Ласкер',
//     'Хосе-Рауль Капабланка',
//     'Александр Алехин',
//     'Макс Эйве',
//     'Михаил Ботвинник',
//     'Василий Смыслов',
//     'Михаил Таль',
//     'Тигран Петросян',
//     'Борис Спасский',
//     'Роберт Фишер',
//     'Анатолий Карпов',
//     'Гарри Каспаров',
//     'Владимир Крамник',
//     'Вишванатан Ананд',
//     'Магнус Карлсен'
// ];

// function sortChessChampions(champions) {
//     const result = champions.sort((a, b) => {
//         const surnameA = a.split(' ')[1]
//         const surnameB = b.split(' ')[1]
//         return surnameA.localeCompare(surnameB);
//     })
//     return result;
// }
// console.log(sortChessChampions(chessChampions));

// function removeDuplicates(arr) {
//     const uniqueArr = [...new Set(arr)];
//     return uniqueArr;
// }
// console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5])); 

// const users = [
//     { id: 101, name: "Олег" },
//     { id: 102, name: "Николай" },
//     { id: 103, name: "Владимир" }
// ];

// function createUserMap(users) {
//     const newUsers = new Map();
//     for (const user of users) {
//         newUsers.set(user.id, user.name);
//     }
//     return newUsers;
// }
// console.log(createUserMap(users));

// function validateParenthesIs(text) {
//     const result = [];
//     for (const elem of text) {
//         if (elem === "(") {
//             result.push(elem);
//         } else if (!result.pop()) {
//             return false;
//         }
//     }
//     return result.length > 0 ? false : true;
// }
// console.log(validateParenthesIs("(())"));

  