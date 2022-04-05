//Always start getting and displaying current number of organizations on Github
requestTotalOrgs();
const nameForm = document.getElementById('name-form');

// Listen for submissions on organization name input form
nameForm.addEventListener('submit', (e) => {

    e.preventDefault();
    let organizationInput = document.getElementById('organization-name');
    let organizationName = organizationInput.value;
    requestOrgRepoInfo(organizationName);

})


// Given the organization name request and show to frontend its biggest repo by size 
// and its total number of repos
function requestOrgRepoInfo(organizationName) {

    // Create the get request that will retrieve the data
    const xhr = new XMLHttpRequest();
    const url = `https://api.github.com/search/repositories?q=org:${organizationName}`;
    xhr.open('GET', url, true);

    // When request is received is processed here
    xhr.onload = function () {

        const data = JSON.parse(this.response);
        if (data.items) {
            data.items.sort((a, b) => parseInt(b.size) - parseInt(a.size));
        }

        // Display obtained results at html
        if (!data.errors) {
            var size = data.items[0].size * 1024; // supposing conversion is done by powers of 2
            document.getElementById("searchResults").innerHTML =
                `<h3 class="text-center">${organizationName} search results</h3>
                 <p class="text-center mt-4"><strong>Number of repositories:</strong> ${data.total_count}</p>
                 <p class="text-center"><strong>Biggest Repository:</strong> ${data.items[0].name} (${size} bytes)</p>`;
        }
        // If got an error display to the user that the organization was unreachable
        else {
            document.getElementById("searchResults").innerHTML = '<h6 class="text-center text-danger">Organization not found</h6>';
        }

    }

    xhr.send();
}

// Request and show to frontend all searched data
function requestTotalOrgs() {

    // Create the get request that will retrieve the data
    const xhr = new XMLHttpRequest();
    const url = 'https://api.github.com/search/users?q=type:org';
    xhr.open('GET', url, true);

   // When request is received is processed here
    xhr.onload = function () {

        const data = JSON.parse(this.response);

        // Display obtained results at html
        document.getElementById("total-orgs").innerHTML = data.total_count;
    }

    xhr.send();
}