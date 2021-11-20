import { useEffect, useCallback, useState } from 'react'
import {
  useSearchParams,
  useNavigate,
  Link,
  useLocation
} from 'react-router-dom'
//service
import api from 'services/api'
//icons
import { Close as CloseIcon } from '@styled-icons/evil/Close'
import { KeyboardArrowDown as ArrowDown } from '@styled-icons/material-outlined/KeyboardArrowDown'
import { Share } from '@styled-icons/fluentui-system-regular/Share'
//components
import Button from 'components/Button'
import { Container } from 'components/Container'
import Loader from 'components/Loader'
import TextField from 'components/TextField'
import { useHealth } from 'hooks/useHealth'
import RetryHealthCard from 'components/RetryHealthCard'
import { Grid } from 'components/Grid'
import Card from 'components/Card'
import Modal from 'components/Modal'

//styles
import * as S from './styles'

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
  const navigate = useNavigate()
  const location = useLocation()

  const { getHealthStatus, isLoading, isHealthStatus } = useHealth()

  const handleSearch = useCallback(
    async (event: React.FormEvent) => {
      try {
        console.log('clear1')
        event.preventDefault()
        setFieldError({})
        console.log('aaaa', inputSearch)
        const response = await api.get(
          `/questions?limit=10&offset=0&filter=${inputSearch}`
        )
        setQuestionList(response.data)
        setSearchParams({ filter: inputSearch })
        navigate({
          pathname: 'questions',
          search: `?filter=${inputSearch}`
        })
      } catch (err) {
        setFieldError({ search: 'user not found' })
      }
    },
    [inputSearch, navigate, setSearchParams]
  )
  const getQuestionsList = useCallback(async () => {
    const response = await api.get(
      `/questions?limit=10&offset=0&filter=${inputSearch}`
    )
    setQuestionList(response.data)
    console.log(response.data)
  }, [inputSearch])

  const handleShowMore = useCallback(async () => {
    const newOffset = offset + 10
    setIsLoadingMore(true)
    setOffset(newOffset)
    console.log(newOffset)
    const response = await api.get(
      `/questions?limit=10&offset=${newOffset}&filter=${inputSearch}`
    )

    setQuestionList([...questionsList, ...response.data])
    setIsLoadingMore(false)
    console.log('newdata', response.data)
  }, [offset, inputSearch, questionsList])

  const handleCleanSearchParam = useCallback(() => {
    setInputSearch('')
    if (location.pathname !== '/') {
      navigate('/')
      setQuestionList([])
      getQuestionsList()
    }
  }, [getQuestionsList, location.pathname, navigate])

  useEffect(() => {
    getHealthStatus()
    if (isHealthStatus) {
      getQuestionsList()
    }
  }, [getHealthStatus, isHealthStatus])

  if (isLoading) {
    return (
      <S.ContainerLoader>
        <S.Loading>
          <Loader />
        </S.Loading>
      </S.ContainerLoader>
    )
  }
  if (!isHealthStatus) {
    return (
      <Container>
        <RetryHealthCard />
      </Container>
    )
  }

  return (
    <section>
      <Container>
        <S.Header>
          <S.Left>
            <S.Form onSubmit={handleSearch}>
              <TextField
                value={inputSearch}
                name="inputSearch"
                placeholder="Search a question"
                type="inputSearch"
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
            <S.ShowMoreLoading
              src="/dots.svg"
              alt="Loading more questions..."
            />
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
