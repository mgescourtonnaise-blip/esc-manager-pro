let db = {};
let admin = false;

fetch("data.json")
  .then(r => r.json())
  .then(data => {
    db = data;
    showTab("effectif");
  });

function showTab(tab){
  const content = document.getElementById("content");

  if(tab==="effectif"){
    content.innerHTML = db.players.map(p=>`
      <div class="card">
        <b>${p.prenom} ${p.nom}</b><br>
        #${p.numero} - ${p.poste}<br>
        Note: ${p.note}
      </div>
    `).join("");
  }

  if(tab==="matchs"){
    content.innerHTML = db.matches.map(m=>`
      <div class="card">
        ${m.date} - ${m.equipe}<br>
        ${m.adversaire}<br>
        <b>${m.score}</b>
      </div>
    `).join("");
  }

  if(tab==="classements"){
    const scorers = {};
    db.matches.forEach(m=>{
      if(m.buteurs){
        m.buteurs.forEach(b=>{
          scorers[b]=(scorers[b]||0)+1;
        });
      }
    });

    const sorted = Object.entries(scorers)
      .sort((a,b)=>b[1]-a[1]);

    content.innerHTML = sorted.map(s=>`
      <div class="card">${s[0]} - ${s[1]} buts</div>
    `).join("");
  }

  if(tab==="mois"){
    content.innerHTML = "<div class='card'>Équipe du mois bientôt 😉</div>";
  }
}

// mode admin
document.getElementById("adminBtn").onclick=()=>{
  admin=!admin;
  alert(admin ? "Mode ADMIN activé" : "Mode ADMIN OFF");
};