import {decrypt, encrypt} from "../utils/crypt";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type BodyRequest = {
    owner: string,
    slug: string,
    text: string,
}

const getSecretBySlug = async (set: any, slug: string) => {
    // TODO write middleware to parse token to ensure owner is owner of slug
    try {
        const result = await prisma.secret.findFirst({
            where: {
                slug
            }
        });

        if (!result) {
            set.status = 404;
            return 'Not found!';
        }

        const secret = {
            iv: result?.iv,
            encryptedData: result?.encryptedData
        }

        const decryptedSecret = decrypt(secret);

        return {
            slug: slug,
            decryptedSecret: decryptedSecret
        };
    } catch (error: any) {
        set.status = 500;
        return error.message;
    }
}

const createSecret = async (set: any, body: BodyRequest) => {
    const {owner, slug, text} = body;
    if (!owner || typeof owner !== "string") {
        set.status = 400;
        return 'Invalid Payload'
    }
    if (!slug || typeof slug !== "string") {
        set.status = 400;
        return 'Invalid Payload'
    }
    if (!text || typeof text !== "string") {
        set.status = 400;
        return 'Invalid Payload'
    }

    const secret = encrypt(text);

    try {
        const result = await prisma.secret.create({
            data:
                {
                    slug: slug,
                    iv: secret.iv,
                    encryptedData: secret.encryptedData,
                    owner: owner
                }
        })

        return {slug: result?.slug};
    } catch (error: any) {
        set.status = 500;
        return error.message;
    }
}

export {
    getSecretBySlug,
    createSecret
}