class Bomb {
    constructor(x,y){
        var options = {
            restitution: 0.04
        }

        this.body = Bodies.circle(x,y,20,options);
        World.add(world, this.body);
        this.bomb = loadImage("bomb.png");

    }

    display()
    {
        imageMode(CENTER)
        image(this.bomb, this.body.position.x, this.body.position.y, 20, 20)
    }
}