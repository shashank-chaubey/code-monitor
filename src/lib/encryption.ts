import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from "crypto";

const ALGORITHM = "aes-256-gcm";

function getKey(): Buffer {
    const secret = process.env.AUTH_SECRET;

    if(!secret){
        throw new Error("AUTH_SECRET is not set");
    }
    
    return scryptSync(secret, "github-token-salt", 32);
}

export function encryptToken(plainText: string): string {
    const key = getKey();

    const iv = randomBytes(12);
    const cipher = createCipheriv(ALGORITHM, key, iv);

    const encrypted = Buffer.concat([
        cipher.update(plainText, "utf-8"),
        cipher.final(),
    ]);

    const tag = cipher.getAuthTag();
    return `${iv.toString("hex")}:${tag.toString("hex")}:${encrypted.toString("hex")}`;
}

export function decryptToken(payload: string): string {
    const [ivHex, tagHex, dataHex] = payload.split(":");
    if (!ivHex || !tagHex || !dataHex) {
        throw new Error("Invalid encrypted token format");
    }
    const key = getKey();
    const decipher = createDecipheriv(ALGORITHM, key, Buffer.from(ivHex, "hex"));
    decipher.setAuthTag(Buffer.from(tagHex, "hex"));
    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(dataHex, "hex")),
        decipher.final(),
    ]);

    return decrypted.toString("utf-8");
}