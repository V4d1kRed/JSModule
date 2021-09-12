class Event {
  constructor(start, duration, title) {
    this.start = start;
    this.duration = duration;
    this.title = title;
  }
}

const eventsList = [
  {start: 0, duration: 15, title: "Exercise"},
  {start: 25, duration: 15, title: "Travel to work"},
  {start: 30, duration: 30, title: "Plan day"},
  {start: 60, duration: 15, title: "Review yesterday's commits"},
  {start: 100, duration: 15, title: "Code review"},
  {start: 180, duration: 90, title: "Have lunch with John"},
  {start: 360, duration: 30, title: "Skype call"},
  {start: 370, duration: 45, title: "Follow up with designer"},
  {start: 405, duration: 30, title: "Push up branch"}
];

const timeList = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00'
];


timeList.forEach((item, index) => {
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

const events = document.querySelector('.events');

eventsList.forEach(item => {
  const div = document.createElement('div');
  const h4 = document.createElement('h4');
  const control = document.createElement('div');
  // const buttonEdit = document.createElement('button');
  const buttonDelete = document.createElement('button');

  h4.textContent = item.title;

  div.setAttribute('class', 'event');
  h4.setAttribute('class', 'event__title');
  control.setAttribute('class', 'control');
  // buttonEdit.setAttribute('class', 'control__button control__button--edit');
  buttonDelete.setAttribute('class', 'control__button control__button--delete');

  // control.append(buttonEdit, buttonDelete);
  control.append(buttonDelete);
  div.append(control, h4);
  events.append(div);

  div.style.height = item.duration <= 10 ? `${30 * (item.duration / 10 + 1)}px` : `${30 * (item.duration / 10)}px`;
});

events.addEventListener('click', (e) => {
  if (e.target.classList.contains('control__button--delete')) {
    e.target.closest('.event').remove();
  }
});

// const formButton = document.querySelector('.form__button');

// formButton.addEventListener('click', (e) => {
//   e.preventDefault();

//   const formInput = [...document.querySelectorAll('.form__input')];
//   const formInputVlues = formInput.map(item => item.value);

//   eventsList.push(new Event(...formInputVlues));

//   console.log(eventsList);
// });
