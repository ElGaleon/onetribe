import { notFound } from "next/navigation"

import { getTeamBySlug, orderedTeams } from "../teams-data"
import { TeamDetailClient } from "./team-detail-client"

export function generateStaticParams() {
  return orderedTeams.map((team) => ({ team: team.slug }))
}

export default async function TeamPage({ params }: { params: Promise<{ team: string }> }) {
  const { team: slug } = await params
  const team = getTeamBySlug(slug)

  if (!team) {
    notFound()
  }

  return <TeamDetailClient team={team} />
}
