import TextField from 'components/TextField'
import { useCallback, useState } from 'react'
import { Close as CloseIcon } from '@styled-icons/evil/Close'
import { validateEmail } from 'utils/validate'
import * as S from './styles'
import api from 'services/api'

type FieldErrors = {
  [key: string]: string
}
type ValidationMessage = {
  [key: string]: string
}
type ModalProps = {
  isOpen: boolean
  onClose: () => void
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  const [email, setEmail] = useState('')
  const [fieldError, setFieldError] = useState<FieldErrors>({})
  const [fieldMessage, setFieldMessage] = useState<ValidationMessage>({})
  const handleShareUrl = useCallback(async () => {
    const url = window.location.href
    console.log('[URL]', url)
    validateEmail(email)
    if (!validateEmail(email)) {
      setFieldError({ email: 'invalid e-mail' })
      return
    }
    try {
      const response = await api.post(
        `https://private-anon-f0c2a5dbd1-blissrecruitmentapi.apiary-mock.com/share?destination_email=${email}&content_url=${url}`
      )
      console.log(response.data)
      if (response.data.status == 'OK') {
        setEmail('')
        setFieldError({})
        setFieldMessage({ email: 'Email sent!!' })
      }
    } catch (err) {
      console.log(err)
      setFieldError({ email: 'something is wrong...plese contact support' })
    }
  }, [email])

  const handleOnClose = () => {
    onClose()
    setEmail('')
    setFieldMessage({ email: '' })
    setFieldError({})
  }
  return (
    <S.Modal isOpen={isOpen} aria-label="modal" aria-hidden={!isOpen}>
      <S.Close onClick={handleOnClose}>
        <CloseIcon size={40} />
      </S.Close>
      <S.Content>
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
          {fieldMessage.email !== '' && fieldMessage.email}
          <S.CustomButton onClick={handleShareUrl}>Send E-mail</S.CustomButton>
        </S.ModalColumn>
      </S.Content>
    </S.Modal>
  )
}

export default Modal
