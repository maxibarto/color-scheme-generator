
const colorForm = document.getElementById('color-form')
const colorInput = document.getElementById('color-input')
const schemeList = document.getElementById('scheme-list')
const schemeBtn = document.getElementById('scheme-btn')
const colorContainer = document.getElementById('color-container')
const colorFooter = document.getElementById('color-footer')
let colorPallete = []


// Render the pallete of colors
const renderPallete = () => {
    let palleteHtml = ''
    let footerHtml = ''
    for(color of colorPallete){
        palleteHtml += `
            <div style="background-color:${color}"></div>
        `
        footerHtml += `
            <p>${color}<span>${color} copied to Clipboard!</span></p>
        `
    }
    colorContainer.innerHTML = palleteHtml
    colorFooter.innerHTML = footerHtml
    schemeBtn.disabled = true
}

// Copy text to the clipboard
const copyColorsCode = () => {
    let colorCode = colorFooter.getElementsByTagName('p')
    let colorCopied = colorFooter.getElementsByTagName('span')
    for(let i = 0; i < colorCode.length; i++){
        colorCode[i].addEventListener('click', () => {
            navigator.clipboard.writeText(colorCode[i].textContent)
            colorCopied[i].style.visibility = 'visible'
            setTimeout(() => {
                colorCopied[i].style.visibility = 'hidden'
            }, 1000)
        })
    }
}

// Active the button that gets the color from the API
const activeGetSchemeBtn = (e) => {
    e.addEventListener('click',() => {
        schemeBtn.disabled = false
    })
}

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
