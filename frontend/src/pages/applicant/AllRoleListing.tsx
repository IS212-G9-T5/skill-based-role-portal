import React, { useEffect, useState } from "react"
import { Player } from "@lottiefiles/react-lottie-player"
import { Pagination } from "@mui/material"
import { Link, useLocation } from "react-router-dom"

import { getRoleListings } from "../../api/RoleListingAPI"
import animationData from "../../assets/animation_lngbtih0.json"
import Filter from "../../components/Filter"
import Navbar from "../../components/Navbar"
import Role from "../../components/Role"
import Search from "../../components/Search"

type ActiveFilter = {
  [category: string]: boolean
}

const AllRoleListing: React.FC = () => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalListings, setTotalListings] = useState(0)
  const listingsPerPage = 10
  const [totalPages, setTotalPages] = useState(1)
  const [searchRoleName, setSearchRoleName] = useState("")
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>({})

  const handleClearFilters = () => {
    setActiveFilter({})
  }

  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const initialPage = parseInt(query.get("page") || "1", 10)

  const fetchData = async (page) => {
    const res = await getRoleListings(page, listingsPerPage)
    if (res) {
      setData(res.items)
      setTotalListings(res.total)
      setTotalPages(res.pages)
    }
  }

  useEffect(() => {
    setCurrentPage(initialPage)
    fetchData(initialPage)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [initialPage])

  useEffect(() => {
    const matchesSkills = (item) => {
      if (Object.keys(activeFilter).length === 0) {
        // If no filters are active, return true for all items
        return true
      }
      // Check if at least one skill in the item matches the active filters
      return item.listing.role.skills.some(
        (skill) => activeFilter[skill] === true
      )
    }

    const searchLowerCase = searchRoleName.toLowerCase()

    // Filter data based on skills first
    const filteredBySkills = data.filter(matchesSkills)

    // Filter data based on searchRoleName
    const filteredData = filteredBySkills.filter((item) =>
      item.listing.role.name.toLowerCase().includes(searchLowerCase)
    )

    // Check if both search bar and checkbox filters are empty
    if (
      searchLowerCase === "" &&
      Object.values(activeFilter).every((value) => !value)
    ) {
      setFilteredData(data) // Reset to the default data
    } else {
      setFilteredData(filteredData)
    }

    setTotalListings(filteredData.length)
    setTotalPages(Math.ceil(filteredData.length / listingsPerPage))
  }, [searchRoleName, data, activeFilter])

  // reset activeFilter when all checkboxes are unchecked
  useEffect(() => {
    const areAllFiltersUnchecked = Object.values(activeFilter).every(
      (value) => !value
    )
    if (areAllFiltersUnchecked) {
      setActiveFilter({})
    }
  }, [activeFilter])

  const navbarProps = {
    title: "SKILLS BASED ROLE PORTAL",
    items: [
      { label: "View Listings", to: "/all-role-listing" },
      { label: "View Profile", to: "/profile" },
      { label: "Logout", to: "/" },
    ],
  }

  return (
    <>
      <div>
        <Navbar {...navbarProps} />
      </div>
      <div className="flex">
        {/* Left Panel */}
        <div className="sticky top-0 flex h-screen w-1/4 flex-col overflow-y-auto p-4">
          <div className="flex items-center justify-between pt-[8%]">
            <h2 className="font-bold">Filter by skills:</h2>
            <button
              className={`rounded p-2 text-sm ${
                Object.values(activeFilter).some((value) => value === true)
                  ? "text-blue-500"
                  : "text-gray-400"
              }`}
              onClick={handleClearFilters}
            >
              Clear
            </button>
          </div>
          <Filter
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        </div>

        {/* Right Panel */}
        <div className="w-3/4 overflow-y-auto p-4">
          <div className="pl-[5%] pr-[5%] pt-[2%]">
            <Search setSearchRoleName={setSearchRoleName} />
          </div>
          <h1 className="pl-[5%] pt-[2%] text-3xl font-bold">
            Find Your New Job ({totalListings})
          </h1>
          <div className="transform rounded-lg bg-white p-4 shadow-md transition-transform">
            {filteredData.length === 0 ? (
              <div>
                <Player
                  loop
                  autoplay
                  src={animationData}
                  style={{ width: "15%", height: "15%" }}
                />
                <div className="text-center">
                  <p className="pt-5">No results found.</p>
                  <p>
                    Please try other search terms or remove selected filters.
                  </p>
                </div>
              </div>
            ) : (
              filteredData.map((item) => (
                <Link key={item.id} to={`/role-listing/${item.id}`}>
                  <Role
                    id={item.id}
                    name={item.listing.role.name}
                    description={item.listing.role.description}
                    start_date={item.start_date}
                    end_date={item.end_date}
                    status={item.status}
                    skills={item.listing.role.skills}
                    currentPage={currentPage}
                  />
                </Link>
              ))
            )}
            <Pagination
              className="flex justify-center pt-[2%]"
              count={totalPages}
              page={currentPage}
              onChange={(_, newPage) => {
                if (typeof newPage === "number") {
                  setCurrentPage(newPage)
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default AllRoleListing
