window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Timer
  let deadline = '2021-04-19'; // конечная дата

  // определяет остаток времени и вычленяет оставшиеся секунды, минуты и часы
  function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()), //нашли разницу между нужной датой и текущей в милисекундах
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor((t / 1000 / 60 / 60));
    // если есть дни
    // hours = Math.floor((t/1000/60/60) % 24),
    // days = Math.floor((t/1000/60/60/24);
    return {
      'total': t,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
  // выставляет и запускает часы
  function setClock(id, endtime) {

    // получаем элементы из верстки
    let timer = document.getElementById(id),
      hours = timer.querySelector('.hours'),
      minutes = timer.querySelector('.minutes'),
      seconds = timer.querySelector('.seconds'),
      // запускаем нашу функцию обновления времени с интервалом в 1с
      timeInterval = setInterval(updateClock, 1000);
    // обновляет таймер 
    function updateClock() {

      let t = getTimeRemaining(endtime);
      // добавляем ноль, чтобы время состояло не менее чем из 2 цифр всегда. Не 4, а 04
      function addZero(num) {
        if (num <= 9) {
          return '0' + num;
        } else {
          return num;
        }
      }

      hours.textContent = addZero(t.hours);
      minutes.textContent = addZero(t.minutes);
      seconds.textContent = addZero(t.seconds);

      // когда время вышло, останавливаем отсчет и обнуляем время
      if (t.total <= 0) {
        clearInterval(timeInterval);
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';
      }
    }
  }

  setClock('timer', deadline);
});