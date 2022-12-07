import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import type React from 'react'
import { describe, test, expect, beforeEach } from 'vitest'
import { Accordion } from '../components/Accordion'

describe('basic', () => {
  test('should show title all the time', () => {
    render(<Accordion title="Testing"><h4>Content</h4></Accordion>)
    expect(screen.getByText(/Testing/i)).toBeDefined()
  })
})
