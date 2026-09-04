import { exampleImages } from "@/utils/demo-images"

export interface PlayerData {
  name: string
  number: number
}

export interface TeamData {
  id: string
  slug: string
  name: string
  category: string
  desc: string
  image: string
  location: string
  schedule: Record<string, string>
  coaches: string[]
  captains: string[]
  roster: PlayerData[]
  palmares: string[]
}

export const getAssetSlug = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

export const getPlayerPhoto = (playerName: string) => `/images/players/open/${getAssetSlug(playerName)}.jpg`

export const getTeamPhoto = (teamName: string) => `/images/teams/${getAssetSlug(teamName)}.jpg`

export const teams: Record<string, TeamData> = {
  "prima-maschile": {
    id: "prima-maschile",
    slug: "open",
    name: "Open",
    category: "Divisione maschile",
    desc: "La prima squadra maschile rappresenta il livello competitivo senior del club: intensità, disciplina e responsabilità condivisa in campo.",
    image: exampleImages[5].url,
    location: "Centro Sportivo Anzola, Via Lunga, 29, 40011 Anzola dell'Emilia BO",
    schedule: { "Lunedì": "20.30-22.30", "Martedì": "20.30-22.30", "Giovedì": "20.30-22.30" },
    coaches: ["Staff tecnico in aggiornamento"],
    captains: ["Galeone Christian", "Di Grazia Pablo", "Baraldi Federico"],
    roster: [
      { name: "Baraldi Emiliano", number: 22 },
      { name: "Baraldi Federico", number: 14 },
      { name: "Boni Beniamino", number: 95 },
      { name: "Brini Mattia", number: 7 },
      { name: "Bruni Manuel", number: 99 },
      { name: "Casali Niccolò", number: 12 },
      { name: "Ciciriello Lorenzo", number: 92 },
      { name: "Davoli Iacopo", number: 13 },
      { name: "Dellavedova Marco", number: 8 },
      { name: "Di Grazia Pablo", number: 16 },
      { name: "Fogli Federico", number: 69 },
      { name: "Galeone Christian", number: 27 },
      { name: "Marchesini Alessio", number: 15 },
      { name: "Montanari Andrea", number: 37 },
      { name: "Panariello Stefano", number: 23 },
      { name: "Sangiorgi Andrea", number: 11 },
      { name: "Sarais Andrea", number: 30 },
      { name: "Zocca Pietro", number: 20 },
    ],
    palmares: [
      "2° posto Campionati Italiani CIU Serie A 2024",
      "1° posto SOTG CIBU Serie A 2025",
      "1° posto CIBU Serie A 2025",
    ],
  },
  "prima-femminile": {
    id: "prima-femminile",
    slug: "women",
    name: "Women",
    category: "Divisione femminile",
    desc: "La prima squadra femminile porta in campo identità, qualità tecnica e continuità competitiva per il movimento One Tribe.",
    image: exampleImages[6].url,
    location: "Centro Sportivo Barca, Via Raffaello Sanzio, Bologna",
    schedule: { "In aggiornamento": "Orari da confermare" },
    coaches: ["Staff tecnico in aggiornamento"],
    captains: [],
    roster: [],
    palmares: ["Roster in aggiornamento"],
  },
  "prima-mista": {
    id: "prima-mista",
    slug: "mixed",
    name: "Mixed",
    category: "Divisione mista",
    desc: "La divisione mista esprime una parte centrale dell'Ultimate: collaborazione, equilibrio e letture condivise tra atleti e atlete.",
    image: exampleImages[7].url,
    location: "Centro Sportivo Barca, Via Raffaello Sanzio, Bologna",
    schedule: { "In aggiornamento": "Orari da confermare" },
    coaches: ["Staff tecnico in aggiornamento"],
    captains: [],
    roster: [],
    palmares: ["Roster in aggiornamento"],
  },
  master: {
    id: "master",
    slug: "master",
    name: "Master",
    category: "Divisione senior",
    desc: "Esperienza, lettura del gioco e cultura sportiva: la divisione Master raccoglie il lato più maturo della community One Tribe.",
    image: exampleImages[4].url,
    location: "Centro Sportivo Barca, Via Raffaello Sanzio, Bologna",
    schedule: { "In aggiornamento": "Orari da confermare" },
    coaches: ["Staff tecnico in aggiornamento"],
    captains: [],
    roster: [],
    palmares: ["Divisione Master One Tribe"],
  },
  u20: {
    id: "u20",
    slug: "u20",
    name: "U20",
    category: "Settore giovanile",
    desc: "Il ponte verso le prime squadre: intensità, autonomia tattica e continuità competitiva per chi cresce nel club.",
    image: exampleImages[2].url,
    location: "Centro Sportivo Barca, Via Raffaello Sanzio, Bologna",
    schedule: { "In aggiornamento": "Orari da confermare" },
    coaches: ["Staff tecnico in aggiornamento"],
    captains: [],
    roster: [],
    palmares: ["Percorso giovanile One Tribe"],
  },
  u17: {
    id: "u17",
    slug: "u17",
    name: "U17",
    category: "Settore giovanile",
    desc: "La fascia in cui il gioco diventa più strutturato: letture di campo, atletismo e responsabilità personale dentro la squadra.",
    image: exampleImages[1].url,
    location: "Centro Sportivo Barca, Via Raffaello Sanzio, Bologna",
    schedule: { "In aggiornamento": "Orari da confermare" },
    coaches: ["Staff tecnico in aggiornamento"],
    captains: [],
    roster: [],
    palmares: ["Percorso giovanile One Tribe"],
  },
  u15: {
    id: "u15",
    slug: "u15",
    name: "U15",
    category: "Settore giovanile",
    desc: "Il primo ingresso nel percorso One Tribe: tecnica di base, gioco, coordinazione e Spirit of the Game costruiti con gradualità.",
    image: exampleImages[0].url,
    location: "Centro Sportivo Barca, Via Raffaello Sanzio, Bologna",
    schedule: { "In aggiornamento": "Orari da confermare" },
    coaches: ["Staff tecnico in aggiornamento"],
    captains: [],
    roster: [],
    palmares: ["Percorso giovanile One Tribe"],
  },
}

export const teamOrder = ["prima-maschile", "prima-femminile", "prima-mista", "master", "u20", "u17", "u15"]

export const orderedTeams = teamOrder.map((id) => teams[id])

export const getTeamBySlug = (slug: string) => orderedTeams.find((team) => team.slug === slug)
