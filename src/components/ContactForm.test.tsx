import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from './ContactForm'

describe('ContactForm', () => {
  test('submits valid data', async () => {
    const handleSubmit = vi.fn()
    render(<ContactForm onSubmit={handleSubmit} />)

    await userEvent.type(screen.getByLabelText('Prénom *'), 'John')
    await userEvent.type(screen.getByLabelText('Nom *'), 'Doe')
    await userEvent.type(screen.getByLabelText(/Email/i), 'john@example.com')
    await userEvent.type(screen.getByLabelText(/Téléphone/i), '123456789')
    await userEvent.click(screen.getByLabelText(/newsletter/i))
    await userEvent.click(screen.getByLabelText(/conditions générales/i))

    await userEvent.click(screen.getByRole('button', { name: /Valider et continuer/i }))

    expect(handleSubmit).toHaveBeenCalledTimes(1)
    expect(handleSubmit).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '123456789',
      newsletter: true,
      terms: true,
    })
  })

  test('prevents submission when form is invalid', async () => {
    const handleSubmit = vi.fn()
    render(<ContactForm onSubmit={handleSubmit} />)

    await userEvent.type(screen.getByLabelText(/Email/i), 'invalid-email')
    await userEvent.click(screen.getByRole('button', { name: /Valider et continuer/i }))

    expect(handleSubmit).not.toHaveBeenCalled()
  })
})
