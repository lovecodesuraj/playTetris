let level = 1;
let current;
let next;
let board;
let play;
let isGameOver = false;
let score = 0;
let hiScore = localStorage.getItem('hiScore') || 0;
let boardColor = "#eee";

// For touch listeners
let touch = {
    start : {
        x : 0,
        y : 0,
        z : 0
    },
    end : {
        x : 0,
        y : 0,
        z : 0
    },
}
let holdTimeOut;
let holdInterval;

let shapes = [{
        name: "L",
        color: "#f47a60",
        pattern: {
            0: (x, y) => {
                return [
                    { x: x, y: y - 2 },
                    { x: x, y: y - 1 },
                    { x: x, y: y },
                    { x: x + 1, y: y }
                ]
            },
            1: (x, y) => {
                return [
                    { x: x + 1, y: y - 1 },
                    { x: x, y: y - 1 },
                    { x: x - 1, y: y - 1 },
                    { x: x - 1, y: y }
                ]
            },
            2: (x, y) => {
                return [
                    { x: x, y: y - 2 },
                    { x: x, y: y - 1 },
                    { x: x, y: y },
                    { x: x - 1, y: y - 2 },
                ]
            },
            3: (x, y) => {
                return [
                    { x: x + 1, y: y },
                    { x: x, y: y },
                    { x: x - 1, y: y },
                    { x: x + 1, y: y - 1 }
                ]
            },
        }
    },
    {
        name: "Line",
        color: "#9bc472",
        pattern: {
            0: (x, y) => {
                return [
                    { x: x - 1, y: y },
                    { x: x, y: y },
                    { x: x + 1, y: y },
                    { x: x + 2, y: y }
                ]
            },
            1: (x, y) => {
                return [
                    { x: x, y: y - 3 },
                    { x: x, y: y - 2 },
                    { x: x, y: y - 1 },
                    { x: x, y: y },
                ]
            },
            2: (x, y) => {
                return [
                    { x: x - 1, y: y },
                    { x: x, y: y },
                    { x: x + 1, y: y },
                    { x: x + 2, y: y }
                ]
            },
            3: (x, y) => {
                return [
                    { x: x, y: y - 3 },
                    { x: x, y: y - 2 },
                    { x: x, y: y - 1 },
                    { x: x, y: y },
                ]
            },
        }
    },
    {
        name: "Square",
        color: "red",
        pattern: {
            0: (x, y) => {
                return [
                    { x: x, y: y - 1 },
                    { x: x + 1, y: y - 1 },
                    { x: x, y: y },
                    { x: x + 1, y: y }
                ]
            },
            1: (x, y) => {
                return [
                    { x: x, y: y - 1 },
                    { x: x + 1, y: y - 1 },
                    { x: x, y: y },
                    { x: x + 1, y: y }
                ]
            },
            2: (x, y) => {
                return [
                    { x: x, y: y - 1 },
                    { x: x + 1, y: y - 1 },
                    { x: x, y: y },
                    { x: x + 1, y: y }
                ]
            },
            3: (x, y) => {
                return [
                    { x: x, y: y - 1 },
                    { x: x + 1, y: y - 1 },
                    { x: x, y: y },
                    { x: x + 1, y: y }
                ]
            },
        }
    },
    {
        name: "Inverted L",
        color: "indigo",
        pattern: {
            0: (x, y) => {
                return [
                    { x: x, y: y - 2 },
                    { x: x, y: y - 1 },
                    { x: x, y: y },
                    { x: x - 1, y: y }
                ]
            },
            1: (x, y) => {
                return [
                    { x: x - 1, y: y - 1 },
                    { x: x - 1, y: y },
                    { x: x, y: y },
                    { x: x + 1, y: y }
                ]
            },
            2: (x, y) => {
                return [
                    { x: x, y: y - 2 },
                    { x: x, y: y - 1 },
                    { x: x, y: y },
                    { x: x + 1, y: y - 2 }
                ]
            },
            3: (x, y) => {
                return [
                    { x: x + 1, y: y },
                    { x: x - 1, y: y - 1 },
                    { x: x, y: y - 1 },
                    { x: x + 1, y: y - 1 }
                ]
            },
        }
    },
    {
        name: "T",
        color: "#e8d71e",
        pattern: {
            0: (x, y) => {
                return [
                    { x: x - 1, y: y - 1 },
                    { x: x, y: y - 1 },
                    { x: x + 1, y: y - 1 },
                    { x: x, y: y }
                ]
            },
            1: (x, y) => {
                return [
                    { x: x, y: y - 2 },
                    { x: x, y: y - 1 },
                    { x: x - 1, y: y - 1 },
                    { x: x, y: y }
                ]
            },
            2: (x, y) => {
                return [
                    { x: x - 1, y: y },
                    { x: x, y: y },
                    { x: x + 1, y: y },
                    { x: x, y: y - 1 }
                ]
            },
            3: (x, y) => {
                return [
                    { x: x, y: y - 2 },
                    { x: x, y: y - 1 },
                    { x: x + 1, y: y - 1 },
                    { x: x, y: y }
                ]
            },
        }
    },
    {
        name: "Z",
        color: "#264143",
        pattern: {
            0: (x, y) => {
                return [
                    { x: x - 1, y: y - 1 },
                    { x: x, y: y - 1 },
                    { x: x, y: y },
                    { x: x + 1, y: y }
                ]
            },
            1: (x, y) => {
                return [
                    { x: x, y: y - 2 },
                    { x: x, y: y - 1 },
                    { x: x - 1, y: y - 1 },
                    { x: x - 1, y: y }
                ]
            },
            2: (x, y) => {
                return [
                    { x: x - 1, y: y - 1 },
                    { x: x, y: y - 1 },
                    { x: x, y: y },
                    { x: x + 1, y: y }
                ]
            },
            3: (x, y) => {
                return [
                    { x: x, y: y - 2 },
                    { x: x, y: y - 1 },
                    { x: x - 1, y: y - 1 },
                    { x: x - 1, y: y }
                ]
            },
        }
    },
    {
        name: "S",
        color: "lightBlue",
        pattern: {
            0: (x, y) => {
                return [
                    { x: x + 1, y: y - 1 },
                    { x: x, y: y - 1 },
                    { x: x, y: y },
                    { x: x - 1, y: y }
                ]
            },
            1: (x, y) => {
                return [
                    { x: x, y: y - 2 },
                    { x: x, y: y - 1 },
                    { x: x + 1, y: y - 1 },
                    { x: x + 1, y: y }
                ]
            },
            2: (x, y) => {
                return [
                    { x: x + 1, y: y - 1 },
                    { x: x, y: y - 1 },
                    { x: x, y: y },
                    { x: x - 1, y: y }
                ]
            },
            3: (x, y) => {
                return [
                    { x: x, y: y - 2 },
                    { x: x, y: y - 1 },
                    { x: x + 1, y: y - 1 },
                    { x: x + 1, y: y }
                ]
            },
        }
    },
];