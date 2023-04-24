import { utils } from "./utils.js"
import { main } from "./index.js"
import { local } from "./localSaves.js"

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
  }

  const showReminders = () => {
    utils.removeAllChild(document.getElementById(main.PAGE_ID))
    utils.refreshDivClass(`#${main.PAGE_ID}`, "reminders")
    utils.addElement(document.getElementById(main.PAGE_ID), "Reminders", "page-title")
    utils.addStructure(document.getElementById(main.PAGE_ID), "id", "page-content-container")

    const addReminderButton = document.createElement("button")
    addReminderButton.textContent = "+New"
    addReminderButton.classList.add("add-reminder-button")
    document.getElementById("page-content-container").appendChild(addReminderButton)

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

    const collapseIconHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="m2.5 15.25l7.5-7.5l7.5 7.5l1.5-1.5l-9-9l-9 9z"/></svg>`
    const allTitles = document.querySelectorAll(".reminder-title-small")
    allTitles.forEach(t => {
      // Create an SVG element from the string
      const parser = new DOMParser()
      const svgDoc = parser.parseFromString(collapseIconHTML, "image/svg+xml")
      const svgElement = svgDoc.documentElement
      svgElement.id = `collapse-icon`
      t.appendChild(svgElement)
    })

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
