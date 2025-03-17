let map;
let routingControl;
let markers = [];
let startAutocompleteList;
let endAutocompleteList;
let currentFocus = -1;
let navigationMode = false;
let navigationBox = null;
let currentStep = 0;
let currentRoute = null;

// Initialize the map
function initMap() {
    // Create map centered on a default location
    map = L.map('map').setView([40.7128, -74.0060], 13);

    // Add OpenStreetMap tiles with custom options
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
        minZoom: 3
    }).addTo(map);

    // Add scale control
    L.control.scale().addTo(map);

    // Enable location finding
    map.locate({setView: true, maxZoom: 16});
}

// Add this function for debouncing the search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Function to search locations
async function searchLocations(searchText) {
    if (searchText.length < 3) return [];
    
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?` +
            `format=json&q=${encodeURIComponent(searchText)}&` +
            `limit=5&addressdetails=1`
        );
        const data = await response.json();
        return data.map(item => ({
            display: item.display_name,
            lat: item.lat,
            lon: item.lon
        }));
    } catch (error) {
        console.error('Error searching locations:', error);
        return [];
    }
}

// Function to create autocomplete list
function createAutocompleteList(input) {
    const list = document.createElement("div");
    list.setAttribute("class", "autocomplete-list");
    input.parentNode.appendChild(list);
    return list;
}

// Function to update autocomplete list
async function updateAutocompleteList(input, listElement) {
    const searchText = input.value;
    if (!searchText) {
        listElement.style.display = 'none';
        return;
    }

    const locations = await searchLocations(searchText);
    
    listElement.innerHTML = '';
    if (locations.length > 0) {
        locations.forEach(location => {
            const item = document.createElement('div');
            item.innerHTML = location.display;
            item.addEventListener('click', function() {
                input.value = location.display;
                input.dataset.lat = location.lat;
                input.dataset.lon = location.lon;
                listElement.style.display = 'none';
            });
            listElement.appendChild(item);
        });
        listElement.style.display = 'block';
    } else {
        listElement.style.display = 'none';
    }
}

// Function to get coordinates from location name
async function getCoordinates(locationName, input) {
    // If we have coordinates from autocomplete, use them
    if (input.dataset.lat && input.dataset.lon) {
        return {
            coords: [parseFloat(input.dataset.lat), parseFloat(input.dataset.lon)],
            displayName: locationName
        };
    }

    // Fallback to original search
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}&limit=1`);
        const data = await response.json();
        
        if (data.length > 0) {
            return {
                coords: [parseFloat(data[0].lat), parseFloat(data[0].lon)],
                displayName: data[0].display_name
            };
        }
        return null;
    } catch (error) {
        console.error('Error getting coordinates:', error);
        return null;
    }
}

// Clear existing markers
function clearMarkers() {
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
}

