import { exampleImages } from "@/utils/demo-images"

export interface Article {
  id: string
  title: string
  date: string
  author: string
  category: string
  excerpt: string
  content: string
  image: string
  tags?: string[]
}

export const defaultArticles: Article[] = [
  {
    id: "news-1",
    title: "One Tribe Mixed sul tetto d'Italia: trionfo ai Campionati Nazionali!",
    date: "12 Giugno 2026",
    author: "Ufficio Stampa BUG ASD",
    category: "Mixed Division",
    excerpt: "Con una prestazione straordinaria al Centro Sportivo Barca, la nostra formazione Mixed si aggiudica lo scudetto nazionale battendo in finale i rivali storici.",
    content: "Una giornata storica per One Tribe Bologna. Davanti a oltre 300 spettatori accorsi al Centro Sportivo Barca, la formazione Mixed ha conquistato il titolo italiano di Serie A 2026. La finale è stata una battaglia tattica ed atletica decisa solo all'ultimo punto. Il punteggio finale di 15-14 rispecchia l'incredibile equilibrio visto in campo. Oltre al titolo di campioni d'Italia, i nostri ragazzi e ragazze si portano a casa una grande soddisfazione e confermano Bologna come la capitale indiscussa dell'Ultimate Frisbee in Italia.",
    image: exampleImages[0].url,
    tags: ["Scudetto", "Mixed Division", "Campionato", "Bologna"]
  },
  {
    id: "news-2",
    title: "Open Day Settembre 2026: vieni a provare l'Ultimate Frisbee!",
    date: "08 Giugno 2026",
    author: "Segreteria Didattica",
    category: "Corsi & Eventi",
    excerpt: "Ripartono le attività di One Tribe. Tre giornate gratuite rivolte a ragazzi e ragazze dagli 8 ai 20 anni per conoscere il nostro sport e i nostri allenatori.",
    content: "Hai voglia di provare uno sport nuovo, dinamico e basato sul fair play? One Tribe apre le porte a tutti con i suoi Open Day di Settembre. Gli allenatori delle nostre nazionali e atleti di Serie A saranno in campo al Centro Sportivo Barca per insegnare le basi del lancio, del gioco e le regole dello Spirit of the Game. Le sessioni sono totalmente gratuite e aperte a principianti. Non serve prenotare, basta presentarsi in abbigliamento sportivo. Ti aspettiamo!",
    image: exampleImages[1].url,
    tags: ["Open Day", "Corsi", "Giovani", "Bologna"]
  },
  {
    id: "news-3",
    title: "Ultimate Frisbee nelle Scuole: ripartono i progetti didattici",
    date: "24 Maggio 2026",
    author: "Staff Scuole",
    category: "Progetto Scuole",
    excerpt: "Dopo il successo dello scorso anno scolastico, BUG ASD riavvia la collaborazione con i licei e gli istituti comprensivi di Bologna coinvolgendo oltre 15 scuole.",
    content: "Il Flying Disc si conferma uno degli strumenti didattici più apprezzati dagli insegnanti di Scienze Motorie. Con il riavvio dell'anno scolastico, ricominciano anche i progetti di avviamento all'Ultimate Frisbee condotti dai tecnici qualificati di BUG ASD. Il nostro obiettivo è educare al Fair Play, all'assenza dell'arbitro e all'integrazione di genere attraverso il gioco, culminando con il grande torneo interscolastico previsto per la primavera del 2026.",
    image: exampleImages[2].url,
    tags: ["Scuole", "Didattica", "Bologna", "Valori"]
  }
]
