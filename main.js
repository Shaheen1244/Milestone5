document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('resumeForm');
    const resumeDisplayElement = document.getElementById('resumeOutput');
    const shareablelinkContainer = document.getElementById('shareablelink-container');
    const shareableLinkElement = document.getElementById('shareable-link');
    const downloadPDFButton = document.getElementById('download-pdf');

    // Handle form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Collect form data
        const username = document.getElementById('username').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const education = document.getElementById('education').value;
        const experience = document.getElementById('experience').value;
        const skills = document.getElementById('skills').value;
        const description = document.getElementById('description').value;

        // Debugging: Check form values
        console.log("Form Submitted:", { username, name, email, education, experience, skills, description });

        // Save form data in localStorage with username as the key
        const resumeData = { name, email, education, experience, skills, description };
        localStorage.setItem(username, JSON.stringify(resumeData));

        // Generate dynamic resume HTML
        const resumeHTML = `
            <h2>Personal Information</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Education:</strong> ${education}</p>
            <p><strong>Experience:</strong> ${experience}</p>
            <p><strong>Skills:</strong> ${skills}</p>
            <p><strong>Description:</strong> ${description}</p>
        `;

        // Display the generated resume
        resumeDisplayElement.innerHTML = resumeHTML;

        // Generate the shareable link
        const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;

        // Show the shareable link
        shareablelinkContainer.style.display = 'block';
        shareableLinkElement.href = shareableURL;
        shareableLinkElement.textContent = shareableURL;
    });

    // Handle the "Download as PDF"
    downloadPDFButton.addEventListener("click", function () {
        window.print(); // Opens the print dialog, allowing user to save as PDF
    });

    // Prefill the form with data from localStorage based on the username
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username");

    if (username) {
        const savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
            document.getElementById('description').value = resumeData.description;
        }
    }
});
