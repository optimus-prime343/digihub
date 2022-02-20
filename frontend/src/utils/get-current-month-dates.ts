import { format } from 'date-fns'

export const getCurrentMonthDates = (): string[] => {
  const currentDate = new Date()
  const endDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate()
  const result: string[] = []
  for (let i = 1; i <= endDay; i++) {
    const date = format(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), i),
      'PPP'
    )
    result.push(date)
  }
  return result
}
