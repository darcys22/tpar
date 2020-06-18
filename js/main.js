function handleFiles(event) {

  var file = event.target.files[0];

  Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        window.contractors.push.apply(window.contractors,formatupload(results.data));
        tableCreate();
        openvalidate();
      }
  });
}

function handlejpFiles(event) {

  var file = event.target.files[0];

  Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        window.contractors.push.apply(window.contractors,formatupload(formatjpresults(results.data)));
        tableCreate();
        openvalidate();
      }
  });
}

function addStrings(str1, str2) {
  num1 = parseFloat(str1);
  num2 = parseFloat(str2);
  added = num1 + num2;

  return added.toString();
}

function removeDuplicates(arr) {
  var valuesSoFar = [];
  var abnsSoFar = [];
  var duplicateindex = [];
  for (var i = 0; i < arr.length; ++i) {
    var value = arr[i];
    var index = abnsSoFar.indexOf(value.abn);
    if (index !== -1) {
      window.loggingstring += "Merging Duplicate Contractor: " + value.abn + " - " + value.businessName + " " + value.name + "\n";
      window.loggingstring += "Gross Payments: " + arr[index].grossPayments + " + " + arr[i].grossPayments + " = " + addStrings(arr[index].grossPayments, arr[i].grossPayments) + "\n";
      window.loggingstring += "GST: " + arr[index].gst + " + " + arr[i].gst + " = " + addStrings(arr[index].gst, arr[i].gst) + "\n";
      window.loggingstring += "Tax Withheld: " + arr[index].taxWithheld + " + " + arr[i].taxWithheld + " = " + addStrings(arr[index].taxWithheld , arr[i].taxWithheld ) + "\n\n";
      duplicateindex.push(i);
      arr[index].grossPayments = addStrings(arr[index].grossPayments, arr[i].grossPayments);
      arr[index].gst = addStrings(arr[index].grossPayments, arr[i].gst);
      arr[index].taxWithheld = addStrings(arr[index].taxWithheld, arr[i].taxWithheld);
        
    }
    valuesSoFar.push(value);
    abnsSoFar.push(value.abn);
  }

  var x = valuesSoFar.filter((item, index) => 
    !duplicateindex.includes(index)
  );

  return x;
}