// Add marker with popup
function addMarker(coords, title, icon) {
    const marker = L.marker(coords, {
        icon: L.divIcon({
            className: 'custom-div-icon',
            html: `<i class="fas ${icon} fa-2x"></i>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        })
    }).addTo(map);
    
    marker.bindPopup(title);
    markers.push(marker);
}

// Calculate and display route
async function calculateRoute() {
    const startInput = document.getElementById('startPoint');
    const endInput = document.getElementById('endPoint');
    const startLocation = startInput.value;
    const endLocation = endInput.value;

    if (!startLocation || !endLocation) {
        showNotification('Please enter both start and end locations', 'error');
        return;
    }

    document.body.style.cursor = 'wait';
    
    const startResult = await getCoordinates(startLocation, startInput);
    const endResult = await getCoordinates(endLocation, endInput);

    if (!startResult || !endResult) {
        showNotification('Could not find one or both locations', 'error');
        document.body.style.cursor = 'default';
        return;
    }

    // Clear existing markers and routing
    clearMarkers();
    if (routingControl) {
        map.removeControl(routingControl);
    }

    // Add markers for start and end points
    addMarker(startResult.coords, startResult.displayName, 'fa-map-marker-alt');
    addMarker(endResult.coords, endResult.displayName, 'fa-flag-checkered');

    // Create new routing control with custom options
    routingControl = L.Routing.control({
        waypoints: [
            L.latLng(startResult.coords[0], startResult.coords[1]),
            L.latLng(endResult.coords[0], endResult.coords[1])
        ],
        routeWhileDragging: true,
        showAlternatives: true,
        lineOptions: {
            styles: [{ 
                color: '#4CAF50', 
                weight: 6,
                opacity: 0.8
            }],
            extendToWaypoints: true,
            missingRouteTolerance: 0
        },
        altLineOptions: {
            styles: [
                {color: '#2196F3', weight: 4, opacity: 0.6}
            ]
        },
        createMarker: function() { return null; }
    }).addTo(map);

    // Add route summary handler
    routingControl.on('routesfound', function(e) {
        const routes = e.routes;
        const route = routes[0];
        currentRoute = {
            coordinates: route.coordinates,
            instructions: route.instructions,
            summary: route.summary
        };
        updateRouteInfo(route.summary, startResult.displayName, endResult.displayName);
        
        // Add start navigation button to route info
        const routeInfo = document.getElementById('routeInfo');
        const startNavBtn = document.createElement('button');
        startNavBtn.className = 'start-nav-btn';
        startNavBtn.innerHTML = '<i class="fas fa-play"></i> Start Navigation';
        startNavBtn.onclick = startNavigation;
        routeInfo.appendChild(startNavBtn);
    });

    document.body.style.cursor = 'default';
}

// Update route information display
function updateRouteInfo(summary, start, end) {
    const routeInfo = document.getElementById('routeInfo');
    const distance = (summary.totalDistance / 1000).toFixed(1);
    const time = Math.round(summary.totalTime / 60);
    
    routeInfo.innerHTML = `
        <h3><i class="fas fa-info-circle"></i> Route Information</h3>
        <p><strong>From:</strong> ${start}</p>
        <p><strong>To:</strong> ${end}</p>
        <p><i class="fas fa-road"></i> Distance: ${distance} km</p>
        <p><i class="fas fa-clock"></i> Estimated Time: ${time} minutes</p>
    `;
    routeInfo.style.display = 'block';
}

// Show notification
function showNotification(message, type) {
    alert(message); // You can replace this with a more sophisticated notification system
}

// Initialize autocomplete when the page loads
function initAutocomplete() {
    const startInput = document.getElementById('startPoint');
    const endInput = document.getElementById('endPoint');

    startAutocompleteList = createAutocompleteList(startInput);
    endAutocompleteList = createAutocompleteList(endInput);

    const debouncedUpdate = debounce(updateAutocompleteList, 300);

    startInput.addEventListener('input', () => {
        startInput.dataset.lat = '';
        startInput.dataset.lon = '';
        debouncedUpdate(startInput, startAutocompleteList);
    });

    endInput.addEventListener('input', () => {
        endInput.dataset.lat = '';
        endInput.dataset.lon = '';
        debouncedUpdate(endInput, endAutocompleteList);
    });

    // Close autocomplete lists when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.input-group')) {
            startAutocompleteList.style.display = 'none';
            endAutocompleteList.style.display = 'none';
        }
    });
}

// Modify the window.onload to include initAutocomplete
window.onload = function() {
    initMap();
    initAutocomplete();
};

// Add event listeners for input fields
document.getElementById('startPoint').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') calculateRoute();
});

document.getElementById('endPoint').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') calculateRoute();
});

// Add this function to create the navigation box
function createNavigationBox() {
    const box = document.createElement('div');
    box.className = 'navigation-box';
    box.innerHTML = `
        <div class="nav-header">
            <i class="fas fa-directions"></i> Navigation
            <button class="end-nav-btn" onclick="endNavigation()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="nav-content">
            <div class="nav-next-instruction"></div>
            <div class="nav-stats">
                <div>
                    <i class="fas fa-clock"></i>
                    <span class="remaining-time"></span>
                </div>
                <div>
                    <i class="fas fa-road"></i>
                    <span class="remaining-distance"></span>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(box);
    return box;
}

// Add function to start navigation
function startNavigation() {
    if (!currentRoute) return;
    
    navigationMode = true;
    currentStep = 0;
    
    // Create navigation box if it doesn't exist
    if (!navigationBox) {
        navigationBox = createNavigationBox();
    }
    navigationBox.style.display = 'block';
    
    // Center map on start location with higher zoom
    const startCoords = currentRoute.coordinates[0];
    map.setView([startCoords.lat, startCoords.lng], 18);
    
    updateNavigationInfo();
}

// Add function to end navigation
function endNavigation() {
    navigationMode = false;
    if (navigationBox) {
        navigationBox.style.display = 'none';
    }
    // Reset map view to show entire route
    if (currentRoute) {
        map.fitBounds(L.latLngBounds(currentRoute.coordinates));
    }
}

// Add function to update navigation information
function updateNavigationInfo() {
    if (!navigationMode || !currentRoute || !navigationBox) return;

    const instructions = currentRoute.instructions;
    const currentInstruction = instructions[currentStep];
    
    const nextInstructionDiv = navigationBox.querySelector('.nav-next-instruction');
    const remainingTimeSpan = navigationBox.querySelector('.remaining-time');
    const remainingDistanceSpan = navigationBox.querySelector('.remaining-distance');
    
    // Calculate remaining distance and time from current step to end
    let remainingDistance = 0;
    let remainingTime = 0;
    for (let i = currentStep; i < instructions.length; i++) {
        remainingDistance += instructions[i].distance;
        remainingTime += instructions[i].time;
    }
    
    // Update navigation box content
    nextInstructionDiv.innerHTML = `
        <div class="instruction-icon">
            <i class="fas ${getInstructionIcon(currentInstruction.type)}"></i>
        </div>
        <div class="instruction-text">
            <div class="main-instruction">${currentInstruction.text}</div>
            <div class="sub-instruction">${formatDistance(currentInstruction.distance)}</div>
        </div>
    `;
    
    remainingTimeSpan.textContent = formatTime(remainingTime);
    remainingDistanceSpan.textContent = formatDistance(remainingDistance);
}

// Helper function to get icon for instruction type
function getInstructionIcon(type) {
    const icons = {
        'turn-right': 'fa-turn-right',
        'turn-left': 'fa-turn-left',
        'straight': 'fa-arrow-up',
        'roundabout': 'fa-circle-notch',
        'default': 'fa-arrow-up'
    };
    return icons[type] || icons.default;
}

// Helper function to format distance
function formatDistance(distance) {
    return (distance / 1000).toFixed(2) + ' km';
}

// Helper function to format time
function formatTime(time) {
    return Math.round(time / 60) + ' minutes';
} 