let room;
let laptopOn = false;
let laptopDetail = false;
let windowOpen = false;
let windowProgress = 0;
let breezeParticles = [];
let dogPetUntil = 0;
let sceneZoom = 1.0;
const MIN_ZOOM = 1.0;
const MAX_ZOOM = 1.35;
let dogState = "resting";
let dogStateUntil = 0;
let dogNextBlinkFrame = 0;
let dogBlinkUntil = 0;
let dogHearts = [];
const W = 480;
const H = 320;

function setup() {
  createCanvas(1200, 700);
  noSmooth();
  room = createGraphics(W, H);
  room.noSmooth();
}



function draw() {
  room.clear();
  drawRoom();
  drawWindow();
  drawWindowState();
  drawDesk();
  drawDeskObjects();
  drawLaptopStatus();
  drawDog();
  drawDogFeedback();
  if (laptopDetail) {
    drawLaptopDetail();
  };
  let displayW = width * sceneZoom;
  let displayH = height * sceneZoom;
  image(room, (width - displayW) / 2, (height - displayH) / 2, displayW, displayH);
}



//Room structure
function drawRoom() {
  //wall
  room.background("#d9a99e");
  room.noStroke();
  //left wall
  room.fill("#d9aaa1");
  room.rect(0, 0, 310, 225);
  //right wall
  room.fill("#e8bdb0");
  room.rect(310, 0, 170, 225);
  //corner shadow
  room.fill("#bd8e8a");
  room.rect(306, 0, 5, 225);
  //lines
  room.fill("#e8beb0");
  room.rect(0, 220, 480, 5);
  // floor
  room.fill("#a8755d");
  room.rect(0, 225, 480, 95);
  // wooden floor
  room.fill("#bd8b6d");
  for (let x = 0; x < 480; x += 65) {
    room.rect(x, 228, 1, 92);
    room.rect(x + 8, 265, 28, 1);
  }
  room.fill("#956750");
  room.rect(0, 225, 480, 3);
}



//2. Window
function drawWindow() {
  let sunlight = sin(frameCount * 0.008) * 8;
  room.fill("#8b5f4d");
  room.rect(320, 24, 132, 142);
  room.fill(177 + sunlight, 195 + sunlight, 205 + sunlight);
  room.rect(326, 30, 120, 130);
  room.fill("#9a6951");
  room.rect(316, 160, 142, 8);
  room.fill("#d5a17c");
  room.rect(320, 157, 132, 5);
  room.fill("#8e624f");
  room.rect(383, 30, 4, 130);
}



function drawWindowState() {
  let target = windowOpen ? 1 : 0;
  windowProgress = lerp(windowProgress, target, 0.06);
  if (windowProgress > 0.01) {
    room.push();
    let shift = windowProgress * 24;
    room.fill("#8b5f4d");
    room.rect(383 + shift, 30, 5, 130);
    room.fill("#a8c5d1");
    room.rect(390 + shift, 34, 48, 122);
    room.fill("#d5e0d8");
    room.rect(394 + shift, 38, 3, 112);
    room.fill("#f0d4a0");
    room.rect(388 + shift, 91, 4, 12);
    room.pop();
  }
  drawBreeze();
}



function drawBreeze() {
  let strength = windowProgress;
  if (strength < 0.02) {
    return;
  }
  room.push();
  room.noFill();
  let breezeStrength = 100 * strength;
  room.stroke(235, 244, 235, breezeStrength);
  room.strokeWeight(1.5);
  room.bezier(335, 105, 305 + sin(frameCount * 0.025) * 8, 95,
    285, 125 + sin(frameCount * 0.035) * 10, 245, 115 + sin(frameCount * 0.025) * 7);
  room.stroke(220, 235, 235, breezeStrength * 0.8);
  room.bezier(340, 125, 315, 145 + sin(frameCount * 0.03) * 7, 285, 135 + sin(frameCount * 0.025) * 8, 265, 150 + sin(frameCount * 0.03) * 6);
  room.stroke(255, 235, 220, breezeStrength * 0.65);
  room.bezier(350, 85, 325, 75 + sin(frameCount * 0.02) * 5, 305, 100 + sin(frameCount * 0.03) * 8, 285, 95 + sin(frameCount * 0.02) * 5);
  room.pop();
  for (let i = 0; i < 3; i++) {
    let offset = i * 47;
    let particleX = 330 - ((frameCount * 0.55 + offset) % 105);
    let particleY = 115 + sin(frameCount * 0.035 + i * 2) * 18;
    room.noStroke();
    room.fill(255, 239, 207, 150 * strength);
    room.rect(particleX, particleY, 2, 2);
  }
}



