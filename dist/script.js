const colors = ["#2f3136", "#2a2b30", "#7d8187", "#1e1f23", "#5f6a89"];
const backgroundColor = "#000000";
const width = window.innerWidth;
const height = window.innerHeight;
const totalFrames = 1000;
let frameCount = 0;
let recording = false;

let c01 = (g) => {
  return constrain(g, 0, 1);
};

let ease = (p) => {
  p = c01(p);
  return 3 * p * p - 2 * p * p * p;
};

function easeInQuint(x) {
  return x * x * x * x * x;
}

function easeOutQuart(x) {
  return 1 - pow(1 - x, 4);
}

function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - pow(2, -10 * x);
}

function setup() {
  canvas = createCanvas(width, height, WEBGL);
  noiseSeed(20);
}

function draw() {
  frameCount += 1;
  let frameDelta = (2 * Math.PI * (frameCount % totalFrames)) / totalFrames;
  let delta = sin(frameDelta);
  
  colorMode(RGB);
  
  let bg = color(backgroundColor);
  background(bg);
  
  let w = 20;
  let h = 20;
  let size = 10;
  let space = 12;
  
  translate(0, -500, 0);
  scale(5);
  rotateX(HALF_PI / 1.5);
  rotateZ(frameCount * 0.002);

  translate(-w * space / 2, -h * space / 2, -w * space / 2);

  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
        push();

        translate(i * space, j * space, 0);

        //let d = dist(i, j, w/2, h/2);
        //let d2 = dist(i, 0, w/2, h/2);
        let delt = delta * 10;

      let d = dist(i, j, w / 2, h / 2);
      let d2 = dist(i, j, w / 4, h / 4);
      let d3 = dist(i, j, w - w / 4, h - h / 4);
      let d4 = dist(i, j, w / 4, h - h / 4);
      let d5 = dist(i, j, w - w / 4, h / 4);
      
      let s = 2;
      s -= sin(delt + d2 / 2) * 5;
      s -= sin(delt + d3 / 2) * 5;
      s -= sin(delt + d4 / 2) * 5;
      s -= sin(delt + d5 / 2) * 5;

        //let rx = sin(delt + d);
        //let rz = sin(delt + d);
        //let _z = sin(delt + d) * 20;
        //let _r = cos(d + delt) * sin(cos(d2) * 100) * 20;

        scale(map(s, -10, 10, 1, 0.5));
        rotateX(map(s, -10, 10, PI / 2, 0));
        //rotateY(map(s, -10, 10, PI / 2, 0));
        //rotateX(map(_z, 0, 20, PI, 0));
      
      
        colorMode(HSB);

        let _h = map(s, 0, w / 2, 200, 180);
        let _b = map(s, 1, 0, 10, 80, true);
        let _s = map(s, 0, 1, 100, 0, true);

        fill(color(_h, _s, _b, 1))
      
        let _h2 = map(s, 0, w / 2, 200, 180);
        let _b2 = map(s, 10, 0, 10, 100, true);
        let _s2 = map(s, 0, 1, 100, 50, true);

        strokeWeight(1);
        stroke(color(_h2, _s2, _b2, 1));

        box(size, size, size / 2);

        pop();
      
    }
  }
  //checkForRecording();
}