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
    let benefitsInput = document.querySelector("#benefits-input");
    let salaryInput = document.querySelector("#salary-input");
    let calculateBtn = document.querySelector(".calc-btn");

    let period = document.getElementsByName('period');
   
    //events
    window.addEventListener('DOMContentLoaded', () => {
        console.log("Loaded js");
        console.log(benefitsInput);
        console.log(salaryInput);
        console.log(monthBox);
        console.log(yearBox);

        //variables
        let salary //= 100000//parseInt(salaryInput.value);
        let benefits //= 5000//parseInt(benefitsInput.value);
        let deduct_nssf //= true;
        let deduct_nhif //= true;
        let monthly = true;
        let isNewRates //= true;

        //console.log(salary);
        //console.log(benefits);


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

        //handle input change
        document.querySelectorAll("input[type=text]").forEach((input, i) => {
            console.log(input)
            input.addEventListener('change', () => {
                if (i === 0){
                    salary = parseInt(input.value);
                    console.log(salary)
                }

                if(i === 1){
                    benefits = parseInt(input.value);
                    console.log(benefits)
                }
            })
        })
        
        //handler for checkboxes
        yesNHIF.addEventListener('change', function(){
            if(this.checked){
                deduct_nhif = true;
            }
        })

        noNHIF.addEventListener('change', function () {
            if (this.checked) {
                deduct_nhif = false;
            }
        })

        yesNSSF.addEventListener('change', function () {
            if (this.checked) {
                deduct_nssf = true;
            }
        })

        noNSSF.addEventListener('change', function () {
            if (this.checked) {
                deduct_nssf = false;
            }
        })

        newRates.addEventListener('change', function () {
            if (this.checked) {
                isNewRates = true;
            }
        });

        oldRates.addEventListener('change', function () {
            if (this.checked) {
                isNewRates = false;
            }
        });
        
        monthBox.addEventListener('change', function () {
            if (this.checked) {
                monthly = true;
            }
        });

        yearBox.addEventListener('change', function () {
            if (this.checked) {
                monthly = false;
            }
        });

        //total income
        const totalIncome = () => {
            let total = 0;
            //check if value is null or less than zero
            if (salary !== null && benefits !== null) {
                if (salary >= 0 && benefits >= 0) {
                    total += salary + benefits;
                }
            }
            document.querySelector(".val1").textContent = total;
            //console.log(`Total income: ${total}`); //dom output 1
            return total;
        }

        //deduct NSSF/////////
        const deductNSSF = () => {
            let deduction = 0;
            if (deduct_nssf) { //true
                //perform deduction operation
                deduction += nssfDeduction();
                //console.log(`NSSF amount: ${deduction}`) //dom output 2

            } else {
                //set NSSF deduction to zero
                deduction = 0; //flag
                //console.log(`NSSF not deducted: ${deduction}`) //dom output 2
            }

            document.querySelector(".val2").textContent = deduction;
            return deduction;
        }

        //deduct NSSF//////
        const deductNHIF = () => {
            let deduction = 0;
            if (deduct_nhif) { //true
                //perform deduction operation
                deduction += nhifDeduction();

                //console.log(`NHIF amount: ${deduction}`) //dom output 11
            } else {
                //set NSSF deduction to zero
                deduction = 0;
                //console.log(`NHIF not deducted: ${deduction}`) //dom output 11
            }

            document.querySelector(".val11").textContent = deduction;
            return deduction;
        }

        ///////////////////////////////////////////////////////////////////
        //not sending output to dom
        const nssfDeduction = () => {
            let salary = totalIncome();
            let nssfAmount = 0;

            if (isNewRates) {//new rates
                if (salary > 18000) { //when pensionable salary > 18000 deuct flat rate = 2160
                    nssfAmount += 2160;
                } else {
                    nssfAmount += salary * 0.12;
                }
            } else { //old rates
                nssfAmount += 200;
            }

            return nssfAmount;
        }

        // get NHIF contribution
        const nhifDeduction = () => {
            let salary = totalIncome();
            let nhifAmount = 0;

            if (salary >= 1000) {

                if (salary >= 1000 && salary <= 5999) {
                    nhifAmount += 150;
                } else if (salary >= 6000 && salary <= 7999) {
                    nhifAmount += 300;
                } else if (salary >= 8000 && salary <= 11999) {
                    nhifAmount += 400;
                } else if (salary >= 12000 && salary <= 14999) {
                    nhifAmount += 500;
                } else if (salary >= 15000 && salary <= 19999) {
                    nhifAmount += 600;
                } else if (salary >= 20000 && salary <= 24999) {
                    nhifAmount += 750;
                } else if (salary >= 25000 && salary <= 29999) {
                    nhifAmount += 850;
                } else if (salary >= 30000 && salary <= 34999) {
                    nhifAmount += 900;
                } else if (salary >= 35000 && salary <= 39999) {
                    nhifAmount += 950;
                } else if (salary >= 40000 && salary <= 44999) {
                    nhifAmount += 1000;
                } else if (salary >= 45000 && salary <= 49999) {
                    nhifAmount += 1100;
                } else if (salary >= 50000 && salary <= 59999) {
                    nhifAmount += 1200;
                } else if (salary >= 60000 && salary <= 69999) {
                    nhifAmount += 1300;
                } else if (salary >= 70000 && salary <= 79999) {
                    nhifAmount += 1400;
                } else if (salary >= 80000 && salary <= 89999) {
                    nhifAmount += 1500;
                } else if (salary >= 90000 && salary <= 99999) {
                    nhifAmount += 1600;
                } else if (salary >= 100000) {
                    nhifAmount += 1700;
                }

            } else {
                //return `can't contribute NHIF if salary is less than 1000`;
                //console.log("less salary, cant deduct")
                nhifAmount += 0;
            }

            return nhifAmount;
        }

        ///////////////////////////////////////////////////////////////////
        //calculate income after pension deduction
        const getIncomeAfterPension = () => {
            //income before pension - all deductible nssf pension contribution
            //return getTotalTaxableIncome() - 200; //getDeductibleNSSF() pension
            let newIncome = totalIncome() - deductNSSF();

            //console.log(`Income After Pension: ${newIncome}`); //dom utput 3
            document.querySelector(".val3").textContent = newIncome;
            return newIncome;
        }

        // get benefits of kind
        const getBenefitsInKind = () => {
            if (benefits !== null && benefits > 0) {
                document.querySelector(".val4").textContent = benefits;
                //console.log(`Benefits: ${benefits}`); //dom output 4
            } else {
                document.querySelector(".val4").textContent = 0;
                //set value of benefits = 0 //dom output 4
            }
        }

        //get taxable income
        const getTaxableIncome = () => {
            let taxableIncome = totalIncome() - deductNSSF();
            document.querySelector(".val5").textContent = taxableIncome;
            //console.log(`taxable Income: ${taxableIncome}`); // dom output 5
            return taxableIncome;
        }

        //tax on taxable income
        const getTaxOnTaxableIncome = () => {

            let income = totalIncome();
            let amount = 0;
            //what is the monthly payable
            if (income <= 12, 298) {
                //val = income * 0.1;
                amount += income * 0.1;
            } else if (income >= 12999 && income <= 23885) {
                //val = income * 0.15;
                amount += income * 0.15;
            } else if (income >= 23886 && income <= 35472) {
                //val = income * 0.2;
                amount += income * 0.2;
            } else if (income >= 35473 && income <= 47059) {
                //val = income * 0.25;
                amount += income * 0.25;
            } else if (income > 47059) {
                //val = income * 0.3;
                amount += income * 0.3;
            }

            //console.log(`Tax on Taxable Income: ${amount}`)
            document.querySelector(".val6").textContent = amount;
            return amount;
        }

        //personal relief
        const getPersonalRelief = () => {
            let relief = 0;

            if (monthly) {
                relief += 2400;
                //console.log(`Monthly relief: ${relief}`); //dom output 7
            } else {
                relief += 28800;
                //console.log(`Annual relief: ${relief}`); //dom output 7 
            }
            document.querySelector(".val7").textContent = relief;
            return relief;
        }

        //tax net off relief also similiar to PAYE
        const getTaxOffRelief = () => {
            //Tax on taxable income - personal relief
            let amount = getTaxOnTaxableIncome() - getPersonalRelief();
            document.querySelector(".val8").textContent = amount;
            //console.log(`Tax off Relief: ${amount}`) //dom output 8
            return amount;
        }

        // get PAYE |similar to tax net off relief|
        const getPAYE = () => {
            //Tax on taxable income - personal relief
            let amount = getTaxOnTaxableIncome() - getPersonalRelief();
            document.querySelector(".val9").textContent = amount;
            //console.log(`PAYE: ${amount}`); //dom output 9
            return amount;
        }

        //get chargeable income | similar to income after pension deduction |
        const getChargeableIncome = () => {
            //income before pension - NSSF pension
            let amount = totalIncome() - deductNSSF();
            document.querySelector(".val10").textContent = amount;
            //console.log(`Chargeable Income: ${amount}`); //dom output 10
            return amount;
        }

        //calculate net pay
        const getNetPay = () => {
            //total taxable income - all other deductions
            // getTotalTaxibleIncome - (getNHIF() + getPAYE() + getPersonalRelief() + getDeductibleNSSF())
            let paye = getPAYE();
            let nhif = deductNHIF()
            let relief = getPersonalRelief();
            let nssf = deductNSSF()
            let totalAmount = totalIncome();

            let pay = totalAmount - (paye + nhif + relief + nssf);
            document.querySelector(".val12").textContent = pay;
            ///console.log(`Net pay: ${pay}`); //dom output 12
            return pay;
        }

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

 
        //perform calculations when calculate button is clicked
        calculateBtn.addEventListener('click', () => {
            console.log("starting calculation")
            console.log(salary)
            console.log(benefits)
            //invoke calculate method
            calculate();
        });


        //event listener to the start button
        getStarted.addEventListener('click', () => {
            document.querySelector(".info").style.display = 'block';
        });
        //close alert box
        document.getElementById("close").addEventListener('click', () => {
            document.querySelector(".info").style.display = 'none';
        });

    });
    
})();