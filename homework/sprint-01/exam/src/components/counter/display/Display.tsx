type Props = {
    className: string,
    value: number
}

export const Display = ({className, value}: Props) => {
  return (
    <div className={className}>
      {value}
    </div>
  )
}

