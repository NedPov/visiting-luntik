// SERVICE-WORKER
if("serviceWorker" in navigator){
    window.addEventListener('DOMContentLoaded', () =>{
        navigator.serviceWorker.register("service-worker-Luntik.js")
        .then(registration =>{
            console.log('успешно', registration)
        })
        .catch(err => console.error('Ошибка', err));
    });
}


// ЗАДАЧА 1
const task1ResponseWrapper = document.querySelector('.response_wrapp');
task1ResponseWrapper.addEventListener('click', task1Response);
// F для проверки правильности
function task1Response(e) {
    // что бы ивент тригерил только нужный див
    if(e.target === document.querySelector('.response_wrapp')) return;

    // переменная для облегчения
    let classTask1 = document.querySelector('.task_1');
    // обнуляем transition для красоты
    classTask1.style.removeProperty("transition");
    // если нажали правильно
    if (e.target.textContent === 'Желтый') {
        classTask1.style.border = '4px solid rgb(38, 207, 38)';
        e.target.style.backgroundColor = 'rgb(38, 207, 38)';
        e.target.style.color = 'white';
        // убираем евент т.к. мы нажали правильно
        task1ResponseWrapper.removeEventListener('click', task1Response);
    } else {
        classTask1.style.transition = '0.2s';
        classTask1.style.border = '4px solid red';
        setTimeout(() => {
            classTask1.style.border = '4px solid black';
        }, 1000);
    }
}

// ЗАДАЧА 2

// все поговорки
const SayingTask2 = Array.from(document.querySelectorAll('.saying'));
// главный контейнер
const divWrapSayingTask2 = document.querySelector('.div-wrapp-container');
const btnTask2 = document.querySelector('.form-saying_btn');
// форма
const form = document.getElementById('form-saying');
// переменная для ТЕКСТА в поговорке
let textTask2;

// event click по главному контейнеру
divWrapSayingTask2.addEventListener('click', divWrapSayingTask2Click);
// F для смены активного дива
function divWrapSayingTask2Click(e) {
    // если мы кликнули не по поговорке
    if (!e.target.classList.contains('saying')) return;

    // если уже активная другая поговорка
    if (document.querySelector('.active_task2')) {
        document.querySelector('.active_task2').classList.remove('active_task2');
    }
    // добавить активный класс
    e.target.classList.add('active_task2');
    btnTask2.disabled = false;

    // вытаскиваем текст
    textTask2 = document.querySelector('.active_task2').textContent;
}

form.addEventListener('submit', e => {
    e.preventDefault();
    // создаем FormData и вытаскиваем значение импута
    let formData = new FormData(form);
    let value = formData.get('saying');

    if(value){
        checkTextInput(value);
    }
    form.reset();
});
// F для проверки текста
function checkTextInput(value) {
    // переменная для окончательного ответа
    let completed = textTask2.replace(/\.\.\./, value);
    if (textTask2.match(/век живи/i)) {
        completed.match(/Век живи, век учись/i) ? completedSayingTask2(completed) : wrongSayingTask2();
    }
    else if (textTask2.match(/один в поле/i)) {
        completed.match(/один в поле не воин/i) ? completedSayingTask2(completed) : wrongSayingTask2();
    }
    else if (textTask2.match(/когда я ем/i)) {
        completed.match(/когда я ем, я глух и нем/i) ? completedSayingTask2(completed) : wrongSayingTask2();
    }
    else if (textTask2.match(/чем дальше в лес/i)) {
        completed.match(/Чем дальше в лес, тем больше дров/i) ? completedSayingTask2(completed) : wrongSayingTask2();
    }
    else if (textTask2.match(/семь раз отмерь/i)) {
        completed.match(/Семь раз отмерь - один (раз)?\s?отрежь/i) ? completedSayingTask2(completed) : wrongSayingTask2();
    }
    else if (textTask2.match(/не имей сто рублей, а имей/i)) {
        completed.match(/не имей сто рублей, а имей сто друзей/i) ? completedSayingTask2(completed) : wrongSayingTask2();
    }
    else if (textTask2.match(/Закончил дело,/i)) {
        completed.match(/Закончил дело, гуляй смело/i) ? completedSayingTask2(completed) : wrongSayingTask2();
    }
    else if (textTask2.match(/Тише едешь -/i)) {
        completed.match(/Тише едешь - дальше будешь/i) ? completedSayingTask2(completed) : wrongSayingTask2();
    }
    else if (textTask2.match(/Повторение/i)) {
        completed.match(/Повторение - мать учения/i) ? completedSayingTask2(completed) : wrongSayingTask2();
    }
}

