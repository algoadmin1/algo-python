
/*

ok, now create a small BMI calculator that enables the user to input their height in feet-inches and their weight in pounds, and calculate their BMI Body Mass Index number, and also report if they are obese, over weight, normal, or underweight by normal medical standards. please create the index.html file, and a script.js and styles.css file for a mobile-responsive web application


Caloric needs for both men and women vary based on several factors, including height, weight, age, activity level, 
and overall health. However, one common method for estimating daily calorie requirements is the Mifflin-St Jeor Equation, 
which calculates the Basal Metabolic Rate (BMR). The BMR represents the number of calories a person burns at rest, and 
you can then multiply it by an activity factor to estimate total daily calorie needs.


Total Daily Energy Expenditure (TDEE):

Once you calculate the BMR, you can multiply it by an activity factor to estimate the total calories burned in a day:

	•	Sedentary (little to no exercise): BMR × 1.2
	•	Lightly active (light exercise/sports 1-3 days a week): BMR × 1.375
	•	Moderately active (moderate exercise/sports 3-5 days a week): BMR × 1.55
	•	Very active (hard exercise/sports 6-7 days a week): BMR × 1.725
	•	Extra active (very hard exercise/physical job, or 2x training): BMR × 1.9


Explanation (code):

	•	Gender: Determines which version of the Mifflin-St Jeor equation is used.
	•	Height, Weight, and Age: Used in the BMR calculation formula.
	•	Activity Level: Determines the multiplier for calculating Total Daily Energy Expenditure (TDEE).
	•	Switch Statement: Assigns the appropriate activity multiplier based on the provided activity level.

Activity Levels:

	•	Sedentary: Little to no exercise.
	•	LightlyActive: Light exercise/sports 1-3 days a week.
	•	ModerateActive: Moderate exercise/sports 3-5 days a week.
	•	VeryActive: Hard exercise/sports 6-7 days a week.
	•	ExtraActive: Very hard exercise or physically demanding job.

The function returns the total number of calories needed per day as a float rounded to two decimal places.


*/

// sed, lightly, moderate, veryActive, ExtraActive
let activityLevel = [ 1.200, 1.375, 1.550, 1.725, 1.900 ];


function CalcCalories( gender0, cm0, kg0, age0, actlvl0 ){
    let bmr = 0.0;
    if(gender0=="female"){
        bmr = 10.0 * kg0      + 6.25 * cm0        - 5 * age0       - 161;
        // $BMR = 10 * $weight_kg + 6.25 * $height_cm - 5 * $age - 161;

    }else{      // male, other == male
        bmr = 10.0 * kg0      +  6.25 * cm0      -  5 * age0       + 5;
        // Mifflin-St Jeor for men
        //$BMR = 10 * $weight_kg + 6.25 * $height_cm - 5 * $age + 5;

    }


    // Calculate total daily caloric demand (TDEE)
    // $caloriesNeeded = $BMR * $activityFactor;
    let caloriesNeeded = bmr * activityLevel[actlvl0];
    console.log("actlvl0 =", actlvl0);
    console.log("activityLevel =", activityLevel[actlvl0]);
    console.log("bmr =", bmr);

    return( caloriesNeeded );
}


function CalcCaloricDeficit(tdee, kg, days, percentLoss) {
    console.log("INSIDE CalcCaloricDef()" );

    console.log("kg =, lbs = ", kg, (kg*2.2) );

    // Calculate the total weight to lose
    let weightToLose = kg * (percentLoss / 100);
    console.log("kg =, lbs = , lbs2lose=", kg, (kg*2.2) ,  weightToLose*2.2 );

    // 1 kilogram of body weight requires a 7700 calorie deficit
    let totalCaloricDeficit = weightToLose * 7700;


    console.log("weight to lose (kg), totalCaloricDeficit:", weightToLose , totalCaloricDeficit);
    // Calculate the daily caloric deficit required to lose the weight in the given time
    let dailyCaloricDeficit = totalCaloricDeficit / days;
    console.log("dailyCaloricDeficit = totalCaloricDef / days:", dailyCaloricDeficit , totalCaloricDeficit ,"/", days  );

    // Calculate the daily caloric intake by subtracting the daily deficit from TDEE
    let dailyCaloriesToConsume = tdee - dailyCaloricDeficit;

    console.log("dailyCaloricDeficit, dailyCaloriesToConsume:", dailyCaloricDeficit , dailyCaloriesToConsume);

    // Output the daily caloric deficit and the daily calories to consume
    return {
        dailyCaloricDeficit: dailyCaloricDeficit.toFixed(0),
        dailyCaloriesToConsume: dailyCaloriesToConsume.toFixed(0)
    };
}

