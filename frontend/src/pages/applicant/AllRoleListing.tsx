import React, { useEffect, useState } from "react"
import { Player } from "@lottiefiles/react-lottie-player"
import { Pagination } from "@mui/material"
// import { Link, useLocation } from "react-router-dom"
import { Link } from "react-router-dom"

import { getRoleListings } from "../../api/RoleListingAPI"
import animationData from "../../assets/animation_lngbtih0.json"
import Navbar from "../../components/Navbar"
import Role from "../../components/Role"
import Search from "../../components/Search"

const AllRoleListing: React.FC = () => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalListings, setTotalListings] = useState(0)
  const listingsPerPage = 10
  const [totalPages, setTotalPages] = useState(1)

  // const location = useLocation()
  // const query = new URLSearchParams(location.search)
  // const initialPage = parseInt(query.get("page") || "1", 10)
  const [searchRoleName, setSearchRoleName] = useState("")

  const fetchData = async (page) => {
    const res = await getRoleListings(page, listingsPerPage)
    if (res) {
      setData(res.items)
      setTotalListings(res.total)
      setTotalPages(res.pages)
    }
  }

  useEffect(() => {
    fetchData(currentPage)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentPage])

  useEffect(() => {
    // convert searchRoleName to lowercase for case-insensitive comparison
    const searchLowerCase = searchRoleName.toLowerCase()

    // filter data based on searchRoleName
    const filteredData = data.filter((item) =>
      item.listing.role.name.toLowerCase().includes(searchLowerCase)
    )

    // set total listings and total pages based on the filtered data
    setFilteredData(filteredData)
    setTotalListings(filteredData.length)
    setTotalPages(Math.ceil(filteredData.length / listingsPerPage))
  }, [searchRoleName, data])

  const navbarProps = {
    title: "SKILLS BASED ROLE PORTAL",
    items: ["View Listings", "View Profile", "Logout"],
  }

  return (
    <>
      <div>
        <Navbar {...navbarProps} />
      </div>
      <div className="pl-[5%] pr-[5%] pt-[2%]">
        <Search setSearchRoleName={setSearchRoleName} />
      </div>
      <div>
        <h1 className="pl-[5%] pt-[2%] text-3xl font-bold">
          Find Your New Job ({totalListings})
        </h1>
      </div>
      <div className="transform rounded-lg bg-white p-4 shadow-md transition-transform">
        {filteredData.length == 0 ? (
          <div>
            <Player
              loop
              autoplay
              src={animationData}
              style={{ width: "15%", height: "15%" }}
            />
            <div className="text-center">
              <p className="pt-5">No results found.</p>
              <p>Please try other search terms or remove selected filters.</p>
            </div>
          </div>
        ) : (
          filteredData.map((item) => (
            <Link key={item.id} to={`/role-listing/${item.id}`}>
              <Role
                key={item.id}
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
    </>
  )
}

export default AllRoleListing
