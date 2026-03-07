function importExcel(event){

let file = event.target.files[0];

let reader = new FileReader();

reader.onload = function(e){

let data = new Uint8Array(e.target.result);

let workbook = XLSX.read(data,{type:"array"});

let sheet = workbook.Sheets["Joueurs"];

let rows = XLSX.utils.sheet_to_json(sheet);

rows.forEach(r=>{

DATA.players.push({

prenom: r["PRÉNOM"],
nom: r["NOM"],
poste: r["POSTE"],
numero: r["NUMERO"],
team: r["EQUIPES"],
note: r["NOTE"]

});

});

save();

alert("Import des joueurs réussi");

showTab("players");

};

reader.readAsArrayBuffer(file);

}
