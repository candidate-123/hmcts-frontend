export interface Task {
  id: number;
  title: string;
  description?: string;
  dateDue: Date;
  status: string;
  day?: number;
  month?: number;
  year?: number;
}

export function mapTask(raw: Task): Task {
  const date = new Date(raw.dateDue);

  return {
    ...raw,
    dateDue: date,
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}