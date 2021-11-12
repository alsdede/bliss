import { useEffect, useCallback, useState } from 'react'
import Button from 'components/Button'
import { Container } from 'components/Container'
import Loader from 'components/Loader'
import TextField from 'components/TextField'
import { useHealth } from 'hooks/useHealth'

import * as S from './styles'
import api from 'services/api'

type FieldErrors = {
  [key: string]: string
}

const Home = () => {
  const [questionsList, setQuestionList] = useState([])
  const [values, setValues] = useState({ search: '' })
  //const [formError, setFormError] = useState({})
  const [fieldError, setFieldError] = useState<FieldErrors>({})

  const handleInput = (field: string, value: string) => {
    setValues((s) => ({ ...s, [field]: value }))
  }
  const { statusHealth, loading, checkHealthStatus } = useHealth()

  const handleSearch = useCallback(
    async (event: React.FormEvent) => {
      try {
        event.preventDefault()
        setFieldError({})

        const response = await api.get(
          `/questions?limit=10&offset=0&filter=${values.search}`
        )
      } catch (err) {
        setFieldError({ search: 'user not found' })
      }
    },
    [values.search]
  )
  useEffect(() => {
    checkHealthStatus()
  }, [checkHealthStatus])

  if (loading) {
    return (
      <Container>
        <S.Loading>
          <Loader />
        </S.Loading>
      </Container>
    )
  }
  return (
    <Container>
      <S.Form onSubmit={handleSearch}>
        <TextField />
        <Button size="medium">Search</Button>
      </S.Form>
    </Container>
  )
}

export default Home
