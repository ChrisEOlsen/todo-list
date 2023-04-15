import { local } from "./localSaves.js"

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

  const initiateListeners = () => {
    navItemClickStyle()
  }

  return { navItemClickStyle, initiateListeners }
})()
