import kontra from './node_modules/kontra/kontra.mjs';
let { Sprite, GameObject, randInt } = kontra;

let mountainImage = new Image();
mountainImage.src = "./tappyplane/PNG/rockSnow.png";

let mountainDownImage = new Image();
mountainDownImage.src = "./tappyplane/PNG/rockSnowDown.png";

let mountain = {
    dx: -2,
    update() {
        this.advance();

        if (this.x < -100) {
            this.ttl = 0
        }
    }
}

function generateObstacles() {
    return [
        Sprite({
            x: 400,
            y: 250,
            image: mountainImage,
            ...mountain
        }),
        Sprite({
            x: 400,
            y: 250 - 330,
            image: mountainDownImage,
            ...mountain
        })
    ];
}



export function generateMountains(obstacles) {
    if (obstacles.length < 15) {
        let y = randInt(200, 400);
        let x = obstacles[obstacles.length - 1].x + 200;
        
        obstacles.push(Sprite({
            x,
            y,
            image: mountainImage,
            ...mountain
        }));
    
        obstacles.push(Sprite({
            x,
            y: y - 330,
            image: mountainDownImage,
            ...mountain
        }));
    }
}

export default generateObstacles;
