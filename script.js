let toolsCont = document.querySelector(".tools-cont");
let optionCont = document.querySelector(".options-cont");
let optionFlag = true;
let pencilToolCont = document.querySelector(".pencil-tool-cont");
let eraserToolCont = document.querySelector(".eraser-tool-cont");

let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");

let sticky = document.querySelector(".sticky");

let pencilFlag = false;
let eraserFlag = false;
// True -> tools show , false -> tools hide

optionCont.addEventListener("click", (e) => {
  optionFlag = !optionFlag;
  if (optionFlag) openTools();
  else closeTools();
});

function openTools() {
  let iconElem = optionCont.children[0];
  iconElem.classList.remove("fa-times");
  iconElem.classList.add("fa-bars");
  toolsCont.style.display = "flex";
}

function closeTools() {
  let iconElem = optionCont.children[0];
  iconElem.classList.remove("fa-bars");
  iconElem.classList.add("fa-times");
  toolsCont.style.display = "none";
  pencilToolCont.style.display = "none";
  eraserToolCont.style.display = "none";
}

pencil.addEventListener("click", (e) => {
  // true -> show pencil tools
  // False => hide pencil tools
  pencilFlag = !pencilFlag;

  if (pencilFlag) {
    pencilToolCont.style.display = "block";
  } else {
    pencilToolCont.style.display = "none";
  }
});

eraser.addEventListener("click", (e) => {
  // true -> show eraser tools
  // False => hide eraser tools
  eraserFlag = !eraserFlag;

  if (eraserFlag) eraserToolCont.style.display = "flex";
  else eraserToolCont.style.display = "none";
});

sticky.addEventListener("click", (e) => {
  let stickyCont = document.createElement("div");
  stickyCont.setAttribute("class", "sticky-cont");
  stickyCont.innerHTML = `
    <div class="header-cont">
    <div class="minimize"></div>
    <div class="remove"></div>
    </div>
    <div class="note-cont">
        <textarea></textarea>
    </div>
    `;

    document.body.appendChild(stickyCont)
});
