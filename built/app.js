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
    var alertMessage = "";
    var firstName = form['first-name'];
    var lastName = form['last-name'];
    var mail = form.email;
    var dob = form['date-of-birth'];
    var regexMail = (/^[^\s@]+@[^\s@]+.[a-zA-Z]{2,3}$/);
    if (mail.value.match(regexMail)) {
        var validMail = {
            name: "email",
            valid: true,
            message: null
        };
    }
    else {
        var validMail = {
            name: "email",
            valid: false,
            message: "Invalid email"
        };
    }
    var regexName = (/^[A-Z][a-z]*/);
    if (firstName.value.match((regexName))) {
        var validFN = {
            name: "first-name",
            valid: true,
            message: null
        };
    }
    else {
        var validFN = {
            name: "first-name",
            valid: false,
            message: "Invalid first name"
        };
    }
    if (lastName.value.match((regexName))) {
        var validLN = {
            name: "last-name",
            valid: true,
            message: null
        };
    }
    else {
        var validLN = {
            name: "last-name",
            valid: false,
            message: "Invalid last name"
        };
    }
    var toSplit = dob.value.split("-");
    if (parseInt(toSplit[0]) <= 2022 && parseInt(toSplit[0]) >= 1900) {
        if (parseInt(toSplit[1]) <= 12 && parseInt(toSplit[1]) >= 1 && toSplit[1].length == 2) {
            if (parseInt(toSplit[2]) <= 31 && parseInt(toSplit[2]) >= 1 && toSplit[1].length == 2) {
                var validDOB = {
                    name: "date-of-birth",
                    valid: true,
                    message: null
                };
            }
            else {
                var validDOB = {
                    name: "date-of-birth",
                    valid: false,
                    message: "Invalid date of birth"
                };
            }
        }
        else {
            var validDOB = {
                name: "date-of-birth",
                valid: false,
                message: "Invalid date of birth"
            };
        }
    }
    else {
        var validDOB = {
            name: "date-of-birth",
            valid: false,
            message: "Invalid date of birth"
        };
    }
    if (validFN.valid == false || validLN.valid == false || validDOB.valid == false || validMail.valid == false) {
        alertMessage += "You must correct:\n\n";
        if (validFN.valid == false) {
            alertMessage += "First Name";
            alertMessage += "\n";
        }
        if (validLN.valid == false) {
            alertMessage += "Last Name";
            alertMessage += "\n";
        }
        if (validDOB.valid == false) {
            alertMessage += "Date of Birth";
            alertMessage += "\n";
        }
        if (validMail.valid == false) {
            alertMessage += "Email";
            alertMessage += "\n";
        }
    }
    else {
        alertMessage += "Successfully Submitted!";
    }
    return {
        alertMessage: alertMessage,
        validationResults: [
            { name: validFN.name, valid: validFN.valid, message: validFN.message },
            { name: validLN.name, valid: validLN.valid, message: validLN.message },
            { name: validMail.name, valid: validMail.valid, message: validMail.message },
            { name: validDOB.name, valid: validDOB.valid, message: validDOB.message },
        ]
    };
}
//# sourceMappingURL=app.js.map