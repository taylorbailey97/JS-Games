import kontra from "./node_modules/kontra/kontra.mjs";
import generateObstacles, { generateMountains } from './mountains.js'

let { init, Sprite, SpriteSheet, GameLoop, initKeys, keyPressed, degToRad } = kontra;

let { canvas, context } = init();

initKeys();

let obstacles = generateObstacles();

let planeImage = new Image();
planeImage.src = "./tappyplane/Spritesheet/planes.png";

let backgroundImage = new Image();
backgroundImage.src = "./tappyplane/PNG/background.png";

let groundImage = new Image();
groundImage.src = "./tappyplane/PNG/groundSnow.png";

let ground = Sprite({
  x: 0,
  y: 409,
  image: groundImage
});

let ceiling = Sprite({
  x: 800,
  y: 71,
  image: groundImage,
  rotation: degToRad(180)
});

let background = Sprite({
  x: 0,
  y: 0,
  image: backgroundImage
});

planeImage.onload = function () {

  let planeSheet = SpriteSheet({
    image: planeImage,
    frameWidth: 88,
    frameHeight: 73,
    animations: {
      walk: {
        frames: [0, 2, 10],
        frameRate: 30,
      },
    },
  });
  let plane = Sprite({
    x: 100,
    y: 240,
    ddy: 0.5,
    anchor: { x: 0.5, y: 0.5 },

    update: function() {
        this.advance();

        if (this.y > 408 || this.y < 72) {
            this.ttl = 0;
        }

        if (keyPressed("space")) {
            // this.rotation = 5.49779;
          this.ddy = -0.25;
        } else {
          this.ddy = 0.5
        }
    },

    animations: planeSheet.animations
  });

  plane.velocity.clamp(0, -3, 0, 3)
  plane.position.clamp(100, 75, 100, 435)


  let loop = GameLoop({
    update: function () {
      plane.update();
      generateMountains(obstacles);
      obstacles.forEach(element => {
        element.update();
      });
    },

    render: function () {
      background.render();
      plane.setScale(0.5);
      plane.render();
      obstacles.forEach(element => {
        element.render()
      });
      obstacles = obstacles.filter(element => element.isAlive());
      ground.render();
      ceiling.render();
    },
  });

  loop.start();
};