function formatupload(original) {

  arr = removeDuplicates(original);

  for (var i in arr) {
    arr[i].businessName = replaceAll(arr[i].businessName,"&","and")
    arr[i].businessName = replaceAll(arr[i].businessName,"\\+","and")
    arr[i].businessName = replaceAll(arr[i].businessName,"/"," ")
    arr[i].businessName = replaceAll(arr[i].businessName,"-"," ")
    arr[i].businessName = replaceAll(arr[i].businessName,"'","")
    arr[i].businessName = replaceAll(arr[i].businessName,"\\(","")
    arr[i].businessName = replaceAll(arr[i].businessName,"\\)","")
    arr[i].businessName = replaceAll(arr[i].businessName,",","")
    arr[i].businessName = replaceAll(arr[i].businessName,"\\.","")
    arr[i].businessName = replaceAll(arr[i].businessName,"\\_"," ")
    arr[i].businessName = replaceAll(arr[i].businessName,":","")

    arr[i].name = replaceAll(arr[i].name,"&","and")
    arr[i].name = replaceAll(arr[i].name,"\\+","and")
    arr[i].name = replaceAll(arr[i].name,"/"," ")
    arr[i].name = replaceAll(arr[i].name,"-"," ")
    arr[i].name = replaceAll(arr[i].name,"'","")
    arr[i].name = replaceAll(arr[i].name,"\\(","")
    arr[i].name = replaceAll(arr[i].name,"\\)","")
    arr[i].name = replaceAll(arr[i].name,",","")
    arr[i].name = replaceAll(arr[i].name,"\\.","")
    arr[i].name = replaceAll(arr[i].name,"\\_"," ")
    arr[i].name = replaceAll(arr[i].name,":","")

    arr[i].tradingName = replaceAll(arr[i].tradingName,"&","and")
    arr[i].tradingName = replaceAll(arr[i].tradingName,"\\+","and")
    arr[i].tradingName = replaceAll(arr[i].tradingName,"/"," ")
    arr[i].tradingName = replaceAll(arr[i].tradingName,"-"," ")
    arr[i].tradingName = replaceAll(arr[i].tradingName,"'","")
    arr[i].tradingName = replaceAll(arr[i].tradingName,"\\(","")
    arr[i].tradingName = replaceAll(arr[i].tradingName,"\\)","")
    arr[i].tradingName = replaceAll(arr[i].tradingName,",","")
    arr[i].tradingName = replaceAll(arr[i].tradingName,"\\.","")
    arr[i].tradingName = replaceAll(arr[i].tradingName,"\\_","")
    arr[i].tradingName = replaceAll(arr[i].tradingName,":","")

    arr[i].secondName = replaceAll(arr[i].secondName,"&","and")
    arr[i].secondName = replaceAll(arr[i].secondName,"\\+","and")
    arr[i].secondName = replaceAll(arr[i].secondName,"/"," ")
    arr[i].secondName = replaceAll(arr[i].secondName,"-"," ")
    arr[i].secondName = replaceAll(arr[i].secondName,"'","")
    arr[i].secondName = replaceAll(arr[i].secondName,"\\(","")
    arr[i].secondName = replaceAll(arr[i].secondName,"\\)","")
    arr[i].secondName = replaceAll(arr[i].secondName,",","")
    arr[i].secondName = replaceAll(arr[i].secondName,"\\.","")
    arr[i].secondName = replaceAll(arr[i].secondName,"\\_","")
    arr[i].secondName = replaceAll(arr[i].secondName,":","")

    arr[i].surname = replaceAll(arr[i].surname,"&","and")
    arr[i].surname = replaceAll(arr[i].surname,"\\+","and")
    arr[i].surname = replaceAll(arr[i].surname,"/"," ")
    arr[i].surname = replaceAll(arr[i].surname,"-"," ")
    arr[i].surname = replaceAll(arr[i].surname,"'","")
    arr[i].surname = replaceAll(arr[i].surname,"\\(","")
    arr[i].surname = replaceAll(arr[i].surname,"\\)","")
    arr[i].surname = replaceAll(arr[i].surname,",","")
    arr[i].surname = replaceAll(arr[i].surname,"\\.","")
    arr[i].surname = replaceAll(arr[i].surname,"\\_","")
    arr[i].surname = replaceAll(arr[i].surname,":","")

    arr[i].address = replaceAll(arr[i].address,"&","and")
    arr[i].address = replaceAll(arr[i].address,"\\+","and")
    arr[i].address = replaceAll(arr[i].address,"/"," ")
    arr[i].address = replaceAll(arr[i].address,"-"," ")
    arr[i].address = replaceAll(arr[i].address,"'","")
    arr[i].address = replaceAll(arr[i].address,"\\(","")
    arr[i].address = replaceAll(arr[i].address,"\\)","")
    arr[i].address = replaceAll(arr[i].address,",","")
    arr[i].address = replaceAll(arr[i].address,"\\.","")
    arr[i].address = replaceAll(arr[i].address,"\\_","")
    arr[i].address = replaceAll(arr[i].address,":","")

    arr[i].address2 = replaceAll(arr[i].address2,"&","and")
    arr[i].address2 = replaceAll(arr[i].address2,"\\+","and")
    arr[i].address2 = replaceAll(arr[i].address2,"/"," ")
    arr[i].address2 = replaceAll(arr[i].address2,"-"," ")
    arr[i].address2 = replaceAll(arr[i].address2,"'","")
    arr[i].address2 = replaceAll(arr[i].address2,"\\(","")
    arr[i].address2 = replaceAll(arr[i].address2,"\\)","")
    arr[i].address2 = replaceAll(arr[i].address2,",","")
    arr[i].address2 = replaceAll(arr[i].address2,"\\.","")
    arr[i].address2 = replaceAll(arr[i].address2,"\\_","")
    arr[i].address2 = replaceAll(arr[i].address2,":","")

    arr[i].suburb = replaceAll(arr[i].suburb,"&","and")
    arr[i].suburb = replaceAll(arr[i].suburb,"\\+","and")
    arr[i].suburb = replaceAll(arr[i].suburb,"/"," ")
    arr[i].suburb = replaceAll(arr[i].suburb,"-"," ")
    arr[i].suburb = replaceAll(arr[i].suburb,"'","")
    arr[i].suburb = replaceAll(arr[i].suburb,"\\(","")
    arr[i].suburb = replaceAll(arr[i].suburb,"\\)","")
    arr[i].suburb = replaceAll(arr[i].suburb,",","")
    arr[i].suburb = replaceAll(arr[i].suburb,"\\.","")
    arr[i].suburb = replaceAll(arr[i].suburb,"\\_","")
    arr[i].suburb = replaceAll(arr[i].suburb,":","")

    arr[i].state = replaceAll(arr[i].state,"&","and")
    arr[i].state = replaceAll(arr[i].state,"\\+","and")
    arr[i].state = replaceAll(arr[i].state,"/"," ")
    arr[i].state = replaceAll(arr[i].state,"-"," ")
    arr[i].state = replaceAll(arr[i].state,"'","")
    arr[i].state = replaceAll(arr[i].state,"\\(","")
    arr[i].state = replaceAll(arr[i].state,"\\)","")
    arr[i].state = replaceAll(arr[i].state,",","")
    arr[i].state = replaceAll(arr[i].state,"\\.","")
    arr[i].state = replaceAll(arr[i].state,"\\_","")
    arr[i].state = replaceAll(arr[i].state,":","")
  }

  return arr;
}

