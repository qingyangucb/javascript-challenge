// from data.js
var tableData = data;
var user_input={
	"datetime":null,
	"city":null,
	"state":null,
	"country":null,
	"shape":null
};


function getData(option) {
  switch (option) {
  case "date":
  	d3.select("#add-btn").on("click", function() {user_input.datetime = d3.select("#user_input").node().value;});
    console.log(`datetime: ${user_input.datetime}`);
    break;
  case "city":
  	d3.select("#add-btn").on("click", function() {user_input.city = d3.select("#user_input").node().value;});
    console.log(`city: ${user_input.city}`);
    break;
  case "state":
  	d3.select("#add-btn").on("click", function() {user_input.state = d3.select("#user_input").node().value;});
    console.log(`state: ${user_input.state}`);
    break;
  case "country":
  	d3.select("#add-btn").on("click", function() {user_input.country = d3.select("#user_input").node().value;});
    console.log(`country: ${user_input.country}`);
  	break;
  case "shape":
  	d3.select("#add-btn").on("click", function() {user_input.shape = d3.select("#user_input").node().value;});
    console.log(`shape: ${user_input.shape}`);
    break;
  // default:
  //   d3.select("#add-btn").on("click", function() {user_input.datetime = d3.select("#user_input").node().value;});
    // console.log(`datetime: ${user_input.datetime}`);
    
  }
}

function criteria_filter(user_input) {
  var keys = ["date", "city", "state", "country", "shape"];
  var criteria = [];
  Object.entries(user_input).forEach(([key,value])=>{
    if (value != null) {
      criteria.push(key);
    }
  }
  )
  return criteria;
}

function result_filter(result ,criteria) {
  var boolean = true;
  while (boolean==true) {
    for (i=0; i<criteria.length;i++) 
    {
      var key = criteria[i];
      if (result[key] !== user_input[key]) 
        {boolean=false;}
    }
  return boolean;
  }
}

function handleSubmit() {
  // Prevent the page from refreshing
  d3.event.preventDefault();
  var criteria = criteria_filter(user_input);
  // console.log(criteria);
  // console.log(criteria[0]);
  // console.log(criteria[1]);
  // tableData.forEach(result=> console.log(result[String(criteria[0])]));
  var results = tableData.filter(result=> result_filter(result,criteria));

  
  
  

  // Select the input value from the form
  // clear the input value
  // d3.select("#datetime").node().value = "";
  // var results = data.filter(result=> 
  // 	{
  //      (result.datetime == user_in put.date || user_input.date == 9999)
  // 	&& (result.city == user_input.city || user_input.city == 9999)
  // 	&& (result.state == user_input.state || user_input.state == 9999)
  // 	&& (result.country == user_input.country|| user_input.country == 9999)
  // 	&& (result.shape == user_input.shape || user_input.shape == 9999)
  //   }
  // );
  console.log(results);

  results.forEach(result=> {
		var date= result.datetime;
		var city= result.city;
		var state= result.state;
		var country= result.country;
		var shape= result.shape;
		var duration= result.durationMinutes;
		var comments= result.comments;
		var tbody = d3.select("tbody");
		var trow = tbody.append("tr");
		trow.append("td").text(date);
    trow.append("td").text(city);
    
    
		trow.append("td").text(state);
		trow.append("td").text(country);
		trow.append("td").text(shape);
		trow.append("td").text(duration);
		trow.append("td").text(comments);
  }
  );
}

function init() {
  d3.select("#add-btn").on("click", function() {user_input.datetime = d3.select("#user_input").node().value;});
}

init();

d3.select("#filter-btn").on("click", handleSubmit);