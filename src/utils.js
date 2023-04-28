import Color from "color"
import { main } from "./index.js"

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

  const addCollapseIcons = () => {
    const collapseIconHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="m2.5 15.25l7.5-7.5l7.5 7.5l1.5-1.5l-9-9l-9 9z"/></svg>`
    const allTitles = document.querySelectorAll(".reminder-title-small")
    allTitles.forEach(t => {
      // Create an SVG element from the string
      const parser = new DOMParser()
      const svgDoc = parser.parseFromString(collapseIconHTML, "image/svg+xml")
      const svgElement = svgDoc.documentElement
      svgElement.id = `collapse-icon`
      t.appendChild(svgElement)

      //Make all titles none selectable
      t.classList.add("no-select")
    })
  }

  const changeReminderContainerTitles = (title1, title2, title3) => {
    document.querySelector(".today-container .reminder-title-small").textContent = title1
    document.querySelector(".due-later-container .reminder-title-small").textContent = title2
    document.querySelector(".overdue-container .reminder-title-small").textContent = title3
    addCollapseIcons()
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

  const createReminder = (title, description, dueDate, priority, uniqueID) => {
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
    reminderContainer.id = uniqueID
    return reminderContainer
  }

  const getParentContainer = (type, value) => {
    const containerMap = {
      date: {
        today: ".today-container",
        overdue: ".overdue-container",
        dueLater: ".due-later-container",
      },
      priority: {
        Red: ".today-container",
        Yellow: ".due-later-container",
        Green: ".overdue-container",
      },
    }
    return document.querySelector(containerMap[type][value])
  }

  const sortReminders = container => {
    const borderColorOrder = { red: 1, yellow: 2, green: 3 }
    const parseDate = dateString => {
      const [month, day, year] = dateString.split("/")
      return new Date(year, month - 1, day)
    }

    const reminders = Array.from(container.querySelectorAll(".reminder"))
    reminders.sort((a, b) => {
      const aBorderColor = a.style.borderRight.slice(10)
      const bBorderColor = b.style.borderRight.slice(10)
      const priorityComparison = borderColorOrder[aBorderColor] - borderColorOrder[bBorderColor]
      if (priorityComparison !== 0) return priorityComparison

      return (
        parseDate(a.querySelector(".reminder-box-due-date").innerText) -
        parseDate(b.querySelector(".reminder-box-due-date").innerText)
      )
    })

    container.innerHTML = ""
    reminders.forEach(reminder => container.appendChild(reminder))
  }

  const appendReminder = (type, value, reminder) => {
    const parent = getParentContainer(type, value)
    const reminderContainer = parent.querySelector(".reminder-container")
    reminderContainer.appendChild(reminder)
    sortReminders(reminderContainer)
  }

  const appendReminderByDate = (today, dueDate, reminder) => {
    const dateType =
      today === dueDate ? "today" : utils.getEarliestDate(today, dueDate) === dueDate ? "overdue" : "dueLater"
    appendReminder("date", dateType, reminder)
  }

  const appendReminderByPriority = (priority, reminder) => {
    appendReminder("priority", priority, reminder)
  }

  const togglePageInputs = (form_ID, disabled, containerArr) => {
    containerArr.forEach(c => {
      if (c) c.classList.toggle("dim")
    })

    const form = document.getElementById(form_ID)
    const page = document.getElementById(main.PAGE_ID)

    if (page) {
      const inputs = page.querySelectorAll("input, button, textarea, select")
      inputs.forEach(input => {
        if (!form || !form.contains(input)) input.disabled = disabled
      })
    }
  }
  function createJournalEntryPrompt() {
    const form = document.createElement("form")
    form.id = "journalEntryForm"
    form.className = "journal-entry-prompt"

    // Title input
    const titleInput = document.createElement("input")
    titleInput.type = "text"
    titleInput.name = "title"
    titleInput.placeholder = "Title"
    titleInput.className = "journal-prompt-title"
    form.appendChild(titleInput)

    // Journal entry input
    const entryInput = document.createElement("textarea")
    entryInput.name = "entry"
    entryInput.placeholder = "Journal entry"
    entryInput.className = "journal-prompt-entry"
    form.appendChild(entryInput)

    // Buttons container
    const buttonsContainer = document.createElement("div")
    buttonsContainer.className = "buttons-container"

    // Cancel button
    const cancelButton = document.createElement("button")
    cancelButton.type = "button"
    cancelButton.textContent = "Cancel"
    cancelButton.className = "journal-cancel"
    cancelButton.onclick = () => form.remove() // Remove form when Cancel button is clicked
    buttonsContainer.appendChild(cancelButton)

    // Confirm button
    const confirmButton = document.createElement("button")
    confirmButton.type = "submit"
    confirmButton.textContent = "Confirm"
    confirmButton.className = "journal-confirm"
    buttonsContainer.appendChild(confirmButton)

    form.appendChild(buttonsContainer)

    return form
  }

  const createJournalEntry = (title, entry, date, uniqueID) => {
    // Create a div container with a class of 'journal-entry'
    const journalEntryContainer = document.createElement("div")
    journalEntryContainer.classList.add("journal-entry")

    const journalTextContainer = document.createElement("div")
    journalTextContainer.classList.add("journal-text-container")

    // Create a title container with a class of journal-box-title
    const journalTitleContainer = document.createElement("div")
    journalTitleContainer.classList.add("journal-box-title")

    // Create a title element
    const journalTitle = document.createElement("span")

    // Check if title is empty or not defined and set default value
    if (!title || title.trim() === "") {
      journalTitle.textContent = "Journal Entry:"
    } else {
      journalTitle.textContent = title
    }

    // Create a date element
    const journalDate = document.createElement("span")
    journalDate.textContent = date

    // Append title and date to the title container
    journalTitleContainer.appendChild(journalTitle)
    journalTitleContainer.appendChild(journalDate)

    // Create an entry element with a class of journal-box-entry
    const journalEntry = document.createElement("span")
    journalEntry.classList.add("journal-box-entry")
    journalEntry.textContent = entry

    // Append the elements to the journal entry container
    journalTextContainer.appendChild(journalTitleContainer)
    journalTextContainer.appendChild(journalEntry)
    journalEntryContainer.appendChild(journalTextContainer)

    journalEntryContainer.id = uniqueID
    return journalEntryContainer
  }

  return {
    addStructure,
    addElement,
    removeAllChild,
    getAncestorNode,
    refreshDivClass,
    addCollapseIcons,
    changeReminderContainerTitles,
    sortReminders,
    updateColors,
    createReminderBoxPrompt,
    createReminder,
    reformatDateString,
    getTodaysDateFormatted,
    getEarliestDate,
    appendReminderByDate,
    appendReminderByPriority,
    togglePageInputs,
    createJournalEntryPrompt,
    createJournalEntry,
  }
})()
