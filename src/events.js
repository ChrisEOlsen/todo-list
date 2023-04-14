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
        })
      })
    })
  }

  const initiateListeners = () => {
    navItemClickStyle()
  }

  return { navItemClickStyle, initiateListeners }
})()
