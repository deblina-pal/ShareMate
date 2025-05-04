const toggle = document.getElementById("dark-mode")
toggle.addEventListener("change", () =>
{
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme"))
    {
        localStorage.setItem("theme", "dark");
    }
    else
    {
        localStorage.setItem("theme", "light");
    }
});
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark")
{
    document.body.classList.add("dark-theme");
    toggle.checked = true;
}
else
{
    document.body.classList.remove("dark-theme");
    toggle.checked = false;
}

const billAmountInput = document.getElementById('bill-amount')
const numberOfPeopleInput = document.querySelector('.number-of-people')
const generateBillBtn = document.querySelector('.generate-bill-btn')
const eachPersonBillOutput = document.querySelector('.each-person-bill span')
const customTipInput = document.querySelector('.custom-tip')
const tipAmountOutput = document.querySelector('.tip-amount span')
const totalBillOutput = document.querySelector('.total span')
const tipContainer = document.querySelector('.tip-container')
const resetBtn = document.querySelector('.reset-btn')
const noTipCheckbox = document.getElementById('no-tip-checkbox');

let tipPercentage = 0

generateBillBtn.addEventListener('click', () =>
{
    const billAmount = parseFloat(billAmountInput.value)
    const numberOfPeople = parseInt(numberOfPeopleInput.value)
    // const customTip = parseFloat(customTipInput.value)
    if(isNaN(billAmount) || billAmount <= 0 || tipPercentage < 0)
    {
        alert("Error! Please enter valid numbers!");
        resetBtn.disabled = false
        return;
    }
    else if(numberOfPeople <= 0 || isNaN(numberOfPeople))
    {
        alert("Error! Please enter number of people!");
    }
    if ((isNaN(tipPercentage) || tipPercentage <= 0) && !noTipCheckbox.checked)
    {
        alert("Please select a tip or write Custom Tip in percentage or choose 'Don't want to add tip' checkbox");
        billAmountInput.value = ''
        customTipInput.value = ''
        numberOfPeopleInput.value = ''
        tipAmountOutput.innerText = ''
        totalBillOutput.innerText = ''
        eachPersonBillOutput.innerText = ''
        resetBtn.disabled = false
        return;
    }

    const tipAmount = billAmount * (tipPercentage/100)
    const totalBill = parseFloat(billAmount + tipAmount)
    const eachPersonBill = totalBill / numberOfPeople

    tipAmountOutput.innerText = `₹${tipAmount.toFixed(2)}`
    totalBillOutput.innerText = `₹${totalBill.toFixed(2)}`
    eachPersonBillOutput.innerText = `₹${eachPersonBill.toFixed(2)}`

    resetBtn.disabled = false
})

tipContainer.addEventListener('click', (e)=>
{
    if(tipContainer.classList.contains('disabled')) return;

    const clicked = e.target;
    if (clicked.classList.contains('tip'))
    {
        const isSelected = clicked.classList.contains('selected');

        //deselect all tips
        [...tipContainer.children].forEach((tip) => tip.classList.remove('selected'));
        
        if(!isSelected)
        {
            clicked.classList.add('selected');
            tipPercentage = parseFloat(clicked.innerText);
            customTipInput.value = '';
        }
        else
        {
            tipPercentage = 0; //Deselecting , so reset tip
        }
    }
})


noTipCheckbox.addEventListener('change', () => {
    if (noTipCheckbox.checked) {
        tipPercentage = 0;
        customTipInput.disabled = true;
        tipContainer.classList.add('disabled'); // Disable tip buttons
        [...tipContainer.children].forEach((tip) => tip.classList.remove('selected'));
        customTipInput.value = '';
    } else {
        if (billAmountInput.value) {
            customTipInput.disabled = false;
            tipContainer.classList.remove('disabled'); // Re-enable tip buttons
        }
    }
});

customTipInput.addEventListener('input', () =>
{
    const customValue = parseFloat(customTipInput.value);
    if (!isNaN(customValue) && customValue >= 0)
    {
        tipPercentage = customValue;
    }
    else
    {
        tipPercentage = 0;
    }
    [...tipsContainer.children].forEach((tip) => tip.classList.remove('selected'))
});

resetBtn.addEventListener('click', () =>
{
    tipPercentage = 0
    billAmountInput.value = ''
    customTipInput.value = ''
    numberOfPeopleInput.value = ''
    tipAmountOutput.innerText = ''
    totalBillOutput.innerText = ''
    eachPersonBillOutput.innerText = ''
    customTipInput.disabled = true
    numberOfPeopleInput.disabled = true
    generateBillBtn.disabled = true
    tipContainer.classList.add('disabled');
    noTipCheckbox.checked = false;

        [...tipContainer.children].forEach((tip) => tip.classList.remove('selected'))

    resetBtn.disabled = true


});

billAmountInput.addEventListener('input', () =>
{
    if (billAmountInput.value)
    {
        customTipInput.disabled = false
        numberOfPeopleInput.disabled = false
        // generateBillBtn.disabled = false
        tipContainer.classList.remove('disabled')
    }
    else
    {
        customTipInput.disabled = true
        noTipCheckbox.checked = false
        numberOfPeopleInput.value = ''
        customTipInput.value = ''
        numberOfPeopleInput.disabled = true
        generateBillBtn.disabled = true
        tipContainer.classList.add('disabled')
    }
})

numberOfPeopleInput.addEventListener('input', () =>
    {
    if(!isNaN(tipPercentage))

    {
        generateBillBtn.disabled = false
    }
})
