
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
        category = 'Underweight: BMI less than 18.5';
    } else if (bmi >= 18.5 && bmi < 24.99) {
        category = '😉Normal weight: BMI 18.5 to 24.9';
    } else if (bmi >= 25 && bmi < 29.99) {
        category = '⚠️Overweight: BMI 25 to 29.9';
    } else if (bmi >= 30 && bmi < 34.99) {
        category = '☠️  Obese Class 1: BMI 30 to 34.9';
    } else if (bmi >= 35 && bmi < 39.99) {
        category = '☠️☠️ Obese Class 2: BMI 35 to 39.9';
    } else if (bmi >= 40 && bmi < 49.99) {
        category = '☠️☠️☠️Obese Class 3: Severe/Morbid Obesity: BMI 40+';
    } else {
        category = '☠️☠️☠️☠️Obese Class 4: You are Morbidly Obese: BMI 50+  SEE A DR!';
    }
    // ☠️  

    document.getElementById('result').textContent = `Your BMI is ${bmiRounded}. You are classified as ${category}.`;
});