function drawDesk() {
  room.fill("#bc8054");
  room.rect(18, 148, 270, 11);
  room.fill("#e2aa73");
  room.rect(18, 145, 270, 5);
  room.fill("#87583e");
  room.rect(18, 159, 270, 5);
  room.fill("#956344");
  room.rect(30, 163, 12, 75);
  room.rect(260, 163, 12, 75);
  room.fill("#b77c52");
  room.rect(33, 164, 5, 70);
  room.rect(263, 164, 5, 70);
}



function drawDeskObjects() {
  drawLamp(43, 143);
  drawCup(88, 145);
  drawLaptop(155, 145);
  drawBanana(250, 145);
}



function drawLamp(x, y) {
  room.fill("#946b55");
  room.rect(x + 13, y - 10, 8, 10);
  room.rect(x + 7, y - 1, 20, 3);
  room.fill("#f7d69c");
  room.rect(x + 4, y - 36, 26, 20);
  room.rect(x, y - 31, 34, 12);
  room.fill(255, 224, 158, 35);
  room.rect(x - 5, y - 48, 45, 45);
}



function drawCup(x, y) {
  room.fill("#f3e2cf");
  room.rect(x, y - 23, 28, 24);
  room.fill("#d3aa94");
  room.rect(x + 3, y - 20, 22, 17);
  room.noFill();
  room.stroke("#f3e2cf");
  room.strokeWeight(4);
  room.rect(x + 25, y - 18, 9, 13);
  room.noStroke();
}



function drawLaptop(x, y) {
  room.fill("#554d68");
  room.rect(x, y - 68, 77, 61);
  room.fill("#8d88a9");
  room.rect(x + 4, y - 64, 69, 53);
  room.fill("#8da9cb");
  room.rect(x + 7, y - 61, 63, 47);
  room.fill("#d8d8e6");
  room.rect(x + 19, y - 42, 20, 5);
  room.rect(x + 25, y - 47, 13, 5);
  room.fill("#e9c6bd");
  room.rect(x + 47, y - 33, 15, 5);
  room.fill("#625b70");
  room.quad(x - 5, y - 7, x + 82, y - 7, x + 91, y + 1, x - 10, y + 1);
  room.fill("#a49bb0");
  room.rect(x + 4, y - 5, 70, 3);
}



function drawBanana(x, y) {
  room.fill("#f0cf53");
  room.beginShape();
  room.vertex(x, y - 4);
  room.vertex(x + 8, y - 12);
  room.vertex(x + 20, y - 15);
  room.vertex(x + 31, y - 11);
  room.vertex(x + 34, y - 5);
  room.vertex(x + 25, y - 7);
  room.vertex(x + 16, y - 6);
  room.vertex(x + 7, y + 1);
  room.endShape(CLOSE);
  room.fill("#ffe68a");
  room.rect(x + 10, y - 10, 12, 3);
  room.fill("#70513c");
  room.rect(x + 1, y - 5, 4, 4);
}



