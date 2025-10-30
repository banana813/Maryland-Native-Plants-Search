var curimage;
var planters = null;
function normString(str) {
    return str
      .toLowerCase()
      .replace(/[^\w]|_/g, "");
}
function loadDetails(plantnum){
    if(curimage != null){
        curimage.style.display = "none";
    }
    planters = plantnum;
    var detailspane = document.getElementById("detailspane");
    var plantlistpane = document.getElementById("plantlistpane");
    var bigDiv = document.getElementById("bigdiv");

    detailspane.style.display = "block";
    if (plantlistpane != null) plantlistpane.style.display = "none";
//    if (bigDiv != null) bigDiv.style.visibility = "hidden";
    if (bigDiv != null) bigDiv.style.opacity = "50%";

    var plantdisplay = document.getElementById("plant");
    var scientific_name = document.getElementById("scitname");
    var description = document.getElementById("description");
    var plantimage = document.getElementById(plants[plantnum].name);
    curimage = document.getElementById(plants[plantnum].name);
    plant.innerHTML = plants[plantnum].name+"";
    description.innerHTML = plants[plantnum].desc+"";
    scientific_name.innerHTML = plants[plantnum].scientific_name;
    plantimage.style.width = "200px";
    plantimage.style.display = "block";
}
function makecareinst(plantname){
    
    var careinst = document.getElementById("careinst");
    var plantdisplay = document.getElementById("plant");
    var animals_attracted = document.getElementById("anattract");
    var animals_repelled = document.getElementById("anrepel");
    var size = document.getElementById("size");
    var sun = document.getElementById("sunneeds");
    var water = document.getElementById("watering");
    var soil = document.getElementById("soilneeds");
    //an attract
        //an repel
        //size
        //sun
        //water
        //soil
    careinst.style.display = "block";
    if(plants[plantname].animals_attracted.length != 0){
        animals_attracted.innerHTML = "This plant attracts " + plants[plantname].animals_attracted[0]+"";
        for(var i = 1; i < plants[plantname].animals_attracted.length-1; i++){
            animals_attracted.innerHTML += ", "+ plants[plantname].animals_attracted[i];
        }
        if (plants[plantname].animals_attracted.length > 1)
		{
			animals_attracted.innerHTML += " and " + plants[plantname].animals_attracted[plants[plantname].animals_attracted.length-1]+".";
		}
		else
		{
			animals_repelled.innerHTML += ".";
		}
    }else{
        animals_attracted.innerHTML = ""; // "This plant attracts nothing."
    }
    if(plants[plantname].animals_repelled.length != 0){    
        animals_repelled.innerHTML = "This plant repels " + plants[plantname].animals_repelled[0]+"";
        for(var i = 0; i < plants[plantname].animals_repelled.length-2; i++){
            animals_repelled.innerHTML += ", "+ plants[plantname].animals_repelled[i+1];
        }
        if(plants[plantname].animals_repelled.length > 1){
            animals_repelled.innerHTML += " and " + plants[plantname].animals_repelled[plants[plantname].animals_repelled.length-1]+".";
        }else{
            animals_repelled.innerHTML +=".";
        }
        }else{
        animals_repelled.innerHTML = ""; // "This plant repels nothing."
    }
    size.innerHTML = "This plant's size can range from " + plants[plantname].size[0] + " ft to " + plants[plantname].size[1] + " ft.";
    water.innerHTML = plants[plantname].water;
    sun.innerHTML = "For best results, place in " + plants[plantname].sun[0];
    if(plants[plantname].sun.length > 1){
        sun.innerHTML+=" or " + plants[plantname].sun[1];
    }
    sun.innerHTML+=", in " + plants[plantname].soiltype + " soil.";

    
    //detailspane.style.border = "2px solid black"
    //detailspane.style.backgroundColor = "white"
    
}

function makeDivs(){
    var bigDiv = document.getElementById("bigdiv");
    if(bigDiv != null){
        bigDiv.innerHTML = "";
        for(var i = 0; i < plants.length; i++){
            bigDiv.innerHTML += "<div id=\"div"+i+"\" class=\"listdiv\"" +
						        " onclick=\"loadDetails(\'" + i +"\');\">" +
						           "<p>"+plants[i].name+"</p>" + 
						           "<img src=\"resources/plant_images/"+normString(plants[i].name)+".png\" width=\"200\"/>" + 
						        "</div>";
        }
    }
}