// F для смены поговорки (если все верно)
function completedSayingTask2(completed) {
    // переменная что бы постоянно не искать через DOM
    let classActiveTask2 = document.querySelector('.active_task2');

    classActiveTask2.innerText = completed;
    classActiveTask2.style.border = '2px solid green';
}

// F для отображения неправильности
function wrongSayingTask2() {
    // переменная что бы постоянно не искать через DOM
    let classActiveTask2 = document.querySelector('.active_task2');

    // красивые стили
    classActiveTask2.style.border = '2px solid red';
    classActiveTask2.style.transition = '0.5s';

    // убираем стили
    setTimeout(() => {
        classActiveTask2.style.border = '2px solid black';
        // этот setTimeout нужен для плавного перехода красного бордера обратно в черный. Но т.к. бордер добавляли через style, то его нужно прямо ремувать
        setTimeout(() => {
            classActiveTask2.style.removeProperty("border");
            classActiveTask2.style.removeProperty("transition");
        }, 100);
    }, 1000);
}




// ЗАДАЧА 3
const task3WrapperSquare = document.querySelector('.div-wrapp_qadro');
const square1 = document.querySelector('.dQ1');
const square2 = document.querySelector('.dQ2');
const square3 = document.querySelector('.dQ3');
const square4 = document.querySelector('.dQ4');

// создаем прототип
let proto = {
    start: 0,
    step: 90,
    rotate() {
        if (this.start === 360) {
            this.start = 0;
        }
        return `rotate(${this.start += this.step}deg)`;
    }
}
// передаем каждому
let dQ1 = Object.create(proto);
let dQ2 = Object.create(proto);
let dQ3 = Object.create(proto);
let dQ4 = Object.create(proto);

// console.log(dQ2.rotate());
task3WrapperSquare.addEventListener('click', turnSquare);
// F если клик по общему квадрату или по маленькому
function turnSquare(e) {
    if (e.target.classList.contains('dQ') || e.target.closest('.dQ')) {
        // поворачиваем не таргет, т.к. помжем попасть в мал.кв. а именно большой кв.
        if (e.target.id === 'dQ1' || e.target.closest('.dQ1')) {
            square1.style.transform = dQ1.rotate();
        }
        else if (e.target.id === 'dQ2' || e.target.closest('.dQ2')) {
            square2.style.transform = dQ2.rotate();
        }
        else if (e.target.id === 'dQ3' || e.target.closest('.dQ3')) {
            square3.style.transform = dQ3.rotate();
        }
        else if (e.target.id === 'dQ4' || e.target.closest('.dQ4')) {
            square4.style.transform = dQ4.rotate();
        }
        //    если все стоят как надо,  - зеленый бордер
        if (square1.style.transform === 'rotate(180deg)' && square2.style.transform === 'rotate(180deg)' && square3.style.transform === 'rotate(180deg)' && square4.style.transform === 'rotate(180deg)') {
            document.querySelector('.div-wrapp_qadro').style.border = '4px solid rgb(38, 207, 38)';
        } else document.querySelector('.div-wrapp_qadro').style.border = '4px solid black';
    }
}

// ЗАДАЧА 4

// в html обозначли их как draggable="true"
const draggablesTask4 = document.querySelectorAll('.draggable')
const dropContainerTask4 = document.querySelectorAll('.drop');

// проходимся по эл. которые будем перетаскивать
draggablesTask4.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
    draggable.addEventListener('dragend', dragEnd);
});
//F добавляем событие на начало переноса
function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.classList[0]);
    e.target.style.opacity = '0.5';
}
//F добавляем событие на конец переноса
function dragEnd(e) {
    e.target.style.opacity = '1';
}


// проходя над контейнерами для дропа
dropContainerTask4.forEach(drop => {
    // Когда находимся над эл.
    drop.addEventListener('dragover', (e) => {
        e.preventDefault();
        drop.classList.add('drag-over-yellow');
    });
    //Когда уходим с эл.
    drop.addEventListener('dragleave', (e) => {
        drop.classList.remove('drag-over-yellow');
    });
    drop.addEventListener('drop', dropEvent);
});
// F когда дропаем эл.
function dropEvent(e) {
    e.preventDefault();
    // передаем текст класса
    const el = e.dataTransfer.getData('text/plain');
    //если есть совпадение по классам (круг к кругу)
    if (e.target.classList[0].match(/circle/) && el.match(/circle/)) {
        e.target.style.opacity = '1';
        e.target.style.border = '2px solid rgb(38, 207, 38)';
        document.querySelector('.main_circle').remove();
    }
    else if (e.target.classList[0].match(/square/) && el.match(/square/)) {
        e.target.style.opacity = '1';
        e.target.style.border = '2px solid rgb(38, 207, 38)';
        document.querySelector('.main_square').remove();
    }
    else if (e.target.classList[0].match(/rectangle/) && el.match(/rectangle/)) {
        e.target.style.opacity = '1';
        e.target.style.border = '2px solid rgb(38, 207, 38)';
        document.querySelector('.main_rectangle').remove();
    } else {
        // если соотнесли неправильно 
        e.target.style.border = '2px solid red';
        setTimeout(() => {
            e.target.style.removeProperty("border");
            e.target.classList.remove('drag-over-yellow');
        }, 1000);
    }
    // Проверка, если див пустой - поздравления
    if (document.querySelector('.main-wrapp').children.length === 0) {
        document.querySelector('.main-wrapp').classList.add('сongratulations');
        document.querySelector('.main-wrapp').textContent = 'Ты молодец!';
    }
}


