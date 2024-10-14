// #1. Set up a HTML canvas as game area.
// KP: HTML Canvas
// KP: JavaScript GetContext
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// #2. Create images and link respective sources.
var wagon = new Image();
wagon.src = "images/wagon.png";
var lava = new Image();
lava.src = "images/lava.png";
var background = new Image();
background.src = "images/background.jpg";

// #3. Set up initial game settings.
var bX = 10;
var bY = canvas.height/2;
var gravity = 1.5;
var score = 0;

// #4. Create function to jump up when mouse is clicked.
document.addEventListener("mousedown", moveUp);
function moveUp(){
    bY -= 50;
}

// #5. Spawn the first obstacle by creating a list.
var obstacle = [];
obstacle[0]={
    x : cvs.width/2,
    y : 400
};

// #6. Create function to draw within canvas.
function draw(){
    ctx.drawImage(background,0,0);

    // #6.1. Draw the background. Spawn obstacles and make them move across the canvas.
    for(var i = 0; i < obstacle.length; i++){
        ctx.drawImage(lava,obstacle[i].x,obstacle[i].y);
        obstacle[i].x--;
        if(obstacle[i].x == 125){
            obstacle.push({
                x : cvs.width,
                y : Math.floor(Math.random()*lava.height)+lava.height
            }); 
        }

        // #6.2. Check if the wagon collides with the obstacles. If yes, reload the page. If no, add one score.
        if(bX + wagon.width >= obstacle[i].x && bX <= obstacle[i].x + lava.width && bY <= obstacle[i].y + lava.height && bY+wagon.height >= obstacle[i].y){
            location.reload();
        }
        
        if(obstacle[i].x == 5){
            score++;
        }
    }
    
    // #6.3. Draw the wagon and make it move with gravity.
    ctx.drawImage(wagon,bX,bY);
    bY += gravity;
    let highscore = 0;
    
    // #6.4. Store user's high score locally.
    // KP: JavaScript LocalStorage
    if (localStorage.getItem("highscore")){
        highscore = localStorage.getItem("highscore");
    }

    if (score > highscore){
        highscore = score;
    }

    window.localStorage.setItem("highscore", highscore);

    // #6.5. Draw texts to show current score and high score.
    // KP: Canvas ClearRect, BeginPath, Close Path, And Fill
    ctx.fillStyle = "white";
    ctx.font = "20px Verdana";
    ctx.fillText("Score: "+score,10,cvs.height-50);
    ctx.fillText("High Score: "+highscore, 10, cvs.height-20)
    
    // #6.6. Update canvas frame.
    requestAnimationFrame(draw);
}

// #7. Execute the main function.
draw();