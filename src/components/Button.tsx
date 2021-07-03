import { ButtonHTMLAttributes } from 'react'; // tipagem exportada do react que possui todos os atributos que um button pode receber

import '../styles/button.scss' // importar o style antes do type

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>; // no generics passo o elemento do botão, tipagem global 

export function Button(props: ButtonProps){
  return(
    <button className="button" {...props}/> //pegando todas as propriedades recebidas no componente Button e passando para o elmento html <button>
  )
}
