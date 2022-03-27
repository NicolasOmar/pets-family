import { render, screen } from '@testing-library/react'
// COMPONENTS
import Message from '.'
// MOCKS
import { minimalConfig } from './index.mocks.json'

describe('[Message]', () => {
  test('Should render the component with required props only', () => {
    render(<Message {...minimalConfig} />)
    const minimalMsgBlock = screen.getByTestId(`${minimalConfig.msgType}-msg`)
    expect(minimalMsgBlock).toBeInTheDocument()
  })

  test('Should render the component with header', () => {
    render(<Message {...{ ...minimalConfig, headerText: 'test' }} />)
    const headerMsgBlock = screen.getByTestId(`${minimalConfig.msgType}-message-header`)
    expect(headerMsgBlock).toBeInTheDocument()
  })

  test('Should render the component with a error msg', () => {
    render(<Message {...minimalConfig} />)
    const singleMsgBlock = screen.getByTestId(`${minimalConfig.msgType}-msg`)
    expect(singleMsgBlock).toBeInTheDocument()
  })

  test('Should render the component with header', () => {
    const messages = Array(5)
      .fill(null)
      .map((_, i) => `test-${++i}`)

    render(<Message {...{ ...minimalConfig, messages }} />)

    messages.forEach((_, i) => {
      const multipleMsgBlock = screen.getByTestId(`${minimalConfig.msgType}-msg-${i}`)
      expect(multipleMsgBlock).toBeInTheDocument()
    })
  })
})