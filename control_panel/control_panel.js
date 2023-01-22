const controlPanel = document.getElementById("control_panel")
const controlPanelToggle = document.getElementsByClassName("control_panel_toggle")[0]
const controlOff = document.getElementsByClassName("control_off")
const canvasForCP = document.getElementById('canvas')
const cpInputContainer = document.getElementsByClassName('cp_input_container')
const cpOpenChangeProject = document.getElementsByClassName('cp_open_change_project')
const cpOpenList = document.getElementsByClassName('cp_open_list')

// Color Block Main Toggle Block
controlPanelToggle.addEventListener('click', (e) => {
  e.preventDefault()

  if (!controlPanel.classList.contains("active")) {
    controlPanel.classList.add("active")
  } else {
    controlPanel.classList.remove("active")

    for (let i = 0; i < controlOff.length; i++) {
      if (controlOff[i].classList.contains("active")) {
        controlOff[i].classList.remove("active")
      }
    }
  }
})

// Toggle Item's Content
const CPMainButton = document.getElementsByClassName('cp_main-button')
const CPToggle = document.getElementsByClassName('cp_toggle')

for (let i = 0; i < CPMainButton.length; i++) {
  CPMainButton[i].addEventListener('click', e => {
    e.preventDefault()
    if (!CPToggle[i].classList.contains("active")) {
      CPToggle[i].classList.add("active")

      for (let j = 0; j < CPToggle.length; j++) {
        if (i !== j) {
          CPToggle[j].classList.remove("active")
        }
      }

    } else {
      CPToggle[i].classList.remove("active")
    }
  })
}

canvasForCP.addEventListener('click', () => {
  for (let i = 0; i < CPToggle.length; i++) {
    if (CPToggle[i].classList.contains("active")) {
      CPToggle[i].classList.remove("active")
    }
  }
})

for (let i = 0; i < cpInputContainer.length; i++) {
  cpInputContainer[i].addEventListener('click', (e) => {
    e.preventDefault()
    const setClassToList = (action) => {
      const elem1 = cpOpenChangeProject[i]
      const elem2 = cpOpenList[i]
      Object.prototype.actionClass(
        { elem1, elem2 },
        'active',
        action
      )
    }
    if (
      cpOpenChangeProject[i].classList.contains('active') &&
      cpOpenList[i].classList.contains('active')
    ) {
      setClassToList('remove')
    } else {
      setClassToList('add')
    }
  })
}
