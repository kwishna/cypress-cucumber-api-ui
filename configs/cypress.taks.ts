/// <reference path="../node_modules/cypress/types/cypress.d.ts" />
import { defineConfig } from "cypress";
// import { config } from "dotenv";
const dotenvPlugin = require('cypress-dotenv');
import ExcelJS from "exceljs";
import { JSONPath } from "jsonpath-plus";
// import esbuild plugin
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
// import cucumber plugin
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
// Create Bundler
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
const { allureCypress } = require("allure-cypress/reporter");
import xml2js from 'xml2js';
import Ajv, { ErrorObject } from 'ajv';
import addFormats from 'ajv-formats';
// import { cloudPlugin } from "cypress-cloud/plugin";
// config({ path: "./.env"})

import mysql from 'mysql2'; // For connecting to SQL Server

export function queryTestDb(query, config) {
  const connection = mysql.createConnection(config.env.db)
  // start connection to db
  connection.connect()
  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error)
      else {
        connection.end()
        return resolve(results)
      }
    })
  })
}

export function xmlToJs(xml: string): any {
  return new Promise((res, rej) => {
    // Create a parser
    const parser = new xml2js.Parser({ explicitArray: false });
    // Parse the XML
    parser.parseString(xml, (err, result) => {
      if (err) {
        console.error('Error parsing XML:', err);
        rej(`Error parsing XML: ${err}`);
      }
      res(result);
    });
  });
}

export async function readXlsxData() {
  const workbook = await new ExcelJS.Workbook();
  return await workbook.xlsx
    .readFile("cypress/fixtures/userData.xlsx")
    .then(function () {
      console.log("test", workbook.getWorksheet("Sheet1"));
      return workbook.getWorksheet("Sheet1");
    });
}

export function readXlsxFile(filePath: string, indexOrName?: number | string) {
  const workbook = new ExcelJS.Workbook();
  return new Promise((resolve, reject) => {
    workbook.xlsx.readFile(filePath)
      .then(function (wb) {
        resolve(wb.getWorksheet(indexOrName));
      })
      .catch((e) => reject(`Failed to read excel workbook. ${e}`))
  });
}

export function jsonpath(json: any, path: string): Array<any> {
  return JSONPath({ json, path });
}

/**
 * ```info
 * Schema validation is important while testing APIs for several key reasons:-
 *  Data consistency: It ensures that the data being sent and received from the API is consistent and predictable, reducing the risk of errors and inconsistencies.
 *  Data integrity: It ensures that the data structure and types conform to what the API expects, preventing issues caused by malformed or incorrect data.
 *  Contract enforcement: It helps enforce the agreed-upon contract between the API provider and consumers, ensuring consistency in data exchange.
 *  Early error detection: Validation can catch issues early in the development process, before they cause problems in production environments.
 *  Security: It can help prevent injection attacks and other security vulnerabilities by ensuring that incoming data meets expected formats and constraints.
 *  Documentation: The schema serves as a form of documentation, clearly defining the expected structure of requests and responses.
 *  Automated testing: Schema validation can be easily integrated into automated testing processes, allowing for quick and consistent verification of API inputs and outputs.
 *  Versioning support: As APIs evolve, schema validation helps manage version changes and ensures backward compatibility.
 *  Reduced debugging time: By catching format and type errors early, it saves time that would otherwise be spent debugging issues caused by incorrect data structures.
 *  Improved API reliability: Consistent data structures lead to more reliable API behavior and fewer runtime errors.
 *  Client-side validation: Schemas can be shared with API consumers, allowing them to implement client-side validation for better user experience and reduced server load.
 * ```
 * @description Validate the schema of the response.
 * @param schema schema in the object form. use `JSON.parse(schema)` to convert the schema to object. (if required)
 * @param data data to be validated. Mostly, it's the response body.
 * @returns {boolean} true if the schema is valid, false otherwise.
 * @returns {string} error message if the schema is invalid.
 */
export function validateSchema(schema, data): [boolean, string | undefined] {
  const ajv = new Ajv({
    allErrors: true,
    verbose: true,
    strict: true,
  });
  addFormats(ajv);

  const validate = ajv.compile(schema);
  const isValid = validate(data);

  let errorMessages: string | undefined = undefined;
  if (!isValid) {
    const errors: ErrorObject<string, Record<string, any>, unknown>[] | null | undefined = validate?.errors;
    errorMessages = errors?.map(error => `${error?.data} ${error?.message}`).join(', ');
    cy.log(`Schema validation failed. Errors: ${errorMessages}`);
  }
  return [isValid, errorMessages];
};

export function encodeString(value: string) {
  return value ? Buffer.from(value).toString("base64") : value;
}

export function decodeString(value: string) {
  return value ? Buffer.from(value, "base64").toString("ascii") : value;
}