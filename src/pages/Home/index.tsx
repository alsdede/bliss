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
import { Modal, Content, Close } from 'components/Modal'
//styles
import * as S from './styles'
import { validateEmail } from 'utils/validate'

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
  const [email, setEmail] = useState('')

  const [fieldError, setFieldError] = useState<FieldErrors>({})
  const [offset, setOffset] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
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

    setOffset(newOffset)
    console.log(newOffset)
    const response = await api.get(
      `/questions?limit=10&offset=${newOffset}&filter=${inputSearch}`
    )

    setQuestionList([...questionsList, ...response.data])

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

  const handleShareUrl = useCallback(async () => {
    const url = window.location.href
    console.log('[URL]', url)
    validateEmail(email)
    if (!validateEmail(email)) {
      setFieldError({ email: 'invalid e-mail' })
    }
    try {
      const response = await api.post(
        `https://private-anon-f0c2a5dbd1-blissrecruitmentapi.apiary-mock.com/share?destination_email=${email}&content_url=${url}`
      )
      console.log(response.data)
      if (response.data.status == 'OK') {
        setIsOpen(false)
        setEmail('')
      }
    } catch (err) {
      console.log(err)
      setFieldError({ email: 'something is wrong...plese contact support' })
    }
  }, [email])

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
  const abc = false
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
                setIsOpen(true), setEmail('')
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
        {true && (
          <S.ShowMore>
            {abc ? (
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
        )}
        {
          <Modal isOpen={isOpen} aria-label="modal" aria-hidden={!isOpen}>
            <Close onClick={() => setIsOpen(false)}>
              <CloseIcon size={40} />
            </Close>

            <Content>
              <S.ModalRow>
                <S.ModalTitle>Share the results</S.ModalTitle>
              </S.ModalRow>
              <S.ModalColumn>
                <TextField
                  value={email}
                  name="email"
                  placeholder="Enter a e-mail"
                  type="email"
                  error={fieldError?.email}
                  onInputChange={(e) => setEmail(e)}
                />
                <S.CustomButton onClick={handleShareUrl}>
                  Send E-mail
                </S.CustomButton>
              </S.ModalColumn>
            </Content>
          </Modal>
        }
      </Container>
    </section>
  )
}

export default Home
