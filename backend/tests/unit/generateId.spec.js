const generateId = require('../../src/utils/generateId')

describe('Generate ID', () => {
  it('should generate a unique id', () => {
    const id = generateId()

    expect(id).toHaveLength(8)
  })
})
