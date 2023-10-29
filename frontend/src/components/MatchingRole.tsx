import { Chip, Grid, Typography } from "@mui/material"

const MatchingRole = (props) => {
  return (
    <div>
      <div className="rounded-lg bg-white p-4 shadow-md transition-transform hover:scale-105 hover:transform">
        <div className="pl-[5%] pt-[2%]">
          <strong>
            <Typography variant="h4">{props.name}</Typography>
          </strong>
          <Typography variant="subtitle1" className="mb-[2%] text-[#B0B0B4]">
            Role ID: {props.id} | Status: {props.status} | Closing Date:{" "}
            {props.end_date}
          </Typography>

          <Typography variant="h6" gutterBottom style={{ marginTop: "3%" }}>
            <b>
              <span className="mr-2 bg-[#1976D2] pl-2"></span>
              Role Description
            </b>
          </Typography>

          <Typography variant="body1" style={{ marginBottom: "3%" }} paragraph>
            {props.description}
          </Typography>

          <Grid item xs={12} style={{ marginBottom: "3%" }}>
            <Typography variant="h6">
              <strong>
                <span className="mr-2 bg-[#1976D2] pl-2"></span>
                Skills Required [Matched Skills: {props.skills_match_count}/
                {props.skills_matched.length + props.skills_unmatched.length} (
                {(props.skills_match_pct * 100).toFixed(2)}%)]
              </strong>
              <br />
              {props.skills.map((skill, index) => {
                const isMatched = props.skills_matched.some(
                  (matchedSkill) => matchedSkill.name === skill
                )
                const chipStyle = {
                  marginRight: "1%",
                  marginTop: "1%",
                  fontWeight: isMatched ? "bold" : "normal",
                  backgroundColor: isMatched ? "#33eb91" : "gray",
                  cursor: "default",
                }
                return (
                  <Chip
                    key={index}
                    label={skill}
                    className="mr-[1%] mt-[1%]"
                    style={chipStyle}
                    disabled={!isMatched}
                  />
                )
              })}
            </Typography>
          </Grid>

          {props.matchingSkillPercentage}
        </div>
      </div>
    </div>
  )
}

export default MatchingRole
