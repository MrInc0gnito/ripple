"use client"

import { useState } from "react"
import { Shield, Zap } from "lucide-react"

interface SnipePlusSettingsProps {
  isLoggedIn: boolean
  isSnipePlus: boolean
}

export default function SnipePlusSettings({ isLoggedIn, isSnipePlus }: SnipePlusSettingsProps) {
  const [snipeSecureEnabled, setSnipeSecureEnabled] = useState(true)
  const [adsEnabled, setAdsEnabled] = useState(false)
  const [wideDisplayEnabled, setWideDisplayEnabled] = useState(true)

  if (!isLoggedIn) {
    return (
      <div className="space-y-6">
        <div className="bg-[rgba(31,41,55,0.5)] p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <h3 className="font-medium">Upgrade to SnipePlus</h3>
          </div>
          <p className="text-sm text-white/70 mb-3">
            Unlock premium features including SnipeSecure, ad controls, and Wide-Display mode.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-white/80 mb-4">
              <thead className="text-xs uppercase bg-[rgba(31,41,55,0.7)]">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Feature
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Free
                  </th>
                  <th scope="col" className="px-4 py-3 text-center bg-blue-900/50">
                    SnipePlus
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="px-4 py-2">SnipeSecure Protection</td>
                  <td className="px-4 py-2 text-center">❌</td>
                  <td className="px-4 py-2 text-center bg-blue-900/20">✅</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="px-4 py-2">Ad Controls</td>
                  <td className="px-4 py-2 text-center">❌</td>
                  <td className="px-4 py-2 text-center bg-blue-900/20">✅</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="px-4 py-2">Wide-Display Mode</td>
                  <td className="px-4 py-2 text-center">❌</td>
                  <td className="px-4 py-2 text-center bg-blue-900/20">✅</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="px-4 py-2">Priority Support</td>
                  <td className="px-4 py-2 text-center">❌</td>
                  <td className="px-4 py-2 text-center bg-blue-900/20">✅</td>
                </tr>
              </tbody>
            </table>
          </div>
          <a
            href="https://buy.stripe.com/test_00g5lL0Ht2Hl0QU000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded text-white transition-colors hover:from-purple-700 hover:to-blue-700"
          >
            Upgrade Now
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm text-white/60 mb-4">SnipePlus Features</h3>

        {!isSnipePlus && (
          <div className="bg-[rgba(31,41,55,0.5)] p-4 rounded-lg mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h3 className="font-medium">Upgrade to SnipePlus</h3>
            </div>
            <p className="text-sm text-white/70 mb-3">
              Unlock premium features including SnipeSecure, ad controls, and Wide-Display mode.
            </p>
            <a
              href="https://buy.stripe.com/test_00g5lL0Ht2Hl0QU000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded text-white transition-colors hover:from-purple-700 hover:to-blue-700"
            >
              Upgrade Now
            </a>
          </div>
        )}

        <div className="space-y-4">
          <div className="bg-[rgba(31,41,55,0.5)] p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                <h3 className="font-medium">SnipeSecure</h3>
              </div>
              <label
                className={`relative inline-flex items-center ${!isSnipePlus ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              >
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={snipeSecureEnabled}
                  onChange={(e) => isSnipePlus && setSnipeSecureEnabled(e.target.checked)}
                  disabled={!isSnipePlus}
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <p className="text-sm text-white/70">Protects your identity and blocks unrequired cookies</p>
            {!isSnipePlus && <p className="text-xs text-yellow-400 mt-1">SnipePlus required</p>}
          </div>

          <div className="bg-[rgba(31,41,55,0.5)] p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-400"
                >
                  <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
                  <polyline points="17 2 12 7 7 2" />
                </svg>
                <h3 className="font-medium">Ads</h3>
              </div>
              <label
                className={`relative inline-flex items-center ${!isSnipePlus ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              >
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={adsEnabled}
                  onChange={(e) => isSnipePlus && setAdsEnabled(e.target.checked)}
                  disabled={!isSnipePlus}
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <p className="text-sm text-white/70">Enable or disable advertisements</p>
            {!isSnipePlus && <p className="text-xs text-yellow-400 mt-1">SnipePlus required</p>}
          </div>

          <div className="bg-[rgba(31,41,55,0.5)] p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-400"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                <h3 className="font-medium">Ripple Wide-Display</h3>
              </div>
              <label
                className={`relative inline-flex items-center ${!isSnipePlus ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              >
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={wideDisplayEnabled}
                  onChange={(e) => isSnipePlus && setWideDisplayEnabled(e.target.checked)}
                  disabled={!isSnipePlus}
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <p className="text-sm text-white/70">
              Adds a "Widen" button on app pages that opens the app in a new about:blank tab
            </p>
            {!isSnipePlus && <p className="text-xs text-yellow-400 mt-1">SnipePlus required</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
