/* Making the canvas and getting the tools ready*/
const canvas = document.getElementById("multiverse")
const ctx = canvas.getContext('2d')

/* setting the canvas's width and height*/
canvas.width = window.innerWidth
canvas.height = 500

/* Creating different worlds with properties */
let Continuum_Database = [
    {
        name: "Continuum",
        color: "#a78bfa",
        x: Math.random() * canvas.width, /* random position for the world acc to the width */
        y: Math.random() * canvas.height, /* random position for the world acc to the length */
        angle: Math.random() * Math.PI * 2, /* at what angle does the world start */
        speed: 1.2, /* how fast it moves */
        turnSpeed: 0.09, /* at what intensity does it turn */
        link: "Continuum.html",

    },
    {
        name: "Worm King",
        color: "#34d399",
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        angle: Math.random() * Math.PI * 2,
        speed: 1.2,
        turnSpeed: 0.09,
        link: "Worm-King.html",
    },
    {
        name: "SP3C'S Journal Directory",
        color: "#FF1919",
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        angle: Math.random() * Math.PI * 2,
        speed: 1.2,
        turnSpeed: 0.09,
        link: "SP3C'S-Journal-Directory.html",
    },
    {
        name: "The First Observer Hypothesis",
        color: "#e5e7eb",
        x: Math.random() * canvas.width, /* random position for the world acc to the width */
        y: Math.random() * canvas.height, /* random position for the world acc to the length */
        angle: Math.random() * Math.PI * 2, /* at what angle does the world start */
        speed: 1.2, /* how fast it moves */
        turnSpeed: 0.09, /* at what intensity does it turn */
        link: "The-First-Observer-Hypothesis",
    },
]


function animate() { /* Creating an animate function which we can warp over all the code below and can use it later to repeat it 60 seconds but idk why 60 seconds or why and how we do all the repeating and like what the hell */
    ctx.clearRect(0, 0, canvas.width, canvas.height) /* keep clearing the shit we leave behind but what do the 0,0 mean and width and height too why are they there */

    Continuum_Database.forEach(world => { /* we take continumm database and do something here maybe say that do this thing written below to the worlds but idk what forEach is or what (world =>) does */

        // glow — radial gradient fading outward from center
        let glow = ctx.createRadialGradient(world.x, world.y, 0, world.x, world.y, 40) // we create glow and put some values for some reason idk why tho and what letglow does here 
        glow.addColorStop(0, world.color + 'cc') // we add colorStop? what is colorStop? and what are all these values
        glow.addColorStop(1, 'transparent') // then we add it again and change the values for some reason
        ctx.beginPath() // we start the circle here? or we reset the past shit but idk what past shit and why
        ctx.arc(world.x, world.y, 40, 0, Math.PI * 2) // idk what this does
        ctx.fillStyle = glow // we are having it's color be "glow"
        ctx.fill() // executes the circle

        // solid core on top of glow
        ctx.beginPath() // starting another circle?
        ctx.arc(world.x, world.y, 20, 0, Math.PI * 2) //again new values for some reason
        ctx.fillStyle = world.color // filling color and taking it from the objects / worlds
        ctx.fill() // executing the circle

        // wall nudging — too close to edge, curve back inward
        // movement
    world.turnSpeed += (Math.random() - 0.5) * 0.005 // the value we get after the random number given by math.random() and it subtracting and multiplying and we add it to the base turnSpeed
    world.turnSpeed = Math.max(-0.03, Math.min(0.03, world.turnSpeed)) //  this creates a barrier so the world doesnt reach a high or low speed (above 0.3 or below -0.3) first we check if the current turn value given manually, and see which one is smaller 0.3 (the value we set)
    world.angle += world.turnSpeed // this too
    world.x += Math.cos(world.angle) * world.speed // this too
    world.y += Math.sin(world.angle) * world.speed //this too

// if they escape, push them back and reflect the angle
if (world.x > canvas.width - 40) {  // if the world's position is more than canvas's width - 40 
    world.x = canvas.width - 40 // then uh what is it here for?
    world.angle = Math.PI - world.angle // tf is this for explain this whole if statement shit and all the if statements below
}
if (world.x < 40) {
    world.x = 40
    world.angle = Math.PI - world.angle
}
if (world.y > canvas.height - 40) {
    world.y = canvas.height - 40
    world.angle = -world.angle
}
if (world.y < 40) {
    world.y = 40
    world.angle = -world.angle
}

        // name label
        ctx.fillStyle = world.color // color of the name of the world
        ctx.font = "12px serif" //font
        ctx.textAlign = "center" // placing them in center below the worlds
        ctx.fillText(world.name, world.x, world.y + 30) // text is the world's name also is placed 30 pixels below the actual world
    })

    requestAnimationFrame(animate) // this is where it is called 60 times but idfk why maybe i dont understand functions enough
}

animate() // ended it but idk why we even started it



const music = document.getElementById("Afterthought"); // variable music is now assigned to the music file
const btn = document.getElementById("music-btn"); // variable btn is assigned to the button

btn.addEventListener("click", () => { // addEventListeend watches the button and when someone "clicks it"
    if (music.paused) { // it checks whether the music is paused
        music.play(); // if yes then it plays it
        btn.textContent = "⏸ Pause!" //and the button's content changes to "Stop it!"
    } else { // if it is playing
        music.pause(); // then pause the music
        btn.textContent = " ▶ Play"; // text changes to play the song
    }
});



// Checks for a click, then subtracts the window's size from the canvas size 
// and then save it in constant variables, after that put those values in checkBallClick function

canvas.addEventListener("click", function(event) {
    const rect = canvas.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    checkBallClick(mouseX, mouseY);
});


// defining the function checkBallClick(mx, my), forEach world check the click's co-ordinate 
// and subtract it with the ball's current position and use pythagorus theorem to 

// defining the function checkBallClick(mx, my) — for every world in the database,
// subtract the click's position from the world's center to get the horizontal and vertical gaps,
// then use pythagoras to find the real diagonal distance between the click and the center, since normal horizontal and vertical gaps don't cut it out apparently
// if that distance is less than 20 (the solid core radius), the click landed inside that world — open it


function checkBallClick(mx, my) {
    Continuum_Database.forEach(world => {
        const dx = mx - world.x;
        const dy = my - world.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 20) {
            openWorld(world);


        }
    });
}


function openWorld(world) {
    document.body.style.opacity = "0";

    setTimeout(() => {
        window.location.href = world.link;
    }, 500);
}

canvas.addEventListener("mousemove", function(event) { // puts an event listener to check if the mouse moves and saves that info in event array
    const Rect = canvas.getBoundingClientRect() // Rect stores the position and size of canvas in reference to the window
    const mouseX = event.clientX - Rect.left; 
    const mouseY = event.clientY - Rect.top;
    
    let hovering = false;

    Continuum_Database.forEach(world => {
        const dx = mouseX - world.x;
        const dy = mouseY - world.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 20) {
            hovering = true;
        }
});

if (hovering) {
    canvas.style.cursor = "pointer"
}
else {
    canvas.style.cursor = "default"
}
});

