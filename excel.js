function importExcel(event){

let file=event.target.files[0];

let reader=new FileReader();

reader.onload=function(e){

let data=new Uint8Array(e.target.result);

let workbook=XLSX.read(data,{type:"array"});

let playersSheet=workbook.Sheets["joueurs"];

let players=XLSX.utils.sheet_to_json(playersSheet);

players.forEach(p=>{

DATA.players.push({

prenom:p.prenom,
nom:p.nom,
numero:p.numero,
poste:p.poste,
team:p.equipe,
note:p.note

});

});

save();

alert("Import joueurs terminé");

showTab("players");

};

reader.readAsArrayBuffer(file);

}