function replaceAll(str, find, replace) {
  if (!str || 0 === str.length) {
    return str
  } else {
    return str.replace(new RegExp(find, 'g'), replace);
  }
}

function formatjpresults(arr) {

  //contractors = [];
  ctrs = arr.map(line => ({
      businessName: line.OrganisationalName,
      name: line.GivenName.split(' ').slice(0, -1).join(' '),
      tradingName: "",
      secondName: line.GivenName.split(' ').slice(-1).join(' '),
      surname: line.FamilyName,
      abn: line.ABN,
      address: line.Line1,
      address2: line.Line2,
      suburb: line.LocalityName,
      state: line.StateOrTerritory,
      postcode: line.Postcode,
      taxWithheld: ((line.IncomeTaxPayAsYouGoWithholdingTaxWithheldAmount) ? stripCents(line.IncomeTaxPayAsYouGoWithholdingTaxWithheldAmount) : "0"),
      grossPayments: ((line.BusinessPaymentGrossAmount) ? stripCents(line.BusinessPaymentGrossAmount) : "0"),
      gst: ((line.GoodsAndServicesTaxLiabilityAmount) ? stripCents(line.GoodsAndServicesTaxLiabilityAmount) : "0"),
      amendment: ((line.Amendment) ? "A":"O")
  }));
  return ctrs;
}

$(function(){
    $("#upload_link").on('click', function(e){
            e.preventDefault();
            $("#upload:hidden").trigger('click');
        });
});

$(function(){
    $("#jpupload_link").on('click', function(e){
            e.preventDefault();
            $("#jpupload:hidden").trigger('click');
        });
});

$('#addContractor').validator().on('submit', function (e) {
  if (e.isDefaultPrevented()) {
    // handle the invalid form...
  } else {
    e.preventDefault();
		window.contractors.push($('#addContractor').serializeObject());
		$('#addContractor')[0].reset();
		$("#fybox").val(window.endFY.format("YYYY"));
		tableCreate();
    $('#contractorModal').modal('toggle');
    openvalidate();
  }
})
$('#payer_form').validator().on('submit', function (e) {
  if (e.isDefaultPrevented()) {
    // handle the invalid form...
  } else {
    e.preventDefault();
    editPayer();
    $('#payerModal').modal('toggle');
  }
})
$('#payerModal').on('hidden.bs.modal', function () {
    editPayer();
})
function editPayer() {
    window.payer = $('#payer_form').serializeObject();
    var payerheading = document.getElementById('payername');
    payerheading.innerHTML = '';
    var text = document.createElement('small');
    text.appendChild(document.createTextNode(window.payer.tradingName || window.payer.businessName))
    text.appendChild(document.createTextNode( " - " + window.payer.ABN));
    payerheading.appendChild(text);
    openvalidate();
}
function openvalidate() {
  var validatebutton = document.getElementById('convert');
  if (window.contractors.length > 0 && !jQuery.isEmptyObject(window.payer)) {
    validatebutton.title = "Validate before creating TPAR File"
    validatebutton.disabled = false
    validatebutton.onclick = function() {validateTPAR()};
  } else {
    validatebutton.title = "Please add a Contractor and Payer details to create file"
    validatebutton.disabled = true
    validatebutton.onclick = function(){};
  }
}
function editContractor(index) {
  var contractor = window.contractors[index];
  deleteContractor(index) 
  for (var key in contractor) {
    try {
      document.getElementById("addContractor").elements[key].value = contractor[key]
    } catch(err){
    }
  }
  $("#contractorModal").modal() 
  //$('#addContractor').validator()

}
function deleteContractor(index) {
  window.contractors.splice(index, 1);
  tableCreate();
  openvalidate();
}

function stripwhitecommas(str) {
  if (!str || 0 === str.length) {
    return str
  } else {
    return str.toString().replace(/[\s,]+/g,'').trim(); 
  }
}

