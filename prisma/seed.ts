import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createExercises = async (userId: string) => {
  await prisma.exercise.createMany({
    data: [
      {
        title: "Overhead press",
        slug: "overhead-press",
        userId,
      },
      {
        title: "Benchpress",
        slug: "benchpress",
        userId,
      },
      {
        title: "Squat",
        slug: "squat",
        userId,
      },
      {
        title: "Deadlift",
        slug: "deadlift",
        userId,
      },
      {
        title: "Barbell row",
        slug: "barbell-row",
        userId,
      },
      {
        title: "Legpress",
        slug: "legpress",
        userId,
      },
    ],
  });
};

const createWorkouts = async (userId: string) => {
  const sets = [
    { exerciseTitle: "benchpress", reps: 5, weight: 30, userId },
    { exerciseTitle: "benchpress", reps: 5, weight: 30, userId },
    { exerciseTitle: "benchpress", reps: 5, weight: 30, userId },
    { exerciseTitle: "benchpress", reps: 5, weight: 30, userId },
    { exerciseTitle: "squat", reps: 5, weight: 20, userId },
    { exerciseTitle: "squat", reps: 5, weight: 20, userId },
    { exerciseTitle: "squat", reps: 5, weight: 20, userId },
    { exerciseTitle: "squat", reps: 5, weight: 20, userId },
    { exerciseTitle: "deadlift", reps: 5, weight: 40, userId },
    { exerciseTitle: "deadlift", reps: 5, weight: 40, userId },
    { exerciseTitle: "deadlift", reps: 5, weight: 40, userId },
    { exerciseTitle: "deadlift", reps: 5, weight: 40, userId },
  ];

  for (let i = 0; i < 5; i++) {
    await prisma.workout.create({
      data: {
        description: "gym",
        userId,
        note: i % 2 === 0 ? "Some note" : void 0,
        sets: {
          create: sets,
        },
      },
    });
  }
};

async function main() {
  const userId = null;

  if (!userId) {
    throw new Error("add userId for seed data");
  }

  console.log("run seed...");
  await createExercises(userId);
  await createWorkouts(userId);
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
