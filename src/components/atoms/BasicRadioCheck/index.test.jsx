import React from 'react'
import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
// COMPONENTS
import BasicRadioCheck from '.'
// MOCKS
import mocks from './index.mocks.json'

describe('[BasicRadioCheck]', () => {
  const { minimalConfig } = mocks.testing
  const minimalInputTestId = `test-${minimalConfig.control}-${minimalConfig.type}`

  test('Should render the component with required props only', () => {
    render(<BasicRadioCheck {...minimalConfig} />)
    const minimalInput = screen.getByTestId(minimalInputTestId)
    expect(minimalInput).toBeInTheDocument()
  })

  test('Should check that its methods have been called', () => {
    const inputConfig = {
      ...minimalConfig,
      onInputChange: vi.fn(),
      onBlurChange: vi.fn()
    }

    render(<BasicRadioCheck {...inputConfig} />)
    const changeableInput = screen.getByTestId(minimalInputTestId)

    fireEvent.blur(changeableInput)
    expect(inputConfig.onBlurChange).toHaveBeenCalled()

    fireEvent.click(changeableInput)
    fireEvent.change(changeableInput, { target: { value: true } })
    expect(inputConfig.onInputChange).toHaveBeenCalled()
  })
})
