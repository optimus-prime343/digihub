import { Table } from '@mantine/core'
import { format } from 'date-fns'

import { Sidebar } from '../components/sidebar'
import { useReports } from '../hooks/use-reports'

const Reports = () => {
  const { data } = useReports()
  const rows = (data ?? []).map(report => (
    <tr key={report.id}>
      <td className='w-56'>{report.title}</td>
      <td className='w-96'>{report.text}</td>
      <td>{report.reportedBy}</td>
      <td>{report.reportedBusiness}</td>
      <td>{format(new Date(report.createdAt), 'PPP')}</td>
    </tr>
  ))
  return (
    <Sidebar>
      <Table striped>
        <thead>
          <tr>
            <th>Title</th>
            <th>Text</th>
            <th>Reported By</th>
            <th>Reported Business</th>
            <th>Reported on</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Sidebar>
  )
}

export default Reports
