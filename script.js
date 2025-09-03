// Object containing translations for different languages
const translations = {
    en: {
        heading: "Hi, I am Mufasa!",
        subheading: "Your gateway to job opportunities and skills development"
    },
    fr: {
        heading: "Salut, je suis Mufasa!",
        subheading: "Votre passerelle vers des opportunités d'emploi et le développement des compétences"
    },
    rw: {
        heading: "Muraho, ndi Mufasa!",
        subheading: "Urugi rwawe rugana ku mahirwe y'akazi n'iterambere ry'ubumenyi"
    },
    es: {
        heading: "Hola, soy Mufasa!",
        subheading: "Tu puerta de entrada a oportunidades laborales y desarrollo de habilidades"
    },
    zh: {
        heading: "嗨，我是木法沙！",
        subheading: "您通往工作机会和技能发展的门户"
    }
};

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Language Translation Functionality
    const languageSelector = document.getElementById("language-selector");

    if (languageSelector) {
        languageSelector.addEventListener("change", (event) => {
            const selectedLanguage = event.target.value;
            const heading = document.querySelector("#home h1");
            const subheading = document.querySelector("#home p");

            // Change the content based on the selected language
            if (heading && subheading && translations[selectedLanguage]) {
                heading.textContent = translations[selectedLanguage].heading;
                subheading.textContent = translations[selectedLanguage].subheading;
            } else {
                console.error("Translation or elements missing for the selected language.");
            }
        });
    } else {
        console.error("Language selector not found in the DOM.");
    }

    // Get Started Button and Resume Upload Section
const getStartedBtn = document.getElementById("get-started-btn");
const resumeUploadSection = document.getElementById("resume-upload");

// Check localStorage to see if the cards should be visible
if (localStorage.getItem("cardsVisible") === "true") {
    resumeUploadSection.style.display = "flex"; // Show the cards
}

if (getStartedBtn && resumeUploadSection) {
    getStartedBtn.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default link behavior

        // Debugging: Log to ensure the button works
        console.log("Get Started button clicked!");

        // Show the upload section and save the state in localStorage
        resumeUploadSection.style.display = "flex";
        localStorage.setItem("cardsVisible", "true");

        // Debugging: Confirm style change
        console.log("Resume Upload Section is now visible!");
    });
} else {
    console.error("Get Started button or Resume Upload section not found in the DOM.");
}
if (!localStorage.getItem("cardsVisible")) {
    console.log("No previous session data found for cardsVisible. Defaulting to hidden.");
}

    // Upload Form Submission
    const uploadForm = document.getElementById("upload-form");

    if (uploadForm) {
        uploadForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const formData = new FormData();
            const fileInput = document.getElementById("resume");
            const file = fileInput.files[0];

            if (!file) {
                alert("Please select a file before uploading.");
                return;
            }

            formData.append("file", file);

            try {
                // Simulate backend call and use default extracted data
                const extractedData = {
                    name: extractName(),
                    date_of_birth: extractDOB(),
                    experience: extractExperience(),
                    skills: extractSkills()
                };

                // Save the extracted data to sessionStorage
                sessionStorage.setItem("extractedData", JSON.stringify(extractedData));

                // Redirect to the extracted info page
                window.location.href = "extracted-info.html";
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred. Please try again.");
            }
        });
    }

    // Load Extracted Information on extracted-info.html
    const extractedInfoContainer = document.getElementById("extracted-info");
    if (extractedInfoContainer) {
        const extractedData = JSON.parse(sessionStorage.getItem("extractedData"));

        if (extractedData) {
            // Create a function to format lists
            const formatAsList = (text) => {
                return text.split(',').map(item => `<li>${item.trim()}</li>`).join('');
            };

            // Dynamically populate the extracted information
            extractedInfoContainer.innerHTML = `
                <div class="content-container card">
                    <h2>Extracted Information</h2>
                    <p><strong>Name:</strong> ${extractedData.name}</p>
                    <p><strong>Date of Birth:</strong> ${extractedData.date_of_birth}</p>
                    <p><strong>Work Experience:</strong></p>
                    <ul>${formatAsList(extractedData.experience)}</ul>
                    <p><strong>Skills:</strong></p>
                    <ul>${formatAsList(extractedData.skills)}</ul>
                </div>
            `;
        } else {
            extractedInfoContainer.innerHTML = "<p>No data available. Please upload a CV.</p>";
        }
    }
});

