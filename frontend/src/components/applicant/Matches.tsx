type MatchedSkillsProps = {
  title: string
  skills: SkillObject[]
}

const Matches = ({ title, skills }: MatchedSkillsProps) => {
  return (
    <div className="px-5 py-2">
      <div className="pt-4 font-semibold text-slate-700">{title}</div>
      <ul className="max-w-md list-inside list-disc space-y-1 py-4 text-gray-500 dark:text-gray-400">
        {skills.length > 0 ? (
          skills.map((skill, index) => <li key={index}>{skill.name}</li>)
        ) : (
          <li>No match</li>
        )}
      </ul>
    </div>
  )
}

export default Matches
