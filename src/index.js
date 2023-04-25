import "./styles.css"
import { utils } from "./utils.js"
import { events } from "./events.js"
import { local } from "./localSaves.js"

export const main = (() => {
  const projectContainer = document.getElementById("container")
  const HEADER_ID = "header"
  const PROJECT_BODY_ID = "body"
  const NAV_ID = "nav"
  const PAGE_ID = "page"
  const FOOTER_ID = "footer"

  const createSkeleton = () => {
    utils.addStructure(projectContainer, "id", HEADER_ID)
    utils.addStructure(projectContainer, "id", PROJECT_BODY_ID)
    utils.addStructure(document.getElementById(PROJECT_BODY_ID), "id", NAV_ID)
    utils.addStructure(document.getElementById(NAV_ID), "class", "nav-item-container")
    utils.addStructure(document.getElementById(NAV_ID), "class", "nav-setting-container")
    utils.addStructure(document.getElementById(PROJECT_BODY_ID), "id", PAGE_ID)
    utils.addStructure(projectContainer, "id", FOOTER_ID)
  }

  const createAllElements = () => {
    utils.addElement(document.getElementById(HEADER_ID), "Todooz", "logo")
    utils.addElement(document.getElementById(HEADER_ID), "User's Name", "user-profile")
    utils.addElement(document.getElementById(FOOTER_ID), "Copyright @ChrisOlsen 2023", "footer-content")
    utils.addElement(document.querySelector(".nav-item-container"), "Reminders", "nav-item")
    utils.addElement(document.querySelector(".nav-item-container"), "Journal", "nav-item")
    utils.addElement(document.querySelector(".nav-setting-container"), "Settings", "nav-item")
    utils.addElement(document.querySelector(".nav-setting-container"), "About Us", "nav-item")
  }

  return {
    createSkeleton,
    createAllElements,
    projectContainer,
    HEADER_ID,
    FOOTER_ID,
    PROJECT_BODY_ID,
    NAV_ID,
    PAGE_ID,
  }
})()

main.createSkeleton()
main.createAllElements()
local.callStyles()
events.initListeners()
