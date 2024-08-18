function calculateBMI() {
    var height = parseFloat(document.getElementById("height").value);
    var weight = parseFloat(document.getElementById("weight").value);
    if (height > 0 && weight > 0) {
        var bmi = weight / (height * height);
        var bmiResult = bmi.toFixed(2);
        document.getElementById("bmiResult").innerText = "Your BMI is: " + bmiResult;

        var rating = "";
        if (bmi > 30) {
            rating = "Obese";
        } else if (bmi > 25) {
            rating = "Overweight";
        } else if (bmi > 18.5) {
            rating = "Normal weight";
        } else {
            rating = "Underweight";
        }
        document.getElementById("bmiRating").innerText = "Rating: " + rating;
    } else {
        alert("Please enter valid height and weight values.");
    }
}
