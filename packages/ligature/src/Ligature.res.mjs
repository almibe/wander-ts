// Generated by ReScript, PLEASE EDIT WITH CARE


function element(value) {
  return {
          value: value,
          type: "element"
        };
}

var $$Element = {
  element: element
};

function networkName(value) {
  return {
          value: value,
          type: "networkName"
        };
}

var NetworkName = {
  networkName: networkName
};

function slot(value) {
  return {
          value: value,
          type: "slot"
        };
}

var Slot = {
  slot: slot
};

function literal(value) {
  return {
          value: value,
          type: "literal"
        };
}

var Literal = {
  literal: literal
};

function printElementPattern(value) {
  return value._0.value;
}

var ElementPattern = {
  printElementPattern: printElementPattern
};

function variable(value) {
  return {
          value: value,
          type: "variable"
        };
}

function printValue(v) {
  switch (v.TAG) {
    case "VQuote" :
    case "VNetworkName" :
        throw {
              RE_EXN_ID: "Match_failure",
              _1: [
                "Ligature.res",
                69,
                2
              ],
              Error: new Error()
            };
    default:
      return v._0.value;
  }
}

function triple(e, r, v) {
  return {
          element: e,
          role: r,
          value: v
        };
}

function printTriple(value) {
  return value.element._0.value + " " + value.role._0.value + " " + printValue(value.value);
}

function printValue$1(value) {
  switch (value.TAG) {
    case "Network" :
        var result = {
          contents: "{\n"
        };
        value._0.forEach(function (triple) {
              result.contents = result.contents + "  " + printTriple(triple) + ",\n";
            });
        result.contents = result.contents + "}";
        return result.contents;
    case "Element" :
    case "Slot" :
    case "Literal" :
        return value._0.value;
    default:
      throw {
            RE_EXN_ID: "Failure",
            _1: "TODO",
            Error: new Error()
          };
  }
}

function printNetwork(network) {
  var result = {
    contents: "{\n"
  };
  network.forEach(function (triple) {
        result.contents = result.contents + "  " + printTriple(triple) + ",\n";
      });
  result.contents = result.contents + "}";
  return result.contents;
}

var emptyNetworks;

export {
  $$Element ,
  NetworkName ,
  Slot ,
  Literal ,
  ElementPattern ,
  variable ,
  triple ,
  printTriple ,
  printValue$1 as printValue,
  printNetwork ,
  emptyNetworks ,
}
/* No side effect */
