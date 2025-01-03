const W = 400
const H = 400
let song
let waveformCanvas

function preload() {
  song = loadSound('./audio/griselda type beat.mp3')
}

function setup() {
  createCanvas(W, H, WEBGL)
  song.play()
  waveformCanvas = createGraphics(W, H)
  waveformCanvas.background(0, 128, 255, 64)
}

function draw() {
  orbitControl()
  background(0)
  box(50)

  push()
  translate(-W / 2, -H / 2)
  image(waveformCanvas, 0, 0)
  pop()
}
