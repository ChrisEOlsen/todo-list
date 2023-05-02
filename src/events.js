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
  const initRemindersPageEvents = (targetElement, e) => {
    const reminderContainerArr = [
      document.querySelector(".today-container"),
      document.querySelector(".due-later-container"),
      document.querySelector(".overdue-container"),
    ]

    // REMINDERS - +New CLICKED
    const isNewReminderButton = targetElement.classList.contains("add-reminder-button")
    const isNewButtonActive = targetElement.id !== "new-active"
    if (isNewReminderButton && isNewButtonActive) {
      document.getElementById("page-content-container").scrollTop = "0px"
      const form = utils.createReminderBoxPrompt()
      document.getElementById("page-content-container").appendChild(form)
      setTimeout(() => {
        form.classList.add("animate")
      }, 10)
      utils.togglePageInputs("#reminderForm", true, reminderContainerArr)
    }

    // REMINDER PROMPT - FORM CONFIRM
    if (
      targetElement.tagName === "BUTTON" &&
      targetElement.type === "submit" &&
      targetElement.closest("form") &&
      targetElement.closest("form").id === "reminderForm"
    ) {
      e.preventDefault() // Prevent default form submission behavior
      const uniqueID = Date.now()
      const formData = new FormData(targetElement.closest("form"))
      const reminderData = {
        title: formData.get("title"),
        description: formData.get("description"),
        dueDate: formData.get("dueDate"),
        priority: formData.get("priority"),
        id: uniqueID,
      }
      const reminder = utils.createReminder(
        `${reminderData.title}: `,
        reminderData.description,
        utils.reformatDateString(reminderData.dueDate),
        reminderData.priority,
        reminderData.id
      )

      const reminderDate = utils.reformatDateString(reminderData.dueDate)
      const today = utils.getTodaysDateFormatted()
      const reminderDataJSON = JSON.stringify(reminderData)

      localStorage.setItem(`reminder-${reminder.id}`, reminderDataJSON)

      const currentFilter = document.querySelector(".reminder-filter-select").value

      currentFilter === "Due Date"
        ? utils.appendReminderByDate(today, reminderDate, reminder)
        : utils.appendReminderByPriority(reminderData.priority, reminder)

      utils.togglePageInputs("#reminderForm", false, reminderContainerArr)
      targetElement.closest("form").remove()
    }

    // REMINDER PROMPT - FORM CANCEL
    if (
      targetElement.tagName === "BUTTON" &&
      targetElement.textContent == "Cancel" &&
      targetElement.closest("form").id === "reminderForm"
    ) {
      utils.togglePageInputs("#reminderForm", false, reminderContainerArr)
    }

    //REMINDER - CHECKBOX CLICKED
    if (targetElement.classList.contains("reminder-box-checkbox")) {
      const ancestor = utils.getAncestorNode(targetElement, 2)
      const identifier = ancestor.id
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key.startsWith(`reminder-${identifier}`)) {
          localStorage.removeItem(key)
        }
      }
      ancestor.remove()
    }
    //REMINDER - COLLAPSE CONTAINERS
    if (targetElement.id === "collapse-icon" || targetElement.parentNode.id === "collapse-icon") {
      //Browser click event seperates SVG from its PATH
      const ancestor =
        targetElement.parentNode.id == "collapse-icon"
          ? utils.getAncestorNode(targetElement, 3)
          : utils.getAncestorNode(targetElement, 2)

      const icon = targetElement.parentNode.id == "collapse-icon" ? targetElement.parentNode : targetElement

      const reminderContainer = ancestor.querySelector(".reminder-container")

      reminderContainer.classList.toggle("collapsed")
      const isCollapsed = reminderContainer.classList.contains("collapsed")
      icon.style.transform = isCollapsed ? "rotate(360deg)" : "rotate(180deg)"

      if (isCollapsed) {
        const containerHeight = reminderContainer.getBoundingClientRect().height
        reminderContainer.style.height = `${containerHeight}px`
        reminderContainer.getBoundingClientRect()
        reminderContainer.style.height = "0" // Collapse the container
      } else {
        reminderContainer.style.height = "auto" // Expand the container
      }
    }
  }
  //REMINDERS - FILTER CHANGE, TYPE === 'change'
  const handleFilterChangeReminders = e => {
    const priority = e.target.value === "Priority"
    const containers = {
      red: document.querySelector(".today-container .reminder-container"),
      yellow: document.querySelector(".due-later-container .reminder-container"),
      green: document.querySelector(".overdue-container .reminder-container"),
    }

    document.querySelectorAll(".reminder").forEach(r => {
      const newElem = r.cloneNode(true)
      r.remove()
      priority ? containers[r.style.borderRight.slice(10)].appendChild(newElem) : null
    })

    const allContainers = document.querySelectorAll(".reminder-container")
    allContainers.forEach(c => {
      utils.sortReminders(c)
    })

    utils.changeReminderContainerTitles(
      priority ? "Reds" : "Today",
      priority ? "Yellows" : "Due Later",
      priority ? "Greens" : "Overdue"
    )

    if (!priority) local.loadAllReminders()
  }
  //=====================================
  //============JOURNAL PAGE+============
  //=====================================
  const initJournalPageEvents = (targetElement, e) => {
    targetElement = e.target

    const journalContainerArr = [document.querySelector(".journal-container")]

    //JOURNAL ADD NEW ENTRY
    if (
      ["journal-entry-button", "pencil-icon"].some(className =>
        utils.hasClassOrParentHasClass(targetElement, className)
      )
    ) {
      document.getElementById("page-content-container").scrollTop = "0px"
      const journalEntryPrompt = utils.createJournalEntryPrompt()
      document.getElementById("page-content-container").appendChild(journalEntryPrompt)
      setTimeout(() => {
        journalEntryPrompt.classList.add("animate")
      }, 10)

      utils.togglePageInputs("#journalEntryForm", true, journalContainerArr)
    }

    //JOURNAL FORM CONFIRM
    if (targetElement.classList.contains("journal-confirm")) {
      e.preventDefault()
      const uniqueID = Date.now()
      const formData = new FormData(targetElement.closest("form"))
      const journalEntryData = {
        title: formData.get("title"),
        entry: formData.get("entry"),
        date: utils.getTodaysDateFormatted(),
        id: uniqueID,
      }
      const journalEntry = utils.createJournalEntry(
        journalEntryData.title,
        journalEntryData.entry,
        journalEntryData.date,
        journalEntryData.id
      )

      const journalEntryDataJSON = JSON.stringify(journalEntryData)
      localStorage.setItem(`journal-${journalEntry.id}`, journalEntryDataJSON)

      document.querySelector(".journal-container").prepend(journalEntry)

      utils.togglePageInputs("#journalEntryForm", false, journalContainerArr)
      targetElement.closest("form").remove()
    }
    //JOURNAL FORM CANCEL
    if (targetElement.classList.contains("journal-cancel")) {
      utils.togglePageInputs("#journalEntryForm", false, journalContainerArr)
    }

    //JOURNAL ENTRY CLICKED -EXPAND
    function wrapJournalEntry(entry) {
      const wrapper = document.createElement("div")
      wrapper.className = "journal-entry-wrapper"

      entry.parentNode.insertBefore(wrapper, entry)
      wrapper.appendChild(entry)
      return wrapper
    }
    function unwrapJournalEntry(wrapper) {
      const entry = wrapper.querySelector(".journal-entry")
      wrapper.parentNode.insertBefore(entry, wrapper)
      wrapper.parentNode.removeChild(wrapper)
      return entry
    }

    function getTranslation(target) {
      const rect = target.getBoundingClientRect()
      const translateY = window.innerHeight / 2 - rect.top - rect.height / 2
      const translateX = window.innerWidth / 2 - rect.left - rect.width / 2
      return { x: translateX, y: translateY }
    }

    if (
      ["journal-entry", "journal-box-entry", "journal-text-container", "journal-box-title"].some(className =>
        utils.hasClassOrParentHasClass(targetElement, className)
      ) &&
      targetElement.tagName !== "BUTTON" //deletebutton check
    ) {
      const targetEntry = targetElement.closest(".journal-entry")
      let targetWrapper = targetEntry.parentElement

      if (!targetWrapper.classList.contains("journal-entry-wrapper")) {
        targetWrapper = wrapJournalEntry(targetEntry)
      }

      const translation = getTranslation(targetEntry)

      if (targetWrapper.classList.contains("journal-expand")) {
        targetWrapper.style.transform = ""
        targetEntry.classList.remove("journal-entry-absolute")
        setTimeout(() => {
          unwrapJournalEntry(targetWrapper)
        }, 300)

        document.getElementById("journalEntryDelete").remove()
      } else {
        targetEntry.classList.add("journal-entry-absolute")
        targetWrapper.style.transform = `translate3d(${translation.x}px, ${translation.y - 80}px, 0)`
        targetWrapper.style.transform += `scale(1.1,1.1)`
        utils.appendDeleteButton(targetEntry)
      }
      targetWrapper.classList.toggle("journal-expand")
    }
    //JOURNAL ENTRY EXPANDED - DELETE BUTTON
    if (
      targetElement.id === "journalEntryDelete" ||
      targetElement.parentNode.id === "journalEntryDelete" ||
      utils.getAncestorNode(targetElement, 2).id === "journalEntryDelete"
    ) {
      let targetEntry = null
      if (targetElement.classList.contains(".journal-entry")) {
        targetEntry = targetElement
      } else {
        targetEntry = targetElement.closest(".journal-entry")
      }
      const uniqueID = targetEntry.id
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key.startsWith(`journal-${uniqueID}`)) {
          localStorage.removeItem(key)
        }
      }
      document.getElementById("journalEntryDelete").remove()
      targetEntry.parentNode.remove()
      targetEntry.remove()
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
  //============ALL PAGE EVENTS==========
  //=====================================
  const handleEvent = e => {
    const targetElement = e.target
    initSettingsPageEvents(targetElement)
    initRemindersPageEvents(targetElement, e)
    initJournalPageEvents(targetElement, e)

    // Handle change event for remindersFilter
    if (e.type === "change" && targetElement.matches(".reminder-filter-select")) {
      handleFilterChangeReminders(e)
    }
  }

  const initPageEvents = () => {
    const page = document.getElementById(main.PAGE_ID)
    page.addEventListener("click", handleEvent)
    page.addEventListener("change", handleEvent)
  }

  const initListeners = () => {
    initNavEvents()
    initPageEvents()
  }

  return { initListeners }
})()
