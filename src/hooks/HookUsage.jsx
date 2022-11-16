import {useNumberInput, HStack, Button, Input} from '@chakra-ui/react'

function HookUsage({id, name, paso, defaultV, precision}) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: paso,
      defaultValue: defaultV,
      min: 1,
      precision: precision,
    })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  return (
    <HStack maxW='250px'>
      <Button {...inc} bg='lightblue'>+</Button>
      <Input {...input} id={id} name={name} fontSize={{ base: '20px', md: '1.5em', lg: '1.7em' }}/>
      <Button {...dec} bg='lightblue'>-</Button>
    </HStack>
  )
}

export default HookUsage