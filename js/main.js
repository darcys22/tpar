
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
    text.appendChild(document.createTextNode(window.payer.tradingName || window.payer.name))
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
}
function deleteContractor(index) {
  window.contractors.splice(index, 1);
  tableCreate();
  openvalidate();
}

function stripwhitecommas(str) {
  window.test = str
  if (!str || 0 === str.length) {
    return str
  } else {
    return str.toString().replace(/[\s,]+/g,'').trim(); 
  }
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function validateTPAR() {
  window.valid = true;
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
    return null;
    //var weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

    //// strip anything other than digits
    //$abn = $abn.toString().replace("/[^\d]/","");

    //// check length is 11 digits
    //if ($abn.length==11) {
        //// apply ato check method 
        //var sum = 0;
        //weights.forEach(function(weight, position) {
            //var digit = $abn[position] - (position ? 0 : 1);
            //sum += weight * digit;
        //})
				//if((sum % 89)==0){
					//return null;
				//} else {
					//return "Invalid ABN"
				//}
    //} 
		//return "ABN Length Invalid";
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
      window.errorNames.push(window.contractors[i].abn);
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
    p.appendChild(content);
    var br = document.createElement("br");
    p.appendChild(br);
    for (var property in payerErrors) {
      var content = document.createTextNode(property + ":");
      var br = document.createElement("br");
      p.appendChild(br);
      p.appendChild(content);
      for (var i in payerErrors[property]) {
        var content = document.createTextNode(i +":" + payerErrors[property][i]);
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
    var br = document.createElement("br");
    p.appendChild(content);
    p.appendChild(br);
    div.appendChild(p);
  }
  if(window.contractorErrors.length > 0) {
    window.valid = false;
    var p = document.createElement("p")                
    p.style.color = "red";
    var content = document.createTextNode("---ERRORS WITH CONTRACTOR DATA ---");
    var br = document.createElement("br");
    p.appendChild(br);
    p.appendChild(content);
    for (var i in window.contractorErrors) {
      var content = document.createTextNode("---CONTRACTOR: " + window.errorNames[i] + " ---");
      var br = document.createElement("br");
      p.appendChild(br);
      p.appendChild(content);
      for (var property in window.contractorErrors[i]) {
        var content = document.createTextNode(property + ":");
        var br = document.createElement("br");
        p.appendChild(br);
        p.appendChild(content);
        for (var j in window.contractorErrors[i][property]) {
          var content = document.createTextNode(window.contractorErrors[i][property][j]);
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
    var br = document.createElement("br");
    p.appendChild(br);
    p.appendChild(content);
    div.appendChild(p);
  }
  openfile();

}
function openfile() {
  var createbutton = document.getElementById('createbutton');
  //var reportbutton = document.getElementById('pdfbutton');
  if (window.valid) {
    createbutton.disabled = false
    createbutton.onclick = function() {createTPAR()};
    //reportbutton.disabled = false
    //reportbutton.onclick = function() {makePDF()};
  } else {
    createbutton.disabled = true
    createbutton.onclick = function(){};
    //reportbutton.disabled = true
    //reportbutton.onclick = function(){};
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
    addPayeeDataRecord(i);
  }
  addFileTotalRecord();
  download("TPAR", window.TPAR);
}

function addSupplierDataRecords() {
  //record length and identifier
  window.TPAR += "996IDENTREGISTER1"
  //ABN
  window.TPAR += window.payer.ABN
  //Run Type P = Production, T = Test
  window.TPAR += "P"
  // ReportEndDate
  window.TPAR += window.payer.endDate
  //Data Type payg withholding summaries must be E, Type of report must be A, format of report must be P
  window.TPAR += "PCM"
  //Report specification number
  window.TPAR += "FPAIVV02.0"
  //Filler
  catAlphanumeric(946, " ");
  window.TPAR += "\r\n";
  //record length and identifier
  window.TPAR += "996IDENTREGISTER2"
  //SupplierName
  catAlphanumeric(200, window.payer.name);
  //Supplier Contact Name
  catAlphanumeric(38, window.payer.contactName);
  //Supplier Number
  catAlphanumeric(15, window.payer.contactNumber);
  //Filler
  catAlphanumeric(15 + 16 + 695, " ");
  window.TPAR += "\r\n";
  //record length and identifier
  window.TPAR += "996IDENTREGISTER3"
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
  catAlphanumeric(643, "  ");
  window.TPAR += "\r\n";

}

function addPayerIdentityDataRecord() {
  //record length and identifier
  window.TPAR += "996IDENTITY"
  //ABN
  window.TPAR += window.payer.ABN
  //ABN Branch Number
  catNumeric(3,window.payer.ABNBranch);
  //Financial Year
  catNumeric(4,window.payer.financialYear);
  //Payer Name
  catAlphanumeric(200, window.payer.name);
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
  catAlphanumeric(15 + 76 + 293, "  ");
  window.TPAR += "\r\n";
}


function addSoftwareDataRecord() {
  //record length and identifier
  window.TPAR += "996SOFTWARE"
  //Software product Type
  catAlphanumeric(80, "COMMERCIAL Sean Darcy DarcyFinancial www.taxablepayments.com.au TPARCreator 1");
  //Filler
  catAlphanumeric(905, "  ");
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
  catAlphanumeric(20, "  ");
  //Period Start
  catDate(window.contractors[arrayPosition].periodStart);
  //Period End
  catDate(window.contractors[arrayPosition].periodEnd);
  //Tax Withheld
  catNumeric(8, window.contractors[arrayPosition].taxWithheld);
  //Gross Payments
  catNumeric(8, window.contractors[arrayPosition].grossPayments);
  //Total Allowances
  catNumeric(8, window.contractors[arrayPosition].allowances);
  //Lumpsum A
  catNumeric(8, window.contractors[arrayPosition].lumpsumA);
  //Lumpsum B
  catNumeric(8, window.contractors[arrayPosition].lumpsumB);
  //Lumpsum D
  catNumeric(8, window.contractors[arrayPosition].lumpsumD);
  //Lumpsum E
  catNumeric(8, window.contractors[arrayPosition].lumpsumE);
  //Community Development Employment Project
  catNumeric(8, 0);
  //Filler
  catNumeric(8, 0);
  //Reportable Fringe benefit
  catNumeric(8, window.contractors[arrayPosition].fb);
  //Amendment Indicator
  window.TPAR += "O"
  //Reportable Employer Superannuation Contributions
  catNumeric(8, window.contractors[arrayPosition].superSGC);
  //Lump Sum A type
  catAlphanumeric(1, window.contractors[arrayPosition].lumpsumAtype);
  //Workplace Giving
  catNumeric(8, window.contractors[arrayPosition].workplaceGiving);
  //Union Fees
  catNumeric(8, window.contractors[arrayPosition].union);
  //Exempt foreign employment income
  catNumeric(8, window.contractors[arrayPosition].foreign);
  //Annuity Return of Capital
  catNumeric(8, window.contractors[arrayPosition].annuity);
  //FBT Exemption
  catAlphanumeric(1, window.contractors[arrayPosition].fbtExempt);
  //Filler
  catAlphanumeric(274, "  ");
  window.TPAR += "\r\n";
}

function addFileTotalRecord() {
  //record length and identifier
  window.TPAR += "996FILE-TOTAL"
  //Annuity Return of Capital
  catNumeric(8, window.contractors.length + 6);
  //Filler
  catAlphanumeric(975, "  ");
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
        td.appendChild(document.createTextNode("$" + moneyNumber(window.contractors[i].taxWithheld)));
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

$('.dropDownListItem').click(function(e) {
    var element = document.getElementById('exemptfbt');
    var name = e.currentTarget;
    if (name.getAttribute("data-name") == "E") {
      window.excluded = "Y"
      element.innerHTML = "E<span class='caret'></span>"
    } else {
      element.innerHTML = "N<span class='caret'></span>"
      window.excluded = "N"
    }
});
function makePDF() {
  var background = new Image;
  background.src = 'background.jpg';
  window.doc = new jsPDF()
  background.onload = function() {
    for(var i = 0; i < window.contractors.length; i++) {
      if(i > 0) window.doc.addPage();
      window.doc.addImage(background, 'JPEG', 0, 0,210,297);
      window.doc.setFontSize(10)
      rightText(moneyNumber(window.contractors[i].taxWithheld), 185, 99)
      rightText(moneyNumber(window.contractors[i].lumpsumA), 175, 115)
      window.doc.text(188, 115, window.contractors[i].lumpsumAtype);
      rightText(moneyNumber(window.contractors[i].lumpsumB), 175, 125)
      rightText(moneyNumber(window.contractors[i].lumpsumD), 175, 135)
      rightText(moneyNumber(window.contractors[i].lumpsumE), 175, 145)
      rightText(moneyNumber(window.contractors[i].grossPayments), 109, 115)
      rightText("0", 109, 125)
      rightText(moneyNumber(window.contractors[i].fb), 109, 135)
      rightText(moneyNumber(window.contractors[i].superSGC), 109, 145)
      rightText(moneyNumber(window.contractors[i].allowances), 109, 155)
      window.doc.text(61, 27, 'Payment summary for the year ended 30 June ' + window.payer.financialYear);
      var arr = [ window.contractors[i].name + " " + window.contractors[i].surname, window.contractors[i].address, window.contractors[i].suburb, window.contractors[i].state + ' ' + window.contractors[i].postcode];
      if (window.contractors[i].address2.length > 0 && window.contractors[i].address2.trim()) {
        arr.splice(2, 0, window.contractors[i].address2);
      }
      window.doc.text(25, 48, arr);
      window.doc.text(84, 88,window.contractors[i].periodStart);
      window.doc.text(133, 88,window.contractors[i].periodEnd);
      window.doc.text(56, 100,(formatcomma(window.contractors[i].TFN)));
      window.doc.text(81, 261, (formatcomma(window.payer.ABN)));
      window.doc.text(160, 261, window.payer.ABNBranch);
      window.doc.text(40, 268, window.payer.name);
      window.doc.text(65, 278, window.payer.contactName);
      window.doc.text(160, 278, moment().format('Do MMMM YYYY'));
    }
    window.doc.save('PaymentSummary.pdf')
  };

}
var rightText = function(text, x, y) {
    var textWidth = window.doc.getStringUnitWidth(text) * window.doc.internal.getFontSize() / window.doc.internal.scaleFactor;
    var textOffset = (x - textWidth);
    window.doc.text(textOffset, y, text);
}

function main() {
  //window.contractors = [];
  window.contractors = [{"name":"","tradingName":"Something","secondName":"","surname":"","abn":"11 111 111 111","address":"123 fake street","address2":"","suburb":"Alb","state":"NSW","postcode":"2640","taxWithheld":"0","grossPayments":"0","gst":"0","amendment":"O"}];
  //window.payer = {};
  window.payer = {"businessName":"Something","tradingName":"","ABN":"11111111111","ABNBranch":"001","contactName":"Sean","contactNumber":"1012021","address":"383 woodstock court east albury","address2":"","suburb":"Albury","state":"NSW","postcode":"2640","financialYear":"2017","endDate":"30062017"};
  // remove table create and validate after defaults back to blank
		tableCreate();
    openvalidate();
  window.now = moment();
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
