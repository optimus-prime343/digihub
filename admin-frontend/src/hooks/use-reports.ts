import { useQuery } from 'react-query'

import { getAllReports } from '../services/report-service'
import { IReport } from '../typings/report'

export const useReports = () => {
  return useQuery<IReport[], Error>('reports', getAllReports)
}
