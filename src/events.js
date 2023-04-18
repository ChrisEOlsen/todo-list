import { main } from "./index.js"
import { utils } from "./utils.js"
import { local } from "./localSaves.js"

export const events = (() => {
  //NAVIGATION EVENTS
  const initiateNavEvents = () => {
    const nav = document.getElementById(main.NAV_ID)
    nav.addEventListener("click", e => {
      const targetElement = e.target

      //Page button clicked
      if (targetElement.classList.contains("nav-item")) {
        const navItem = document.querySelectorAll(".nav-item")
        navItem.forEach(n => {
          if (n.classList.contains("nav-active")) {
            n.classList.remove("nav-active")
          }
        })
        targetElement.classList.add("nav-active")
        localStorage.setItem("CURRENT_PAGE", targetElement.textContent)
        local.loadCurrentPage()
      }
    })
  }

  //PAGE EVENTS
  const initiatePageEvents = () => {
    const page = document.getElementById(main.PAGE_ID)

    page.addEventListener("click", event => {
      const targetElement = event.target

      //Color scheme clicked
      if (targetElement.classList.contains("color-choice")) {
        utils.updateColors(targetElement)
      }
    })
  }

  const initiateListeners = () => {
    initiateNavEvents()
    initiatePageEvents()
  }

  return { initiateListeners }
})()
