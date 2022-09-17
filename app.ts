// TODO: edit this file



type RecordType = {
  year: number;
  rank: number;
  name: string;
  gender: string;
  rankChange: number | null;
};

// This is a list where your records should be stored. See `parseAndSave`.
let records: RecordType[] = [];

// `parseAndSave(text)` is a function called with one argument `text`, the content of the babyname CSV file.
// It is invoked only once at the start of application.
// TODO: parse the csv text and save data records into the global variable `records` properly,
// so that the other functions use them with ease. After calling this function, `records` should
// contain the parsed data of every year like below.
//     e.g. records: [{year: 2001, rank: 1, name: "Jacob", gender: "M", rankChange: null},
//                    {year: 2001, rank: 2, name: "Michael", gender: "M", rankChange: null},
//                    ...]
//
// IMPORTANT NOTE: a CSV text can end with trailing line-break character '\n'. Whether it exists or not,
//                 the function should parse `text` correctly. Also, records should be stored in the same order
//                 in which they appear in a csv text. You can assume that at the first line is always a csv header.
//
// IMPORTANT NOTE: you can assume that the number of male names and the number of female names are the same.
//                 On the other hand, you should NOT assume the number of total rows in the csv file
//                 or the data sequence (e.g., rank order).
function parseAndSave(text: string): void {
  // TODO: Fill this function. (3 points)
  //text is string of all the data in the csv file
  //in the form of "year,rank,name,gender,rankChange\n2001,1,Jacob,M,\n2001,2,Michael,M,\n2001,3,Matthew,M,\n2001,4,Joshua,M,\
  //use regex to split into array, and make all of them into type Recordtype
  let splitted = text.split(/(?:\n|\n)+/).filter(function(el) {return el.length !=0});
  let headers = splitted.splice(0,1)[0].split(","); //remove the header of the file
  for (let i=0; i<splitted.length; i++){
    let record = splitted[i].split(",");
    if(record[4] == null){
      var toAdd : RecordType = {
        year : +record[0] ,
        rank : +record[1] ,
        name : record[2] ,
        gender : record[3] ,
        rankChange : null
      };
    }else{
      var toAdd : RecordType = {
        year : +record[0] ,
        rank : +record[1] ,
        name : record[2] ,
        gender : record[3] ,
        rankChange : +record[4]
      };
    }
    records.push(toAdd);
  }
}



// `provideYearData(year)` is a function that receives a year and returns an array of data object corresponding to that year.
// Note that male and female record with the same rank should be joined together to form one object.
// TODO: return all data objects of a specific year, that are joined and organized by rank in an ascending order.
// The example of returned array is as follows.
//     e.g. [{rank: 1, male: "Jacob", maleRankChange: 0, female: "Isabella", femaleRankChange: 0},
//           {rank: 2, male: "Ethan", maleRankChange: 0, female: "Sophia", femaleRankChange: -2},
//           ...,
//           {rank: 1000, male: "Keshawn", maleRankChange: 113, female: "Karley", femaleRankChange: 17}]
//
// IMPORTANT NOTE: you should NOT assume the number of data corresponding to the given year.
function provideYearData(year: number): RankType[] {
  // TODO: Fill in this function. (5 points)
  
  let result : RankType[] = [];

  let filtered = records.filter(data => data.year == year);
  for (let i =1; i<=(filtered.length/2); i++){
    let indiRank : RankType = {
        rank : i,
        male : null,
        maleRankChange : null,
        female : null,
        femaleRankChange : null
    };
    result.push(indiRank)
  }
  
  for (let i=0; i<filtered.length; i++){
    let temp = filtered[i].rank;
    let finding = result.filter(data => data.rank == temp);
    if(filtered[i].gender === 'M' && finding.length >0){
      finding[0].male = filtered[i].name;
      finding[0].maleRankChange = filtered[i].rankChange;
    }else if(filtered[i].gender === 'F' && finding.length >0) {
      finding[0].female = filtered[i].name;
      finding[0].femaleRankChange = filtered[i].rankChange;
    }
  }
  // This is just a reference for the return value's format. Delete this and fill your own
  // proper code to return the correct data.
  return result;
}

// provideChartData(name, gender) is a function called when a user wants
// to see the chart showing the year-on-year change of rank of a specific name.
// TODO: return a list of all objects from 2001 to 2018 in the format of `{year: <year>, rank: <rank>}`
// of a specific name specified by the arguments, name and gender.
// If there are no records with the name and gender for some years,
// either you can set the values of the ranks to `undefined` or not return those records at all.
// The example of return data is as follow.
//     e.g. [{year: 2001, rank: undefined},
//           {year: 2002, rank: 613},
//           ...,
//           {year: 2018, rank: 380}]
// You can also return data excluding `undefined` value as below.
//     e.g. [{year: 2002, rank: 613},
//           ...,
//           {year: 2018, rank: 380}]
function provideChartData(name: string, gender: string): CharDataType[] {
  // TODO: Fill in this function. (2 points)
  let searching = records.filter(data => data.name == name && data.gender == gender)
  // This is just a reference for the return value's format. Delete this and fill your own
  let result:CharDataType[] = [];
  // proper code to return the correct data.
  for(let i=0; i<searching.length; i++){
      let temp : CharDataType = {
        year : searching[i].year,
        rank : searching[i].rank
      };
      result.push(temp);
  }
  return result;
}

