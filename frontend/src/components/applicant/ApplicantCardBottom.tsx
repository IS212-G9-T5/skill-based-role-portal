const ApplicantCardBottom = (application: Application) => {
  return (
    <div className="min-h-[40px] w-full overflow-hidden text-ellipsis whitespace-nowrap rounded-b-lg p-2 px-[15px] text-sm">
      {application.skills_matched && application.skills_matched.length > 0 ? (
        <span className="inline-block w-full overflow-hidden text-ellipsis align-top">
          {application.skills_matched.map((skill) => (
            <div key={skill.name} className="mr-1 inline-block">
              <div className="rounded-[5px] bg-slate-100 text-slate-500">
                <div className="px-2 py-1.5 font-mono font-black">
                  {skill.name}
                </div>
              </div>
            </div>
          ))}
        </span>
      ) : (
        <span className="text-slate-500">No skills matched</span>
      )}
    </div>
  )
}

export default ApplicantCardBottom