function stripCents(str) {
  if (!str || 0 === str.length) {
    return str
  } else {
    if (str.indexOf('.') !== -1) {
      str = str.substring(0, str.indexOf('.'));
    }
    return str.replace(/[^0-9,]|,[0-9]*$/,''); 
  }
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function validateTPAR() {
  window.valid = true;
  window.loggingfile = window.loggingstring;
  window.loggingfile += "Validator: \n\n";
  numb = ['ABN']
  for (var key in window.payer) {
      if(window.payer[key].trim)
         window.payer[key] = window.payer[key].trim(); 
  }
  for (var i in numb) {
    window.payer[numb[i]] = stripwhitecommas(window.payer[numb[i]]);
  }
  window.payer.endDate = "3006" + window.payer.financialYear;
  if (!window.payer.ABNBranch || !window.payer.ABNBranch.length) window.payer.ABNBranch = "001";



	validate.validators.abn = function($abn, options, key, attributes) {
    //return null;
    var weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

    // strip anything other than digits
    $abn = $abn.toString().replace("/[^\d]/","");

    // check length is 11 digits
    if ($abn.length==11) {
        // apply ato check method 
        var sum = 0;
        weights.forEach(function(weight, position) {
            var digit = $abn[position] - (position ? 0 : 1);
            sum += weight * digit;
        })
        if((sum % 89)==0){
          return null;
        } else {
          return "Invalid ABN"
        }
    } 
    return "ABN Length Invalid";
	};

  validate.validators.nameExists = function(payments, options, key, attributes) {
    //if (window.contractors[options].taxWithheld > (window.contractors[options].grossPayments + window.contractors[options].allowances + window.contractors[options].lumpSumA + (window.contractors[options].lumpSumB * 0.05) + window.contractors[options].lumpSumE)) {
      //return "The Total tax withheld field is greater than the sum of Gross payments field + Total allowances field + Lump sum payment A field + 5% of the Lump sum payment B field + Lump sum payment E field + Community Development Employment Projects payments field.";
    //}
    return null;
  };

	validate.validators.customdate = function(value, options, key, attributes) {
    if(moment(value,["Do MMMM YYYY","DDMMYYYY"]).isValid()){
      return null;
    } else {
      return "Invalid Date"
    }
	};

  var payerConstraints = {
    ABN: {
      presence: true,
			abn: true,
      length: {
        maximum: 11
      },
      format: {
        pattern: "[0-9]+",
        message: "can only contain 0-9"
      }
    },
    ABNBranch: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 3
      },
      format: {
        pattern: "[0-9]+",
        message: "can only contain 0-9"
      }
    },
    financialYear: {
      presence: true,
      length: {
        minimum: 4,
        maximum: 4
      },
      format: {
        pattern: "[0-9]+",
        message: "can only contain 0-9"
      }
    },
    endDate: {
      presence: true,
      customdate: true
    },
    businessName: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 200
      },
      format: {
        pattern: "\[a-z0-9\x20]+$",
        flags: "i",
        message: "can only contain a-z and 0-9"
      }
    },
    contactName: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 38
      },
      format: {
        pattern: "\[a-z0-9\x20]+$",
        flags: "i",
        message: "can only contain a-z and 0-9"
      }
    },
    contactNumber: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 15
      },
      format: {
        pattern: "[0-9]+",
        message: "can only contain 0-9"
      }
    },
    tradingName: {
      length: {
        minimum: 3,
        maximum: 200
      },
      format: {
        pattern: "\[a-z0-9\x20]+$",
        flags: "i",
        message: "can only contain a-z and 0-9"
      }
    },
    address: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 38
      },
      format: {
        pattern: "\[a-z0-9\x20]+$",
        flags: "i",
        message: "can only contain a-z and 0-9 and space"
      }
    },
    address2: {
      length: {
        minimum: 3,
        maximum: 38
      },
      format: {
        pattern: "\[a-z0-9\x20]+$",
        flags: "i",
        message: "can only contain a-z and 0-9 and space"
      }
    },
    suburb: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 27
      },
      format: {
        pattern: "\[a-z\x20]+$",
        flags: "i",
        message: "can only contain a-z"
      }
    },
    state: {
      presence: true,
      length: {
        minimum: 2,
        maximum: 3
      },
      format: {
        pattern: "[A-Z]+",
        message: "can only contain A-Z"
      }
    },
    postcode: {
      format: {
        pattern: "\\d{4}"
      }
    }
  };
  var payerErrors = validate(window.payer, payerConstraints)

  contractornumb = ['abn','grossPayments','taxWithheld','gst',
    ]
  

  var contractorConstraints = {
    abn: {
      presence: true,
			abn: true,
      length: {
        minimum: 11,
      },
      format: {
        pattern: "[0-9]+",
        message: "can only contain 0-9"
      }
    },
    taxWithheld: {
      format: {
        pattern: "^[0-9]{0,8}$"
      }
    },
    grossPayments: {
      format: {
        pattern: "^[0-9]{0,8}$"
      }
    },
    gst: {
      format: {
        pattern: "^[0-9]{0,8}$"
      }
    },
    businessName: {
      length: {
        minimum: 3,
        maximum: 200
      },
      format: {
        pattern: "\[a-z0-9\x20]+$",
        flags: "i",
        message: "can only contain a-z and 0-9"
      }
    },
    tradingName: {
      length: {
        minimum: 3,
        maximum: 200
      },
      format: {
        pattern: "\[a-z0-9\x20]+$",
        flags: "i",
        message: "can only contain a-z and 0-9"
      }
    },
    name: {
      length: {
        minimum: 3,
        maximum: 200
      },
      format: {
        pattern: "[a-z0-9]+",
        flags: "i",
        message: "can only contain a-z and 0-9"
      }
    },
    secondName: {
      length: {
        minimum: 3,
        maximum: 200
      },
      format: {
        pattern: "[a-z0-9]+",
        flags: "i",
        message: "can only contain a-z and 0-9"
      }
    },
    surname: {
      length: {
        minimum: 3,
        maximum: 38
      },
      format: {
        pattern: "[a-z0-9]+",
        flags: "i",
        message: "can only contain a-z and 0-9"
      }
    },
    address: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 38
      },
      format: {
        pattern: "\[a-z0-9\x20]+$",
        flags: "i",
        message: "can only contain a-z and 0-9 and space"
      }
    },
    address2: {
      length: {
        minimum: 3,
        maximum: 38
      },
      format: {
        pattern: "\[a-z0-9\x20]+$",
        flags: "i",
        message: "can only contain a-z and 0-9 and space"
      }
    },
    suburb: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 27
      },
      format: {
        pattern: "\[a-z\x20]+$",
        flags: "i",
        message: "can only contain a-z"
      }
    },
    state: {
      presence: true,
      length: {
        minimum: 2,
        maximum: 3
      },
      format: {
        pattern: "[A-Z]+",
        message: "can only contain A-Z"
      }
    },
    postcode: {
      format: {
        pattern: "\\d{4}"
      }
    }
  };

  window.contractorErrors = []
  window.errorNames = []
  for (var i in window.contractors) {
    for (var j in contractornumb) {
      window.contractors[i][contractornumb[j]] = stripwhitecommas(window.contractors[i][contractornumb[j]]);
    }

    for (var key in window.contractors[i]) {
        if(window.contractors[i][key].trim)
           window.contractors[i][key] = window.contractors[i][key].trim(); 
    }

    var errors = validate(window.contractors[i], contractorConstraints);
    if (errors) {
      window.contractorErrors.push(errors)
      var errorName = ""
      if (window.contractors[i].abn) {
        errorName += window.contractors[i].abn + " - ";
      } 
      if (window.contractors[i].businessName) {
        errorName += window.contractors[i].businessName;
      } else {
        errorName += window.contractors[i].surname;
      }

      window.errorNames.push(errorName);
    }
  }

  $('#console').empty();
  $("#validateModal").modal() 
  var div = document.getElementById('console');
  if(payerErrors) {
    window.valid = false;
    var p = document.createElement("p")                
    p.style.color = "red";
    var content = document.createTextNode("---ERRORS WITH PAYER DATA ---");
    window.loggingfile += "---ERRORS WITH PAYER DATA ---\n\n";
    p.appendChild(content);
    var br = document.createElement("br");
    p.appendChild(br);
    for (var property in payerErrors) {
      var content = document.createTextNode(property + ":");
      window.loggingfile += property + ":\n";
      var br = document.createElement("br");
      p.appendChild(br);
      p.appendChild(content);
      for (var i in payerErrors[property]) {
        var content = document.createTextNode(i +":" + payerErrors[property][i]);
        window.loggingfile += i +":" + payerErrors[property][i] + "\n";
        var br = document.createElement("br");
        p.appendChild(br);
        p.appendChild(content);
      }
    }
    div.appendChild(p);
  } else {
    var p = document.createElement("p")                
    p.style.color = "green";
    var content = document.createTextNode("---PAYER DATA VALID---");
    window.loggingfile +="---PAYER DATA VALID---"+"\n"
    p.appendChild(content);
    var br = document.createElement("br");
    p.appendChild(br);
    div.appendChild(p);
  }
  if(window.contractorErrors.length > 0) {
    window.valid = false;
    var p = document.createElement("p")                
    p.style.color = "red";
    var content = document.createTextNode("---ERRORS WITH CONTRACTOR DATA ---");
    window.loggingfile +="---ERRORS WITH CONTRACTOR DATA ---"+"\n"
    var br = document.createElement("br");
    p.appendChild(br);
    p.appendChild(content);
    for (var i in window.contractorErrors) {
      var content = document.createTextNode("---CONTRACTOR: " + window.errorNames[i] + " ---");
      window.loggingfile +="---CONTRACTOR: " + window.errorNames[i] + " ---"+"\n"
      var br = document.createElement("br");
      p.appendChild(br);
      p.appendChild(content);
      for (var property in window.contractorErrors[i]) {
        var content = document.createTextNode(property + ":");
        window.loggingfile +=property + ":"+"\n"
        var br = document.createElement("br");
        p.appendChild(br);
        p.appendChild(content);
        for (var j in window.contractorErrors[i][property]) {
          var content = document.createTextNode(window.contractorErrors[i][property][j]);
          window.loggingfile +=window.contractorErrors[i][property][j]+"\n"
          var br = document.createElement("br");
          p.appendChild(br);
          p.appendChild(content);
        }
      }
    }
    div.appendChild(p);
  } else {
    var p = document.createElement("p")                
    p.style.color = "green";
    var content = document.createTextNode("---CONTRACTOR DATA VALID---");
    window.loggingfile +="---CONTRACTOR DATA VALID---"+"\n"
    var br = document.createElement("br");
    p.appendChild(br);
    p.appendChild(content);
    div.appendChild(p);
  }
  openfile();

}
function openfile() {
  var createbutton = document.getElementById('createbutton');
  var databutton = document.getElementById('databutton');
  if (window.valid) {
    createbutton.disabled = false
    createbutton.onclick = function() {createTPAR()};
    databutton.disabled = false
    databutton.onclick = function() {makeJSON()};
  } else {
    createbutton.disabled = true
    createbutton.onclick = function(){};
    //reportbutton.disabled = true
    //reportbutton.onclick = function(){};
    databutton.disabled = true
    databutton.onclick = function(){};
  }
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function createTPAR() {
  window.TPAR = "";
  addSupplierDataRecords();
  addPayerIdentityDataRecord();
  addSoftwareDataRecord();
  for (var i = 0; i < window.contractors.length; i++) {
    addPayeeDataRecordv1(i);
  }
  addFileTotalRecord();
  download("TPAR", window.TPAR);
}

function makeJSON() {
  window.JSONFile = {Payer: window.payer, Contractors: window.contractors };
  var text = JSON.stringify(window.JSONFile, null, '\t');
  download("TPARData.txt", text);
}

function makeLog() {
  download("Logfile.txt", window.loggingfile);
}

function addSupplierDataRecords() {
  //record length and identifier
  window.TPAR += "704IDENTREGISTER1"
  //ABN
  window.TPAR += window.payer.ABN
  //Run Type P = Production, T = Test
  window.TPAR += "P"
  // ReportEndDate
  window.TPAR += window.payer.endDate
  //Data Type payg withholding summaries must be E, Type of report must be A, format of report must be P
  window.TPAR += "PCM"
  //Report specification number
  window.TPAR += "FPAIVV01.0"
  //Filler
  catAlphanumeric(654, " ");
  window.TPAR += "\r\n";
  //record length and identifier
  window.TPAR += "704IDENTREGISTER2"
  //SupplierName
  catAlphanumeric(200, window.payer.businessName);
  //Supplier Contact Name
  catAlphanumeric(38, window.payer.contactName);
  //Supplier Number
  catAlphanumeric(15, window.payer.contactNumber);
  //Filler
  catAlphanumeric(15 + 16 + 403, " ");
  window.TPAR += "\r\n";
  //record length and identifier
  window.TPAR += "704IDENTREGISTER3"
  //Supplier street address
  catAlphanumeric(38,window.payer.address);
  catAlphanumeric(38,window.payer.address2);
  //Supplier suburb
  catAlphanumeric(27, window.payer.suburb);
  //Supplier state
  catAlphanumeric(3, window.payer.state);
  //Supplier postcode
  catNumeric(4, window.payer.postcode);
  //Supplier country (blank for Aus) 
  catAlphanumeric(20, "  ");
  //Supplier postal add 
  catAlphanumeric(38 + 38 + 27 + 3, "  ");
  catNumeric(4,0);
  catAlphanumeric(20, "  ");
  //Supplier email
  catAlphanumeric(76, "  ");
  //Filler
  catAlphanumeric(351, "  ");
  window.TPAR += "\r\n";

}

function addPayerIdentityDataRecord() {
  //record length and identifier
  window.TPAR += "704IDENTITY"
  //ABN
  window.TPAR += window.payer.ABN
  //ABN Branch Number
  catNumeric(3,window.payer.ABNBranch);
  //Financial Year
  catNumeric(4,window.payer.financialYear);
  //Payer Name
  catAlphanumeric(200, window.payer.businessName);
  //Payer Trading Name
  catAlphanumeric(200, window.payer.tradingName);
  //Payer street address
  catAlphanumeric(38, window.payer.address);
  catAlphanumeric(38, window.payer.address2);
  //Payer suburb
  catAlphanumeric(27, window.payer.suburb);
  //Payer state
  catAlphanumeric(3, window.payer.state);
  //Payer postcode
  catNumeric(4, window.payer.postcode);
  //Payer country (blank for Aus) 
  catAlphanumeric(20, "  ");
  //Payer Contact Name
  catAlphanumeric(38, window.payer.contactName);
  //Supplier Number
  catAlphanumeric(15, window.payer.contactNumber);
  //Filler
  catAlphanumeric(15 + 76 + 1, "  ");
  window.TPAR += "\r\n";
}


function addSoftwareDataRecord() {
  //record length and identifier
  window.TPAR += "704SOFTWARE"
  //Software product Type
  catAlphanumeric(80, "COMMERCIAL Sean Darcy DarcyFinancial www.taxablepayments.com.au TPARCreator 1");
  //Filler
  catAlphanumeric(613, "  ");
  window.TPAR += "\r\n";
}

function addPayeeDataRecordv1(arrayPosition) {
  //record length and identifier and Income type S for salary
  window.TPAR += "704DPAIVS"
  //TFN
  catNumeric(11,window.contractors[arrayPosition].abn);
  //Payee Surname
  catAlphanumeric(30, window.contractors[arrayPosition].surname);
  //Payee Name
  catAlphanumeric(15, window.contractors[arrayPosition].name);
  //Payee Second Name
  catAlphanumeric(15, window.contractors[arrayPosition].secondName);
  //Payee Name
  catAlphanumeric(200, window.contractors[arrayPosition].businessName);
  //Payee Trading Name
  catAlphanumeric(200, window.contractors[arrayPosition].tradingName);
  //Payee street address
  catAlphanumeric(38, window.contractors[arrayPosition].address);
  catAlphanumeric(38, window.contractors[arrayPosition].address2);
  //Payee suburb
  catAlphanumeric(27, window.contractors[arrayPosition].suburb);
  //Payee state
  catAlphanumeric(3, window.contractors[arrayPosition].state);
  //Payee postcode
  catNumeric(4, window.contractors[arrayPosition].postcode);
  //Payee country (blank for Aus) 
  catAlphanumeric(20, " ");
  //Payee Number
  catAlphanumeric(15, " ");
  //Payee BSB 
  catNumeric(6, " ");
  //Payee Acc # 
  catNumeric(9, " ");
  //Gross Payments
  catNumeric(11, window.contractors[arrayPosition].grossPayments);
  //Tax Withheld
  catNumeric(11, window.contractors[arrayPosition].taxWithheld);
  //GST
  catNumeric(11, window.contractors[arrayPosition].gst);
  //Amendment Indicator
  catAlphanumeric(1, window.contractors[arrayPosition].amendment);
  //Filler
  catAlphanumeric(30, "  ");
  window.TPAR += "\r\n";
}

function addPayeeDataRecord(arrayPosition) {
  //record length and identifier and Income type S for salary
  window.TPAR += "996DPAIVS"
  //TFN
  catNumeric(11,window.contractors[arrayPosition].abn);
  //Payee Surname
  catAlphanumeric(30, window.contractors[arrayPosition].surname);
  //Payee Name
  catAlphanumeric(15, window.contractors[arrayPosition].name);
  //Payee Second Name
  catAlphanumeric(15, window.contractors[arrayPosition].secondName);
  //Payee Name
  catAlphanumeric(200, window.contractors[arrayPosition].businessName);
  //Payee Trading Name
  catAlphanumeric(200, window.contractors[arrayPosition].tradingName);
  //Payee street address
  catAlphanumeric(38, window.contractors[arrayPosition].address);
  catAlphanumeric(38, window.contractors[arrayPosition].address2);
  //Payee suburb
  catAlphanumeric(27, window.contractors[arrayPosition].suburb);
  //Payee state
  catAlphanumeric(3, window.contractors[arrayPosition].state);
  //Payee postcode
  catNumeric(4, window.contractors[arrayPosition].postcode);
  //Payee country (blank for Aus) 
  catAlphanumeric(20, " ");
  //Payee Number
  catAlphanumeric(15, " ");
  //Payee BSB 
  catNumeric(6, " ");
  //Payee Acc # 
  catNumeric(9, " ");
  //Gross Payments
  catNumeric(11, window.contractors[arrayPosition].grossPayments);
  //Tax Withheld
  catNumeric(11, window.contractors[arrayPosition].taxWithheld);
  //GST
  catNumeric(11, window.contractors[arrayPosition].gst);
  //payments only no grants
  window.TPAR += "P"
  //Ignoring Grant Payments Details
  catAlphanumeric(8+200+76, " ");
  //Statement by a supplier = No
  window.TPAR += "N"
  //Amendment Indicator
  catAlphanumeric(1, window.contractors[arrayPosition].amendment);
  //Filler
  catAlphanumeric(36, "  ");
  window.TPAR += "\r\n";
}

function addFileTotalRecord() {
  //record length and identifier
  window.TPAR += "704FILE-TOTAL"
  //Annuity Return of Capital
  catNumeric(8, window.contractors.length + 6);
  //Filler
  catAlphanumeric(683, "  ");
  window.TPAR += "\r\n";
}
function catxAlphanumeric(length, text) {
  window.TPAR += padding_right(text, "x", length)
}

function catAlphanumeric(length, text) {
  window.TPAR += padding_right(text, " ", length)
}
function catDate(date) {
  window.TPAR += moment(date,["Do MMMM YYYY","DDMMYYYY"]).format('DDMMYYYY');
}
function catNumeric(length, num) {
  var n = String(num); 
  window.TPAR += padding_left(n, "0", length)
}
// left padding s with c to a total of n chars
function padding_left(s, c, n) {
  if (s == null || ! c || s.length >= n) {
    return s;
  }
  var max = (n - s.length)/c.length;
  for (var i = 0; i < max; i++) {
    s = c + s;
  }
  return s;
}
// right padding s with c to a total of n chars
function padding_right(s, c, n) {
  if (s == null || ! c || s.length >= n) {
    return s;
  }
  var max = (n - s.length)/c.length;
  for (var i = 0; i < max; i++) {
    s += c;
  }
  return s;
}

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = "";
            }
            o[this.name] = this.value || '';
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

