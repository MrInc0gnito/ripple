"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type ThemeType = "Ripple" | "Ripple Matte" | "White" | "Low Profile"
type CloakType = "Ripple" | "Google" | "Teams" | "Ghost"
type AccentColorType = "blue" | "red" | "green" | "orange" | "purple"

interface SettingsContextType {
  // Current settings (applied)
  theme: ThemeType
  cloak: CloakType
  accentColor: AccentColorType
  escapeKeyEnabled: boolean
  escapeKey: string
  escapeUrl: string
  displaySnipeShield: boolean
  showDevFunc: boolean
  snipeSecureEnabled: boolean
  adsEnabled: boolean
  wideDisplayEnabled: boolean

  // Pending settings (not yet applied)
  pendingSettings: {
    theme: ThemeType
    cloak: CloakType
    accentColor: AccentColorType
    escapeKeyEnabled: boolean
    escapeKey: string
    escapeUrl: string
    displaySnipeShield: boolean
    snipeSecureEnabled: boolean
    adsEnabled: boolean
    wideDisplayEnabled: boolean
  }

  // Methods
  setPendingTheme: (theme: ThemeType) => void
  setPendingCloak: (cloak: CloakType) => void
  setPendingAccentColor: (color: AccentColorType) => void
  setPendingEscapeKeyEnabled: (enabled: boolean) => void
  setPendingEscapeKey: (key: string) => void
  setPendingEscapeUrl: (url: string) => void
  setPendingDisplaySnipeShield: (enabled: boolean) => void
  setPendingSnipeSecureEnabled: (enabled: boolean) => void
  setPendingAdsEnabled: (enabled: boolean) => void
  setPendingWideDisplayEnabled: (enabled: boolean) => void

  applySettings: () => void
  resetAppearance: () => void
  resetCloaking: () => void
  resetSecurity: () => void
  resetAllToDefaults: () => void

  updateShowDevFunc: (show: boolean) => void
  getAccentColorHex: (color: AccentColorType) => string
}

