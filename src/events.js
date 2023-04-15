import { main } from "./index.js"
import { utils } from "./utils.js"
import { pages } from "./pages.js"

export const events = (() => {
  const navItemClickStyle = () => {
    const items = document.querySelectorAll(".nav-item")
    items.forEach(i => {
      i.addEventListener("click", () => {
        items.forEach(a => {
          if (a.classList == "nav-item nav-active") {
            a.classList.remove("nav-active")
          }
          i.classList.add("nav-active")
          localStorage.setItem("CURRENT_PAGE", i.textContent)
        })
      })
    })
  }

  const settingsClicked = () => {
    const settings = utils.chooseNavItem("Settings")
    settings.addEventListener("click", () => {
      pages.showSettings()
    })
  }

  const journalClicked = () => {
    const journal = utils.chooseNavItem("Journal")
    journal.addEventListener("click", () => {
      pages.showJournal()
    })
  }

  const initiateListeners = () => {
    navItemClickStyle()
    settingsClicked()
    journalClicked()
  }

  return { initiateListeners }
})()
