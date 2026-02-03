// Get the rum ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const rumId = urlParams.get('id');

// Load the rum data
if (rumId && rumDetails[rumId]) {
    const rum = rumDetails[rumId];
    
    // Update the page with rum information
    document.getElementById('rumTitle').textContent = rum.name;
    document.getElementById('rumOrigin').textContent = rum.origin;
    document.getElementById('rumAbv').textContent = rum.abv;
    document.getElementById('rumAge').textContent = rum.age;
    document.getElementById('rumType').textContent = rum.type;
    
    document.getElementById('producerInfo').innerHTML = rum.producer;
    document.getElementById('agingInfo').innerHTML = rum.aging;
    
    document.getElementById('appearance').textContent = rum.appearance;
    document.getElementById('nose').textContent = rum.nose;
    document.getElementById('palate').textContent = rum.palate;
    document.getElementById('finish').textContent = rum.finish;
    
    // Add sources
    const sourceList = document.getElementById('sourceList');
    rum.sources.forEach(source => {
        const li = document.createElement('li');
        li.innerHTML = `
            <a href="${source.url}" target="_blank">${source.title}</a>
            <p>${source.description}</p>
        `;
        sourceList.appendChild(li);
    });
    
    // Update page title
    document.title = `${rum.name} - Rum Details`;
} else {
    document.getElementById('rumTitle').textContent = 'Rum Not Found';
    document.querySelector('.detail-container').innerHTML = '<p style="padding: 2rem;">Sorry, we couldn\'t find information about this rum.</p>';
}
