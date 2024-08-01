import schedule from "node-schedule";
import { db } from "./db";
import { meals } from "./schema/meals";
import { days } from "./schema/days";
import { daysOfWeek } from "./service/helper";

export const weeklySchedule = () => {
  schedule.scheduleJob("0 0 23 * * 7", async function () {
    await db.delete(meals);
    await db.delete(days);
    let users = await db.query.users.findMany({
      columns: {
        id: true,
      },
    });

    const initialPromise = Promise.resolve();

    const apiCalls = users.reduce(async (previousPromise, user) => {
      await previousPromise;

      const userId = user.id;
      for (const day of daysOfWeek) {
        await db.insert(days).values({ day, totalCalories: 0, totalProteins: 0, userId });
      }
    }, initialPromise);

    apiCalls
      .then(() => {
        console.log("All API calls completed successfully.");
      })
      .catch((error) => {
        console.error("Error occurred during API calls:", error);
      });
  });
};
