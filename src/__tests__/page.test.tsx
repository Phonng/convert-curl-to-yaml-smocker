import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'
import userEvent from '@testing-library/user-event'
import { GET_CURL_COMMAND, SUCCESS_STATUS_CODES, GET_RESPONSE, GET_SMOCKERD } from './constant'

class ResizeObserver {
  observe() {}
  unobserve() {}
}

test('Page', async () => {
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

  await userEvent.type(curl, GET_CURL_COMMAND)
  await userEvent.type(httpStatus, `${SUCCESS_STATUS_CODES}`)
  await userEvent.type(response, GET_RESPONSE)

  userEvent.click(submitButton)
  expect(mockerResult).toHaveProperty('value', GET_SMOCKERD)
})
