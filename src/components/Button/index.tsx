import { ButtonHTMLAttributes } from 'react'; // tipagem exportada do react que possui todos os atributos que um button pode receber

import './styles.scss'; // importar o style antes do type

// no generics passo o elemento do botão, tipagem global 
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { // & informa que além das propriedades do button posso adcionar mais propriedades que eu queira definir
  isOutlined?: boolean;
}; 

export function Button({isOutlined = false, ...props}: ButtonProps){
  return(
    //pegando todas as propriedades recebidas no componente Button e passando para o elmento html <button>
    <button className={`button ${isOutlined ? 'outlined' : ''}`} 
      {...props}
    />     
  )
}
