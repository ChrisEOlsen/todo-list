import { pages } from "./pages.js"

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
      //TODO update for all pages
    }
  }

  const callStyles = () => {
    styleCurrentPageButton()
    loadCurrentPage()
  }

  return { callStyles }
})()
