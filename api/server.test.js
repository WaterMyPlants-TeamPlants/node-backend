const request = require("supertest");
const server = require("./server.js");
const db = require("../data/dbconfig");


beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy();
});


// ------------------------------------------ auth ------------------------------------------
describe("register user", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  afterAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();
  });
  const newUser = { username: "tester", password: "pass123", telephone: "111-111-1111" };
  it("should return 201 status code if successful", async () => {
    const expectedStatusCode = 201;
    const response = await request(server).post(`/api/register`).send(newUser);
    expect(response.status).toBe(expectedStatusCode);
  });
  it("should return the user object", async () => {
    const response = await request(server).post(`/api/register`).send(newUser);
    expect(response.body.id).toBe(1);
  });
  it("should return 400 if user body is missing telephone", async () => {
    const badUser = { username: "tester", password: "pass123" };
    const expectedStatusCode = 400;
    const response = await request(server).post(`/api/register`).send(badUser);
    expect(response.status).toBe(expectedStatusCode);
  });
  it("should return 400 if user body is missing password", async () => {
    const badUser = { username: "tester", telephone: "111-111-1111" };
    const expectedStatusCode = 400;
    const response = await request(server).post(`/api/register`).send(badUser);
    expect(response.status).toBe(expectedStatusCode);
  });
  it("should return 400 if user body is missing username", async () => {
    const badUser = { password: "pass123", telephone: "111-111-1111" };
    const expectedStatusCode = 400;
    const response = await request(server).post(`/api/register`).send(badUser);
    expect(response.status).toBe(expectedStatusCode);
  });
});

describe("login", () => {
  const newUser = { username: "tester", password: "pass123" };
  beforeAll(async () => {
    await request(server).post(`/api/register`).send({ ...newUser, telephone: "111-111-1111" });
  });
  it("should return 200 status code if successful", async () => {
    const expectedStatusCode = 200;
    const response = await request(server).post(`/api/login`).send(newUser);
    console.log(response.body);
    expect(response.status).toBe(expectedStatusCode);
  });
  it("should return a token", async () => {
    const response = await request(server).post(`/api/login`).send(newUser);
    const bodyKeys = Object.keys(response.body);
    expect(bodyKeys).toContain("token");
  });
  it("should return 400 if user body is missing password", async () => {
    const badUser = { username: "tester" };
    const expectedStatusCode = 400;
    const response = await request(server).post(`/api/login`).send(badUser);
    expect(response.status).toBe(expectedStatusCode);
  });
  it("should return 400 if user body is missing username", async () => {
    const badUser = { password: "pass123" };
    const expectedStatusCode = 400;
    const response = await request(server).post(`/api/login`).send(badUser);
    expect(response.status).toBe(expectedStatusCode);
  });
});

// --------------------------------------- users server --------------------------------------
describe("/api/users", () => {
  describe("GET /:id", () => {
    const id = 1;
    it("should return 200 status code if successful", async () => {
      const expectedStatusCode = 200;
      const response = await request(server).get(`/api/users/${id}`);
      expect(response.status).toBe(expectedStatusCode);
    });
    it("should return the user object", async () => {
      const response = await request(server).get(`/api/users/${id}`);
      expect(response.body.id).toBe(id);
    });
    it("should return 404 if no user is found", async () => {
      const badId = 123454;
      const expectedStatusCode = 404;
      const response = await request(server).get(`/api/users/${badId}`);
      expect(response.status).toBe(expectedStatusCode);
    });
  });
  describe("GET plants by user /:id/plants", () => {
    const id = 1;
    it("should return 200 status code if successful", async () => {
      const expectedStatusCode = 200;
      const response = await request(server).get(`/api/users/${id}`);
      expect(response.status).toBe(expectedStatusCode);
    });
    it("should return the user's plants", async () => {
      const response = await request(server).get(`/api/users/${id}`);
      expect(response.body).toHaveLength(1);
    });
    it("should return 404 if no user is found", async () => {
      const badId = 123454;
      const expectedStatusCode = 404;
      const response = await request(server).get(`/api/users/${badId}`);
      expect(response.status).toBe(expectedStatusCode);
    });
  });

  describe("PUT /:id", () => {
    const id = 1;
    const editUser = { username: "edit tester" };
    it("should return 200 status code if successful", async () => {
      const expectedStatusCode = 200;
      const response = await request(server).put(`/api/users/${id}`).send(editUser);
      expect(response.status).toBe(expectedStatusCode);
    });
    it("should return the edited user object", async () => {
      const response = await request(server).put(`/api/users/${id}`).send(editUser);
      expect(response.body.id).toBe(id);
    });
    it("should return 404 if no user is found", async () => {
      const badId = 123454;
      const expectedStatusCode = 404;
      const response = await request(server).put(`/api/users/${badId}`);
      expect(response.status).toBe(expectedStatusCode);
    });
  });
  // describe("DELETE /:id", () => {
  //   const id = 1;
  //   it("should return 200 status code if successful", async () => {
  //     const expectedStatusCode = 200;
  //     const response = await request(server).delete(`/api/users/${id}`);
  //     expect(response.status).toBe(expectedStatusCode);
  //   });
  //   it("should return number of items deleted", async () => {
  //     const response = await request(server).delete(`/api/users/${id}`);
  //     expect(response.body).toBe(1);
  //   });
  //   it("should return 404 if no user is found", async () => {
  //     const badId = 123454;
  //     const expectedStatusCode = 404;
  //     const response = await request(server).delete(`/api/users/${badId}`);
  //     expect(response.status).toBe(expectedStatusCode);
  //   });
  // });
});


