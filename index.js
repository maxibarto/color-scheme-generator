export {renderPallete, copyColorsCode} from './utils.js'

const colorForm = document.getElementById('color-form')
const colorInput = document.getElementById('color-input')
const schemeList = document.getElementById('scheme-list')
const schemeBtn = document.getElementById('scheme-btn')


// Active the button to get the color from the API
const activeGetSchemeBtn = (e) => {
    e.addEventListener('click',() => {
        schemeBtn.disabled = false
    })
}

let colorPallete = []
colorForm.addEventListener('submit', e =>{
    e.preventDefault()
    let colorActual = colorInput.value
    colorActual = colorActual.slice(1)
    let schemeActual = schemeList.value

    fetch('https://www.thecolorapi.com/scheme?hex='+colorActual+'&mode='+schemeActual,{method:'GET'})
        .then(res => res.json())
        .then(data => {
            for(let i = 0; i < data.colors.length; i++){
                colorPallete.push(data.colors[i].hex.value) 
            }
            renderPallete()
            colorPallete = []
            activeGetSchemeBtn(colorInput)
            activeGetSchemeBtn(schemeList)
            copyColorsCode()
        })   
})
