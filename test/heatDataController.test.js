import heatDataController from '../utils/heatDataController.js'

test('testing heatDataController for justCalved state', () => {
  expect(
    heatDataController('justCalved', new Date(2019, 11, 25))
  ).toStrictEqual({
    dateOfRecentCalving: '25/12/2019',
    whenCanSheBeInseminated: '11/03/2020'
  })
})

test('testing heatDataController for inSeminated state', () => {
  expect(
    heatDataController('justCalved', new Date(2019, 11, 25))
  ).toStrictEqual({
    dateOfRecentCalving: '25/12/2019',
    whenCanSheBeInseminated: '11/03/2020'
  })
})
