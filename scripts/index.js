class Event {
  constructor(start, duration, title, color) {
    this.id = Event.getId();
    this.start = start;
    this.duration = duration;
    this.title = title;
    this.color = color;
  }

  static timeArray = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00'
  ];

  static eventsArray = [
    { id: 1, start: 0, duration: 15, title: "Exercise", color: {r: 110, g: 158, b: 207} },
    { id: 2, start: 25, duration: 30, title: "Travel to work", color: {r: 110, g: 158, b: 207} },
    { id: 3, start: 30, duration: 30, title: "Plan day", color: {r: 110, g: 158, b: 207} },
    { id: 4, start: 60, duration: 15, title: "Review yesterday's commits", color: {r: 100, g: 158, b: 207} },
    { id: 5, start: 100, duration: 15, title: "Code review", color: {r: 110, g: 158, b: 207} },
    { id: 6, start: 180, duration: 90, title: "Have lunch with John", color: {r: 110, g: 158, b: 207} },
    { id: 7, start: 360, duration: 30, title: "Skype call", color: {r: 110, g: 158, b: 207} },
    { id: 8, start: 370, duration: 45, title: "Follow up with designer", color: {r: 110, g: 158, b: 207} },
    { id: 9, start: 405, duration: 30, title: "Push up branch", color: {r: 110, g: 158, b: 207} }
  ];

  static id = this.eventsArray.length + 1;

  static getId() {
    return this.id++;
  }

  static addEvent(eventStart, eventDuration, eventText, eventColor) {
    this.eventsArray.push(new Event(eventStart, eventDuration, eventText, eventColor));
    this.showEvents();
  }

  static removeEvent(id) {
    const index = this.eventsArray.findIndex(item => item.id === id);
    this.eventsArray.splice(index, 1);
    this.showEvents();
  }

  static showEvents() {
    const sortEventsArray = [...this.eventsArray].sort((a, b) => {
      if (a.start === b.start) {
        return a.duration - b.duration;
      } else {
        return a.start - b.start;
      }
    });

    const events = document.querySelector('.events');
    events.textContent = null;

    let count = 0;

    sortEventsArray.forEach((item, index, arr) => {
      const div = document.createElement('div');
      const h4 = document.createElement('h4');
      const control = document.createElement('div');
      const buttonDelete = document.createElement('button');

      h4.textContent = item.title;

      div.setAttribute('class', 'event');
      div.setAttribute('data-id', item.id);
      h4.setAttribute('class', 'event__title');
      control.setAttribute('class', 'control');
      buttonDelete.setAttribute('class', 'control__button control__button--delete');

      if (arr.length > 1) {
        if (index > 0) {
          if (item.start < arr[index - 1].start + arr[index - 1].duration) {
            count++;
            div.style.left = `${100 * count}%`;
          } else {
            count = 0;
          }
        }
      }

      div.style.borderColor = `rgb(${item.color.r}, ${item.color.g}, ${item.color.b})`;
      div.style.backgroundColor = `rgba(${item.color.r}, ${item.color.g}, ${item.color.b}, 0.2)`;
      div.style.top = `${item.start * 3}px`;
      div.style.height = item.duration < 10 ? `30px` : `${30 * (item.duration / 10)}px`;

      control.append(buttonDelete);
      div.append(control, h4);
      events.append(div);
    });
  }

  static showTime() {
    this.timeArray.forEach((item, index) => {
      const setSizeText = (index) => index % 2 ? 'time__text time__text--small' : 'time__text';

      const time = document.querySelector('.time');

      const li = document.createElement('li');
      const span = document.createElement('span');

      span.textContent = item;

      li.setAttribute('class', 'time__item');
      span.setAttribute('class', setSizeText(index));

      li.append(span);
      time.append(li);
    });
  }
}

Event.showTime();
Event.showEvents();

const events = document.querySelector('.events');

events.addEventListener('click', (e) => {
  if (e.target.classList.contains('control__button--delete')) {
    const id = +e.target.closest('.event').getAttribute('data-id');
    Event.removeEvent(id);
  }
});

const formButton = document.querySelector('.form__button');

formButton.addEventListener('click', () => {
  const form = document.querySelector('.form');

  const formInputStart = document.querySelector('.form__input-start');
  const formInputDuration = document.querySelector('.form__input-duration');
  const formInputText = document.querySelector('.form__input-text');
  const formInputColor = document.querySelector('.form__input-color');

  const eventStart = (+formInputStart.value.split(':')[0] * 60 + +formInputStart.value.split(':')[1]) - 480;
  const eventDuration = +formInputDuration.value;
  const eventText = formInputText.value;
  const eventColor = hex2rgb(formInputColor.value);

  function hex2rgb(color) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  function setBackgroundColor(item, color) {
    item.style.backgroundColor = color;
    const timeoutId = setTimeout(() => {
      formButton.style.backgroundColor = '#616D84';
      clearInterval(timeoutId);
    }, 1000);
  }

  function setBorderColor(item, color) {
    item.style.borderColor = color;
    const timeoutId = setTimeout(() => {
      item.style.borderColor = '#000';
      clearInterval(timeoutId);
    }, 1000);
  }

  if (eventStart < 0 || eventStart > 540) {
    setBorderColor(formInputStart, '#ff6347');
  }
  if (eventDuration <= 0 || eventDuration > 540) {
    setBorderColor(formInputDuration, '#ff6347');
  }
  if (!eventText.length) {
    setBorderColor(formInputText, '#ff6347');
  }

  if (eventStart >= 0 &&
    eventStart <= 540 &&
    typeof (eventDuration) === 'number' &&
    eventDuration > 0 &&
    eventDuration <= 540 &&
    eventText.length > 0 &&
    eventStart + eventDuration <= 540) {
    setBackgroundColor(formButton, 'green');

    Event.addEvent(eventStart, eventDuration, eventText, eventColor);
  } else {
    setBackgroundColor(formButton, '#ff6347');
  }

  form.reset();
});
