var fs = require("fs");
var async = require("async");

function teamGenerator(formation, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, team) {
	return new Promise(function (resolve, reject) {
		readFile("squads/" + team + ".json").then(function (squad) {
			var formations = [];
			formations[0] = [
				[340, 0], "GK", [80, 80], "LB", [230, 80], "CB", [450, 80], "CB", [600, 80], "RB", [80, 270], "LM", [230, 270], "CM", [450, 270], "CM", [600, 270], "RM", [280, 500], "ST", [440, 500], "ST"
			];
			formations[1] = [
				[340, 0], "GK", [80, 80], "LB", [230, 80], "CB", [450, 80], "CB", [600, 80], "RB", [180, 270], "CM", [340, 270], "CM", [500, 270], "CM", [240, 500], "ST", [340, 450], "ST", [480, 500], "ST"
			];
			formations[2] = [
				[340, 0], "GK", [60, 120], "LB", [220, 80], "CB", [340, 80], "CB", [460, 80], "CB", [620, 120], "RB", [180, 270], "CM", [340, 270], "CM", [500, 270], "CM", [280, 500], "ST", [440, 500], "ST"
			];
			formations[3] = [
				[340, 0], "GK", [200, 80], "CB", [340, 80], "CB", [480, 80], "CB", [85, 300], "LM", [260, 270], "CM", [340, 270], "CM", [420, 270], "CM", [595, 300], "RM", [280, 500], "ST", [440, 500], "ST"
			];
			formations[4] = [
				[340, 0], "GK", [80, 80], "LB", [230, 80], "CB", [450, 80], "CB", [600, 80], "RB", [85, 300], "LM", [260, 270], "CM", [340, 270], "CM", [420, 270], "CM", [595, 300], "RM", [340, 500], "ST"
			];
			formations[5] = [
				[340, 0], "GK", [200, 80], "CB", [340, 80], "CB", [480, 80], "CB", [80, 270], "LM", [230, 270], "CM", [450, 270], "CM", [600, 270], "RM", [220, 500], "ST", [340, 450], "ST", [460, 500], "ST"
			];
			var thisFormation;
			var thisSquad = {
				"name": "",
				"players": []
			};
			var matchDayTeam = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11];
			if (formation !== "4-4-2" && formation !== "4-3-3" && formation !== "5-3-2" && formation !== "3-5-2" && formation !== "4-5-1" && formation !== "3-4-3") {
				formation = "4-4-2";
			}
			if (formation === "4-4-2") {
				thisFormation = formations[0];
			} else if (formation === "4-3-3") {
				thisFormation = formations[1];
			} else if (formation === "5-3-2") {
				thisFormation = formations[2];
			} else if (formation === "3-5-2") {
				thisFormation = formations[3];
			} else if (formation === "4-5-1") {
				thisFormation = formations[4];
			} else if (formation === "3-4-3") {
				thisFormation = formations[5];
			}
			thisSquad.name = squad.name;
			thisSquad.players = [];
			async.eachSeries(matchDayTeam, function eachPlayer(currentPlayer, currentPlayerCallback) {
				async.eachSeries(squad.players, function eachPlayer(thisPlayer, thisPlayerCallback) {
					var tempPlayer = JSON.parse(JSON.stringify(thisPlayer));
					if (currentPlayer === tempPlayer.name) {
						thisSquad.players.push(tempPlayer);
						thisPlayerCallback();
					} else {
						thisPlayerCallback();
					}
				}, function afterAllSquadChecked() {
					currentPlayerCallback();
				});
			}, function afterAllPlayers() {
				thisSquad.players[0].currentPOS = thisFormation[0];
				thisSquad.players[0].position = thisFormation[1];
				thisSquad.players[0].injured = false;
				thisSquad.players[1].currentPOS = thisFormation[2];
				thisSquad.players[1].position = thisFormation[3];
				thisSquad.players[1].injured = false;
				thisSquad.players[2].currentPOS = thisFormation[4];
				thisSquad.players[2].position = thisFormation[5];
				thisSquad.players[2].injured = false;
				thisSquad.players[3].currentPOS = thisFormation[6];
				thisSquad.players[3].position = thisFormation[7];
				thisSquad.players[3].injured = false;
				thisSquad.players[4].currentPOS = thisFormation[8];
				thisSquad.players[4].position = thisFormation[9];
				thisSquad.players[4].injured = false;
				thisSquad.players[5].currentPOS = thisFormation[10];
				thisSquad.players[5].position = thisFormation[11];
				thisSquad.players[5].injured = false;
				thisSquad.players[6].currentPOS = thisFormation[12];
				thisSquad.players[6].position = thisFormation[13];
				thisSquad.players[6].injured = false;
				thisSquad.players[7].currentPOS = thisFormation[14];
				thisSquad.players[7].position = thisFormation[15];
				thisSquad.players[7].injured = false;
				thisSquad.players[8].currentPOS = thisFormation[16];
				thisSquad.players[8].position = thisFormation[17];
				thisSquad.players[8].injured = false;
				thisSquad.players[9].currentPOS = thisFormation[18];
				thisSquad.players[9].position = thisFormation[19];
				thisSquad.players[9].injured = false;
				thisSquad.players[10].currentPOS = thisFormation[20];
				thisSquad.players[10].position = thisFormation[21];
				thisSquad.players[10].injured = false;
				resolve(thisSquad);
			});
		}).catch(function (err) {
			if (err) {
				console.error(err);
			}
		});
	});
}

function readFile(filePath) {
	return new Promise(function (resolve, reject) {
		fs.readFile(filePath, 'utf8', function (err, data) {
			if (err) {
				reject(err);
			} else {
				data = JSON.parse(data);
				resolve(data);
			}
		})
	});
}

module.exports = {
	teamGenerator: teamGenerator
};