function drawDog() {
  updateDogIdleState();
  let sleeping = dogState === "sleeping";
  let curious = dogState === "curious";
  let bananaLook = dogState === "banana";
  let breathSpeed = sleeping ? 0.025 : 0.045;
  let breathAmount = sleeping ? 0.7 : 1.0;
  let breathing = sin(frameCount * breathSpeed) * breathAmount;
  let tailAmplitude = sleeping ? 0.025 :
    curious ? 0.36 :
      bananaLook ? 0.18 : 0.10;
  let tailWag = sin(frameCount * 0.12) * tailAmplitude;
  let earAmplitude = sleeping ? 0.3 :
    curious ? 2.2 : 1.0;
  let earMove = sin(frameCount * 0.045) * earAmplitude;
  let headLift = sleeping ? 2 :
    curious ? -5 :
      bananaLook ? -2 : 0;
  let headTilt = sleeping ? 0.04 :
    curious ? -0.10 :
      bananaLook ? -0.13 : 0;
  let blinking = updateDogBlink();
  let eyesClosed = sleeping || blinking;
  let gazeX = bananaLook ? -2 :
    curious ? -1 : 0;
  let gazeY = bananaLook ? -3 :
    curious ? -2 : 0;
  room.push();
  room.translate(315, 258 + breathing);
  room.noStroke();
  room.rectMode(CORNER);
  //shadow
  room.fill(65, 44, 42, 45);
  room.rect(-52, 24, 108, 7);
  //tail
  room.push();
  room.translate(39, -12);
  room.rotate(tailWag);
  room.fill("#29272c");
  room.rect(0, 0, 17, 7);
  room.rect(12, -3, 10, 8);
  room.fill("#eee7df");
  room.rect(19, -3, 6, 8);
  room.pop();
  //body
  room.fill("#29272c");
  room.rect(-14, -27, 60, 34);
  room.rect(-7, -32, 46, 8);
  room.rect(35, -22, 15, 22);
  room.fill("#eee7df");
  room.rect(-5, -10, 38, 14);
  room.rect(2, -5, 27, 9);
  room.fill("#38343a");
  room.rect(5, -27, 25, 7);
  room.rect(32, -22, 10, 8);
  room.fill("#29272c");
  room.rect(28, -2, 15, 19);
  room.rect(41, -1, 12, 18);
  room.fill("#eee7df");
  room.rect(27, 13, 17, 6);
  room.rect(40, 12, 14, 7);
  room.fill("#29272c");
  room.rect(-12, -3, 15, 22);
  room.rect(4, -2, 14, 22);
  room.fill("#f1e9df");
  room.rect(-15, 14, 19, 8);
  room.rect(2, 14, 19, 8);
  room.push();
  room.translate(-31, -32 + headLift);
  room.rotate(headTilt);
  room.translate(31, 32);
  room.fill("#252329");
  room.rect(-57, -42 + earMove, 13, 22);
  room.rect(-62, -31 + earMove, 9, 12);
  room.rect(-18, -42 - earMove, 13, 22);
  room.rect(-15, -31 - earMove, 9, 12);
  room.fill("#564347");
  room.rect(-58, -30 + earMove, 6, 12);
  room.rect(-15, -30 - earMove, 6, 12);
  room.fill("#29272c");
  room.rect(-53, -50, 43, 38);
  room.rect(-49, -54, 35, 5);
  room.fill("#eee7df");
  room.rect(-35, -49, 9, 19);
  room.rect(-38, -42, 15, 8);
  room.fill("#242328");
  room.rect(-49, -48, 10, 12);
  room.rect(-17, -48, 7, 12);
  room.fill("#b99a75");
  room.rect(-46, -37, 9, 4);
  room.rect(-25, -37, 9, 4);
  room.fill("#eee7df");
  room.rect(-49, -27, 35, 14);
  room.rect(-45, -19, 27, 8);
  room.rect(-41, -14, 18, 5);

  if (eyesClosed) {
    room.fill("#29252a");
    room.rect(-44, -34, 7, 2);
    room.rect(-26, -34, 7, 2);
  } else {
    room.fill("#242126");
    room.rect(-44 + gazeX, -35 + gazeY, 6, 7);
    room.rect(-26 + gazeX, -35 + gazeY, 6, 7);
    room.fill("#fff3df");
    room.rect(-43 + gazeX, -35 + gazeY, 2, 2);
    room.rect(-25 + gazeX, -35 + gazeY, 2, 2);
  }

  room.fill("#f3ece3");
  room.rect(-41, -22, 23, 12);
  room.rect(-38, -25, 17, 5);
  room.fill("#29252a");
  room.rect(-34, -24, 9, 6);
  room.fill("#65565a");
  room.rect(-32, -24, 3, 2);
  room.fill("#65565a");
  room.rect(-30, -18, 2, 5);
  room.rect(-34, -14, 5, 2);
  room.rect(-28, -14, 5, 2);
  room.fill("#8f8279");
  room.rect(-40, -17, 2, 2);
  room.rect(-21, -17, 2, 2);
  room.pop();

  if (sleeping) {
    let ZforSleep = sin(frameCount * 0.04) * 2;
    room.fill("#e4d9e5");
    room.textSize(9);
    room.textFont("monospace");
    room.text("z", -69, -52 - ZforSleep);
    room.text("Z", -78, -62 - ZforSleep);
  }
  room.pop();
}



