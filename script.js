
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let particleArray = []
const numberOfParitcles = 150

const mouse = {
    x: null,
    y: null
}

window.addEventListener('mousemove', function (event){
    mouse.x = event.x
    mouse.y = event.y
})

setInterval(function (){
    mouse.x = undefined
    mouse.y = undefined
}, 200)

class Particle {
    constructor(x,y,size,color, weight) {
        this.x = x
        this.y = y
        this.size = size
        this.color = color
        this.weight = weight
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }
    update() {
        this.size -= 0.1
        if(this.size < 0){
            this.x = (mouse.x + ((Math.random() * 20) - 10))
            this.y = (mouse.y + ((Math.random() * 20) - 10))
            this.size = (Math.random() * 5) + 5
            this.weight = (Math.random() * 2) - 0.5
        }
        this.y += this.weight
        this.weight += 0.2

        if(this.x > canvas.height - this.size) {
            this.weight *= -0.4
        }
    }

}

function init() {
    particleArray = []
    for (let i = 0; i < numberOfParitcles; i++) {
        let x = Math.random() * canvas.width
        let y = Math.random() * canvas.height
        let size = (Math.random() * 10) + 5
        let color = 'pink'
        let weight = 1
        particleArray.push(new Particle(x,y,size, color, weight))
    }
}

function animate() {
    ctx.clearRect(0,0,canvas.width, canvas.height)
    for(let i = 0; i < particleArray.length; i++) {
        particleArray[i].update()
    }
    connect()
    requestAnimationFrame(animate)
}

init();
animate();

function connect() {
    let opacityValue = 1;
    for(let i = 0; i < particleArray.length; i++) {
        for (let j = 0; j < particleArray.length; j++) {
            let distance = ((particleArray[i].x - particleArray[j].x)* (particleArray[i].x - particleArray[j].x)) + ((particleArray[i].y - particleArray[j].y) * (particleArray[i].y - particleArray[j].y))
            if(distance < 2800) {
                opacityValue = 1 - (distance/10000)
                ctx.strokeStyle = 'rgba(255,255,255,'+opacityValue+')'
                ctx.beginPath()
                ctx.lineWidth =1
                ctx.moveTo(particleArray[i].x, particleArray[i].y)
                ctx.lineTo(particleArray[j].x, particleArray[j].y)
                ctx.stroke()
            }
        }
    }
}
