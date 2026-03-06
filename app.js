let ADMIN = false;

let DATA = JSON.parse(localStorage.getItem("esc_data")) || {
players: [],
matches: []
};

function save(){
localStorage.setItem("esc_data",JSON.stringify(DATA));
}

function loginAdmin(){

let pass = prompt("Mot de passe admin");

if(pass==="esc2024"){
ADMIN=true;
alert("Mode admin activé");
showTab("players");
}else{
alert("Mauvais mot de passe");
}

}

function showTab(tab){

const content=document.getElementById("content");

if(tab==="players"){

content.innerHTML = `
${ADMIN ? `<button onclick="addPlayer()">➕ Ajouter joueur</button>`:""}

${DATA.players.map((p,i)=>`

<div class="card">

${p.photo ? `<img src="${p.photo}" width="80">`:""}

<b>${p.prenom} ${p.nom}</b><br>
#${p.numero} • ${p.poste}<br>
⭐ ${p.note}

${ADMIN ? `
<br><br>
<button onclick="editPlayer(${i})">Modifier</button>
<button onclick="deletePlayer(${i})">Supprimer</button>
`:""}

</div>

`).join("")}
`;

}

if(tab==="matches"){

content.innerHTML=`
${ADMIN ? `<button onclick="addMatch()">➕ Ajouter match</button>`:""}

${DATA.matches.map((m,i)=>`

<div class="card">

<b>${m.date}</b><br>
vs ${m.adversaire}<br>
Score ${m.score}<br>
⚽ ${m.buteurs}

${ADMIN ? `
<br><br>
<button onclick="editMatch(${i})">Modifier</button>
<button onclick="deleteMatch(${i})">Supprimer</button>
`:""}

</div>

`).join("")}
`;

}

if(tab==="scorers"){

let scorers={};

DATA.matches.forEach(m=>{

m.buteurs.split(",").forEach(b=>{

b=b.trim();
if(!b) return;

scorers[b]=(scorers[b]||0)+1;

});

});

let sorted=Object.entries(scorers).sort((a,b)=>b[1]-a[1]);

content.innerHTML=sorted.map(s=>`
<div class="card">⚽ ${s[0]} — ${s[1]} buts</div>
`).join("");

}

}

function addPlayer(){

let prenom=prompt("Prénom");
let nom=prompt("Nom");
let numero=prompt("Numéro");
let poste=prompt("Poste");
let note=prompt("Note");

DATA.players.push({prenom,nom,numero,poste,note});

save();
showTab("players");

}

function editPlayer(i){

let p=DATA.players[i];

p.prenom=prompt("Prénom",p.prenom);
p.nom=prompt("Nom",p.nom);
p.numero=prompt("Numéro",p.numero);
p.poste=prompt("Poste",p.poste);
p.note=prompt("Note",p.note);

save();
showTab("players");

}

function deletePlayer(i){

if(confirm("Supprimer joueur ?")){
DATA.players.splice(i,1);
save();
showTab("players");
}

}

function addMatch(){

let date=prompt("Date");
let adversaire=prompt("Adversaire");
let score=prompt("Score");
let buteurs=prompt("Buteurs");

DATA.matches.push({date,adversaire,score,buteurs});

save();
showTab("matches");

}

function editMatch(i){

let m=DATA.matches[i];

m.date=prompt("Date",m.date);
m.adversaire=prompt("Adversaire",m.adversaire);
m.score=prompt("Score",m.score);
m.buteurs=prompt("Buteurs",m.buteurs);

save();
showTab("matches");

}

function deleteMatch(i){

if(confirm("Supprimer match ?")){
DATA.matches.splice(i,1);
save();
showTab("matches");
}

}

showTab("players");
