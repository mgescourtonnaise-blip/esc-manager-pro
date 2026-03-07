function importExcel(event){

const file = event.target.files[0];

if(!file){
alert("Aucun fichier choisi");
return;
}

const reader = new FileReader();

reader.onload = function(e){

const data = new Uint8Array(e.target.result);

const workbook = XLSX.read(data,{type:"array"});

console.log("Feuilles:",workbook.SheetNames);

const sheet = workbook.Sheets[workbook.SheetNames[0]];

const rows = XLSX.utils.sheet_to_json(sheet);

console.log("Lignes:",rows);

rows.forEach(r=>{

DATA.players.push({
prenom:r["PRÉNOM"] || "",
nom:r["NOM"] || "",
poste:r["POSTE"] || "",
numero:r["NUMERO"] || "",
team:r["EQUIPES"] || "",
note:r["NOTE"] || ""
});

});

save();

alert("Import réussi");

showTab("players");

};

reader.readAsArrayBuffer(file);

}
