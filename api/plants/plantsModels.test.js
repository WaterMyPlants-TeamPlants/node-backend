const db = require("../../data/dbconfig");
const plantsModels = require("./plantsModels");

beforeAll(() => {
  db.migrate.rollback();
  db.migrate.latest();
});
afterAll(async () => {
  await db.destroy();
});

describe("plants models", () => {
  describe("getById", () => {
    it("should return a plant with the proper id", async () => {
      const returnedPlant = await plantsModels.getById(1);
      expect(returnedPlant).toEqual({ nickname: "Jimmy", species: 'daffodil', frequency: 48, img_url: "http://plantpic.com", user_id: 1 });
    });
  });
  describe("addPlant", () => {
    it("should insert a plant in the db", async () => {
      const testPlant = { nickname: "test plant", species: 'unknown', frequency: 38, img_url: null, user_id: 1 };
      const newPlant = await plantsModels.addPlant(testPlant);
      expect(newPlant.nickname).toBe(testPlant.nickname);
      const retrievedPlant = await plantsModels.getByPlantname(testPlant.nickname);
      expect(retrievedPlant.nickname).toBe(testPlant.nickname);
    });
    it("should throw an error if the plant body is missing a nickname", async () => {
      const noPlantNickname = { species: 'unknown', frequency: 38, img_url: null, user_id: 1 };

      const newPlant = await plantsModels.addPlant(noPlantNickname);
      expect(newPlant).toThrow();
    });
    describe("getPlantsByUser", () => {
      it("should return all plants that belong to the user", async () => {
        const userId = 1;
        const returnedPlants = await plantsModels.getPlantsByUser(userId);
        expect(returnedPlants).toHaveLength(2);
      });
    });
    describe("editPlant", () => {
      it("should update the plant's fields in the db", async () => {
        const testPlant = { id: 1, nickname: "edited", species: 'poppy', frequency: 21, img_url: "http:.//test.com", user_id: 2 };
        await plantsModels.editPlant(testPlant.id, testPlant);
        const editedPlant = await plantsModels.getById(testPlant.id);
        expect(editedPlant).toBe({ ...testPlant, id: testPlant.id });
      });
    });
    describe("deletePlant", () => {
      it("should remove the appropriate plant from the db", async () => {
        const testId = 1;
        await plantsModels.deletePlant(testId);
        const deletedPlant = await plantsModels.getById(testId);
        expect(deletedPlant).toBe(null);
      });
    });
  });
});
