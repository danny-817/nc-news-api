const connection = require("../db/connection");
const app = require("../app.js");
const request = require("supertest");
const testdata = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");

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
// describe("/api/articles/", () => {
//   describe("GET requests", () => {
//     test("responds with a 200 status code ", () => {
//       return request(app).get("/api/articles").expect(200);
//     });
//     test("responds with the specified article when a GET request is made to /api/articles/:article_id", () => {
//       return request(app).get("/api/articles/:article_id").expect(200);
//     });
//   });
// });
