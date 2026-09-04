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
    id: "open-day",
    title: "Open Day Settembre 2026: vieni a provare l'Ultimate Frisbee!",
    date: "31 Agosto 2026",
    author: "Segreteria Didattica",
    category: "Corsi & Eventi",
    excerpt: "Ripartono le attività di One Tribe. Tre giornate gratuite rivolte a ragazzi e ragazze dagli 8 ai 20 anni per conoscere il nostro sport e i nostri allenatori.",
    content: `Hai voglia di provare uno sport nuovo, dinamico e basato sul fair play? One Tribe apre le porte a tutti con i suoi Open Day di Settembre.

Gli allenatori delle nostre nazionali e atleti di Serie A saranno in campo per insegnare le basi del lancio, del gioco e le regole dello Spirit of the Game. Le sessioni sono totalmente gratuite e aperte a principianti. Non serve prenotare, basta presentarsi in abbigliamento sportivo. Ti aspettiamo!

Allenamenti liberi

U15: Lunedì - Campo Borgonuovo, Via Cartiera 74/88, 40037 Borgonuovo BO - 15.30-17.30; Giovedì - Stadio Nobile, Via dello Sport, 40033 Casalecchio di Reno BO - 15.15-17.15
U17: Giovedì - Campo Borgonuovo, Via Cartiera 74/88, 40037 Borgonuovo BO - 17.30-19.30; Venerdì - Campo Borgonuovo, Via Cartiera 74/88, 40037 Borgonuovo BO - 17.30-19.30
U20: Martedì - Campo Borgonuovo, Via Cartiera 74/88, 40037 Borgonuovo BO - 17.30-19.30; Mercoledì - Campo sportivo Anzola, Via Lunga 29, 40011 Anzola dell'Emilia BO - 20.30-22.30; Venerdì - Campo sportivo Anzola, Via Lunga 29, 40011 Anzola dell'Emilia BO - 20.30-22.30
Master: Martedì - Campo Borgonuovo, Via Cartiera 74/88, 40037 Borgonuovo BO - 20.00-22.00

Per contattare

Marco Dellavedova - Direttore tecnico
responsabiletecnico@bugasd.it
+39 333 327 2028`,
    image: exampleImages[1].url,
    tags: ["Open Day", "Corsi", "Giovani", "Bologna"]
  },
  {
    id: "welcome-to-the-jungle-anzola",
    title: "WELCOME TO THE JUNGLE: ENERGIA E TANTO ULTIMATE AD ANZOLA",
    date: "03 Maggio 2026",
    author: "Ufficio Stampa BUG ASD",
    category: "Scuole & Eventi",
    excerpt: "Il centro sportivo di Anzola si è riempito di frisbee, tuffi sull'erba ed entusiasmo per il torneo conclusivo dei progetti scolastici One Tribe.",
    content: `Sabato 3 maggio il centro sportivo di Anzola si è riempito di frisbee, tuffi sull'erba ed entusiasmo.

Welcome to the Jungle - School Edition

Welcome to the Jungle - School Edition è il torneo che ha chiuso i progetti scolastici One Tribe nelle scuole secondarie del territorio.

Una festa dello sport

Circa 75 ragazze e ragazzi delle medie hanno partecipato all'evento, trasformando il torneo in una vera festa dello sport. Per molti di loro è stata la prima esperienza in una competizione di Ultimate, dopo mesi di allenamenti ai corsi scolastici.

In campo

Fin dalle prime partite non sono mancati velocità di gioco, intensità e divertimento. In campo le squadre hanno dimostrato grande collaborazione tra compagni e tanta voglia di mettersi in gioco, sempre nel rispetto degli avversari e dello Spirito del Gioco.

Premi e riconoscimenti

A conquistare la vittoria finale è stata la squadra di Sasso Marconi, protagonista di un torneo giocato con determinazione e grandi capacità tecniche. Il premio per lo Spirito del Gioco è andato invece alla squadra di Borgonuovo, che si è distinta per atteggiamento positivo e rispetto durante tutta la giornata. Spazio anche ai riconoscimenti individuali: il premio di MVP maschile è stato assegnato a Lorenzo Pighini, mentre il titolo di MVP femminile è andato a Emma Moscato.

Il valore della giornata

Oltre ai risultati, il successo più grande della giornata è stato vedere così tanti giovani coinvolti e appassionati. Il Welcome to the Jungle si conferma così un appuntamento fondamentale per il movimento giovanile dell'Ultimate Frisbee, capace di unire sport, crescita e divertimento dentro e fuori dal campo.

Grazie alla tribù

Un grazie speciale va agli allenatori, agli organizzatori e a tutti i volontari che hanno contribuito alla riuscita dell'evento, rendendo possibile una giornata così intensa e partecipata.

Instagram: https://www.instagram.com/p/DYZa1Bcjfx7/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==`,
    image: exampleImages[3].url,
    tags: ["Scuole", "Torneo", "Anzola", "Ultimate"]
  },
  {
    id: "one-tribe-tetto-italia",
    title: "ONE TRIBE SUL TETTO DI ITALIA",
    date: "13 Giugno 2026",
    author: "Marco Dellavedova",
    category: "Giovanili",
    excerpt: "One Tribe fa la storia conquistando il titolo italiano in tutte le categorie giovanili: Under 15, Under 17 e Under 20.",
    content: `31 maggio '26: One Tribe fa la storia.

Per la prima volta in Italia, una società vince il titolo italiano in tutte le categorie giovanili: Under 15, Under 17 e Under 20. Il coronamento di un percorso straordinario partito a settembre e costruito con passione e impegno giorno dopo giorno.

Under 20 - il risultato è attesissimo

Dopo 4 anni di finali perse, One Tribe porta finalmente a casa il primo titolo italiano Under 20. A fare da padroni incontrastati nella divisione sono gli U20 Red, che con una rimonta incredibile in finale chiudono il campionato imbattuti. Esordio nella categoria di tutto rispetto per gli U20 White che vincono il bronzo e lo Spirito del Gioco.

Under 17 - il dominio assoluto

Terzo scudetto nella categoria Under 17 per One Tribe, dove sono gli U17 Red a dominare per tutta la durata del campionato, chiudendo quasi ogni partita a punteggio pieno e riconfermandosi per il secondo anno consecutivo sul gradino più alto del podio.

Under 15 - una finale da spettacolo

Campionato giocato a pieni voti per gli U15 Red, che hanno mantenuto il primato in classifica per tutta la stagione. Nonostante la giovane età, la squadra è stata capace della finale più spettacolare del week end, con un tifo da stadio accompagnato dai ragazzi più grandi e sostenuto da tutti gli spettatori.

Siamo orgogliosi di ogni giocatore e dei membri dello staff che hanno contribuito a rendere questa stagione così speciale. Oggi non festeggiamo soltanto la conferma che l'impegno in campo può portare a emozioni incredibili, ma celebriamo anche il percorso che la società sta portando avanti con i più giovani. Grazie ragazzi per aver fatto la storia!

Instagram: https://www.instagram.com/p/DZnZCNYDdEU/?igsh=MWhhMzdja2tvMnp0cw==`,
    image: "/images/news/one-tribe-tetto-italia.png",
    tags: ["Giovanili", "Scudetto", "U15", "U17", "U20"]
  },
]

export const mergeStoredArticles = (storedArticles: Article[]) => {
  const defaultIds = new Set(defaultArticles.map((article) => article.id))
  const customArticles = storedArticles.filter((article) => !defaultIds.has(article.id))

  return [...defaultArticles, ...customArticles]
}
