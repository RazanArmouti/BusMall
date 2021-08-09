'use strict';
// Variables Declaration
let imagesArray = ['bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'water-can.jpg',
  'wine-glass.jpg'];

const imgSec = document.getElementById('imgSec');
let firstImage = document.getElementById('firstImage');
let secondImage = document.getElementById('secondImage');
let thirdImage = document.getElementById('thirdImage');

let numberOfRound = 25;
let totalOfClicked = 0;

let firstRandom = 0;
let secondRandom = 0;
let thirdRandom = 0;

let oldFirstRandom = 0;
let oldSecondRandom = 0;
let oldThirdRandom = 0;



//constructor
function imgConstructor(name, imageSrc) {
  this.name = name;
  this.imageLoc = `./img/${imageSrc}`;
  this.seen = 0;
  this.vote = 0;
  imgConstructor.allSplitArray.push(this);
}

function getRandomNo(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function SplitImges() {

  for (let i = 0; i < imagesArray.length; i++) {
    new imgConstructor(imagesArray[i].split('.')[0], imagesArray[i]);

  }

}
function render() {

  SplitImges();

  do {
    firstRandom = getRandomNo(0, imagesArray.length - 1);
    secondRandom = getRandomNo(0, imagesArray.length - 1);
    thirdRandom = getRandomNo(0, imagesArray.length - 1);

    // console.log(firstRandom,secondRandom,thirdRandom,oldFirstRandom,oldSecondRandom,oldThirdRandom);

  } while ((firstRandom === secondRandom || firstRandom === thirdRandom || secondRandom === thirdRandom) ||
  (oldFirstRandom === firstRandom || oldFirstRandom === secondRandom || oldFirstRandom === thirdRandom) ||
  (oldSecondRandom === firstRandom || oldSecondRandom === secondRandom || oldSecondRandom === thirdRandom) ||
    (oldThirdRandom === firstRandom || oldThirdRandom === secondRandom || oldThirdRandom === thirdRandom));
  oldFirstRandom = firstRandom;
  oldSecondRandom = secondRandom;
  oldThirdRandom = thirdRandom;




  firstImage.src = imgConstructor.allSplitArray[firstRandom].imageLoc;
  secondImage.src = imgConstructor.allSplitArray[secondRandom].imageLoc;
  thirdImage.src = imgConstructor.allSplitArray[thirdRandom].imageLoc;


  imgConstructor.allSplitArray[firstRandom].seen++;
  imgConstructor.allSplitArray[secondRandom].seen++;
  imgConstructor.allSplitArray[thirdRandom].seen++;

}
imgConstructor.allSplitArray = [];

const resForm = document.getElementById('resForm');
function renderresult() {
  let submitElement = document.createElement('input');
  //   let form1 = document.createElement('form');
  submitElement.setAttribute('type', 'submit');
  submitElement.setAttribute = ('value', 'View Results');

  resForm.appendChild(submitElement);
  resForm.addEventListener('submit', SubmitHandlerforRender);

}

function SubmitHandlerforRender(event) {
  event.preventDefault();
  const listDiv = document.getElementById('listDiv');
  let ulElement = document.createElement('Ul');
  listDiv.appendChild(ulElement);
  for (let res = 0; res < imagesArray.length; res++) {
    let liElement = document.createElement('li');
    liElement.textContent = `${imgConstructor.allSplitArray[res].name} had ${imgConstructor.allSplitArray[res].vote} votes, and was seen ${imgConstructor.allSplitArray[res].seen} times.`;
    ulElement.appendChild(liElement);
  }
  resForm.removeEventListener('submit', SubmitHandlerforRender);

}

function chartRender() {
  let nameArr=[];
  let seenArr=[];
  let voteArr=[];
  let ctx = document.getElementById('myChart').getContext('2d');
  for(let x=0;x<imagesArray.length;x++){
    nameArr.push( imgConstructor.allSplitArray[x].name);
    seenArr.push(imgConstructor.allSplitArray[x].seen);
    voteArr.push( imgConstructor.allSplitArray[x].vote);
    
  }
  
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels:nameArr,
      datasets: [{
        label: '# of Seen',
        data:seenArr ,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },

      {
        label: '# of Votes',
        data:voteArr,
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'

          
        ],
        borderColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });


}

imgSec.addEventListener('click', sectionClickHandler);
function sectionClickHandler(e) {
  if ((e.target.id === 'firstImage' || e.target.id === 'secondImage' || e.target.id === 'thirdImage') && totalOfClicked < numberOfRound) {

    if (e.target.id === 'firstImage') {
      imgConstructor.allSplitArray[firstRandom].vote++;

    }

    else if (e.target.id === 'secondImage') {
      imgConstructor.allSplitArray[secondRandom].vote++;

    }
    else if (e.target.id === 'thirdImage') {
      imgConstructor.allSplitArray[thirdRandom].vote++;

    }

    render();

    totalOfClicked++;
  }

  if (totalOfClicked >= numberOfRound) {
    renderresult();
    imgSec.removeEventListener('click', sectionClickHandler);
    chartRender();

  }
}
render();
