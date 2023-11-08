let canvas = document.getElementById("saniya");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const ctx = canvas.getContext("2d");

const A = {
    x: 340,
    y: 160
}

const B = {
    x: 100,
    y: 600
}


const C = {x:600,y:200}
const D = {x:500,y:600}


function drawPoint(pos,label) {
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "10px Arial";
    ctx.fillText(label,pos.x,pos.y);


}


function drawLine(p1, p2) {
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = "black";
    ctx.stroke()
}




function lerp(A, B, t) {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.strokeStyle = "balck";
    const X = A.x + (B.x - A.x) * t;
    const Y = A.y + (B.y - A.y) * t;

    ctx.arc(X, Y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
}


function oscPcentre(p1,p2,t){
    const x = p1.x + (p2.x-p1.x)*t;
    const y = p1.y + (p2.y - p1.y)*t;

    return {x,y};
}

function oscLine(Pair1,Pair2){
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(Pair1.x,Pair1.y);
    ctx.lineTo(Pair2.x,Pair2.y);
    ctx.stroke();
    

}



let t = 0;
let speed = 0;

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let sinx = Math.abs(Math.sin(t));
    let sinxu = Math.abs(Math.sin(Math.PI/2 - t ))
    if (speed % 5 == 0)
        t += 0.01;

    lerp(A, B, sinx);
    lerp(A,D,sinxu);

    const firstPair = oscPcentre(A,B,sinx);
    
    const secondPair = oscPcentre(A,D,sinxu);

    oscLine(firstPair,secondPair);

    lerp(firstPair,secondPair,sinxu);
    



    drawPoint(A,"A");
    drawPoint(B,"B");
    
    drawPoint(D,"C");
    drawLine(A,B);
    drawLine(A,D);

    requestAnimationFrame(animate)
}

animate();


