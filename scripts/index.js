class Event {
  constructor(start, duration, title) {
    this.id = Event.getId();
    this.start = start;
    this.duration = duration;
    this.title = title;
  }

  static timeArray = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00'
  ];

  static eventsArray = [
    { id: 1, start: 0, duration: 30, title: "Exercise" },
    { id: 2, start: 25, duration: 15, title: "Travel to work" },
    { id: 3, start: 30, duration: 30, title: "Plan day" },
    { id: 4, start: 60, duration: 15, title: "Review yesterday's commits" },
    { id: 5, start: 100, duration: 15, title: "Code review" },
    { id: 6, start: 180, duration: 90, title: "Have lunch with John" },
    { id: 7, start: 360, duration: 30, title: "Skype call" },
    { id: 8, start: 370, duration: 45, title: "Follow up with designer" },
    { id: 9, start: 405, duration: 30, title: "Push up branch" }
  ];

  static id = this.eventsArray.length + 1;

  static getId() {
    return this.id++;
  }

  static addEvent(eventStart, eventDuration, eventText) {
    this.eventsArray.push(new Event(eventStart, eventDuration, eventText));
    this.showEvents();
  }

  static removeEvent(id) {
    const index = this.eventsArray.findIndex(item => item.id === id);
    this.eventsArray.splice(index, 1);
    this.showEvents();
  }

  static showEvents() {
    console.log(this.eventsArray);
    const events = document.querySelector('.events');

    events.textContent = null;

    this.eventsArray.forEach(item => {
      const div = document.createElement('div');
      const h4 = document.createElement('h4');
      const control = document.createElement('div');
      // const buttonEdit = document.createElement('button');
      const buttonDelete = document.createElement('button');

      h4.textContent = item.title;

      div.setAttribute('class', 'event');
      div.setAttribute('data-id', item.id);
      h4.setAttribute('class', 'event__title');
      control.setAttribute('class', 'control');
      // buttonEdit.setAttribute('class', 'control__button control__button--edit');
      buttonDelete.setAttribute('class', 'control__button control__button--delete');

      // control.append(buttonEdit, buttonDelete);
      control.append(buttonDelete);
      div.append(control, h4);
      events.append(div);

      div.style.height = item.duration < 10 ? `30px` : `${30 * (item.duration / 10)}px`;
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

Event.showEvents();
Event.showTime();

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

  const eventStart = (+formInputStart.value.split(':')[0] * 60 + +formInputStart.value.split(':')[1]) - 480;
  const eventDuration = +formInputDuration.value;
  const eventText = formInputText.value;

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
  if (eventDuration < 0 || eventDuration > 540) {
    setBorderColor(formInputDuration, '#ff6347');
  }
  if (!eventText.length) {
    setBorderColor(formInputText, '#ff6347');
  }

  if (eventStart >= 0 && eventStart <= 540 && eventDuration >= 0 && eventDuration <= 540 && eventText.length > 0) {
    setBackgroundColor(formButton, 'green');

    Event.addEvent(eventStart, eventDuration, eventText);
  } else {
    setBackgroundColor(formButton, '#ff6347');
  }

  form.reset();
});
