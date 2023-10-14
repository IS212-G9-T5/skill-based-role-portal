import React, { useEffect, useState } from "react"
import { Pagination } from "@mui/material"
import { Link, useLocation } from "react-router-dom"

import { getRoleListings } from "../../api/RoleListingAPI"
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

  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const initialPage = parseInt(query.get("page") || "1", 10)

  useEffect(() => {
    setCurrentPage(initialPage)
    fetchData(initialPage, searchRoleName)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [initialPage, searchRoleName])

  const fetchData = async (page, roleName = "") => {
    // Make a request for the current page with roleName filter
    const res = await getRoleListings(page, listingsPerPage, roleName)

    if (res) {
      setData(res.items)
      setTotalListings(res.total)

      // Calculate the total pages based on the filtered results
      setTotalPages(Math.ceil(res.total / listingsPerPage))
    }
  }

  useEffect(() => {
    fetchData(currentPage, searchRoleName)
  }, [currentPage, searchRoleName])

  useEffect(() => {
    // Append the searchRoleName to the URL
    const searchParams = new URLSearchParams()
    searchParams.set("page", currentPage.toString())
    searchParams.set("size", listingsPerPage.toString())

    if (searchRoleName) {
      searchParams.set("role", searchRoleName.toLowerCase()) // Convert to lowercase
    } else {
      searchParams.delete("role") // Remove the role parameter if no search term
    }

    window.history.pushState({}, "", `?${searchParams.toString()}`)
  }, [searchRoleName, currentPage])

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
        {data.map((item) => (
          <Link key={item.listing.id} to={`/role-listing/${item.listing.id}`}>
            <Role
              key={item.listing.id}
              id={item.listing.id}
              name={item.listing.role.name}
              description={item.listing.role.description}
              start_date={item.start_date}
              end_date={item.end_date}
              status={item.status}
              skills={item.listing.role.skills}
              currentPage={currentPage}
            />
          </Link>
        ))}
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
