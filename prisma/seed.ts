import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createExercises = async (userId: string) => {
  const result = await prisma.exercise.createMany({
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
  return result.count;
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

  const workoutCount = 5;
  const setsPerWorkout = sets.length;

  for (let i = 0; i < workoutCount; i++) {
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

  return {
    workouts: workoutCount,
    sets: workoutCount * setsPerWorkout,
  };
};

async function main() {
  const userId = null;

  if (!userId) {
    throw new Error("add userId for seed data");
  }

  console.log("run seed...");
  const exercisesCount = await createExercises(userId);
  const { workouts: workoutsCount, sets: setsCount } = await createWorkouts(userId);

  console.log(`\n✅ Seed completed:`);
  console.log(`   - ${exercisesCount} exercises created`);
  console.log(`   - ${workoutsCount} workouts created`);
  console.log(`   - ${setsCount} sets created`);
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
