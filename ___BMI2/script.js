/*

now modify the last code files to allow for a switch between the metric system and feet/lbs
Answer
To allow users to switch between the metric system and the imperial system (feet/inches and pounds) for the BMI calculator, we can add a toggle switch. This will enable users to input their height and weight in either system and calculate their BMI accordingly.
Here's how you can modify the existing files to implement this feature:
*/

document.getElementById('unitSystem').addEventListener('change', function() {
    const unitSystem = this.value;
    const imperialInputs = document.querySelectorAll('.imperial-input');
    const metricInputs = document.querySelectorAll('.metric-input');

    if (unitSystem === 'imperial') {
        imperialInputs.forEach(input => input.style.display = 'block');
        metricInputs.forEach(input => input.style.display = 'none');
    } else {
        imperialInputs.forEach(input => input.style.display = 'none');
        metricInputs.forEach(input => input.style.display = 'block');
    }
});

document.getElementById('bmiForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const unitSystem = document.getElementById('unitSystem').value;
    let bmi = 0;

    if (unitSystem === 'imperial') {
        const feet = parseInt(document.getElementById('feet').value) || 0;
        const inches = parseInt(document.getElementById('inches').value) || 0;
        const weightLbs = parseFloat(document.getElementById('weightLbs').value) || 0;

        const heightInInches = (feet * 12) + inches;
        const heightInMeters = heightInInches * 0.0254;
        const weightInKg = weightLbs * 0.453592;

        bmi = weightInKg / (heightInMeters * heightInMeters);
    } else {
        const heightCm = parseFloat(document.getElementById('heightCm').value) || 0;
        const weightKg = parseFloat(document.getElementById('weightKg').value) || 0;

        const heightInMeters = heightCm / 100;
        bmi = weightKg / (heightInMeters * heightInMeters);
    }

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