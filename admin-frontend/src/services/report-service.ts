import { IReport } from '../typings/report'
import { axiosClient } from '../utils/axios-client'

export const getAllReports = async () => {
  try {
    const { data: reports } = await axiosClient.get<IReport[]>('/reports')
    return reports
  } catch (error: any) {
    throw new Error(error.response?.data?.message ?? 'Error while fetching reports')
  }
}
