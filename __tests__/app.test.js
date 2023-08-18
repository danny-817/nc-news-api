const connection = require("../db/connection");
const app = require("../app.js");
const request = require("supertest");
const testdata = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const endpointsJSON = require("../endpoints.json");
const { forEach } = require("../db/data/test-data/articles");

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

describe("/api/articles/:article_id", () => {
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
  });
  describe("PATCH request", () => {
    test("responds with 200 and a copy of the new article with an INCREASED vote", () => {
      const testPatch = { inc_votes: 200 };
      return request(app)
        .patch("/api/articles/1")
        .send(testPatch)
        .expect(200)
        .then(({ body }) => {
          expect(body.article[0]).toHaveProperty("article_id", 1);
          expect(body.article[0]).toHaveProperty("votes", 300);
        });
    });
    test("responds with 200 and a copy of the new article with a DECREASED vote", () => {
      const testPatch = { inc_votes: -300 };
      return request(app)
        .patch("/api/articles/1")
        .send(testPatch)
        .expect(200)
        .then(({ body }) => {
          expect(body.article[0]).toHaveProperty("article_id", 1);
          expect(body.article[0]).toHaveProperty("votes", 0);
        });
    });
    test("responds with 400 and a msg of bad request if the specified path isn't a number", () => {
      const testPatch = { inc_votes: 200 };
      return request(app)
        .patch("/api/articles/one")
        .expect(400)
        .send(testPatch)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe("Bad Request");
        });
    });
    test("responds with 400 and a msg of bad request if the number isn't in the correct format", () => {
      const testPatch = { inc_votes: "ten" };
      return request(app)
        .patch("/api/articles/1")
        .expect(400)
        .send(testPatch)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe("Bad Request");
        });
    });
    test("responds with a 404 and a msg of Path Not found if the ID is valid but not in use", () => {
      const testPatch = { inc_votes: "100" };
      return request(app)
        .patch("/api/articles/10000")
        .expect(404)
        .send(testPatch)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe("User Not Found");
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

describe("/api/articles/:article_id/comments", () => {
  describe("GET requests", () => {
    test("receieves a 200 status code and retrieves all comments for a specified article", () => {
      return request(app)
        .get("/api/articles/9/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments.length).toBe(2);
          body.comments.forEach((comment) => {
            expect(comment).toHaveProperty("votes");
            expect(comment).toHaveProperty("comment_id");
            expect(comment).toHaveProperty("body");
            expect(comment).toHaveProperty("created_at");
            expect(comment).toHaveProperty("author");
            expect(comment).toHaveProperty("article_id");
          });
        });
    });
    test("returned comments are ordered by most recent comment first", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).toBeSortedBy("created_at", {
            descending: true,
          });
        });
    });
    test("respond with 400 when the article id is in the wrong format", () => {
      return request(app)
        .get("/api/articles/nine/comments")
        .expect(400)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe("Bad Request");
        });
    });
    test("responds with and error 404 and `Not Found` when handed an id that doesn't exist", () => {
      return request(app)
        .get("/api/articles/1000/comments")
        .expect(404)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe("Not Found");
        });
    });
  });
});

describe("/api/articles", () => {
  describe("GET requests", () => {
    test("responds with a 200 status code", () => {
      return request(app).get("/api/articles").expect(200);
    });
    test("responds with a 200 status code and all the articles in an array", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then((response) => {
          const { body } = response;

          expect(body.articles.length).toBe(13);
        });
    });
    test("responds with 200 status code and all articles with the comments counted and the body removed ", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          body.articles.forEach((article) => {
            expect(article).toHaveProperty("author");
            expect(article).toHaveProperty("title");
            expect(article).toHaveProperty("article_id");
            expect(article).toHaveProperty("topic");
            expect(article).toHaveProperty("created_at");
            expect(article).toHaveProperty("votes");
            expect(article).toHaveProperty("article_img_url");
            expect(article).not.toHaveProperty("body");
          });
        });
    });
    test("responds with 200 status code and all articles with the comments counted and the body removed, sorted in descending order", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSortedBy("created_at", {
            descending: true,
          });
        });
    });
    test("returns 404 and msg of `Path Not Found` if the path matches no available end point", () => {
      return request(app)
        .get("/api/article")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Path Not Found");
        });
    });
  });
  describe("QUERIES", () => {
    test("returns a 200 code and filtered articles when passed a query of topic", () => {
      return request(app)
        .get("/api/articles?topic=cats")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toEqual([
            {
              article_id: 5,
              title: "UNCOVERED: catspiracy to bring down democracy",
              topic: "cats",
              author: "rogersop",
              created_at: "2020-08-03T13:14:00.000Z",
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              votes: 0,
              comments: "2",
            },
          ]);
        });
    });
    test("returns a 200 code and articles sorted by specfied column or date by default", () => {
      return request(app)
        .get("/api/articles?sort_by=title")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSortedBy("title", {
            descending: true,
          });
        });
    });
    test("returns a 200 code and articles sorted by specfied column (date default) and accepts an order by query (DESC default)", () => {
      return request(app)
        .get("/api/articles?order_by=ASC")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSortedBy("created_at", {
            descending: false,
          });
        });
    });
  });
});

describe("/api/users", () => {
  describe("GET requests", () => {
    test("responds with a 200 code and an array of objects", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          body.users.forEach((user) => {
            expect(user).toHaveProperty("username", expect.any(String));
            expect(user).toHaveProperty("name", expect.any(String));
            expect(user).toHaveProperty("avatar_url", expect.any(String));
          }),
            expect(body.users.length).toBe(4);
        });
    });
    test("responds with a 400 code and a msg of Path Not Found if the path isn't correct", () => {
      return request(app)
        .get("/api/article")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Path Not Found");
        });
    });
  });
});

describe("/api/comments/:comment_id", () => {
  describe("DELETE requests", () => {
    test("deletes the specified comment and return a 204 code", () => {
      return request(app).delete("/api/comments/1").expect(204);
    });
    test("responds with a 400 code if the comment isn't a number", () => {
      return request(app).delete("/api/comments/one").expect(400);
    });
    test("responds with a 400 code if the comment doesn't exist", () => {
      return request(app).delete("/api/comments/1000").expect(400);
    });
  });
});
