import React, { useEffect, useState } from "react"
import { Pagination } from "@mui/material"
import { Link, useLocation } from "react-router-dom"

import { getRoleListings } from "../../api/RoleListingAPI"
import Navbar from "../../components/Navbar"
import Role from "../../components/Role"

const AllRoleListing: React.FC = () => {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalListings, setTotalListings] = useState(0)
  const listingsPerPage = 10
  const [totalPages, setTotalPages] = useState(1)

  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const initialPage = parseInt(query.get("page") || "1", 10)

  useEffect(() => {
    setCurrentPage(initialPage)
    fetchData(initialPage)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [initialPage])

  const fetchData = async (page) => {
    const res = await getRoleListings(page, listingsPerPage)
    if (res) {
      setData(res.items)
      setTotalListings(res.total)
      setTotalPages(res.pages)
    }
    // const endpointUrl = `http://localhost:5000/api/listings?page=${page}&size=${listingsPerPage}`

    // axios
    //   .get(endpointUrl)
    //   .then((response) => {
    //     setData(response.data.items)
    //     setTotalListings(response.data.total)
    //     setTotalPages(response.data.pages)
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error)
    //   })
  }

  useEffect(() => {
    fetchData(currentPage)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentPage])

  const navbarProps = {
    title: "SKILLS BASED ROLE PORTAL",
    items: ["View Listings", "View Profile", "Logout"],
  }

  return (
    <>
      <div>
        <Navbar {...navbarProps} />
      </div>
      <div>
        <h1 className="pl-[5%] pt-[2%] text-3xl font-bold">
          Find Your New Job ({totalListings})
        </h1>
      </div>
      <div className="transform rounded-lg bg-white p-4 shadow-md transition-transform">
        {data.map((item) => (
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