// ЗАДАЧА 5

const task5ResponseWrapper = document.querySelector('.response-wrapp');
task5ResponseWrapper.addEventListener('click', task5Response);
// F для проверки правильности
function task5Response(e) {
    let classTask5 =  document.querySelector('.task_5');
    if (e.target.innerText === 'Пять') {
        classTask5.style.border = '4px solid rgb(38, 207, 38)';
        e.target.style.backgroundColor = 'rgb(38, 207, 38)';
        task5ResponseWrapper.removeEventListener('click', task5Response);
    } else {
        classTask5.style.transition = '0.2s';
        classTask5.style.border = '4px solid red';
        setTimeout(() => {
            classTask5.style.border = '4px solid black';
        }, 1000);
    }
}

// ЗАДАЧА 6
const draggablesTask6 = document.querySelectorAll('.draggable-task_6');
const dropContainerTask6 = document.querySelectorAll('.drop-container-task_6');

// img src для конечных картинок
const AntAndAnthill = 'img/AntAndAnthill.jpg';
const bees = 'img/bees.jpg';
const boothAndDog = 'img/boothAndDog.jpg';
const FishAndAquarium = 'img/FishAndAquarium.jpg';


//ПЕРЕНОСИМЫЕ IMG 
draggablesTask6.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStartTask6);
    draggable.addEventListener('dragend', dragEndTask6);
});
// F старт переноса
function dragStartTask6(e) {
    e.dataTransfer.setData('text/plain', e.target.src);
    e.target.style.opacity = '0.5';
}
// F конец переноса
function dragEndTask6(e) {
    e.target.style.opacity = '1';
}

//DROP IMG
dropContainerTask6.forEach(drop => {
    drop.addEventListener('dragover', e => {
        e.preventDefault();
        e.target.style.opacity = '0.5';
    });
    drop.addEventListener('dragleave', () => {
        drop.style.opacity = '1';
    });
    drop.addEventListener('drop', dropEventTask6);
});
// F drop
function dropEventTask6(e) {
    e.preventDefault();
    let img = document.createElement('img');
    const imgSrc = e.dataTransfer.getData('text/plain');
    if (imgSrc) {
        // соотносим картинки с нужной
        if (e.target.src.match(/Booth/) && imgSrc.match(/Dog/)) {
            e.target.remove();
            img.src = boothAndDog;
            document.querySelector('.dogHouse').appendChild(img);
            document.querySelector('.dog').remove();
        }
        else if (e.target.src.match(/Beehive/) && imgSrc.match(/Bee/)) {
            e.target.remove();
            img.src = bees;
            document.querySelector('.beehive').appendChild(img);
            document.querySelector('.bee').remove();
        }
        else if (e.target.src.match(/Aquarium/) && imgSrc.match(/Fish/)) {
            e.target.remove();
            img.src = FishAndAquarium;
            document.querySelector('.aquarium').appendChild(img);
            document.querySelector('.fish').remove();
        }
        else if (e.target.src.match(/Anthill/) && imgSrc.match(/Ant/)) {
            e.target.remove();
            img.src = AntAndAnthill;
            document.querySelector('.anthill').appendChild(img);
            document.querySelector('.ant').remove();
        } else {
            // если соотнесли неправильно 
            e.target.style.border = '2px solid red';
            e.target.style.opacity = '1';
            setTimeout(() => {
                e.target.style.border = '2px solid black';
            }, 1000);
        }
        // Проверка, если див пустой - поздравления
        if (document.querySelector('.animal-wrapp').children.length === 0) {
            document.querySelector('.animal-wrapp').classList.add('сongratulations');
            document.querySelector('.animal-wrapp').innerText = 'Ты молодец!';
        }
    }
}









