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

  function getAncestorNode(element, levelsUp) {
    let ancestor = element
    for (let i = 0; i < levelsUp; i++) {
      if (!ancestor.parentNode) {
        return null
      }
      ancestor = ancestor.parentNode
    }
    return ancestor
  }

  const refreshDivClass = (identifier, cssClass) => {
    document.querySelector(identifier).classList = ""
    document.querySelector(identifier).classList.add(cssClass)
  }
  //settings colors
  const updateColors = element => {
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
    localStorage.setItem("COLOR_SCHEME_H", color600)
    localStorage.setItem("COLOR_SCHEME_N", intermediateColor)
    localStorage.setItem("COLOR_SCHEME_P", color100)
  }

  function createReminderBoxPrompt() {
    const form = document.createElement("form")
    form.id = "reminderForm"
    form.className = "reminder-box-prompt"

    // Title input
    const titleInput = document.createElement("input")
    titleInput.type = "text"
    titleInput.name = "title"
    titleInput.placeholder = "Title"
    titleInput.className = "form-item"
    form.appendChild(titleInput)

    // Description input
    const descriptionInput = document.createElement("textarea")
    descriptionInput.name = "description"
    descriptionInput.placeholder = "Description"
    descriptionInput.className = "form-item"
    form.appendChild(descriptionInput)

    // Due date input
    const dueDateLabel = document.createElement("label")
    dueDateLabel.textContent = "Due date:"
    const dueDateInput = document.createElement("input")
    dueDateInput.type = "date"
    dueDateInput.name = "dueDate"
    dueDateInput.className = "form-item"
    dueDateLabel.appendChild(dueDateInput)
    form.appendChild(dueDateLabel)

    // Priority input
    const priorityContainer = document.createElement("div")
    priorityContainer.className = "priority-container"
    const priorityLabel = document.createElement("label")
    priorityLabel.textContent = "Priority:"
    const prioritySelect = document.createElement("select")
    prioritySelect.name = "priority"
    prioritySelect.className = "form-item"
    const priorities = ["Red", "Yellow", "Green"]
    priorities.forEach(priority => {
      const option = document.createElement("option")
      option.value = priority
      option.textContent = priority
      prioritySelect.appendChild(option)
    })
    priorityLabel.appendChild(prioritySelect)
    priorityContainer.appendChild(priorityLabel)
    form.appendChild(priorityContainer)

    // Buttons
    const buttonsDiv = document.createElement("div")
    buttonsDiv.className = "form-item"
    const cancelButton = document.createElement("button")
    cancelButton.type = "button"
    cancelButton.textContent = "Cancel"
    cancelButton.onclick = () => form.remove() // Remove form when Cancel button is clicked
    const confirmButton = document.createElement("button")
    confirmButton.type = "submit"
    confirmButton.textContent = "Confirm"
    buttonsDiv.appendChild(cancelButton)
    buttonsDiv.appendChild(confirmButton)
    priorityContainer.appendChild(buttonsDiv)

    return form
  }

  function reformatDateString(dateString) {
    if (dateString == "") return
    const [year, month, day] = dateString.split("-")
    return `${month}/${day}/${year}`
  }

  function getTodaysDateFormatted() {
    const today = new Date()
    const year = today.getFullYear()
    const month = ("0" + (today.getMonth() + 1)).slice(-2)
    const day = ("0" + today.getDate()).slice(-2)

    return `${month}/${day}/${year}`
  }

  function getEarliestDate(dateString1, dateString2) {
    const date1 = new Date(Date.parse(dateString1))
    const date2 = new Date(Date.parse(dateString2))

    if (date1 < date2) {
      return dateString1
    } else {
      return dateString2
    }
  }

  const createReminder = (title, description, dueDate, priority) => {
    // Create a div container with a class of 'reminder'
    const reminderContainer = document.createElement("div")
    reminderContainer.classList.add("reminder")

    // Create a checkbox for task completion
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.classList.add("reminder-box-checkbox")

    const reminderTextContainer = document.createElement("div")
    reminderTextContainer.classList.add("reminder-text-container")

    // Create a title element with a class of reminder-box-title
    const reminderTitle = document.createElement("span")
    reminderTitle.classList.add("reminder-box-title")
    reminderTitle.textContent = title

    // Create a description element with a class of reminder-box-description
    const reminderDescription = document.createElement("span")
    reminderDescription.classList.add("reminder-box-description")
    reminderDescription.textContent = description

    // Create a due date element with a class of reminder-box-due-date
    const reminderDueDate = document.createElement("span")
    reminderDueDate.classList.add("reminder-box-due-date")
    reminderDueDate.textContent = dueDate

    // Append the elements to the reminder container
    reminderTextContainer.appendChild(checkbox)
    reminderTextContainer.appendChild(reminderTitle)
    reminderTextContainer.appendChild(reminderDescription)
    reminderContainer.appendChild(reminderTextContainer)
    reminderContainer.appendChild(reminderDueDate)

    switch (priority) {
      case "Red":
        reminderContainer.style.borderRight = "4px solid red"
        break
      case "Yellow":
        reminderContainer.style.borderRight = "4px solid yellow"
        break
      case "Green":
        reminderContainer.style.borderRight = "4px solid green"
        break
    }
    return reminderContainer
  }

  const appendReminders = (today, dueDate, reminder) => {
    if (today == dueDate) {
      const parent = document.querySelector(".today-container")
      const reminderContainer = parent.querySelector(".reminder-container")
      reminderContainer.appendChild(reminder)
    } else if (utils.getEarliestDate(today, dueDate) == dueDate) {
      const parent = document.querySelector(".overdue-container")
      const reminderContainer = parent.querySelector(".reminder-container")
      reminderContainer.appendChild(reminder)
    } else {
      const parent = document.querySelector(".due-later-container")
      const reminderContainer = parent.querySelector(".reminder-container")
      reminderContainer.appendChild(reminder)
    }
  }

  const toggleClassForElements = (elements, className, on) => {
    elements.forEach(element => {
      if (on) {
        element.classList.add(className)
      } else {
        element.classList.remove(className)
      }
    })
  }

  const toggleReminderDim = on => {
    const reminders = document.querySelectorAll(".reminder")
    const titles = document.querySelectorAll(".reminder-title-small")
    toggleClassForElements(reminders, "dim", on)
    toggleClassForElements(titles, "dim", on)
  }

  return {
    addStructure,
    addElement,
    removeAllChild,
    getAncestorNode,
    refreshDivClass,
    updateColors,
    createReminderBoxPrompt,
    createReminder,
    reformatDateString,
    getTodaysDateFormatted,
    getEarliestDate,
    appendReminders,
    toggleReminderDim,
  }
})()
