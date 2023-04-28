import { utils } from "./utils.js"
import { main } from "./index.js"
import { local } from "./localSaves.js"
import { lab } from "color"

//NOTE: Each show* function is responsible for deleting all children and child elements,
//and then re-initiating event listeners from events.js

export const pages = (() => {
  const showSettings = () => {
    utils.removeAllChild(document.getElementById(main.PAGE_ID))
    utils.refreshDivClass(`#${main.PAGE_ID}`, "settings")
    utils.addElement(document.getElementById(main.PAGE_ID), "Settings", "page-title")
    utils.addStructure(document.getElementById(main.PAGE_ID), "id", "page-content-container")
    utils.addStructure(document.getElementById("page-content-container"), "class", "color-scheme-container")
    utils.addElement(document.querySelector(".color-scheme-container"), "Color Scheme:", "color-scheme-title")
    utils.addStructure(document.querySelector(".color-scheme-container"), "class", "color-container")
    const colors = [
      {
        "#009688": "#B2DFDB", // Teal
      },
      {
        "#2196F3": "#BBDEFB", // Blue
      },
      {
        "#3F51B5": "#C5CAE9", // Indigo
      },
      {
        "#F06292": "#F8BBD0", // Fuchsia
      },
      {
        "#E91E63": "#F48FB1", // Rose
      },
      {
        "#FF9800": "#FFE0B2", // Orange
      },
      {
        "#FFC107": "#FFECB3", // Amber
      },
      {
        "#000000": "#D6D6D6", // Black
      },
    ]
    for (let i = 0; i < colors.length; i++) {
      utils.addStructure(document.querySelector(".color-container"), "class", "color-choice")
    }
    const colorChoices = document.querySelectorAll(".color-choice")
    colorChoices.forEach((element, index) => {
      const colorPair = colors[index]
      const color600 = Object.keys(colorPair)[0]
      const color100 = colorPair[color600]
      element.style.backgroundImage = `linear-gradient(-45deg, ${color600}, ${color100})`
      element.setAttribute("data-color600", color600)
      element.setAttribute("data-color100", color100)
    })
  }

  const showJournal = () => {
    utils.removeAllChild(document.getElementById(main.PAGE_ID))
    utils.refreshDivClass(`#${main.PAGE_ID}`, "journal")
    utils.addElement(document.getElementById(main.PAGE_ID), "Journal", "page-title")
    utils.addStructure(document.getElementById(main.PAGE_ID), "id", "page-content-container")

    utils.addStructure(document.getElementById("page-content-container"), "class", "journal-controls-container")
    const buttonContainer = document.querySelector(".journal-controls-container")

    const journalEntryButton = document.createElement("button")
    const pencilIcon =
      '<svg class="pencil-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 19h1.4l8.625-8.625l-1.4-1.4L5 17.6V19ZM19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM4 21q-.425 0-.713-.288T3 20v-2.825q0-.2.075-.388t.225-.337l10.3-10.3l4.25 4.25l-10.3 10.3q-.15.15-.337.225T6.825 21H4ZM14.325 9.675l-.7-.7l1.4 1.4l-.7-.7Z"/></svg>'
    journalEntryButton.innerHTML = `New Entry ${pencilIcon}`
    journalEntryButton.classList.add("journal-entry-button")
    buttonContainer.appendChild(journalEntryButton)

    utils.addStructure(document.getElementById("page-content-container"), "class", "journal-container")
    const journalContainer = document.querySelector(".journal-container")
    document.getElementById("page-content-container").appendChild(journalContainer)

    local.loadAllEntries()
  }

  const showReminders = () => {
    utils.removeAllChild(document.getElementById(main.PAGE_ID))
    utils.refreshDivClass(`#${main.PAGE_ID}`, "reminders")
    utils.addElement(document.getElementById(main.PAGE_ID), "Reminders", "page-title")
    utils.addStructure(document.getElementById(main.PAGE_ID), "id", "page-content-container")

    utils.addStructure(document.getElementById("page-content-container"), "class", "reminder-controls-container")
    const buttonContainer = document.querySelector(".reminder-controls-container")
    const addReminderButton = document.createElement("button")
    addReminderButton.textContent = "+New"
    addReminderButton.classList.add("add-reminder-button")
    buttonContainer.appendChild(addReminderButton)
    const label = document.createElement("div")
    label.textContent = "Filter by: "
    const filter = document.createElement("select")
    filter.name = "filter"
    filter.classList.add("reminder-filter-select")
    const filterOptions = ["Due Date", "Priority"]
    filterOptions.forEach(o => {
      const option = document.createElement("option")
      option.value = o
      option.textContent = o
      filter.appendChild(option)
    })
    const filterContainer = document.createElement("div")
    filterContainer.classList.add("filter-container")
    filterContainer.appendChild(label)
    filterContainer.appendChild(filter)
    buttonContainer.appendChild(filterContainer)
    document.getElementById("page-content-container").appendChild(buttonContainer)

    const today = document.createElement("div")
    today.classList.add("today-container")
    document.getElementById("page-content-container").appendChild(today)
    utils.addElement(document.querySelector(".today-container"), "Today", "reminder-title-small")
    utils.addStructure(document.querySelector(".today-container"), "class", "reminder-container")

    const dueLater = document.createElement("div")
    dueLater.classList.add("due-later-container")
    document.getElementById("page-content-container").appendChild(dueLater)
    utils.addElement(document.querySelector(".due-later-container"), "Due Later", "reminder-title-small")
    utils.addStructure(document.querySelector(".due-later-container"), "class", "reminder-container")

    const overDue = document.createElement("div")
    overDue.classList.add("overdue-container")
    document.getElementById("page-content-container").appendChild(overDue)
    utils.addElement(document.querySelector(".overdue-container"), "Overdue", "reminder-title-small")
    utils.addStructure(document.querySelector(".overdue-container"), "class", "reminder-container")

    utils.addCollapseIcons()
    local.loadAllReminders()
  }

  const showAboutUs = () => {
    utils.removeAllChild(document.getElementById(main.PAGE_ID))
    utils.refreshDivClass(`#${main.PAGE_ID}`, "about-us")
    utils.addElement(document.getElementById(main.PAGE_ID), "About Us", "page-title")
    utils.addStructure(document.getElementById(main.PAGE_ID), "id", "page-content-container")
  }

  return {
    showSettings,
    showJournal,
    showReminders,
    showAboutUs,
  }
})()
