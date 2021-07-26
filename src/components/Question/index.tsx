import './styles.scss'

type QuestionsProps = {
  content: string,
  author: {
    name: string,
    avatar: string
  }
}

//export function Questions(props: QuestionsProps)
export function Question({ //desestruturar a tipagem
  content,
  author,
}: QuestionsProps) {
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div></div>
      </footer>
    </div>
  )
}