function checkABN(str) {
    if (!str || str.length !== 11) {
        return false;
    }
    var weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
        checksum = str.split('').map(Number).reduce(
        function(total, digit, index) {
            if (!index) {
                digit--;
            }
            return total + (digit * weights[index]);
        },
        0
    );

    if (!checksum || checksum % 89 !== 0) {
        return false;
    }

    return true;
}

function formatCapitalize(element) {
  element.value = toTitleCase(element.value.toString());
}

function moneyNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function tableCreate() {
    var tbdy = document.getElementById('contractortable');
    tbdy.innerHTML = '';
    for (var i = 0; i < window.contractors.length; i++) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        var name = window.contractors[i].tradingName || window.contractors[i].businessName || window.contractors[i].name + ' ' + window.contractors[i].surname
        td.appendChild(document.createTextNode(name))
        tr.appendChild(td)
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(window.contractors[i].abn))
        tr.appendChild(td)
        var td = document.createElement('td');
        td.appendChild(document.createTextNode("$" + moneyNumber(window.contractors[i].grossPayments)));
        tr.appendChild(td)
        var td = document.createElement('td');
        td.appendChild(document.createTextNode("$" + moneyNumber(window.contractors[i].gst)));
        tr.appendChild(td)
        var td = document.createElement('td');
        var btn = document.createElement('button');
        btn.className = 'btn btn-warning';
        btn.setAttribute('data-param', i);
        btn.onclick = function () {editContractor(this.getAttribute('data-param'));}; 
        btn.innerHTML = "Edit";
        td.appendChild(btn)
        tr.appendChild(td)
        var td = document.createElement('td');
        var btn = document.createElement('button');
        btn.className = 'btn btn-danger';
        btn.setAttribute('data-param', i);
        btn.onclick = function () {deleteContractor(this.getAttribute('data-param'));}; 
        btn.innerHTML = "Delete";
        td.appendChild(btn)
        tr.appendChild(td)
        tbdy.appendChild(tr);
    }
}

