import Converter from './converter'
import './App.css'
import HookUsage from './hooks/HookUsage'
import {
  Button, InputGroup,
  FormLabel, Stack,
  Flex, Spacer,
  Container, Heading,
  Text, Switch
} from '@chakra-ui/react'
import { TiArrowRightThick } from "react-icons/ti"
import { IoCopy } from "react-icons/io5"
import { FaFileInvoiceDollar } from "react-icons/fa"

function App() {
  const conv = new Converter

  function GetResult() {
    let horas = parseInt(document.querySelector('#horas').value)
    let porSemana = parseInt(document.querySelector('#por-semana').value)
    let precioHora = parseInt(document.querySelector('#precio-hora').value)

    const semanas = 52
    const promedio = 12
    let comision = document.querySelector('#comision').checked

    let result = precioHora * (semanas * (horas * porSemana))
    result /= promedio
    comision == false ? result : result += result * 0.12
    result = Math.round(result / 10) * 10

    let conversion = conv.convertToText(result)
    let resultado = document.querySelector('.resultado')
    resultado.textContent = `$${result} (${conversion} pesos).`
  }

  function copyToClipboard() {
    let $temp = document.querySelector('.resultado')

    let copyRange = document.createRange()
    copyRange.selectNode($temp)
    window.getSelection().addRange(copyRange)
    document.execCommand("copy")
    window.getSelection().removeRange(copyRange)
  }

  return (
    <div style={{ "margin": "2.5em auto" }}>
      <Container>
        <Stack spacing={6}>
          <Flex alignItems='center'>
            <Heading as='h1' size='3xl' noOfLines={1}>Presupuesto</Heading>
            <FaFileInvoiceDollar size={'3em'} style={{ "display": "inline", "marginLeft": "1em" }} />
          </Flex>
          <InputGroup>
            <FormLabel htmlFor="horas" fontSize={{ base: '20px', md: '1.5em', lg: '2em' }}>Horas:</FormLabel>
            <HookUsage id="horas" name="horas" defaultV={1} />
          </InputGroup>

          <InputGroup>
            <FormLabel htmlFor="por-semana" fontSize={{ base: '20px', md: '1.5em', lg: '1.7em' }}>Por Semana:</FormLabel>
            <HookUsage id="por-semana" name="por-semana" defaultV={1} />
          </InputGroup>

          <InputGroup>
            <FormLabel htmlFor="precio-hora" fontSize={{ base: '20px', md: '1.5em', lg: '1.7em' }}>Precio x Hora:</FormLabel>
            <HookUsage id="precio-hora" name="precio-hora" defaultV={1600} />
          </InputGroup>

          <InputGroup alignItems='center'>
            <FormLabel fontSize={{ base: '20px', md: '1.5em', lg: '1.7em' }}>Comisión</FormLabel>
            <Switch colorScheme='teal' size={'lg'} name="comision" id="comision" />
          </InputGroup>

          <Button colorScheme='teal' rightIcon={<TiArrowRightThick size={20} />} onClick={() => GetResult()}>CALCULAR PRECIO</Button>

          <Flex>
            <Text className="resultado" fontSize={{ base: '24px', md: '1.5em', lg: '1.7em' }}>$ 0000</Text>
            <Spacer />
            <Button colorScheme='teal' rightIcon={<IoCopy />} variant='outline' onClick={() => copyToClipboard('.resultado')} id="copiar">Copiar</Button>
          </Flex>
        </Stack>
      </Container>
    </div>
  )
}

export default App
