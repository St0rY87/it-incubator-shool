import React from 'react'

type Props = {
    onClick: () => void;
    children: string
}


export const Button = ({children, onClick}: Props) => {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  )
}