function makegridimgs(){
    var overDiv = document.getElementById("overdiv");
    if(overDiv != null){
		overDiv.innerHTML = "";
        for(var i = 1; i <=9; i++){
            overDiv.innerHTML += 
				"<div id=\"iccpimg"+i+"\" class=\"iccpdiv\">" +
					"<a target=\"_blank\" href=\"resources/iccp_images/iccpnative"+i+".png\">" +
						"<img src=\"resources/iccp_images/iccpnative"+i+".png\" width=\"200\">" +
					"</a>" +
				"</div>";
        }
    }
    
}

function clear_details_on_list_page()
{
    var bigDiv = document.getElementById("bigdiv");
    var detailspane = document.getElementById("detailspane");
    detailspane.style.display = "none";
    //bigDiv.style.visibility = "visible";
    if (bigDiv != null) bigDiv.style.opacity = "100%";
    var careinst = document.getElementById("careinst");
    careinst.style.display = "none";
}

function makeplanttypelist(type_changed = false) {
    var outstr = "";
    var detailspane = document.getElementById("detailspane");
    var plantlistpane = document.getElementById("plantlistpane");
    detailspane.style.display = "none";
    if (plantlistpane == null) 
	{
		return;
	}
	plantlistpane.style.display = "none";
    var careinst = document.getElementById("careinst");
    careinst.style.display = "none";

    var searchType = document.getElementById("searchtype").value.toLowerCase();
    var searchText = document.getElementById("searchtext");
    var searchList = document.getElementById("searchlist");
    var searchDesc = document.getElementById("searchdesc");
	var searchLabel = document.getElementById("searchlabel");
	var searchPanel = document.getElementById("searchpanel");
    var search;

    if (searchType === "") searchType = null;
	if (searchType === null) 
	{
		searchText.style.display = "none";
		searchList.style.display = "none";
		searchLabel.style.display = "none";
		searchPanel.style.display = "none";
		return;
	}

	var choiceList;

	choiceList = null;

    switch (searchType) {
        case "type":
			searchDesc.innerHTML = "(Select Plant Type)";
			choiceList = planttypes;
			break;
        case "animal attraction":
			searchDesc.innerHTML = "(Select Animal Name)";
			choiceList = animalattracttypes;
			break;
        case "animal repulsion":
			searchDesc.innerHTML = "(Select Animal Name)";
			choiceList = animalrepeltypes;
			break;
        case "sun":
			searchDesc.innerHTML = "(Select Sunlight Level)";
			choiceList = suntypes;
			break;
        case "soil":
			searchDesc.innerHTML = "(Select Soil Type)";
			choiceList = soiltypes;
			break;
        case "size":
			searchDesc.innerHTML = "(Enter Plant Size in Feet, Minimum 1)";
			break;
        case "name":
			searchDesc.innerHTML = "(Enter Plant Name)";
			break;
		default :
			searchText.style.display = "nont";
			searchList.style.display = "none";
			break;
	}
	searchLabel.style.display = "inline";
	searchPanel.style.display = "block";

	if (type_changed)
	{
		if (choiceList == null)
		{
			searchText.style.display = "inline";
			searchList.style.display = "none";
		}
		else
		{
			searchText.style.display = "none";
			searchList.style.display = "inline";
			while (searchList.length > 0) searchList.remove(0);
			for (let j = 0; j < choiceList.length; j++)
			{
				var option = document.createElement("option");
				option.text = choiceList[j][0].toUpperCase() + choiceList[j].substring(1);
				searchList.add(option);
			}
			searchList.selectedIndex = -1;
		}
	}

    if (choiceList)
	{
		search = searchList.value.toLowerCase();
	}
	else
	{
		search = searchText.value.toLowerCase();
	}

	if (search == null || search == "")
	{
        plantlistpane.innerHTML = "";
		return;
	}
    for (var i = 0; i < plants.length; i++) {
        
        plants[i].display = true;

        var hasntAnimal = true;
        var hasntAnimalRep = true;
        var hasntSun = true;

        switch (searchType) {
            case "type":
                if (!(plants[i].type.toLowerCase().includes(search) || searchType === null)) {
                    plants[i].display = false;
                }
				
                break;

            case "animal attraction":
                for (var j = 0; j < plants[i].animals_attracted.length; j++) {
                    if (plants[i].animals_attracted[j].toLowerCase().includes(search)) {
                        hasntAnimal = false;
                        break;
                    }
                }

                if (hasntAnimal) plants[i].display = false;
                break;

            case "animal repulsion":
                for (var j = 0; j < plants[i].animals_repelled.length; j++) {
                    if (plants[i].animals_repelled[j].toLowerCase().includes(search)) {
                        hasntAnimalRep = false;
                        break;
                    }
                }
                if (hasntAnimalRep) plants[i].display = false;
                break;

            case "sun":
                for (var j = 0; j < plants[i].sun.length; j++) {
                    if (plants[i].sun[j].toLowerCase().includes(search)) {
                        hasntSun = false;
                        break;
                    }
                }
                if (hasntSun) plants[i].display = false;
                break;

            case "soil":
                if (!(plants[i].soiltype.toLowerCase().includes(search) || searchType === null)) {
                    plants[i].display = false;
                }
                break;

            case "size":
                var searchNum = parseFloat(search);
                if (isNaN(searchNum) || !((plants[i].size[0] <= searchNum && plants[i].size[1] >= searchNum) || searchType === null)) {
                    plants[i].display = false;
                }
                break;

            case "name":
                if (searchType === null || 
					!(plants[i].name.toLowerCase().includes(search) || searchType === null) &&
                	!(plants[i].scientific_name.toLowerCase().includes(search) || searchType === null))
				{
                    plants[i].display = false;
                }
                break;
        }
    }

	var numDisplayed = 0;
    for (var i = 0; i < plants.length; i++) {
        if (plants[i].display === true) {
			numDisplayed++;
            outstr += "<p id=\"plant_" + i + "\" onClick=\"loadDetails(" + i + ");\">" + plants[i].name + "</p>";
        }
    }
    plantlistpane.innerHTML = outstr;

	if (numDisplayed == 0)
	{
		plantlistpane.style.display = "none";
	}
	else
	{
		plantlistpane.style.display = "block";
	}


    for (var i = 0; i < plants.length; i++) {
        if (plants[i].display) {
            var planti = document.getElementById("plant_" + i);
            if (planti) {
                // planti.style.borderWidth = "2px";
                // planti.style.borderColor = "black";
                // planti.style.borderStyle = "solid";
                // planti.style.backgroundColor = "white";
            }
        }
    }
}

