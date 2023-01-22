const contextCanvas = document.getElementById('canvas').getContext('2d');
const ColorsContainer = document.getElementsByClassName('colors_container')[0];
const CurrentColor = document.getElementsByClassName('current_color')[0];
const ColorBlock = document.getElementsByClassName("color_block");
const ColorsToggle = document.getElementsByClassName("colors_toggle")[0];
const InputChangeColor = document.getElementsByClassName('change_color')[0];

const colorKey = 'color'
const defaultColor = 'black'
let inputColor;

const localStorageColor = localStorage.getItem(colorKey)
const colors = {
  black: "rgb(0,0,0)",
  white: "rgb(255,255,255)",
  red: "rgb(255,0,0)",
  crimson: "rgb(220,20,60)",
  darkRed: "rgb(139,0,0)",
  lightGreen: "rgb(144,238,144)",
  green: "rgb(0,255,0)",
  darkGreen: "rgb(0,100,0)",
  lightBlue: "rgb(0,255,255)",
  skyBlue: "rgb(135,206,235)",
  cadetBlue: "rgb(95,158,160)",
  blue: "rgb(0,0,255)",
  darkBlue: "rgb(0,0,139)",
  yellow: "rgb(255,255,0)",
  pink: "rgb(255,192,203)",
  lightPink: "rgb(255,182,193)",
  violet: "rgb(238,130,238)",
  magenta: "rgb(255,0,255)",
  purple: "rgb(128,0,128)",
  indigo: "rgb(75,0,130)",
  olive: "rgb(128,128,0)",
  darkOliveGreen: "rgb(85,107,47)",
}

const canvasColorPen = (color) => {
  contextCanvas.fillStyle = color
  contextCanvas.strokeStyle = color
}
if (LSProject) {
  if (LSProject === 'web_editor') {

    if (localStorageColor) {
      canvasColorPen(localStorageColor)
      Object.prototype.style(CurrentColor, {
        backgroundColor: localStorageColor
      })

      for (let i = 0; i < ColorBlock.length; i++) {
        ColorBlock[i].addEventListener('click', (e) => {
          e.preventDefault()
          if (ColorsToggle.classList.contains('active')) {
            ColorsToggle.classList.remove('active')

            const getClickedColor = getComputedStyle(ColorBlock[i]).backgroundColor
            localStorage.setItem(colorKey, getClickedColor)
            canvasColorPen(getClickedColor)
            Object.prototype.style(CurrentColor, {
              backgroundColor: getClickedColor
            })
          }
        })
      }
    } else {
      localStorage.setItem(colorKey, defaultColor)

      canvasColorPen(defaultColor)
      Object.prototype.style(CurrentColor, {
        backgroundColor: defaultColor
      })
    }
  } else {
    style(ColorsContainer, {
      display: 'none'
    })
  }
} else {
  throw new Error(`LSProject: ${LSProject}`)
}


const completePaletteColors = () => {
  const colorsArr = Object.values(colors)

  const completeColorsOnCP = (colorsArr) => {
    for (let i = 0; i < ColorBlock.length; i++) {
      Object.prototype.style(ColorBlock[i], {
        backgroundColor: colorsArr[i]
      })
    }
  }

  // Daca sunt egale ColorBlock(HTML-Elemente) si colorsArr(elemtentele obiectului colors)
  if (ColorBlock.length === colorsArr.length) {
    completeColorsOnCP(colorsArr)
  } else {
    let equalArrs;

    if (ColorBlock.length > colorsArr.length) {   //10 - 7
      equalArrs = [...colorsArr, ...colorsArr].splice(0, ColorBlock.length)
    } else {      //7 - 10
      equalArrs = colorsArr.splice(0, ColorBlock.length)
    }
    completeColorsOnCP(equalArrs)
  }
}
completePaletteColors()

InputChangeColor.addEventListener("input", (e) => {
  inputColor = InputChangeColor.value

  canvasColorPen(inputColor)
  localStorage.setItem(colorKey, inputColor)
  Object.prototype.style(CurrentColor, {
    backgroundColor: inputColor
  })
})