import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'
import userEvent from '@testing-library/user-event'
import { getResponseArray, postDataObjectResponseObject } from './constant'

class ResizeObserver {
  observe() {}
  unobserve() {}
}

test('Get-input-none-output-array-object', async () => {
  window.ResizeObserver = ResizeObserver

  render(<Page />)
  const curl = screen.getByPlaceholderText(
    'Paste cURL command. You can use generated string by Google Chrome DevTools!'
  )
  const httpStatus = screen.getByPlaceholderText('HTTP status code')
  const response = screen.getByPlaceholderText('JSON response')
  const submitButton = screen.getByRole('button', { name: /Convert/i })
  const mockerResult = screen.getByPlaceholderText('mocker yaml will display here')

  expect(curl).not.toBeNull()
  expect(response).not.toBeNull()
  expect(httpStatus).not.toBeNull()
  expect(mockerResult).not.toBeNull()

  await userEvent.type(curl, getResponseArray.CURL_COMMAND)
  await userEvent.type(httpStatus, `${getResponseArray.SUCCESS_STATUS_CODES}`)
  await userEvent.type(response, getResponseArray.RESPONSE)

  await userEvent.click(submitButton)
  console.log('mockerResult', mockerResult)

  expect(mockerResult).toHaveProperty('value', getResponseArray.SMOCKERD)
})
test('POST-input-object-output-object', async () => {
  window.ResizeObserver = ResizeObserver

  render(<Page />)
  const curl = screen.getByPlaceholderText(
    'Paste cURL command. You can use generated string by Google Chrome DevTools!'
  )
  const httpStatus = screen.getByPlaceholderText('HTTP status code')
  const response = screen.getByPlaceholderText('JSON response')
  const submitButton = screen.getByRole('button', { name: /Convert/i })
  const mockerResult = screen.getByPlaceholderText('mocker yaml will display here')

  expect(curl).not.toBeNull()
  expect(response).not.toBeNull()
  expect(httpStatus).not.toBeNull()
  expect(mockerResult).not.toBeNull()

  await userEvent.type(curl, postDataObjectResponseObject.CURL_COMMAND)
  await userEvent.type(httpStatus, `${postDataObjectResponseObject.SUCCESS_STATUS_CODES}`)
  await userEvent.type(response, postDataObjectResponseObject.RESPONSE)

  await userEvent.click(submitButton)

  expect(mockerResult).toHaveProperty('value', postDataObjectResponseObject.SMOCKERD)
})
