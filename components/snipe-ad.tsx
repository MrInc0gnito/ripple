"use client"

interface SnipeAdProps {
  variant?: "small" | "medium" | "large" | "vertical"
}

export default function SnipeAd({ variant = "medium" }: SnipeAdProps) {
  if (variant === "vertical") {
    return (
      <div className="bg-[rgba(30,30,30,0.5)] rounded-lg p-3 text-center text-gray-400 h-full flex flex-col justify-between">
        <p className="text-xs text-white/60 mb-2">SnipeAd</p>
        <p className="mb-3">Need a PC? Bid now on eBay:</p>
        <div className="flex flex-col gap-2">
          <a
            href="https://www.ebay.co.uk/itm/167506178840?itmmeta=01JTXX3B02MB2MV1R1YVJVPDDY&hash=item2700257318:g:YbsAAOSwDntoH613"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white transition-colors"
          >
            Open
          </a>
        </div>
      </div>
    )
  }

  if (variant === "small") {
    return (
      <div className="bg-[rgba(30,30,30,0.5)] rounded-lg p-2 text-center text-gray-400 text-xs flex items-center justify-between">
        <span>Need a PC? Bid now</span>
        <div className="flex gap-1">
          <a
            href="https://www.ebay.co.uk/itm/167506178840?itmmeta=01JTXX3B02MB2MV1R1YVJVPDDY&hash=item2700257318:g:YbsAAOSwDntoH613"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white transition-colors text-xs"
          >
            Open
          </a>
        </div>
      </div>
    )
  }

  if (variant === "large") {
    return (
      <div className="bg-[rgba(30,30,30,0.5)] rounded-lg p-4 text-center text-gray-400">
        <p className="text-xs text-white/60 mb-2">SnipeAd</p>
        <p className="mb-3 font-medium">Need a PC? Bid, bid, bid:</p>
        <p className="mb-3 text-sm">High-performance gaming PC available now on eBay. Limited time offer!</p>
        <div className="flex justify-center gap-2">
          <a
            href="https://www.ebay.co.uk/itm/167506178840?itmmeta=01JTXX3B02MB2MV1R1YVJVPDDY&hash=item2700257318:g:YbsAAOSwDntoH613"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white transition-colors"
          >
            Open
          </a>
        </div>
      </div>
    )
  }

  // Default medium
  return (
    <div className="bg-[rgba(30,30,30,0.5)] rounded-lg p-3 text-center text-gray-400">
      <p className="text-xs text-white/60 mb-2">SnipeAd</p>
      <p className="mb-2">Need a PC? Bid, bid, bid:</p>
      <div className="flex justify-center gap-2">
        <a
          href="https://www.ebay.co.uk/itm/167506178840?itmmeta=01JTXX3B02MB2MV1R1YVJVPDDY&hash=item2700257318:g:YbsAAOSwDntoH613"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white transition-colors"
        >
          Open
        </a>
      </div>
    </div>
  )
}
