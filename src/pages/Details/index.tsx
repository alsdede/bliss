import { useCallback, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
//service
import api from 'services/api'
//hooks
import { useHealth } from 'hooks/useHealth'
//components
import Button from 'components/Button'
import { Container } from 'components/Container'
import { Grid } from 'components/Grid'
import Modal from 'components/Modal'
import LoaderContainer from 'components/LoaderContainer'
import RetryHealthCard from 'components/RetryHealthCard'
//icons
import { ArrowIosBackOutline } from '@styled-icons/evaicons-outline/ArrowIosBackOutline'
//styles
import * as S from './styles'

type ChoicesProps = {
  choice: string
  votes: number
}
type QuestionDetailsProps = {
  id: number
  question: string
  published_at: string
  image_url: string
  choices: ChoicesProps[]
}
const Details = () => {
  const [questionDetails, setQuestionDetails] = useState<QuestionDetailsProps>(
    {} as QuestionDetailsProps
  )
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const params = useParams()
  const navigate = useNavigate()
  const { getHealthStatus, isLoading, isHealthStatus } = useHealth()

  const getQuestion = useCallback(async () => {
    const response = await api.get(`/questions/${params.id}`)
    console.log(response.data)
    setQuestionDetails(response.data)
  }, [params.id])

  useEffect(() => {
    getHealthStatus()
    getQuestion()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAddVote = useCallback(
    async (choice) => {
      const updatedQuestion = questionDetails

      updatedQuestion.choices.map((item) => {
        if (item.choice === choice) {
          item.votes++
          return item
        }
      })
      console.log(updatedQuestion)
      const response = await api.put(`/questions/${params.id}`, updatedQuestion)
      console.log('[response ADDVote]', response.data)
      setQuestionDetails({ ...updatedQuestion })
    },
    [params.id, questionDetails]
  )

  console.log('[LIST]', questionDetails)

  if (isLoading) {
    return <LoaderContainer />
  }
  if (!isHealthStatus) {
    return (
      <Container>
        <RetryHealthCard />
      </Container>
    )
  }
  return (
    <S.WrapperContainer>
      <S.Header>
        <S.Left>
          <S.BackButton onClick={() => navigate('/')}>
            <ArrowIosBackOutline size={35} /> Home
          </S.BackButton>
        </S.Left>
        <S.Right>
          <Button
            size="medium"
            onClick={() => {
              setIsOpen(true)
            }}
          >
            Share
          </Button>
        </S.Right>
      </S.Header>
      <S.Content>
        <S.ImageWrapper>
          <S.Image
            src={questionDetails?.image_url}
            alt={questionDetails.question}
          />
        </S.ImageWrapper>
        <S.Info>
          <S.InfoHeader>
            <S.Date>
              {new Intl.DateTimeFormat('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              }).format(new Date())}
            </S.Date>
            <S.Title>{questionDetails?.question}</S.Title>
          </S.InfoHeader>

          <Grid>
            {questionDetails?.choices?.map((item) => (
              <S.Item key={`item_${item.choice}`}>
                <S.ItemLabel>{item.votes}</S.ItemLabel>
                <Button size="large" onClick={() => handleAddVote(item.choice)}>
                  {item.choice}
                </Button>
              </S.Item>
            ))}
          </Grid>
        </S.Info>
      </S.Content>
      {<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </S.WrapperContainer>
  )
}

export default Details
