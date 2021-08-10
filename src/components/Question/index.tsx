import { ReactNode } from 'react'
import './styles.scss'

type QuestionsProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode; // tipagem de qualquer elemento react que estará no return (ex: tipagem do children)
}

//export function Questions(props: QuestionsProps)
export function Question({ //desestruturar a tipagem
  content,
  author,
  children
}: QuestionsProps) {

  return (
    <div className="question">
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