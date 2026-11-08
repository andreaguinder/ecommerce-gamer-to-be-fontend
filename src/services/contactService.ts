import { z } from "zod";
import { ENDPOINTS } from "./config";
import { http } from "./http";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "El nombre no puede estar vacío").max(100, "El nombre debe tener menos de 100 caracteres"),
  email: z.string().trim().email("Email inválido").max(255, "El email debe tener menos de 255 caracteres"),
  message: z.string().trim().min(1, "El mensaje no puede estar vacío").max(1000, "El mensaje debe tener menos de 1000 caracteres"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const contactService = {
  async send(input: ContactInput): Promise<void> {
    const data = contactSchema.parse(input);

    await http(ENDPOINTS.contact, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};