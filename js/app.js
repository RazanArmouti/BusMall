'use strict';
// Variables Declaration
let imagesArray = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg',
  'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg',
  'water-can.jpg', 'wine-glass.jpg'];

const imgSec = document.getElementById('imgSec');
let firstImage = document.getElementById('firstImage');
let secondImage = document.getElementById('secondImage');
let thirdImage = document.getElementById('thirdImage');

let allSplitArray = [];

let numberOfRound = 25;
let totalOfShow = 0;
let totalOfClicked = 0;
let clikedFlag;
let imageFlag='';

let clickedresult = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let seenResult    = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


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
  imgConstructor.allSplitArray = [];
  for (let i = 0; i < imagesArray.length; i++) {
    new imgConstructor(imagesArray[i].split('.')[0], imagesArray[i]);

  }

  //console.log(imgConstructor.allSplitArray);
}
function render() {

  SplitImges();

  let firstRandom = getRandomNo(0, imagesArray.length - 1);
  let secondRandom = getRandomNo(0, imagesArray.length - 1);
  let thirdRandom = getRandomNo(0, imagesArray.length - 1);
  while (firstRandom === secondRandom || firstRandom === thirdRandom || secondRandom === thirdRandom) {
    firstRandom = getRandomNo(0, imagesArray.length - 1);
    secondRandom = getRandomNo(0, imagesArray.length - 1);
    thirdRandom = getRandomNo(0, imagesArray.length - 1);
  }

  firstImage.src = imgConstructor.allSplitArray[firstRandom].imageLoc;
  secondImage.src = imgConstructor.allSplitArray[secondRandom].imageLoc;
  thirdImage.src = imgConstructor.allSplitArray[thirdRandom].imageLoc;

  seenResult[firstRandom] += 1;
  seenResult[secondRandom] += 1;
  seenResult[thirdRandom] += 1;
  //console.log(firstRandom,secondRandom,thirdRandom);

  //   imgConstructor.allSplitArray[firstRandom].seen++;
  //   imgConstructor.allSplitArray[secondRandom].seen++;
  //   imgConstructor.allSplitArray[thirdRandom].seen++;

  if (clikedFlag === true) {

    if (imageFlag === 'firstImage') {
      //imgConstructor.allSplitArray[firstRandom].vote++;
      //console.log(imageFlag,firstRandom);

      clickedresult[firstRandom] += 1;


    }

    else if (imageFlag === 'secondImage') {
      // imgConstructor.allSplitArray[secondRandom].vote++;
      // console.log(imageFlag,secondRandom);

      clickedresult[secondRandom] += 1;


    }
    else if (imageFlag === 'thirdImage') {
      // imgConstructor.allSplitArray[thirdRandom].vote++;
      //console.log(imageFlag,thirdRandom);

      clickedresult[thirdRandom] += 1;


    }


  }

  totalOfShow++;
  imageFlag='';

}


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
  let olElement = document.createElement('ol');
  listDiv.appendChild(olElement);
  for (let res = 0; res < imagesArray.length; res++) {
    imgConstructor.allSplitArray[res].seen =seenResult[res];
    imgConstructor.allSplitArray[res].seen =seenResult[res];
    imgConstructor.allSplitArray[res].seen =seenResult[res];
    imgConstructor.allSplitArray[res].vote =clickedresult[res];
    imgConstructor.allSplitArray[res].vote = clickedresult[res];
    imgConstructor.allSplitArray[res].vote = clickedresult[res];
    let liElement = document.createElement('li');
    liElement.textContent = `${imgConstructor.allSplitArray[res].name} had ${imgConstructor.allSplitArray[res].vote} votes, and was seen ${imgConstructor.allSplitArray[res].seen} times.`;
    olElement.appendChild(liElement);
    //console.log(liElement.textContent);

  }
  //console.log(clickedresult);


}

imgSec.addEventListener('click', sectionClickHandler);
function sectionClickHandler(e) {
  if ((e.target.id === 'firstImage' || e.target.id === 'secondImage' || e.target.id === 'thirdImage') && totalOfClicked < numberOfRound) {

    imageFlag = e.target.id;
    clikedFlag = true;
    //console.log(imageFlag);
    render();

    imageFlag='';
    clikedFlag = false;
    totalOfClicked++;
  }
  else {
    renderresult();
    imgSec.removeEventListener('click', sectionClickHandler);

  }
  //console.log(clickedTime);

}

render();












