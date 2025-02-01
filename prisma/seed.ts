import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const userId = process.env.MOCK_USER_ID as string;
const reps = 5;
const getWeight = () => {
  const weightOptions = [10, 20, 30, 40, 50, 60];
  return weightOptions[Math.floor(Math.random() * weightOptions.length)];
};

const workouts = Array.from({ length: 10 }).map((_, index) => {
  let description = "gym workout a";
  if (index % 2 === 0) {
    description = "gym workout b";
  }

  return {
    description,
    userId,
  };
});

const setsA = Array.from({ length: 15 }).map((_, index) => {
  let exercise = "squat";

  if (index < 5) {
    exercise = "squat";
  } else if (index < 10) {
    exercise = "bench_press";
  } else if (index < 15) {
    exercise = "barbell_row";
  }

  return {
    exercise,
    userId,
    reps,
    weight: getWeight(),
  };
});

const setsB = Array.from({ length: 15 }).map((_, index) => {
  let exercise = "squat";

  if (index < 5) {
    exercise = "squat";
  } else if (index < 10) {
    exercise = "overhead_press";
  } else if (index < 15) {
    exercise = "deadlift";
  }

  return {
    exercise,
    userId,
    reps,
    weight: getWeight(),
  };
});

async function main() {
  for (const workout of workouts) {
    await prisma.workout.create({
      data: {
        description: workout.description,
        userId: workout.userId,
        sets: {
          createMany: {
            data: workout.description === "gym workout a" ? setsA : setsB,
          },
        },
      },
    });
    console.log("Added workout");
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
