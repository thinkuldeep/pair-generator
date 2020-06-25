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

  let uniqueNames = [...new Set(names)];

  var contrainer = document.getElementById("container");
  contrainer.innerText = "";
  var table = document.createElement("TABLE");
  contrainer.appendChild(table);

  var pairs = [];
  generatePairSubSets(uniqueNames, pairs, 0);

  table.innerHTML = horizontalPrint(pairs);

}

function selectElementContents(el) {
  var body = document.body, range, sel;
  if (document.createRange && window.getSelection) {
    range = document.createRange();
    sel = window.getSelection();
    sel.removeAllRanges();
    try {
      range.selectNodeContents(el);
      sel.addRange(range);
    } catch (e) {
      range.selectNode(el);
      sel.addRange(range);
    }
    document.execCommand("copy");

  } else if (body.createTextRange) {
    range = body.createTextRange();
    range.moveToElementText(el);
    range.select();
    range.execCommand("Copy");
  }
}

function horizontalPrint(pairs){
  var personSets = [];
  for (let i = 0; i < pairs.length; i++) {
    for (let j = 0; j < pairs[i].length ; j++) {
      var pairname = pairs[i][j].split(",");

      if(!personSets[pairname[0]]){
        personSets[pairname[0]] = [];
      }
      if(!personSets[pairname[1]]){
        personSets[pairname[1]] = [];
      }
      personSets[pairname[0]][i] = pairname[1]
      personSets[pairname[1]][i] = pairname[0]
    }
  }

  var content = "<tr><th>Name</th>";
  for (let i = 0; i < pairs.length; i++) {
    content += ("<th>Set "+ (i+1) +"</th>");
  }
  content += "</tr>";

  for (const name in personSets){
    content += ("<tr><th><b>"+ name +"</b></th>");
    for (let i = 0; i < pairs.length; i++) {
      content+= ("<td>"+ (personSets[name][i] ? personSets[name][i] : "") +"</td>");
    }
    content += "</tr>";
  }

  return content;
}

function verticalPrint(pairs){
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
  return content;
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
