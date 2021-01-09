import kontra from './node_modules/kontra/kontra.mjs';
let { Sprite, GameObject } = kontra;

let mountainImage = new Image();
mountainImage.src = "./tappyplane/PNG/rockSnow.png";

let mountainDownImage = new Image();
mountainDownImage.src = "./tappyplane/PNG/rockSnowDown.png";

let obstacles = [
    Sprite({
        x: 400,
        y: 250,
        image: mountainImage
    }),
    Sprite({
        x: 400,
        y: 250 - 330,
        image: mountainDownImage
    })
];



function generateMountains() {
    if (obstacles.length < 15) {
        let y = Math.random() * (401 - 200) + 200;
        console.log(y);
    
        obstacles.push(Sprite({
            x: this.x + 200,
            y: this.y,
            image: mountainImage
        }));
    
        obstacles.push(Sprite({
            x: this.x + 200,
            y: this.y - 330,
            image: mountainDownImage
        }));
    }
}

export default obstacles;
