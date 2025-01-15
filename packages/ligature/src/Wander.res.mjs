// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Ligature from "./Ligature.res.mjs";

function printResult(value) {
  if (value.TAG === "Ok") {
    return Ligature.printNetwork(value._0);
  } else {
    return value._0;
  }
}

function toJs(result) {
  if (result.TAG !== "Ok") {
    return {
            NAME: "Error",
            VAL: result._0
          };
  }
  var result$1 = [];
  result._0.forEach(function (triple) {
        var e = triple.element;
        var element;
        element = e.TAG === "Element" ? ({
              type: "element",
              value: e._0.value
            }) : ({
              type: "slot",
              value: e._0.value
            });
        var e$1 = triple.role;
        var role;
        role = e$1.TAG === "Element" ? ({
              type: "element",
              value: e$1._0.value
            }) : ({
              type: "slot",
              value: e$1._0.value
            });
        var e$2 = triple.value;
        var value;
        switch (e$2.TAG) {
          case "VElement" :
              value = {
                type: "element",
                value: e$2._0.value
              };
              break;
          case "VSlot" :
              value = {
                type: "slot",
                value: e$2._0.value
              };
              break;
          case "VLiteral" :
              value = {
                type: "literal",
                value: e$2._0.value
              };
              break;
          case "VQuote" :
          case "VNetwork" :
              throw {
                    RE_EXN_ID: "Match_failure",
                    _1: [
                      "Wander.res",
                      53,
                      20
                    ],
                    Error: new Error()
                  };
          
        }
        result$1.push({
              type: "triple",
              element: element,
              role: role,
              value: value
            });
      });
  return {
          NAME: "Network",
          VAL: result$1
        };
}

export {
  printResult ,
  toJs ,
}
/* No side effect */
