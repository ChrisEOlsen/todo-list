import { main } from "./index.js"
import { utils } from "./utils.js"
import { local } from "./localSaves.js"

//THIS MODULE UTILIZES EVENT DELIGATION
export const events = (() => {
  //=====================================
  //============NAVIGATION===============
  //=====================================
  const initNavEvents = () => {
    const nav = document.getElementById(main.NAV_ID)

    nav.addEventListener("click", e => {
      const targetElement = e.target

      if (targetElement.classList.contains("nav-item")) {
        const navItems = document.querySelectorAll(".nav-item")
        navItems.forEach(n => {
          n.classList.remove("nav-active")
        })
        targetElement.classList.toggle("nav-active")

        localStorage.setItem("CURRENT_PAGE", targetElement.textContent)
        local.loadCurrentPage()
      }
    })
  }
  //=====================================
  //============REMINDERS PAGE===========
  //=====================================
  const initRemindersPageEvents = targetElement => {
    // REMINDERS - +New CLICKED
    if (targetElement.classList.contains("add-reminder-button") && targetElement.id != "new-active") {
      const form = utils.createReminderBoxPrompt()
      document.getElementById("page-content-container").appendChild(form)
      setTimeout(() => {
        form.classList.add("animate")
      }, 10)
      targetElement.id = "new-active" //deactivate +New button
      utils.toggleReminderDim(true)
    }
    // REMINDER PROMPT - FORM CONFIRM
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

      utils.appendReminders(today, reminderDate, reminder)
      localStorage.setItem(`reminder-${reminderData.title}`, reminderDataJSON)

      targetElement.closest("form").remove()
      //activate +New button
      document.getElementById("new-active").id = ""
      utils.toggleReminderDim(false)
    }
    // REMINDER PROMPT - FORM CANCEL
    else if (
      targetElement.tagName === "BUTTON" &&
      targetElement.textContent == "Cancel" &&
      targetElement.closest("form").id === "reminderForm"
    ) {
      //activate +New button
      utils.toggleReminderDim(false)
      document.getElementById("new-active").id = ""
    }

    //COLLAPSE CONTAINERS
    if (targetElement.id == "collapse-icon") {
      const ancestor = utils.getAncestorNode(targetElement, 2)
      const reminders = ancestor.querySelectorAll(".reminder")
      ancestor.classList.toggle("collapsed")
      const isCollapsed = ancestor.classList.contains("collapsed")
      targetElement.style.transform = isCollapsed ? "rotate(360deg)" : "rotate(180deg)"
      reminders.forEach(r => {
        r.style.display = isCollapsed ? "none" : "flex"
      })
    }
  }
  //=====================================
  //============SETTINGS PAGE============
  //=====================================
  const initSettingsPageEvents = targetElement => {
    // SETTINGS - Color scheme clicked
    if (targetElement.classList.contains("color-choice")) {
      utils.updateColors(targetElement)
    }
  }
  //=====================================
  //============PAGE EVENTS==============
  //=====================================
  const initPageEvents = () => {
    const page = document.getElementById(main.PAGE_ID)

    page.addEventListener("click", e => {
      const targetElement = e.target

      initSettingsPageEvents(targetElement)
      initRemindersPageEvents(targetElement)
    })
  }

  const initListeners = () => {
    initNavEvents()
    initPageEvents()
  }

  return { initListeners }
})()
