let imgs = []; //empty array
let flower;
let imageIndex = 0;
let flowerShow = false;

async function setup() {
  createCanvas(400, 400);

  let allPromises = [];

  for (let i = 1; i <= 4; i++) {
    let filename = "assets/konig" + i + ".png";
    // add loadImage promise to array without awaiting sequentially
    let onePromise = loadImage(filename); //images break for loop, put promise into promises, images await & recollect promises
    allPromises.push(onePromise);
  }

  imgs = await Promise.all(allPromises); //loadImage out to save time as a pack of promises
  flower = await loadImage("assets/flower.png");
}

function draw() {
  background(220);

  if (flowerShow && flower) {
    showImage(flower);
  } else if (imgs.length > 0) {
    imageIndex = min(floor(frameCount / 100), imgs.length - 1);
    showImage(imgs[imageIndex]);
  }
}

function mousePressed() {
  flowerShow = true;
  console.log("Mouse pressed!");
}

function showImage(img) {
  let scaleFactor = min(400 / img.width, 400 / img.height);
  let newWidth = img.width * scaleFactor;
  let newHeight = img.height * scaleFactor;

  let x = (400 - newWidth) / 2;
  let y = (400 - newHeight) / 2;

  image(img, x, y, newWidth, newHeight);
}