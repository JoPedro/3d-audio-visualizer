const WIDTH = 1280
const HEIGHT = 720
const PLAY = 'play'
const PAUSE = 'pause'
const STOP = 'stop'
const SCALE = 128

let song
let waveformCanvas
let fft
let waveform
let playToggle
let stopBtn
let rows
let cols

function preload() {
  song = loadSound('./audio/griselda type beat.mp3')
}

function togglePlay() {
  !song.isPlaying() ? song.play() : song.pause()
}

function toggleLabel() {
  !song.isPlaying() ? playToggle.html(PAUSE) : playToggle.html(PLAY)
}

function setup() {
  createCanvas(WIDTH, HEIGHT, WEBGL)
  cols = WIDTH / SCALE;
  rows = HEIGHT / SCALE;

  waveformCanvas = createGraphics(WIDTH, HEIGHT)
  fft = new p5.FFT()

  playToggle = createButton(PLAY)
  playToggle.mousePressed(() => {
    toggleLabel();
    togglePlay();
  })
  playToggle.style('margin-left:4px')

  stopBtn = createButton(STOP)
  stopBtn.mousePressed(() => {
    playToggle.html(PLAY)
    song.stop();
  })

  song.onended(() => playToggle.html(PLAY))
}

function draw() {
  background('#232627')
  orbitControl()
  waveform = fft.waveform()
  noFill()

  translate(-width / 2, -height / 2)
  stroke(255)

  push()
  fill('#3d3d3d')
  translate(0, 128, -720)
  rotateX(PI / 3)
  for (let y = 0; y < rows; y++) {
    beginShape(TRIANGLE_STRIP)
    for (let x = 0; x < cols; x++) {
      if (y % 2 === 0) {
        vertex(x * SCALE, (y + 1) * SCALE)
        vertex(x * SCALE, y * SCALE)
      }
      else {
        vertex(x * SCALE, y * SCALE)
        vertex(x * SCALE, (y + 1) * SCALE)
      }
    }
    endShape()
  }
  pop()

  translate(0, 0, 64)

  stroke('#11d116')
  image(waveformCanvas, 0, 0)

  beginShape()
  for (let i = 0; i < waveform.length; i++) {
    // waveform values are -1 to 1, mapped to width and height
    let x = map(i, 0, waveform.length, 0, width)
    let y = map(waveform[i], -1, 1, 0, height / 2)
    // flatten the max amplitude to fit half the height
    vertex(x, y + height / 4)
  }
  endShape()
}
