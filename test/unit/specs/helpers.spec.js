import { calculateMinutes } from "../../../src/renderer/utils/functions.js";
describe("helpers", () => {
    it("calculateMinutes ", () => {
        var start = { startDate: "21.10.2017", startTime: "13:30" };
        var end = { endDate: "21.10.2017", endTime: "14:30" };
      
        expect(calculateMinutes(start, end)).to.equal(60);
    });
});
