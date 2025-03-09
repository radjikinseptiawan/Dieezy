/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from "crypto";
const secretKey = crypto.createHash("sha256").update(process.env.SECRET_KEY as string).digest();
const iv = Buffer.alloc(16, 0);

export function encryptData(text: string) {
    const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
    let encrypted = cipher.update(text, "utf-8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
}

export function decryptData(encryptedText: string) {
    try {
        const decipher = crypto.createDecipheriv("aes-256-cbc", secretKey, iv);
        let decrypted = decipher.update(encryptedText, "hex", "utf-8");
        decrypted += decipher.final("utf-8");
        return decrypted;
    } catch (error : any) {
        console.error("❌ Decryption failed:", error.message);
        return null;
    }
}
