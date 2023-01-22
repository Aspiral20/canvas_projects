const backgroundImageContainer = document.getElementsByClassName('background_image_container')[0]
const buttonBoxImage = document.getElementsByClassName('background_image__button')[0]
const imagesOption = document.getElementsByClassName('image_option')

const canvasImage = document.getElementById('canvas')
const inputImage = document.getElementsByClassName('image_input_list')[0]
const checkboxImage = document.getElementsByClassName('image_checkbox')[0]

let canvasContextImage = canvas.getContext('2d');

const LSImageKey = 'image'
const defaultImage = imagesOption[0].innerHTML
const initialImage = { image: defaultImage, isChecked: false }
const LSGetImage = localStorage.getItem(LSImageKey)

if (LSProject) {
  switch (LSProject) {
    case 'web_editor':
      if (LSGetImage) {
        let LSImage = JSON.parse(localStorage.getItem(LSImageKey)).image;
        let LSIsChecked = JSON.parse(localStorage.getItem(LSImageKey)).isChecked;

        inputImage.value = LSImage
        checkboxImage.checked = LSIsChecked

        const displayImage = (action) => {
          switch (action) {
            case 'show':

              HTMLElement.prototype.showImage(canvasImage, LSImage)
              HTMLElement.prototype.showImage(buttonBoxImage, LSImage)

              break;
            case 'hide':

              HTMLElement.prototype.hideImage(canvasImage)
              HTMLElement.prototype.hideImage(buttonBoxImage)
              break;
            default:
              throw new Error(`Invalid action, '${action}'!!`)
          }
        }
        const showOrHideImage = (LSIsChecked) => {
          if (LSIsChecked) {
            displayImage('show')
          } else {
            displayImage('hide')
          }
        }
        const updateLSImage = () => {
          LSImage = JSON.parse(localStorage.getItem(LSImageKey)).image;
          LSIsChecked = JSON.parse(localStorage.getItem(LSImageKey)).isChecked;
        }
        showOrHideImage(LSIsChecked)

        // Image changer
        for (let i = 0; i < imagesOption.length; i++) {
          imagesOption[i].addEventListener('click', () => {
            updateLSImage()

            inputImage.value = imagesOption[i].innerHTML;
            localStorage.setItem(LSImageKey, JSON.stringify({ image: inputImage.value, isChecked: LSIsChecked }));

            LSImage = JSON.parse(localStorage.getItem(LSImageKey)).image;
            showOrHideImage(LSIsChecked)
            if (Object.prototype.screenWasCleared) {
              location.reload()
            }
          })
        }

        // Image checkbox functional
        checkboxImage.addEventListener('click', () => {
          updateLSImage()

          localStorage.setItem(LSImageKey, JSON.stringify({ image: LSImage, isChecked: !LSIsChecked }))

          LSIsChecked = JSON.parse(localStorage.getItem(LSImageKey)).isChecked;
          showOrHideImage(LSIsChecked)
          if (Object.prototype.screenWasCleared) {
            location.reload()
          }
        })
      } else {
        inputImage.value = initialImage.image
        localStorage.setItem(LSImageKey, JSON.stringify(initialImage))
      }
      break;
    default:
      style(backgroundImageContainer, {
        display: 'none'
      })
  }
} else {
  throw new Error(`LSProject: ${LSProject}`)
}