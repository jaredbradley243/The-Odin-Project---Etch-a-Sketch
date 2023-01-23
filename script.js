// Variables
let numOfDivs = 16;
let container = document.getElementsByClassName("container")[0];
let mouseDown = false;
let border = document.getElementsByClassName("border")[0];
let currentColor = '#000000';
let eraser = document.getElementById("eraser");
let drawButton = document.getElementById("draw-button");
let fillButton = document.getElementById("fill-bucket");

function createDivs(num){
    for(let i = 0; i < (num ** 2); i++){
        div = document.createElement("div");
        div.classList.add("block")
        container.appendChild(div);
    }
}

function changeWidth(num){
    let block = Array.from(document.getElementsByClassName("block"));
    let containerWidth = container.offsetWidth;
    let pixelsize = containerWidth/num;
    block.forEach(element => {
        element.style.height = `${pixelsize}px`;
        element.style.width = `${pixelsize}px`;
    });
}


function createEventListeners(){
    let block = Array.from(document.getElementsByClassName("block"));
    let colorSelector = document.getElementById("color-selector");
    let borderSelector = document.getElementById("border-color");
    let clearButton = document.getElementById("clear-button");
    let eraser = document.getElementById("eraser");
    let gridSizeSelector = document.getElementById("grid-slider");
    let drawButton = document.getElementById("draw-button");
    let fillButton = document.getElementById("fill-bucket");
    document.body.onmousedown = () => mouseDown = true;
    document.body.onmouseup = () => mouseDown = false;

    block.forEach((block) => {
        block.addEventListener("mousemove", draw);})
    
    block.forEach((block) => {
        block.addEventListener("mousedown", draw);})

    block.forEach((block) => {
        block.addEventListener("click", draw);})    

    colorSelector.addEventListener("input", selectColor);

    eraser.addEventListener("click", erase);
    
    drawButton.addEventListener("click", () => {
        let colorSelectorValue = document.getElementById("color-selector").value;
        currentColor = colorSelectorValue;
        removeAllActive();
        setActive(drawButton);
    })
    
    clearButton.addEventListener("click", clearSketch);

    borderSelector.addEventListener("input", changeBorderColor);

    gridSizeSelector.addEventListener("input", changeGridSize)
    gridSizeSelector.addEventListener("input", displayGridSize)

    fillButton.addEventListener("click", fill);
    }


function draw(event){
    if((event.type === "mousemove" && mouseDown) || event.type === "click"){
    event.target.style.backgroundColor = currentColor;
    }
}

function selectColor(event){
    currentColor = event.target.value;
    removeAllActive();
    setActive(drawButton);
}

function fill(){
    let block = Array.from(document.getElementsByClassName("block"));
    let colorSelectorValue = document.getElementById("color-selector").value;
    currentColor = colorSelectorValue;
    block.forEach((block) => {
        if(block.style.backgroundColor === "" || block.style.backgroundColor === "rgb(255, 255, 255)"){
            block.style.backgroundColor = currentColor;
        }
    })
    removeAllActive();
    setActive(drawButton);
}

function erase(){
    currentColor = "#FFFFFF";
    removeAllActive();
    setActive(eraser);
}

function clearSketch(){
    let block = Array.from(document.getElementsByClassName("block"));
    block.forEach((block) => {
        block.style.backgroundColor = "#FFFFFF";
    })
}

function changeBorderColor(event){
    border.style.borderColor = event.target.value;
}

function deleteGrid(){
    let block = Array.from(document.getElementsByClassName("block"));
    block.forEach((block) => {
        block.remove()})
}

function changeGridSize(event){
    deleteGrid()
    createDivs(event.target.value);
    createEventListeners();
    changeWidth(event.target.value);
}

function displayGridSize(event){
    let gridSizeDiv = document.getElementById("range-text");
    gridSizeDiv.innerText = `${event.target.value} x ${event.target.value}`;
}

function removeAllActive(){
    let activeDivs = Array.from(document.getElementsByClassName("active"));
    if(activeDivs.length > 0){
        activeDivs.forEach((activeDivs) => {
            activeDivs.classList.remove("active");})   
    }
}

function setActive(button){
    button.classList.add("active");
}


createDivs(numOfDivs);
changeWidth(numOfDivs);
createEventListeners();



