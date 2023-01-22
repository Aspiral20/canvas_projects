Object.prototype.attribute = (elem, { attribute, value }) => elem.setAttribute(attribute, value)
Object.prototype.style = (elem, styles) => Object.keys(styles).forEach(key => elem.style[key] = styles[key])
Object.prototype.varsToString = (objVars) => {
  /*
    EXAMPLE:  varsToString({variableHere, locationVar}) ||
              varsToString([{variableHere}, {locationVar}])
    RESULT: ['variableHere', 'locationVar']
  */
  if (Array.isArray(objVars)) {
    return objVars.map(item => Object.keys(item).shift())
  }
  if (typeof objVars === 'object') {
    return objVars.length === 1 ? Object.keys(objVars).shift() : Object.keys(objVars)
  }
}
Object.prototype.actionClass = (elems, className, action) => {
  /*
    EXAMPLE:  actionClass(
                {canvasContextCursor, listImages},
                { canvasContextCursor: 'active', listImages: 'classname' },
                'add'
              ) ||
              actionClass(
                [canvasContextCursor, listImages],
                'active',
                'add'
              )
    RESULT: canvasContextCursor,listImages => className="... active"
  */
  const ClassNameIsString = typeof className === 'string'
  const ClassNameIsObject = typeof className === 'object'

  const arrElemsKeys = varsToString(elems)
  const arrElems = Object.values(elems)
  let containsElement;
  let arrClassNameKeys;

  if (ClassNameIsObject) {
    arrClassNameKeys = varsToString(className)

    containsElement = (elem) => {
      for (let i = 0; i < arrClassNameKeys.length; i++) {
        if (elem === arrClassNameKeys[i]) {
          return true
        }
      }
      return false
    }
  }

  arrElems.forEach((elem, index) => {
    let elemContained;
    if (ClassNameIsObject) {
      elemContained = containsElement(arrElemsKeys[index])
    }

    switch (action) {
      case 'add':
        if (ClassNameIsString) {
          elem.classList.add(className)
        } else if (ClassNameIsObject) {
          if (elemContained) {
            elem.classList.add(className[arrClassNameKeys[index]])
          }
        } else {
          throw new Error('Class should be string or object({elem: class, ...})')
        }
        break;
      case 'remove':
        if (ClassNameIsString) {
          elem.classList.remove(className)
        } else if (ClassNameIsObject) {
          if (elemContained) {
            elem.classList.remove(className[arrClassNameKeys[index]])
          }
        } else {
          throw new Error('Class should be string or object({elem: class, ...})')
        }
        break;
      default:
        throw new Error(`Invalid action (${action})!`)
    }
  })
}
HTMLElement.prototype.showImage = (htmlElement, image) => {
  attribute(htmlElement, {
    attribute: "style",
    value: `--image: url(./images/canvas_photos/${image})`
  })
  style(htmlElement, {
    backgroundImage: "var(--image)"
  })
}
HTMLElement.prototype.hideImage = (htmlElement) => {
  style(htmlElement, {
    backgroundImage: "none"
  })
}
Object.prototype.projects = {
  web_editor: { value: 'Web editor', img: 'web_editor_project.jpg' },
  glitch: { value: 'Glitch effect', img: '' }
}