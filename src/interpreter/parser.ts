import { Expression } from './expressions.js';
import { WanderError, WanderValue } from './values.js';
import { parser } from './wander-lezer-parser.js';
import { Either, Left, Right } from 'purify-ts/Either';

export function parse(script: string): Either<WanderError, Expression[]> {
    const parseResults = parser.parse(script);
    return parseExpressions(parseResults.topNode, script);
}

/**
 * Given a parent node, read all of the Expression children nodes.
 */
function parseExpressions(node: any, script: string): Either<WanderError, Expression[]> {
    let results: Expression[] = [];
    let expressionNodes = node.getChildren("Expression"); //ignore the top "Script" node, should do error checking here
    expressionNodes.forEach(element => {
        let result = parseExpression(element, script);
        results.push(result.unsafeCoerce());
    });
    return Right(results);
}

function parseExpression(expressionNode: any, script: string): Either<WanderError, Expression> {
    //TODO double check node is an expression
    if (expressionNode.firstChild.to === expressionNode.lastChild.to && expressionNode.firstChild.from === expressionNode.lastChild.from) {
        let childNode = expressionNode.firstChild;
        switch (childNode.type.name) {
            case "Int": {
                const value = BigInt(script.substring(childNode.from, childNode.to));
                return Right({type:"Int", value});
            }
            case "String": {
                const value = script.substring(childNode.from+1, childNode.to-1);
                return Right({type:"String", value});
            }
            case "Bool": {
                const value = Boolean(script.substring(childNode.from, childNode.to));
                return Right({type:"Bool", value});
            }
            case "Array": {
                return parseArray(childNode, script);
            }
            case "Module": {
                return parseModule(childNode, script);
            }
        }
    } else {
        return Left(`Error: Unexpected type ${expressionNode.type.name}`);
    }
}

function parseArray(arrayNode: any, script: string): Either<WanderError, Expression> {
    if (arrayNode.firstChild == null) {
        return Right({ type:"Array", value: [] });
    } else {
        const value = parseExpressions(arrayNode, script);
        if (value.isRight()) {
            return Right({ type: "Array", value: value.unsafeCoerce() });
        } else {
            return Left(value.leftOrDefault("Error in parseArray."))
        }
    }
}

function parseModule(moduleNode: any, script: string): Either<WanderError, Expression> {
    if (moduleNode.firstChild == null) {
        return Right({ type:"Module", value: new Map() });
    } else {
        const value = parseFields(moduleNode, script);
        return Right({ type: "Module", value });
    }
}

function parseFields(moduleNode: any, script: string): Map<string, WanderValue> {
    let fieldNodes = moduleNode.getChildren("Field");
    let results = [];
    fieldNodes.forEach(element => {
        let fieldName = script.substring(element.getChild("FieldName").from, element.getChild("FieldName").to)
        let value = parseExpression(element.getChild("Expression"),script)
        results.push([fieldName, value.unsafeCoerce()])
    });
    return new Map(results);
}