// `handleSignUpFormSubmit(form)` is called when a user submits the sign up form.
// `form` is the target HTML form element (L82~ in index.html).
// TODO: validate the form. (5 points)
function handleSignUpFormSubmit(form: FormType): {
  alertMessage: string;
  validationResults: ValidationResultType[];
} {
  let alertMessage = "";
  // TODO: Fill in the rest of function to get the HTML form element as above.

  // Hint: you can use the `RegExp` class for matching a string.

  // The return data format is as follows. For the given `form` argument, you should
  // correctly process the validation, filling in `alertMessage`, and `validationResults`.
  // When you deal with `validationResults`, the values of `message` should be set to `null`
  // for the valid input fields. (See the example below.)
  // Below is just a reference for the return value's format. Delete this and fill your own
  // proper code to return the correct data.
  //take data from form,  alertmessage list if the input datas are not correct, specifying which 
  //fields we have to correct. ValidationResultType for each field
  // IMPORTANT NOTE: You must use the argument `form` rather than directly using APIs such as `document.getElementId` or `document.querySelector`.
  //                 Plus, please do not call `alert` function here.
  //                 For debugging purpose, you can use `console.log`.
 let firstName = form['first-name'];
 let lastName = form['last-name'];
 let mail = form.email;
 let dob = form['date-of-birth'];
 
 //validation process
 //1. email.
 const regexMail = (/^[^\s@]+@[^\s@]+.[a-zA-Z]{2,3}$/);
 if(mail.value.match(regexMail)){
  var validMail : ValidationResultType = {
    name : "email",
    valid : true ,
    message : null
  };
 }else{
  var validMail : ValidationResultType = {
    name : "email",
    valid : false ,
    message : "Invalid email"
  };
 }
 

 
 //2. firstname & lastname as same conditions apply
 const regexName = (/^[A-Z][a-z]*/);
 if(firstName.value.match((regexName))){
  var validFN : ValidationResultType = {
    name : "first-name",
    valid : true,
    message : null
  };
}else {
  var validFN : ValidationResultType = {
    name : "first-name",
    valid : false,
    message : "Invalid first name"
  };
}
//lastname
if(lastName.value.match((regexName))){
  var validLN : ValidationResultType = {
    name : "last-name",
    valid : true,
    message : null
  };
}else {
  var validLN : ValidationResultType = {
    name : "last-name",
    valid : false,
    message : "Invalid last name"
  };
}

//dob
let toSplit = dob.value.split("-");
if(parseInt(toSplit[0]) <= 2022 && parseInt(toSplit[0]) >= 1900){
  if(parseInt(toSplit[1]) <=12 && parseInt(toSplit[1]) >= 1 && toSplit[1].length ==2){
    if(parseInt(toSplit[2]) <= 31 && parseInt(toSplit[2]) >= 1 && toSplit[1].length == 2){
      var validDOB : ValidationResultType = {
        name : "date-of-birth",
        valid : true,
        message : null
      };
    }else {
      var validDOB : ValidationResultType = {
        name : "date-of-birth",
        valid : false,
        message : "Invalid date of birth"
      };
    }
  }else {
    var validDOB : ValidationResultType = {
      name : "date-of-birth",
      valid : false,
      message : "Invalid date of birth"
    };
  }
}else{
  var validDOB : ValidationResultType = {
    name : "date-of-birth",
    valid : false,
    message : "Invalid date of birth"
  };
}

if(validFN.valid == false || validLN.valid == false || validDOB.valid == false || validMail.valid == false){
  alertMessage += "You must correct:\n\n"
  if(validFN.valid == false){
    alertMessage += "First Name";
    alertMessage += "\n";
  }
  if(validLN.valid == false){
    alertMessage += "Last Name";
    alertMessage += "\n";
  }
  if(validDOB.valid == false){
    alertMessage += "Date of Birth";
    alertMessage += "\n";
  }
  if(validMail.valid == false){
    alertMessage += "Email";
    alertMessage += "\n";
  }
}else{
  alertMessage += "Successfully Submitted!"
}


  return {
    alertMessage: alertMessage,
    validationResults: [
      { name: validFN.name, valid: validFN.valid, message: validFN.message },
      { name: validLN.name, valid: validLN.valid, message: validLN.message },
      { name: validMail.name, valid: validMail.valid, message: validMail.message },
      { name: validDOB.name, valid: validDOB.valid, message: validDOB.message },
    ],
  };
}
