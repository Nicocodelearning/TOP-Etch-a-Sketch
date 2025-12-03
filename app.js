const gridContainer = document.querySelector(".gridContainer")

let mouseDown = false
document.body.onmousedown = () => mouseDown = true
document.body.onmouseup = () => mouseDown = false
let currentMode = "rainbow"
document.querySelector("#rainbow").classList.add("active")
const colorsButtons = document.querySelectorAll(".colors button")
colorsButtons.forEach((btn) => btn.addEventListener("click", () => {
    colorsButtons.forEach((b) => b.classList.remove("active"))
    btn.classList.add("active")
    currentMode = btn.id
}))

function createGrid(width, height) {
    if (!Number.isInteger(width) || !Number.isInteger(height)) {
        alert("Only integers are allowed for width and height")
        return null
    }
    if (width > 100 || height > 100) {
        alert("Width and height can not be higher than 100")
        return null
    }
    for (let i = 0; i < (width * height); i++) {
        const gridCase = document.createElement("div")
        gridCase.classList.add("gridCase")
        gridCase.style.height = `calc(100% / ${height})`
        gridCase.style.width = `calc(100% / ${width})`
        gridCase.addEventListener("mouseenter", () => {
            if (mouseDown) {
                if (currentMode === "rainbow") gridCase.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`
                else if (currentMode === "erase") gridCase.style.backgroundColor = "white"
                else {
                    const chosenColor = document.querySelector("#colorPicker").value
                    gridCase.style.backgroundColor = chosenColor
                }
            }
        })
        gridContainer.appendChild(gridCase)
    }
}

createGrid(16, 16)

function clearGrid(container) { container.innerHTML = "" }

const heightInput = document.querySelector("#height")
const widthInput = document.querySelector("#width")
const modifyGrid = document.querySelector(".modifyGrid")
modifyGrid.addEventListener("click", () => {
    let height = Number(heightInput.value)
    let width = Number(widthInput.value)
    clearGrid(gridContainer)
    createGrid(width, height)
})