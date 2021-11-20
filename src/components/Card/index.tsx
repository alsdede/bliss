import * as S from './styles'

export type CardProps = {
  title: string
  img: string
  date: string
}
const Card = ({
  date,
  title,
  img = 'https://source.unsplash.com/random/300x140'
}: CardProps) => {
  return (
    <S.Wrapper>
      <S.ImageBox>
        <S.Image src={img} alt={title} />
      </S.ImageBox>
      <S.Content>
        <S.Info>
          <S.Date>
            {new Intl.DateTimeFormat('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            }).format(new Date(date))}
          </S.Date>
          <S.Title>{title}</S.Title>
        </S.Info>
      </S.Content>
    </S.Wrapper>
  )
}

export default Card
