import { main } from "./index.js"
import { utils } from "./utils.js"
import { local } from "./localSaves.js"

//THIS MODULE UTILIZES EVENT DELIGATION
export const events = (() => {
  //=====================================
  //============NAV EVENTS===============
  //=====================================
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
  //=====================================
  //============PAGE EVENTS==============
  //=====================================
  const initiatePageEvents = () => {
    const page = document.getElementById(main.PAGE_ID)

    page.addEventListener("click", e => {
      const targetElement = e.target

      //=====================================
      //============SETTINGS PAGE============
      //=====================================

      //SETTINGS - Color scheme clicked
      if (targetElement.classList.contains("color-choice")) {
        utils.updateColors(targetElement)
      }

      //=====================================
      //============REMINDERS PAGE===========
      //=====================================

      //REMINDERS - +New CLICKED
      if (targetElement.classList.contains("add-reminder-button") && targetElement.id != "new-active") {
        const form = utils.createReminderBoxPrompt()
        document.getElementById("page-content-container").appendChild(form)
        setTimeout(() => {
          form.classList.add("animate")
        }, 10)
        targetElement.id = "new-active" //deactivate +New button
        utils.toggleReminderDim(true)
      }
      //REMINDER PROMPT - FORM CONFIRM
      if (
        targetElement.tagName === "BUTTON" &&
        targetElement.type === "submit" &&
        targetElement.closest("form") &&
        targetElement.closest("form").id === "reminderForm"
      ) {
        e.preventDefault() // Prevent default form submission behavior
        const formData = new FormData(targetElement.closest("form"))
        const reminderData = {
          title: formData.get("title"),
          description: formData.get("description"),
          dueDate: formData.get("dueDate"),
          priority: formData.get("priority"),
        }
        const reminder = utils.createReminder(
          `${reminderData.title}: `,
          reminderData.description,
          utils.reformatDateString(reminderData.dueDate),
          reminderData.priority
        )

        const reminderDate = utils.reformatDateString(reminderData.dueDate)
        const today = utils.getTodaysDateFormatted()
        const reminderDataJSON = JSON.stringify(reminderData)

        if (today == reminderDate) {
          document.querySelector(".today-container").appendChild(reminder)
          localStorage.setItem(`reminder-${reminderData.title}`, reminderDataJSON)
        } else {
          document.querySelector(".due-later-container").appendChild(reminder)
          localStorage.setItem(`reminder-${reminderData.title}`, reminderDataJSON)
        }

        targetElement.closest("form").remove()
        //activate +New button
        document.getElementById("new-active").id = ""
        utils.toggleReminderDim(false)
      }
      //REMINDER PROMPT - FORM CANCEL
      else if (
        targetElement.tagName === "BUTTON" &&
        targetElement.textContent == "Cancel" &&
        targetElement.closest("form").id === "reminderForm"
      ) {
        //activate +New button
        utils.toggleReminderDim(false)
        document.getElementById("new-active").id = ""
      }
    })
  }

  const initiateListeners = () => {
    initiateNavEvents()
    initiatePageEvents()
  }

  return { initiateListeners }
})()
