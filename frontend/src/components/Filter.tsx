import React, { useState } from "react"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import Divider from "@mui/material/Divider"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import { useSelector } from "react-redux"

type ActiveFilter = {
  [category: string]: boolean
}

interface SkillCollection {
  listing: {
    role: {
      skills: string[]
    }
  }
}

const Filter = ({
  activeFilter,
  setActiveFilter,
}: {
  activeFilter: ActiveFilter
  setActiveFilter: React.Dispatch<React.SetStateAction<ActiveFilter>>
}) => {
  const data = useSelector(
    (state: { skill: { collections: SkillCollection[] } }) =>
      state.skill.collections
  )

  const handleChange =
    (text: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedFilter = {
        ...activeFilter,
        [text]: event.target.checked,
      }
      setActiveFilter(updatedFilter)
    }

  const uniqueCategories = [
    ...new Set(data.flatMap((c) => c.listing.role.skills)),
  ].sort()

  const maxSkillsToShow = 10
  const [showAllSkills, setShowAllSkills] = useState(false)

  return (
    <div>
      <Divider />
      <List>
        {showAllSkills
          ? uniqueCategories.map((text, index) => (
              <ListItem key={`${text}-${index}`} dense button>
                <Checkbox
                  checked={activeFilter[text] || false}
                  onChange={handleChange(text)}
                />
                <ListItemText primary={text} />
              </ListItem>
            ))
          : uniqueCategories.slice(0, maxSkillsToShow).map((text, index) => (
              <ListItem key={`${text}-${index}`} dense button>
                <Checkbox
                  checked={activeFilter[text] || false}
                  onChange={handleChange(text)}
                />
                <ListItemText primary={text} />
              </ListItem>
            ))}
      </List>
      {uniqueCategories.length > maxSkillsToShow && (
        <Button
          onClick={() => setShowAllSkills(!showAllSkills)}
          color="primary"
          className="py-1 pl-[8%] text-sm text-blue-500"
        >
          {showAllSkills ? "Show Less" : "Show More"}
        </Button>
      )}
    </div>
  )
}

export default Filter
