import { format, add } from 'date-fns'

const heatDataController = (state, date) => {
  switch (state) {
    case 'justCalved':
      return {
        dateOfRecentCalving: format(date, 'dd/MM/yyyy'),
        whenCanSheBeInseminated: format(
          add(date, {
            days: 77
          }),
          'dd/MM/yyyy'
        )
      }

    default:
      break
  }
}
export default heatDataController
