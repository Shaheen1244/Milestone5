const Form = document.getElementById('resumeForm') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resumeOutput') as HTMLDivElement;
const shareablelinkContainer = document.getElementById('shareablelink-container') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPDFButton = document.getElementById('download-pdf') as HTMLButtonElement;

Form.addEventListener('submit', function (event) {
    event.preventDefault();  // Prevent the default form submission

    // Collect input values from the form
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLInputElement).value;
    const experience = (document.getElementById('experience') as HTMLInputElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value;
    const description = (document.getElementById('description') as HTMLInputElement).value;

    // Debugging: Check if form values are being collected properly
    console.log("Form Submitted! Collected Values:", {
        username, name, email, education, experience, skills, description
    });

    // Check if all fields are filled out
    if (!username || !name || !email || !education || !experience || !skills || !description) {
        alert("Please fill out all the fields!");
        return; // Prevent submission if any field is missing
    }

    // Save form data in localStorage with the username as the key
    const resumeData = { name, email, education, experience, skills, description };
    localStorage.setItem(username, JSON.stringify(resumeData));

    // Generate the resume dynamically
    const resumeHTML = `
        <h2>Personal Information</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Education:</strong> ${education}</p>
        <p><strong>Experience:</strong> ${experience}</p>
        <p><strong>Skills:</strong> ${skills}</p>
        <p><strong>Description:</strong> ${description}</p>
    `;

    // Debugging: Check if the resume HTML is generated properly
    console.log("Generated Resume HTML:", resumeHTML);

    // Display the generated resume
    resumeDisplayElement.innerHTML = resumeHTML;

    // Generate a shareable URL with the username
    const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;

    // Show the shareable link
    shareablelinkContainer.style.display = "block";
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
