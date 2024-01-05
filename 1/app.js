function SendEmailTo(emailToStr, emailFromStr, emailSubjectStr, emailBodyStr) {
  // Create a FormData object with email details
  const formData = new FormData();
  formData.append('emailTo', emailToStr);
  formData.append('emailFrom', emailFromStr);
  formData.append('emailSubject', emailSubjectStr);
  formData.append('emailBody', emailBodyStr);

  // Make a POST request to the server-side endpoint
  fetch('send_email.php', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      return response.text();
    } else {
      throw new Error('Failed to send email');
    }
  })
  .then(result => {
    console.log(result); // Handle the success message or response from the server
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

// Example usage
const emailTo = 'roguequant1@gmail.com';
const emailFrom = 'algoinvestorr@gmail.com';
const emailSubject = 'SUBJECT: TEST Email';
const emailBody = 'This is a test email message.';

SendEmailTo(emailTo, emailFrom, emailSubject, emailBody);
