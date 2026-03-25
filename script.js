const canvas = document.getElementById("multiverse") 
/* HTML has a canvas with id="multiverse" — JS reaches into the page and grabs it by that name tag */

const ctx = canvas.getContext('2d') 
/* canvas is the whiteboard, ctx is the marker — all drawing tools live inside ctx */

canvas.width = window.innerWidth 
/* window = the browser itself. innerWidth = how wide it currently is. Canvas stretches to fill it exactly */

canvas.height = 500 
/* hardcoded height — 500px tall */

let Continuum_Database = [
    {
        name: "Continumm",
        color: "#a78bfa", 
        anchorX: canvas.width * 0.25,
        anchorY: canvas.height * 0.4,
    }
    {name: "Worm King", color: "#34d399", x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: Math.random() * 4 - 2, vy: Math.random() * 4 - 2},
    {name: "SP3C'S Journal Directory", color: "#60a5fa", x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: Math.random() * 4 - 2, vy: Math.random() * 4 - 2},
]

function animate() {
/* this function runs 60 times per second — wipe, update, redraw. that's all animation ever is */

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    /* wipe the entire canvas clean every frame FIRST — without this, circles leave permanent trails
       because canvas never erases itself. clearRect goes at the TOP so we wipe before drawing */

    Continuum_Database.forEach(database => {
    /* loop through every world object one by one — everything inside runs once per world per frame */

        /* === GLOW BLOOM === */
        /* a radial gradient = paint that starts bright at the center and fades to invisible at the edges */
        /* like a spotlight. we use it to fake the soft glow around a star */
        let glow = ctx.createRadialGradient(database.x, database.y, 0, database.x, database.y, 40)
        /* args: centerX, centerY, innerRadius(0=single point), centerX, centerY, outerRadius(40=how far glow spreads) */
        
        glow.addColorStop(0, database.color + 'cc')
        /* at the CENTER (0) — use the world's color at 80% opacity. 'cc' appended to hex = 80% opaque */
        
        glow.addColorStop(1, 'transparent')
        /* at the OUTER EDGE (1) — fully invisible. so gradient goes bright center → invisible edge */

        ctx.beginPath()
        /* lift the pen — start a fresh shape, disconnect from anything drawn before */
        
        ctx.arc(database.x, database.y, 40, 0, Math.PI * 2)
        /* describe a circle at this world's position, radius 40 (bigger than the solid ball) */
        /* args: x, y, radius, startAngle(0), endAngle(Math.PI*2 = full circle) */
        
        ctx.fillStyle = glow
        /* set the paint to the radial gradient instead of a flat color */
        
        ctx.fill()
        /* paint it — big soft glowing halo */

        /* === SOLID CORE === */
        /* paint a smaller solid circle on top of the glow — bright core sitting inside the bloom */
        ctx.beginPath()
        ctx.arc(database.x, database.y, 20, 0, Math.PI * 2)
        /* same center, but radius 20 — half the size of the glow circle */
        
        ctx.fillStyle = database.color
        /* flat solid color this time, no gradient */
        
        ctx.fill()
        /* paint it — solid bright core on top of the soft glow */

        /* === MOVEMENT === */
        database.x = database.x + database.vx
        database.y = database.y + database.vy
        /* add velocity to position every frame — this is literally all movement ever is
           position + velocity = new position. repeat 60 times per second = smooth animation */

        /* === BOUNCING === */
        /* when ball hits a wall — teleport it back to the boundary, then flip velocity direction */
        /* teleport prevents the ball getting stuck vibrating at the wall (it would re-trigger every frame) */
        /* flipping velocity: positive becomes negative (reverses direction). -database.vx handles both walls */
        
        if (database.x > canvas.width - 50) {
            database.x = canvas.width - 50  /* teleport back inside */
            database.vx = -database.vx      /* reverse horizontal direction */
        }
        if (database.x < 50) {
            database.x = 50                 /* canvas starts at 0 on the left — 20 accounts for radius */
            database.vx = -database.vx
        }
        if (database.y > canvas.height - 20) {
            database.y = canvas.height - 20
            database.vy = -database.vy      /* reverse vertical direction */
        }
        if (database.y < 50) {
            database.y = 50
            database.vy = -database.vy
        }

        /* === NAME LABEL === */
        ctx.fillStyle = database.color  /* text same color as the world */
        ctx.font = "12px serif"
        ctx.textAlign = "center"        /* center text horizontally under the ball */
        ctx.fillText(database.name, database.x, database.y + 30)
        /* fillText args: what text, x position, y position */
        /* database.y + 30 = 30 pixels below the ball's center */
    })

    requestAnimationFrame(animate)
    /* before the browser paints the next screen refresh — call animate again
       this is the snake eating its own tail. one line makes the whole thing run forever */
}

animate() 
/* pull the trigger — start the whole machine */