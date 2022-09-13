var records = [];
function parseAndSave(text) {
}
function provideYearData(year) {
    return [
        {
            rank: 1,
            male: "John",
            maleRankChange: 0,
            female: "Christina",
            femaleRankChange: -2
        },
    ];
}
function provideChartData(name, gender) {
    return [
        { year: 2001, rank: 3 },
        { year: 2002, rank: undefined },
    ];
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