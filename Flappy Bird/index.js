import kontra from "./node_modules/kontra/kontra.mjs";

let { init, Sprite, SpriteSheet, GameLoop, initKeys, keyPressed, degToRad } = kontra;

let { canvas, context } = init();

initKeys();

let planeImage = new Image();
planeImage.src = "./tappyplane/Spritesheet/planes.png";

let backgroundImage = new Image();
backgroundImage.src = "./tappyplane/PNG/background.png";

let mountainImage = new Image();
mountainImage.src = "./tappyplane/PNG/rockSnow.png";

let mountainDownImage = new Image();
mountainDownImage.src = "./tappyplane/PNG/rockSnowDown.png";

let groundImage = new Image();
groundImage.src = "./tappyplane/PNG/groundSnow.png";

planeImage.onload = function () {
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

  let mountain = Sprite({
    x: 600,
    y: 200,
    image: mountainImage
  });

  let downMontain = Sprite({
    x: 600,
    y: mountain.y - 330,
    image: mountainDownImage
  });

  let mountain2 = Sprite({
    x: 400,
    y: 370,
    image: mountainImage
  });

  let downMontain2 = Sprite({
    x: 400,
    y: mountain2.y - 330,
    image: mountainDownImage
  });


  let background = Sprite({
    x: 0,
    y: 0,
    image: backgroundImage
  });

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
    // dy: 3,
    anchor: { x: 0.5, y: 0.5 },

    update: function() {
        this.advance();

        if (this.y > 408 || this.y < 72) {
            this.dy = 0;
            this.ttl = 0;
        }

        if (keyPressed("space")) {
            // this.rotation = 5.49779;
            this.y -= 10;
        }
    },

    animations: planeSheet.animations
  });


  let loop = GameLoop({
    update: function () {
      plane.update();
    },

    render: function () {
      background.render();
      plane.setScale(0.5);
      plane.render();
      mountain.render();
      downMontain.render();
      mountain2.render();
      downMontain2.render();
      ground.render();
      ceiling.render();
    },
  });

  loop.start();
};
