import { ChooseGame } from '../ChooseGame'

import { AiOutlineShoppingCart } from 'react-icons/ai'

import { Title, Subtitle, Description, GameNumbersContainer, GameNumberButton } from './styles'

type Game = {
  type: 'Lotofácil' | 'Quina' | 'Mega-Sena'
  description: string
  range: number
  price: number
  maxNumber: number
  color: string
}

const DUMMY_GAMES: Game[] = [
  {
    type: 'Lotofácil',
    description: 'Escolha 15 números para apostar na lotofácil. Você ganha acertando 11, 12, 13, 14 ou 15 números. São muitas chances de ganhar, e agora você joga de onde estiver!',
    range: 25,
    price: 2.5,
    maxNumber: 15,
    color: '#7F3992',
  },
  {
    type: 'Mega-Sena',
    description: 'Escolha 6 números dos 60 disponíveis na mega-sena. Ganhe com 6, 5 ou 4 acertos. São realizados dois sorteios semanais para você apostar e torcer para ficar milionário.',
    range: 60,
    price: 4.5,
    maxNumber: 6,
    color: '#01AC66',
  },
  {
    type: 'Quina',
    description: 'Escolha 5 números dos 80 disponíveis na quina. 5, 4, 3 ou 2 acertos. São seis sorteios semanais e seis chances de ganhar.',
    range: 80,
    price: 2,
    maxNumber: 5,
    color: '#F79C31',
  },
]

export const NewBet = () => {
  return (
    <>
      <Title>
        New bet <span>for mega-sena</span>
      </Title>
      <ChooseGame gamesData={DUMMY_GAMES} />
      <div>
        <Subtitle>Fill your bet</Subtitle>
        <Description>...</Description>
      </div>
      <GameNumbersContainer>
        {[1, 2, 3].map((gameNumber) => (
          <GameNumberButton key={gameNumber}>
            {gameNumber}
          </GameNumberButton>
        ))}
      </GameNumbersContainer>
      <div>
        <button>Complete Game</button>
        <button>Clear Game</button>
        <button>
          <AiOutlineShoppingCart />
          Add To Cart
        </button>
      </div>
    </>
  )
}
