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
    const containers = [
      document.querySelector(".today-container .reminder-container"),
      document.querySelector(".due-later-container .reminder-container"),
      document.querySelector(".overdue-container .reminder-container"),
    ]
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key.startsWith("reminder-")) {
        const storedDataJSON = localStorage.getItem(key)
        const storedData = JSON.parse(storedDataJSON)
        const title = `${storedData.title}: `
        const description = storedData.description
        const dueDate = utils.reformatDateString(storedData.dueDate)
        const priority = storedData.priority
        const uniqueID = storedData.id
        const today = utils.getTodaysDateFormatted()

        const reminder = utils.createReminder(title, description, dueDate, priority, uniqueID)

        utils.appendReminderByDate(today, dueDate, reminder)
      }
    }

    // Sort all reminders by their border color and dates after appending them
    containers.forEach(container => utils.sortReminders(container))
  }

  const loadAllEntries = () => {
    let journalEntries = []

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key.startsWith("journal-")) {
        const storedDataJSON = localStorage.getItem(key)
        const storedData = JSON.parse(storedDataJSON)
        const title = storedData.title
        const entry = storedData.entry
        const date = storedData.date
        const uniqueID = storedData.id

        const journalEntry = utils.createJournalEntry(title, entry, date, uniqueID)
        journalEntries.push(journalEntry)
      }
    }

    // Sort the journal entries array by uniqueID which is created via new Date.now()
    journalEntries.sort((a, b) => parseInt(a.id) - parseInt(b.id))

    // Append the sorted journal entries to the journal container
    const journalContainer = document.querySelector(".journal-container")
    journalEntries.forEach(journalEntry => {
      journalContainer.prepend(journalEntry)
    })
  }

  const callStyles = () => {
    styleCurrentPageButton()
    loadCurrentPage()
    loadCurrentColor()
  }

  return { callStyles, loadCurrentPage, loadAllReminders, loadAllEntries }
})()
