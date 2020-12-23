const request = require("supertest");
const router = require("./usersRouter.js");
const db = require("../data/dbconfig");

beforeEach(() => {
  db.migrate.rollback();
  db.migrate.latest();
  db.seed.run;
});
afterAll(async () => {
  await db.destroy();
});

describe("users router", () => {
  describe("/api/users", () => {
    describe("GET /:id", () => {
      const id = 1;
      it("should return 200 status code if successful"), async () => {
        const expectedStatusCode = 200;
        const response = await request(router).get(`/${id}`);
        expect(response.status).toBe(expectedStatusCode);
      };
      it("should return the user object"), async () => {
        const response = await request(router).get(`/${id}`);
        expect(response.body.id).toBe(id);
      };
      it("should return 404 if no user is found"), async () => {
        const badId = 123454;
        const expectedStatusCode = 404;
        const response = await request(router).get(`/${badId}`);
        expect(response.status).toBe(expectedStatusCode);
      };
    });
    describe("GET plants /:id/plants", () => {
      const id = 1;
      it("should return 200 status code if successful"), async () => {
        const expectedStatusCode = 200;
        const response = await request(router).get(`/${id}`);
        expect(response.status).toBe(expectedStatusCode);
      };
      it("should return the user's plants"), async () => {
        const response = await request(router).get(`/${id}`);
        expect(response.body).toHaveLength(1);
      };
      it("should return 404 if no user is found"), async () => {
        const badId = 123454;
        const expectedStatusCode = 404;
        const response = await request(router).get(`/${badId}`);
        expect(response.status).toBe(expectedStatusCode);
      };
    });
    describe("POST /", () => {
      const newUser = { username: "tester", password: "pass123", telephone: "111-111-1111" };
      it("should return 201 status code if successful"), async () => {
        const expectedStatusCode = 201;
        const response = await request(router).post(`/`).send(newUser);
        expect(response.status).toBe(expectedStatusCode);
      };
      it("should return the user object"), async () => {
        const response = await request(router).post(`/`).send(newUser);
        expect(response.body.id).toBe(id);
      };
      it("should return 400 if user body is missing telephone"), async () => {
        const badUser = { username: "tester", password: "pass123" };
        const expectedStatusCode = 400;
        const response = await request(router).post(`/`).send(badUser);
        expect(response.status).toBe(expectedStatusCode);
      };
      it("should return 400 if user body is missing password"), async () => {
        const badUser = { username: "tester", telephone: "111-111-1111" };
        const expectedStatusCode = 400;
        const response = await request(router).post(`/`).send(badUser);
        expect(response.status).toBe(expectedStatusCode);
      };
      it("should return 400 if user body is missing username"), async () => {
        const badUser = { password: "pass123", telephone: "111-111-1111" };
        const expectedStatusCode = 400;
        const response = await request(router).post(`/`).send(badUser);
        expect(response.status).toBe(expectedStatusCode);
      };
    });
    describe("PUT /:id", () => {
      const id = 1;
      const editUser = { username: "edit tester" };
      it("should return 200 status code if successful"), async () => {
        const expectedStatusCode = 200;
        const response = await request(router).put(`/${id}`).send(editUser);
        expect(response.status).toBe(expectedStatusCode);
      };
      it("should return the edited user object"), async () => {
        const response = await request(router).put(`/${id}`).send(editUser);
        expect(response.body.id).toBe(id);
      };
      it("should return 404 if no user is found"), async () => {
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
    it("should return 404 if no user is found"), async () => {
      const badId = 123454;
      const expectedStatusCode = 404;
      const response = await request(router).delete(`/${badId}`);
      expect(response.status).toBe(expectedStatusCode);
    };
  });
});
