//TODOOS Project
/*
Functionality:
-- The Basics --
- Add reminders with a description, date and time -> Saved to localStorage

- Reminders are seperated by todays things, later day things are ordered by priority

- The reminders can also be given the TOPIC in journal it is associated with. 

- Keep a virtual journal. Each note is automatically dated to the date and time it is written

- Journal can be seperated by topics. So if you have several things you are studying, you can
    journal stuff that has to do with that topic and keep them seperate. 

-- Layout --
- Header with logo top left, your name on the top right -> name is stored in localStorage

-Side bar (collapses for mobile devies) 
    - Reminders, Journal, Settings (all with icons)
    - Settings will contain styling options for font, and color scheme

- Reminders:
    -Overdue --> All overdue things ordered by priority
    - Today at top, and then a checklist
        - Also ordered by priority
    - Other:
        - Top Priority RED - and then a checklist
        - middle priority yellow - and then a checklist
        - low priority green - and then a checklist
- Journal:
    - Grid, from most recent to oldest, or filtered by project and other
    - Each journal input should have a title, and date by the side, and up to 
      90 chars or so of the note itself visible
*/
import { events } from "./events"
import "./styles.css"
import { utils } from "./utils.js"

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

  const renderAllElements = () => {
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
    renderAllElements,
  }
})()

main.createSkeleton()
main.renderAllElements()
events.initiateListeners()
