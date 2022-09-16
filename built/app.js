var records = [];
function parseAndSave(text) {
    var splitted = text.split(/(?:\n|\n)+/).filter(function (el) { return el.length != 0; });
    var headers = splitted.splice(0, 1)[0].split(",");
    for (var i = 0; i < splitted.length; i++) {
        var record = splitted[i].split(",");
        if (record[4] == null) {
            var toAdd = {
                year: +record[0],
                rank: +record[1],
                name: record[2],
                gender: record[3],
                rankChange: null
            };
        }
        else {
            var toAdd = {
                year: +record[0],
                rank: +record[1],
                name: record[2],
                gender: record[3],
                rankChange: +record[4]
            };
        }
        records.push(toAdd);
    }
}
function provideYearData(year) {
    var result = [];
    var filtered = records.filter(function (data) { return data.year == year; });
    for (var i = 1; i <= (filtered.length / 2); i++) {
        var indiRank = {
            rank: i,
            male: null,
            maleRankChange: null,
            female: null,
            femaleRankChange: null
        };
        result.push(indiRank);
    }
    var _loop_1 = function (i) {
        var temp = filtered[i].rank;
        var finding = result.filter(function (data) { return data.rank == temp; });
        if (filtered[i].gender === 'M' && finding.length > 0) {
            finding[0].male = filtered[i].name;
            finding[0].maleRankChange = filtered[i].rankChange;
        }
        else if (filtered[i].gender === 'F' && finding.length > 0) {
            finding[0].female = filtered[i].name;
            finding[0].femaleRankChange = filtered[i].rankChange;
        }
    };
    for (var i = 0; i < filtered.length; i++) {
        _loop_1(i);
    }
    return result;
}
function provideChartData(name, gender) {
    var searching = records.filter(function (data) { return data.name == name && data.gender == gender; });
    var result = [];
    for (var i = 0; i < searching.length; i++) {
        var temp = {
            year: searching[i].year,
            rank: searching[i].rank
        };
        result.push(temp);
    }
    return result;
}
function handleSignUpFormSubmit(form) {
    var alertMessage = "TODO: Fill in this alert message properly";
    return {
        alertMessage: alertMessage,
        validationResults: [
            { name: "first-name", valid: true, message: null },
            { name: "last-name", valid: false, message: "Invalid last name" },
            { name: "email", valid: true, message: null },
            { name: "date-of-birth", valid: false, message: "Invalid date of birth" },
        ]
    };
}
//# sourceMappingURL=app.js.map