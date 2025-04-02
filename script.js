document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const chatOptions = document.getElementById('chat-options');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // Chat data structure
    const chatData = {
        welcome: {
            message: "Hello! I'm OrganicGrow AI, your natural and organic farming assistant. How can I help with your sustainable farming journey today?",
            options: [
                { text: "Organic Seed Selection", next: "organicSeeds" },
                { text: "Natural Pest Management", next: "naturalPestControl" },
                { text: "Soil Fertility", next: "organicSoilHealth" },
                { text: "Companion Planting", next: "companionPlanting" },
                { text: "Climate Resilience", next: "climateResilience" }
            ]
        },
        organicSeeds: {
            message: "Organic seeds are grown without synthetic fertilizers or pesticides. What information about organic seeds are you looking for?",
            options: [
                { text: "Heirloom varieties", next: "heirloomSeeds" },
                { text: "Seed saving techniques", next: "seedSaving" },
                { text: "Open-pollinated vs. hybrid", next: "seedTypes" },
                { text: "Back to main menu", next: "welcome" }
            ]
        },
        heirloomSeeds: {
            message: "Heirloom seeds are traditional varieties passed down through generations. They offer genetic diversity, unique flavors, and adaptation to local conditions. Would you like information on specific heirloom crops?",
            options: [
                { text: "Heirloom vegetables", next: "heirloomVegetables" },
                { text: "Heirloom grains", next: "heirloomGrains" },
                { text: "Sourcing heirloom seeds", next: "findingHeirloomSeeds" },
                { text: "Back to organic seeds", next: "organicSeeds" }
            ]
        },
        seedSaving: {
            message: "Seed saving is essential for organic farming sustainability. It preserves genetic diversity and develops locally-adapted varieties. Which aspect interests you?",
            options: [
                { text: "Basic seed saving methods", next: "basicSeedSaving" },
                { text: "Seed storage techniques", next: "seedStorage" },
                { text: "Avoiding cross-pollination", next: "avoidingCrossPollination" },
                { text: "Back to organic seeds", next: "organicSeeds" }
            ]
        },
        naturalPestControl: {
            message: "Natural pest management works with nature to control pests without synthetic chemicals. What specific approach would you like to explore?",
            options: [
                { text: "Beneficial insects", next: "beneficialInsects" },
                { text: "Plant-based remedies", next: "plantBasedRemedies" },
                { text: "Physical barriers", next: "physicalBarriers" },
                { text: "Integrated pest management", next: "ipm" }
            ]
        },
        beneficialInsects: {
            message: "Beneficial insects are natural predators that help control pest populations. Which beneficial insects would you like to learn about?",
            options: [
                { text: "Ladybugs and lacewings", next: "aphidPredators" },
                { text: "Parasitic wasps", next: "parasiticWasps" },
                { text: "Attracting beneficials", next: "attractingBeneficials" },
                { text: "Back to natural pest control", next: "naturalPestControl" }
            ]
        },
        plantBasedRemedies: {
            message: "Plant-based pest remedies utilize natural compounds to deter or eliminate pests. What would you like to know about?",
            options: [
                { text: "Neem oil applications", next: "neemOil" },
                { text: "Herbal insect sprays", next: "herbalSprays" },
                { text: "Fermented plant extracts", next: "fermentedExtracts" },
                { text: "Back to natural pest control", next: "naturalPestControl" }
            ]
        },
        neemOil: {
            message: "Neem oil is a powerful organic pesticide derived from the neem tree. It disrupts insect feeding and reproduction while being safe for most beneficial insects. It's effective against aphids, mites, scale, and many caterpillars. Would you like to know how to use it?",
            options: [
                { text: "Neem oil recipe", next: "neemOilRecipe" },
                { text: "Application guidelines", next: "neemApplication" },
                { text: "Precautions and limitations", next: "neemPrecautions" },
                { text: "Back to plant-based remedies", next: "plantBasedRemedies" }
            ]
        },
        organicSoilHealth: {
            message: "Soil fertility is the heart of organic farming. Healthy soil grows healthy plants that resist pests and diseases. What aspect of organic soil management interests you?",
            options: [
                { text: "Compost making", next: "compostMethods" },
                { text: "Cover crops", next: "coverCrops" },
                { text: "Biofertilizers", next: "biofertilizers" },
                { text: "No-till practices", next: "noTill" }
            ]
        },
        compostMethods: {
            message: "Composting transforms organic waste into nutrient-rich soil amendment. Which composting method would you like to learn about?",
            options: [
                { text: "Hot composting", next: "hotComposting" },
                { text: "Vermicomposting", next: "vermicomposting" },
                { text: "Bokashi fermentation", next: "bokashi" },
                { text: "Back to soil fertility", next: "organicSoilHealth" }
            ]
        },
        hotComposting: {
            message: "Hot composting accelerates decomposition through microbial activity, reaching temperatures of 130-160°F. This kills weed seeds and pathogens while quickly producing finished compost in 1-3 months. Would you like specific instructions?",
            options: [
                { text: "Materials balance", next: "compostMaterials" },
                { text: "Building a hot pile", next: "buildCompostPile" },
                { text: "Troubleshooting", next: "compostTroubleshooting" },
                { text: "Back to compost methods", next: "compostMethods" }
            ]
        },
        coverCrops: {
            message: "Cover crops build soil fertility, prevent erosion, suppress weeds, and break pest cycles. Which type of cover crop interests you most?",
            options: [
                { text: "Nitrogen-fixing legumes", next: "legumeCoverCrops" },
                { text: "Deep-rooted soil builders", next: "soilBuilders" },
                { text: "Winter cover options", next: "winterCover" },
                { text: "Back to soil fertility", next: "organicSoilHealth" }
            ]
        },
        companionPlanting: {
            message: "Companion planting uses plant relationships to enhance growth, deter pests, and maximize space. What would you like to know about companion planting?",
            options: [
                { text: "Classic plant combinations", next: "classicCompanions" },
                { text: "Guild planting", next: "guildPlanting" },
                { text: "Plants to separate", next: "incompatiblePlants" },
                { text: "Back to main menu", next: "welcome" }
            ]
        },
        classicCompanions: {
            message: "Some time-tested companion planting combinations include: Three Sisters (corn, beans, squash), tomatoes with basil, onions with carrots, and marigolds with most vegetables. Which would you like more details about?",
            options: [
                { text: "Three Sisters planting", next: "threeSisters" },
                { text: "Tomato companions", next: "tomatoCompanions" },
                { text: "Pest-repelling companions", next: "pestRepellentPlants" },
                { text: "Back to companion planting", next: "companionPlanting" }
            ]
        },
        threeSisters: {
            message: "The Three Sisters is an indigenous companion planting system where corn provides support for beans, beans fix nitrogen for corn and squash, and squash leaves shade the soil and deter pests. Would you like planting instructions?",
            options: [
                { text: "Planting layout", next: "threeSistersLayout" },
                { text: "Timing and spacing", next: "threeSistersTiming" },
                { text: "Modern adaptations", next: "modernThreeSisters" },
                { text: "Back to classic companions", next: "classicCompanions" }
            ]
        },
        biofertilizers: {
            message: "Biofertilizers contain living microorganisms that enhance soil biology and plant nutrition. What type of biofertilizer interests you?",
            options: [
                { text: "Compost tea brewing", next: "compostTea" },
                { text: "Microbial inoculants", next: "microbeInoculants" },
                { text: "Indigenous microorganisms", next: "IMO" },
                { text: "Back to soil fertility", next: "organicSoilHealth" }
            ]
        },
        compostTea: {
            message: "Compost tea multiplies beneficial microbes in an aerated brew, creating a powerful soil and foliar fertilizer. It improves plant immunity, nutrient uptake, and soil life. Would you like to learn how to make it?",
            options: [
                { text: "Basic brewing method", next: "basicCompostTea" },
                { text: "Adding biostimulants", next: "teaAdditives" },
                { text: "Application guidelines", next: "teaApplication" },
                { text: "Back to biofertilizers", next: "biofertilizers" }
            ]
        },
        noTill: {
            message: "No-till organic farming preserves soil structure, increases carbon sequestration, and protects soil biology. It mimics natural ecosystems where soil is rarely disturbed. How would you like to implement no-till practices?",
            options: [
                { text: "Mulch-based systems", next: "mulchSystems" },
                { text: "Transitioning to no-till", next: "noTillTransition" },
                { text: "Tools for no-till farming", next: "noTillTools" },
                { text: "Back to soil fertility", next: "organicSoilHealth" }
            ]
        },
        climateResilience: {
            message: "Building climate resilience is essential for organic farmers facing extreme weather. What specific climate challenge would you like solutions for?",
            options: [
                { text: "High temperature management", next: "highTempManagement" },
                { text: "Humidity challenges", next: "humidityIssues" },
                { text: "Drought strategies", next: "droughtStrategies" },
                { text: "Extreme weather protection", next: "extremeWeather" }
            ]
        },
        highTempManagement: {
            message: "High temperatures can stress plants and reduce yields. What aspect of managing high temperatures would you like advice on?",
            options: [
                { text: "Shade systems", next: "shadeSystems" },
                { text: "Heat-resistant varieties", next: "heatResistantCrops" },
                { text: "Watering in heat", next: "heatWatering" },
                { text: "Back to climate resilience", next: "climateResilience" }
            ]
        },
        shadeSystems: {
            message: "Natural shade systems can reduce temperature stress by 10-15°F. Options include shade cloth, vertical trellising, companion planting with tall crops, and agroforestry approaches. Which would you like details on?",
            options: [
                { text: "Temporary shade structures", next: "tempShades" },
                { text: "Living shade systems", next: "livingShade" },
                { text: "Best placement for shade", next: "shadePlacement" },
                { text: "Back to temperature management", next: "highTempManagement" }
            ]
        },
        heatResistantCrops: {
            message: "Heat-resistant crop varieties have adaptations like waxy leaves, deep roots, or shorter maturation periods. Which type of heat-adapted crops are you interested in?",
            options: [
                { text: "Heat-tolerant vegetables", next: "heatVegetables" },
                { text: "Drought-tolerant grains", next: "heatGrains" },
                { text: "Native heat-adapted plants", next: "nativeHeatPlants" },
                { text: "Back to temperature management", next: "highTempManagement" }
            ]
        },
        humidityIssues: {
            message: "High humidity increases disease pressure in organic systems. What humidity-related challenges are you facing?",
            options: [
                { text: "Fungal disease prevention", next: "fungalPrevention" },
                { text: "Air circulation techniques", next: "airCirculation" },
                { text: "Humidity-tolerant varieties", next: "humidityTolerantCrops" },
                { text: "Back to climate resilience", next: "climateResilience" }
            ]
        },
        fungalPrevention: {
            message: "Preventing fungal diseases in high humidity requires integrated approaches. Which organic methods would you like to learn about?",
            options: [
                { text: "Organic fungal sprays", next: "organicFungicides" },
                { text: "Plant spacing for airflow", next: "spacingForAirflow" },
                { text: "Timing plantings to avoid peak humidity", next: "timingPlantings" },
                { text: "Back to humidity issues", next: "humidityIssues" }
            ]
        },
        organicFungicides: {
            message: "Organic fungal prevention sprays include baking soda solutions, milk sprays, neem oil, copper-based products, and compost tea. Many work preventatively rather than curatively. Which would you like specific recipes for?",
            options: [
                { text: "Baking soda spray recipe", next: "bakingSodaSpray" },
                { text: "Compost tea for disease", next: "diseaseTea" },
                { text: "Commercial organic options", next: "commercialFungicides" },
                { text: "Back to fungal prevention", next: "fungalPrevention" }
            ]
        },
        droughtStrategies: {
            message: "Organic drought management combines water conservation, soil building, and adapted plants. What aspect would you like to explore?",
            options: [
                { text: "Water-efficient irrigation", next: "efficientIrrigation" },
                { text: "Soil moisture retention", next: "soilMoisture" },
                { text: "Drought-tolerant varieties", next: "droughtVarieties" },
                { text: "Back to climate resilience", next: "climateResilience" }
            ]
        },
        efficientIrrigation: {
            message: "Water-efficient irrigation systems minimize waste while maximizing plant uptake. Which irrigation method interests you most?",
            options: [
                { text: "Drip irrigation systems", next: "dripIrrigation" },
                { text: "Ollas (buried clay pots)", next: "ollas" },
                { text: "Wicking beds", next: "wickingBeds" },
                { text: "Back to drought strategies", next: "droughtStrategies" }
            ]
        },
        soilMoisture: {
            message: "Building soil that retains moisture is key to drought resilience. Each 1% increase in organic matter can store 20,000 gallons of water per acre. Which soil moisture strategy interests you?",
            options: [
                { text: "Mulching techniques", next: "mulchingTechniques" },
                { text: "Biochar applications", next: "biocharUse" },
                { text: "Deep soil building", next: "deepSoilBuilding" },
                { text: "Back to drought strategies", next: "droughtStrategies" }
            ]
        },
        extremeWeather: {
            message: "Protecting crops from extreme weather events requires preparation and quick response. What type of extreme weather protection are you interested in?",
            options: [
                { text: "Windbreak systems", next: "windbreaks" },
                { text: "Flood resilience", next: "floodResilience" },
                { text: "Hail protection", next: "hailProtection" },
                { text: "Back to climate resilience", next: "climateResilience" }
            ]
        },
        windbreaks: {
            message: "Windbreaks reduce crop damage, water loss, and soil erosion during high winds. Natural windbreaks also provide habitat for beneficial insects and birds. What type of windbreak system interests you?",
            options: [
                { text: "Living windbreaks", next: "livingWindbreaks" },
                { text: "Temporary windbreak options", next: "tempWindbreaks" },
                { text: "Sizing and placement", next: "windbreakPlacement" },
                { text: "Back to extreme weather", next: "extremeWeather" }
            ]
        }
        // Additional paths can be extended as needed
    };

    // Function to add a message to the chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender === 'bot' ? 'bot-message' : 'user-message');
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('typing-indicator');
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        typingDiv.id = 'typing-indicator';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Function to display options
    function displayOptions(options) {
        chatOptions.innerHTML = '';
        options.forEach(option => {
            const button = document.createElement('button');
            button.classList.add('option-button');
            button.textContent = option.text;
            button.addEventListener('click', () => {
                addMessage(option.text, 'user');
                
                // Clear options
                chatOptions.innerHTML = '';
                
                // Show typing indicator
                showTypingIndicator();
                
                // Simulate bot thinking
                setTimeout(() => {
                    removeTypingIndicator();
                    processUserChoice(option.next);
                }, 1000);
            });
            chatOptions.appendChild(button);
        });
    }

    // Function to process user choice and move to next conversation step
    function processUserChoice(nextStep) {
        if (chatData[nextStep]) {
            addMessage(chatData[nextStep].message, 'bot');
            displayOptions(chatData[nextStep].options);
        } else {
            addMessage("I'm sorry, I don't have information on that topic yet. Let me take you back to the main menu.", 'bot');
            setTimeout(() => {
                processUserChoice('welcome');
            }, 1000);
        }
    }

    // Initialize the chat
    function initChat() {
        addMessage(chatData.welcome.message, 'bot');
        displayOptions(chatData.welcome.options);
    }

    // Start the chat when page loads
    initChat();
});