(function() {

    //global variables
    let getStarted = document.querySelector("#start");
    //let monthBox = document.getElementById("#month");
    //let yearBox = document.getElementById("#year");
    let yesNSSF = document.querySelector("#yes-nssf");
    let noNSSF = document.querySelector("#no-nssf");
    let yesNHIF = document.querySelector("#yes-nhif");
    let noNHIF = document.querySelector("#no-nhif");
    let newRates = document.querySelector("#new-rates");
    let oldRates = document.querySelector("#old-rates")
    let benefitsInput = document.querySelector("#benefits-input");
    let salaryInput = document.querySelector("#salary-input");
    let calculateBtn = document.querySelector(".calc-btn");

    let period = document.getElementsByName('period');
   
    //events
    window.addEventListener('DOMContentLoaded', () => {
        console.log("Loaded js");
        console.log(benefitsInput);
        console.log(salaryInput);
        console.log(yesNSSF)

        yesNSSF.addEventListener('change', function(e) {
            if (this.checked) {
                let sum = 3 + 7;

                console.log(sum)
            }
        });

        noNSSF.addEventListener('change', function (e) {
            if (this.checked) {
                let sum = 3 + 7;

                console.log(sum)
            }
        });

        
        
        //perform calculations when calculate button is clicked
        calculateBtn.addEventListener('click', () => {
            console.log("starting calculation")
          
            //invoke calculate method
            calculate();
        });

    });


    /**
     * income before pension deduction
     * deductible NSSF pension
     * income after pension deduction
     * benefits of kind
     * taxable income
     * tax on taxable income
     * personal relief
     * tax net off relief
     * PAYE
     * chargeable income
     * NHIF contribution
     * Net Pay
     */


    const calculate = () => {
        //invoke all methods
        totalIncome();
        deductNSSF();
        getIncomeAfterPension()
        getBenefitsInKind();
        getTaxableIncome();
        getTaxOnTaxableIncome()
        getPersonalRelief();
        getTaxOffRelief();
        getPAYE();
        getChargeableIncome();
        deductNHIF();
        getNetPay();
    }

    //total taxable salary
    const totalIncome = () => {

        let total;
        if (benefitsInput.value !== '' && salaryInput.value !== '') {
            total = parseInt(salaryInput.value) + parseInt(benefitsInput.value);
            document.querySelector(".val1").textContent = total;
        }else if (benefitsInput.value === ''){
            total = parseInt(salaryInput.value) + 0;
            document.querySelector(".val1").textContent = total;
        }
        return total;
    }

    //check whether to deduct NSSF
    const deductNSSF = () => {
        //let yes = document.getElementById('yes-nssf');
        //let no = document.getElementById('no-nssf');
        let checkboxes = document.getElementsByName('nssf');
        let deduction;
        
        yesNSSF.addEventListener('change', function (e) {
            if (this.checked) {
                //yes deduct nssf
                console.log("YES was checked");
                deduction = nssfDeduction()

                //set to output
                document.querySelector(".val2").textContent = deduction;
            }
        });

        noNSSF.addEventListener('change', function (e) {
            if (this.checked) {
                //no deduct nssf
                console.log("NO was clicked");
                deduction = 0;

                //set to output
                document.querySelector(".val2").textContent = deduction;
            }
        });

       

        console.log(deduction);
        return deduction;

    }

    //check whether to deduct NHIF
    const deductNHIF = () => {
        //depending on what the user selects (checkbox)
        let checkboxes = document.getElementsByName("nhif");
        let deduction;

        yesNHIF.addEventListener('change', function (e) {
            if (this.checked) {
                console.log("YES was checked");
                deduction = nhifDeduction();

                //set value to output
                document.querySelector(".val11").textContent = deduction;
            }
        });

        noNHIF.addEventListener('change', function (e) {
            if (this.checked) {
                console.log("NO was clicked");
                deduction = 0;
                //set 00 to output
                document.querySelector(".val11").textContent = deduction;

            }
        });

        //console.log(deduction);
        return deduction;
    }

    //deductible nssf pension
    const nssfDeduction = () => {

        let nssf;
        let salary = 5000;//totalIncome();
        let checkboxes = document.getElementsByName('rates');

        newRates.addEventListener('change', function (e) {
            if (this.checked) {
                console.log("New rates");

                if (salary > 18000) { //when pensionable salary > 18000 deuct flat rate = 2160
                    nssf = 2160;
                    console.log(nssf);

                } else {
                    nssf = salary * 0.12;
                    console.log(nssf);
                }
            }
        });

        oldRates.addEventListener('change', function (e) {
            if (this.checked) {
                // old rates = 200
                console.log("OLd rates");

                nssf = 200;
                console.log(nssf);
            }
        });

       
        console.log(nssf);
        return nssf;
    }

    // get NHIF contribution
    const nhifDeduction = () => {
        let salary = totalIncome()
        //based on monthly salary
        if (salary >= 1000) {

            if (salary >= 1000 && salary <= 5999) {
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

        } else {
            return `can't contribute NHIF if salary is less than 1000`;
        }
    }

    //calculate income after pension deduction
    const getIncomeAfterPension = () => {
        //income before pension - all deductible nssf pension contribution
        //return getTotalTaxableIncome() - 200; //getDeductibleNSSF() pension
        let deduction = totalIncome() - deductNSSF();

        document.querySelector(".val3").textContent = deduction;
        return deduction;
    }

    // get benefits of kind
    const getBenefitsInKind = () => {
        //if value provided -- replace input with value from dom
        let benefits = benefitsInput.value;

        (benefits !== "") ? document.querySelector(".val4").textContent = parseInt(benefits) : document.querySelector(".val4").textContent = 0.0;
    }

    //get taxable income
    const getTaxableIncome = () => {
        //getTotalTaxableIncome() - getDeductibleNSSF()
        let result = totalIncome() - deductNSSF();

        document.querySelector(".val5").textContent = result;
        return result;
    }

    //tax on taxable income
    const getTaxOnTaxableIncome = () => {
        //monthly rates
        // get the total taxable income and store on a variable
        let income = totalIncome();
        let val = document.querySelector(".val6").textContent;
        //what is the monthly payable
        if (income <= 12, 298) {
            val = income * 0.1;
            return income * 0.1;
        } else if (income >= 12999 && income <= 23885) {
            val = income * 0.15;
            return income * 0.15;
        } else if (income >= 23886 && income <= 35472) {
            val = income * 0.2;
            return income * 0.2;
        } else if (income >= 35473 && income <= 47059) {
            val = income * 0.25;
            return income * 0.25;
        } else if (income > 47059) {
            val = income * 0.3;
            return income * 0.3;
        }
    }
    //personal relief
    const getPersonalRelief = () => {
        //check if its monthly or yearly 
        //monthy - 2,400
        //yearly - 28,800
        let checkboxes = document.getElementsByName('period');
        let relief;

        checkboxes.forEach((checkbox, i) => {
            checkbox.addEventListener('click', function () {
                if (i == 0) {
                    //months check
                    if (checkbox.checked){
                        relief = 2400;
                        document.querySelector(".val7").textContent = relief;

                    }
                } else {
                    //year check
                    if (checkbox.checked) {
                        relief = 28800;
                        document.querySelector(".val7").textContent = relief;

                    }
                }

            });
        });

        return relief; 
    }

    //tax net off relief also similiar to PAYE
    const getTaxOffRelief = () => {
        //Tax on taxable income - personal relief
        let result = getTaxOnTaxableIncome() - getPersonalRelief();
        document.querySelector(".val8").textContent = result;
        return result;
    }

    // get PAYE |similar to tax net off relief|
    const getPAYE = () => {
        //Tax on taxable income - personal relief
        let result = getTaxOnTaxableIncome() - getPersonalRelief();
        document.querySelector(".val9").textContent = result;
        return result;
    }

    //get chargeable income | similar to income after pension deduction |
    const getChargeableIncome = () => {
        //income before pension - NSSF pension
        let result = totalIncome() - deductNSSF();
        document.querySelector(".val10").textContent = result;
        return result;
    }

    //calculate net pay
    const getNetPay = () => {
        //total taxable income - all other deductions
        // getTotalTaxibleIncome - (getNHIF() + getPAYE() + getPersonalRelief() + getDeductibleNSSF())
        let result = totalIncome() - (deductNHIF + getPAYE() + getPersonalRelief() + deductNSSF);

        document.querySelector(".val12").textContent = result;
        return result;
    }
})();