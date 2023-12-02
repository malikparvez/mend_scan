import * as core from '@actions/core'

describe('Misc tests', () => {
  let inputs = {} as any
  let inSpy: jest.SpyInstance

  beforeAll(() => {
    process.stdout.write = jest.fn()
  })


  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  test('test', () => {
    const orgs = 'test'
    expect(orgs).toEqual("test")

  })
})