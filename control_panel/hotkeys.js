// Control panel

const hotkeyContainer = document.getElementsByClassName('hotkeys_container')[0]
const hotkeyItem = document.getElementsByClassName('hotkey_item')
const hotkeysItemsButton = document.getElementsByClassName('hotkey_item_description_button')
const descriptionText = document.getElementsByClassName('description_text')

if (LSProject) {
  if (LSProject === 'web_editor') {
    for (let i = 0; i < hotkeyItem.length; i++) {
      hotkeyItem[i].addEventListener('click', (e) => {
        e.preventDefault()

        if (!hotkeysItemsButton[i].classList.contains("active")) {
          for (let j = 0; j < hotkeysItemsButton.length; j++) {
            if (hotkeysItemsButton[i] !== hotkeysItemsButton[j] && hotkeysItemsButton[j].classList.contains("active")) {
              hotkeysItemsButton[j].classList.remove("active")
              descriptionText[j].classList.remove("active")
            }
          }
          hotkeysItemsButton[i].classList.add("active")
          descriptionText[i].classList.add("active")
        } else {
          hotkeysItemsButton[i].classList.remove("active")
          descriptionText[i].classList.remove('active')
        }
      })
    }
  } else {
    style(hotkeyContainer, {
      display: 'none'
    })
  }
} else {
  throw new Error(`LSProject: ${LSProject}`)
}
