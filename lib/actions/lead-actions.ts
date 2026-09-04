"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

export type LeadState = { status: "idle" | "success" | "error"; message?: string };

const leadSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(80),
  phone: z.string().trim().min(7, "Укажите телефон").max(30),
  studentAge: z.coerce.number().int().min(4).max(99),
  level: z.string().trim().min(1),
  program: z.string().trim().min(1),
  comment: z.string().trim().max(1000).optional(),
});

export async function submitLead(_: LeadState, formData: FormData): Promise<LeadState> {
  const parsed = leadSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    studentAge: formData.get("studentAge"),
    level: formData.get("level"),
    program: formData.get("program"),
    comment: formData.get("comment") || undefined,
  });

  if (!parsed.success) return { status: "error", message: "Заполните обязательные поля корректно." };

  try {
    await prisma.lead.create({ data: parsed.data });
    return { status: "success", message: "Заявка принята. Мы свяжемся с вами в течение рабочего дня." };
  } catch {
    return { status: "error", message: "Не удалось сохранить заявку. Позвоните нам — мы уже рядом." };
  }
}
