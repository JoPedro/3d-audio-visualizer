const W = 400
const H = 400
const PLAY = 'play'
const PAUSE = 'pause'
const STOP = 'stop'

let song
let waveformCanvas
let fft
let waveform
let playToggle
let stopBtn

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
  createCanvas(W, H, WEBGL)
  waveformCanvas = createGraphics(W, H)
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
  // orbitControl()
  background('#232627')
  waveform = fft.waveform()
  noFill()

  push()
  stroke(255)
  rotateX(frameCount * 0.02)
  rotateY(frameCount * 0.02)
  box(50)
  pop()

  push()
  stroke('#11d116')
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
