// Données intégrées (fiable GitHub Pages)
const DATA = {
  players: [
    {
      prenom: "Lucas",
      nom: "Martin",
      numero: 9,
      poste: "BU",
      note: 82
    }
  ],
  matches: [
    {
      date: "2024-09-01",
      equipe: "A",
      adversaire: "FC Test",
      score: "3-1",
      buteurs: ["Lucas Martin"]
    }
  ]
};

function showTab(tab){
  const content = document.getElementById("content");

  if(tab==="players"){
    content.innerHTML = DATA.players.map(p=>`
      <div class="card">
        <b>${p.prenom} ${p.nom}</b><br>
        #${p.numero} • ${p.poste}<br>
        ⭐ ${p.note}/100
      </div>
    `).join("");
  }

  if(tab==="matches"){
    content.innerHTML = DATA.matches.map(m=>`
      <div class="card">
        <b>${m.date}</b><br>
        vs ${m.adversaire}<br>
        Score: ${m.score}<br>
        ⚽ ${m.buteurs.join(", ")}
      </div>
    `).join("");
  }

  if(tab==="scorers"){
    const scorers = {};
    DATA.matches.forEach(m=>{
      m.buteurs.forEach(b=>{
        scorers[b]=(scorers[b]||0)+1;
      });
    });

    const sorted = Object.entries(scorers)
      .sort((a,b)=>b[1]-a[1]);

    content.innerHTML = sorted.map(s=>`
      <div class="card">⚽ ${s[0]} — ${s[1]} buts</div>
    `).join("");
  }
}

showTab("players");