function formatabntfn(element) {
  element.value = formatcomma(element.value);
}
function formatcomma(element) {
  return element.toString().replace(/ /g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function formatdate(element) {
  element.value = moment(element.value, ["DDMMYYYY","DDMMMMYYYY", "DoMMMMYYYY", "DoMMYYYY"], false).format('Do MMMM YYYY');
}

function initdates() {
}

function main() {
  window.contractors = [];
  //window.contractors = [{"businessName":"","name":"","tradingName":"Something2","secondName":"","surname":"","abn":"27191597427","address":"123 fake street","address2":"","suburb":"Alb","state":"NSW","postcode":"2640","taxWithheld":"0","grossPayments":"100","gst":"10","amendment":"O"}];
  window.payer = {};
  //window.payer = {"businessName":"Something","tradingName":"","ABN":"11223491505","ABNBranch":"001","contactName":"Sean","contactNumber":"1012021","address":"123 fake street","address2":"","suburb":"Albury","state":"NSW","postcode":"2640","financialYear":"2017","endDate":"30062017"};
  // remove table create and validate after defaults back to blank
		//tableCreate();
    //openvalidate();
  window.now = moment();
  window.loggingstring = "TaxablePayments.com.au - Log File\nDate: ";
  window.loggingstring += window.now.format('MMMM Do YYYY, h:mm:ss a'); // June 18th 2020, 1:30:48 pm
  window.loggingstring += "\n---------------------------------\n\n";
  if (window.now.month() < 6) {
    window.now.set('year', now.year() -1);
  }
  window.now.set('month', 5);
  window.now.set('date', 30);
  window.endFY = moment(window.now);
  window.startFY = moment(window.now.subtract(1, 'years').add(1,'days'));
  $("#fybox").val(window.endFY.format("YYYY"));

  initdates();

}
main();
