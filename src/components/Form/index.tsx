import { ReactNode } from 'react'

import { Container } from './styles'

type FormProps = {
  children: ReactNode | ReactNode[]
}

export const Form = ({ children }: FormProps) => {
  return <Container>{children}</Container>
}