// // Example Usage
// let result = CalcCaloricDeficit(2600, 100, 180, 10); // tdee = 2600, weight = 100kg, 180 days, 10% weight loss
// console.log(`Daily Caloric Deficit: ${result.dailyCaloricDeficit}`);
// console.log(`Daily Calories to Consume: ${result.dailyCaloriesToConsume}`);






/*

for CalcCaloricDeficit()
Explanation:
tdee: Total Daily Energy Expenditure (calories needed per day to maintain current weight).
kg: Your current weight in kilograms.
days: The number of days you plan to lose the weight.
percentLoss: The percentage of your current weight you want to lose.
How it works:
The function calculates the amount of weight you want to lose (based on the percentage).
It calculates the total caloric deficit needed to lose that weight (1 kg = 7,700 calories).
The daily caloric deficit is determined by dividing the total caloric deficit by the number of days.
The function returns both the daily caloric deficit and the new daily calories to consume.
Example:
If you have a TDEE of 2600 calories, weigh 100 kg, want to lose 10% of your body weight (10 kg) over 180 days:

The daily caloric deficit will be around 427 calories.
You should consume around 2173 calories per day to achieve this goal.



function CaloricDemand($gender, $height_cm, $weight_kg, $age, $activityLevel) {
    // Calculate BMR based on gender
    if ($gender === "male") {
        // Mifflin-St Jeor for men
        $BMR = 10 * $weight_kg + 6.25 * $height_cm - 5 * $age + 5;
    } else if ($gender === "female") {
        // Mifflin-St Jeor for women
        $BMR = 10 * $weight_kg + 6.25 * $height_cm - 5 * $age - 161;
    } else {
        return "Invalid gender. Please specify 'male' or 'female'.";
    }

    // Activity multiplier based on activity level
    switch ($activityLevel) {
        case "Sedentary":
            $activityFactor = 1.2;
            break;
        case "LightlyActive":
            $activityFactor = 1.375;
            break;
        case "ModerateActive":
            $activityFactor = 1.55;
            break;
        case "VeryActive":
            $activityFactor = 1.725;
            break;
        case "ExtraActive":
            $activityFactor = 1.9;
            break;
        default:
            return "Invalid activity level. Please specify 'Sedentary', 'LightlyActive', 'ModerateActive', 'VeryActive', or 'ExtraActive'.";
    }

    // Calculate total daily caloric demand (TDEE)
    $caloriesNeeded = $BMR * $activityFactor;

    return round($caloriesNeeded, 2); // Returning rounded value for better readability
}

*/

