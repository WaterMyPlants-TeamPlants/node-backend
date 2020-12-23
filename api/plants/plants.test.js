const request = require("supertest");
const router = require("./plantsRouter.js");
const db = require("../data/dbconfig");

beforeEach(() => {
  db.migrate.rollback();
  db.migrate.latest();
  db.seed.run;
});
afterAll(async () => {
  await db.destroy();
});

describe("plants router", () => {
  describe("/api/plants", () => {
    describe("GET /:id", () => {
      const id = 1;
      it("should return 200 status code if successful"), async () => {
        const expectedStatusCode = 200;
        const response = await request(router).get(`/${id}`);
        expect(response.status).toBe(expectedStatusCode);
      };
      it("should return the plant object"), async () => {
        const response = await request(router).get(`/${id}`);
        expect(response.body.id).toBe(id);
      };
      it("should return 404 if no plant is found"), async () => {
        const badId = 123454;
        const expectedStatusCode = 404;
        const response = await request(router).get(`/${badId}`);
        expect(response.status).toBe(expectedStatusCode);
      };
    });
    describe("POST /", () => {
      const newPlant = { nickname: "tester", species: "poinsettia", frequency: 24, user_id: 1 };
      it("should return 201 status code if successful"), async () => {
        const expectedStatusCode = 201;
        const response = await request(router).post(`/`).send(newPlant);
        expect(response.status).toBe(expectedStatusCode);
      };
      it("should return the plant object"), async () => {
        const response = await request(router).post(`/`).send(newPlant);
        expect(response.body.id).toBe(id);
      };
      it("should return 400 if plant body is missing frequency"), async () => {
        const badPlant = { nickname: "tester", species: "poinsettia", user_id: 1 };
        const expectedStatusCode = 400;
        const response = await request(router).post(`/`).send(badPlant);
        expect(response.status).toBe(expectedStatusCode);
      };
      it("should return 400 if plant body is missing species"), async () => {
        const badPlant = { nickname: "tester", frequency: 24, user_id: 1 };
        const expectedStatusCode = 400;
        const response = await request(router).post(`/`).send(badPlant);
        expect(response.status).toBe(expectedStatusCode);
      };
      it("should return 400 if plant body is missing nickname"), async () => {
        const badPlant = { species: "poinsettia", frequency: 24, user_id: 1 };
        const expectedStatusCode = 400;
        const response = await request(router).post(`/`).send(badPlant);
        expect(response.status).toBe(expectedStatusCode);
      };
      it("should return 400 if plant body is missing user id"), async () => {
        const badPlant = { nickname: "tester", species: "poinsettia", frequency: 24 };
        const expectedStatusCode = 400;
        const response = await request(router).post(`/`).send(badPlant);
        expect(response.status).toBe(expectedStatusCode);
      };
    });
    describe("PUT /:id", () => {
      const id = 1;
      const editPlant = { nickname: "edit tester" };
      it("should return 200 status code if successful"), async () => {
        const expectedStatusCode = 200;
        const response = await request(router).put(`/${id}`).send(editPlant);
        expect(response.status).toBe(expectedStatusCode);
      };
      it("should return the edited plant object"), async () => {
        const response = await request(router).put(`/${id}`).send(editPlant);
        expect(response.body.id).toBe(id);
      };
      it("should return 404 if no plant is found"), async () => {
        const badId = 123454;
        const expectedStatusCode = 404;
        const response = await request(router).put(`/${badId}`);
        expect(response.status).toBe(expectedStatusCode);
      };
    });
  });
  describe("DELETE /:id", () => {
    const id = 1;
    it("should return 200 status code if successful"), async () => {
      const expectedStatusCode = 200;
      const response = await request(router).delete(`/${id}`);
      expect(response.status).toBe(expectedStatusCode);
    };
    it("should return number of items deleted"), async () => {
      const response = await request(router).delete(`/${id}`);
      expect(response.body).toBe(1);
    };
    it("should return 404 if no plant is found"), async () => {
      const badId = 123454;
      const expectedStatusCode = 404;
      const response = await request(router).delete(`/${badId}`);
      expect(response.status).toBe(expectedStatusCode);
    };
  });
});
