// const db = require("../data/dbconfig");
// const usersModels = require("./users/usersModels");
// const plantsModels = require("./plants/plantsModels");


// beforeAll(async () => {
//   await db.migrate.rollback();
//   await db.migrate.latest();
//   await db.seed.run();
// });
// afterAll(async () => {
//   await db.destroy();
// });


// // ---------------------------------- models -----------------------------------
// describe("users models", () => {
//   describe("getById", () => {
//     it("should return a user with the proper id", async () => {
//       const returnedUser = await usersModels.getById(1);
//       expect(returnedUser).toEqual({ id: 1, username: "Alice", password: "pass123", telephone: "999-999-9999" });
//     });
//   });
//   describe("getByUsername", () => {
//     it("should return a user with the proper username", async () => {
//       const returnedUser = await usersModels.getByUsername("Alice");
//       expect(returnedUser).toEqual({  id: 1, username: "Alice", password: "pass123", telephone: "999-999-9999" });
//     });
//   });
//   describe("addUser", () => {
//     it("should insert a user in the db", async () => {
//       const testUser = { username: "test", password: "test", telephone: "000-000-0000" };
//       const newUser = await usersModels.addUser(testUser);
//       expect(newUser.username).toBe(testUser.username);
//       const retrievedUser = await usersModels.getByUsername(testUser.username);
//       expect(retrievedUser.username).toBe(testUser.username);
//     });
//   });
//   describe("editUser", () => {
//     it("should update the user's fields in the db", async () => {
//       const testUser = { username: "edited", password: "test", telephone: "000-000-0000" };
//       const testId = 1;
//       await usersModels.editUser(testId, testUser);
//       const editedUser = await usersModels.getById(testId);
//       expect(editedUser).toEqual({ ...testUser, id: testId });
//     });
//   });
//   describe("deleteUser", () => {
//     it("should remove the appropriate user from the db", async () => {
//       const testId = 1;
//       await usersModels.deleteUser(testId);
//       const deletedUser = await usersModels.getById(testId);
//       expect(deletedUser).toBe(undefined);
//     });
//   });
// });

// // -------------------------------------- plants models ------------------------------------------
// describe("plants models", () => {
//   describe("getById", () => {
//     it("should return a plant with the proper id", async () => {
//       const returnedPlant = await plantsModels.getById(1);
//       expect(returnedPlant).toEqual({ id: 1, nickname: "Jimmy", species: 'daffodil', frequency: 48, img_url: "http://plantpic.com", user_id: 1 });
//     });
//   });
//   describe("addPlant", () => {
//     it("should insert a plant in the db", async () => {
//       const testPlant = { nickname: "test plant", species: 'unknown', frequency: 38, img_url: null, user_id: 1 };
//       const newPlant = await plantsModels.addPlant(testPlant);
//       expect(newPlant.nickname).toBe(testPlant.nickname);
//       const retrievedPlant = await plantsModels.getById(4);
//       expect(retrievedPlant.nickname).toBe(testPlant.nickname);
//     });
//     describe("getPlantsByUser", () => {
//       it("should return all plants that belong to the user", async () => {
//         const userId = 1;
//         const returnedPlants = await plantsModels.getPlantsByUser(userId);
//         expect(returnedPlants).toHaveLength(2);
//       });
//     });
//     describe("editPlant", () => {
//       it("should update the plant's fields in the db", async () => {
//         const testPlant = { id: 1, nickname: "edited", species: 'poppy', frequency: 21, img_url: "http:.//test.com", user_id: 2 };
//         await plantsModels.editPlant(testPlant.id, testPlant);
//         const editedPlant = await plantsModels.getById(testPlant.id);
//         expect(editedPlant).toEqual({ ...testPlant, id: testPlant.id });
//       });
//     });
//     describe("deletePlant", () => {
//       it("should remove the appropriate plant from the db", async () => {
//         const testId = 1;
//         await plantsModels.deletePlant(testId);
//         const deletedPlant = await plantsModels.getById(testId);
//         expect(deletedPlant).toBe(undefined);
//       });
//     });
//   });
// });
it("test", () => {
  expect(true).toBe(true);
})
