"use server";
import prisma from "../prisma";
import { auth } from "@/app/api/auth/auth";

//User Request to join Chama
export async function joinChama(chama) {
  const session = await auth();
  if (!session) {
    return { success: false, message: "You have to be logged in to join a chama!" };
  }

  try {
    // check db the user status
    const userId = parseInt(session.userId);
    const chamaId = parseInt(chama.id);
    const userStatus = await prisma.user_has_chama.findFirst({
      where: {
        user_id: userId,
        chama_id: chamaId,
      },
    });
    // console.log(">>>>>", userStatus);

    // userStatus can either be blank, 'pending', 'approved' or 'revoked'
    if (userStatus) {
      if (userStatus.status === 'approved') return { success: false, message: "User is already a member of this Chama" };
      if (userStatus.status === 'pending') return { success: false, message: "Your request is pending admin approval" };
      if (userStatus.status === 'revoked') return { success: false, message: "You cannot join this Chama because your status was revoked, please contact admin" };
    }

    try {
      // try to insert to the db and return success
      await prisma.user_has_chama.create({
        data: {
          user_id: userId,
          chama_id: chamaId,
          status: "pending",
        },
      });
      return { success: true, message: "Request to join Chama is successful and pending approval" };
    } catch (err) {
      // catch error when inserting and throw it
      return { success: false, message: "An error occurred inserting user status to the db" };
    }
  } catch (err) {
    console.log("An error occurred checking if user status exists in db >>>", err);
    return { success: false, message: "An error occurred" };
  }
}

//Admin approve to join Chama

export async function approveRequest(chamaId, userId){
  const intUserId = parseInt(userId);
  const intChamaId = parseInt(chamaId);

  console.log("chama ---> "+chamaId+" user ----> "+userId);

  //check db if the request exist
  //if it exist as blank throw err
  //if it exist as something else say approved.. throw error
  //if it exists as revoked throw error
  // else approve

  try{
    const joinRqst = await prisma.user_has_chama.findFirst({
      where:{
        user_id: intUserId,
        chama_id: intChamaId,
      }
    });

    // if(joinRqst) console.log("Join Request ==+=> ",joinRqst );

    if (!joinRqst) return { success: false, message: "The user has not applied to join this Chama. This seems ambigous" };
    if (joinRqst.status === "approved") return { success: false, message: "This user is already a member of this chama" };
    if (joinRqst.status === "revoked") return { success: false, message: "The user membership was revoked. Kindly rescind the decision first" };

    try{
      await prisma.user_has_chama.update({
        where: {
          user_id_chama_id: {
            user_id: intUserId,
            chama_id: intChamaId
          }
        },
        data:{
          status: "approved",
        }
      });
      return { success: true, message: "Request successful and the user is now a member of this chama" };
    }catch(err){
      console.log("An error occurred updating user status --> ", err);
      return { success: false, message: "An error occurred updating user status" };
    }

  }catch(err){
    console.log("An error occurred checking if user status exists in db >>>", err);
    return { success: false, message: "An error occurred" };
  }
  
}