// *** kgs version METRIC
document.getElementById('bmiForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const cms = parseInt(document.getElementById('cms').value);
    // const feet = parseInt(document.getElementById('feet').value);
    // const inches = 0; // parseInt(document.getElementById('inches').value);

    const weight = parseFloat(document.getElementById('weight').value);   // lbs

    const age = parseFloat(document.getElementById('age').value);
    const gender = document.getElementById('gender').value ;
    const actlevel = parseInt(document.getElementById('actlevel').value) ;

    const days2lose = parseInt(document.getElementById('days').value) ;
    const pct2lose  = parseInt(document.getElementById('pct').value) ;

    const email0 = document.getElementById('email').value ;



    // const heightInInches = (feet * 12) + inches;
    // const heightInMeters = heightInInches * 0.0254;
    const heightInMeters = cms / 100.0; 
    // const weightInKg = weight * 0.453592;   // lbs
    const weightInKg = weight * 1.0;


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

    let cm0=(heightInMeters*100).toFixed(1);
    // let cn = CalcCalories(gender, (heightInMeters*100), weightInKg, age, actlevel );
    let cn = CalcCalories(gender, cm0,  weightInKg, age, actlevel );
    let cn1 = cn.toFixed(2);
    // let addstr = 'Calories needed:' + cn1 + '/day   gender:' + gender+ ' age:' + age +' actLvl:' + actlevel ;
    let addstr = 'Calories needed/day:' + cn1 ;  
    
    // document.getElementById('result').textContent = `Your BMI is ${bmiRounded}. HERE You are classified as ${category}. ${addstr}`;

// now write a javascript function CalcCaloricDeficit( tdee, kg, days, percentLoss ) and calculates the daily caloric deficit based on tdee= TDEE, kg=kilgrams, days = days to loose the weight, and percentLoss = % of kg to lose

// let days2lose = 90;
// let pct2lose  = 10;
let lbs2lose =  weight * (pct2lose/100);
lbs2lose=lbs2lose.toFixed(0);

let lbsTarget = weight * (1- pct2lose/100);
lbsTarget=lbsTarget.toFixed(1);


let result = CalcCaloricDeficit(cn1 , weightInKg, days2lose, pct2lose ); // tdee = 2600, weight = 100kg, 180 days, 10% weight loss
console.log(`Daily Caloric Deficit: ${result.dailyCaloricDeficit}`);
console.log(`Daily Calories to Consume: ${result.dailyCaloriesToConsume}`);
let cals2consume  =result.dailyCaloriesToConsume;
let cals2cut      =result.dailyCaloricDeficit;
// cals2consume = cals2consume.toFixed(0);
// cals2cut     = cals2cut.toFixed(0);
let email1a = ""; //email0.split('@')[0]; //+','; // Get the part before the '@'

if(email0!=""){
    email1a = email0.split('@')[0];
    email1a = email1a +',' ;
}else email1a = "Ok,";
// let addstr2 = `Daily Calories to Consume: ${result.dailyCaloriesToConsume}` ;
// let addstr2 = email0 + ` To lose `+pct2lose +`% or `+ lbs2lose+`lbs, over `+ days2lose +` days, <strong>consume ${result.dailyCaloriesToConsume}` +`</strong> calories/day or <strong>cut out `+ cals2cut+`</strong> calories/day.<br>` ;
// let addstr2 = email1a + ` to lose `+pct2lose +`% or `+ lbs2lose+`lbs, over `+ days2lose +` days, <strong>consume `+cals2consume +`</strong> calories/day or <strong>cut out `+ cals2cut+`</strong> calories/day.<br>` ;
// let addstr2 = email1a + ` to lose `+pct2lose +`% or `+ lbs2lose+`lbs, over `+ days2lose +` days, <strong>consume `+cals2consume +`</strong> calories/day (-`+ cals2cut+` cals/day).<br>` ;
let addstr2 = email1a + ` to lose `+pct2lose +`% or `+ lbs2lose+`lbs, over `+ days2lose +` days, <strong>consume `+cals2consume +`</strong> calories/day.<br>` ;
// document.getElementById('result').innerHTML = `days, consume ${result.dailyCaloriesToConsume} <strong>calories/day</strong>.`;

let kilos = weightInKg.toFixed(1);
    

// document.getElementById('result').innerHTML = `Your BMI is ${bmiRounded}. You are classified as ${category}. <br>${addstr}. <br>${addstr2}`;
document.getElementById('result').innerHTML = `At ${kilos}kg & ${cm0}cm: your BMI is ${bmiRounded}, classified as ${category}. <br>${addstr}. <br>${addstr2}`;



    
    /*
To calculate how many calories below your Total Daily Energy Expenditure (TDEE) you should consume to lose 10% of your body weight, we can follow these steps:

Steps:
Current Weight (224 lbs): Your goal is to lose 10% of this weight.

10% of 224 lbs = 224 * 0.10 = 22.4 lbs.
Caloric Deficit Needed for Weight Loss:

To lose 1 pound of body weight, you need to create a caloric deficit of about 3,500 calories.
Therefore, to lose 22.4 lbs, you would need a total deficit of:
22.4
 
lbs
×
3500
 
calories/lb
=
78400
 
calories
22.4lbs×3500calories/lb=78400calories.
Caloric Deficit per Day:

If you want to lose this weight over a certain number of days, you can calculate how many calories below your TDEE you 
should eat each day. For example, if you want to lose this weight over a span of 6 months (roughly 180 days):
78400 calories
180 days
=
435.56
 
calories/day
180days
78400calories
​
 =435.56calories/day.
Calories to Consume Daily:

Your TDEE is 2600 calories, so if you want to lose weight at this rate, you should consume:
2600 calories/day
−
435.56
 
calories/day
=
2164.44
 
calories/day
2600calories/day−435.56calories/day=2164.44calories/day.
Conclusion:
To lose 10% of your body weight (about 22.4 lbs) over a span of 6 months, you should consume approximately 2165 calories per day (about 435 calories below your TDEE).

You can adjust the duration of the weight loss period, which will change the daily caloric deficit. For a faster or slower pace, you would either increase or decrease the daily caloric deficit accordingly.






You said:
to lose 1 kilogram of body weight , what is the caloric deficit ?
ChatGPT said:
ChatGPT
To lose 1 kilogram of body weight, you need a caloric deficit of approximately 7,700 calories.

Explanation:
1 pound of body weight equals approximately 3,500 calories.
Since 1 kilogram equals approximately 2.2 pounds, the caloric deficit required to lose 1 kilogram is:
3
,
500
 
calories
×
2.2
=
7
,
700
 
calories
3,500calories×2.2=7,700calories
This means that to lose 1 kilogram of weight, you'd need to burn 7,700 calories more than you consume.

    */

});