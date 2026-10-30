let imgs = []; //empty array
let imageIndex = 0;

async function setup() {
  createCanvas(400, 400);

  let allPromises = [];

  for (let i = 1; i <= 11; i++) {
    let filename = "asset/konig" + i + ".jpg";
    // add loadImage promise to array without awaiting sequentially
    let onePromise = loadImage(filename); //images break for loop, put promise into promises, images await & recollect promises
    allPromises.push(onePromise);
  }

  imgs = await Promise.all(allPromises); //loadImage out to save time as a pack of promises
}

function draw() {
  background(220);

  imageIndex = frameCount; //% as module

  image(imgs[imageIndex], 0, 0);
}