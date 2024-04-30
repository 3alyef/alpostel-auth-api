import { dataUserImageModel, userModel } from "../../db/models/Models";
import { CustomError } from "../../interfaces/common.interface";
import { Response } from "express";

export async function changeProfilePhoto(res: Response, soulName: string, urlPhoto: string) {
    try {
        

        const previousImg = await searchPreviousImage(soulName);

        if (previousImg) {
            await changeUrlName(soulName, urlPhoto);
            // Apagar a antiga imagem no AWS
        } else {
            await createNewImageOnDataBase(soulName, urlPhoto);
        }
        
        res.status(200).json({ message: "Profile photo changed successfully" }).end();

    } catch (error) {
        handleError(error, res);
    }
}

async function searchPreviousImage(soulName: string): Promise<boolean> {
    try {
        const user = await dataUserImageModel.exists({ soulName })
        return user ? true : false;
    } catch (error) {
        console.error("Error while searching previous image:", error);
        throw { message: "An error occurred while searching for the previous image.", status: 500 };
    }
}

async function createNewImageOnDataBase(soulName: string, urlPhoto: string) {
    try {
        const dateInf = new Date(); 
        const lastUpdateIn = dateInf.toISOString();
        const newImage = new dataUserImageModel({
            soulName,
            userImage: urlPhoto,
            lastUpdateIn
        });

        await newImage.save();
        if (!newImage) {
            throw { message: "An error occurred while creating the profile photo.", status: 501 };
        }
    } catch (error) {
        console.error("Error while creating new image:", error);
        throw { message: "An error occurred while creating the profile photo.", status: 501 };
    }
}

async function changeUrlName(soulName: string, urlPhoto: string) {
    try {
        const dateInf = new Date(); 
        const lastUpdateIn = dateInf.toISOString();
        const newImage = await dataUserImageModel.updateOne(
            { soulName },
            { userImage: urlPhoto, lastUpdateIn }
        );

        if (!newImage) {
            throw { message: "An error occurred while changing the profile photo.", status: 502 };
        }

        return newImage;
    } catch (error) {
        console.error("Error while changing profile photo:", error);
        throw { message: "An error occurred while changing the profile photo.", status: 502 };
    }
}

function handleError(error: any, res: Response) {
    const { status, message } = error as CustomError;
    console.error("Error:", message);
    res.status(status).json({ message }).end();
}
