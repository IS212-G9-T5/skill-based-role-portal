import React, { useEffect, useState } from "react"
import { Pagination } from "@mui/material"
import Lottie from "react-lottie"
import { Link, useLocation } from "react-router-dom"
import { getRoleListings } from "../../api/RoleListingAPI"
import animationData from "../../assets/animation_lngbtih0.json"
import Filter from "../../components/Filter"
import Navbar from "../../components/Navbar"
import Role from "../../components/Role"
import Search from "../../components/Search"

const AllRoleListing: React.FC = () => {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalListings, setTotalListings] = useState(0)
  const listingsPerPage = 10
  const [totalPages, setTotalPages] = useState(1)
  const [searchRoleName, setSearchRoleName] = useState("")
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>({})
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const initialPage = parseInt(query.get("page") || "1", 10)

  useEffect(() => {
    setCurrentPage(initialPage)
    fetchData(initialPage, searchRoleName)
    window.scrollTo({ top: 0, behavior: "smooth" })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPage, searchRoleName])

  const handleClearFilters = () => {
    setActiveFilter({})
    setSelectedSkills([])
  }

  const fetchData = async (page, roleName = "") => {
    const res = await getRoleListings(
      page,
      listingsPerPage,
      roleName,
      selectedSkills
    )

    if (res) {
      setData(res.items)
      setTotalListings(res.total)
      setTotalPages(Math.ceil(res.total / listingsPerPage))
    }
  }

  useEffect(() => {
    fetchData(currentPage, searchRoleName)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchRoleName, selectedSkills])

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

      <div className="flex flex-col lg:flex-row">
        {/* Filter Panel */}
        <div className="p-4 lg:sticky lg:top-0 lg:w-1/4">
          <div className="flex items-center justify-between">
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
            selectedSkills={selectedSkills}
            setSelectedSkills={setSelectedSkills}
          />
        </div>

        {/* Main Content */}
        <div className="p-4 lg:w-3/4">
          <div className="pl-[5%] pr-[5%] pt-[2%]">
            <Search setSearchRoleName={setSearchRoleName} />
          </div>
          <div>
            <h1 className="pl-[5%] pt-[2%] text-3xl font-bold">
              Find Your New Job ({totalListings})
            </h1>
          </div>
          <div className="transform rounded-lg bg-white p-4 shadow-md transition-transform">
            {data.length === 0 ? (
              <div>
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: animationData,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
                  height={100}
                  width={100}
                />
                <div className="text-center">
                  <p className="pt-5">No results found.</p>
                  <p>
                    Please try other search terms or remove selected filters.
                  </p>
                </div>
              </div>
            ) : (
              data.map((item) => (
                <Link
                  key={item.listing.id}
                  to={`/role-listing/${item.listing.id}`}
                >
                  <Role
                    key={item.listing.id}
                    id={item.listing.id}
                    name={item.listing.role.name}
                    description={item.listing.role.description}
                    start_date={item.listing.start_date}
                    end_date={item.listing.end_date}
                    status={item.listing.status}
                    skills={item.listing.role.skills}
                    currentPage={currentPage}
                  />
                </Link>
              ))
            )}
            {data.length > 0 && (
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
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AllRoleListing
