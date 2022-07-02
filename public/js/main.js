(function() {

    //global variables
    let getStarted = document.querySelector("#start");
    let monthBox = document.querySelector("#month");
    let yearBox = document.querySelector("#year");
    let yesNSSF = document.querySelector("#yes-nssf");
    let noNSSF = document.querySelector("#no-nssf");
    let yesNHIF = document.querySelector("#yes-nhif");
    let noNHIF = document.querySelector("#no-nhif");
    let newRates = document.querySelector("#new-rates");
    let oldRates = document.querySelector("#old-rates")
    let benefitsInput = document.querySelector("benefits-input");
    let salaryInput = document.querySelector("salary-input");
    let calculateBtn = document.querySelector(".calc-btn");
    //events
    window.addEventListener('DOMContentLoaded', () => {
        console.log("Loaded js");

        //perform calculations when calculate button is clicked
        calculateBtn.addEventListener('click', () => {
            console.log("starting calculation")
            // set the input area blank

            //perform computations if input is givebn

            //clear input when calculate button is clicked
            //set focus to the input area

        });

    });


    //methods

    //total taxable income | income before pension deduction
    const getTotalTaxableIncome = () => {
        // gross income = basic salary + allowances + commisissions
        //total taxable income = gross income - all deduction
        if (benefitsInput.value !== "" && salaryInput.value !== "") {
            return parseInt(benefitsInput.value + salaryInput.value);
        }
    }

    //deductible NSSF pension
    const getDeductibleNSSF = (isChecked, amount) => {

        //old rates checked --deduct 200 flat rate
        //new rate 12% of total taxable Income and if greater than 18000 then deduct 2160 flat rate
        /*
        if (isChecked) {
            //old nssf rates = 200 flat rates
            return 200
        }else{
            if (salary > 18000){ //when pensionable salary > 18000 deuct flat rate = 2160
                return 2160;
            }else{
                return salary * 0.12;
            }
        }*/
    }

    //calculate income after pension deduction
    const getIncomeAfterPension = () => {
        //income before pension - all deductible nssf pension contribution
        //return getTotalTaxableIncome() - 200; //getDeductibleNSSF() pension
    }

    // get benefits of kind
    const getBenefitsInKind = () => {
        //if value provided -- replace input with value from dom
        if (input.value === "") {
            return 0
        } else {
            return parseInt(input.value);
        }
    }

    //get taxable income
    const getTaxableIncome = () => {
        //getTotalTaxableIncome() - getDeductibleNSSF()
    }

    //tax on taxable income
    const getTaxOnTaxableIncome = () => {
        //monthly rates
        // get the total taxable income and store on a variable
        let income = parseInt(2000000); //some dummy ammount
        //what is the monthly payable

        if (income <= 12,298){
            return income * 0.1;
        }else if (income >= 12999 && income <= 23885){
            return income * 0.15;
        } else if (income >= 23886 && income <= 35472) {
            return income * 0.2;
        } else if (income >= 35473 && income <= 47059) {
            return income * 0.25;
        } else if (income > 47059 ) {
            return income * 0.3;
        }
    }

    //personal relief
    const getPersonalRelief = () => {
        //check if its monthly or yearly 
        //monthy - 2,400
        //yearly - 28,800
        return (periodChecked) ? 2400 : 28800;

    }

    //tax net off relief also similiar to PAYE
    const getTaxOffRelief = () => {
        //Tax on taxable income - personal relief
    }

    // get PAYE |similar to tax net off relief|
    const getPAYE = () => {
        //Tax on taxable income - personal relief
    }

    //get chargeable income | similar to income after pension deduction |
    const getChargeableIncome = () => {
        //income before pension - NSSF pension
        return getTotalTaxableIncome() - 200 //
    }

    // get NHIF contribution
    const getNHIF = (amount) => {
      let salary =   parseInt(amount);
        //based on monthly salary
        if (salary >= 1000){

            if (salary >= 1000 && salary <= 5999){
                return 150;
            } else if (salary >= 6000 && salary <= 7999) {
                return 300;
            } else if (salary >= 8000 && salary <= 11999) {
                return 400;
            } else if (salary >= 12000 && salary <= 14999) {
                return 500;
            } else if (salary >= 15000 && salary <= 19999) {
                return 600;
            } else if (salary >= 20000 && salary <= 24999) {
                return 750;
            } else if (salary >= 25000 && salary <= 29999) {
                return 850;
            } else if (salary >= 30000 && salary <= 34999) {
                return 900;
            } else if (salary >= 35000 && salary <= 39999) {
                return 950;
            } else if (salary >= 40000 && salary <= 44999) {
                return 1000;
            } else if (salary >= 45000 && salary <= 49999) {
                return 1100;
            } else if (salary >= 50000 && salary <= 59999) {
                return 1200;
            } else if (salary >= 60000 && salary <= 69999) {
                return 1300;
            } else if (salary >= 70000 && salary <= 79999) {
                return 1400;
            } else if (salary >= 80000 && salary <= 89999) {
                return 1500;
            } else if (salary >= 90000 && salary <= 99999) {
                return 1600;
            } else if (salary >= 100000) {
                return 1700;
            }

        }else{
            return `can't contribute NHIF if salary is less than 1000`;
        }
    }

    //calculate net pay
    const calculateNetPay = () => {
        //total taxable income - all other deductions
        // getTotalTaxibleIncome - (getNHIF() + getPAYE() + getPersonalRelief() + getDeductibleNSSF())
    }

    //method calls
})();