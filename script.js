async function getData()    {
    const url = "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff"
    const employmentUrl = "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065";
    try {

        const dataPromise = await fetch(url)
        const dataPromise2 = await fetch(employmentUrl)
        const dataJSON = await dataPromise.json()
        const dataJSON2 = await dataPromise2.json()

        const municipalities = dataJSON.dataset.dimension.Alue.category.label;
        const populations = dataJSON.dataset.value;
        const employment = dataJSON2.dataset.value;

        const tbody = document.getElementById("table-body");

        Object.keys(municipalities).forEach((key, index) => {
            const tr = document.createElement("tr");

            const td1 = document.createElement("td");
            td1.textContent = municipalities[key];
            tr.appendChild(td1);

            const td2 = document.createElement("td");
            td2.textContent = populations[index];
            tr.appendChild(td2);

            const td3 = document.createElement("td");
            td3.textContent = employment[index];
            tr.appendChild(td3);

            const employmentPercentage = (employment[index] / populations[index]) * 100;
                    const td4 = document.createElement("td");
                    td4.textContent = employmentPercentage.toFixed(2) + "%";
                    tr.appendChild(td4);


                    if (employmentPercentage > 45) {
                        tr.style.backgroundColor = "#abffbd";
                    } else if (employmentPercentage < 25) {
                        tr.style.backgroundColor = "#ff9e9e";
                    }


            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

document.addEventListener("DOMContentLoaded", getData);

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
//https://developer.mozilla.org/en-US/docs/Web/API/Response/json
//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
