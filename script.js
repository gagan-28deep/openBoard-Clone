let optionCont = document.querySelector('.options-cont')
let optionFlag = true

// True -> tools show , false -> tools hide

optionCont.addEventListener("click" , (e)=>{
    optionFlag = !optionFlag
    if(optionFlag) openTools()
    else closeTools()
})

function openTools(){
    let iconElem = optionCont.children[0]
    iconElem.classList.remove('fa-times')
    iconElem.classList.add('fa-bars')
}

function closeTools(){
    let iconElem = optionCont.children[0]
    iconElem.classList.remove('fa-bars')
    iconElem.classList.add('fa-times')
}