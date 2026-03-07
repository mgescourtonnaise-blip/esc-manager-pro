function importExcel(event){

const file = event.target.files[0];

if(!file){
alert("Aucun fichier sélectionné");
return;
}

const reader = new FileReader();

reader.onload = function(e){

const data = new Uint8Array(e.target.result);

const workbook = XLSX.read(data,{type:"array"});

console.log("Feuilles trouvées :", workbook.SheetNames);

const sheetName = workbook.SheetNames[0]; // prend la première feuille

const sheet = workbook.Sheets[sheetName];

const rows = XLSX.utils.sheet_to_json(sheet);

console.log("Données Excel :", rows);

rows.forEach(r=>{

DATA.players.push({

prenom: r["PRÉNOM"] || "",
nom: r["NOM"] || "",
poste: r["POSTE"] || "",
numero: r["NUMERO"] || "",
team: r["EQUIPES"] || "",
note: r["NOTE"] || ""

});

});

save();

alert("Import des joueurs réussi");

showTab("players");

};

reader.readAsArrayBuffer(file);

}
