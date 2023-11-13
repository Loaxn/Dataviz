document.querySelectorAll("path").forEach(element => {
    element.addEventListener('click', function() {
        const CRITERIA_STATE = this.id;

        fetch('data2.json')
            .then((response) => response.json())
            .then((dataFetched) => {
                const CRITERIA_YEAR = "2016";
                const CRITERIA_INDICATOR = 'Heroin (T40.1)';

                const dataReduced = dataFetched.filter(d => (
                    d.Year === CRITERIA_YEAR &&
                    d && d["State Name"] === CRITERIA_STATE &&
                    d.Indicator === CRITERIA_INDICATOR
                ));

                const dataValues = dataReduced.map(d => (
                    d && d["Data Value"]
                ));
                console.log(dataValues);
                // Now you can use dataValues to display or process the data as needed
            });
    });
});
