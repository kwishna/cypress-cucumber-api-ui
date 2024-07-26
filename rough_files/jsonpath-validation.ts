import { JSONPath } from "jsonpath-plus"

// const json = {
//     "todos": [
//         {
//             "id": 7,
//             "title": "train staff",
//             "doneStatus": false,
//             "description": ""
//         },
//         {
//             "id": 2,
//             "title": "file paperwork",
//             "doneStatus": false,
//             "description": ""
//         },
//         {
//             "id": 9,
//             "title": "tidy meeting room",
//             "doneStatus": false,
//             "description": ""
//         },
//         {
//             "id": 4,
//             "title": "escalate late payments",
//             "doneStatus": false,
//             "description": ""
//         },
//         {
//             "id": 8,
//             "title": "schedule meeting",
//             "doneStatus": false,
//             "description": ""
//         },
//         {
//             "id": 5,
//             "title": "pay invoices",
//             "doneStatus": false,
//             "description": ""
//         },
//         {
//             "id": 10,
//             "title": "install webcam",
//             "doneStatus": false,
//             "description": ""
//         },
//         {
//             "id": 1,
//             "title": "scan paperwork",
//             "doneStatus": false,
//             "description": ""
//         },
//         {
//             "id": 3,
//             "title": "process payments",
//             "doneStatus": false,
//             "description": ""
//         },
//         {
//             "id": 6,
//             "title": "process payroll",
//             "doneStatus": false,
//             "description": ""
//         }
//     ]
// };

const json = `<todos><todo><doneStatus>false</doneStatus><description/><id>1</id><title>scan paperwork</title></todo><todo><doneStatus>false</doneStatus><description/><id>10</id><title>install webcam</title></todo><todo><doneStatus>false</doneStatus><description/><id>2</id><title>file paperwork</title></todo><todo><doneStatus>false</doneStatus><description/><id>4</id><title>escalate late payments</title></todo><todo><doneStatus>false</doneStatus><description/><id>9</id><title>tidy meeting room</title></todo><todo><doneStatus>false</doneStatus><description/><id>3</id><title>process payments</title></todo><todo><doneStatus>false</doneStatus><description/><id>5</id><title>pay invoices</title></todo><todo><doneStatus>false</doneStatus><description/><id>6</id><title>process payroll</title></todo><todo><doneStatus>false</doneStatus><description/><id>7</id><title>train staff</title></todo><todo><doneStatus>false</doneStatus><description/><id>8</id><title>schedule meeting</title></todo></todos>`;

// console.log(JSONPath({json: json, path: "$.todos[?(@.id == 5)]"}));
// console.log(JSONPath({json: json, path: "$.todos[?(@.title.length > 20)]"}));
// console.log(JSONPath({ json: json, path: "//todos" }));
import xml2js from 'xml2js';
const p = new Promise((res, rej) => {


    const xml = `<todos><todo><doneStatus>false</doneStatus><description/><id>1</id><title>scan paperwork</title></todo><todo><doneStatus>false</doneStatus><description/><id>10</id><title>install webcam</title></todo><todo><doneStatus>false</doneStatus><description/><id>2</id><title>file paperwork</title></todo><todo><doneStatus>false</doneStatus><description/><id>4</id><title>escalate late payments</title></todo><todo><doneStatus>false</doneStatus><description/><id>9</id><title>tidy meeting room</title></todo><todo><doneStatus>false</doneStatus><description/><id>3</id><title>process payments</title></todo><todo><doneStatus>false</doneStatus><description/><id>5</id><title>pay invoices</title></todo><todo><doneStatus>false</doneStatus><description/><id>6</id><title>process payroll</title></todo><todo><doneStatus>false</doneStatus><description/><id>7</id><title>train staff</title></todo><todo><doneStatus>false</doneStatus><description/><id>8</id><title>schedule meeting</title></todo></todos>`;

    // Create a parser
    const parser = new xml2js.Parser({ explicitArray: false });

    // Parse the XML
    parser.parseString(xml, (err, result) => {
        if (err) {
            console.error('Error parsing XML:', err);
            rej(`Error parsing XML: ${err}`);
        }
        res(result);

        // // Get the array of todo items
        // const todos = result.todos.todo;

        // // Filter todos with doneStatus true
        // const doneTodos = todos.filter(todo => todo.doneStatus === 'true');

        // console.log('Completed todos:', doneTodos);
    });
});

p.then(res => console.log(JSON.stringify(res, null, 2)));




