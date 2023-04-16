import Color from "color"

export const utils = (() => {
  const addStructure = (container, identifierType, identifier) => {
    const newItem = document.createElement("div")
    if (identifierType == "id") {
      newItem.id = identifier
    } else if (identifierType == "class") {
      newItem.classList.add(identifier)
    }
    container.appendChild(newItem)
  }

  const addElement = (container, textContent, identifier, identifier2) => {
    const newElement = document.createElement("div")
    newElement.classList.add(identifier)
    if (identifier2 != undefined) newElement.classList.add(identifier2)
    newElement.textContent = textContent
    container.appendChild(newElement)
  }

  const removeAllChild = parent => {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild)
    }
  }

  const chooseNavItem = name => {
    const item = document.querySelectorAll(".nav-item")
    let found = undefined
    item.forEach(n => {
      if (n.textContent == name) {
        found = n
      }
    })
    return found
  }

  const refreshDivClass = (identifier, cssClass) => {
    document.querySelector(identifier).classList = ""
    document.querySelector(identifier).classList.add(cssClass)
  }
  //settings colors
  const updateColors = event => {
    const element = event.target
    const color600 = element.getAttribute("data-color600")
    const color100 = element.getAttribute("data-color100")

    //In between color for nav bar
    const mixColors = (color1, color2, ratio) => {
      const mixedColor = Color(color1).mix(Color(color2), ratio)
      return mixedColor.hex()
    }

    const intermediateColor = mixColors(color600, color100, 0.5)

    document.documentElement.style.setProperty("--header-color", color600)
    document.documentElement.style.setProperty("--nav-color", intermediateColor)
    document.documentElement.style.setProperty("--page-color", color100)
  }

  return {
    addStructure,
    addElement,
    removeAllChild,
    chooseNavItem,
    refreshDivClass,
    updateColors,
  }
})()
