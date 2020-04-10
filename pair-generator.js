function generatePairSets() {

  var names = [];
  var inputValue = document.getElementById("name").value;
  if (inputValue === '') {
    alert("You must write something!");
    return;
  }

  if(inputValue.indexOf(',') !=-1){
    names = inputValue.split(',');
  } else {
    names[0] = inputValue;
  }

  var myTeam = document.getElementsByTagName("LI");
  for (i = 0; i < myTeam.length; i++) {
    names.push(myTeam[i].firstChild.textContent);
  }


  var contrainer = document.getElementById("container");
  contrainer.innerText = "";
  var table = document.createElement("TABLE");
  contrainer.appendChild(table);

  var pairs = [];
  generatePairSubSets(names, pairs, 0);
  var content = "<tr>";
  for (let i = 0; i < pairs.length; i++) {
    if(i !== 0 && i%3 === 0){
      content+= "</tr><tr>";
    }
    content+= ("<td><table><tr><td colspan='2'>Set-"+(i+1)+"</td></tr>");

    for (let j = 0; j < pairs[i].length ; j++) {
       var pairname = pairs[i][j].split(",");
       content+= ("<tr><td>"+pairname[0]+"</td><td>"+pairname[1]+"</td></tr>");
    }
    content+= ("</table></td>");
  }
  content+= ("</tr>");

  table.innerHTML = content;

}


function generatePairSubSets (names, result, pairSetCount){
  var groups = groupThePairs(names);
  for (let g = 0; g < groups.length; g++) {
    var existingElements = result[g+pairSetCount];
    if(existingElements == undefined){
      existingElements = groups[g];
    } else {
      Array.prototype.push.apply(existingElements, groups[g])
    }
    result[g+pairSetCount] = existingElements;
  }

  if(names.length>2){
    var mid = Math.floor(names.length/2);
    var firsthalf = names.slice(0, mid);
    var secondhalf = names.slice(mid, names.length);
    pairSetCount = pairSetCount + groups.length;
    generatePairSubSets(firsthalf, result, pairSetCount);
    generatePairSubSets(secondhalf,result, pairSetCount);
  }
}


function groupThePairs(names) {
 var groups = [];
 var pairs = [];
 if(names.length === 2){
    groups[0] = [names[0] + "," + names[1]];
  } if(names.length > 2){
    var mid = Math.floor((names.length)/2);
    var maxGroup = mid;
    if(names.length % 2 !== 0){
      maxGroup++;
    }
    for (let group = 0; group < maxGroup; group++) {
      for (let j = 0; j < mid; j++) {
        var nextNameIndex = mid + j+ group;
        if(nextNameIndex >= names.length){
          nextNameIndex = (nextNameIndex - names.length + mid);
        }
        pairs.push(names[j] + "," + names[nextNameIndex]);
      }
      groups[group]= pairs;
      pairs = [];
    }
  }
  return groups;
}
