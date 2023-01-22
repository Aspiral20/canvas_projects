const cursorSizeContainer = document.getElementsByClassName('cursor_size_container')[0]
const cursorSizeNumber = document.getElementsByClassName('cursor_size_number')[0]
const cursorSizeChange = document.getElementsByClassName('cursor_size_change')[0]
const approveCursorSize = document.getElementsByClassName('approve_cursor_size')[0]

let canvasContextCursor = document.getElementById('canvas').getContext('2d')

const changeContextCursor = (value) => {
  if (typeof value === "string") {
    canvasContextCursor.lineWidth = parseInt(value) * 2
  } else {
    canvasContextCursor.lineWidth = value * 2
  }
  cursorSizeNumber.innerHTML = value
}

const LSCursorSizeKey = 'cursor_size'
const initialCursorSize = 2

const getLSCursorSize = localStorage.getItem(LSCursorSizeKey)
if (LSProject) {
  if (LSProject === 'web_editor') {
    if (getLSCursorSize) {

      cursorSizeChange.value = getLSCursorSize
      changeContextCursor(getLSCursorSize)

      const changeCursorSize = () => {
        approveCursorSize.addEventListener("click", (e) => {
          e.preventDefault()

          localStorage.setItem(LSCursorSizeKey, cursorSizeChange.value)
          changeContextCursor(cursorSizeChange.value)
        })
        cursorSizeChange.addEventListener("change", (e) => {
          e.preventDefault()

          localStorage.setItem(LSCursorSizeKey, cursorSizeChange.value)
          changeContextCursor(cursorSizeChange.value)
        })
      }
      changeCursorSize()

    } else {

      localStorage.setItem(LSCursorSizeKey, initialCursorSize.toString())

      changeContextCursor(initialCursorSize)
      cursorSizeChange.value = initialCursorSize
    }
  } else {
    style(cursorSizeContainer, {
      display: 'none'
    })
  }
} else {
  throw new Error(`LSProject: ${LSProject}`)
}
