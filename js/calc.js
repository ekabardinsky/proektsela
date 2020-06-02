window.calcState = {
    exlusive: {
        price: {
            bottom: 100,
            top: 200
        },
        state: false,
        includes: []
    },
    architecture: {
        price: {
            bottom: 50,
            top: 50
        },
        state: false,
        includes: ["exlusive"]
    },
    constructive: {
        price: {
            bottom: 100,
            top: 200
        },
        state: false,
        includes: []
    },
    electro: {
        price: {
            supportPriceOff: true,
            bottom: 75,
            top: 100
        },
        state: false,
        includes: []
    },
    water: {
        price: {
            supportPriceOff: true,
            bottom: 60,
            top: 100
        },
        state: false,
        includes: []
    },
    heating: {
        price: {
            supportPriceOff: true,
            bottom: 150,
            top: 250
        },
        state: false,
        includes: []
    }
}

function changeState(checker) {
    // update state
    var id = checker.id
    var currentValue = window.calcState[id].state;
    var value = window.calcState[id].state = !currentValue;

    // update includes options
    window.calcState[id].includes.forEach(function (includedOption) {
        window.calcState[includedOption].state = value;
        var includedOptionElement = document.getElementById(includedOption);
        includedOptionElement.style.background = value ? "#6C911D" : "rgba(40,40,40,0.2)";
    });

    // update background
    checker.style.background = value ? "#6C911D" : "rgba(40,40,40,0.2)";
    calcCosts();
}

function calcCosts() {
    // prepare data
    var areaElement = document.getElementById("area");
    var minimalArea = 75;
    var area = parseFloat(areaElement.value) > minimalArea ? areaElement.value : minimalArea;

    // calc cost
    var sumBottom = 0;
    var sumTop = 0;
    var isPriceOff = window.calcState.electro.state && window.calcState.water.state && window.calcState.heating.state;
    var priceOffValue = 0.2;
    Object.keys(window.calcState).forEach(function (option) {
        var currentValue = window.calcState[option].state;
        var priceMultiplier = isPriceOff && window.calcState[option].price.supportPriceOff ? 1 - priceOffValue : 1;

        if (currentValue) {
            sumBottom += window.calcState[option].price.bottom * area * priceMultiplier;
            sumTop += window.calcState[option].price.top * area * priceMultiplier;

            // for each includes
            window.calcState[option].includes.forEach(key => {
                var priceMultiplier = isPriceOff && window.calcState[key].price.supportPriceOff ? 1 - priceOffValue : 1;

                var currentValue = window.calcState[key].state;
                if (!currentValue) {
                    sumBottom += window.calcState[key].price.bottom * area * priceMultiplier;
                    sumTop += window.calcState[key].price.top * area * priceMultiplier;
                }
            });
        }
    });

    // update values
    document.getElementById("sumBottom").innerText = Math.round(sumBottom) + " Р";
    document.getElementById("sumTop").innerText = Math.round(sumTop) + " Р";
}