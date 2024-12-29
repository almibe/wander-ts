import { element } from '../ligature/ligature.ts'
import { run, parse } from './wander.ts'
import { expect, test } from 'vitest'

test('parse empty script', () => {
  expect(parse("")).toStrictEqual([])
})

test('parse script with single call, no args', () => {
  expect(parse("test")).toStrictEqual([{
    type: "call",
    commandName: "test",
    arguments: []
  }])
})

test('parse script with single call, multiple args', () => {
  expect(parse("test 1 2 3")).toStrictEqual([{
    type: "call",
    commandName: "test",
    arguments: [element("1"),element("2"),element("3") ]
  }])
})
