const ControlPanel = document.getElementById('control_panel')
const changeProjectOption = document.getElementsByClassName('change_project_option')
const changeProjectInputList = document.getElementsByClassName('change_project_input_list')[0]
const changeProjectButton = document.getElementsByClassName('change_project__button')[0]

const LSProjectKey = 'project'
const refreshProject = () => {
  const getSessionProject = sessionStorage.getItem(LSProjectKey)

  if (getSessionProject) {
    sessionStorage.removeItem(LSProjectKey)

    setTimeout(() => ControlPanel.classList.add('active'), 300)
  }
}
refreshProject()

const arrProjects = Object.values(projects)

const projectKeys = Object.keys(projects)
const projectValues = arrProjects.map(({ value }) => value)
const projectImages = arrProjects.map(({ img }) => img)

const initialProject = projectKeys[0]

const LSProject = localStorage.getItem(LSProjectKey)

const returnIndexProjectKey = () => {
  let currIndex = -1
  projectKeys.forEach((projectKey, index) => {
    if (projectKey === LSProject) {
      currIndex = index
    }
  })
  return currIndex
}

if (LSProject) {
  changeProjectInputList.value = LSProject

  if (changeProjectOption.length === projectValues.length) {
    for (let i = 0; i < changeProjectOption.length; i++) {
      changeProjectOption[i].innerHTML = projectValues[i]

      HTMLElement.prototype.showImage(changeProjectButton, projectImages[returnIndexProjectKey()])

      changeProjectOption[i].addEventListener('click', () => {
        if (projectKeys[i] !== localStorage.getItem(LSProjectKey)) {
          localStorage.setItem(LSProjectKey, projectKeys[i])
          HTMLElement.prototype.showImage(changeProjectButton, projectImages[i])

          changeProjectInputList.value = projectKeys[i]

          sessionStorage.setItem(LSProjectKey, 'control_panel')
          location.reload()
        }
      })
    }
  } else {
    throw new Error(
      `You have to add new html project or js project: ${{
        htmlProjectsCount: changeProjectOption.length,
        jsProjectsCount: projectValues.length
      }}`)
  }
} else {
  changeProjectInputList.value = initialProject
  HTMLElement.prototype.showImage(changeProjectButton, projectImages.shift())
  localStorage.setItem(LSProjectKey, initialProject)
}
