
/*

ok, now create a small BMI calculator that enables the user to input their height in feet-inches and their weight in pounds, and calculate their BMI Body Mass Index number, and also report if they are obese, over weight, normal, or underweight by normal medical standards. please create the index.html file, and a script.js and styles.css file for a mobile-responsive web application

*/


document.getElementById('bmiForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const feet = parseInt(document.getElementById('feet').value);
    const inches = parseInt(document.getElementById('inches').value);
    const weight = parseFloat(document.getElementById('weight').value);

    const heightInInches = (feet * 12) + inches;
    const heightInMeters = heightInInches * 0.0254;
    const weightInKg = weight * 0.453592;

    const bmi = weightInKg / (heightInMeters * heightInMeters);
    const bmiRounded = bmi.toFixed(1);

    let category = '';

    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = 'Normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
        category = 'Overweight';
    } else {
        category = 'Obese';
    }

    document.getElementById('result').textContent = `Your BMI is ${bmiRounded}. You are classified as ${category}.`;
});