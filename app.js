let ADMIN=false;

let DATA=JSON.parse(localStorage.getItem("esc_data"))||{
players:[],
matches:[]
};

function save(){

localStorage.setItem("esc_data",JSON.stringify(DATA));

}

function loginAdmin(){

let pass=prompt("Mot de passe admin");

if(pass==="esc2024"){

ADMIN=true;
alert("Mode admin activé");

}else{

alert("Mot de passe incorrect");

}

}

function showTab(tab){

let content=document.getElementById("content");

if(tab==="players"){

content.innerHTML=`

${ADMIN?`<button onclick="addPlayer()">Ajouter joueur</button>`:""}

${DATA.players.map((p,i)=>`

<div class="card playerCard">

${p.photo?`<img src="${p.photo}">`:""}

<div>

<b>${p.prenom} ${p.nom}</b><br>

<span class="stats">

#${p.numero} • ${p.poste}<br>
Equipe ${p.team}<br>
Note ${p.note}

</span>

${ADMIN?`

<br>

<button onclick="editPlayer(${i})">Modifier</button>
<button onclick="deletePlayer(${i})">Supprimer</button>

`:""}

</div>

</div>

`).join("")}

`;

}

if(tab==="matches"){

content.innerHTML=`

${ADMIN?`<button onclick="addMatch()">Ajouter match</button>`:""}

${DATA.matches.map((m,i)=>`

<div class="card">

<b>${m.date}</b><br>

vs ${m.adversaire}<br>

Score ${m.score}<br>

⚽ ${m.buteurs}

${ADMIN?`

<br>

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

if(!b)return;

scorers[b]=(scorers[b]||0)+1;

});

});

let sorted=Object.entries(scorers).sort((a,b)=>b[1]-a[1]);

content.innerHTML="<h2>Classement Buteurs</h2>";

sorted.forEach(s=>{

content.innerHTML+=`

<div class="card">

⚽ ${s[0]} — ${s[1]} buts

</div>

`;

});

}

}

function addPlayer(){

let prenom=prompt("Prenom");
let nom=prompt("Nom");
let numero=prompt("Numero");
let poste=prompt("Poste");
let team=prompt("Equipe A ou B");
let note=prompt("Note /100");

let input=document.createElement("input");

input.type="file";

input.accept="image/*";

input.onchange=function(){

let reader=new FileReader();

reader.onload=function(e){

DATA.players.push({

prenom,
nom,
numero,
poste,
team,
note,
photo:e.target.result

});

save();

showTab("players");

};

reader.readAsDataURL(input.files[0]);

};

input.click();

}

function editPlayer(i){

let p=DATA.players[i];

p.prenom=prompt("Prenom",p.prenom);
p.nom=prompt("Nom",p.nom);
p.numero=prompt("Numero",p.numero);
p.poste=prompt("Poste",p.poste);
p.team=prompt("Equipe",p.team);
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
let buteurs=prompt("Buteurs (séparés par virgule)");

DATA.matches.push({

date,
adversaire,
score,
buteurs

});

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
