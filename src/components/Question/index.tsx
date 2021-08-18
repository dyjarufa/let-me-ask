import { ReactNode } from 'react'
import cx from 'classnames';
import './styles.scss'

type QuestionsProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode; // tipagem de qualquer elemento react que estará no return (ex: tipagem do children)
  isAnswered?: boolean,
  isHighlighted?: boolean;
}

//export function Questions(props: QuestionsProps)
export function Question({ //desestruturar a tipagem
  content,
  author,
  children,
  isAnswered = false,
  isHighlighted = false,
}: QuestionsProps) {

  return (
    <div 
      // className={`question ${isAnswered ? 'answered' : ''} ${isHighlighted ? 'highlighted' : ''}`} //refactoring
      className={cx(
        'question', //classe question
        { answered: isAnswered }, // aqui a chave do objeto é classe 'answered' / posso passar um objeto com o valor do isAnswered 
        { highlighted: isHighlighted && !isAnswered} // aqui a chave é a classe highlighted e o valor do objeto é o isHighlighted
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  )
}