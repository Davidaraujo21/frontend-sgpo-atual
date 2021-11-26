import InputCadastro from './components/main/inputCadastro'
import {screen, render, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'


describe("Testar componente input do cadastro de componentes", () =>{

    test("Não ter borda vermelha quando renderizar componente", () =>{
        render(<InputCadastro />)
        const input = screen.getByRole('input')
        expect(input).not.toHaveClass("border-danger")
    })

    test("Mostrar borda vermelha quando tentar submitar inputs vazios", () =>{
        render(<InputCadastro value="" checkSubmit={true}/>)
        const input = screen.getByRole('input')
        expect(input).toHaveClass("border-danger")
    })
    
    test("Testar método onChange do input", () =>{
        render(<InputCadastro  />)
        const input = screen.getByRole("input")
        userEvent.type(input, '1.1.1')
        expect(input).toHaveValue('1.1.1')
    })

    test("Testar se o tipo text do input está sendo passado corretamente", () =>{       
        render(<InputCadastro type="text"/>)
        const input = screen.getByRole("input")
        userEvent.type(input, 12345)
        expect(input).not.toHaveValue(12345)
        userEvent.clear(input)
        userEvent.type(input, "12345")
        expect(input).toHaveValue("12345")
    })

})