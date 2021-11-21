import { useEffect, useCallback, useState } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
//service
import api from 'services/api'
//hooks
import { useHealth } from 'hooks/useHealth'
//icons
import { Close as CloseIcon } from '@styled-icons/evil/Close'
import { KeyboardArrowDown as ArrowDown } from '@styled-icons/material-outlined/KeyboardArrowDown'
import { Share } from '@styled-icons/fluentui-system-regular/Share'
//components
import Button from 'components/Button'
import { Container } from 'components/Container'
import TextField from 'components/TextField'

import { Grid } from 'components/Grid'
import Card from 'components/Card'
import Modal from 'components/Modal'

//styles
import * as S from './styles'
import LoaderContainer from 'components/LoaderContainer'

type FieldErrors = {
  [key: string]: string
}
type QuestionListProps = {
  id: string
  question: string
  thumb_url: string
  published_at: string
}

const Home = () => {
  const [questionsList, setQuestionList] = useState<QuestionListProps[]>([])
  const [inputSearch, setInputSearch] = useState('')

  const [fieldError, setFieldError] = useState<FieldErrors>({})
  const [offset, setOffset] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const searchFilter = searchParams.get('filter')

  const navigate = useNavigate()
  const { getHealthStatus, isLoading, isHealthStatus } = useHealth()
  console.log('search', searchFilter)

  const handleSearchSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      try {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const newSearch = formData.get('search') as string
        if (!newSearch) return
        setSearchParams({ filter: newSearch })
        setFieldError({})
        console.log('searchfilter', searchFilter)
        const response = await api.get(
          `/questions?limit=10&offset=0&filter=${searchFilter}`
        )
        console.log('[resp]:', response.data)
        setQuestionList(response.data)
      } catch (err) {
        setFieldError({ search: 'user not found' })
      }
    },
    [searchFilter, setSearchParams]
  )
  const getQuestionsList = useCallback(async () => {
    try {
      const response = await api.get(`/questions?limit=10&offset=0&filter=""`)
      setQuestionList(response.data)
    } catch (err) {
      console.log(err)
    }
  }, [])

  const handleShowMore = useCallback(async () => {
    const newOffset = offset + 10
    setIsLoadingMore(true)
    setOffset(newOffset)
    console.log(newOffset)
    const response = await api.get(
      `/questions?limit=10&offset=${newOffset}&filter=${searchFilter}`
    )

    setQuestionList([...questionsList, ...response.data])
    setIsLoadingMore(false)
    console.log('newdata', response.data)
  }, [offset, searchFilter, questionsList])

  const handleCleanSearchParam = useCallback(() => {
    setInputSearch('')
    navigate('/')
    setQuestionList([])
    getQuestionsList()
  }, [getQuestionsList, navigate])

  useEffect(() => {
    if (isHealthStatus) {
      getQuestionsList()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getHealthStatus, isHealthStatus])

  if (isLoading) {
    return <LoaderContainer />
  }

  return (
    <section>
      <Container>
        <S.Header>
          <S.Left>
            <S.Form onSubmit={handleSearchSubmit}>
              <TextField
                value={inputSearch}
                name="search"
                placeholder="Search a question"
                error={fieldError?.search}
                onInputChange={(e) => setInputSearch(e)}
                onClearInput={handleCleanSearchParam}
                icon={<CloseIcon />}
                iconPosition="right"
              />
              <Button size="medium" type="submit">
                Search
              </Button>
            </S.Form>
          </S.Left>

          <S.Right>
            <Button
              size="medium"
              icon={<Share />}
              onClick={() => {
                setIsOpen(true)
              }}
            >
              Share
            </Button>
          </S.Right>
        </S.Header>
        <Grid>
          {questionsList.map((item) => (
            <Link key={item.id} to={`/questions/${item.id}`}>
              <Card
                title={item.question}
                img={item.thumb_url}
                date={item.published_at}
              />
            </Link>
          ))}
        </Grid>

        <S.ShowMore>
          {isLoadingMore ? (
            <S.ShowMoreLoading src="/dot.svg" alt="Loading more questions..." />
          ) : (
            <S.ShowMoreButton onClick={handleShowMore}>
              <p>Show More</p>
              <ArrowDown size={35} />
            </S.ShowMoreButton>
          )}
        </S.ShowMore>

        {<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
      </Container>
    </section>
  )
}

export default Home
