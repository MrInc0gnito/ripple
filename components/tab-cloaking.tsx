"use client"

import { useEffect } from "react"
import { useSettings } from "@/contexts/settings-context"

export default function TabCloaking() {
  const { cloak } = useSettings()

  useEffect(() => {
    if (typeof document !== "undefined") {
      // Get the current favicon link element
      const existingFavicon = document.querySelector('link[rel="icon"]')

      // Set the title and favicon based on the cloak setting
      if (cloak === "Google") {
        document.title = "Google"
        if (existingFavicon) {
          existingFavicon.setAttribute("href", "https://www.google.com/favicon.ico")
        } else {
          const link = document.createElement("link")
          link.rel = "icon"
          link.href = "https://www.google.com/favicon.ico"
          document.head.appendChild(link)
        }
      } else if (cloak === "Teams") {
        document.title = "Microsoft Teams"
        if (existingFavicon) {
          existingFavicon.setAttribute("href", "https://teams.microsoft.com/favicon.ico")
        } else {
          const link = document.createElement("link")
          link.rel = "icon"
          link.href = "https://teams.microsoft.com/favicon.ico"
          document.head.appendChild(link)
        }
      } else if (cloak === "Ghost") {
        document.title = " "
        if (existingFavicon) {
          existingFavicon.setAttribute(
            "href",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
          )
        } else {
          const link = document.createElement("link")
          link.rel = "icon"
          link.href =
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          document.head.appendChild(link)
        }
      } else {
        // Default Ripple
        document.title = "Ripple"
        if (existingFavicon) {
          existingFavicon.setAttribute("href", "https://i.ibb.co/KzftD25N/download-3.png")
        } else {
          const link = document.createElement("link")
          link.rel = "icon"
          link.href = "https://i.ibb.co/KzftD25N/download-3.png"
          document.head.appendChild(link)
        }
      }
    }
  }, [cloak])

  return null
}
