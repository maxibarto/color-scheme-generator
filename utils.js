
const colorContainer = document.getElementById('color-container')
const colorFooter = document.getElementById('color-footer')

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

export {renderPallete, copyColorsCode}