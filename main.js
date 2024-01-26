let canvas = document.querySelector('canvas');
let canvasObj = canvas.getContext('2d');
let color = document.querySelector('#color');
let penSize = document.querySelector('#penSize');
let rectangle = document.querySelector('#rectangle');
let eraser = document.querySelector('#eraser');
let clear = document.querySelector(".clear-btn");
let saveButton = document.querySelector('.save-btn');

let isDrawing = false;
let currentSize = 3;
let isDrawingRectangle = false;

window.addEventListener('load', () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});

function draw(e) {
    if (isDrawing) {
          canvasObj.lineTo(e.offsetX, e.offsetY);
          canvasObj.stroke();  
    }
}

function drawingStart(e) {
    isDrawing = true;
    if (isDrawingRectangle) {
        startingX = e.offsetX;
        startingY = e.offsetY;
        canvasObj.fillStyle = "white";
    }
    canvasObj.lineWidth = currentSize;
}

function endDrawing(e) {
    if (isDrawing && isDrawingRectangle) {
        const endingX = e.offsetX;
        const endingY = e.offsetY;
        const width = endingX - startingX;
        const height = endingY - startingY;
        canvasObj.fillRect(startingX, startingY, width, height);
        canvasObj.strokeRect(startingX, startingY, width, height);
    }
    isDrawing = false;
    canvasObj.beginPath();
}


canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', drawingStart);
canvas.addEventListener('mouseup', endDrawing);

color.addEventListener('change', () => {
    canvasObj.strokeStyle = color.value;
});

penSize.addEventListener('change', () => {
    currentSize = penSize.value;
});

eraser.addEventListener('click', () => {
    canvasObj.strokeStyle = "white";
    eraser.classList.toggle('active');
});

clear.addEventListener('click', () => {
    canvasObj.fillStyle = "white";
    canvasObj.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
})


rectangle.addEventListener('click', () => {
    isDrawingRectangle = !isDrawingRectangle;
    rectangle.classList.toggle('active');
})

saveButton.addEventListener('click',()=>{
    let link = document.createElement('a');
    link.download = "masoud.jpg";
    link.href = canvas.toDataURL()
    link.click()
})