const defaultSettings = {
  theme: "Ripple" as ThemeType,
  cloak: "Ripple" as CloakType,
  accentColor: "blue" as AccentColorType,
  escapeKeyEnabled: false,
  escapeKey: "=",
  escapeUrl: "https://google.com",
  displaySnipeShield: true,
  showDevFunc: false,
  snipeSecureEnabled: false,
  adsEnabled: true,
  wideDisplayEnabled: false,
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: ReactNode }) {
  // Applied settings
  const [theme, setTheme] = useState<ThemeType>(defaultSettings.theme)
  const [cloak, setCloak] = useState<CloakType>(defaultSettings.cloak)
  const [accentColor, setAccentColor] = useState<AccentColorType>(defaultSettings.accentColor)
  const [escapeKeyEnabled, setEscapeKeyEnabled] = useState(defaultSettings.escapeKeyEnabled)
  const [escapeKey, setEscapeKey] = useState(defaultSettings.escapeKey)
  const [escapeUrl, setEscapeUrl] = useState(defaultSettings.escapeUrl)
  const [displaySnipeShield, setDisplaySnipeShield] = useState(defaultSettings.displaySnipeShield)
  const [showDevFunc, setShowDevFunc] = useState(defaultSettings.showDevFunc)
  const [snipeSecureEnabled, setSnipeSecureEnabled] = useState(defaultSettings.snipeSecureEnabled)
  const [adsEnabled, setAdsEnabled] = useState(defaultSettings.adsEnabled)
  const [wideDisplayEnabled, setWideDisplayEnabled] = useState(defaultSettings.wideDisplayEnabled)

  // Pending settings (not yet applied)
  const [pendingSettings, setPendingSettings] = useState({
    theme: defaultSettings.theme,
    cloak: defaultSettings.cloak,
    accentColor: defaultSettings.accentColor,
    escapeKeyEnabled: defaultSettings.escapeKeyEnabled,
    escapeKey: defaultSettings.escapeKey,
    escapeUrl: defaultSettings.escapeUrl,
    displaySnipeShield: defaultSettings.displaySnipeShield,
    snipeSecureEnabled: defaultSettings.snipeSecureEnabled,
    adsEnabled: defaultSettings.adsEnabled,
    wideDisplayEnabled: defaultSettings.wideDisplayEnabled,
  })

  // Load settings from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSettings = localStorage.getItem("ripple-settings")
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings)

        // Set applied settings
        setTheme(parsedSettings.theme || defaultSettings.theme)
        setCloak(parsedSettings.cloak || defaultSettings.cloak)
        setAccentColor(parsedSettings.accentColor || defaultSettings.accentColor)
        setEscapeKeyEnabled(parsedSettings.escapeKeyEnabled ?? defaultSettings.escapeKeyEnabled)
        setEscapeKey(parsedSettings.escapeKey || defaultSettings.escapeKey)
        setEscapeUrl(parsedSettings.escapeUrl || defaultSettings.escapeUrl)
        setDisplaySnipeShield(parsedSettings.displaySnipeShield ?? defaultSettings.displaySnipeShield)
        setShowDevFunc(parsedSettings.showDevFunc ?? defaultSettings.showDevFunc)
        setSnipeSecureEnabled(parsedSettings.snipeSecureEnabled ?? defaultSettings.snipeSecureEnabled)
        setAdsEnabled(parsedSettings.adsEnabled ?? defaultSettings.adsEnabled)
        setWideDisplayEnabled(parsedSettings.wideDisplayEnabled ?? defaultSettings.wideDisplayEnabled)

        // Set pending settings to match applied settings
        setPendingSettings({
          theme: parsedSettings.theme || defaultSettings.theme,
          cloak: parsedSettings.cloak || defaultSettings.cloak,
          accentColor: parsedSettings.accentColor || defaultSettings.accentColor,
          escapeKeyEnabled: parsedSettings.escapeKeyEnabled ?? defaultSettings.escapeKeyEnabled,
          escapeKey: parsedSettings.escapeKey || defaultSettings.escapeKey,
          escapeUrl: parsedSettings.escapeUrl || defaultSettings.escapeUrl,
          displaySnipeShield: parsedSettings.displaySnipeShield ?? defaultSettings.displaySnipeShield,
          snipeSecureEnabled: parsedSettings.snipeSecureEnabled ?? defaultSettings.snipeSecureEnabled,
          adsEnabled: parsedSettings.adsEnabled ?? defaultSettings.adsEnabled,
          wideDisplayEnabled: parsedSettings.wideDisplayEnabled ?? defaultSettings.wideDisplayEnabled,
        })
      }
    }
  }, [])

  // Apply theme and accent color to document
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Apply theme
      document.body.classList.remove("theme-ripple", "theme-ripple-matte", "light-mode", "low-profile")

      if (theme === "Ripple") {
        document.body.classList.add("theme-ripple")
      } else if (theme === "Ripple Matte") {
        document.body.classList.add("theme-ripple-matte")
      } else if (theme === "White") {
        document.body.classList.add("light-mode")
      } else if (theme === "Low Profile") {
        document.body.classList.add("low-profile")
      }

      // Apply accent color
      document.documentElement.style.setProperty("--accent-color", getAccentColorHex(accentColor))

      // Apply tab cloaking
      if (cloak === "Google") {
        document.title = "Google"
        const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement
        if (favicon) favicon.href = "https://www.google.com/favicon.ico"
      } else if (cloak === "Teams") {
        document.title = "Microsoft Teams"
        const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement
        if (favicon) favicon.href = "https://teams.microsoft.com/favicon.ico"
      } else if (cloak === "Ghost") {
        document.title = " "
        const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement
        if (favicon) favicon.href = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
      } else {
        document.title = "Ripple"
        const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement
        if (favicon) favicon.href = "https://i.ibb.co/KzftD25N/download-3.png"
      }
    }
  }, [theme, accentColor, cloak])

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      const settingsToSave = {
        theme,
        cloak,
        accentColor,
        escapeKeyEnabled,
        escapeKey,
        escapeUrl,
        displaySnipeShield,
        showDevFunc,
        snipeSecureEnabled,
        adsEnabled,
        wideDisplayEnabled,
      }
      localStorage.setItem("ripple-settings", JSON.stringify(settingsToSave))
    }
  }, [
    theme,
    cloak,
    accentColor,
    escapeKeyEnabled,
    escapeKey,
    escapeUrl,
    displaySnipeShield,
    showDevFunc,
    snipeSecureEnabled,
    adsEnabled,
    wideDisplayEnabled,
  ])

  // Helper function to get hex value for accent color
  const getAccentColorHex = (color: AccentColorType): string => {
    switch (color) {
      case "blue":
        return "#3b82f6"
      case "red":
        return "#ef4444"
      case "green":
        return "#10b981"
      case "orange":
        return "#f59e0b"
      case "purple":
        return "#8b5cf6"
      default:
        return "#3b82f6"
    }
  }

  // Methods to update pending settings
  const setPendingTheme = (theme: ThemeType) => {
    setPendingSettings((prev) => ({ ...prev, theme }))
  }

  const setPendingCloak = (cloak: CloakType) => {
    setPendingSettings((prev) => ({ ...prev, cloak }))
  }

  const setPendingAccentColor = (color: AccentColorType) => {
    setPendingSettings((prev) => ({ ...prev, accentColor: color }))
  }

  const setPendingEscapeKeyEnabled = (enabled: boolean) => {
    setPendingSettings((prev) => ({ ...prev, escapeKeyEnabled: enabled }))
  }

  const setPendingEscapeKey = (key: string) => {
    setPendingSettings((prev) => ({ ...prev, escapeKey: key }))
  }

  const setPendingEscapeUrl = (url: string) => {
    setPendingSettings((prev) => ({ ...prev, escapeUrl: url }))
  }

  const setPendingDisplaySnipeShield = (enabled: boolean) => {
    setPendingSettings((prev) => ({ ...prev, displaySnipeShield: enabled }))
  }

  const setPendingSnipeSecureEnabled = (enabled: boolean) => {
    setPendingSettings((prev) => ({ ...prev, snipeSecureEnabled: enabled }))
  }

  const setPendingAdsEnabled = (enabled: boolean) => {
    setPendingSettings((prev) => ({ ...prev, adsEnabled: enabled }))
  }

  const setPendingWideDisplayEnabled = (enabled: boolean) => {
    setPendingSettings((prev) => ({ ...prev, wideDisplayEnabled: enabled }))
  }

  // Method to apply pending settings
  const applySettings = () => {
    setTheme(pendingSettings.theme)
    setCloak(pendingSettings.cloak)
    setAccentColor(pendingSettings.accentColor)
    setEscapeKeyEnabled(pendingSettings.escapeKeyEnabled)
    setEscapeKey(pendingSettings.escapeKey)
    setEscapeUrl(pendingSettings.escapeUrl)
    setDisplaySnipeShield(pendingSettings.displaySnipeShield)
    setSnipeSecureEnabled(pendingSettings.snipeSecureEnabled)
    setAdsEnabled(pendingSettings.adsEnabled)
    setWideDisplayEnabled(pendingSettings.wideDisplayEnabled)
  }

  // Reset functions
  const resetAppearance = () => {
    setPendingSettings((prev) => ({
      ...prev,
      theme: defaultSettings.theme,
      accentColor: defaultSettings.accentColor,
    }))
  }

  const resetCloaking = () => {
    setPendingSettings((prev) => ({ ...prev, cloak: defaultSettings.cloak }))
  }

  const resetSecurity = () => {
    setPendingSettings((prev) => ({
      ...prev,
      escapeKeyEnabled: defaultSettings.escapeKeyEnabled,
      escapeKey: defaultSettings.escapeKey,
      escapeUrl: defaultSettings.escapeUrl,
      displaySnipeShield: defaultSettings.displaySnipeShield,
      snipeSecureEnabled: defaultSettings.snipeSecureEnabled,
    }))
  }

  const resetAllToDefaults = () => {
    setPendingSettings({
      theme: defaultSettings.theme,
      cloak: defaultSettings.cloak,
      accentColor: defaultSettings.accentColor,
      escapeKeyEnabled: defaultSettings.escapeKeyEnabled,
      escapeKey: defaultSettings.escapeKey,
      escapeUrl: defaultSettings.escapeUrl,
      displaySnipeShield: defaultSettings.displaySnipeShield,
      snipeSecureEnabled: defaultSettings.snipeSecureEnabled,
      adsEnabled: defaultSettings.adsEnabled,
      wideDisplayEnabled: defaultSettings.wideDisplayEnabled,
    })
    setTheme(defaultSettings.theme)
    setCloak(defaultSettings.cloak)
    setAccentColor(defaultSettings.accentColor)
    setEscapeKeyEnabled(defaultSettings.escapeKeyEnabled)
    setEscapeKey(defaultSettings.escapeKey)
    setEscapeUrl(defaultSettings.escapeUrl)
    setDisplaySnipeShield(defaultSettings.displaySnipeShield)
    setShowDevFunc(defaultSettings.showDevFunc)
    setSnipeSecureEnabled(defaultSettings.snipeSecureEnabled)
    setAdsEnabled(defaultSettings.adsEnabled)
    setWideDisplayEnabled(defaultSettings.wideDisplayEnabled)
  }

  // Function to update showDevFunc
  const updateShowDevFunc = (show: boolean) => {
    setShowDevFunc(show)
  }

  const value: SettingsContextType = {
    theme,
    cloak,
    accentColor,
    escapeKeyEnabled,
    escapeKey,
    escapeUrl,
    displaySnipeShield,
    showDevFunc,
    snipeSecureEnabled,
    adsEnabled,
    wideDisplayEnabled,
    pendingSettings,
    setPendingTheme,
    setPendingCloak,
    setPendingAccentColor,
    setPendingEscapeKeyEnabled,
    setPendingEscapeKey,
    setPendingEscapeUrl,
    setPendingDisplaySnipeShield,
    setPendingSnipeSecureEnabled,
    setPendingAdsEnabled,
    setPendingWideDisplayEnabled,
    applySettings,
    resetAppearance,
    resetCloaking,
    resetSecurity,
    resetAllToDefaults,
    updateShowDevFunc,
    getAccentColorHex,
  }

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}
