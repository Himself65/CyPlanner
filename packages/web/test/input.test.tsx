import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import type React from 'react'
import { describe, test, expect, beforeEach } from 'vitest'
import { Input } from '../components/Input'

describe('Input', async () => {
  test('should render the input', () => {
    render(
      <Input
        name="email"
        type="email"
        error={undefined}
        placeholder="Email"
        label="Email Address"
        aria-label="Email Address"
      />,
    )
  })
  test('should change input value', async () => {
    render(
      <Input
        name="email"
        type="email"
        error={undefined}
        placeholder="Email"
        label="Email Address"
        aria-label="Email Address"
      />,
    )

    screen.logTestingPlaygroundURL()

    const input = screen.getByRole('textbox', {
      name: /email address/i,
    })
  })

  test('should render the input with error', () => {
    render(
      <Input
        name="email"
        type="email"
        placeholder="Email"
        label="Email Address"
        aria-label="Email Address"
        error="Please enter your email"
      />,
    )
  })
})
