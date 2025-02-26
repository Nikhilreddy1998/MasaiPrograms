function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.5 ? resolve("Data fetched successfully") : reject("Failed to fetch data");
        }, 1000);
    });
}

async function fetchDataHandler() {
    try {
        const data = await fetchData();
        console.log("Fetched data successfully!", data);
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}

fetchDataHandler();