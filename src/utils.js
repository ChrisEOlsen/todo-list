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

  return { addStructure, addElement }
})()
