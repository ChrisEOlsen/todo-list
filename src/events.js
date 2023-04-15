import { main } from "./index.js"
import { utils } from "./utils.js"
import { pages } from "./pages.js"

export const events = (() => {
  //NAVIGATION EVENTS
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
  const initiateNavButtons = () => {
    const navEvent = (buttonContent, func) => {
      const navItem = utils.chooseNavItem(buttonContent)
      navItem.addEventListener("click", () => {
        func()
      })
    }
    navEvent("Settings", pages.showSettings)
    navEvent("Journal", pages.showJournal)
    navEvent("Reminders", pages.showReminders)
    navEvent("About Us", pages.showAboutUs)
  }
  const initiateAllNavEvents = () => {
    navItemClickStyle()
    initiateNavButtons()
  }

  const initiateListeners = () => {
    initiateAllNavEvents()
  }

  return { initiateListeners }
})()
