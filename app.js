let admin = false;
let DATA = {};

fetch("data.json")
  .then(response => response.json())
  .then(data => {
    DATA = data;
    showTab("effectif");
  });

function showTab(tab){
  const content = document.getElementById("content");

  if(tab==="effectif"){
    content.innerHTML = DATA.players.map(p=>`
      <div class="card">
        <b>${p.prenom} ${p.nom}</b><br>
        #${p.numero} • ${p.poste}<br>
        ⭐ ${p.note}/100
      </div>
    `).join("");
  }

  if(tab==="matchs"){
    content.innerHTML = DATA.matches.map(m=>`
      <div class="card">
        <b>${m.date}</b> • ${m.equipe}<br>
        vs ${m.adversaire}<br>
        Score: ${m.score}<br>
        ⚽ ${m.buteurs.join(", ")}
      </div>
    `).join("");
  }

  if(tab==="classements"){
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
