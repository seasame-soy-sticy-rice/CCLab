let x;
let y;
let stimulation = 0;
let click = 0;
let habituation = 0;
let sensitization = 0;
let lastMildStimulusFrame = -1000;
let lastMouseX = 0;
let lastMouseY = 0;
let lastMovementStimulusFrame = -1000;



function setup() {
    createCanvas(800, 500);
    lastMouseX = mouseX;
    lastMouseY = mouseY;
}



function draw() {
    background(220);

    x = 200 + noise(frameCount / 200) * 350 + sin(frameCount * 0.04) * stimulation * 25 + sin(frameCount * 0.2) * click * 10;
    y = 160 + noise(frameCount / 180 + 100) * 160 + cos(frameCount * 0.04) * stimulation * 25 + cos(frameCount * 0.2) * click * 10;

    let mouseMovement = abs(mouseX - lastMouseX) + abs(mouseY - lastMouseY);
    if (mouseMovement > 2 && abs(mouseX - x) < 220 && abs(mouseY - y) < 200 && frameCount - lastMovementStimulusFrame > 3) {
        let timeSinceLastMildStimulus =
            frameCount - lastMildStimulusFrame;
        if (timeSinceLastMildStimulus < 120) {
            habituation += 0.008;
        } else {
            habituation -= 0.02;
        };
        if (habituation < 0) {
            habituation = 0;
        };
        if (habituation > 0.8) {
            habituation = 0.8;
        };
        let movementResponse = 1 - habituation + sensitization;
        if (movementResponse < 0.1) {
            movementResponse = 0.1;
        };
        if (movementResponse > 1.5) {
            movementResponse = 1.5;
        };
        stimulation += 0.12 * movementResponse;
        if (stimulation > 1) {
            stimulation = 1;
        };
        lastMildStimulusFrame = frameCount;
        lastMovementStimulusFrame = frameCount;
    };
    lastMouseX = mouseX;
    lastMouseY = mouseY;

    stimulation -= 0.0015;
    if (stimulation < 0) {
        stimulation = 0;
    };

    click -= 0.025;
    if (click < 0) {
        click = 0;
    }

    habituation -= 0.0005;
    if (habituation < 0) {
        habituation = 0;
    };

    sensitization -= 0.0003;
    if (sensitization < 0) {
        sensitization = 0;
    };

    let responseStrength = 1 - habituation + sensitization;
    if (responseStrength < 0.1) {
        responseStrength = 0.1;
    };
    if (responseStrength > 1.5) {
        responseStrength = 1.5;
    };

    let activeStimulation = stimulation * responseStrength;
    let activeClick = click * responseStrength;

    let dx = x - width / 2;
    let dy = y - height / 2;
    let breathing = sin(frameCount * 0.05) * 1.2;

    drawTentacle(330 + dx, 150 + dy, 110, 250, 20, -35, activeStimulation, activeClick);
    drawTentacle(300 + dx, 210 + dy, 150, 190, 40, 60, activeStimulation, activeClick);
    drawTentacle(320 + dx, 350 + dy, 120, 120, 35, 30, activeStimulation * 1.5, activeClick);
    drawTentacle(450 + dx, 370 + dy, 140, 60, 30, -20, activeStimulation * 1.8, activeClick);
    drawTentacle(520 + dx, 230 + dy, 110, 20, 25, 40, activeStimulation * 0.5, activeClick);
    drawTentacle(480 + dx, 130 + dy, 130, 320, 45, -10, activeStimulation, activeClick);
    drawBody(x, y, breathing, activeStimulation, activeClick);
    drawEye(x - 120, y + 50, 50, 0, activeStimulation, activeClick);
    drawEye(x + 50, y - 80, 100, 100, activeStimulation, activeClick);
    drawEye(x + 80, y + 100, 70, 200, activeStimulation, activeClick);
}



function drawBody(x, y, breathing, stimulation, click) {
    push();
    translate(x, y);
    let breathScale = 1 + breathing * 0.04;
    let stimuliScale = stimulation * 0.25;
    let clickScale = click * 0.12;
    let bodyScale = 0.8 * (breathScale + stimuliScale + clickScale);

    let bodyWave = sin(frameCount * 0.035) * (3 + stimulation * 4 + click * 3);

    scale(bodyScale);
    fill(255);
    stroke(255);
    beginShape();
    splineVertex(-100, -100);
    splineVertex(-100, -100);
    splineVertex(-40, -180 - bodyWave);
    splineVertex(60, -190 + bodyWave);
    splineVertex(140, -120 + bodyWave);
    splineVertex(170, -30);
    splineVertex(140, 80 - bodyWave);
    splineVertex(70, 150 + bodyWave);
    splineVertex(-30, 170 + bodyWave);
    splineVertex(-120, 120);
    splineVertex(-160, 40 - bodyWave);
    splineVertex(-150, -50);
    splineVertex(-100, -100);
    splineVertex(-100, -100);
    endShape();
    pop();
}



function drawEye(x, y, size, state, stimulation, click) {
    push();
    translate(x, y);

    let dilation = 1 + sin(frameCount * 0.1 + state) * 0.01 + stimulation * 0.1 + click * 0.25;
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

    if (click > 0.1) {
        fill(255, 0, 0);
        stroke(0, 255, 0);
    } else {
        fill(255);
        stroke(0);
    }
    strokeWeight(2);
    ellipse(0, 0, size * 1.5, size);

    if (click > 0.1) {
        fill(255, 255, 0);
    } else {
        fill(0);
    }

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
    let waveSpeed = 0.035;
    let waveTensity = 35 + stimulation * 35 + click * 30;
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
        if (abs(mouseX - x) < 90 && abs(mouseY - y) < 100) {
            sensitization += 0.35;
            if (sensitization > 1) {
                sensitization = 1;
            };
            habituation -= 0.15;
            if (habituation < 0) {
                habituation = 0;
            };
        } else {
            let timeSinceLastMildStimulus =
                frameCount - lastMildStimulusFrame;
            if (timeSinceLastMildStimulus < 120) {
                habituation += 0.12;
            };
            if (habituation > 0.8) {
                habituation = 0.8;
            };
            lastMildStimulusFrame = frameCount;
        };

        let responseStrength = 1 - habituation + sensitization;
        if (responseStrength < 0.1) {
            responseStrength = 0.1;
        };
        if (responseStrength > 1.5) {
            responseStrength = 1.5;
        };
        stimulation += 0.25 * responseStrength;
        click += 0.5 * responseStrength;
        if (stimulation > 1) {
            stimulation = 1;
        };
        if (click > 1.5) {
            click = 1.5;
        }
    }
}