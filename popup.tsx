import { useState } from "react"

import "./style.css"

function IndexPopup() {
  const [data, setData] = useState("")
  const [location, setLocation] = useState({ city: "", country: "" })
  const [isLoading, setIsLoading] = useState(false)

  const fetchLocationDetails = async () => {
    try {
      setIsLoading(true) // Set loading state

      const ipResponse = await fetch("https://api.ipify.org?format=json")
      const ipData = await ipResponse.json()
      const ip = ipData.ip

      const locationResponse = await fetch(`https://ipapi.co/${ip}/json/`)
      const locationData = await locationResponse.json()
      setLocation({
        city: locationData.city,
        country: locationData.country_name
      })
    } catch (error) {
      console.error("Error fetching location details:", error)
    } finally {
      setIsLoading(false) // Reset loading state
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="w-500 h-500 bg-blue-300 flex flex-col items-center justify-center relative"
        style={{ height: "500px ", width: "500px" }}>
        <button
          className={`bg-white p-6 rounded-lg text-xl ${
            isLoading ? " cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={fetchLocationDetails}
          disabled={isLoading}>
          {isLoading ? "Loading..." : "Show my location"}
        </button>
        {location.city && location.country && (
          <div className="mt-4 text-white text-xl">
            Your country is {location.country}, <br /> and city is{" "}
            {location.city}
          </div>
        )}
      </div>
    </div>
  )
}

export default IndexPopup
