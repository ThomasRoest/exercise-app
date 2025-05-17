import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Activity, Dumbbell, Heart, Utensils } from "lucide-react";

export default async function Home() {
  return (
    <div className="flex flex-col items-center w-full bg-white dark:bg-gray-950">
      <section className="w-full flex flex-col items-center text-center px-4 pt-16 pb-20 md:pt-24 md:pb-28 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-3xl mx-auto">
          <Activity className="h-16 w-16 text-blue-600 dark:text-blue-400 mb-8 mx-auto" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Track Your Fitness Journey
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Your all-in-one solution for workouts, nutrition, and habit tracking
            to help you achieve your fitness goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-8"
            >
              <Link href="/app">Get Started</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-800 px-8"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="w-full bg-white dark:bg-gray-900 px-4 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-4">
              <Dumbbell className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Workout Tracking
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Log your exercises, sets, and reps with ease.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-4">
              <Utensils className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Meal Planning
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Record your meals and track your nutrition.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-4">
              <Heart className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Habit Building
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Create and maintain healthy habits with daily tracking.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full bg-gray-50 dark:bg-gray-900 py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Ready to transform your fitness routine?
          </h2>
          <Button
            size="lg"
            asChild
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-8 py-6 text-lg"
          >
            <Link href="/app">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
