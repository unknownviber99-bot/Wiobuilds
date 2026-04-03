 // LOADER
setTimeout(()=>{
  document.getElementById("loader").style.display="none";
},1500);

// PARTICLES
const canvas=document.getElementById("bg");
const ctx=canvas.getContext("2d");

canvas.width=innerWidth;
canvas.height=innerHeight;

let p=[];

for(let i=0;i<50;i++){
  p.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height});
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  p.forEach(pt=>{
    pt.y-=0.3;
    if(pt.y<0)pt.y=canvas.height;

    ctx.fillStyle="white";
    ctx.fillRect(pt.x,pt.y,2,2);
  });

  requestAnimationFrame(draw);
}
draw();

// TIER SELECT
let selected="core";

document.querySelectorAll(".card").forEach(c=>{
  c.onclick=()=>{
    document.querySelectorAll(".card").forEach(x=>x.classList.remove("active"));
    c.classList.add("active");
    selected=c.dataset.tier;
  }
});

// CONFIRM
document.getElementById("confirm").onclick=()=>{
  alert("Selected: "+selected);
};
