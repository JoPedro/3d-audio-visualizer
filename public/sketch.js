const W = 400
const H = 400

let song
let waveformCanvas
let fft
let waveform

function preload() {
  song = loadSound('./audio/griselda type beat.mp3')
}

function mouseClicked() {
  if (!song.isPlaying()) {
    song.play()
  }
}

function setup() {
  createCanvas(W, H, WEBGL)
  waveformCanvas = createGraphics(W, H)
  fft = new p5.FFT()
}

function draw() {
  // orbitControl()
  background('#232627')
  waveform = fft.waveform();
  noFill()

  push()
  stroke('#11d116')
  rotateX(frameCount * 0.02);
  rotateY(frameCount * 0.02);
  box(50)
  pop()

  push()
  stroke(255)
  translate(-width / 2, -height / 2)
  image(waveformCanvas, 0, 0)

  beginShape()
  for (let i = 0; i < waveform.length; i++) {
    // waveform values are -1 to 1, mapped to width and height
    let x = map(i, 0, waveform.length, 0, width)
    let y = map(waveform[i], -1, 1, 0, height / 2)
    vertex(x, y + height / 4)
  }
  endShape()

  pop()
}
