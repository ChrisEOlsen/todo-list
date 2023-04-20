import { pages } from "./pages.js"
import { utils } from "./utils.js"

//This module is responsible for initiating all the saved settings and styles in localStorage
export const local = (() => {
  const styleCurrentPageButton = () => {
    const items = document.querySelectorAll(".nav-item")
    return items.forEach(i => {
      if (i.textContent == localStorage.getItem("CURRENT_PAGE")) {
        i.classList.add("nav-active")
      }
    })
  }

  const loadCurrentPage = () => {
    switch (localStorage.getItem("CURRENT_PAGE")) {
      case "Settings":
        pages.showSettings()
        break
      case "Journal":
        pages.showJournal()
        break
      case "Reminders":
        pages.showReminders()
        break
      case "About Us":
        pages.showAboutUs()
        break
      default:
        pages.showReminders()
    }
  }
  const loadCurrentColor = () => {
    document.documentElement.style.setProperty("--header-color", localStorage.getItem("COLOR_SCHEME_H"))
    document.documentElement.style.setProperty("--nav-color", localStorage.getItem("COLOR_SCHEME_N"))
    document.documentElement.style.setProperty("--page-color", localStorage.getItem("COLOR_SCHEME_P"))
  }

  const loadAllReminders = () => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)

      if (key.startsWith("reminder-")) {
        const storedDataJSON = localStorage.getItem(key)
        const storedData = JSON.parse(storedDataJSON)

        const title = `${storedData.title}: `
        const description = storedData.description
        const dueDate = utils.reformatDateString(storedData.dueDate)
        const priority = storedData.priority

        const reminder = utils.createReminder(title, description, dueDate, priority)

        const today = utils.getTodaysDateFormatted()

        if (today == dueDate) {
          document.querySelector(".today-container").appendChild(reminder)
        } else {
          document.querySelector(".due-later-container").appendChild(reminder)
        }
      }
    }
  }

  const callStyles = () => {
    styleCurrentPageButton()
    loadCurrentPage()
    loadCurrentColor()
  }

  return { callStyles, loadCurrentPage, loadAllReminders }
})()
