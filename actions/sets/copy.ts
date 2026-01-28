"use server";

import { getCurrentUser } from "@/data/users";
import prisma from "@/prisma/db";
import { copySetSchema } from "@/validation/set";
import { Set } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const copySet = async (set: Set) => {
    const user = await getCurrentUser();
    const { success, data } = copySetSchema.safeParse(set);

    if (!success) {
        return {
            success: false,
            error: "invalid data",
        };
    }

    if (!user || user.id !== data.userId) {
        return {
            success: false,
            error: "unauthorized",
        };
    }

    const { exerciseTitle, reps, weight, exerciseId, workoutId } = data;

    try {
        await prisma.set.create({
            data: {
                exerciseTitle: exerciseTitle,
                reps,
                weight,
                exercise: {
                    connect: {
                        id: exerciseId
                    }
                },
                workout: {
                    connect: {
                        id: workoutId,
                    },
                },
                user: {
                    connect: {
                        id: user.id,
                    },
                },
            },
        });
    } catch (error) {
        console.log(error);
        return { success: false, message: "could not create set" };
    }
    revalidatePath(`/workouts/${workoutId}`);
    return {
        success: true,
        message: "Set added",
    };
};