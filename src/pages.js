import { utils } from "./utils.js"
import { main } from "./index.js"

export const pages = (() => {
  const showSettings = () => {
    utils.removeAllChild(document.getElementById(main.PAGE_ID))
    document.getElementById(main.PAGE_ID).classList = ""
    document.getElementById(main.PAGE_ID).classList.add("settings")
    utils.addElement(document.getElementById(main.PAGE_ID), "Settings", "settings-title")
  }

  const showJournal = () => {
    utils.removeAllChild(document.getElementById(main.PAGE_ID))
    document.getElementById(main.PAGE_ID).classList = ""
    document.getElementById(main.PAGE_ID).classList.add("journal")
  }

  //show reminder

  return { showSettings, showJournal }
})()
