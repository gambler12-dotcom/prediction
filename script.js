document.addEventListener('DOMContentLoaded', function() {
    // App state
    const state = {
        selectedType: 'big',
        history: Array(6).fill(null),
        types: ['big', 'small']
    };

    // DOM elements
    const historyContainer = document.getElementById('historyContainer');
    const bigBtn = document.getElementById('bigBtn');
    const smallBtn = document.getElementById('smallBtn');
    const predictBtn = document.getElementById('predictBtn');
    const resultContainer = document.getElementById('resultContainer');
    const historyDisplay = document.getElementById('historyDisplay');
    const predictionValue = document.getElementById('predictionValue');

    // Initialize history circles
    function initHistoryCircles() {
        historyContainer.innerHTML = '';
        
        for (let i = 0; i < 6; i++) {
            const circle = document.createElement('div');
            circle.className = 'history-circle';
            if (state.history[i]) {
                circle.classList.add(state.history[i]);
            }
            
            circle.addEventListener('click', function() {
                if (!state.selectedType) return;
                
                // Update state
                state.history[i] = state.selectedType;
                
                // Update UI
                this.className = 'history-circle ' + state.selectedType;
                
                // Add ripple effect
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                this.appendChild(ripple);
                
                // Remove ripple after animation
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
            
            historyContainer.appendChild(circle);
        }
    }

    // Initialize type buttons
    function initTypeButtons() {
        bigBtn.addEventListener('click', function() {
            state.selectedType = 'big';
            this.classList.add('active');
            smallBtn.classList.remove('active');
        });
        
        smallBtn.addEventListener('click', function() {
            state.selectedType = 'small';
            this.classList.add('active');
            bigBtn.classList.remove('active');
        });
    }

    // Predict next type
    function predictNext() {
        // Check if all history is filled
        if (state.history.some(type => type === null)) {
            alert('Please fill all 6 history slots first');
            return;
        }
        
        // Simple prediction algorithm
        const bigCount = state.history.filter(type => type === 'big').length;
        const smallCount = state.history.filter(type => type === 'small').length;
        
        let prediction;
        if (bigCount > smallCount) {
            prediction = 'small';
        } else if (smallCount > bigCount) {
            prediction = 'big';
        } else {
            // If equal, random prediction
            prediction = Math.random() > 0.5 ? 'big' : 'small';
        }
        
        // Update result display
        updateResultDisplay(prediction);
    }

    // Update result display
    function updateResultDisplay(prediction) {
        // Update history display
        historyDisplay.innerHTML = '';
        state.history.forEach(type => {
            const badge = document.createElement('div');
            badge.className = type ? `history-badge ${type}` : 'history-badge empty';
            badge.textContent = type ? type.charAt(0).toUpperCase() : '?';
            historyDisplay.appendChild(badge);
        });
        
        // Update prediction
        predictionValue.textContent = prediction.toUpperCase();
        predictionValue.className = 'prediction-value ' + prediction;
        
        // Show result container with animation
        resultContainer.style.display = 'block';
        resultContainer.style.animation = 'none';
        void resultContainer.offsetWidth; // Trigger reflow
        resultContainer.style.animation = 'fadeIn 0.4s ease';
    }

    // Initialize app
    function initApp() {
        initHistoryCircles();
        initTypeButtons();
        
        predictBtn.addEventListener('click', predictNext);
    }

    // Start the app
    initApp();
});
