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

describe("/api/articles/", () => {
  describe("GET requests", () => {
    test("responds with the specified article when a GET request is made to /api/articles/:article_id", () => {
      return request(app).get("/api/articles/1").expect(200);
    });
    test("responds with the the correct data type and correct article number", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then((result) => {
          const article = result.body.article;

          expect(article).toHaveProperty("author");
          expect(article).toHaveProperty("title");
          expect(article).toHaveProperty("article_id", 1);
          expect(article).toHaveProperty("body");
          expect(article).toHaveProperty("topic");
          expect(article).toHaveProperty("created_at");
          expect(article).toHaveProperty("votes");
          expect(article).toHaveProperty("article_img_url");
        });
    });
  });
});
test("responds with and error 404 and `Not Found` when handed an id that doesn't exist", () => {
  return request(app)
    .get("/api/articles/100")
    .expect(404)
    .then(({ body }) => {
      const { msg } = body;
      expect(msg).toBe("Not Found");
    });
});
test("responds with 400 `Bad Request` when handed something other than a number", () => {
  return request(app)
    .get("/api/articles/one")
    .expect(400)
    .then(({ body }) => {
      const { msg } = body;
      expect(msg).toBe("Bad Request");
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
