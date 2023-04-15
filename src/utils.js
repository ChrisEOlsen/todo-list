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

  return {
    addStructure,
    addElement,
    removeAllChild,
    chooseNavItem,
  }
})()
