const db = require("../../data/dbconfig");
const usersModels = require("./UsersModels");

beforeAll(() => {
  db.migrate.rollback();
  db.migrate.latest();
});
afterAll(async () => {
  await db.destroy();
});


describe("users models", () => {
  describe("getById", () => {
    it("should return a user with the proper id", async () => {
      const returnedUser = await usersModels.getById(1);
      expect(returnedUser).toEqual({ username: "Alice", password: "pass123", telephone: "999-999-9999" });
    });
  });
  describe("getByUsername", () => {
    it("should return a user with the proper username", async () => {
      const returnedUser = await usersModels.getByUsername("Alice");
      expect(returnedUser).toEqual({ username: "Alice", password: "pass123", telephone: "999-999-9999" });
    });
  });
  describe("addUser", () => {
    it("should insert a user in the db", async () => {
      const testUser = { username: "test", password: "test", telephone: "000-000-0000" };
      const newUser = await usersModels.addUser(testUser);
      expect(newUser.username).toBe(testUser.username);
      const retrievedUser = await usersModels.getByUsername(testUser.username);
      expect(retrievedUser.username).toBe(testUser.username);
    });
    it("should throw an error if the user body is missing a username", async () => {
      const noUsername = { password: "test", telephone: "000-000-0000" };

      const newUser = await usersModels.addUser(noUsername);
      expect(newUser).toThrow();
    }); it("should throw an error if the user body is missing a password", async () => {
      const noPassword = { username: "test", telephone: "000-000-0000" };

      const newUser = await usersModels.addUser(noPassword);
      expect(newUser).toThrow();
    }); it("should throw an error if the user body is missing a telephone", async () => {
      const noTelephone = { username: "test", password: "test" };

      const newUser = await usersModels.addUser(noTelephone);
      expect(newUser).toThrow();
    });
  });
  describe("editUser", () => {
    it("should update the user's fields in the db", async () => {
      const testUser = { username: "edited", password: "test", telephone: "000-000-0000" };
      const testId = 1;
      await usersModels.editUser(testId, testUser);
      const editedUser = await usersModels.getById(testId);
      expect(editedUser).toBe({ ...testUser, id: testId });
    });
  });
  describe("deleteUser", () => {
    it("should remove the appropriate user from the db", async () => {
      const testId = 1;
      await usersModels.deleteUser(testId);
      const deletedUser = await usersModels.getById(testId);
      expect(deletedUser).toBe(null);
    });
  });
});
