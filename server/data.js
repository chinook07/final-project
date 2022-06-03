const employees = [
    { _id: "4", username : "tsmith", password : "ei8hdinosaur", admin : true},
    { _id: "7", username: "agrant", password: "Zoe1828gregCAT!", admin: true },
    { _id: "14", username: "resteban", password: "12watchOuT?a", admin: true },
    { _id: "33", username: "zrobinson", password: "canADA1845", admin: true },
	{ _id: "50", username : "emorales", password : "trex1843#", admin : false},
	{ _id: "56", username : "tpotter", password : "lcfh9595_5", admin : false},
    { _id: "76", username: "nbourassa", password: "xenaMYCAT9", admin: false },
    { _id: "97", username : "mgonzalez", password : "62sensLeaf", admin : false},
    { _id: "112", username : "tvandehuizen", password : "mxcr4$hn", admin : false},
    { _id: "125", username: "opetersen", password: "evildino1Again", admin: false },
    { _id: "129", username: "pzoghbi", password: "velocipede4", admin: false },
    { _id: "151", username : "ltremblay", password : "florida0AC", admin : false},
    { _id: "187", username : "amueller", password : "828flight", admin : false},
    { _id: "197", username : "imalcolm", password : "magicWord!Ah1", admin : false},
]

const assets = [
	{
		_id: 1,
		"name" : "The Spitting Beasts",
		"species" : "Dilophosaurus",
		"population" : 7,
		"dangerLevel" : "high",
		"fenceActive" : [ {"west" : true}, {"south" : true}, {"north" : true} ],
		"lastVisits" :
			[
				{"time" : "2022-06-10 14:23", "employee" : "Elizabeth Jenkins"},
				{"time" : "2022-06-02 08:55", "employee" : "Thomas Wade"}
			],
		"lastFeedings" :
			[
				{"time" : "2022-06-10 09:00", "employee" : "automated", "portion" : "regular"},
				{"time" : "2022-06-09 12:00", "employee" : "automated", "portion" : "regular"}
			],
		"currentlyOpenToVisitors" : true
    },
    {
		_id: 2,
		"name" : "Dominion of the Rex",
		"species" : "Tyrannosaurus rex",
		"population" : 2,
		"dangerLevel" : "high",
		"fenceActive" : [ {"west" : true}, {"south" : true}, {"north" : true} ],
		"lastVisits" :
			[
				{"time" : "2022-06-10 14:23", "employee" : "Elizabeth Jenkins"},
				{"time" : "2022-06-02 08:55", "employee" : "Thomas Wade"}
			],
		"lastFeedings" :
			[
				{"time" : "2022-06-10 09:00", "employee" : "automated", "portion" : "regular"},
				{"time" : "2022-06-09 12:00", "employee" : "automated", "portion" : "regular"}
			],
		"currentlyOpenToVisitors" : true
    },
    {
		_id: 3,
		"name" : "Try-tops Habitat",
		"species" : "Triceratops",
		"population" : 13,
		"dangerLevel" : "low",
		"fenceActive" : [ {"west" : true}, {"south" : true}, {"north" : true} ],
		"lastVisits" :
			[
				{"time" : "2022-06-10 14:23", "employee" : "Elizabeth Jenkins"},
				{"time" : "2022-06-02 08:55", "employee" : "Thomas Wade"}
			],
		"lastFeedings" :
			[
				{"time" : "2022-06-10 09:00", "employee" : "automated", "portion" : "regular"},
				{"time" : "2022-06-09 12:00", "employee" : "automated", "portion" : "regular"}
			],
		"currentlyOpenToVisitors" : true
    },
    {
		_id: 4,
		"name" : "Tall Dinos Club",
		"species" : "Brachiosaurus",
		"population" : 11,
		"dangerLevel" : "low",
		"fenceActive" : [ {"west" : true}, {"south" : true}, {"north" : true} ],
		"lastVisits" :
			[
				{"time" : "2022-06-10 14:23", "employee" : "Elizabeth Jenkins"},
				{"time" : "2022-06-02 08:55", "employee" : "Thomas Wade"}
			],
		"lastFeedings" :
			[
				{"time" : "2022-06-10 09:00", "employee" : "automated", "portion" : "regular"},
				{"time" : "2022-06-09 12:00", "employee" : "automated", "portion" : "regular"}
			],
		"currentlyOpenToVisitors" : true
    },
    {
		_id: 5,
		"name" : "Prehistoric Ostrich Kingdom",
		"species" : "Gallimimus",
		"population" : 26,
		"dangerLevel" : "low",
		"fenceActive" : [ {"west" : true}, {"south" : true}, {"north" : true} ],
		"lastVisits" :
			[
				{"time" : "2022-06-10 14:23", "employee" : "Elizabeth Jenkins"},
				{"time" : "2022-06-02 08:55", "employee" : "Thomas Wade"}
			],
		"lastFeedings" :
			[
				{"time" : "2022-06-10 09:00", "employee" : "automated", "portion" : "regular"},
				{"time" : "2022-06-09 12:00", "employee" : "automated", "portion" : "regular"}
			],
		"currentlyOpenToVisitors" : true
    },
    {
		_id: 6,
		"name" : "Raptor Pen",
		"species" : "Velociraptor",
		"population" : 12,
		"dangerLevel" : "high",
		"fenceActive" : [ {"west" : true}, {"south" : true}, {"north" : true} ],
		"lastVisits" :
			[
				{"time" : "2022-06-10 14:23", "employee" : "Elizabeth Jenkins"},
				{"time" : "2022-06-02 08:55", "employee" : "Thomas Wade"}
			],
		"lastFeedings" :
			[
				{"time" : "2022-06-10 09:00", "employee" : "automated", "portion" : "regular"},
				{"time" : "2022-06-09 12:00", "employee" : "automated", "portion" : "regular"}
			],
		"currentlyOpenToVisitors" : true
    }
]

module.exports = {employees, assets}