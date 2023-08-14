const connection = require("../db/connection");
const app = require("../app.js");
const request = require("supertest");
const testdata = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const endpointsJSON = require("../endpoints.json");

beforeAll(() => seed(testdata));
afterAll(() => connection.end());

describe("/api/topics", () => {
  describe("GET requests", () => {
    test("returns a status code 200", () => {
      return request(app).get("/api/topics").expect(200);
    });
    test("responds with an array of objects", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual([
            {
              description: "The man, the Mitch, the legend",
              slug: "mitch",
            },
            {
              description: "Not dogs",
              slug: "cats",
            },
            {
              description: "what books are made of",
              slug: "paper",
            },
          ]);
        });
    });
  });
});
describe("/api", () => {
  describe("GET requests", () => {
    test("returns the .json object detailing the available endpoints", () => {
      return request(app)
        .get("/api")
        .then((response) =>
          expect(JSON.parse(response.text)).toEqual(endpointsJSON)
        );
    });
  });
});
