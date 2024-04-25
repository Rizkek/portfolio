function opentab(tabname) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tab-contents");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].classList.remove("active-tab");
      tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tab-links");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active-link");
  }
  document.getElementById(tabname).classList.add("active-tab");
  document.getElementById(tabname).style.display = "block";
  document.getElementById(tabname).previousElementSibling.classList.add("active-link");

  // Add transition animation to the tab links
  var activeLink = document.querySelector('.tab-links.active-link');
  activeLink.style.transition = 'width 0.5s ease';
  activeLink.style.width = '50%';
}

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.querySelector('input[name="Name"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const message = document.querySelector('textarea[name="Massage"]').value;

  const data = { name, email, message };

  fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization':'re_LQjuJhTv_FaMwcRL2m3kZtTnMmrh3KuXD',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "from": "onboarding@resend.dev",
        "to": "riskiinferno@gmail.com",
        "subject": "Contact Form",
        "html": `<p>Name: ${name ?? ''}</p><br><p>Email: ${email ?? ''}</p><p>Message: ${message ?? ''}</p>`
      })
  })
  .then(response => response.text())
  .then(data => {
      alert(data);
      document.getElementById('contact-form').reset();
  })
  .catch(error => {
      console.error('Error:', error);
      alert('Failed to send email. Please try again later.');
  });
});
