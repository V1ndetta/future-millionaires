import { AdminHeader } from "@/components/admin/admin-header";
import { CrudManager, type FieldSpec } from "@/components/admin/crud-manager";
import { getBranches, getCoaches, getPrograms, getSchedules } from "@/lib/data";

export default async function AdminSchedulePage() {
  const [items, coaches, programs, branches] = await Promise.all([getSchedules(true), getCoaches(true), getPrograms(true), getBranches(true)]);
  const fields: FieldSpec[] = [
    { name: "dayOfWeek", label: "День недели", type: "select", required: true, options: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"].map((value) => ({ label: value, value })) },
    { name: "groupName", label: "Название группы", required: true }, { name: "startTime", label: "Начало", required: true, placeholder: "16:00" }, { name: "endTime", label: "Окончание", required: true, placeholder: "17:30" }, { name: "spotsLeft", label: "Свободных мест", type: "number" },
    { name: "coachId", label: "Тренер", type: "select", required: true, options: coaches.map((item) => ({ label: item.name, value: item.id })) }, { name: "programId", label: "Программа", type: "select", required: true, options: programs.map((item) => ({ label: item.title, value: item.id })) }, { name: "branchId", label: "Филиал", type: "select", required: true, options: branches.map((item) => ({ label: item.name, value: item.id })) },
  ];
  return <><AdminHeader title="Расписание" description="Группы, тренеры и свободные места." /><CrudManager entity="schedule" fields={fields} items={items.map((item) => ({ ...item }))} getTitle={(item) => String(item.groupName)} getMeta={(item) => `${item.dayOfWeek}, ${item.startTime}`} /></>;
}