function updateDogIdleState() {
  if (dogStateUntil === 0) {
    dogStateUntil = frameCount + random(360, 600);
  }
  if (frameCount < dogStateUntil) {
    return;
  }
  if (dogState === "resting") {
    let choice = random();
    if (choice < 0.35) {
      dogState = "sleeping";
      dogStateUntil = frameCount + random(240, 360);
    } else if (choice < 0.68) {
      dogState = "curious";
      dogStateUntil = frameCount + random(90, 150);
    } else {
      dogState = "banana";
      dogStateUntil = frameCount + random(150, 210);
    }
  } else {
    dogState = "resting";
    dogStateUntil = frameCount + random(360, 600);
  }
}



function updateDogBlink() {
  if (dogNextBlinkFrame === 0) {
    dogNextBlinkFrame = frameCount + random(180, 360);
  }
  if (dogBlinkUntil === 0 &&
    frameCount >= dogNextBlinkFrame) {
    dogBlinkUntil = frameCount + 5;
  }
  if (dogBlinkUntil > 0 &&
    frameCount >= dogBlinkUntil) {
    dogBlinkUntil = 0;
    dogNextBlinkFrame = frameCount + random(180, 420);
  }
  return dogBlinkUntil > 0;
}



function drawDogFeedback() {
  for (let i = dogHearts.length - 1; i >= 0; i--) {
    let heart = dogHearts[i];
    let progress = (frameCount - heart.startFrame) / heart.duration;
    if (progress >= 1) {
      dogHearts.splice(i, 1);
      continue;
    }
    let floatY = progress * heart.floatDistance;
    let heartFade = 255 * (1 - progress);
    room.push();
    room.fill(232, 93, 117, heartFade);
    room.noStroke();
    room.textAlign(CENTER, CENTER);
    room.textSize(heart.size);
    room.text("♥", heart.x, heart.y - floatY);
    room.pop();
  }
}



function keyPressed() {
  console.log("Key pressed:", key, "KeyCode:", keyCode);
  console.log("Laptop detail state:", laptopDetail);
  if (keyCode === 27) {
    console.log("ESC detected!");
    if (laptopDetail === true) {
      laptopDetail = false;
      console.log("Laptop detail closed!");
    }
    return false;
  }
}



function getRoomMousePosition() {
  let centerX = width / 2;
  let centerY = height / 2;
  let originalX = (mouseX - centerX) / sceneZoom + centerX;
  let originalY = (mouseY - centerY) / sceneZoom + centerY;
  return {
    x: (originalX / width) * W,
    y: (originalY / height) * H
  };
}



function drawLaptopStatus() {
  room.push();
  if (!laptopOn) {
    return;
  }
  room.noStroke();
  room.fill("#a8c98b");
  room.rect(226, 139, 3, 3);
  room.fill(190, 220, 235, 18);
  room.rect(162, 84, 63, 47);
  room.pop();
}



