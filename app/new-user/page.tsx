import { db } from '@/utils/db';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

const createNewUser = async () => {
    const user = await currentUser();
    // console.log(user);
    
    const match = !!(await db.user.findFirst({
        where: {
            clerkId: user!.id
        }
    }))

    if (!match) {
        await db.user.create({
            data: {
                clerkId: user!.id,
                email: user!.emailAddresses[0].emailAddress as string
            }
        })
    }

    redirect("/journal")

}

const NewUserPage = async () => {
    await createNewUser()
    return (
        <div>...Loading</div>
    );
};

export default NewUserPage;
