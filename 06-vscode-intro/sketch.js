let angle = 0;
let x;
let y;
let stimulation = 0;
let click = 0;



function setup() {
    createCanvas(800, 500);
}



function draw() {
    background(220);

    x = 200 + noise(frameCount / 200) * 350 + sin(frameCount * 0.04) * stimulation * 25 + sin(frameCount * 0.2) * click * 10;
    y = 160 + noise(frameCount / 180 + 100) * 160 + cos(frameCount * 0.04) * stimulation * 25 + cos(frameCount * 0.2) * click * 10;

    if (abs(mouseX - x) < 220 && abs(mouseY - y) < 200) {
        stimulation += 0.006;
    } else {
        stimulation -= 0.003;
    }

    if (stimulation > 1) {
        stimulation = 1;
    };
    if (stimulation < 0) {
        stimulation = 0;
    }

    click -= 0.025;
    if (click < 0) {
        click = 0;
    }

    let dx = x - width / 2;
    let dy = y - height / 2;
    let breathing = sin(frameCount * 0.05) * 1.2;

    drawTentacle(330 + dx, 150 + dy, 110, 250, 20, -35, stimulation, click);
    drawTentacle(300 + dx, 210 + dy, 150, 190, 40, 60, stimulation, click);
    drawTentacle(320 + dx, 350 + dy, 120, 120, 35, 30, stimulation * 1.5, click);
    drawTentacle(450 + dx, 370 + dy, 140, 60, 30, -20, stimulation * 1.8, click);
    drawTentacle(520 + dx, 230 + dy, 110, 20, 25, 40, stimulation * 0.5, click);
    drawTentacle(480 + dx, 130 + dy, 130, 320, 45, -10, stimulation, click);
    drawBody(x, y, breathing, stimulation, click);
    drawEye(x - 120, y + 50, 50, 0, stimulation, click);
    drawEye(x + 50, y - 80, 100, 100, stimulation, click);
    drawEye(x + 80, y + 100, 70, 200, stimulation, click);
}



function drawBody(x, y, breathing, stimulation, click) {
    push();
    translate(x, y);
    let breathScale = 1 + breathing * 0.04;
    let stimuliScale = stimulation * 0.1;
    let clickScale = click * 0.08;
    let bodyScale = 0.8 * (breathScale + stimuliScale + clickScale);
    scale(bodyScale);
    fill(255);
    stroke(255);
    beginShape();
    splineVertex(-100, -100);
    splineVertex(-100, -100);
    splineVertex(-40, -180);
    splineVertex(60, -190);
    splineVertex(140, -120);
    splineVertex(170, -30);
    splineVertex(140, 80);
    splineVertex(70, 150);
    splineVertex(-30, 170);
    splineVertex(-120, 120);
    splineVertex(-160, 40);
    splineVertex(-150, -50);
    splineVertex(-100, -100);
    splineVertex(-100, -100);
    endShape();
    pop();
}



function drawEye(x, y, size, state, stimulation, click) {
    push();
    translate(x, y);

    let dilation = 1 + sin(frameCount * 0.1 + state) * 0.01 + stimulation * 0.1 + click;
    scale(dilation);

    let pupilX = (mouseX - x) * 0.1;
    let pupilY = (mouseY - y) * 0.1;
    if (pupilX > size * 0.25) {
        pupilX = size * 0.25;
    }
    if (pupilX < -size * 0.25) {
        pupilX = -size * 0.25;
    }
    if (pupilY > size * 0.25) {
        pupilY = size * 0.25;
    }
    if (pupilY < -size * 0.25) {
        pupilY = -size * 0.25;
    }

    fill(255, 0, 0);
    stroke(0, 255, 0);
    strokeWeight(2);
    ellipse(0, 0, size * 1.5, size);

    fill(255, 150, 0);
    noStroke();
    circle(pupilX, pupilY, size * 0.4);
    pop();
}



function drawTentacle(x, y, length, angle, thickness, bend, stimulation, click) {
    push();
    translate(x, y);
    rotate(radians(angle));
    noFill();
    stroke(0);
    strokeWeight(thickness);

    beginShape();
    splineVertex(0, 0);
    splineVertex(0, 0);
    let end = 0;
    let waveSpeed = 0.1 + stimulation * 0.1 + click * 0.22;
    let waveTensity = 50 + stimulation * 20 + click * 40;
    for (let i = 1; i <= 10; i++) {
        let position = length * i / 10;
        let wave = sin(frameCount * waveSpeed - i * 0.9) * (i / 10) * waveTensity;
        wave = wave + bend * (i / 10);
        splineVertex(position, wave);
        if (i == 10) {
            end = wave;
        }
    }
    endShape();

    noStroke();
    fill(255);
    circle(length, end, thickness * 0.8);
    pop();
}



function mousePressed() {
    if (abs(mouseX - x) < 220 && abs(mouseY - y) < 200) {
        click += 0.5;
        stimulation += 0.25;
        if (click > 1.5) {
            click = 1.5;
        }
        if (stimulation > 1) {
            stimulation = 1;
        }
    }
}

//background & more interactions e.g. mouse drag, key pressed;
//change colours across areas, more body parts e.g. teeth;
//change eye colours when clicking, cat's eyes, body wave-ish movements;
//tentacles moving too fast;