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
      //default: pages.showJournal()
      //TODO update for all pages
    }
  }

  const callStyles = () => {
    styleCurrentPageButton()
    loadCurrentPage()
  }

  return { callStyles }
})()
