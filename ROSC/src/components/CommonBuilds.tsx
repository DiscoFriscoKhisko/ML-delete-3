import React from 'react'

export const CommonBuilds: React.FC = () => {
  const builds = [
    'Internal Copilots',
    'RAG Knowledge Bases',
    'AI-Native MVPs',
    'CRM Automation & RevOps Dashboards',
    'Workflow Integrations',
    'Web & Mobile Apps'
  ]

  return (
    <section className="py-8 px-4 md:px-8 lg:px-12 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="text-[12px] text-grey-500">Common Builds</p>
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            {builds.map((build, index) => (
              <React.Fragment key={build}>
                <span className="text-[11px] font-medium text-grey-700">{build}</span>
                {index < builds.length - 1 && (
                  <span className="text-[11px] text-grey-300">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