function outmsg(msg)
{
//	var spn = document.getElementById("message");
//	spn.innerHTML += msg + "<br>";
//	spn.style.display = "block";
}

var planttypes = new Set(), suntypes = new Set(), soiltypes = new Set(), animalattracttypes = new Set(),
	animalrepeltypes = new Set();

function build_type_lists()
{
    outmsg("Building type lists.");
		
    // build plant type, sun type, soil type, animal attract type, animal repel type lists
    for (var plant of plants)
    {
		//outmsg("plant.type = " + plant.type);
    	planttypes.add(plant.type);
    	soiltypes.add(plant.soiltype);
    	for (var suntype of plant.sun)
    	{
    		suntypes.add(suntype);
    	}
    	for (let animal of plant.animals_attracted)
    	{
    		animalattracttypes.add(animal);
    	}
    	for (let animal of plant.animals_repelled)
    	{
    		animalrepeltypes.add(animal);
    	}
    }

    // convert the sets to arrays
    planttypes = Array.from(planttypes);
	outmsg("planttypes: " + planttypes);
    suntypes = Array.from(suntypes);
    soiltypes = Array.from(soiltypes);
    animalattracttypes = Array.from(animalattracttypes);
    animalrepeltypes = Array.from(animalrepeltypes);

	planttypes.sort();
	suntypes.sort();
	soiltypes.sort();
	animalattracttypes.sort();
	animalrepeltypes.sort();
    outmsg("Done.");
}

outmsg("Hi");
makeDivs();
makegridimgs();
build_type_lists();
makeplanttypelist(true);
