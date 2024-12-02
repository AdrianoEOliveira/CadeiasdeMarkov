import { expect, test } from 'vitest'
import { getByText } from '@testing-library/dom'
import HelloWorld from '../js/AuxTest/HelloWorld'

test('renders name', () => {
  const parent = HelloWorld({ name: 'Vitest' })
  document.body.appendChild(parent)

  const element = getByText(parent, 'Hello Vitest!')
  const h1Element = document.querySelector("h1");

  // Verifica se o elemento foi adicionado
  expect(h1Element).not.toBeNull(); // Confirma que <h1> existe
  expect(h1Element.tagName).toBe("H1"); // Confirma que é <h1>
  expect(h1Element.textContent).toBe("Hello Vitest!"); // Confirma o texto
  //expect(element).toBe("Hello Vitest!")
})