// Placeholder functions for extracting data
function extractName() {
    return "Amina Msuya";
}
function extractDOB() {
    return "August 10, 2003";
}
function extractExperience() {
    return "5 months in digital marketing, 8 months in college counselling, 4 months in teaching, 4 months in hospitality";
}
function extractSkills() {
    return "Technical skills, programming, communication, customer service, leadership, resilience";
}
document.addEventListener("DOMContentLoaded", () => {
    // Simulated extracted data
    const extractedData = {
        name: "Amina Msuya",
        date_of_birth: "August 10, 2003",
        experience: [
            "5 months in digital marketing",
            "8 months in college counselling",
            "4 months in teaching",
            "4 months in hospitality"
        ],
        skills: [
            "Digital marketing",
            "Programming",
            "Communication",
            "Customer service",
            "Leadership",
            "Resilience",
            "Creativity"
        ]
    };

    const typeWriter = (element, text, delay, callback, speed = 50) => {
        let index = 0;
        const timer = setInterval(() => {
            element.textContent += text.charAt(index);
            index++;
            if (index === text.length) {
                clearInterval(timer);
                if (callback) callback();
            }
        }, delay);
    };

    const typeList = (listElement, items, delay, itemDelay, callback) => {
        let index = 0;
        const typeNextItem = () => {
            if (index < items.length) {
                const li = document.createElement("li");
                listElement.appendChild(li);
                typeWriter(li, items[index], delay, () => {
                    index++;
                    setTimeout(typeNextItem, itemDelay); // Delay before the next item
                });
            } else if (callback) {
                callback();
            }
        };
        typeNextItem();
    };

    // Typewriter animation execution
    typeWriter(document.getElementById("name"), extractedData.name, 10, () => {
        typeWriter(document.getElementById("dob"), extractedData.date_of_birth, 10, () => {
            typeList(document.getElementById("experience-list"), extractedData.experience, 5, 500, () => {
                typeList(document.getElementById("skills-list"), extractedData.skills, 5, 500);
            });
        });
    });
});

const competitiveSkills = {
    "Foundational": ["Problem-solving", "Critical thinking", "Creativity", "Analytical reasoning"],
    "Socio-Emotional": ["Communication", "Teamwork", "Leadership", "Adaptability", "Emotional intelligence"],
    "Specialized": ["Technical skills", "Programming", "Project management", "Entrepreneurship"],
    "Green & Sustainable": ["Environmental awareness", "Sustainable practices"],
    "Digital & Technological": ["Digital literacy", "Cybersecurity", "AI", "Cloud computing"]
};

const userSkills = ["Technical skills", "Programming", "Communication", "Customer service", "Leadership", "Resilience"];

const calculateSkillsComparison = () => {
    const skillCounts = {
        "Foundational": 1,
        "Socio-Emotional": 3,
        "Specialized": 2,
        "Green & Sustainable": 0,
        "Digital & Technological": 1
    };

    userSkills.forEach(skill => {
        for (const category in competitiveSkills) {
            if (competitiveSkills[category].includes(skill)) {
                skillCounts[category]++;
            }
        }
    });

    return skillCounts;
};
document.addEventListener("DOMContentLoaded", () => {
    const competitiveSkills = {
        "Foundational": ["Problem-solving", "Critical thinking", "Creativity", "Analytical reasoning"],
        "Socio-Emotional": ["Communication", "Teamwork", "Leadership", "Adaptability", "Emotional intelligence"],
        "Specialized": ["Technical skills", "Programming", "Project management", "Entrepreneurship"],
        "Green & Sustainable": ["Environmental awareness", "Sustainable practices"],
        "Digital & Technological": ["Digital literacy", "Cybersecurity", "Cloud computing", "AI"]
    };

    const userSkills = ["Technical skills", "Programming", "Communication", "Customer service", "Leadership", "Resilience"];

    const generateRecommendations = () => {
        const missingSkills = {};
        const matchedSkills = {};

        // Initialize empty arrays for missing and matched skills per category
        for (const category in competitiveSkills) {
            missingSkills[category] = [];
            matchedSkills[category] = [];
        }

        // Compare user skills with competitive skill categories
        for (const category in competitiveSkills) {
            competitiveSkills[category].forEach(skill => {
                if (userSkills.includes(skill)) {
                    matchedSkills[category].push(skill);
                } else {
                    missingSkills[category].push(skill);
                }
            });
        }

        return { matchedSkills, missingSkills };
    };

    

    // Button click to display recommendations
    document.getElementById("compare-skills-btn").addEventListener("click", () => {
        const { matchedSkills, missingSkills } = generateRecommendations();

    });
});

    // Display the chart when the button is clicked
    document.getElementById("compare-skills-btn").addEventListener("click", () => {
        const skillCounts = calculateSkillsComparison();
      console.log('button clicked')
        // Prepare the data for the chart
        const data = {
            labels: Object.keys(skillCounts),
            datasets: [{
                label: "Skill Categories",
                data: Object.values(skillCounts),
                backgroundColor: [
                    "#ff9999", "#66b3ff", "#99ff99", "#ffcc99", "#c299ff"
                ]
            }]
        };

        // Show the chart container
        document.getElementById("skills-comparison-chart").style.display = "block";
        const ctx = document.getElementById("skills-chart").getContext("2d");

 // Render the Pie Chart
 new Chart(ctx, {
    type: "pie",
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: "top"
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        // Get the category for the current segment
                        const category = context.chart.data.labels[context.dataIndex];
                        
                        // Define the skill details for each category
                        const skillDetails = {
                            "Foundational": "Problem-solving, Critical thinking, Creativity, Analytical reasoning",
                            "Socio-Emotional": "Communication, Teamwork, Leadership, Adaptability",
                            "Specialized": "Technical skills, Programming, Project management, Entrepreneurship",
                            "Green & Sustainable": "Environmental awareness, Sustainable practices",
                            "Digital & Technological": "Digital Literacy, Cybersecurity, Cloud computing"
                        };

                        // Return the category and corresponding skills for the tooltip
                        return `${category}: ${skillDetails[category]}`;
                    }
                }
            }
        }
    }
});

