const employees = [
    { _id: "4", username : "tsmith", password : "ei8hdinosaur", admin : true},
    { _id: "7", username: "agrant", password: "Zoe1828gregCAT!", admin: true },
    { _id: "14", username: "resteban", password: "12watchOuT?a", admin: true },
    { _id: "33", username: "zrobinson", password: "canADA1845", admin: true },
	{ _id: "50", username : "emorales", password : "tr1843#", admin : false},
	{ _id: "56", username : "tpotter", password : "11rmn", admin : false},
    { _id: "76", username: "nbourassa", password: "xenaMYCAT9", admin: false },
    { _id: "97", username : "mgonzalez", password : "62sensLeaf", admin : false},
    { _id: "112", username : "tvandehuizen", password : "mxcr4$hn", admin : false},
    { _id: "125", username: "opetersen", password: "evildino1Again", admin: false },
    { _id: "129", username: "pzoghbi", password: "velocipede4", admin: false },
    { _id: "151", username : "ltremblay", password : "florida0AC", admin : false},
    { _id: "187", username : "amueller", password : "828flight", admin : false},
    { _id: "197", username: "imalcolm", password: "magicWord!Ah1", admin: false },
    { _id: "800", username: "Al", password: "123", admin: true },
    { _id: "801", username : "Bob", password : "123", admin : false},
]

const vets = [
    {_id: 1, "name" : ".Drone"},
    {_id: 2, "name" : "Craig Scotch"},
    {_id: 3, "name" : "Deeneaus Pollack"},
    {_id: 4, "name" : "Dennis Nordry"},
    {_id: 5, "name" : "Elizabeth Jenkins"},
    {_id: 6, "name" : "Filip De Sousa"},
    {_id: 7, "name" : "George Newhouse"},
    {_id: 8, "name" : "Glenn Smith"},
    {_id: 9, "name" : "Paula Corazon"},
    {_id: 10, "name" : "Thomas Wade"}
]

const assets = [
	{
		_id: 1,
		"name" : "The Spitting Beasts",
		"species" : "Dilophosaurus",
		"population" : 7,
		"dangerLevel" : "high",
		"fenceActive" : true,
		"lastVisits" :
			[
				{"time" : "2022-06-05 16:04", "employee" : "Dennis Nordry"},
				{"time" : "2022-05-31 14:20", "employee" : "Thomas Wade"}
			],
		"lastFeedings" :
			[
				{"time" : "2022-06-10 10:00"},
				{"time" : "2022-06-09 13:00"}
			],
		"currentlyOpenToVisitors" : true
    },
    {
		_id: 2,
		"name" : "Dominion of the Rex",
		"species" : "Tyrannosaurus rex",
		"population" : 2,
		"dangerLevel" : "high",
		"fenceActive" : true,
		"lastVisits" :
			[
				{"time" : "2022-06-10 14:23", "employee" : "Elizabeth Jenkins"},
				{"time" : "2022-06-02 08:55", "employee" : "Thomas Wade"}
			],
		"lastFeedings" :
			[
				{"time" : "2022-06-10 09:00"},
				{"time" : "2022-06-09 12:00"}
			],
		"currentlyOpenToVisitors" : true
    },
    {
		_id: 3,
		"name" : "Try-tops Habitat",
		"species" : "Triceratops",
		"population" : 13,
		"dangerLevel" : "low",
		"fenceActive" : true,
		"lastVisits" :
			[
				{"time" : "2022-06-10 12:54", "employee" : "Filip De Sousa"},
				{"time" : "2022-06-07 11:12", "employee" : "Craig Scotch"}
			],
		"currentlyOpenToVisitors" : true
    },
    {
		_id: 4,
		"name" : "Tall Dinos Club",
		"species" : "Brachiosaurus",
		"population" : 11,
		"dangerLevel" : "low",
		"fenceActive" : true,
		"lastVisits" :
			[
				{"time" : "2022-06-10 07:57", "employee" : "Elizabeth Jenkins"},
				{"time" : "2022-06-07 08:31", "employee" : "Craig Scotch"}
			],
		"currentlyOpenToVisitors" : true
    },
    {
		_id: 5,
		"name" : "Prehistoric Ostrich Kingdom",
		"species" : "Gallimimus",
		"population" : 26,
		"dangerLevel" : "low",
		"fenceActive" : true,
		"lastVisits" :
			[
				{"time" : "2022-06-06 12:58", "employee" : ".Drone"},
				{"time" : "2022-06-01 16:20", "employee" : "Glenn Smith"}
			],
		"currentlyOpenToVisitors" : true
    },
    {
		_id: 6,
		"name" : "Raptor Pen",
		"species" : "Velociraptor",
		"population" : 12,
		"dangerLevel" : "high",
		"fenceActive" : true,
		"lastVisits" :
			[
				{"time" : "2022-06-02 04:26", "employee" : "George Newhouse"},
				{"time" : "2022-05-26 05:36", "employee" : "Deeneaus Pollack"}
			],
		"lastFeedings" :
			[
				{"time" : "2022-06-10 16:00"},
				{"time" : "2022-06-09 16:00"}
			],
		"currentlyOpenToVisitors" : true
    }
]

const vitalSigns = [
    { _id: 1, name: "Park status", status : true },
    { _id: 2, name: "Power systems", status : true },
    { _id: 3, name: "Communication systems", status : true },
    { _id: 4, name: "Park perimeter fence", status : true },
    { _id: 5, name: "Habitat fences", status : true },
    { _id: 6, name: "Park operations", status : true },
]

module.exports = {employees, assets, vets, vitalSigns}