function drawLaptopDetail() {
  room.push();
  room.textAlign(LEFT, BASELINE);
  room.noStroke();
  room.fill(38, 34, 48, 225);
  room.rect(0, 0, W, H);
  room.fill("#e8d8cb");
  room.rect(35, 20, 410, 280);
  room.fill(40, 32, 42, 50);
  room.rect(40, 25, 410, 280);
  room.fill("#8b7890");
  room.rect(35, 20, 410, 25);
  room.fill("#f0b5a8");
  room.rect(45, 29, 6, 6);
  room.fill("#e9d18e");
  room.rect(57, 29, 6, 6);
  room.fill("#b5cba6");
  room.rect(69, 29, 6, 6);
  room.fill("#fff0e5");
  room.textSize(9);
  room.textFont("monospace");
  room.text("how to become a functioning adult", 180, 36);
  room.fill("#f8eee5");
  room.rect(48, 53, 384, 20);
  room.fill("#8c7c85");
  room.textSize(8);
  room.text("https://brain.exe/404", 58, 66);
  room.fill("#f5e9df");
  room.rect(48, 83, 230, 155);
  room.fill("#796779");
  room.textSize(10);
  room.text("RECENTLY SEARCHED", 60, 101);
  room.fill("#b99a8e");
  room.rect(60, 108, 205, 1);
  room.fill("#665c68");
  room.textSize(9);
  room.text("Good restaurants in Shanghai", 60, 127);
  room.text("Brazilian Jiu-jitsu submissions", 60, 153);
  room.text("How to lose weight by eating ice cream", 60, 179);
  room.text("Puppy kick & bark during sleep", 60, 205);
  room.text("Banana cake discount, Taobao", 60, 229);
  room.fill("#e9e2ed");
  room.noStroke();
  room.rect(290, 83, 142, 155);
  room.fill("#55445f");
  room.textSize(11);
  room.textAlign(LEFT);
  room.text("TO-DO", 303, 101);
  room.stroke("#b7a6bb");
  room.line(303, 108, 419, 108);
  room.noStroke();
  room.fill("#403847");
  room.textSize(10);
  room.textAlign(LEFT);
  room.noFill();
  room.stroke("#8b748f");
  room.rect(304, 120, 8, 8);
  room.rect(304, 145, 8, 8);
  room.rect(304, 170, 8, 8);
  room.rect(304, 195, 8, 8);
  room.noStroke();
  room.fill("#403847");
  room.text("Data analysis", 317, 128);
  room.text("Buy dog treats", 317, 153);
  room.text("CCLab prototype", 317, 178);
  room.text("Leg & glute day", 317, 203);
  room.fill("#f3dca8");
  room.rect(48, 249, 384, 35);
  room.fill("#8b705e");
  room.textSize(9);
  room.text("Cook tofu soup tonight, walk puppy for 30min, 5mg Dayvigo", 60, 270);
  room.fill("#f7e9dc");
  room.textSize(8);
  room.textAlign(CENTER);
  room.text("PRESS ESC TO RETURN", 240, 316);
  room.textAlign(LEFT);
  room.pop();
}



function mousePressed() {
  if (laptopDetail) {
    return;
  }
  let pos = getRoomMousePosition();
  let x = pos.x;
  let y = pos.y;
  //pet dgo
  if (pos.x > 250 && pos.x < 370 && pos.y > 205 && pos.y < 300) {
    dogPetUntil = frameCount + 90;
    let heartCount = floor(random(1, 4));
    for (let i = 0; i < heartCount; i++) {
      dogHearts.push({
        x: random(285, 345),
        y: random(190, 210),
        size: random(9, 15),
        floatDistance: random(15, 30),
        duration: random(45, 75),
        startFrame: frameCount
      });
    }
  }
  //open laptop
  if (x > 155 && x < 232 && y > 77 && y < 139) {
    laptopOn = true;
    return;
  }
  //open/close window
  if (x > 320 && x < 452 && y > 24 && y < 165) {
    windowOpen = !windowOpen;
    return;
  }
}



function doubleClicked() {
  if (laptopDetail) {
    return;
  }
  let pos = getRoomMousePosition();
  console.log("Double clicked at:", pos.x, pos.y);
  if (pos.x > 155 && pos.x < 232 && pos.y > 77 && pos.y < 139) {
    laptopOn = true;
    laptopDetail = true;
    console.log("Laptop detail opened:", laptopDetail);
  }
}