// // ------------------------------------- plants server ------------------------------------------
// describe("plants server", () => {
//   describe("/api/plants", () => {
//     describe("GET /:id", () => {
//       const id = 1;
//       it("should return 200 status code if successful", async () => {
//         const expectedStatusCode = 200;
//         const response = await request(server).get(`/api/plants/${id}`);
//         expect(response.status).toBe(expectedStatusCode);
//       });
//       it("should return the plant object", async () => {
//         const response = await request(server).get(`/api/plants/${id}`);
//         expect(response.body.id).toBe(id);
//       });
//       it("should return 404 if no plant is found", async () => {
//         const badId = 123454;
//         const expectedStatusCode = 404;
//         const response = await request(server).get(`/api/plants/${badId}`);
//         expect(response.status).toBe(expectedStatusCode);
//       });
//     });
//     describe("POST /", () => {
//       const newPlant = { nickname: "tester", species: "poinsettia", frequency: 24, user_id: 1 };
//       it("should return 201 status code if successful", async () => {
//         const expectedStatusCode = 201;
//         const response = await request(server).post(`/api/plants/`).send(newPlant);
//         expect(response.status).toBe(expectedStatusCode);
//       });
//       it("should return the plant object", async () => {
//         const response = await request(server).post(`/api/plants/`).send(newPlant);
//         expect(response.body.id).toBe(id);
//       });
//       it("should return 400 if plant body is missing frequency", async () => {
//         const badPlant = { nickname: "tester", species: "poinsettia", user_id: 1 };
//         const expectedStatusCode = 400;
//         const response = await request(server).post(`/api/plants/`).send(badPlant);
//         expect(response.status).toBe(expectedStatusCode);
//       });
//       it("should return 400 if plant body is missing species", async () => {
//         const badPlant = { nickname: "tester", frequency: 24, user_id: 1 };
//         const expectedStatusCode = 400;
//         const response = await request(server).post(`/api/plants/`).send(badPlant);
//         expect(response.status).toBe(expectedStatusCode);
//       });
//       it("should return 400 if plant body is missing nickname", async () => {
//         const badPlant = { species: "poinsettia", frequency: 24, user_id: 1 };
//         const expectedStatusCode = 400;
//         const response = await request(server).post(`/api/plants/`).send(badPlant);
//         expect(response.status).toBe(expectedStatusCode);
//       });
//       it("should return 400 if plant body is missing user id", async () => {
//         const badPlant = { nickname: "tester", species: "poinsettia", frequency: 24 };
//         const expectedStatusCode = 400;
//         const response = await request(server).post(`/api/plants/`).send(badPlant);
//         expect(response.status).toBe(expectedStatusCode);
//       });
//     });
//     describe("PUT /:id", () => {
//       const id = 1;
//       const editPlant = { nickname: "edit tester" };
//       it("should return 200 status code if successful", async () => {
//         const expectedStatusCode = 200;
//         const response = await request(server).put(`/api/plants/${id}`).send(editPlant);
//         expect(response.status).toBe(expectedStatusCode);
//       });
//       it("should return the edited plant object", async () => {
//         const response = await request(server).put(`/api/plants/${id}`).send(editPlant);
//         expect(response.body.id).toBe(id);
//       });
//       it("should return 404 if no plant is found", async () => {
//         const badId = 123454;
//         const expectedStatusCode = 404;
//         const response = await request(server).put(`/api/plants/${badId}`);
//         expect(response.status).toBe(expectedStatusCode);
//       });
//     });
//   });
//   describe("DELETE /:id", () => {
//     const id = 1;
//     it("should return 200 status code if successful", async () => {
//       const expectedStatusCode = 200;
//       const response = await request(server).delete(`/api/plants/${id}`);
//       expect(response.status).toBe(expectedStatusCode);
//     });
//     it("should return number of items deleted", async () => {
//       const response = await request(server).delete(`/api/plants/${id}`);
//       expect(response.body).toBe(1);
//     });
//     it("should return 404 if no plant is found", async () => {
//       const badId = 123454;
//       const expectedStatusCode = 404;
//       const response = await request(server).delete(`/api/plants/${badId}`);
//       expect(response.status).toBe(expectedStatusCode);
//     });
//   });
// });
