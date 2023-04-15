import { utils } from "./utils.js"
import { main } from "./index.js"

export const pages = (() => {
  const showSettings = () => {
    utils.removeAllChild(document.getElementById(main.PAGE_ID))
    utils.refreshDivClass(`#${main.PAGE_ID}`, "settings")
    utils.addElement(document.getElementById(main.PAGE_ID), "Settings", "page-title")
    utils.addStructure(document.getElementById(main.PAGE_ID), "id", "page-content-container")
  }

  const showJournal = () => {
    utils.removeAllChild(document.getElementById(main.PAGE_ID))
    utils.refreshDivClass(`#${main.PAGE_ID}`, "journal")
    utils.addElement(document.getElementById(main.PAGE_ID), "Journal", "page-title")
    utils.addStructure(document.getElementById(main.PAGE_ID), "id", "page-content-container")
  }

  const showReminders = () => {
    utils.removeAllChild(document.getElementById(main.PAGE_ID))
    utils.refreshDivClass(`#${main.PAGE_ID}`, "reminders")
    utils.addElement(document.getElementById(main.PAGE_ID), "Reminders", "page-title")
    utils.addStructure(document.getElementById(main.PAGE_ID), "id", "page-content-container")
  }

  const showAboutUs = () => {
    utils.removeAllChild(document.getElementById(main.PAGE_ID))
    utils.refreshDivClass(`#${main.PAGE_ID}`, "about-us")
    utils.addElement(document.getElementById(main.PAGE_ID), "About Us", "page-title")
    utils.addStructure(document.getElementById(main.PAGE_ID), "id", "page-content-container")
  }

  return {
    showSettings,
    showJournal,
    showReminders,
    showAboutUs,
  }
})()
