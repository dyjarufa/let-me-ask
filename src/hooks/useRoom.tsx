import { useEffect, useState } from "react"
import { database } from "../services/firebase"
import { useAuth } from "./useAuth"

type QuestionType = {
  id: string,
  author: {
    name: string,
    avatar: string,
  },
  content: string,
  isAnswered: boolean,
  isHighlighted: boolean,
  likeCount: number,
  likeId: string | undefined,
}

//para declarar uma tipagem de objeto no typescript usa-se o Record 
//Record<chave, {}> //retorna a chave(string) e o valor(que é um objeto)
type FirebaseQuestion = Record<string, {
  author: {
    name: string,
    avatar: string,
  },
  content: string,
  isAnswered: boolean,
  isHighlighted: boolean,
  likes: Record<string, {
    authorId: string,
  }>
}>


export function useRoom(roomId: string){
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestion = databaseRoom.questions ?? {};

      //Object.entries: cada posição retorna uma array coom chave e valor [key, value] 
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => { //desestruturação
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0] //some retorna true ou false achando a condição
        }
      })
      setQuestions(parsedQuestions);
      setTitle(databaseRoom.title);
    })

    return () => { // para o event listener deixar de existir, ao sair da tela ou navegar para outra tela 
      roomRef.off('value'); // off 
    }
  },[roomId, user?.id])
  
  return{ questions, title}
}