// Show the skills list below the chart
document.getElementById("skills-details").style.display = "block"; // Make skills list visible
});
 // If data exists in localStorage, populate without re-typing
 if (savedName && savedDOB && savedExperience && savedSkills) {
    nameElement.textContent = savedName;
    dobElement.textContent = savedDOB;
    
    // Populate experience
    const experiences = JSON.parse(savedExperience);
    experiences.forEach(exp => {
        const li = document.createElement('li');
        li.textContent = exp;
        experienceList.appendChild(li);
    });

    // Populate skills
    const skills = JSON.parse(savedSkills);
    skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        skillsList.appendChild(li);
    });

    // If chart was previously shown, show it again
    if (isChartShown) {
        if (skillsChartDescriptions) {
            skillsChartDescriptions.style.display = 'block';
        }
        if (skillsComparisonChart) {
            skillsComparisonChart.querySelector('canvas').style.display = 'block';
        }
    }

    isDataLoaded = true;
} else
document.addEventListener("DOMContentLoaded", () => {
    // Sample job data
    const jobs = [
        {
            title: "Program Sustainability Coordinator",
            category: "Healthcare",
            location: "Rwanda",
            company: "Gardens for Health International",
            description: "Implement nutrition-sensitive programs to improve health outcomes.",
            link: "https://www.alljobspo.com/rwanda-jobs/"
        },
        {
            title: "Procurement Manager",
            category: "Procurement",
            location: "Rwanda",
            company: "Rwanda Interlink Transport Company (RITCO)",
            description: "Manage procurement processes and ensure compliance with regulations.",
            link: "https://www.alljobspo.com/rwanda-jobs/"
        },
        {
            title: "Lecturer for the Center for Gender Equity",
            category: "Education",
            location: "Butaro",
            company: "Partners In Health",
            description: "Teach and promote gender equity in academic settings.",
            link: "https://www.alljobspo.com/rwanda-jobs/"
        },
        {
            title: "Software Engineer",
            category: "Technology",
            location: "Kigali",
            company: "Tech Solutions Ltd",
            description: "Develop innovative software applications and systems.",
            link: "https://www.alljobspo.com/rwanda-jobs/"
        }
    ];

    // Function to display jobs
    const displayJobs = (filterCategory = "all", filterLocation = "all") => {
        const jobList = document.getElementById("job-list");
        jobList.innerHTML = ""; // Clear the list

        jobs
            .filter(job => {
                // Filter by category and location
                const categoryMatch = filterCategory === "all" || job.category === filterCategory;
                const locationMatch = filterLocation === "all" || job.location === filterLocation;
                return categoryMatch && locationMatch;
            })
            .forEach(job => {
                // Create job item
                const li = document.createElement("li");
                li.innerHTML = `
                    <h2>${job.title}</h2>
                    <p><strong>Company:</strong> ${job.company}</p>
                    <p><strong>Location:</strong> ${job.location}</p>
                    <p><strong>Description:</strong> ${job.description}</p>
                    <a href="${job.link}" target="_blank">Apply Now</a>
                `;
                jobList.appendChild(li);
            });
    };

    // Initial display (show all jobs)
    displayJobs();

    // Filter form event listener
    document.getElementById("apply-filter").addEventListener("click", () => {
        const filterCategory = document.getElementById("category").value;
        const filterLocation = document.getElementById("location").value;
        displayJobs(filterCategory, filterLocation);
    });
});
// Premium Feature Modal
function openPremiumModal() {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;">
            <div style="background: white; padding: 20px; border-radius: 10px; max-width: 400px; text-align: center;">
                <h2>Premium Feature Access</h2>
                <p>To access this premium feature, please:</p>
                <button onclick="redirectToAccountCreation()">Create Account</button>
                <button onclick="redirectToPayment()">Proceed to Payment</button>
                <button onclick="closeModal()">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function closeModal() {
    document.body.removeChild(document.body.lastChild);
}

function redirectToAccountCreation() {
    // Redirect to account creation page
    window.location.href = 'create-account.html';
}

function redirectToPayment() {
    // Redirect to payment page
    window.location.href = 'payment.html';
}
