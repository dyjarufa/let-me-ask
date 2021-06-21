type ButtonProps = {
  //text?: Array<string> // ou string[],
  children?: string;
}

export function Button(props: ButtonProps){
  return(
    <button>{props.children|| 'default'}</button>
  )
}